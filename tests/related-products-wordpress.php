<?php
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) { throw new RuntimeException('Local test database required.'); }
$made = array(); $term = wp_insert_term('QA theme ' . wp_generate_uuid4(), 'product_cat'); $theme = $term['term_id'];
$make = function ($name, $family, $shared = true, $visibility = 'visible') use (&$made, $theme) {
	$p = new WC_Product_Simple(); $p->set_name('QA ' . $name); $p->set_status('publish'); $p->set_regular_price('70'); $p->set_catalog_visibility($visibility);
	$p->update_meta_data('_layero_product_type', $family); if ($shared) { $p->set_category_ids(array($theme)); } $p->save(); $made[] = $p; return $p;
};
try {
	$source = $make('source lamp', 'lampak'); $same = $make('matching lamp', 'lampak'); $key = $make('same theme keyring', 'kulcstartok'); $other = $make('other lamp', 'lampak', false); $hidden = $make('hidden lamp', 'lampak', true, 'hidden');
	$ids = \LayeroShop\Single_Product::related_ids($source, 100);
	if (! in_array($same->get_id(), $ids, true) || ! in_array($other->get_id(), $ids, true) || in_array($key->get_id(), $ids, true) || in_array($hidden->get_id(), $ids, true) || in_array($source->get_id(), $ids, true) || array_search($same->get_id(), $ids, true) > array_search($other->get_id(), $ids, true)) { throw new RuntimeException('Related product family/visibility/ranking failed.'); }
	if (count(\LayeroShop\Single_Product::related_ids($source, 1)) !== 1) { throw new RuntimeException('Limit failed.'); }
	echo "7 related product checks passed.\n";
} finally { foreach ($made as $p) { $p->delete(true); } wp_delete_term($theme, 'product_cat'); }
