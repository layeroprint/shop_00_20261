<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Customer_Account;

if (! defined('ABSPATH')) {
	exit;
}

class Order_History extends Base_Widget {
	protected function is_dynamic_content(): bool {
		return true;
	}

	public function get_name() {
		return 'layero_order_history';
	}

	public function get_title() {
		return __('Layero rendelési előzmények', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-product-info';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Rendelések', 'layero-shop-ui')));
		$this->add_control('title', array(
			'label' => __('Cím', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Rendelési előzmények', 'layero-shop-ui'),
		));
		$this->add_control('limit', array(
			'label' => __('Megjelenített rendelések', 'layero-shop-ui'),
			'type' => Controls_Manager::NUMBER,
			'default' => 10,
			'min' => 1,
			'max' => 50,
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array('label' => __('Megjelenés', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('status_color', array(
			'label' => __('Állapot kiemelőszíne', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array('{{WRAPPER}} .lyr-order-status' => 'color: {{VALUE}};'),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		echo Customer_Account::instance()->render_orders(array(
			'title' => (string) ($settings['title'] ?? ''),
			'limit' => absint($settings['limit'] ?? 10),
		)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
