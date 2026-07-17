<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Customer_Account;

if (! defined('ABSPATH')) {
	exit;
}

class Account_Dashboard extends Base_Widget {
	protected function is_dynamic_content(): bool {
		return true;
	}

	public function get_name() {
		return 'layero_account_dashboard';
	}

	public function get_title() {
		return __('Layero profil irányítópult', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-dashboard';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('title', array(
			'label' => __('Üdvözlő cím', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Szia, %s!', 'layero-shop-ui'),
			'description' => __('A %s helyére a vásárló neve kerül.', 'layero-shop-ui'),
		));
		$this->add_control('recent_limit', array(
			'label' => __('Legutóbbi rendelések száma', 'layero-shop-ui'),
			'type' => Controls_Manager::NUMBER,
			'default' => 3,
			'min' => 1,
			'max' => 10,
		));
		$this->add_control('show_navigation', array(
			'label' => __('Profil navigáció mutatása', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array('label' => __('Megjelenés', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('accent_color', array(
			'label' => __('Kiemelőszín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array('{{WRAPPER}} .lyr-account-dashboard, {{WRAPPER}} .lyr-account-shell' => '--lyr-account-accent: {{VALUE}};'),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$account = Customer_Account::instance();
		$args = array(
			'title' => (string) ($settings['title'] ?? __('Szia, %s!', 'layero-shop-ui')),
			'recent_limit' => absint($settings['recent_limit'] ?? 3),
		);
		if (! is_user_logged_in()) {
			echo $account->render_dashboard($args); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			return;
		}

		if ('yes' === ($settings['show_navigation'] ?? 'yes')) {
			echo '<div class="lyr-account-shell"><div class="lyr-account-layout"><aside class="lyr-account-sidebar">';
			echo $account->render_navigation(array('show_profile' => true)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo '</aside><main class="lyr-account-main">';
			echo $account->render_dashboard($args); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo '</main></div></div>';
			return;
		}

		echo $account->render_dashboard($args); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
