<?php
// Only the disposable local WordPress database; no live orders or external mail.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Disposable local WordPress required.');
}
if (! has_filter('pre_wp_mail') || ! has_filter('pre_http_request')) { throw new RuntimeException('Outbound test guards required.'); }
$file = dirname(__DIR__, 2) . '/output/shop-fixes-20260930/lampak-nevmezok-2.csv';
$handle = fopen($file, 'r');
if (! $handle) { throw new RuntimeException('Product-source CSV missing.'); }
$headers = fgetcsv($handle, 0, ',', '"', ''); $rows = array();
while (false !== ($row = fgetcsv($handle, 0, ',', '"', ''))) { $rows[] = array_combine($headers, $row); }
fclose($handle);
if (2 !== count($rows)) { throw new RuntimeException('Exactly two source products expected.'); }
$checks = 0; $products = array(); $order = null;
$check = function ($condition, $message) use (&$checks) { if (! $condition) { throw new RuntimeException('FAIL: ' . $message); } $checks++; };
wc_load_cart(); WC()->cart->empty_cart();
try {
	foreach ($rows as $index => $row) {
		$product = new WC_Product_Simple();
		$product->set_name('QA névmező ' . $index); $product->set_regular_price('70'); $product->set_status('publish');
		$product->set_sku('QA-name-field-' . wp_generate_uuid4());
		foreach ($row as $key => $value) { if (0 === strpos($key, 'Meta: ')) { $product->update_meta_data(substr($key, 6), $value); } }
		$product->save(); $products[] = $product;
		$schema = \LayeroShop\Personalization::schema($product);
		$check(! is_wp_error($schema) && ! empty($schema['field_0']['required']), 'source has a required name');
		$check(\LayeroShop\Helpers::product_is_personalizable($product), 'source activates personalization and filter');
		ob_start(); \LayeroShop\Personalization::render($schema); $html = ob_get_clean();
		$check((bool) preg_match('/name="layero_fields\[field_0\]"[^>]* required/', $html), 'required input is rendered');
		$_POST = array('layero_fields' => array('field_0' => '  ')); wc_clear_notices();
		$check(false === apply_filters('woocommerce_add_to_cart_validation', true, $product->get_id(), 1), 'blank name rejected on server');
		$check(wc_notice_count('error') > 0, 'blank name gets a useful error');
		$_POST = array('layero_fields' => array('field_0' => str_repeat('Á', 101)));
		$check(false === apply_filters('woocommerce_add_to_cart_validation', true, $product->get_id(), 1), 'overlong Unicode name rejected');
		$_POST = array('layero_fields' => array('field_0' => 'Bálint', 'unknown' => 'tampered'));
		$check(false === apply_filters('woocommerce_add_to_cart_validation', true, $product->get_id(), 1), 'unknown fields rejected');
		$_POST = wp_slash(array('layero_fields' => array('field_0' => 'Bálint'))); wc_clear_notices();
		$first = WC()->cart->add_to_cart($product->get_id(), 1);
		$check((bool) $first, 'name accepted without optional birth data');
		$check('Bálint' === WC()->cart->get_cart_item($first)['layero_personalization']['fields']['field_0']['value'], 'Unicode name stored in cart');
		$_POST = wp_slash(array('layero_fields' => array('field_0' => "Ági O'Neil")));
		$second = WC()->cart->add_to_cart($product->get_id(), 1);
		$check($first !== $second && (bool) $second, 'different names form separate cart lines');
		$display = apply_filters('woocommerce_get_item_data', array(), WC()->cart->get_cart_item($second));
		$check(in_array("Ági O'Neil", array_column($display, 'value'), true) || in_array(esc_html("Ági O'Neil"), array_column($display, 'value'), true), 'cart displays the name');
		if (isset($schema['field_1'])) {
			$check(! $schema['field_1']['required'], 'birth data is optional');
			$_POST = wp_slash(array('layero_fields' => array('field_0' => 'Léna', 'field_1' => "2026.09.30. 08:15\n3200 g, 51 cm")));
			$birth = WC()->cart->add_to_cart($product->get_id(), 1);
			$check(strpos(WC()->cart->get_cart_item($birth)['layero_personalization']['fields']['field_1']['value'], "\n") !== false, 'optional multiline birth data stored');
		}
	}
	WC()->cart->calculate_totals(); WC()->cart->set_session();
	foreach (WC()->session->get('cart') as $line) { $check(! empty($line['layero_personalization']['fields']['field_0']['value']), 'name persists in WooCommerce session'); }
	$id = WC()->checkout()->create_order(array('billing_first_name' => 'QA', 'billing_last_name' => 'Teszt', 'billing_email' => 'qa@example.invalid', 'billing_country' => 'RO', 'payment_method' => ''));
	$check(! is_wp_error($id) && $id > 0, 'local order created without payment');
	$order = wc_get_order($id); $check(5 === count($order->get_items()), 'all five personalized lines retained');
	foreach ($order->get_items() as $item) {
		$name = $item->get_meta('A baba neve') ?: $item->get_meta('Név a lámpára');
		$check(in_array($name, array('Bálint', "Ági O'Neil", 'Léna'), true), 'actual order retains the requested name');
	}
	echo $checks . " source-schema and real WooCommerce checks passed. No external mail or payment.\n";
} finally {
	WC()->cart->empty_cart();
	if ($order) { $order->delete(true); }
	foreach ($products as $product) { $product->delete(true); }
	wc_clear_notices(); $_POST = array();
}
