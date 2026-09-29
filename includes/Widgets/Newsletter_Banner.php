<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Newsletter_Banner extends Base_Widget {
	public function get_name() {
		return 'layero_newsletter_banner';
	}

	public function get_title() {
		return __('Layero hírlevél banner', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-mail';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('integration_notice', array('type' => Controls_Manager::RAW_HTML,
			'raw' => __('Hírlevélszolgáltató bekötéséig kapcsolatfelvételi gomb jelenik meg. Feliratkozást és kuponküldést jelenleg nem végzünk.', 'layero-shop-ui')));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array(
			'label' => __('Megjelenés', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_control('bg_color', array(
			'label' => __('Háttérszín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-nlbanner' => 'background-color: {{VALUE}};',
			),
		));
		$this->add_control('text_color', array(
			'label' => __('Szöveg szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-nlbanner' => 'color: {{VALUE}};',
			),
		));
		$this->add_control('btn_bg_color', array(
			'label' => __('Gomb háttér', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-nlbanner .sh-btn' => 'background-color: {{VALUE}};',
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		echo '<section class="sh-band"><div class="shop-wrap"><div class="sh-nlbanner"><h2>' . esc_html__('Kérdésed vagy egyedi ötleted van?', 'layero-shop-ui') . '</h2><p>' . esc_html__('Írd meg nekünk, és egyeztetjük a részleteket.', 'layero-shop-ui') . '</p><a class="sh-btn sh-btn--dark" href="' . esc_url(home_url('/kapcsolat/')) . '">' . esc_html__('Kapcsolatfelvétel', 'layero-shop-ui') . '</a></div></div></section>';
	}
}
