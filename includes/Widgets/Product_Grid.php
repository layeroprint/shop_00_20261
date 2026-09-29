<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;
use LayeroShop\Catalog;

if (! defined('ABSPATH')) {
	exit;
}

class Product_Grid extends Base_Widget {
	protected function is_dynamic_content(): bool {
		return true;
	}

	public function get_name() {
		return 'layero_product_grid';
	}

	public function get_title() {
		return __('Layero termékrács', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-products';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Szekció', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Bestsellerek',
			'title' => 'Népszerű termékek. <span>Amit a legtöbben visznek.</span>',
			'button_text' => 'Mind',
			'button_url' => array('url' => '/termekek/'),
		));
		$this->add_heading_tag_control();
		$this->end_controls_section();

		$this->start_controls_section('query_section', array('label' => __('Termékek', 'layero-shop-ui')));
		$this->add_control('category', array(
			'label' => __('Kategória slug', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'description' => __('Üresen hagyva minden kategóriából válogat. Shop slugok: lampak, kulcstartok, dekoraciok, ceges, rajongoi, egyedi.', 'layero-shop-ui'),
		));
		$this->add_control('collection', array(
			'label' => __('Fallback válogatás', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'popular',
			'options' => array(
				'popular' => __('Népszerű', 'layero-shop-ui'),
				'new' => __('Újdonságok', 'layero-shop-ui'),
				'sale' => __('Akciós', 'layero-shop-ui'),
				'all' => __('Alap sorrend', 'layero-shop-ui'),
			),
		));
		$this->add_control('limit', array(
			'label' => __('Darabszám', 'layero-shop-ui'),
			'type' => Controls_Manager::NUMBER,
			'default' => 8,
			'min' => 1,
			'max' => 24,
		));
		$this->add_responsive_control('columns', array(
			'label' => __('Oszlopok', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => '4',
			'tablet_default' => '2',
			'mobile_default' => '1',
			'options' => array('1' => '1', '2' => '2', '3' => '3', '4' => '4'),
			'selectors' => array(
				'{{WRAPPER}} .sh-prod-grid' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
			),
		));
		$this->add_control('featured', array(
			'label' => __('Csak kiemelt WooCommerce termékek', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
		));
		$this->add_control('on_sale', array(
			'label' => __('Csak akciós WooCommerce termékek', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
		));
		$this->add_control('show_excerpt', array(
			'label' => __('Leírás mutatása', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->end_controls_section();

		$this->add_section_header_style_controls();

		$this->start_controls_section('grid_style', array(
			'label' => __('Rács', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_responsive_control('gap', array(
			'label' => __('Rés', 'layero-shop-ui'),
			'type' => Controls_Manager::SLIDER,
			'size_units' => array('px', 'rem'),
			'range' => array('px' => array('min' => 0, 'max' => 60)),
			'selectors' => array(
				'{{WRAPPER}} .sh-prod-grid' => 'gap: {{SIZE}}{{UNIT}};',
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$limit = isset($settings['limit']) ? absint($settings['limit']) : 8;
		$collection = $settings['collection'] ?? 'popular';
		$is_listing = $this->is_page_context(array('termekek', 'shop'));
		$is_favorites = $this->is_page_context(array('kedvencek'));
		$active_category = sanitize_title($settings['category'] ?? '');
		$search = '';
		$sort = 'recommended';
		$page = 1;

		if ($is_listing) {
			$active_category = isset($_GET['cat']) && is_string($_GET['cat']) ? sanitize_title(wp_unslash($_GET['cat'])) : $active_category;
			$search = isset($_GET['q']) && is_string($_GET['q']) ? sanitize_text_field(wp_unslash($_GET['q'])) : '';
			$sort = isset($_GET['sort']) && is_string($_GET['sort']) ? sanitize_key(wp_unslash($_GET['sort'])) : 'recommended';
			if (! in_array($sort, array('recommended', 'price_asc', 'price_desc', 'new', 'name'), true)) { $sort = 'recommended'; }
			$collection = 'all';
			$limit = max(24, $limit);
			$page = isset($_GET['ly_page']) && is_scalar($_GET['ly_page']) ? max(1, absint($_GET['ly_page'])) : 1;
		}

		if ($is_favorites) {
			$collection = 'all';
			$limit = max(24, $limit);
		}

		$woo_sort = $this->woo_sort_args($sort, $collection);
		$filters = $is_listing ? Catalog::filter_state($_GET) : array();
		$facets = $is_listing ? Catalog::listing_facets($active_category, $search, $filters) : null;
		$query_settings = array(
			'limit' => $limit,
			'paginate' => $is_listing,
			'page' => 1,
			'offset' => ($page - 1) * $limit,
			'category' => $active_category,
			'featured' => ! $is_listing && 'yes' === ($settings['featured'] ?? ''),
			'on_sale' => ! $is_listing && 'yes' === ($settings['on_sale'] ?? ''),
			'orderby' => $woo_sort['orderby'],
			'order' => $woo_sort['order'],
			'search' => $search,
		);
		if ($is_listing && Helpers::is_woo_active()) {
			$query_settings['matching_ids'] = $facets['ids'];
			$query_settings['search'] = ''; // Already matched against the visible catalogue, including descriptions.
		}
		$result = Helpers::query_products($query_settings);
		$products = is_object($result) ? $result->products : $result;
		$total = is_object($result) ? (int) $result->total : count($products);
		$has_next = $is_listing && $page * $limit < $total;
		$use_demo = ! Helpers::is_woo_active();
		$columns = in_array(($settings['columns'] ?? '4'), array('1', '2', '3', '4'), true) ? ($settings['columns'] ?? '4') : '4';
		$card_args = array('show_excerpt' => 'yes' === ($settings['show_excerpt'] ?? 'yes'));
		$demo_products = $use_demo ? $this->demo_products($limit, $active_category, $collection, $search, $sort) : array();
		$grid_attrs = $is_favorites ? ' data-layero-favorites-grid' : '';
		$section_classes = 'sh-band sh-band--tight lyr-products';
		$section_classes .= (! $is_listing && ! $is_favorites) ? ' sh-band--gray' : '';
		$section_classes .= $is_listing ? ' lyr-products--listing' : '';
		$section_classes .= $is_favorites ? ' lyr-products--favorites' : '';
		?>
		<section class="<?php echo esc_attr($section_classes); ?>">
			<?php if ($is_listing) : ?>
				<?php $this->render_listing_header($active_category, $search, $use_demo ? count($demo_products) : $total); ?>
			<?php endif; ?>
			<div class="shop-wrap">
			<?php if (! $is_listing) : ?>
				<?php $this->render_section_header($settings); ?>
			<?php endif; ?>
			<?php if ($is_listing) : ?>
				<?php $this->render_listing_toolbar($active_category, $search, $sort, $filters); ?>
				<div class="lyr-catalog-layout">
				<?php $this->render_listing_filters($active_category, $search, $sort, $filters, $facets); ?>
				<div class="lyr-catalog-results">
			<?php endif; ?>
			<?php if ($is_favorites) : ?>
				<div class="lyr-products-empty" data-layero-favorites-empty hidden>
					<h3><?php esc_html_e('Még nincs kedvenc terméked.', 'layero-shop-ui'); ?></h3>
					<p><?php esc_html_e('A termékkártyák szív ikonjával tudsz ide menteni termékeket.', 'layero-shop-ui'); ?></p>
					<a class="lyr-btn lyr-btn--primary" href="<?php echo esc_url(Helpers::products_url()); ?>"><?php esc_html_e('Termékek böngészése', 'layero-shop-ui'); ?></a>
				</div>
			<?php endif; ?>
			<div class="sh-prod-grid lyr-product-grid lyr-product-grid--cols-<?php echo esc_attr($columns); ?>"<?php echo $grid_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
				<?php if ($use_demo) : ?>
					<?php foreach ($demo_products as $product) : ?>
						<?php echo Helpers::demo_product_card($product, $card_args); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php endforeach; ?>
				<?php else : ?>
					<?php foreach ($products as $product) : ?>
						<?php echo Helpers::product_card($product, $card_args); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php endforeach; ?>
				<?php endif; ?>
			</div>
			<?php if ($is_listing && ($has_next || $page > 1)) : ?>
				<nav class="lyr-pagination" aria-label="<?php esc_attr_e('Terméklista lapozása', 'layero-shop-ui'); ?>">
					<?php if ($page > 1) : ?><a class="sh-btn sh-btn--ghost" href="<?php echo esc_url(Helpers::products_url($active_category, array_merge($filters, array('q' => $search, 'sort' => $sort, 'ly_page' => $page - 1)))); ?>"><?php esc_html_e('Előző oldal', 'layero-shop-ui'); ?></a><?php endif; ?>
					<span><?php echo esc_html(sprintf(__('%d. oldal', 'layero-shop-ui'), $page)); ?></span>
					<?php if ($has_next) : ?><a class="sh-btn sh-btn--ghost" href="<?php echo esc_url(Helpers::products_url($active_category, array_merge($filters, array('q' => $search, 'sort' => $sort, 'ly_page' => $page + 1)))); ?>"><?php esc_html_e('Következő oldal', 'layero-shop-ui'); ?></a><?php endif; ?>
				</nav>
			<?php endif; ?>
			<?php if (($use_demo && empty($demo_products)) || (! $use_demo && empty($products))) : ?>
				<div class="lyr-products-empty">
					<h3><?php esc_html_e('Nincs találat.', 'layero-shop-ui'); ?></h3>
					<p><?php esc_html_e('Próbálj más kategóriát vagy keresési kifejezést.', 'layero-shop-ui'); ?></p>
					<?php if ('' !== $search) : ?><a class="lyr-btn lyr-btn--primary" href="<?php echo esc_url(Helpers::products_url($active_category)); ?>"><?php esc_html_e('Keresés törlése', 'layero-shop-ui'); ?></a><?php endif; ?>
					<a class="lyr-btn lyr-btn--primary" href="<?php echo esc_url(Helpers::products_url()); ?>"><?php esc_html_e('Összes termék', 'layero-shop-ui'); ?></a>
				</div>
			<?php endif; ?>
			<?php if ($is_listing) : ?></div></div><?php endif; ?>
			</div>
		</section>
		<?php
	}

	private function is_page_context($slugs) {
		if (function_exists('is_page') && is_page($slugs)) {
			return true;
		}

		if (! function_exists('get_queried_object_id') || ! function_exists('get_post_field')) {
			return false;
		}

		$slug = (string) get_post_field('post_name', get_queried_object_id());

		return in_array($slug, (array) $slugs, true);
	}

	private function woo_sort_args($sort, $collection) {
		switch ($sort) {
			case 'price_asc':
				return array('orderby' => 'price', 'order' => 'ASC');
			case 'price_desc':
				return array('orderby' => 'price', 'order' => 'DESC');
			case 'name':
				return array('orderby' => 'title', 'order' => 'ASC');
			case 'new':
				return array('orderby' => 'date', 'order' => 'DESC');
			default:
				return array('orderby' => 'new' === $collection ? 'date' : 'menu_order', 'order' => 'DESC');
		}
	}

	private function demo_products($limit, $category, $collection, $search, $sort) {
		$products = Shop_Content::demo_products($limit, $category, $collection);

		if ('' !== $search) {
			$needle = function_exists('mb_strtolower') ? mb_strtolower($search) : strtolower($search);
			$products = array_values(
				array_filter(
					$products,
					function ($product) use ($needle) {
						$haystack = $product['name'] . ' ' . $product['description'] . ' ' . $product['category'];
						$haystack = function_exists('mb_strtolower') ? mb_strtolower($haystack) : strtolower($haystack);

						return false !== strpos($haystack, $needle);
					}
				)
			);
		}

		usort(
			$products,
			function ($a, $b) use ($sort) {
				switch ($sort) {
					case 'price_asc':
						return (int) $a['price'] <=> (int) $b['price'];
					case 'price_desc':
						return (int) $b['price'] <=> (int) $a['price'];
					case 'name':
						return strcasecmp($a['name'], $b['name']);
					case 'new':
						return strcmp($b['id'], $a['id']);
					default:
						return 0;
				}
			}
		);

		return $products;
	}

	private function listing_category($slug) {
		$category = Shop_Content::category_by_slug($slug);
		if (! $category && '' !== $slug && taxonomy_exists('product_cat')) {
			$term = get_term_by('slug', $slug, 'product_cat');
			if ($term && ! is_wp_error($term)) { $category = array('name' => $term->name, 'description' => wp_strip_all_tags($term->description)); }
		}
		return $category;
	}

	private function render_listing_header($active_category, $search, $total) {
		$category = $this->listing_category($active_category);
		$title = $category ? $category['name'] : ('' !== $active_category ? __('Nem található kategória', 'layero-shop-ui') : __('Összes termék', 'layero-shop-ui'));
		$description = $category ? $category['description'] : __('Találd meg a hozzá illő ajándékot — válassz kategóriát, vagy keress egy konkrét ötletre.', 'layero-shop-ui');
		?>
		<header class="lyr-catalog-head sh-band--dark"><div class="shop-wrap">
			<nav class="lyr-catalog-crumbs" aria-label="<?php esc_attr_e('Morzsamenü', 'layero-shop-ui'); ?>">
				<a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Főoldal', 'layero-shop-ui'); ?></a><span aria-hidden="true">/</span>
				<?php if ('' !== $active_category) : ?><a href="<?php echo esc_url(Helpers::products_url()); ?>"><?php esc_html_e('Termékek', 'layero-shop-ui'); ?></a><span aria-hidden="true">/</span><?php endif; ?>
				<span aria-current="page"><?php echo esc_html($title); ?></span>
			</nav>
			<div class="lyr-catalog-title"><h1><?php echo esc_html($title); ?></h1><span class="lyr-catalog-count"><?php echo esc_html(sprintf(__('%d termék', 'layero-shop-ui'), $total)); ?></span></div>
			<p><?php echo esc_html($description); ?></p>
			<?php if ('' !== $search) : ?><div class="lyr-catalog-query"><?php echo esc_html(sprintf(__('Keresés: „%s”', 'layero-shop-ui'), $search)); ?> <a href="<?php echo esc_url(Helpers::products_url($active_category)); ?>"><?php esc_html_e('Keresés törlése', 'layero-shop-ui'); ?></a></div><?php endif; ?>
		</div></header>
		<?php
	}

	private function hidden_filters($args) {
		foreach ($args as $key => $value) {
			if ('' !== $value && null !== $value) { echo '<input type="hidden" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '">'; }
		}
	}

	private function render_listing_toolbar($active_category, $search, $sort, $filters) {
		$base = array_merge($filters, array('q' => $search, 'sort' => $sort));
		?>
		<div class="lyr-catalog-toolbar">
			<nav class="lyr-catalog-pills sh-pills" aria-label="Termékkategóriák">
				<a class="sh-pill <?php echo '' === $active_category ? 'is-active' : ''; ?>" <?php if ('' === $active_category) { echo 'aria-current="page"'; } ?> href="<?php echo esc_url(Helpers::products_url('', $base)); ?>">Mind</a>
				<?php foreach (Shop_Content::categories() as $category) : ?>
				<a class="sh-pill <?php echo $active_category === $category['id'] ? 'is-active' : ''; ?>" <?php if ($active_category === $category['id']) { echo 'aria-current="page"'; } ?> href="<?php echo esc_url(Helpers::products_url($category['id'], $base)); ?>"><?php echo esc_html($category['name']); ?></a>
				<?php endforeach; ?>
			</nav>
			<div class="lyr-catalog-tools">
				<form class="lyr-product-search" action="<?php echo esc_url(Helpers::products_url()); ?>" method="get" role="search">
					<?php $this->hidden_filters(array_merge($filters, array('cat' => $active_category, 'sort' => $sort))); ?>
					<input type="search" name="q" aria-label="Keresés a kiválasztott termékek között" value="<?php echo esc_attr($search); ?>" placeholder="Keresés a termékek között…">
					<button class="sh-btn sh-btn--ghost" type="submit">Keresés</button>
				</form>
				<form class="lyr-product-sort" action="<?php echo esc_url(Helpers::products_url()); ?>" method="get">
					<?php $this->hidden_filters(array_merge($filters, array('cat' => $active_category, 'q' => $search))); ?>
					<select name="sort" aria-label="Rendezés" onchange="this.form.submit()">
						<?php foreach (array('recommended' => 'Ajánlott sorrend', 'price_asc' => 'Ár szerint növekvő', 'price_desc' => 'Ár szerint csökkenő', 'new' => 'Legújabb elöl', 'name' => 'Név szerint') as $key => $label) : ?>
						<option value="<?php echo esc_attr($key); ?>" <?php selected($sort, $key); ?>><?php echo esc_html($label); ?></option>
						<?php endforeach; ?>
					</select><noscript><button type="submit">Rendezés</button></noscript>
				</form>
			</div>
		</div>
		<?php
	}

	private function render_listing_filters($category, $search, $sort, $filters, $facets) {
		$min = $filters['min_price'] ?? $facets['min'];
		$max = $filters['max_price'] ?? $facets['max'];
		$low_bound = min($facets['min'], $min);
		$high_bound = max($facets['max'], $max, $low_bound + 1);
		?>
		<aside class="lyr-catalog-sidebar" aria-label="Termékszűrők">
			<details class="lyr-catalog-filters" open>
				<summary>Szűrők <?php if ($filters) : ?><span><?php echo esc_html(count($filters)); ?> aktív</span><?php endif; ?><i aria-hidden="true">+</i></summary>
				<form action="<?php echo esc_url(Helpers::products_url()); ?>" method="get">
					<?php $this->hidden_filters(array('cat' => $category, 'q' => $search, 'sort' => $sort)); ?>
					<a class="lyr-catalog-reset" href="<?php echo esc_url(Helpers::products_url($category, array('q' => $search, 'sort' => $sort))); ?>">Szűrők törlése</a>
					<fieldset><legend>Ár · <?php echo esc_html(function_exists('get_woocommerce_currency') ? get_woocommerce_currency() : 'RON'); ?></legend>
						<div class="sh-range lyr-catalog-range">
							<div class="sh-range__track"><i></i></div>
							<input type="range" data-price-range="min_price" aria-label="Minimum ár csúszka" min="<?php echo esc_attr($low_bound); ?>" max="<?php echo esc_attr($high_bound); ?>" step="0.01" value="<?php echo esc_attr($min); ?>">
							<input type="range" data-price-range="max_price" aria-label="Maximum ár csúszka" min="<?php echo esc_attr($low_bound); ?>" max="<?php echo esc_attr($high_bound); ?>" step="0.01" value="<?php echo esc_attr($max); ?>">
						</div>
						<div class="lyr-catalog-price"><label>Minimum<input type="number" name="min_price" aria-label="Minimum ár" min="0" step="0.01" placeholder="<?php echo esc_attr($facets['min']); ?>" value="<?php echo isset($filters['min_price']) ? esc_attr($min) : ''; ?>"></label><span>–</span><label>Maximum<input type="number" name="max_price" aria-label="Maximum ár" min="0" step="0.01" placeholder="<?php echo esc_attr($facets['max']); ?>" value="<?php echo isset($filters['max_price']) ? esc_attr($max) : ''; ?>"></label></div>
					</fieldset>
					<?php foreach (array('Ajánlatok' => array('sale', 'new', 'bestseller'), 'Tulajdonságok' => array('personalizable'), 'Értékelés' => array('top_rated')) as $title => $keys) : ?>
					<fieldset><legend><?php echo esc_html($title); ?></legend>
						<?php foreach ($keys as $key) : ?>
						<label class="lyr-catalog-check"><input type="checkbox" name="<?php echo esc_attr($key); ?>" value="1" <?php checked(! empty($filters[$key])); ?>><span><?php echo esc_html(Catalog::filter_labels()[$key]); ?></span><small><?php echo esc_html($facets['counts'][$key]); ?></small></label>
						<?php endforeach; ?>
					</fieldset>
					<?php endforeach; ?>
					<button class="sh-btn sh-btn--primary" type="submit">Szűrés alkalmazása</button>
				</form>
			</details>
		</aside>
		<?php
	}
}
