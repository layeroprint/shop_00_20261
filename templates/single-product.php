<?php
/** Layero product layout, backed by the actual WooCommerce product. */
if (! defined('ABSPATH')) { exit; }

global $post, $product;
$post = get_queried_object();
setup_postdata($post);
$product = wc_get_product($post->ID);

$image_ids = array_values(array_filter(array_merge(array($product->get_image_id()), $product->get_gallery_image_ids())));
$image_ids = array_values(array_unique(array_map('absint', $image_ids)));
$terms = get_the_terms($product->get_id(), 'product_cat');
$category = $terms && ! is_wp_error($terms) ? reset($terms) : null;
if ($category && $category->parent) {
	$ancestors = get_ancestors($category->term_id, 'product_cat');
	$root = $ancestors ? get_term(end($ancestors), 'product_cat') : null;
	if ($root && ! is_wp_error($root)) { $category = $root; }
}
$category_url = $category ? \LayeroShop\Helpers::products_url($category->slug) : \LayeroShop\Helpers::products_url();
$personalizable = \LayeroShop\Helpers::product_is_personalizable($product);
$description = $product->get_description();
$short_description = $product->get_short_description();
$has_specifications = $product->has_attributes() || $product->has_weight() || $product->has_dimensions();
$related_ids = function_exists('wc_get_related_products') ? wc_get_related_products($product->get_id(), 4) : array();
$regular = (float) $product->get_regular_price();
$current = (float) $product->get_price();
$discount = $product->is_type('simple') && $product->is_on_sale() && $regular > $current && $current > 0
	? (int) round(100 * ($regular - $current) / $regular) : 0;

