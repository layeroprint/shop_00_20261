<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Category_Bento extends Base_Widget {
	public function get_name() {
		return 'layero_category_bento';
	}

	public function get_title() {
		return __('Layero kategóriák', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Kollekció',
			'title' => 'Vásárlás kategória szerint.',
			'button_text' => 'Összes termék',
			'button_url' => array('url' => '/termekek/'),
		));
		$this->add_heading_tag_control();
		$this->add_control('slugs', array(
			'label' => __('Kategória slugok', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'lampak,kulcstartok,dekoraciok,szezonalis,rajongoi,baba-gyerek,ceges,egyedi',
			'description' => __('Vesszővel elválasztva. Ezek a jelenlegi statikus shop kategóriái.', 'layero-shop-ui'),
		));
		$this->add_control('highlight_first', array(
			'label' => __('Első kategória nagy kártya', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->add_control('show_count', array(
			'label' => __('Termékszám mutatása', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->add_control('show_quote_categories', array(
			'label' => __('Ajánlatkérési kategóriák mutatása', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
			'separator' => 'before',
		));
		$this->add_control('quote_eyebrow', array(
			'label' => __('Ajánlatkérési kis felirat', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Ajánlatkérés alapján',
			'condition' => array('show_quote_categories' => 'yes'),
		));
		$this->add_control('quote_title', array(
			'label' => __('Ajánlatkérési cím', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Egyedi & céges megrendelések.',
			'condition' => array('show_quote_categories' => 'yes'),
		));
		$this->end_controls_section();

		$this->add_section_header_style_controls();

		$this->start_controls_section('grid_style', array(
			'label' => __('Rács', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_responsive_control('columns', array(
			'label' => __('Oszlopok', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => '3',
			'tablet_default' => '2',
			'mobile_default' => '2',
			'options' => array('1' => '1', '2' => '2', '3' => '3', '4' => '4'),
			'selectors' => array(
				'{{WRAPPER}} .sh-cats' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
			),
		));
		$this->add_responsive_control('gap', array(
			'label' => __('Rés', 'layero-shop-ui'),
			'type' => Controls_Manager::SLIDER,
			'size_units' => array('px', 'rem'),
			'range' => array('px' => array('min' => 0, 'max' => 60)),
			'selectors' => array(
				'{{WRAPPER}} .sh-cats' => 'gap: {{SIZE}}{{UNIT}};',
			),
		));
		$this->add_control('card_radius', array(
			'label' => __('Kártya lekerekítés', 'layero-shop-ui'),
			'type' => Controls_Manager::SLIDER,
			'size_units' => array('px'),
			'range' => array('px' => array('min' => 0, 'max' => 30)),
			'selectors' => array(
				'{{WRAPPER}} .sh-bento' => 'border-radius: {{SIZE}}{{UNIT}};',
			),
		));
		$this->add_control('overlay_color', array(
			'label' => __('Overlay szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-bento::after' => 'background: {{VALUE}};',
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$slugs = ! empty($settings['slugs']) ? array_map('sanitize_title', array_map('trim', explode(',', $settings['slugs']))) : array();
		$show_count = 'yes' === ($settings['show_count'] ?? 'yes');
		$categories = $this->ordered_categories($slugs);
		$featured = array_values(array_filter($categories, function ($category) {
			return empty($category['quote']);
		}));
		$quote_categories = array_values(array_filter($categories, function ($category) {
			return ! empty($category['quote']);
		}));
		$tag = $settings['title_tag'] ?? 'h2';
		$allowed_tags = array('h1', 'h2', 'h3', 'h4', 'h5', 'h6');

		if (! in_array($tag, $allowed_tags, true)) {
			$tag = 'h2';
		}
		?>
		<section class="sh-band sh-band--tight lyr-categories" id="kategoriak">
			<div class="shop-wrap">
				<div class="lyr-section__head sh-section-hd lyr-categories__head">
					<?php if (! empty($settings['eyebrow'])) : ?>
						<span class="lyr-eyebrow sh-label sh-kicker"><?php echo esc_html($settings['eyebrow']); ?></span>
					<?php endif; ?>
					<?php if (! empty($settings['title'])) : ?>
						<<?php echo esc_html($tag); ?> class="sh-h2"><?php echo wp_kses($settings['title'], array('em' => array(), 'span' => array(), 'br' => array())); ?></<?php echo esc_html($tag); ?>>
					<?php endif; ?>
					<?php if (! empty($settings['button_text'])) : ?>
						<a class="lyr-link sh-link" href="<?php echo esc_url($this->get_link_url($settings['button_url'] ?? array(), '/termekek/')); ?>">
							<?php echo esc_html($settings['button_text']); ?> &rsaquo;
						</a>
					<?php endif; ?>
					<?php if (! empty($settings['text'])) : ?>
						<p class="lyr-categories__intro"><?php echo esc_html($settings['text']); ?></p>
					<?php endif; ?>
				</div>

				<div class="sh-cats">
					<?php foreach ($featured as $index => $category) : ?>
						<?php $this->render_category_card($category, 0 === $index && 'yes' === ($settings['highlight_first'] ?? 'yes'), $show_count); ?>
					<?php endforeach; ?>
				</div>

				<?php if (! empty($quote_categories) && 'yes' === ($settings['show_quote_categories'] ?? 'yes')) : ?>
					<div class="sh-section-hd lyr-categories__quote-head">
						<?php if (! empty($settings['quote_eyebrow'])) : ?>
							<span class="sh-label sh-kicker"><?php echo esc_html($settings['quote_eyebrow']); ?></span>
						<?php endif; ?>
						<?php if (! empty($settings['quote_title'])) : ?>
							<h2 class="sh-h2"><?php echo wp_kses($settings['quote_title'], array('em' => array(), 'span' => array(), 'br' => array())); ?></h2>
						<?php endif; ?>
					</div>
					<div id="sh-quote-band" class="lyr-categories__quote-grid">
						<?php foreach ($quote_categories as $category) : ?>
							<?php $this->render_category_card($category, false, false, true); ?>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}

	private function ordered_categories($slugs) {
		$available = array();

		foreach (Shop_Content::categories() as $category) {
			$available[$category['id']] = $category;
		}

		if (empty($slugs)) {
			return array_values($available);
		}

		$ordered = array();
		foreach ($slugs as $slug) {
			if (isset($available[$slug])) {
				$ordered[] = $available[$slug];
			}
		}

		return $ordered;
	}

	private function category_link($slug) {
		if ('ceges' === $slug) {
			return home_url('/cegeknek/');
		}

		if (taxonomy_exists('product_cat')) {
			$term = get_term_by('slug', $slug, 'product_cat');
			if ($term && ! is_wp_error($term)) {
				$link = get_term_link($term);
				if (! is_wp_error($link)) {
					return $link;
				}
			}
		}

		return Helpers::products_url($slug);
	}

	private function render_category_card($category, $large = false, $show_count = true, $quote = false) {
		$classes = array('sh-bento');
		if ($quote) {
			$classes[] = 'sh-bento--quote';
		} else {
			$classes[] = 'sh-reveal';
		}
		if ($large) {
			$classes[] = 'sh-bento--hero';
		}
		?>
		<a class="<?php echo esc_attr(implode(' ', $classes)); ?>" href="<?php echo esc_url($this->category_link($category['id'])); ?>">
			<img src="<?php echo esc_url(Shop_Content::asset_url($category['image'])); ?>" alt="<?php echo esc_attr($category['name']); ?>" loading="lazy" decoding="async">
			<span class="sh-bento__body">
				<strong><?php echo esc_html($category['name']); ?></strong>
				<small>
					<?php echo esc_html($category['description']); ?>
					<?php if ($quote) : ?>
						&middot; <?php esc_html_e('árajánlat és egyeztetés alapján', 'layero-shop-ui'); ?>
					<?php elseif ($show_count) : ?>
						&middot; <?php echo esc_html($category['count']); ?> <?php esc_html_e('termék', 'layero-shop-ui'); ?>
					<?php endif; ?>
				</small>
				<i aria-hidden="true">
					<?php echo $quote ? esc_html__('Ajánlatot kérek', 'layero-shop-ui') : esc_html__('Felfedezem', 'layero-shop-ui'); ?> &rsaquo;
				</i>
			</span>
		</a>
		<?php
	}
}
