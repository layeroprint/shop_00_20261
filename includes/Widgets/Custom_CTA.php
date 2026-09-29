<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Custom_CTA extends Base_Widget {
	public function get_name() {
		return 'layero_custom_cta';
	}

	public function get_title() {
		return __('Layero egyedi rendelés CTA', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-call-to-action';
	}

	protected function register_controls() {
		$defaults = Shop_Content::custom_cta();
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('banner_style', array(
			'label' => __('Elrendezés', 'layero-shop-ui'), 'type' => Controls_Manager::SELECT, 'default' => 'auto',
			'options' => array('auto' => __('Alapértelmezett', 'layero-shop-ui'), 'workshop' => __('Műhelyajánló', 'layero-shop-ui'), 'classic' => __('Korábbi nagy blokk', 'layero-shop-ui')),
		));
		$this->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA, 'default' => $defaults['image']));
		$this->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => $defaults['title']));
		$this->add_control('accent_title', array('label' => __('Kiemelt címsor (műhelyajánló)', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => $defaults['accent_title']));
		$this->add_control('image_note', array('label' => __('Képfelirat (műhelyajánló)', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Az ötlettől a valóságig'));
		$this->add_control('text', array('label' => __('Szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => $defaults['text']));
		$this->add_control('button_text', array('label' => __('Gomb szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => $defaults['button_text']));
		$this->add_control('button_url', array('label' => __('Gomb link', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => $defaults['button_url']));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array(
			'label' => __('Megjelenés', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_control('layout', array(
			'label' => __('Kép helye', 'layero-shop-ui'),
			'type' => Controls_Manager::CHOOSE,
			'default' => 'left',
			'condition' => array('banner_style' => 'classic'),
			'options' => array(
				'left' => array('title' => __('Balra', 'layero-shop-ui'), 'icon' => 'eicon-h-align-left'),
				'right' => array('title' => __('Jobbra', 'layero-shop-ui'), 'icon' => 'eicon-h-align-right'),
			),
			'toggle' => false,
		));
		$this->add_control('bg_color', array(
			'label' => __('Háttérszín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-cta-band, {{WRAPPER}} .sh-gift-banner' => 'background-color: {{VALUE}};',
			),
		));
		$this->add_control('text_color', array(
			'label' => __('Szöveg szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-cta-band, {{WRAPPER}} .sh-gift-banner' => 'color: {{VALUE}};',
			),
		));
		$this->add_responsive_control('section_padding', array(
			'label' => __('Belső margó', 'layero-shop-ui'),
			'type' => Controls_Manager::DIMENSIONS,
			'size_units' => array('px', 'rem', '%'),
			'selectors' => array(
				'{{WRAPPER}} .sh-cta-band, {{WRAPPER}} .sh-gift-banner__copy' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$defaults = Shop_Content::custom_cta();
		$legacy_title = 'Nem találod, amit keresel? Legyártjuk neked.';
		$style = $settings['banner_style'] ?? 'auto';
		$is_home_default = in_array($settings['title'] ?? '', array($legacy_title, $defaults['title']), true);
		if ('workshop' === $style || ('auto' === $style && $is_home_default)) {
			// Upgrade only recognizable homepage defaults, preserving edited Elementor content.
			if ($legacy_title === ($settings['title'] ?? '')) {
				$settings['title'] = $defaults['title'];
			}
			if ($is_home_default) {
				if ('Egyedi tervezés és gyártás — leírás vagy referenciakép alapján, ajánlatkéréstől a kész darabig.' === ($settings['text'] ?? '')) {
					$settings['text'] = $defaults['text'];
				}
				if ('Egyedi rendelést indítok' === ($settings['button_text'] ?? '')) {
					$settings['button_text'] = $defaults['button_text'];
				}
				$old_image_path = wp_parse_url($settings['image']['url'] ?? '', PHP_URL_PATH);
				if (in_array(basename($old_image_path ?: ''), array('layero-asset-0018.webp', 'layero-asset-0018.png'), true)) {
					$settings['image'] = $defaults['image'];
				}
			}
			$this->render_workshop($settings);
			return;
		}
		$image = $settings['image']['url'] ?? '';
		?>
		<?php $cta_layout = 'right' === ($settings['layout'] ?? 'left') ? ' lyr-custom-cta--reverse' : ''; ?>
		<section class="sh-cta-band lyr-custom-cta<?php echo esc_attr($cta_layout); ?>">
			<?php if ($image) : ?>
				<img src="<?php echo esc_url($image); ?>" alt="" loading="lazy">
			<?php endif; ?>
			<div class="sh-cta-band__copy lyr-custom-cta__copy">
				<h2><?php echo esc_html($settings['title'] ?? ''); ?></h2>
				<p><?php echo esc_html($settings['text'] ?? ''); ?></p>
				<?php if (! empty($settings['button_text'])) : ?>
					<a class="sh-btn sh-btn--white lyr-btn lyr-btn--white" href="<?php echo esc_url($this->get_link_url($settings['button_url'] ?? array())); ?>"><?php echo esc_html($settings['button_text']); ?></a>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}

	private function render_workshop($settings) {
		$image = $settings['image']['url'] ?? '';
		?>
		<div class="sh-gift-banner-shell">
			<section class="sh-gift-banner">
				<?php if ($image) : ?>
					<img class="sh-gift-banner__image" src="<?php echo esc_url($image); ?>" alt="" loading="lazy" decoding="async">
				<?php endif; ?>
				<div class="sh-gift-banner__copy">
					<h2><?php echo esc_html($settings['title'] ?? ''); ?><?php if (! empty($settings['accent_title'])) : ?><span><?php echo esc_html($settings['accent_title']); ?></span><?php endif; ?></h2>
					<p><?php echo esc_html($settings['text'] ?? ''); ?></p>
					<?php if (! empty($settings['button_text'])) : ?>
						<a class="sh-btn sh-btn--white sh-gift-banner__button" href="<?php echo esc_url($this->get_link_url($settings['button_url'] ?? array(), '/egyedi-rendeles/')); ?>"><?php echo esc_html($settings['button_text']); ?><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></a>
					<?php endif; ?>
				</div>
				<?php if ($image && ! empty($settings['image_note'])) : ?><span class="sh-gift-banner__note" aria-hidden="true"><?php echo esc_html($settings['image_note']); ?></span><?php endif; ?>
			</section>
		</div>
		<?php
	}
}
