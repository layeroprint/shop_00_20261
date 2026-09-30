<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Testimonials extends Base_Widget {
	public function get_name() {
		return 'layero_testimonials';
	}

	public function get_title() {
		return __('Layero vélemények', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-testimonial';
	}

	public function get_style_depends() {
		return array('layero-shop-ui', 'layero-static-shop', 'layero-testimonials');
	}

	public function get_script_depends() {
		return array('layero-shop-ui', 'layero-static-shop', 'layero-testimonials');
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Vélemények',
			'title' => 'Vásárlóink mondták.',
			'text' => 'A legjobb történetek a csomag kibontása után kezdődnek.',
		));
		$this->add_heading_tag_control();
		$this->add_control('show_summary', array(
			'label' => __('Vásárlószám megjelenítése', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
			'return_value' => 'yes',
		));
		$this->add_control('summary_number', array(
			'label' => __('Vásárlószám', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => '1000+',
			'condition' => array('show_summary' => 'yes'),
		));
		$this->add_control('summary_label', array(
			'label' => __('Vásárlószám felirata', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'elégedett vásárló',
			'condition' => array('show_summary' => 'yes'),
		));
		$repeater = new Repeater();
		$repeater->add_control('stars', array('label' => __('Csillag', 'layero-shop-ui'), 'type' => Controls_Manager::NUMBER, 'default' => 5, 'min' => 1, 'max' => 5));
		$repeater->add_control('quote', array('label' => __('Vélemény', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$repeater->add_control('name', array('label' => __('Név', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('meta', array('label' => __('Termék / meta', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('topic', array('label' => __('Témacímke', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('card_style', array(
			'label' => __('Kártya stílusa', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'standard',
			'options' => array(
				'standard' => __('Világos', 'layero-shop-ui'),
				'featured' => __('Sötét kiemelt', 'layero-shop-ui'),
				'warm' => __('Meleg részletek', 'layero-shop-ui'),
			),
		));
		$repeater->add_control('product_icon', array(
			'label' => __('Termékikon', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'sparkle',
			'options' => array(
				'lamp' => __('Lámpa', 'layero-shop-ui'),
				'display' => __('QR-display', 'layero-shop-ui'),
				'sparkle' => __('Egyedi ötlet', 'layero-shop-ui'),
			),
		));
		$this->add_control('items', array(
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ name }}}',
			'default' => Shop_Content::testimonials(),
		));
		$this->end_controls_section();

		$this->add_section_header_style_controls();

		$this->start_controls_section('cards_style', array(
			'label' => __('Kártyák', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_responsive_control('columns', array(
			'label' => __('Oszlopok', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => '3',
			'tablet_default' => '2',
			'mobile_default' => '1',
			'options' => array('1' => '1', '2' => '2', '3' => '3', '4' => '4'),
			'selectors' => array('{{WRAPPER}}' => '--lr-columns: {{VALUE}};'),
		));
		$this->add_control('star_color', array(
			'label' => __('Csillag szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array('{{WRAPPER}} .lr-rating' => '--lr-card-stars: {{VALUE}};'),
		));
		$this->add_control('card_bg', array(
			'label' => __('Kártya háttér', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array('{{WRAPPER}} .lr-card:not(.lr-card--featured)' => 'background-color: {{VALUE}};'),
		));
		$this->add_control('card_radius', array(
			'label' => __('Kártya lekerekítés', 'layero-shop-ui'),
			'type' => Controls_Manager::SLIDER,
			'size_units' => array('px'),
			'range' => array('px' => array('min' => 0, 'max' => 30)),
			'selectors' => array('{{WRAPPER}} .lr-card' => 'border-radius: {{SIZE}}{{UNIT}};'),
		));
		$this->end_controls_section();
	}

	private function initials($name) {
		$parts = preg_split('/\s+/u', trim((string) $name), -1, PREG_SPLIT_NO_EMPTY);
		if (! $parts) { return ''; }
		$selected = count($parts) > 1 ? array($parts[0], $parts[count($parts) - 1]) : array($parts[0]);
		$letters = '';
		foreach ($selected as $part) {
			if (preg_match('/^./u', $part, $match)) { $letters .= $match[0]; }
		}
		return function_exists('mb_strtoupper') ? mb_strtoupper($letters, 'UTF-8') : strtoupper($letters);
	}

	private function stars_svg($rating) {
		$svg = '<svg class="lr-stars" viewBox="0 0 132 24" aria-hidden="true" focusable="false">';
		for ($i = 0; $i < 5; $i++) {
			$svg .= '<path fill="' . ($i < $rating ? 'currentColor' : '#b7c2c9') . '" d="M12 2.2 15 8.3l6.7 1-4.8 4.7 1.1 6.6-6-3.1-6 3.1 1.1-6.6-4.8-4.7 6.7-1L12 2.2Z" transform="translate(' . ($i * 27) . ' 0)"/>';
		}
		return $svg . '</svg>';
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = isset($settings['items']) && is_array($settings['items']) ? $settings['items'] : Shop_Content::testimonials();
		if (! $items) { return; }
		$raw_settings = $this->get_data('settings');
		$raw_items = $raw_settings['items'] ?? array();
		$default_items = Shop_Content::testimonials();
		$title = (string) ($settings['title'] ?? '');
		// Régebbi Elementor-mentésekben a vásárlószám a cím része volt.
		$title = preg_replace('~\s*<span[^>]*>\s*1000\+\s+elégedett vásárló\.?\s*</span>~iu', '', $title);
		$title = preg_replace('/\.(\s*)$/u', '<span class="lr-title__dot">.</span>$1', wp_kses($title, array('em' => array(), 'span' => array(), 'br' => array())));
		$summary_number = trim((string) ($settings['summary_number'] ?? ''));
		$summary_has_plus = '+' === substr($summary_number, -1);
		$tag = $settings['title_tag'] ?? 'h2';
		if (! in_array($tag, array('h1', 'h2', 'h3', 'h4', 'h5', 'h6'), true)) { $tag = 'h2'; }
		?>
		<section class="sh-band sh-band--tight sh-band--gray lyr-testimonials lyr-testimonials--studio" data-lyr-testimonials lang="hu" aria-label="<?php echo esc_attr__('Vásárlóink véleményei', 'layero-shop-ui'); ?>" data-lr-track-label="<?php echo esc_attr__('Vásárlói vélemények. Bal és jobb nyíllal, illetve görgetéssel lapozható.', 'layero-shop-ui'); ?>" data-lr-track-static="<?php echo esc_attr__('Vásárlói vélemények', 'layero-shop-ui'); ?>" data-lr-track-fallback="<?php echo esc_attr__('Vásárlói vélemények; vízszintesen görgethető, amikor nem férnek el', 'layero-shop-ui'); ?>" data-lr-empty="<?php echo esc_attr__('Nincs megjeleníthető vélemény.', 'layero-shop-ui'); ?>" data-lr-review="<?php echo esc_attr__('vélemény', 'layero-shop-ui'); ?>" data-lr-total-word="<?php echo esc_attr__('összesen', 'layero-shop-ui'); ?>">
			<div class="shop-wrap lr-wrap">
				<header class="lyr-section__head sh-section-hd lr-head">
					<div class="lr-heading">
						<?php if (! empty($settings['eyebrow'])) : ?><span class="lyr-eyebrow sh-label sh-kicker lr-eyebrow"><span class="lr-eyebrow__dot" aria-hidden="true"></span><?php echo esc_html($settings['eyebrow']); ?></span><?php endif; ?>
						<?php if ('' !== trim(strip_tags($title))) : ?><<?php echo esc_html($tag); ?> class="sh-h2 lr-title"><?php echo $title; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></<?php echo esc_html($tag); ?>><?php endif; ?>
						<?php if (! empty($settings['text'])) : ?><p class="lr-lead"><?php echo esc_html($settings['text']); ?></p><?php endif; ?>
						<?php if (! empty($settings['button_text'])) : ?><a class="lyr-link sh-link" href="<?php echo esc_url($this->get_link_url($settings['button_url'] ?? array())); ?>"><?php echo esc_html($settings['button_text']); ?> &rsaquo;</a><?php endif; ?>
					</div>
					<?php if ('yes' === ($settings['show_summary'] ?? 'yes') && '' !== $summary_number) : ?>
					<div class="lr-summary">
						<span class="lr-summary__icon"><svg class="lr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M16.7 20v-1.8a4.3 4.3 0 0 0-4.3-4.3H7.6a4.3 4.3 0 0 0-4.3 4.3V20M17.7 5.2a4 4 0 0 1 0 7.5M21 20v-1.8a4.3 4.3 0 0 0-2.5-3.9"/><circle cx="10" cy="7" r="4"/></svg></span>
						<div class="lr-summary__text"><strong class="lr-summary__number"><?php echo esc_html($summary_has_plus ? substr($summary_number, 0, -1) : $summary_number); ?><?php if ($summary_has_plus) : ?><span>+</span><?php endif; ?></strong><span class="lr-summary__label"><?php echo esc_html($settings['summary_label'] ?? ''); ?></span></div>
					</div>
					<?php endif; ?>
				</header>
				<div class="sh-reviews lyr-testimonials__grid lr-track" data-lr-track role="group" aria-label="<?php echo esc_attr__('Vásárlói vélemények; vízszintesen görgethető, amikor nem férnek el', 'layero-shop-ui'); ?>" tabindex="0">
					<?php foreach ($items as $index => $item) :
						$rating = max(1, min(5, (int) ($item['stars'] ?? 5)));
						$name = (string) ($item['name'] ?? '');
						$meta = (string) ($item['meta'] ?? '');
						$raw_item = $raw_items[$index] ?? $item;
						$legacy_item = array();
						foreach ($default_items as $default_item) {
							if ($name === $default_item['name'] && $meta === $default_item['meta'] && ($item['quote'] ?? '') === $default_item['quote']) {
								$legacy_item = $default_item;
								break;
							}
						}
						// Elementor fills absent repeater fields with defaults. Only raw saved keys
						// distinguish an older item from an explicitly cleared or edited control.
						$style = array_key_exists('card_style', $raw_item) ? ($item['card_style'] ?? 'standard') : ($legacy_item['card_style'] ?? 'standard');
						$style = in_array($style, array('standard', 'featured', 'warm'), true) ? $style : 'standard';
						$product_icon = array_key_exists('product_icon', $raw_item) ? ($item['product_icon'] ?? 'sparkle') : ($legacy_item['product_icon'] ?? 'sparkle');
						$product_icon = in_array($product_icon, array('lamp', 'display', 'sparkle'), true) ? $product_icon : 'sparkle';
						$topic = trim((string) (array_key_exists('topic', $raw_item) ? ($item['topic'] ?? '') : ($legacy_item['topic'] ?? '')));
						$initials = $this->initials($name);
						$rating_label = sprintf(__('%1$d csillag az 5-ből', 'layero-shop-ui'), $rating);
					?>
					<article class="sh-review lyr-testimonial lr-card<?php echo 'standard' === $style ? '' : ' lr-card--' . esc_attr($style); ?>">
						<div class="lr-card__top"><span class="lr-topic"<?php echo '' === $topic ? ' hidden' : ''; ?>><?php echo esc_html($topic); ?></span><svg class="lr-quote-mark" viewBox="0 0 27 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M10.5 6H5a2 2 0 0 0-2 2v5h5c0 2-1 3.5-3 4.5V20c4.4-1.3 6.5-4.3 6.5-9V7a1 1 0 0 0-1-1Zm12 0H17a2 2 0 0 0-2 2v5h5c0 2-1 3.5-3 4.5V20c4.4-1.3 6.5-4.3 6.5-9V7a1 1 0 0 0-1-1Z"/></svg></div>
						<div class="sh-review__stars lyr-testimonial__stars lr-rating" role="img" aria-label="<?php echo esc_attr($rating_label); ?>"><?php echo $this->stars_svg($rating); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span class="lr-rating__value" aria-hidden="true"><?php echo esc_html($rating . ' / 5'); ?></span></div>
						<blockquote class="lr-quote"><p><?php echo esc_html($item['quote'] ?? ''); ?></p></blockquote>
						<footer class="lr-author"><span class="lr-avatar" aria-hidden="true"><?php echo esc_html($initials ?: '•'); ?></span><div class="lr-author__text"><strong class="lr-author__name"><?php echo esc_html($name); ?></strong><span class="lr-author__product"><?php echo esc_html($meta); ?></span></div><span class="lr-product-icon" aria-hidden="true"><svg class="lr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false"><?php if ('lamp' === $product_icon) : ?><path d="m7 4-3 11h16L17 4H7ZM12 15v5M8 20h8M16 15v3"/><?php elseif ('display' === $product_icon) : ?><rect x="5" y="3" width="14" height="15" rx="2"/><path d="M9 21h6M12 18v3M8 6h3v3H8zM14 6h2M14 9h2M8 12h2M13 12h3M13 15h3M8 15h2"/><?php else : ?><path d="m12 3 2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3ZM20 2v4M18 4h4"/><?php endif; ?></svg></span></footer>
					</article>
					<?php endforeach; ?>
				</div>
				<div class="lr-foot">
					<p class="lr-signoff"><svg class="lr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.3 4.9a5.1 5.1 0 0 0-7.2 0L12 6l-1.1-1.1a5.1 5.1 0 0 0-7.2 7.2L12 20.4l8.3-8.3a5.1 5.1 0 0 0 0-7.2Z"/></svg><span><?php echo esc_html__('Köszönjük, hogy a történetetek részei lehetünk.', 'layero-shop-ui'); ?></span></p>
					<p class="lr-scroll-hint" data-lr-hint><?php echo esc_html__('Lapozz a történetek között', 'layero-shop-ui'); ?></p>
					<div class="lr-controls" data-lr-controls role="group" aria-label="<?php echo esc_attr__('Vélemények lapozása', 'layero-shop-ui'); ?>" hidden><span class="lr-counter" aria-hidden="true"><span data-lr-current>01</span><span class="lr-counter__separator">/</span><span data-lr-total><?php echo esc_html(str_pad((string) count($items), 2, '0', STR_PAD_LEFT)); ?></span></span><button class="lr-nav" data-lr-prev type="button" aria-label="<?php echo esc_attr__('Előző vélemény', 'layero-shop-ui'); ?>" disabled><svg class="lr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m14 6-6 6 6 6M8 12h12"/></svg></button><button class="lr-nav lr-nav--next" data-lr-next type="button" aria-label="<?php echo esc_attr__('Következő vélemény', 'layero-shop-ui'); ?>"><svg class="lr-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m10 6 6 6-6 6M4 12h12"/></svg></button></div>
					<p class="lr-sr-only" data-lr-status role="status" aria-live="polite" aria-atomic="true"></p>
				</div>
			</div>
		</section>
		<?php
	}
}
