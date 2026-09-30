<?php
// Isolated fixture only: no live shop data, external mail or HTTP.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
function search_check($ok, $label) {
    if (! $ok) { throw new RuntimeException($label); }
    echo 'PASS: ' . $label . PHP_EOL;
}
use LayeroShop\Catalog;
$ids = array();
try {
    foreach (array(
        array('Qasearch Motoros borostartó', 'Motívum, dombornyomott felület.'),
        array('Qasearch Szív lámpa', 'Motoros motívum és általános marketingszöveg.'),
        array('Qasearch Assassin LED tábla', 'A motívum részletei.')
    ) as $row) {
        $product = new WC_Product_Simple();
        $product->set_name($row[0]); $product->set_status('publish');
        $product->set_catalog_visibility('visible'); $product->set_regular_price(10);
        $product->set_short_description($row[1]); $product->set_description($row[1]);
        $ids[] = $product->save();
    }
    $cache = new ReflectionProperty(Catalog::class, 'products'); $cache->setAccessible(true); $cache->setValue(null, null);
    $matches = Catalog::listing_facets('', 'qasearch mot', array());
    search_check(array($ids[0]) === $matches['ids'], 'mot finds Motoros, excluding motif/description matches.');
    search_check(array($ids[1]) === Catalog::listing_facets('', 'LAM  qasearch   SZIV', array())['ids'], 'Accents, case, spaces and reversed query words work.');
    search_check(! Catalog::listing_facets('', 'qasearch oros', array())['ids'], 'A fragment inside a word does not match.');
    search_check(! Catalog::listing_facets('', '---', array())['ids'], 'Punctuation-only query does not expose the entire catalogue.');
    search_check(! Catalog::listing_facets('', 'qasearch nincstalalat987', array())['ids'], 'No fallback products for an empty result.');
    search_check(array($ids[0]) === Catalog::listing_facets('', 'qasearch mot', array('min_price' => 5, 'max_price' => 15))['ids'], 'Price filters keep the matching product.');
    search_check(! Catalog::listing_facets('', 'qasearch mot', array('min_price' => 15))['ids'], 'Price filters can narrow search to zero.');
    $page = get_page_by_path('termekek');
    global $wp_query;
    $wp_query = new WP_Query(array('page_id' => $page->ID, 'post_type' => 'page'));
    $_GET = array('q' => 'qasearch mot');
    $widget = \Elementor\Plugin::instance()->elements_manager->create_element_instance(array('id' => 'searchtest', 'elType' => 'widget', 'widgetType' => 'layero_product_grid', 'settings' => array(), 'elements' => array()));
    ob_start(); (new ReflectionMethod($widget, 'render'))->invoke($widget); $html = ob_get_clean();
    search_check(false !== strpos($html, '1 termék') && false !== strpos($html, 'Qasearch Motoros') && false === strpos($html, 'Qasearch Assassin'), 'Native WooCommerce query renders exactly the matching product.');
    $_GET['min_price'] = '15';
    ob_start(); (new ReflectionMethod($widget, 'render'))->invoke($widget); $empty = ob_get_clean();
    search_check(false !== strpos($empty, '0 termék') && false !== strpos($empty, 'Nincs találat.'), 'Native filtered listing stays empty with no fallback.');
    $snapshot = Catalog::snapshot();
    foreach ($snapshot['products'] as $row) {
        if (! in_array($row['wc_id'], $ids, true)) { continue; }
        search_check(isset($row['search_details']) && false === strpos($row['search_details'], 'motívum'), 'Suggestions receive structured fields without description copy.');
    }
    $words = Catalog::search_words('mot');
    search_check(Catalog::search_score('Motoros borostartó', '', $words) > Catalog::search_score('Ajándék', 'Motoros', $words), 'Product names rank above secondary fields.');
    search_check(Catalog::search_score('Szív lámpa', 'Kék', Catalog::search_words('kek lam')) > 0, 'Explicit option values combine with product names.');
} finally {
    foreach ($ids as $id) { $product = wc_get_product($id); if ($product) { $product->delete(true); } }
    if (isset($cache)) { $cache->setValue(null, null); }
}
