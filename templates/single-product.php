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
$related_ids = \LayeroShop\Single_Product::related_ids($product);

get_header();
?>
<main id="content" class="lyr-single-product woocommerce" data-layero-single-product data-layero-page="termek">
	<?php if (function_exists('wc_print_notices')) { wc_print_notices(); } ?>
	<nav class="sh-crumbs shop-wrap" aria-label="Morzsamenü">
		<a href="<?php echo esc_url(home_url('/')); ?>">Shop</a><span aria-hidden="true">/</span>
		<a href="<?php echo esc_url($category_url); ?>"><?php echo esc_html($category ? $category->name : 'Termékek'); ?></a><span aria-hidden="true">/</span>
		<span aria-current="page"><?php echo esc_html($product->get_name()); ?></span>
	</nav>
	<div class="sh-product shop-wrap">
		<div class="sh-pgallery">
			<div class="sh-pstage">
				<?php if ($image_ids) : ?>
					<button class="sh-pgallery__main" type="button" data-layero-gallery-open aria-label="Termékkép nagyítása" aria-haspopup="dialog">
					<?php echo wp_get_attachment_image($image_ids[0], 'full', false, array('id' => 'lyr-product-main-image', 'alt' => $product->get_name(), 'fetchpriority' => 'high')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</button>
				<?php else : ?>
					<div class="sh-pgallery__main"><?php echo wc_placeholder_img('woocommerce_single'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<?php endif; ?>
				<div class="sh-pstage__badges"><span>Layero kollekció</span></div>
				<button class="sh-heart sh-pstage__wish" type="button" data-layero-wish-toggle data-layero-product-id="<?php echo esc_attr($product->get_id()); ?>" aria-label="Kedvencekhez adás" aria-pressed="false"><?php echo \LayeroShop\Helpers::icon('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></button>
			</div>
			<?php if ($image_ids) : ?><div class="sh-pgallery__caption"><span>Kép <b data-layero-gallery-index>01</b> / <?php echo esc_html(sprintf('%02d', count($image_ids))); ?></span><span>Kattints a nagyításhoz</span></div><?php endif; ?>
			<?php if (count($image_ids) > 1) : ?>
				<div class="sh-pgallery__thumbs" aria-label="Termékképek">
					<?php foreach ($image_ids as $index => $image_id) : ?>
						<button type="button" class="<?php echo 0 === $index ? 'is-on' : ''; ?>" data-layero-gallery-image="<?php echo esc_url(wp_get_attachment_image_url($image_id, 'full')); ?>" data-layero-gallery-alt="<?php echo esc_attr(get_post_meta($image_id, '_wp_attachment_image_alt', true) ?: $product->get_name()); ?>" aria-label="<?php echo esc_attr(sprintf('%d. termékkép', $index + 1)); ?>" aria-pressed="<?php echo 0 === $index ? 'true' : 'false'; ?>">
							<?php echo wp_get_attachment_image($image_id, 'woocommerce_thumbnail', false, array('alt' => '', 'loading' => 'lazy')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span aria-hidden="true"><?php echo esc_html(sprintf('%02d', $index + 1)); ?></span>
						</button>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
			<?php if ($personalizable) : ?><div class="sh-pname-preview" data-layero-name-preview hidden><div><b>A te feliratod</b><small>Szemléltetés; az elhelyezést egyeztetjük.</small></div><span id="lyr-product-preview">A TE NEVED</span></div><?php endif; ?>
		</div>
		<div class="sh-pinfo">
			<span class="sh-pinfo__cat">Layero kollekció / <?php echo esc_html($category ? $category->name : 'Egyedi tárgyak'); ?></span>
			<h1><?php echo esc_html($product->get_name()); ?></h1>
			<div class="lyrb-product-details" data-lyrb-details="<?php echo esc_attr(wp_json_encode(\LayeroShop\Badge_System::for_product($product))); ?>"></div>
			<?php if ($short_description) : ?><div class="sh-pinfo__desc"><?php echo wp_kses_post(wpautop($short_description)); ?></div><?php endif; ?>
			<?php if ($product->get_rating_count() && function_exists('wc_get_rating_html')) : ?>
				<div class="sh-rate"><?php echo wc_get_rating_html($product->get_average_rating(), $product->get_rating_count()); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span>(<?php echo esc_html(number_format_i18n($product->get_rating_count())); ?>)</span></div>
			<?php elseif (comments_open($product->get_id())) : ?>
				<a class="sh-pinfo__review" href="#sh-velemenyek"><span aria-hidden="true">☆</span> Még nincs értékelés</a>
			<?php endif; ?>
			<div class="sh-pprice"><div><div class="sh-pinfo__price"><?php echo wp_kses_post($product->get_price_html()); ?></div><?php if ('' !== $product->get_price()) : ?><small><?php echo esc_html(get_woocommerce_currency()); ?> / darab</small><?php endif; ?></div></div>
			<div class="lyr-single-buy">
				<?php woocommerce_template_single_add_to_cart(); ?>
				<?php if (! $product->is_purchasable() && ! $product->is_type('external')) : ?><a class="sh-btn sh-btn--primary" href="<?php echo esc_url(home_url('/kapcsolat/')); ?>">Érdeklődöm</a><?php endif; ?>
			</div>
			<p class="sh-product-payment-note">Az elérhető fizetési és szállítási módokat a pénztár mutatja.</p>
			<ul class="sh-product-benefits">
				<li><?php echo \LayeroShop\Helpers::icon('package'); ?><span><b>Saját műhely</b><small>Szatmárnémetiben</small></span></li>
				<li><?php echo \LayeroShop\Helpers::icon('heart'); ?><span><b>Személyes ajándék</b><small>Ötletből emlék</small></span></li>
				<li><?php echo \LayeroShop\Helpers::icon('mail'); ?><a href="<?php echo esc_url(home_url('/kapcsolat/')); ?>"><b>Kérdezz bátran</b><small>Segítünk az ötletedben</small></a></li>
			</ul>
			<div class="sh-product-volume"><span>Több darabban gondolkodsz?</span><a href="<?php echo esc_url(home_url('/cegeknek/')); ?>">Kérj egyedi ajánlatot <span aria-hidden="true">→</span></a></div>
		</div>
	</div>
	<nav class="sh-product-nav" aria-label="Termékinformációk"><div class="shop-wrap">
		<?php if ($description || $has_specifications) : ?><a href="#sh-product-details">A termékről</a><?php endif; ?>
		<a href="#sh-product-shipping">Szállítás és tudnivalók</a>
		<?php if (comments_open($product->get_id())) : ?><a href="#sh-velemenyek">Vélemények</a><?php endif; ?>
		<?php if ($related_ids) : ?><a href="#sh-product-related">Hasonló darabok</a><?php endif; ?>
	</div></nav>
	<?php if ($description || $has_specifications) : ?>
	<section class="sh-band sh-product-details" id="sh-product-details"><div class="shop-wrap sh-longdesc">
		<div class="sh-longdesc__text"><span class="sh-label sh-kicker">Ismerd meg közelebbről</span><h2 class="sh-h2">A részletekben rejlik.</h2><?php echo $description ? wp_kses_post(apply_filters('the_content', $description)) : '<p>A termék részletes leírása még nem érhető el.</p>'; ?></div>
		<?php if ($has_specifications) : ?><aside class="sh-specs"><h3>Specifikáció</h3><?php wc_display_product_attributes($product); ?></aside><?php endif; ?>
	</div></section>
	<?php endif; ?>
	<section class="sh-band sh-band--tight" id="sh-product-shipping"><div class="shop-wrap lyr-single-accordion"><div class="sh-product-sectionhead"><span class="sh-label sh-kicker">Jó tudni</span><h2 class="sh-h2">Mielőtt megérkezik.</h2></div><div class="sh-acc">
		<details><summary>Szállítás és fizetés</summary><div><p>A választható szállítási és fizetési módokat, valamint az aktuális díjakat a pénztár mutatja.</p><p><a href="<?php echo esc_url(home_url('/gyik/#szallitas')); ?>">Szállítási tájékoztató</a></p></div></details>
		<details><summary>Visszaküldés és garancia</summary><div><p>A termékre vonatkozó feltételeket a visszaküldési és garanciális tájékoztatóban találod.</p><p><a href="<?php echo esc_url(home_url('/gyik/#visszakuldes')); ?>">Részletek megtekintése</a></p></div></details>
		<?php if ($personalizable) : ?><details><summary>Így zajlik a személyre szabás</summary><div><p>Írd be a termékhez kért adatokat a fenti mezőkbe. A pontos elhelyezést a tervezéskor egyeztetjük.</p></div></details><?php endif; ?>
	</div></div></section>
	<?php if (comments_open($product->get_id())) : ?><section class="sh-section shop-wrap lyr-single-reviews" id="sh-velemenyek"><h2 class="sh-h2">Vásárlói vélemények.</h2><?php comments_template(); ?></section><?php endif; ?>
	<?php if ($related_ids) : ?><section class="sh-section shop-wrap" id="sh-product-related"><div class="sh-section-hd"><span class="sh-label sh-kicker">Ajánló</span><h2 class="sh-h2">Hasonló termékek.</h2><a class="sh-link" href="<?php echo esc_url($category_url); ?>">Összes ›</a></div><div class="sh-prod-grid">
		<?php foreach ($related_ids as $related_id) { $related = wc_get_product($related_id); if ($related && $related->is_visible()) { echo \LayeroShop\Helpers::product_card($related); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} } ?>
	</div></section><?php endif; ?>
	<?php if ($image_ids) : ?><dialog class="lyr-gallery-dialog" id="lyr-gallery-dialog" aria-label="Termékkép nagyítása"><button type="button" data-layero-gallery-close aria-label="Bezárás">×</button><img src="<?php echo esc_url(wp_get_attachment_image_url($image_ids[0], 'full')); ?>" alt="<?php echo esc_attr($product->get_name()); ?>"></dialog><?php endif; ?>
</main>
<?php wp_reset_postdata(); get_footer(); ?>
