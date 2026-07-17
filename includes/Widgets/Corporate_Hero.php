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
		$this->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Céges 3D megoldások'));
		$this->add_control('title', array('label' => __('Főcím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'A márkád, amit <em>kézbe lehet venni.</em>'));
		$this->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Logózott ajándékok, QR + NFC displayek és egyedi rendezvényes megoldások — kis és nagy szériában, helyi gyártással.'));
		$this->add_control('primary_text', array('label' => __('Elsődleges gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Céges ajánlatot kérek'));
		$this->add_control('primary_url', array('label' => __('Elsődleges link', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#ceges-ajanlat')));
		$this->add_control('secondary_text', array('label' => __('Másodlagos gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Megoldások megtekintése'));
		$this->add_control('secondary_url', array('label' => __('Másodlagos link', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#ceges-megoldasok')));
		$this->add_control('image', array(
			'label' => __('Hero kép', 'layero-shop-ui'),
			'type' => Controls_Manager::MEDIA,
			'default' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0022.webp')),
		));
		$this->add_control('image_alt', array('label' => __('Kép alt szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Egyedi QR és NFC asztali display céges arculattal'));

		$repeater = new Repeater();
		$repeater->add_control('value', array('label' => __('Érték', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('label', array('label' => __('Magyarázat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('stats', array(
			'label' => __('Bizalmi adatok', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ value }}} — {{{ label }}}',
			'default' => array(
				array('value' => '1–500+', 'label' => 'darabos széria'),
				array('value' => '5–10 nap', 'label' => 'átlagos gyártás'),
				array('value' => '24–48 óra', 'label' => 'ajánlatadás'),
			),
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array('label' => __('Megjelenés', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('accent_color', array('label' => __('Kiemelőszín', 'layero-shop-ui'), 'type' => Controls_Manager::COLOR, 'selectors' => array('{{WRAPPER}} .lyr-corp-hero' => '--corp-accent: {{VALUE}};')));
		$this->add_control('background_color', array('label' => __('Háttérszín', 'layero-shop-ui'), 'type' => Controls_Manager::COLOR, 'selectors' => array('{{WRAPPER}} .lyr-corp-hero' => 'background-color: {{VALUE}};')));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$image = $settings['image']['url'] ?? '';
		$stats = ! empty($settings['stats']) ? $settings['stats'] : array();
		?>
		<section class="lyr-corp-hero">
			<div class="shop-wrap lyr-corp-hero__grid">
				<div class="lyr-corp-hero__copy">
					<span class="lyr-corp-kicker"><?php echo Helpers::icon('briefcase'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html($settings['eyebrow'] ?? ''); ?></span>
					<h1><?php echo wp_kses($settings['title'] ?? '', array('em' => array(), 'span' => array(), 'br' => array())); ?></h1>
					<p><?php echo esc_html($settings['text'] ?? ''); ?></p>
					<div class="lyr-corp-hero__actions">
						<?php if (! empty($settings['primary_text'])) : ?><a class="lyr-btn lyr-btn--primary" href="<?php echo esc_url($this->get_link_url($settings['primary_url'] ?? array(), '#ceges-ajanlat')); ?>"><?php echo esc_html($settings['primary_text']); ?></a><?php endif; ?>
						<?php if (! empty($settings['secondary_text'])) : ?><a class="lyr-btn lyr-corp-btn--ghost" href="<?php echo esc_url($this->get_link_url($settings['secondary_url'] ?? array(), '#ceges-megoldasok')); ?>"><?php echo esc_html($settings['secondary_text']); ?></a><?php endif; ?>
					</div>
					<?php if ($stats) : ?>
						<div class="lyr-corp-hero__stats">
							<?php foreach ($stats as $item) : ?><div><strong><?php echo esc_html($item['value'] ?? ''); ?></strong><span><?php echo esc_html($item['label'] ?? ''); ?></span></div><?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>
				<div class="lyr-corp-hero__visual">
					<?php if ($image) : ?><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($settings['image_alt'] ?? ''); ?>" fetchpriority="high"><?php endif; ?>
					<div class="lyr-corp-hero__badge"><?php echo Helpers::icon('spark'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span><b><?php esc_html_e('Saját arculatra', 'layero-shop-ui'); ?></b><?php esc_html_e('tervezve és gyártva', 'layero-shop-ui'); ?></span></div>
				</div>
			</div>
		</section>
		<?php
	}
}
