<?php
/** Run with wp eval-file against the existing isolated QA fixture only. */
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Only run against the local QA fixture.');
}
add_filter('pre_wp_mail', '__return_true', PHP_INT_MAX);
add_filter('pre_http_request', function () { return new WP_Error('local_qa', 'External requests disabled.'); }, PHP_INT_MAX);
$checks = 0;
$check = function ($condition, $label) use (&$checks) {
	if (! $condition) { throw new RuntimeException('FAIL: ' . $label); }
	$checks++;
};
$lamp = wc_get_product(wc_get_product_id_by_sku('QA-szam-lampa-nevvel'));
$simple = wc_get_product(wc_get_product_id_by_sku('QA-programozo-lampa'));
$variable = wc_get_product(wc_get_product_id_by_sku('QA-variable'));
$variation = wc_get_product(wc_get_product_id_by_sku('QA-variation-small'));
$check($lamp && $simple && $variable && $variation, 'QA fixture exists');
global $wp_query, $post, $product;
foreach (array($lamp, $simple, $variable) as $product) {
	$wp_query = new WP_Query(array('post_type' => 'product', 'p' => $product->get_id()));
	$post = get_post($product->get_id()); setup_postdata($post);
	$check(strpos(\LayeroShop\Single_Product::template('fallback'), 'single-product.php') !== false, 'native product template selected');
	ob_start(); woocommerce_template_single_add_to_cart(); $html = ob_get_clean();
	$check(strpos($html, 'data-layero-order-total') !== false, 'order total exists in native cart form');
	$check(strpos($html, 'name="add-to-cart"') !== false, 'native Woo product identity retained');
	if ($product->get_id() === $lamp->get_id()) {
		$check(strpos($html, 'name="layero_fields[name]" required') !== false, 'required personalization preserved');
		$check(strpos($html, 'data-price="70"') !== false, 'total uses displayed Woo price');
	} elseif ($product->get_id() === $variable->get_id()) {
		$check(strpos($html, 'name="variation_id"') !== false && strpos($html, 'Válassz változatot') !== false, 'variation identity and initial total retained');
	} else {
		$check(strpos($html, 'name="layero_fields[') === false, 'ordinary product has no invented personalization');
	}
}
wc_load_cart(); WC()->cart->empty_cart();
WC()->customer->set_billing_country('RO'); WC()->customer->set_shipping_country('RO');
WC()->customer->set_shipping_state('B'); WC()->customer->set_shipping_city('Bucuresti');
WC()->customer->set_shipping_postcode('010001'); WC()->customer->set_shipping_address_1('QA fictive address 1');
$_POST = array('layero_fields' => array('name' => 'QA Olivér <3', 'number' => '0', 'color' => 'Fekete'));
$key = WC()->cart->add_to_cart($lamp->get_id(), 2);
$check((bool) $key, 'personalized product added to Woo cart');
$line = WC()->cart->get_cart_item($key);
$check(2 === $line['quantity'] && '0' === $line['layero_personalization']['fields']['number']['value'], 'quantity and zero-valued field retained');
$_POST = array();
$check((bool) WC()->cart->add_to_cart($simple->get_id(), 1), 'ordinary product added');
$coupon = new WC_Coupon('layero-qa-10');
$check((bool) $coupon->get_id(), 'existing QA coupon available');
WC()->cart->apply_coupon('layero-qa-10'); WC()->cart->calculate_totals();
$check(abs(WC()->cart->get_discount_total() - 35.9) < 0.01, 'coupon reflects two personalized units');
$check(abs((float) WC()->cart->get_shipping_total() - 20) < 0.01, 'configured shipping retained');
WC()->cart->set_quantity($key, 1, true); WC()->cart->set_session();
$check(1 === WC()->session->get('cart')[$key]['quantity'] && ! empty(WC()->session->get('cart')[$key]['layero_personalization']), 'updated quantity and fields persist in Woo session');
WC()->cart->empty_cart();
$_POST = array('layero_fields' => array('name' => 'QA Variáció', 'number' => '7', 'color' => 'Fekete'));
$key = WC()->cart->add_to_cart($variable->get_id(), 2, $variation->get_id(), array('attribute_meret' => 'Kicsi'));
$check((bool) $key, 'native variation added');
$line = WC()->cart->get_cart_item($key);
$check($line['variation_id'] === $variation->get_id() && 2 === $line['quantity'] && 'Fekete' === $line['layero_personalization']['fields']['color']['value'], 'variation, quantity and custom choice retained');
$check(! isset(WC()->payment_gateways()->get_available_payment_gateways()['cod']), 'prepayment restriction retained');
WC()->cart->empty_cart(); $_POST = array(); wp_reset_postdata();
echo $checks . " single-product / WooCommerce checks passed. No order or external request sent.\n";
