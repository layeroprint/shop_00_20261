<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Customer_Account;

if (! defined('ABSPATH')) {
	exit;
}

class Account_Details extends Base_Widget {
	public function get_name() {
		return 'layero_account_details';
	}

	public function get_title() {
		return __('Layero fiók és címek', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-user-circle-o';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Fiókadatok', 'layero-shop-ui')));
		$this->add_control('title', array(
			'label' => __('Cím', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Fiók és címek', 'layero-shop-ui'),
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array('label' => __('Megjelenés', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('link_color', array(
			'label' => __('Hivatkozások színe', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array('{{WRAPPER}} .lyr-account-detail-grid article > a' => 'color: {{VALUE}};'),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		echo Customer_Account::instance()->render_details(array('title' => (string) ($settings['title'] ?? ''))); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
