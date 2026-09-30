<?php
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Only run against the local QA fixture.');
}
add_filter('pre_wp_mail', '__return_true', PHP_INT_MAX);
add_filter('pre_http_request', function () { return new WP_Error('local_qa', 'External requests disabled.'); }, PHP_INT_MAX);
add_filter('wp_doing_ajax', '__return_true');
add_filter('wp_die_ajax_handler', function () { return function () { throw new RuntimeException('qa_json_end'); }; });
$checks = 0;
$check = function ($condition, $label) use (&$checks) {
	if (! $condition) { throw new RuntimeException('FAIL: ' . $label); }
	$checks++;
};
$request = function ($operation, $value, $nonce = null) {
	$_SERVER['REQUEST_METHOD'] = 'POST';
	$_POST = array('operation' => $operation, 'value' => $value, 'nonce' => $nonce ?? wp_create_nonce('layero_cart_quantity'));
	$_REQUEST = $_POST;
	ob_start();
	try { \LayeroShop\Commerce_UI::cart_action(); }
	catch (RuntimeException $error) { if ('qa_json_end' !== $error->getMessage()) { ob_end_clean(); throw $error; } }
	return json_decode(ob_get_clean(), true);
};
wc_load_cart();
WC()->cart->empty_cart();
$product = wc_get_product(wc_get_product_id_by_sku('QA-programozo-lampa'));
$check($product instanceof WC_Product, 'fixture exists');
$key = WC()->cart->add_to_cart($product->get_id(), 2);
WC()->customer->set_shipping_country('RO');
WC()->customer->set_shipping_state('B');
WC()->customer->set_shipping_city('Bucuresti');
WC()->customer->set_shipping_postcode('010001');
WC()->customer->set_calculated_shipping(true);
WC()->cart->calculate_totals();
$base = (float) WC()->cart->get_total('edit');
$check(false === $request('giftwrap', 'yes', 'invalid')['success'], 'invalid nonce cannot add a fee');
$check(false === $request('giftwrap', array('yes'))['success'], 'array payload rejected');
$gift = $request('giftwrap', 'yes');
$check(true === $gift['success'], 'giftwrap endpoint accepts the selection');
$check(abs((float) WC()->cart->get_total('edit') - $base - 15) < .01, 'giftwrap adds exactly 15 RON');
$check(true === WC()->session->get('layero_giftwrap'), 'selection persists in WooCommerce session');
$check(strpos($gift['data']['fragments']['.lyr-woo-cart-content'], 'checked=') !== false, 'returned drawer reflects selection');
$request('giftwrap', 'yes');
$check(abs((float) WC()->cart->get_total('edit') - $base - 15) < .01, 'repeated selection does not duplicate fee');
$check(false === $request('apply_coupon', 'qa-missing-coupon')['success'], 'invalid coupon rejected');
$check(false === $request('apply_coupon', array('qa'))['success'], 'non-string coupon rejected');
$coupon = $request('apply_coupon', 'layero-qa-10');
$check(true === $coupon['success'], 'real coupon endpoint succeeds');
$check(abs(WC()->cart->get_discount_total() - WC()->cart->get_subtotal() * .1) < .01, 'WooCommerce computes coupon amount');
$check(strpos($coupon['data']['fragments']['.lyr-woo-cart-content'], 'data-cart-remove-coupon="layero-qa-10"') !== false, 'coupon and removal control rendered');
$check(false === $request('apply_coupon', 'layero-qa-10')['success'], 'duplicate coupon does not apply twice');
$check(true === $request('remove_coupon', 'layero-qa-10')['success'] && ! WC()->cart->has_discount(), 'coupon removal restores totals');
$check(true === $request('giftwrap', 'no')['success'] && abs((float) WC()->cart->get_total('edit') - $base) < .01, 'deselecting removes fee');
$native = \LayeroShop\Commerce_UI::fragments(array('div.widget_shopping_cart_content' => 'native'));
$check('native' === $native['div.widget_shopping_cart_content'], 'third-party/native mini-cart markup preserved');
$check(strpos($native['.lyr-woo-cart-content'], 'NYAR20') === false, 'demo coupon suggestions are absent');
$check(strpos($native['.lyr-woo-cart-content'], 'Apple Pay') === false, 'unsupported payment claims are absent');
$check(false === \LayeroShop\Commerce_UI::shipping()['free'], 'paid fixture shipping is not called free');

