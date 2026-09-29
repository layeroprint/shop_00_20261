<?php
// Run only against the isolated WordPress fixture, never the shop database.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
function catalog_check($ok, $label) {
    if (! $ok) { throw new RuntimeException($label); }
    echo 'PASS: ' . $label . PHP_EOL;
}
$page = get_page_by_path('termekek');
$builder = '\LayeroShop\Page_Builder';
$types = array('heading', 'text-editor', 'layero_category_bento', 'layero_product_grid', 'layero_product_carousel', 'layero_custom_cta', 'layero_trust_bar');
$widgets = array();
foreach ($types as $i => $type) {
    $widgets[] = array('id' => 'catalog' . $i, 'elType' => 'widget', 'widgetType' => $type, 'settings' => array('title' => 'Termékek'), 'elements' => array());
}
$legacy = array(array('id' => 'catalogsection', 'elType' => 'section', 'settings' => array(), 'elements' => array(array('id' => 'catalogcol', 'elType' => 'column', 'settings' => array('_column_size' => 100), 'elements' => $widgets))));
$raw = wp_json_encode($legacy);
delete_post_meta($page->ID, '_layero_catalog_revision');
delete_post_meta($page->ID, '_layero_catalog_backup_0_10_9');
update_post_meta($page->ID, '_elementor_data', wp_slash($raw));
$home_id = (int) get_option('page_on_front');
$home_before = get_post_meta($home_id, '_elementor_data', true);
wp_set_current_user(0);
$builder::maybe_upgrade_catalog();
catalog_check($raw === get_post_meta($page->ID, '_elementor_data', true), 'Anonymous request cannot change the layout.');
$admins = get_users(array('role' => 'administrator', 'number' => 1));
wp_set_current_user($admins[0]->ID);
$custom = $legacy;
$custom[0]['elements'][0]['elements'][] = array('id' => 'extra', 'elType' => 'widget', 'widgetType' => 'html', 'settings' => array('html' => '<p>Custom content</p>'));
update_post_meta($page->ID, '_elementor_data', wp_slash(wp_json_encode($custom)));
$builder::maybe_upgrade_catalog();
catalog_check(! get_post_meta($page->ID, '_layero_catalog_revision', true), 'Unrecognized customized layout is preserved.');
update_post_meta($page->ID, '_elementor_data', wp_slash($raw));
$builder::maybe_upgrade_catalog();
$after = get_post_meta($page->ID, '_elementor_data', true);
$backup = get_post_meta($page->ID, '_layero_catalog_backup_0_10_9', true);
catalog_check($raw === $backup['elementor_data'] && $page->post_content === $backup['post_content'], 'Original layout and content backed up exactly.');
catalog_check(1 === substr_count($after, 'layero_product_grid') && false === strpos($after, 'layero_category_bento') && false === strpos($after, 'layero_product_carousel'), 'Only the focused catalogue remains.');
$builder::maybe_upgrade_catalog();
catalog_check($after === get_post_meta($page->ID, '_elementor_data', true), 'Migration is idempotent.');
catalog_check($home_before === get_post_meta($home_id, '_elementor_data', true), 'Home page remains unchanged.');
update_post_meta($page->ID, '_wp_page_template', 'elementor_canvas');

