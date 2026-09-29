<?php
// Run only through WP-CLI on the disposable local fixture. Never on the shop database.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('This fixture requires the isolated local QA database.');
}
add_filter('pre_wp_mail', '__return_true', 10000);
add_filter('pre_http_request', function () { return new WP_Error('local_qa', 'External requests disabled during QA.'); }, PHP_INT_MAX);

update_option('woocommerce_currency', 'RON');
update_option('woocommerce_default_country', 'RO');
update_option('woocommerce_coming_soon', 'no');
update_option('woocommerce_enable_signup_and_login_from_checkout', 'no');
update_option('woocommerce_enable_guest_checkout', 'yes');
update_option('woocommerce_cod_settings', array('enabled' => 'yes', 'title' => 'QA Cash on delivery'));
update_option('woocommerce_bacs_settings', array('enabled' => 'yes', 'title' => 'QA Test transfer'));
update_option('permalink_structure', '/%postname%/');
update_option('blog_public', 0);
$term = get_term_by('slug', 'lampak', 'product_cat');
if (! $term) { $created = wp_insert_term('Tematikus lámpák', 'product_cat', array('slug' => 'lampak')); $term = get_term($created['term_id'], 'product_cat'); }
$products = array('szam-lampa-nevvel' => 70, 'programozo-lampa' => 219, 'jurassic-lampa' => 199, 'hullam-gomblampa' => 249, 'karacsonyi-lampa' => 229, 'holdfeny-lampa' => 159);
$names = array('szam-lampa-nevvel' => 'Névre szóló szám-lámpa', 'holdfeny-lampa' => 'Holdfény erdei lámpa');
foreach ($products as $slug => $price) {
	$id = wc_get_product_id_by_sku('QA-' . $slug);
	$p = $id ? wc_get_product($id) : new WC_Product_Simple();
	$p->set_name($names[$slug] ?? 'QA ' . $slug); $p->set_slug($slug); $p->set_sku('QA-' . $slug);
	$p->set_status('publish'); $p->set_regular_price($price); $p->set_category_ids(array($term->term_id));
	$p->set_short_description('Helyi ellenőrzési termék, nem valódi kínálat.');
	$p->set_stock_status('instock'); $p->set_manage_stock(true); $p->set_stock_quantity(100);
	$p->update_meta_data('_layero_personalizable', 'no');
	if ('szam-lampa-nevvel' === $slug) {
		$p->update_meta_data('_layero_personalizable', 'yes'); $p->update_meta_data('_layero_requires_prepayment', '1');
		$p->update_meta_data('_layero_personalization_fields', wp_json_encode(array(
			array('id' => 'name', 'label' => 'Név', 'type' => 'text', 'required' => true, 'maxlength' => 40),
			array('id' => 'number', 'label' => 'Szám', 'type' => 'number', 'required' => true),
			array('id' => 'color', 'label' => 'Szín', 'type' => 'select', 'options' => array('Fehér', 'Fekete'), 'required' => true),
		)));
	}
	$p->save();
}
for ($i = 1; $i <= 25; $i++) {
	$id = wc_get_product_id_by_sku('QA-extra-' . $i);
	$p = $id ? wc_get_product($id) : new WC_Product_Simple();
	$p->set_name('QA katalógus ' . $i); $p->set_sku('QA-extra-' . $i); $p->set_status('publish'); $p->set_regular_price(10 + $i);
	$p->update_meta_data('_layero_personalizable', 'no'); $p->save();
}
$id = wc_get_product_id_by_sku('QA-hidden');
$p = $id ? wc_get_product($id) : new WC_Product_Simple();
$p->set_name('QA titkos termék'); $p->set_sku('QA-hidden'); $p->set_status('publish'); $p->set_regular_price(1); $p->set_catalog_visibility('hidden'); $p->save();
$pages = array(
	'home' => array('Főoldal', 'layero_product_spotlight', array()),
	'termekek' => array('Termékek', 'layero_product_grid', array('collection' => 'all', 'limit' => 24, 'title' => 'Termékek')),
	'kapcsolat' => array('Kapcsolat', 'layero_static_page', array('page' => 'kapcsolat')),
	'cegeknek' => array('Cégeknek', 'layero_corporate_quote', array()),
);
foreach ($pages as $slug => $page) {
	$post = get_page_by_path($slug);
	$id = wp_insert_post(array('ID' => $post ? $post->ID : 0, 'post_type' => 'page', 'post_status' => 'publish', 'post_title' => $page[0], 'post_name' => $slug));
	update_post_meta($id, '_elementor_edit_mode', 'builder');
	update_post_meta($id, '_wp_page_template', 'elementor_header_footer');
	update_post_meta($id, '_elementor_data', wp_slash(wp_json_encode(array(array('id' => 'qasection', 'elType' => 'section', 'settings' => array(), 'elements' => array(array(
		'id' => 'qacolumn', 'elType' => 'column', 'settings' => array('_column_size' => 100), 'elements' => array(array('id' => 'qawidget', 'elType' => 'widget', 'widgetType' => $page[1], 'settings' => $page[2], 'elements' => array()))
	)))))));
	if ('home' === $slug) { update_option('show_on_front', 'page'); update_option('page_on_front', $id); }
}
foreach (array('kosar' => array('Kosár', 'woocommerce_cart', 'woocommerce_cart_page_id'), 'penztar' => array('Pénztár', 'woocommerce_checkout', 'woocommerce_checkout_page_id')) as $slug => $row) {
	$post = get_page_by_path($slug);
	$id = wp_insert_post(array('ID' => $post ? $post->ID : 0, 'post_type' => 'page', 'post_status' => 'publish', 'post_title' => $row[0], 'post_name' => $slug, 'post_content' => '[' . $row[1] . ']'));
	update_option($row[2], $id);
}
$zones = WC_Shipping_Zones::get_zones();
if (! $zones) {
	$zone = new WC_Shipping_Zone(); $zone->set_zone_name('QA Romania'); $zone->add_location('RO', 'country'); $zone->save();
	$method = $zone->add_shipping_method('flat_rate');
	update_option('woocommerce_flat_rate_' . $method . '_settings', array('enabled' => 'yes', 'title' => 'QA szállítás', 'cost' => '20', 'tax_status' => 'none'));
}
flush_rewrite_rules();
echo "Local QA fixture ready.\n";
