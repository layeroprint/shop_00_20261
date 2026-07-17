<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Customer_Account;

if (! defined('ABSPATH')) {
	exit;
}

class Account_Navigation extends Base_Widget {
	public function get_name() {
		return 'layero_account_navigation';
	}

	public function get_title() {
		return __('Layero profil navigáció', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-navigation-horizontal';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Navigáció', 'layero-shop-ui')));
		$this->add_control('show_profile', array(
			'label' => __('Vásárlói összefoglaló', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array('label' => __('Megjelenés', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('active_color', array(
			'label' => __('Aktív elem színe', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array('{{WRAPPER}} .lyr-account-nav a.is-active' => 'color: {{VALUE}}; border-left-color: {{VALUE}};'),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		echo Customer_Account::instance()->render_navigation(array('show_profile' => 'yes' === ($settings['show_profile'] ?? 'yes'))); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
