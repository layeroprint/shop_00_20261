<?php
/** Keep the native Woo form, verification rules, comment hooks and pagination. */
defined('ABSPATH') || exit;
if (comments_open() && wc_reviews_enabled()) {
	wc_get_template('single-product-reviews.php');
	return;
}
// Woo's default template returns early when comments close. Keep approved history.
if (! have_comments()) { return; }
?>
<div id="reviews" class="woocommerce-Reviews"><div id="comments">
	<ol class="commentlist"><?php wp_list_comments(apply_filters('woocommerce_product_review_list_args', array('callback' => 'woocommerce_comments'))); ?></ol>
	<?php if (get_comment_pages_count() > 1 && get_option('page_comments')) : ?><nav class="woocommerce-pagination" aria-label="Vélemények lapozása"><?php paginate_comments_links(array('type' => 'list')); ?></nav><?php endif; ?>
</div></div>
