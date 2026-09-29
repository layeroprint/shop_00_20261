<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

/** The WooCommerce product keeps its own URL, data and add-to-cart form. */
final class Single_Product {
	public static function init() {
		add_filter('template_include', array(__CLASS__, 'template'), 99);
		add_filter('woocommerce_product_single_add_to_cart_text', array(__CLASS__, 'add_to_cart_label'));
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
		return LAYERO_SHOP_UI_PATH . 'templates/single-product.php';
	}
}
