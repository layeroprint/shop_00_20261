<?php
// Run only in the isolated, outbound-blocked WordPress fixture.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Local QA database required.');
}
function badge_check($ok, $label) {
	if (! $ok) { throw new RuntimeException($label); }
	echo 'PASS: ' . $label . PHP_EOL;
}
use LayeroShop\Badge_System;
use LayeroShop\Helpers;
$product = new WC_Product_Simple();
$product->set_name('Badge ellenőrző termék');
$product->set_regular_price('100');
$product->set_sale_price('80');
$product->set_price('80');
$product->set_featured(true);
$product->update_meta_data('_layero_personalizable', 'no');
$product->update_meta_data('_layero_lead_time', 'none');
$product->save();
try {
	$items = Badge_System::for_product($product);
	$ids = array_column($items, 'id');
	badge_check(in_array('salePercent', $ids, true), 'WooCommerce sale produces a percentage.');
	badge_check(! in_array('bestseller', $ids, true), 'Featured does not invent bestseller.');
	badge_check(! in_array('inStock', $ids, true), 'Orderable does not imply physical stock.');
	badge_check(! in_array('personal', $ids, true), 'Disabled personalization has no badge.');
	$_POST = array('_layero_badge_system_present' => '1', '_layero_badge_system_ids' => array('logo', 'photo', 'giftWrap', 'productionTime'), '_layero_badge_system_values' => array('productionTime' => '3–7 munkanap'));
	Badge_System::save($product);
	$product->save();
	$loaded = wc_get_product($product->get_id());
	badge_check(count($loaded->get_meta('_layero_badge_config', true)) === 4, 'Multiple badges persist and reload.');
	$old = $product->get_meta('_layero_badge_config', true);
	$_POST['_layero_badge_system_ids'] = array('lowStock');
	$_POST['_layero_badge_system_values'] = array('lowStock' => '0');
	Badge_System::save($product);
	badge_check($old === $product->get_meta('_layero_badge_config', true), 'Invalid values preserve previous settings.');
	$_POST = array();
	Badge_System::save($product);
	badge_check($old === $product->get_meta('_layero_badge_config', true), 'Unrelated saves preserve badge configuration.');
	$product->set_stock_status('outofstock');
	badge_check(! in_array('soldOut', array_column(Badge_System::for_product($product), 'id'), true), 'Stock status is not published as a badge.');
	$product->set_stock_status('instock');
	$product->update_meta_data('_layero_product_badges', '"<script>alert(1)</script>|info');
	$html = Helpers::product_card($product);
	badge_check(false === strpos($html, '<script>'), 'Merchant label cannot inject script markup.');
	badge_check(false !== strpos($html, 'data-lyrb-badges="[') && false !== strpos($html, '&quot;id&quot;'), 'Badge JSON is attribute escaped.');
	$product->update_meta_data('_layero_product_badges', '');
	$html = str_replace('sh-reveal', 'sh-reveal is-in', Helpers::product_card($product));
	$variable = new WC_Product_Variable();
	$variable->set_regular_price('100'); $variable->set_sale_price('80'); $variable->set_price('80');
	$method = new ReflectionMethod(Helpers::class, 'product_sale_badge_label'); $method->setAccessible(true);
	badge_check('Akció' === $method->invoke(null, $variable), 'Variable products do not mix unrelated variation prices.');
	ob_start(); Badge_System::admin_fields($product); $admin = ob_get_clean();
	badge_check(56 === substr_count($admin, 'type="checkbox"'), 'All 56 badge types are editable.');
	$base = LAYERO_SHOP_UI_URL;
	$styles = array('assets/css/layero-shop-ui.css', 'assets/css/layero-static-shop.css', 'assets/css/layero-online.css', 'assets/demo/layero-badges/layero-badges.css');
	$preview = '<!doctype html><html lang="hu"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>WordPress badge próba</title>';
	foreach ($styles as $style) { $preview .= '<link rel="stylesheet" href="' . esc_url($base . $style) . '">'; }
	$preview .= '<body><main class="shop-wrap" style="padding-top:30px"><div class="sh-prod-grid" data-lyrb-auto>' . $html . $html . '</div></main><script src="' . esc_url($base . 'assets/demo/layero-badges/layero-badges.js') . '"></script><script src="' . esc_url($base . 'assets/demo/layero-badges/layero-adapter.js') . '"></script></body></html>';
	badge_check(false !== file_put_contents(dirname(rtrim(LAYERO_SHOP_UI_PATH, '/\\')) . '/output/badge-wp-preview.html', $preview), 'WordPress card preview saved.');
} finally {
	$_POST = array();
	$product->delete(true);
}
