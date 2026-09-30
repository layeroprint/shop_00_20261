<?php
/** Layero review presentation; all counts and comments come from WooCommerce. */
defined('ABSPATH') || exit;
global $product;
$review_count = $product->get_review_count();
$rating_count = $product->get_rating_count();
$ratings_enabled = wc_review_ratings_enabled();
$reviews_open = comments_open($product->get_id()) && wc_reviews_enabled();
?>
<section class="sh-band sh-band--tight sh-product-reviews lyr-single-reviews<?php echo $review_count ? '' : ' is-empty'; ?>" id="sh-velemenyek" data-product-panel>
	<div class="shop-wrap">
		<div class="sh-product-sectionhead"><span class="sh-label sh-kicker">Tapasztalatok</span><h2 class="sh-h2">Vásárlói vélemények</h2><p>Akik már kézbe vették ezt a darabot.</p></div>
		<div class="sh-review-layout">
			<aside class="sh-review-summary" aria-label="Értékelések összesítése">
				<span class="sh-review-summary__label">Vásárlói értékelés</span>
				<?php if ($rating_count && $ratings_enabled) : ?>
					<div class="sh-review-score"><strong><?php echo esc_html(number_format_i18n((float) $product->get_average_rating(), 1)); ?></strong><span>/ 5</span></div>
					<div class="sh-review-summary__stars"><?php echo wc_get_rating_html($product->get_average_rating(), $rating_count); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
					<p><?php echo esc_html(number_format_i18n($rating_count)); ?> értékelés alapján</p>
				<?php elseif (! $review_count) : ?>
					<div class="sh-review-summary__stars is-empty" aria-hidden="true">☆☆☆☆☆</div><h3>Még nincs pontszám</h3><p>Az első értékelés még várat magára.</p>
				<?php else : ?>
					<h3><?php echo esc_html(number_format_i18n($review_count)); ?> vásárlói vélemény</h3><p>Olvasd el a termékről megosztott tapasztalatokat.</p>
				<?php endif; ?>
				<div class="sh-review-summary__help"><b>Kérdésed van?</b><p>Szívesen segítünk a választásban.</p><a href="<?php echo esc_url(home_url('/kapcsolat/')); ?>">Írj nekünk <span aria-hidden="true">→</span></a></div>
			</aside>
			<div class="sh-review-content">
				<?php if (! $review_count) : ?>
					<div class="sh-review-empty">
						<span class="sh-review-empty__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z"/><path d="M8 10h8m-8 4h5"/></svg></span>
						<span class="sh-label sh-kicker">A te tapasztalatod is számít</span><h3>Még nincs vásárlói vélemény</h3><p>Ehhez a termékhez még nem érkezett értékelés. Ha kérdésed van az anyagról, a méretről vagy a személyre szabásról, szívesen segítünk.</p>
						<a class="sh-btn sh-btn--ghost" href="<?php echo esc_url(home_url('/kapcsolat/')); ?>">Kérdezek a termékről <span aria-hidden="true">→</span></a>
					</div>
				<?php endif; ?>
				<?php \LayeroShop\Single_Product::reviews(); ?>
				<?php if (! $reviews_open) : ?><p class="sh-review-closed">Ehhez a termékhez jelenleg nem lehet új véleményt beküldeni.</p><?php endif; ?>
			</div>
		</div>
	</div>
</section>
