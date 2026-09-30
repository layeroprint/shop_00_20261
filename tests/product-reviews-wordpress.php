<?php
/** Run only in the isolated local WordPress fixture; leave no comments or products. */
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
$options = array();
foreach (array('woocommerce_enable_reviews', 'woocommerce_enable_review_rating', 'woocommerce_review_rating_verification_required', 'page_comments', 'comments_per_page') as $key) { $options[$key] = get_option($key); }
$fixture = new WC_Product_Simple();
$fixture->set_name('QA review presentation'); $fixture->set_status('publish'); $fixture->set_regular_price('50'); $fixture->set_reviews_allowed(true);
$id = $fixture->save();
$comments = array();
$render = function () use ($id) {
	global $post, $product, $wp_query, $wp_the_query;
	$wp_query = new WP_Query(array('post_type' => 'product', 'p' => $id)); $wp_the_query = $wp_query;
	$post = get_post($id); setup_postdata($post); $product = wc_get_product($id);
	ob_start(); include LAYERO_SHOP_UI_PATH . 'templates/product-review-panel.php'; return ob_get_clean();
};
try {
	update_option('woocommerce_enable_reviews', 'yes'); update_option('woocommerce_enable_review_rating', 'yes'); update_option('woocommerce_review_rating_verification_required', 'no'); update_option('page_comments', false);
	$html = $render();
	$check(strpos($html, 'Még nincs vásárlói vélemény') !== false && strpos($html, 'Még nincs pontszám') !== false, 'honest empty state');
	$check(preg_match('/name=[\'\"]comment_post_ID[\'\"][^>]*value=[\'\"]' . $id . '[\'\"]/', $html) && strpos($html, 'name="rating"') !== false, 'native form retains product identity and rating');
	$check(strpos($html, 'sh-review-score') === false, 'no invented rating');
	foreach (array(array(5, 1, 'QA first', 'QA approved first'), array(3, 1, 'QA second', 'QA approved second'), array(1, 0, 'QA pending', 'QA pending must stay private')) as $entry) {
		$comment = wp_insert_comment(array('comment_post_ID' => $id, 'comment_author' => $entry[2], 'comment_author_email' => 'qa@example.invalid', 'comment_content' => $entry[3], 'comment_type' => 'review', 'comment_approved' => $entry[1]));
		$comments[] = $comment; update_comment_meta($comment, 'rating', $entry[0]);
	}
	WC_Comments::clear_transients($id);
	$html = $render();
	$check(wc_get_product($id)->get_review_count() === 2 && (float) wc_get_product($id)->get_average_rating() === 4.0, 'approved reviews determine count and average');
	$check(strpos($html, 'QA approved first') !== false && strpos($html, 'QA approved second') !== false, 'native review cards render approved comments');
	$check(strpos($html, 'QA pending must stay private') === false, 'pending review stays private');
	$check(strpos($html, 'Még nincs vásárlói vélemény') === false, 'empty state removed when reviews exist');
	update_option('page_comments', true); update_option('comments_per_page', 1);
	$html = $render();
	$check(strpos($html, 'woocommerce-pagination') !== false, 'native review pagination retained');
	$check((strpos($html, 'QA approved first') !== false) !== (strpos($html, 'QA approved second') !== false), 'one approved review per configured page');
	update_option('page_comments', false);
	update_option('woocommerce_review_rating_verification_required', 'yes');
	$html = $render();
	$check(strpos($html, 'woocommerce-verification-required') !== false && strpos($html, 'id="commentform"') === false, 'verified buyer restriction retained');
	wp_update_post(array('ID' => $id, 'comment_status' => 'closed'));
	$html = $render();
	$check(strpos($html, 'QA approved first') !== false && strpos($html, 'id="commentform"') === false, 'closing new reviews preserves approved history');
	$check(strpos($html, 'QA pending must stay private') === false, 'closed history does not expose pending review');
	update_option('woocommerce_enable_review_rating', 'no');
	$html = $render();
	$check(strpos($html, 'sh-review-score') === false, 'disabled star scoring respected');
	$check(strpos(apply_filters('comments_template', 'unchanged'), '/templates/product-reviews.php') === false, 'template filter removed after rendering');
	$check(apply_filters('gettext', 'Your rating', 'Your rating', 'woocommerce') === 'Your rating', 'form label translation does not leak to other views');
} finally {
	foreach ($comments as $comment) { wp_delete_comment($comment, true); }
	wp_delete_post($id, true);
	foreach ($options as $key => $value) { update_option($key, $value); }
	wp_reset_postdata();
}
echo $checks . " product-review checks passed. Temporary fixtures removed.\n";
