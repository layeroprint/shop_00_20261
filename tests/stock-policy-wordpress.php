<?php
// Run only in the isolated, outbound-blocked WordPress fixture.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Local QA database required.');
}
function stock_policy_check($ok, $label) {
	if (! $ok) { throw new RuntimeException($label); }
	echo 'PASS: ' . $label . PHP_EOL;
}
$created = array();
$order = null;
try {
	stock_policy_check('no' === get_option('woocommerce_manage_stock'), 'Global quantity tracking is disabled.');
	stock_policy_check('no_amount' === get_option('woocommerce_stock_format'), 'Stock amounts are hidden for WooCommerce blocks.');
	$attributes = apply_filters('woocommerce_display_product_attributes', array('material' => array('label' => 'Anyag', 'value' => 'PLA'), 'time' => array('label' => 'Gyártási idő', 'value' => '3–7 munkanap'), 'stock' => array('label' => 'Készlet', 'value' => '2 db')));
	stock_policy_check(array('material') === array_keys($attributes), 'Imported attributes retain material and hide time / stock.');
	$simple = new WC_Product_Simple();
	$simple->set_name('Layero stock policy QA');
	$simple->set_regular_price('100');
	$simple->set_manage_stock(true);
	$simple->set_stock_quantity(2);
	$simple->update_meta_data('_layero_lead_time', '3-7');
	$simple->update_meta_data('_layero_lead_time_custom', '3–7 munkanap');
	$simple->save();
	$created[] = $simple;
	$parent = new WC_Product_Variable();
	$parent->set_name('Layero stock policy parent QA');
	$parent->set_manage_stock(true);
	$parent->set_stock_quantity(2);
	$parent->save();
	$created[] = $parent;
	$variation = new WC_Product_Variation();
	$variation->set_parent_id($parent->get_id());
	$variation->set_regular_price('100');
	$variation->save();
	$created[] = $variation;
	foreach (array($simple, $variation) as $product) {
		stock_policy_check(! $product->managing_stock() && $product->has_enough_stock(10), 'Simple / inherited variation quantity is not limited by stock.');
		stock_policy_check(-1 === $product->get_max_purchase_quantity(), 'No stock-based quantity maximum.');
		stock_policy_check('' === wc_get_stock_html($product), 'Native stock HTML is empty.');
		$product->update_meta_data('_layero_badge_config', array(array('id' => 'lowStock', 'value' => 2), array('id' => 'productionTime', 'value' => '3–7 munkanap'), array('id' => 'personal')));
		foreach (array('auto', 'manual') as $mode) {
			$product->update_meta_data('_layero_badge_mode', $mode);
			$items = \LayeroShop\Badge_System::for_product($product);
			stock_policy_check(array('personal') === array_column($items, 'id'), 'Automatic / manual badge configuration hides stock and time.');
		}
	}
	stock_policy_check('' === \LayeroShop\Helpers::product_lead_time_label($simple), 'Legacy production time is not displayed.');
	stock_policy_check('' === \LayeroShop\Helpers::product_card_chips_html($simple), 'Server-rendered card contains no time chip.');
	$order = wc_create_order();
	$order->add_product($simple, 10);
	$order->add_product($variation, 10);
	$order->calculate_totals();
	wc_reduce_stock_levels($order->get_id());
	stock_policy_check(2 === wc_get_product($simple->get_id())->get_stock_quantity() && 2 === wc_get_product($parent->get_id())->get_stock_quantity(), 'Orders do not decrement simple or parent stock.');
} finally {
	if ($order) { $order->delete(true); }
	foreach (array_reverse($created) as $product) { $product->delete(true); }
}
