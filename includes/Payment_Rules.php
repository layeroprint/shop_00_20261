<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

/** Enforces the product manager's WooCommerce CSV prepayment flag. */
final class Payment_Rules {
	const META_KEY = '_layero_requires_prepayment';
	private static $instance = null;

	public static function instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_filter('woocommerce_available_payment_gateways', array($this, 'filter_gateways'), 100);
		add_action('woocommerce_after_checkout_validation', array($this, 'validate_checkout'), 10, 2);
		add_action('woocommerce_checkout_create_order_line_item', array($this, 'save_item_rule'), 10, 4);
		add_action('woocommerce_store_api_checkout_update_order_from_request', array($this, 'validate_store_api'), 10, 2);
	}

	private static function enabled($value) {
		return is_scalar($value) && in_array(strtolower(trim((string) $value)), array('1', 'yes', 'true', 'on'), true);
	}

	public static function product_requires_prepayment($product) {
		if (! $product) {
			return false;
		}
		if (self::enabled($product->get_meta(self::META_KEY, true))) {
			return true;
		}
		// A variation cannot bypass the rule imported on its parent product.
		$parent_id = $product->get_parent_id();
		return $parent_id && function_exists('wc_get_product')
			? self::product_requires_prepayment(wc_get_product($parent_id)) : false;
	}

	public function cart_requires_prepayment() {
		$wc = function_exists('WC') ? WC() : null;
		if (! $wc || ! $wc->cart) {
			return false;
		}
		foreach ($wc->cart->get_cart() as $item) {
			if (self::product_requires_prepayment($item['data'] ?? null)) {
				return true;
			}
		}
		return false;
	}

	public function order_requires_prepayment($order) {
		foreach ($order->get_items() as $item) {
			if (self::enabled($item->get_meta(self::META_KEY, true)) || self::product_requires_prepayment($item->get_product())) {
				return true;
			}
		}
		return false;
	}

	public function filter_gateways($gateways) {
		// Order-pay must inspect the order being paid, not an unrelated current cart.
		if (function_exists('is_wc_endpoint_url') && is_wc_endpoint_url('order-pay')) {
			$order = wc_get_order(absint(get_query_var('order-pay')));
			$requires = $order && $this->order_requires_prepayment($order);
		} else {
			$requires = $this->cart_requires_prepayment();
		}
		if ($requires) {
			unset($gateways['cod']);
		}
		return $gateways;
	}

	private function message() {
		return __('A kosárban csak előre fizethető termék van. Kérjük, válassz az utánvéttől eltérő fizetési módot.', 'layero-shop-ui');
	}

	public function validate_checkout($data, $errors) {
		if ('cod' === ($data['payment_method'] ?? '') && $this->cart_requires_prepayment()) {
			$errors->add('layero_prepayment_required', $this->message());
		}
	}

	public function save_item_rule($item, $cart_item_key, $values, $order) {
		if (self::product_requires_prepayment($values['data'] ?? null)) {
			$item->add_meta_data(self::META_KEY, '1', true);
		}
	}

	public function validate_store_api($order, $request) {
		if ('cod' === ($request['payment_method'] ?? '') && $this->order_requires_prepayment($order)) {
			throw new \Automattic\WooCommerce\StoreApi\Exceptions\RouteException('layero_prepayment_required', $this->message(), 400);
		}
		foreach ($order->get_items() as $item) {
			if (self::product_requires_prepayment($item->get_product())) {
				$item->update_meta_data(self::META_KEY, '1');
			}
		}
	}
}
