<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Corporate_Hero extends Base_Widget {
	public function get_name() {
		return 'layero_corporate_hero';
	}

	public function get_title() {
		return __('Layero céges hero', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-banner';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Cégeknek'));
		$this->add_control('title', array('label' => __('Főcím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'A márkád, amit a partnereid <em>kézbe vesznek</em>.'));
		$this->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Logós ajándéktárgyak, QR + NFC displayek és rendezvénycsomagok — saját műhelyből, mennyiségi kedvezménnyel, proforma díjbekérővel. Nem raktári reklámtárgy: a te arculatodra gyártjuk.'));
		$this->add_control('primary_text', array('label' => __('Elsődleges gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Árajánlatot kérek'));
		$this->add_control('primary_url', array('label' => __('Elsődleges link', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#ajanlat')));
		$this->add_control('secondary_text', array('label' => __('Másodlagos link', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Mit gyártunk? ›'));
		$this->add_control('secondary_url', array('label' => __('Másodlagos URL', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#megoldasok')));
		$this->add_control('showcase_chip', array('label' => __('Kép alsó címkéje', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'A te logóddal készül'));

		$chip = new Repeater();
		$chip->add_control('icon', array(
			'label' => __('Ikon', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'check',
			'options' => array('check' => __('Pipa', 'layero-shop-ui'), 'pin' => __('Helyszín', 'layero-shop-ui')),
		));
		$chip->add_control('text', array('label' => __('Szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('trust_chips', array(
			'label' => __('Bizalmi címkék', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $chip->get_controls(),
			'title_field' => '{{{ text }}}',
			'default' => array(
				array('icon' => 'check', 'text' => 'Árajánlat 24–48 órán belül'),
				array('icon' => 'check', 'text' => 'Mennyiségi kedvezmény'),
				array('icon' => 'check', 'text' => 'Proforma díjbekérő, céges számla'),
				array('icon' => 'pin', 'text' => 'Szatmárnémetiben gyártva'),
			),
		));

		$slide = new Repeater();
		$slide->add_control('badge', array('label' => __('Képcímke', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$slide->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA));
		$slide->add_control('alt', array('label' => __('Alt szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('slides', array(
			'label' => __('Showcase képek', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $slide->get_controls(),
			'title_field' => '{{{ badge }}}',
			'default' => array(
				array('badge' => 'QR + NFC display', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0022.webp')), 'alt' => 'QR + NFC asztali display'),
				array('badge' => 'Logós kulcstartók', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0027.webp')), 'alt' => 'Logós kulcstartó'),
				array('badge' => 'Márka-logók, élethűen', 'image' => array('url' => Shop_Content::asset_url('kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg')), 'alt' => 'John Deere logós kulcstartó'),
				array('badge' => 'Céges arculatra', 'image' => array('url' => Shop_Content::asset_url('images/categories/layero-asset-0222-1100.webp')), 'alt' => 'Céges megoldások'),
			),
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array('label' => __('Megjelenés', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('accent_color', array('label' => __('Kiemelőszín', 'layero-shop-ui'), 'type' => Controls_Manager::COLOR, 'selectors' => array('{{WRAPPER}} .lyr-landing-hero' => '--lp-accent: {{VALUE}};')));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$slides = ! empty($settings['slides']) ? array_values(array_filter($settings['slides'], static function ($slide) {
			return ! empty($slide['image']['url']);
		})) : array();
		$chips = ! empty($settings['trust_chips']) ? $settings['trust_chips'] : array();
		?>
		<section class="sh-band sh-band--dark lp-hero lyr-landing-hero lyr-corp-hero">
			<div class="shop-wrap lp-hero__inner">
				<div class="lp-hero__copy">
					<?php if (! empty($settings['eyebrow'])) : ?><span class="lp-hero__kicker"><?php echo esc_html($settings['eyebrow']); ?></span><?php endif; ?>
					<h1><?php echo wp_kses($settings['title'] ?? '', array('em' => array(), 'span' => array(), 'br' => array())); ?></h1>
					<?php if (! empty($settings['text'])) : ?><p><?php echo esc_html($settings['text']); ?></p><?php endif; ?>
					<div class="lp-hero__cta">
						<?php if (! empty($settings['primary_text'])) : ?><a class="sh-btn sh-btn--white" href="<?php echo esc_url($this->get_link_url($settings['primary_url'] ?? array(), '#ajanlat')); ?>"><?php echo esc_html($settings['primary_text']); ?></a><?php endif; ?>
						<?php if (! empty($settings['secondary_text'])) : ?><a class="sh-link--light" href="<?php echo esc_url($this->get_link_url($settings['secondary_url'] ?? array(), '#megoldasok')); ?>"><?php echo esc_html($settings['secondary_text']); ?></a><?php endif; ?>
					</div>
					<?php if ($chips) : ?><div class="lp-chips"><?php foreach ($chips as $chip) : ?><span><?php echo Helpers::icon($chip['icon'] ?? 'check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html($chip['text'] ?? ''); ?></span><?php endforeach; ?></div><?php endif; ?>
				</div>
				<?php if ($slides) : ?>
					<div class="lp-hero__stage" data-layero-landing-showcase>
						<div class="sh-spotlight__frame">
							<span class="sh-spotlight__badge" data-layero-showcase-badge><?php echo esc_html($slides[0]['badge'] ?? ''); ?></span>
							<?php if (! empty($settings['showcase_chip'])) : ?><span class="sh-spotlight__chip"><i aria-hidden="true">✦</i> <?php echo esc_html($settings['showcase_chip']); ?></span><?php endif; ?>
							<?php foreach ($slides as $index => $slide) : $image = $slide['image']['url']; ?>
								<img class="sh-spotlight__img<?php echo 0 === $index ? ' is-on' : ''; ?>" data-layero-showcase-image data-badge="<?php echo esc_attr($slide['badge'] ?? ''); ?>" src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($slide['alt'] ?? $slide['badge'] ?? ''); ?>" <?php echo 0 === $index ? 'fetchpriority="high"' : 'loading="lazy"'; ?> decoding="async">
							<?php endforeach; ?>
						</div>
						<div class="sh-spotlight__dots" role="tablist" aria-label="<?php esc_attr_e('Céges munkáink', 'layero-shop-ui'); ?>">
							<?php foreach ($slides as $index => $slide) : ?><button class="sh-spotlight__dot<?php echo 0 === $index ? ' is-on' : ''; ?>" type="button" role="tab" aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>" aria-label="<?php echo esc_attr($slide['badge'] ?? ''); ?>"></button><?php endforeach; ?>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}
}
