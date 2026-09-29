<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) { exit; }

class Custom_Order_Hero extends Base_Widget {
	public function get_name() { return 'layero_custom_order_hero'; }
	public function get_title() { return __('Layero egyedi rendelés hero', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-banner'; }

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Egyedi rendelés'));
		$this->add_control('title', array('label' => __('Főcím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Az ötleted. <em>Rétegről rétegre</em>, valóra nyomtatva.'));
		$this->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'A legjobb darabjaink nem katalógusból születtek, hanem egy-egy vásárló fejéből. Írd le, mire gondolsz — mi megtervezzük, egyeztetjük, és egyetlen példányban legyártjuk.'));
		$this->add_control('primary_text', array('label' => __('Elsődleges gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Ajánlatot kérek — ingyenes'));
		$this->add_control('primary_url', array('label' => __('Elsődleges URL', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#ajanlat')));
		$this->add_control('secondary_text', array('label' => __('Másodlagos link', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Hogyan működik? ›'));
		$this->add_control('secondary_url', array('label' => __('Másodlagos URL', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#folyamat')));
		$this->add_control('showcase_chip', array('label' => __('Kép alsó címkéje', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Valódi egyedi munkáink'));

		$chip = new Repeater();
		$chip->add_control('icon', array('label' => __('Ikon', 'layero-shop-ui'), 'type' => Controls_Manager::SELECT, 'default' => 'check', 'options' => array('check' => __('Pipa', 'layero-shop-ui'), 'pin' => __('Helyszín', 'layero-shop-ui'))));
		$chip->add_control('text', array('label' => __('Szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('trust_chips', array('label' => __('Bizalmi címkék', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $chip->get_controls(), 'title_field' => '{{{ text }}}', 'default' => array(
			array('icon' => 'check', 'text' => 'Válasz 24–48 órán belül'), array('icon' => 'check', 'text' => 'Ár előre, meglepetés nélkül'), array('icon' => 'check', 'text' => 'Gyártás csak jóváhagyás után'), array('icon' => 'pin', 'text' => 'Szatmárnémetiben készül'),
		)));

		$slide = new Repeater();
		$slide->add_control('badge', array('label' => __('Képcímke', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$slide->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA));
		$slide->add_control('alt', array('label' => __('Alt szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('slides', array('label' => __('Showcase képek', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $slide->get_controls(), 'title_field' => '{{{ badge }}}', 'default' => array(
			array('badge' => 'Egy családi fotóból', 'image' => array('url' => Shop_Content::asset_url('kulcstartok/60-csaladi-szobor/60-csaladi-szobor-01.jpg')), 'alt' => 'Egyedi családi szobor'),
			array('badge' => 'Egy közös emlékből', 'image' => array('url' => Shop_Content::asset_url('kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-01.jpg')), 'alt' => 'Ölelkező pár szobor'),
			array('badge' => 'A kutyusaik fotóiból', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0017.webp')), 'alt' => 'Karácsonyi kedvenc-lámpa'),
			array('badge' => 'Egy nagy út emlékére', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0010.webp')), 'alt' => 'El Camino emlék-szobor'),
		)));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$slides = ! empty($settings['slides']) ? array_values(array_filter($settings['slides'], static function ($slide) {
			return ! empty($slide['image']['url']);
		})) : array();
		$chips = ! empty($settings['trust_chips']) ? $settings['trust_chips'] : array();
		?>
		<section class="sh-band sh-band--dark lp-hero lyr-landing-hero lyr-custom-order-hero"><div class="shop-wrap lp-hero__inner">
			<div class="lp-hero__copy"><?php if (! empty($settings['eyebrow'])) : ?><span class="lp-hero__kicker"><?php echo esc_html($settings['eyebrow']); ?></span><?php endif; ?><h1><?php echo wp_kses($settings['title'] ?? '', array('em' => array(), 'span' => array(), 'br' => array())); ?></h1><?php if (! empty($settings['text'])) : ?><p><?php echo esc_html($settings['text']); ?></p><?php endif; ?><div class="lp-hero__cta"><?php if (! empty($settings['primary_text'])) : ?><a class="sh-btn sh-btn--white" href="<?php echo esc_url($this->get_link_url($settings['primary_url'] ?? array(), '#ajanlat')); ?>"><?php echo esc_html($settings['primary_text']); ?></a><?php endif; ?><?php if (! empty($settings['secondary_text'])) : ?><a class="sh-link--light" href="<?php echo esc_url($this->get_link_url($settings['secondary_url'] ?? array(), '#folyamat')); ?>"><?php echo esc_html($settings['secondary_text']); ?></a><?php endif; ?></div><?php if ($chips) : ?><div class="lp-chips"><?php foreach ($chips as $chip) : ?><span><?php echo Helpers::icon($chip['icon'] ?? 'check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html($chip['text'] ?? ''); ?></span><?php endforeach; ?></div><?php endif; ?></div>
			<?php if ($slides) : ?><div class="lp-hero__stage" data-layero-landing-showcase><div class="sh-spotlight__frame"><span class="sh-spotlight__badge" data-layero-showcase-badge><?php echo esc_html($slides[0]['badge'] ?? ''); ?></span><?php if (! empty($settings['showcase_chip'])) : ?><span class="sh-spotlight__chip"><i aria-hidden="true">✦</i> <?php echo esc_html($settings['showcase_chip']); ?></span><?php endif; ?><?php foreach ($slides as $index => $slide) : $image = $slide['image']['url']; ?><img class="sh-spotlight__img<?php echo 0 === $index ? ' is-on' : ''; ?>" data-layero-showcase-image data-badge="<?php echo esc_attr($slide['badge'] ?? ''); ?>" src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($slide['alt'] ?? $slide['badge'] ?? ''); ?>" <?php echo 0 === $index ? 'fetchpriority="high"' : 'loading="lazy"'; ?> decoding="async"><?php endforeach; ?></div><div class="sh-spotlight__dots" role="tablist" aria-label="<?php esc_attr_e('Egyedi munkáink', 'layero-shop-ui'); ?>"><?php foreach ($slides as $index => $slide) : ?><button class="sh-spotlight__dot<?php echo 0 === $index ? ' is-on' : ''; ?>" type="button" role="tab" aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>" aria-label="<?php echo esc_attr($slide['badge'] ?? ''); ?>"></button><?php endforeach; ?></div></div><?php endif; ?>
		</div></section>
		<?php
	}
}
