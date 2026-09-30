<?php
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
wc_load_cart();
WC()->cart->empty_cart();
$lamp = wc_get_product(wc_get_product_id_by_sku('QA-szam-lampa-nevvel'));
$simple = wc_get_product(wc_get_product_id_by_sku('QA-programozo-lampa'));
$check($lamp && $simple, 'QA fixture available');
$_POST = array('layero_fields' => array('name' => 'QA <teszt>', 'number' => '0', 'color' => 'Fehér'));
$custom_key = WC()->cart->add_to_cart($lamp->get_id(), 1);
$_POST = array();
$key = WC()->cart->add_to_cart($simple->get_id(), 2);
$check($custom_key && $key, 'personalized and simple items added');
WC()->customer->set_shipping_country('RO');
WC()->customer->set_shipping_state('B');
WC()->customer->set_shipping_city('Bucuresti');
WC()->customer->set_shipping_postcode('010001');
WC()->cart->calculate_totals();
$fragments = apply_filters('woocommerce_add_to_cart_fragments', array());
$check(strpos($fragments['.sh-cart-badge'], '>3</span>') !== false, 'badge counts quantities, not lines');
$mini = $fragments['div.widget_shopping_cart_content'];
$check(strpos($mini, 'data-cart-count="3"') !== false, 'mini-cart and badge agree');
$check(strpos($mini, 'Név:') !== false && strpos($mini, '<p>0</p>') !== false, 'personalization and zero value are visible');
$check(strpos($mini, '<teszt>') === false, 'user-provided fields cannot become HTML');
$check(strpos($mini, wc_get_cart_url()) !== false && strpos($mini, wc_get_checkout_url()) !== false, 'real cart and checkout links');
$before = WC()->cart->get_subtotal();
WC()->cart->apply_coupon('layero-qa-10');
WC()->cart->calculate_totals();
$check(abs(WC()->cart->get_discount_total() - $before * 0.1) < .01, 'native coupon still calculates');
$check(abs((float) WC()->cart->get_shipping_total() - 20) < .01, 'configured shipping preserved');
WC()->cart->set_quantity($key, 3, true);
WC()->cart->set_session();
$check(WC()->session->get('cart')[$key]['quantity'] === 3, 'updated quantity saved to Woo session');
$check(! empty(WC()->session->get('cart')[$custom_key]['layero_personalization']), 'customization saved to Woo session');
$fragments = apply_filters('woocommerce_add_to_cart_fragments', array());
$check(strpos($fragments['.sh-cart-badge'], '>4</span>') !== false, 'fragments reflect quantity changes');
$quantity = \LayeroShop\Commerce_UI::quantity('<input class="qty">', $key, WC()->cart->get_cart_item($key));
$check(strpos($quantity, 'data-layero-quantity="-1"') !== false && strpos($quantity, 'data-layero-quantity="1"') !== false, 'quantity controls preserve native field');
$check(! isset(WC()->payment_gateways()->get_available_payment_gateways()['cod']), 'personalized item still prevents COD');
$check(false !== strpos($mini, 'data-drawer-quantity="1"'), 'drawer has quantity controls');
add_filter('wp_doing_ajax', '__return_true');
add_filter('wp_die_ajax_handler', function () { return function () { throw new RuntimeException('qa_json_end'); }; });
$request = function ($quantity, $nonce = null, $cart_key = null) use ($key) {
	$_SERVER['REQUEST_METHOD'] = 'POST';
	$_POST = array('key' => $cart_key ?? $key, 'quantity' => $quantity, 'nonce' => $nonce ?? wp_create_nonce('layero_cart_quantity'));
	$_REQUEST = $_POST;
	ob_start();
	try { \LayeroShop\Commerce_UI::update_quantity(); }
	catch (RuntimeException $error) { if ('qa_json_end' !== $error->getMessage()) { ob_end_clean(); throw $error; } }
	return json_decode(ob_get_clean(), true);
};
$check(true === $request(4)['success'] && 4 === WC()->cart->get_cart_item($key)['quantity'], 'drawer endpoint changes the actual cart');
$check(false === $request(5, 'invalid')['success'] && 4 === WC()->cart->get_cart_item($key)['quantity'], 'invalid nonce cannot change cart');
$check(false === $request(array(2))['success'], 'array quantity rejected');
$check(false === $request(0)['success'], 'zero quantity rejected without removing item');
$check(false === $request(2, null, 'missing')['success'], 'unknown item rejected');
$_POST = $_REQUEST = array();
WC()->cart->empty_cart();
$fragments = apply_filters('woocommerce_add_to_cart_fragments', array());
$check(strpos($fragments['.sh-cart-badge'], '>0</span>') !== false && strpos($fragments['.sh-cart-badge'], 'is-on') === false, 'empty cart clears badge');
$check(strpos($fragments['div.widget_shopping_cart_content'], 'Felfedezem a termékeket') !== false, 'empty drawer offers shopping');

$profile_product = new WC_Product_Simple();
$profile = array('version' => 1, 'enabled' => true, 'kinek' => array('gyerek'), 'alkalom' => array('babaszuletes'), 'stilus' => array('feny'));
$profile_product->update_meta_data('_layero_gift_profile', wp_json_encode($profile));
$check(\LayeroShop\Catalog::gift_profile($profile_product) === $profile, 'imported explicit gift classification is passed through');
$profile_product->update_meta_data('_layero_gift_profile', '{invalid');
$check(null === \LayeroShop\Catalog::gift_profile($profile_product), 'broken gift profile does not invent recommendations');
$profile['enabled'] = false;
$profile_product->update_meta_data('_layero_gift_profile', $profile);
$check(null === \LayeroShop\Catalog::gift_profile($profile_product), 'disabled classification stays disabled');
echo $checks . " real cart UI and gift-profile checks passed. No order, payment or email sent.\n";
