<?php
// Run only in the isolated local fixture; no production requests or data writes.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
\LayeroShop\Assets::instance()->enqueue();
ob_start(); wp_print_scripts(array('layero-static-data')); $markup = ob_get_clean();
if (false !== strpos($markup, 'src=') || false === strpos($markup, 'window.SHOP_PRODUCTS = ') || false === strpos($markup, 'window.SHOP_CATS = ') || false === strpos($markup, 'window.SHOP_VARIANSOK = ')) {
    throw new RuntimeException('WooCommerce catalogue must initialize without downloading the preview data.');
}
if (! preg_match('/window.SHOP_PRODUCTS = (.*?);window.SHOP_CATS = /s', $markup, $match)) {
    throw new RuntimeException('Missing public catalogue payload.');
}
$products = json_decode($match[1], true);
if (! is_array($products) || count($products) !== count(\LayeroShop\Catalog::products())) {
    throw new RuntimeException('Public products were lost from the inline bootstrap.');
}
foreach ($products as $product) {
    if (! isset($product['wc_id'], $product['url'], $product['ar'], $product['hosszu'], $product['opciok']) || array() !== $product['opciok']) {
        throw new RuntimeException('Product data contract changed.');
    }
}
echo 'PASS: WooCommerce inline bootstrap retains all products and no preview download.' . PHP_EOL;