get_header();
?>
<main id="content" class="lyr-single-product woocommerce" data-layero-single-product>
	<?php if (function_exists('wc_print_notices')) { wc_print_notices(); } ?>
	<nav class="sh-crumbs shop-wrap" aria-label="Morzsamenü">
		<a href="<?php echo esc_url(home_url('/')); ?>">Shop</a><span aria-hidden="true">/</span>
		<a href="<?php echo esc_url($category_url); ?>"><?php echo esc_html($category ? $category->name : 'Termékek'); ?></a><span aria-hidden="true">/</span>
		<span aria-current="page"><?php echo esc_html($product->get_name()); ?></span>
	</nav>
	<div class="sh-product shop-wrap">
		<div class="sh-pgallery">
			<div class="lyr-pgallery__main">
				<?php if ($image_ids) : ?>
					<?php echo wp_get_attachment_image($image_ids[0], 'full', false, array('id' => 'lyr-product-main-image', 'alt' => $product->get_name(), 'fetchpriority' => 'high')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<button class="lyr-gallery-zoom" type="button" data-layero-gallery-open aria-label="Kép nagyítása">⛶ Nagyítás</button>
				<?php else : ?>
					<?php echo wc_placeholder_img('woocommerce_single'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endif; ?>
				<?php if ($personalizable) : ?><div class="sh-persz-preview" id="lyr-product-preview" aria-hidden="true"></div><?php endif; ?>
			</div>
			<?php if (count($image_ids) > 1) : ?>
				<div class="sh-pgallery__thumbs" aria-label="Termékképek">
					<?php foreach ($image_ids as $index => $image_id) : ?>
						<button type="button" class="<?php echo 0 === $index ? 'is-on' : ''; ?>" data-layero-gallery-image="<?php echo esc_url(wp_get_attachment_image_url($image_id, 'full')); ?>" data-layero-gallery-alt="<?php echo esc_attr(get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $product->get_name()); ?>" aria-label="<?php echo esc_attr(sprintf('%d. termékkép', $index + 1)); ?>" aria-pressed="<?php echo 0 === $index ? 'true' : 'false'; ?>">
							<?php echo wp_get_attachment_image($image_id, 'woocommerce_thumbnail', false, array('alt' => '', 'loading' => 'lazy')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</button>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
		<div class="sh-pinfo">
			<?php if ($category) : ?><span class="sh-pinfo__cat"><?php echo esc_html($category->name); ?></span><?php endif; ?>
			<h1><?php echo esc_html($product->get_name()); ?></h1>
			<?php if ($product->get_rating_count() && function_exists('wc_get_rating_html')) : ?>
				<div class="sh-rate"><?php echo wc_get_rating_html($product->get_average_rating(), $product->get_rating_count()); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span>(<?php echo esc_html(number_format_i18n($product->get_rating_count())); ?>)</span></div>
			<?php endif; ?>
			<div class="sh-pinfo__price"><?php echo wp_kses_post($product->get_price_html()); ?><?php if ($discount) : ?><span class="sh-pdp-save">−<?php echo esc_html($discount); ?>%</span><?php endif; ?></div>
			<?php if ($short_description) : ?><div class="sh-pinfo__desc"><?php echo wp_kses_post(wpautop($short_description)); ?></div><?php endif; ?>
			<div class="lyr-single-buy">
				<?php woocommerce_template_single_add_to_cart(); ?>
				<?php if (! $product->is_purchasable() && ! $product->is_type('external')) : ?><a class="sh-btn sh-btn--primary" href="<?php echo esc_url(home_url('/kapcsolat/')); ?>">Érdeklődöm</a><?php endif; ?>
			</div>
			<ul class="sh-ptrust">
				<li><span><b>Szatmárnémetiben készül</b> — saját műhelyünkben, Romániában</span></li>
				<?php $lead_time = (string) $product->get_meta('_layero_lead_time_custom', true); if ($lead_time) : ?><li><span><b>Gyártási idő:</b> <?php echo esc_html($lead_time); ?></span></li><?php endif; ?>
				<li><span><b>Fizetés és szállítás:</b> az elérhető módokat és díjakat a pénztár mutatja.</span></li>
			</ul>
			<div class="sh-guarantee"><div class="sh-guarantee__grid">
				<div class="sh-guarantee__item"><div><b>Garancia és visszaküldés</b><span>A részleteket a tájékoztatóban találod.</span></div></div>
				<div class="sh-guarantee__item"><div><b>Segítség a rendeléshez</b><span>Kérdés esetén írj nekünk.</span></div></div>
			</div><p class="sh-guarantee__legal"><a href="<?php echo esc_url(home_url('/gyik/#visszakuldes')); ?>">Visszaküldési tájékoztató</a> · <a href="<?php echo esc_url(home_url('/kapcsolat/')); ?>">Kapcsolatfelvétel</a></p></div>
		</div>
	</div>
	<?php if ($description || $has_specifications) : ?>
	<section class="sh-band sh-band--gray"><div class="shop-wrap sh-longdesc">
		<div class="sh-longdesc__text"><h2 class="sh-h2">Részletes leírás.</h2><?php echo $description ? wp_kses_post(apply_filters('the_content', $description)) : '<p>A termék részletes leírása még nem érhető el.</p>'; ?></div>
		<?php if ($has_specifications) : ?><aside class="sh-specs"><h3>Specifikáció</h3><?php wc_display_product_attributes($product); ?></aside><?php endif; ?>
	</div></section>
	<?php endif; ?>
	<section class="sh-band sh-band--tight"><div class="shop-wrap lyr-single-accordion"><div class="sh-acc">
		<details><summary>Szállítás és fizetés</summary><div><p>A választható szállítási és fizetési módokat, valamint az aktuális díjakat a pénztár mutatja.</p><p><a href="<?php echo esc_url(home_url('/gyik/#szallitas')); ?>">Szállítási tájékoztató</a></p></div></details>
		<details><summary>Visszaküldés és garancia</summary><div><p>A termékre vonatkozó feltételeket a visszaküldési és garanciális tájékoztatóban találod.</p><p><a href="<?php echo esc_url(home_url('/gyik/#visszakuldes')); ?>">Részletek megtekintése</a></p></div></details>
		<?php if ($personalizable) : ?><details><summary>Így zajlik a személyre szabás</summary><div><p>Írd be a termékhez kért adatokat a fenti mezőkbe. A pontos elhelyezést a tervezéskor egyeztetjük.</p></div></details><?php endif; ?>
	</div></div></section>
	<?php if (comments_open($product->get_id())) : ?><section class="sh-section shop-wrap lyr-single-reviews"><h2 class="sh-h2">Vásárlói vélemények.</h2><?php comments_template(); ?></section><?php endif; ?>
	<?php if ($related_ids) : ?><section class="sh-section shop-wrap"><div class="sh-section-hd"><span class="sh-label sh-kicker">Ajánló</span><h2 class="sh-h2">Hasonló termékek.</h2><a class="sh-link" href="<?php echo esc_url($category_url); ?>">Összes ›</a></div><div class="sh-prod-grid">
		<?php foreach ($related_ids as $related_id) { $related = wc_get_product($related_id); if ($related && $related->is_visible()) { echo \LayeroShop\Helpers::product_card($related); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} } ?>
	</div></section><?php endif; ?>
	<?php if ($image_ids) : ?><dialog class="lyr-gallery-dialog" id="lyr-gallery-dialog" aria-label="Termékkép nagyítása"><button type="button" data-layero-gallery-close aria-label="Bezárás">×</button><img src="<?php echo esc_url(wp_get_attachment_image_url($image_ids[0], 'full')); ?>" alt="<?php echo esc_attr($product->get_name()); ?>"></dialog><?php endif; ?>
</main>
<?php wp_reset_postdata(); get_footer(); ?>
