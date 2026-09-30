<?php
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Only run against the local QA fixture.');
}
add_filter('pre_wp_mail', '__return_true', 10000);
add_filter('pre_http_request', function () { return new WP_Error('local_qa', 'External requests disabled during QA.'); }, PHP_INT_MAX);

$GLOBALS['checks'] = 0;
function layero_check($condition, $label) {
	if (! $condition) { throw new RuntimeException('FAIL: ' . $label); }
	$GLOBALS['checks']++;
}
$prices = function ($products) { return array_map(function ($p) { return (int) $p->get_price(); }, $products); };
layero_check($prices(\LayeroShop\Helpers::query_products(array('category' => 'lampak', 'orderby' => 'price', 'order' => 'ASC'))) === array(70, 159, 199, 219, 229, 249), 'numeric ascending prices');
layero_check($prices(\LayeroShop\Helpers::query_products(array('category' => 'lampak', 'orderby' => 'price', 'order' => 'DESC'))) === array(249, 229, 219, 199, 159, 70), 'numeric descending prices');
layero_check(count(\LayeroShop\Helpers::query_products(array('search' => 'Holdfény'))) === 1, 'search finds native product');
layero_check(count(\LayeroShop\Helpers::query_products(array('search' => 'no-such-layero-product'))) === 0, 'empty search stays empty');
$snapshot = \LayeroShop\Catalog::snapshot();
$public_ids = array_column($snapshot['products'], 'wc_id');
layero_check(count($public_ids) >= 31 && ! in_array(wc_get_product_id_by_sku('QA-hidden'), $public_ids, true), 'hidden product excluded from public snapshot');
layero_check(\LayeroShop\Catalog::category_count('lampak') === 6, 'category count equals native products');
$lamp = wc_get_product(wc_get_product_id_by_sku('QA-szam-lampa-nevvel'));
$schema = \LayeroShop\Personalization::schema($lamp);
layero_check(count($schema) === 3, 'product-specific fields');
layero_check(is_wp_error(\LayeroShop\Personalization::values($schema, array())), 'required schema cannot be bypassed');
layero_check(is_wp_error(\LayeroShop\Personalization::values($schema, array('name' => array('x')))), 'nested input rejected');
layero_check(is_wp_error(\LayeroShop\Personalization::values($schema, array('name' => 'A', 'number' => '9', 'color' => 'Red'))), 'unavailable option rejected');
$first = \LayeroShop\Helpers::query_products(array('limit' => 24, 'offset' => 0));
$second = \LayeroShop\Helpers::query_products(array('limit' => 24, 'offset' => 24));
layero_check(count($first) === 24 && count($second) === min(24, count($public_ids) - 24), 'pagination fills pages for the current fixture');
$all_pages = array();
for ($offset = 0; $offset < count($public_ids); $offset += 24) {
	$all_pages = array_merge($all_pages, array_map(function ($p) { return $p->get_id(); }, \LayeroShop\Helpers::query_products(array('limit' => 24, 'offset' => $offset))));
}
sort($all_pages); sort($public_ids);
layero_check($all_pages === $public_ids, 'pagination reaches every public product exactly once');
layero_check(! array_intersect(array_map(function ($p) { return $p->get_id(); }, $first), array_map(function ($p) { return $p->get_id(); }, $second)), 'no overlap between pages');
wc_load_cart();
WC()->cart->empty_cart();
WC()->customer->set_billing_country('RO'); WC()->customer->set_shipping_country('RO');
WC()->customer->set_shipping_state('B'); WC()->customer->set_shipping_city('Bucuresti'); WC()->customer->set_shipping_postcode('010001');
WC()->customer->set_shipping_address_1('QA fictive address 1');
$_POST = array('layero_fields' => array('name' => 'QA Teszt', 'number' => '0', 'color' => 'Fehér'));
$custom_key = WC()->cart->add_to_cart($lamp->get_id(), 1);
layero_check((bool) $custom_key, 'custom product added to real Woo cart');
layero_check(WC()->cart->get_cart_item($custom_key)['layero_personalization']['fields']['number']['value'] === '0', 'zero preserved in real cart');
$_POST = array();
$simple = wc_get_product(wc_get_product_id_by_sku('QA-programozo-lampa'));
layero_check((bool) WC()->cart->add_to_cart($simple->get_id(), 1), 'ordinary product added');
WC()->cart->calculate_totals();
layero_check(! isset(WC()->payment_gateways()->get_available_payment_gateways()['cod']), 'mixed cart excludes COD');
$coupon = new WC_Coupon('layero-qa-10');
if (! $coupon->get_id()) { $coupon->set_code('layero-qa-10'); $coupon->set_discount_type('percent'); $coupon->set_amount(10); $coupon->save(); }
WC()->cart->apply_coupon('layero-qa-10'); WC()->cart->calculate_totals();
layero_check(abs(WC()->cart->get_discount_total() - 28.9) < 0.01, 'real coupon totals');
layero_check(abs((float) WC()->cart->get_shipping_total() - 20) < 0.01, 'real shipping totals');
WC()->cart->set_quantity($custom_key, 2, true);
layero_check(WC()->cart->get_cart_item($custom_key)['quantity'] === 2, 'quantity update');
WC()->cart->set_session();
layero_check(! empty(WC()->session->get('cart')[$custom_key]['layero_personalization']), 'custom data persisted in Woo session');
$order_id = WC()->checkout()->create_order(array('billing_first_name' => 'QA', 'billing_last_name' => 'Teszt', 'billing_email' => 'qa@example.invalid', 'billing_country' => 'RO', 'payment_method' => 'bacs'));
layero_check(! is_wp_error($order_id) && $order_id > 0, 'real test order created');
$order = wc_get_order($order_id); $items = $order->get_items(); $found = false;
foreach ($items as $item) { if ($item->get_product_id() === $lamp->get_id()) { $found = 'QA Teszt' === $item->get_meta('Név') && '0' === $item->get_meta('Szám'); } }
layero_check($found, 'personalization copied to actual order');
layero_check(\LayeroShop\Payment_Rules::instance()->cart_requires_prepayment(), 'prepayment retained');
WC()->cart->empty_cart();
$variable_id = wc_get_product_id_by_sku('QA-variable');
$variable = $variable_id ? wc_get_product($variable_id) : new WC_Product_Variable();
$variable->set_name('QA variációs termék'); $variable->set_sku('QA-variable'); $variable->set_status('publish');
$variable->set_catalog_visibility('hidden');
$attribute = new WC_Product_Attribute(); $attribute->set_name('Méret'); $attribute->set_options(array('Kicsi', 'Nagy')); $attribute->set_variation(true);
$variable->set_attributes(array($attribute));
$variable->update_meta_data('_layero_personalizable', 'yes');
$variable->update_meta_data('_layero_personalization_fields', $lamp->get_meta('_layero_personalization_fields'));
$variable->update_meta_data('_layero_requires_prepayment', '1'); $variable->save();
$variation_id = wc_get_product_id_by_sku('QA-variation-small');
$variation = $variation_id ? wc_get_product($variation_id) : new WC_Product_Variation();
$variation->set_parent_id($variable->get_id()); $variation->set_sku('QA-variation-small');
$variation->set_attributes(array('meret' => 'Kicsi')); $variation->set_regular_price('90'); $variation->set_status('publish'); $variation->save();
WC_Product_Variable::sync($variable->get_id());
$_POST = array('layero_fields' => array('name' => 'QA Variáció', 'number' => '7', 'color' => 'Fekete'));
$variation_key = WC()->cart->add_to_cart($variable->get_id(), 2, $variation->get_id(), array('attribute_meret' => 'Kicsi'));
layero_check((bool) $variation_key, 'native variation added with personalization');
$line = WC()->cart->get_cart_item($variation_key);
layero_check(2 === $line['quantity'] && $variation->get_id() === $line['variation_id'] && 'Fekete' === $line['layero_personalization']['fields']['color']['value'], 'variation identity and custom fields retained');
layero_check(! isset(WC()->payment_gateways()->get_available_payment_gateways()['cod']), 'variation inherits parent prepayment');
WC()->cart->empty_cart(); $_POST = array();
echo $GLOBALS['checks'] . " real WordPress/WooCommerce checks passed. Test order #" . $order_id . ". External mail and HTTP disabled.\n";
