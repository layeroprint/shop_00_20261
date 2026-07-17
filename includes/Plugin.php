<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class Plugin {
	private static $instance = null;

	public static function instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->includes();

		add_action('before_woocommerce_init', array($this, 'declare_woocommerce_compatibility'));
		add_action('plugins_loaded', array($this, 'load_textdomain'));
		add_action('plugins_loaded', array($this, 'boot'));
	}

	public function declare_woocommerce_compatibility() {
		if (class_exists('\\Automattic\\WooCommerce\\Utilities\\FeaturesUtil')) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', LAYERO_SHOP_UI_FILE, true);
		}
	}

	private function includes() {
		require_once LAYERO_SHOP_UI_PATH . 'includes/Shop_Content.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/Helpers.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/Assets.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/WooCommerce.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/Customer_Account.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/Forms.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/Elementor.php';
		require_once LAYERO_SHOP_UI_PATH . 'includes/Page_Builder.php';
	}

	public function load_textdomain() {
		load_plugin_textdomain('layero-shop-ui', false, dirname(plugin_basename(LAYERO_SHOP_UI_FILE)) . '/languages');
	}

	public function boot() {
		Customer_Account::instance();
		Forms::instance();
		Assets::instance();
		WooCommerce::instance();
		Elementor::instance();
		Page_Builder::init();
	}
}