// A temporary rate in the isolated database exercises inclusive VAT and order fees.
$tax_id = WC_Tax::_insert_tax_rate(array('tax_rate_country' => 'RO', 'tax_rate_state' => '', 'tax_rate' => '19.0000', 'tax_rate_name' => 'QA VAT', 'tax_rate_priority' => 999, 'tax_rate_compound' => 0, 'tax_rate_shipping' => 1, 'tax_rate_order' => 999, 'tax_rate_class' => ''));
$enable_tax = function () { return 'yes'; };
$order = null;
try {
	add_filter('pre_option_woocommerce_calc_taxes', $enable_tax);
	WC()->customer->set_billing_country('RO');
	WC()->customer->set_billing_state('B');
	WC()->customer->set_billing_postcode('010001');
	WC()->customer->set_is_vat_exempt(false);
	$request('giftwrap', 'yes');
	$fees = array_values(WC()->cart->get_fees());
	$check(count($fees) === 1 && abs($fees[0]->total + $fees[0]->tax - 15) < .01, 'giftwrap gross remains 15 with tax enabled');
	$order = wc_create_order(array('created_via' => 'layero-drawer-qa'));
	WC()->checkout()->create_order_fee_lines($order, WC()->cart);
	$order->save();
	$stored = wc_get_order($order->get_id());
	$stored_fees = array_values($stored->get_items('fee'));
	$check(count($stored_fees) === 1 && 'Ajándékcsomagolás' === $stored_fees[0]->get_name(), 'giftwrap stored as native order fee');
	$check(abs($stored_fees[0]->get_total() + $stored_fees[0]->get_total_tax() - 15) < .01, 'order fee preserves approved gross price');
} finally {
	remove_filter('pre_option_woocommerce_calc_taxes', $enable_tax);
	WC_Tax::_delete_tax_rate($tax_id);
	if ($order) { $order->delete(true); }
}

// Real shipping-zone thresholds, including coupon discount policy, with cleanup.
$packages = WC()->cart->get_shipping_packages();
$package = reset($packages);
$zone = WC_Shipping_Zones::get_zone_matching_package($package);
$method_id = $zone->add_shipping_method('free_shipping');
$method_option = 'woocommerce_free_shipping_' . $method_id . '_settings';
$settings = array('title' => 'QA ingyenes szállítás', 'requires' => 'min_amount', 'min_amount' => '500', 'ignore_discounts' => 'no');
$recalculate_shipping = function () {
	WC_Cache_Helper::get_transient_version('shipping', true);
	foreach (array_keys(WC()->cart->get_shipping_packages()) as $index) { WC()->session->set('shipping_for_package_' . $index, null); }
	$chosen = WC()->session->get('chosen_shipping_methods');
	WC()->shipping()->reset_shipping();
	WC()->session->set('chosen_shipping_methods', $chosen);
	WC()->cart->calculate_totals();
};
try {
	update_option($method_option, $settings);
	$request('giftwrap', 'no');
	WC()->cart->set_quantity($key, 1);
	$recalculate_shipping();
	$shipping = \LayeroShop\Commerce_UI::shipping();
	$check(null !== $shipping['progress'] && abs($shipping['progress']['remaining'] - (500 - WC()->cart->get_displayed_subtotal())) < .01, 'remaining amount follows configured threshold');
	$request('apply_coupon', 'layero-qa-10');
	$recalculate_shipping();
	$shipping = \LayeroShop\Commerce_UI::shipping();
	$check(abs($shipping['progress']['remaining'] - (500 - WC()->cart->get_displayed_subtotal() + WC()->cart->get_discount_total())) < .01, 'threshold respects coupon discounts');
	$settings['ignore_discounts'] = 'yes'; update_option($method_option, $settings);
	$recalculate_shipping();
	$shipping = \LayeroShop\Commerce_UI::shipping();
	$check(abs($shipping['progress']['remaining'] - (500 - WC()->cart->get_displayed_subtotal())) < .01, 'before-discount threshold respected');
	WC()->cart->set_quantity($key, 4);
	WC()->session->set('chosen_shipping_methods', array('free_shipping:' . $method_id));
	$recalculate_shipping();
	$shipping = \LayeroShop\Commerce_UI::shipping();
	$check($shipping['free'] && 100 === $shipping['progress']['percent'], 'actual selected free shipping drives success bar');
} finally {
	$zone->delete_shipping_method($method_id);
	delete_option($method_option);
	$recalculate_shipping();
}
$request('giftwrap', 'yes');
$check(false === $request('remove', 'not-a-cart-key')['success'], 'unknown removal rejected');
$check(true === $request('remove', $key)['success'] && WC()->cart->is_empty(), 'last item removed through real endpoint');
$check(! WC()->session->get('layero_giftwrap'), 'empty cart clears giftwrap selection');
$check(false === $request('giftwrap', 'yes')['success'], 'empty cart cannot be charged');
WC()->cart->empty_cart();
$_POST = $_REQUEST = array();
echo $checks . " drawer, coupon, shipping and giftwrap checks passed. Only local QA data used.\n";
