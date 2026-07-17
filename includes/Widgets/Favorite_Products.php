<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Customer_Account;

if (! defined('ABSPATH')) {
	exit;
}

class Favorite_Products extends Base_Widget {
	public function get_name() {
		return 'layero_favorite_products';
	}

	public function get_title() {
		return __('Layero kedvenc termékek', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-heart-o';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Kedvencek', 'layero-shop-ui')));
		$this->add_control('title', array(
			'label' => __('Cím', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Kedvenc termékeim', 'layero-shop-ui'),
		));
		$this->add_control('empty_text', array(
			'label' => __('Üres állapot szövege', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXTAREA,
			'default' => __('A termékkártyák szív ikonjával menthetsz ide termékeket.', 'layero-shop-ui'),
		));
		$this->add_control('limit', array(
			'label' => __('Maximum termékszám', 'layero-shop-ui'),
			'type' => Controls_Manager::NUMBER,
			'default' => 100,
			'min' => 1,
			'max' => 100,
		));
		$this->add_responsive_control('columns', array(
			'label' => __('Oszlopok', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => '4',
			'tablet_default' => '2',
			'mobile_default' => '1',
			'options' => array('1' => '1', '2' => '2', '3' => '3', '4' => '4'),
			'selectors' => array('{{WRAPPER}} .lyr-favorites-grid' => 'grid-template-columns: repeat({{VALUE}}, minmax(0, 1fr));'),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		echo Customer_Account::instance()->render_favorites(array(
			'title' => (string) ($settings['title'] ?? ''),
			'empty_text' => (string) ($settings['empty_text'] ?? ''),
			'limit' => absint($settings['limit'] ?? 100),
		)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
