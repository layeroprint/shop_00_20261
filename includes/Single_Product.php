<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

/** The WooCommerce product keeps its own URL, data and add-to-cart form. */
final class Single_Product {
	private static $active = false;

	public static function init() {
		add_filter('template_include', array(__CLASS__, 'template'), 99);
		add_filter('woocommerce_product_single_add_to_cart_text', array(__CLASS__, 'add_to_cart_label'));
		add_action('woocommerce_before_add_to_cart_quantity', array(__CLASS__, 'order_total'));
	}

	/** Display only; WooCommerce still calculates and validates the cart totals. */
	public static function order_total() {
		global $product;
		if (! self::$active || ! $product || ! $product->is_type(array('simple', 'variable'))) { return; }
		$format = array(
			'decimals' => wc_get_price_decimals(),
			'decimal' => wc_get_price_decimal_separator(),
			'thousand' => wc_get_price_thousand_separator(),
			'currency' => html_entity_decode(get_woocommerce_currency_symbol(), ENT_QUOTES, 'UTF-8'),
			'format' => get_woocommerce_price_format(),
		);
		$price = $product->is_type('simple') ? wc_get_price_to_display($product) : null;
		echo '<div class="sh-order-total" data-layero-order-total data-price="' . esc_attr(null === $price ? '' : $price) . '" data-price-format="' . esc_attr(wp_json_encode($format)) . '"><span>Összesen · <span data-layero-order-quantity>1</span> darab</span><strong data-layero-order-amount aria-live="polite">' . (null === $price ? 'Válassz változatot' : wp_kses_post(wc_price($price))) . '</strong></div>';
	}

	public static function add_to_cart_label($label) {
		return function_exists('is_product') && is_product() ? __('Kosárba teszem', 'layero-shop-ui') : $label;
	}

	/** Scope the comments view and labels to this product, preserving Woo validation. */
	public static function reviews() {
		$template = function () { return LAYERO_SHOP_UI_PATH . 'templates/product-reviews.php'; };
		$labels = function ($args) {
			$args['title_reply'] = 'Oszd meg a tapasztalatodat';
			$args['label_submit'] = 'Vélemény beküldése';
			return $args;
		};
		$translate = function ($translated, $text, $domain) {
			if (! in_array($domain, array('woocommerce', 'default'), true)) { return $translated; }
			$labels = array(
				'Your rating' => 'Értékelésed', 'Your review' => 'Véleményed', 'Name' => 'Neved', 'Email' => 'E-mail-címed',
				'Rate&hellip;' => 'Válassz értékelést&hellip;', 'Perfect' => 'Kiváló', 'Good' => 'Jó', 'Average' => 'Átlagos', 'Not that bad' => 'Elfogadható', 'Very poor' => 'Gyenge',
				'Your email address will not be published.' => 'Az e-mail-címed nem jelenik meg nyilvánosan.',
				'Required fields are marked %s' => 'A kötelező mezőket %s jelöli.',
				'Save my name, email, and website in this browser for the next time I comment.' => 'Nevem és e-mail-címem megjegyzése ebben a böngészőben a következő véleményhez.',
				'Only logged in customers who have purchased this product may leave a review.' => 'Véleményt a terméket megvásárló, bejelentkezett vásárlók írhatnak.',
				'You must be %1$slogged in%2$s to post a review.' => 'Vélemény írásához %1$sjelentkezz be%2$s.',
			);
			return isset($labels[$text]) ? $labels[$text] : $translated;
		};
		add_filter('comments_template', $template, 999);
		add_filter('woocommerce_product_review_comment_form_args', $labels);
		add_filter('gettext', $translate, 10, 3);
		try { comments_template(); }
		finally {
			remove_filter('comments_template', $template, 999);
			remove_filter('woocommerce_product_review_comment_form_args', $labels);
			remove_filter('gettext', $translate, 10);
		}
	}

	/** Prefer the same product family; a shared gift occasion must not outrank it. */
	public static function related_ids($product, $limit = 4) {
		$categories = Catalog::category_slugs($product);
		$family = Helpers::product_card_type_key($product);
		foreach (array('lampak', 'kulcstartok') as $specific) {
			if (in_array($specific, $categories, true)) { $family = $specific; break; }
		}
		$matches = array();
		foreach (Catalog::products() as $candidate) {
			if ($candidate->get_id() === $product->get_id() || ! $candidate->is_purchasable()) { continue; }
			$other = Catalog::category_slugs($candidate);
			$same_family = $family && ($family === Helpers::product_card_type_key($candidate) || in_array($family, $other, true));
			if (in_array($family, array('lampak', 'kulcstartok'), true) && ! $same_family) { continue; }
			$shared = count(array_intersect($categories, $other));
			if (! $same_family && ! $shared) { continue; }
			$matches[$candidate->get_id()] = ($same_family ? 100 : 0) + $shared;
		}
		arsort($matches, SORT_NUMERIC);
		return array_slice(array_keys($matches), 0, max(0, (int) $limit));
	}

	public static function template($template) {
		if (! function_exists('is_product') || ! is_product() || ! function_exists('wc_get_product')) {
			return $template;
		}
		$product = wc_get_product(get_queried_object_id());
		if (! $product || ! apply_filters('layero_shop_ui_use_single_product_template', true, $product->get_id())) {
			return $template;
		}
		self::$active = true;
		return LAYERO_SHOP_UI_PATH . 'templates/single-product.php';
	}
}