foreach (array('dekoraciok' => 26, 'rajongoi' => 3) as $slug => $count) {
    $term = get_term_by('slug', $slug, 'product_cat');
    if (! $term) { $created = wp_insert_term($slug, 'product_cat', array('slug' => $slug)); $term = get_term($created['term_id'], 'product_cat'); }
    for ($i = 1; $i <= $count; $i++) {
        $sku = 'QA-catalog-' . $slug . '-' . $i;
        $id = wc_get_product_id_by_sku($sku);
        $p = $id ? wc_get_product($id) : new WC_Product_Simple();
        $p->set_name('QA ' . $slug . ' ajándék ' . $i); $p->set_sku($sku); $p->set_status('publish');
        $p->set_regular_price(100 + $i); $p->set_category_ids(array($term->term_id)); $p->set_catalog_visibility('visible');
        $promoted = 'dekoraciok' === $slug && 1 === $i;
        $p->set_sale_price($promoted ? 80 : ''); $p->set_featured($promoted);
        $p->update_meta_data('_layero_badge_keys', $promoted ? array('new') : array());
        $p->update_meta_data('_layero_personalizable', $promoted ? 'yes' : 'no');
        $p->set_rating_counts($promoted ? array(5 => 10) : array());
        $p->set_average_rating($promoted ? '5.0' : '0');
        $p->set_short_description('Kizárólag helyi ellenőrzési termék.'); $p->save();
    }
}
global $wp_query;
$wp_query = new WP_Query(array('page_id' => $page->ID, 'post_type' => 'page'));
function catalog_render($query, $settings = array()) {
    $_GET = $query;
    $widget = \Elementor\Plugin::instance()->elements_manager->create_element_instance(array('id' => 'catalogtest', 'elType' => 'widget', 'widgetType' => 'layero_product_grid', 'settings' => $settings, 'elements' => array()));
    ob_start(); (new ReflectionMethod($widget, 'render'))->invoke($widget); return ob_get_clean();
}
$html = catalog_render(array('cat' => 'dekoraciok'), array('featured' => 'yes', 'on_sale' => 'yes'));
catalog_check(false !== strpos($html, '<h1>Dekorációk</h1>'), 'Category heading is present in the first server-rendered response.');
catalog_check(false !== strpos($html, '26 termék') && false !== strpos($html, 'Következő oldal'), 'Count and pagination include all category products despite legacy promotional flags.');
catalog_check(false === strpos($html, 'QA rajongoi') && false === strpos($html, 'Vásárlás kategória szerint'), 'No unrelated products or introductory category wall.');
$second = catalog_render(array('cat' => 'dekoraciok', 'ly_page' => 2));
preg_match_all('/data-layero-product-id="(\d+)"/', $html, $first_ids);
preg_match_all('/data-layero-product-id="(\d+)"/', $second, $second_ids);
catalog_check(24 === count(array_unique($first_ids[1])) && 2 === count(array_unique($second_ids[1])) && ! array_intersect($first_ids[1], $second_ids[1]), 'Pagination has 24 + 2 distinct products, without duplicates.');
$fans = catalog_render(array('cat' => 'rajongoi', 'sort' => 'price_desc'));
catalog_check(false !== strpos($fans, '<h1>Gyűjtői / rajongói</h1>') && false !== strpos($fans, '3 termék'), 'Another category renders its own title and exact count.');
catalog_check(strpos($fans, 'QA rajongoi ajándék 3') < strpos($fans, 'QA rajongoi ajándék 1'), 'Price sorting applies within the selected category.');
$empty = catalog_render(array('cat' => 'rajongoi', 'q' => 'nincstalalat987'));
catalog_check(false !== strpos($empty, '0 termék') && false !== strpos($empty, 'Nincs találat.') && false === strpos($empty, 'QA dekoraciok'), 'Empty search stays empty instead of showing unrelated products.');
catalog_check(false !== strpos($empty, 'name="cat" value="rajongoi"') && false !== strpos($empty, 'Keresés törlése'), 'Search and clear actions preserve category context.');
$unknown = catalog_render(array('cat' => 'unknown-category-987'));
catalog_check(false !== strpos($unknown, 'Nem található kategória') && false !== strpos($unknown, '0 termék'), 'Unknown category does not fall back to all products.');
$unsafe = catalog_render(array('cat' => 'rajongoi', 'q' => '<script>alert(1)</script>"'));
catalog_check(false === strpos($unsafe, '<script>alert'), 'Search text is escaped.');
$all = catalog_render(array());
catalog_check(false !== strpos($all, '<h1>Összes termék</h1>') && false !== strpos($all, 'Következő oldal'), 'Unfiltered catalogue remains available.');
$range = catalog_render(array('cat' => 'dekoraciok', 'min_price' => '105', 'max_price' => '110', 'sort' => 'price_desc'));
catalog_check(false !== strpos($range, '6 termék') && strpos($range, 'QA dekoraciok ajándék 10') < strpos($range, 'QA dekoraciok ajándék 5'), 'Price range and descending order combine within the category.');
$sale = catalog_render(array('cat' => 'dekoraciok', 'sale' => '1', 'personalizable' => '1'));
catalog_check(false !== strpos($sale, '1 termék') && false !== strpos($sale, 'QA dekoraciok ajándék 1'), 'Sale and personalization filters use real WooCommerce data.');
foreach (array('new', 'bestseller', 'top_rated') as $facet) {
    $filtered = catalog_render(array('cat' => 'dekoraciok', $facet => '1'));
    catalog_check(false !== strpos($filtered, '1 termék'), 'Verified product metadata filters: ' . $facet);
}
$zero = catalog_render(array('cat' => 'rajongoi', 'sale' => '1'));
catalog_check(false !== strpos($zero, '0 termék') && false !== strpos($zero, 'Nincs találat.'), 'A zero-result filter does not fall back to all products.');
$paged = catalog_render(array('cat' => 'dekoraciok', 'min_price' => '100'));
catalog_check(false !== strpos($paged, '25 termék') && (bool) preg_match('/href="[^"]*min_price=100[^"]*ly_page=2/', $paged), 'Pagination preserves active price filters.');
catalog_check(false !== strpos($range, 'lyr-catalog-layout') && false !== strpos($range, 'Termékszűrők') && (bool) preg_match('/aria-current="page"[^>]+cat=dekoraciok/', $range), 'Sidebar layout and selected category pill render on the first response.');
$facets = \LayeroShop\Catalog::listing_facets('dekoraciok', '', array());
catalog_check(1 === $facets['counts']['sale'] && 1 === $facets['counts']['personalizable'] && 80.0 === $facets['min'] && 126.0 === $facets['max'], 'Facet counts and price bounds come from the selected category.');
catalog_check(array('min_price' => 80.5, 'max_price' => 200.0, 'sale' => '1') === \LayeroShop\Catalog::filter_state(array('min_price' => '200', 'max_price' => '80,50', 'sale' => '1')), 'Reversed and decimal ranges are normalized.');
catalog_check(array() === \LayeroShop\Catalog::filter_state(array('min_price' => array('50'), 'max_price' => 'bad', 'sale' => array('1'))), 'Malformed query parameters are ignored safely.');
echo 'Preview: ' . home_url('/termekek/?cat=dekoraciok') . PHP_EOL;
