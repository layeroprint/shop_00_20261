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
