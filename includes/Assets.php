<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class Assets {
	private static $instance = null;

	public static function instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action('init', array($this, 'register'));
		add_action('wp_enqueue_scripts', array($this, 'enqueue'), 100);
		add_action('wp_head', array($this, 'consent_defaults'), -100);
		add_action('elementor/frontend/after_register_styles', array($this, 'register'));
		add_action('elementor/frontend/after_register_scripts', array($this, 'register'));
	}

	public function register() {
		wp_register_style(
			'layero-shop-ui',
			LAYERO_SHOP_UI_URL . 'assets/css/layero-shop-ui.css',
			array(),
			LAYERO_SHOP_UI_VERSION
		);

		wp_register_style(
			'layero-static-shop',
			LAYERO_SHOP_UI_URL . 'assets/css/layero-static-shop.css',
			array(),
			LAYERO_SHOP_UI_VERSION
		);

		wp_register_style(
			'layero-account',
			LAYERO_SHOP_UI_URL . 'assets/css/layero-account.css',
			array('layero-shop-ui'),
			LAYERO_SHOP_UI_VERSION
		);

		wp_register_style('layero-origin', LAYERO_SHOP_UI_URL . 'assets/demo/layero-origin/lyo-origin.css', array('layero-static-shop'), LAYERO_SHOP_UI_VERSION);
		wp_register_style('layero-origin-integration', LAYERO_SHOP_UI_URL . 'assets/demo/layero-origin/integration.css', array('layero-origin'), LAYERO_SHOP_UI_VERSION);
		wp_register_script('layero-origin-mount', LAYERO_SHOP_UI_URL . 'assets/demo/layero-origin/mount.js', array(), LAYERO_SHOP_UI_VERSION, true);
		wp_register_script('layero-origin', LAYERO_SHOP_UI_URL . 'assets/demo/layero-origin/lyo-origin.js', array('layero-origin-mount'), LAYERO_SHOP_UI_VERSION, true);

		wp_register_script(
			'layero-shop-ui',
			LAYERO_SHOP_UI_URL . 'assets/js/layero-shop-ui.js',
			array('jquery'),
			LAYERO_SHOP_UI_VERSION,
			true
		);

		wp_register_script(
			'layero-static-data',
			LAYERO_SHOP_UI_URL . 'assets/js/layero-static-data.js',
			array(),
			LAYERO_SHOP_UI_VERSION,
			true
		);

		wp_register_script(
			'layero-static-shop',
			LAYERO_SHOP_UI_URL . 'assets/js/layero-static-shop.js',
			array('layero-static-data', 'layero-origin'),
			LAYERO_SHOP_UI_VERSION,
			true
		);
	}

	public function enqueue() {
		$catalog = Catalog::snapshot();
		wp_enqueue_style('layero-shop-ui');
		wp_enqueue_style('layero-static-shop');
		wp_enqueue_style('layero-origin-integration');

		$is_account_page = function_exists('is_account_page') && is_account_page();
		$is_favorites_page = function_exists('is_page') && is_page(Customer_Account::FAVORITES_SLUG);
		if ($is_account_page || $is_favorites_page) {
			wp_enqueue_style('layero-account');
		}

		wp_enqueue_script('layero-shop-ui');
		wp_enqueue_script('layero-static-data');
		wp_enqueue_script('layero-static-shop');
		wp_enqueue_script('layero-online', LAYERO_SHOP_UI_URL . 'assets/js/layero-online.js', array('layero-static-shop', 'layero-shop-ui'), LAYERO_SHOP_UI_VERSION, true);
		wp_enqueue_style('layero-online', LAYERO_SHOP_UI_URL . 'assets/css/layero-online.css', array('layero-static-shop', 'layero-shop-ui'), LAYERO_SHOP_UI_VERSION);

		wp_add_inline_script(
			'layero-static-data',
			'window.LayeroShopStatic = window.LayeroShopStatic || ' . wp_json_encode(
				array(
					'commerce' => 'woocommerce',
					'assetBase' => trailingslashit(LAYERO_SHOP_UI_URL . 'assets/demo'),
					'homeUrl' => home_url('/'),
					'customOrderUrl' => home_url('/egyedi-rendeles/'),
					'productUrls' => $catalog['urls'],
					'urls' => array(
						'index.html' => home_url('/'),
						'cegeknek.html' => home_url('/cegeknek/'),
						'kategoria.html' => home_url('/termekek/'),
						'rolunk.html' => home_url('/rolunk/'),
						'gyik.html' => home_url('/gyik/'),
						'kapcsolat.html' => home_url('/kapcsolat/'),
						'kviz.html' => home_url('/kviz/'),
						'kosar.html' => function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/kosar/'),
						'penztar.html' => function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : home_url('/penztar/'),
						'fiok.html' => home_url('/fiok/'),
						'kedvencek.html' => home_url('/kedvencek/'),
						'termek.html' => home_url('/termekek/'),
						'aszf.html' => home_url('/aszf/'),
						'adatvedelem.html' => home_url('/adatvedelem/'),
						'egyedi-rendeles.html' => home_url('/egyedi-rendeles/'),
					),
				)
			) . ';',
			'before'
		);
		// Replace the preview data before any shared UI code reads it.
		wp_add_inline_script('layero-static-data',
			'window.SHOP_PRODUCTS = ' . wp_json_encode($catalog['products'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';' .
			'window.SHOP_CATS = ' . wp_json_encode($catalog['categories'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';', 'after');

		wp_localize_script(
			'layero-shop-ui',
			'LayeroShopUI',
			array(
				'ajaxUrl' => admin_url('admin-ajax.php'),
				'cartUrl' => function_exists('wc_get_cart_url') ? wc_get_cart_url() : '',
				'checkoutUrl' => function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '',
				'productsUrl' => Helpers::products_url(),
				'isLoggedIn' => is_user_logged_in(),
				'userId' => get_current_user_id(),
				'favoriteIds' => is_user_logged_in() ? Customer_Account::get_favorite_ids() : array(),
				'accountNonce' => wp_create_nonce('layero_account'),
				'contactNonce' => wp_create_nonce('layero_contact'),
				'i18n' => array(
					'favoritesLoading' => __('Kedvencek betöltése...', 'layero-shop-ui'),
					'favoritesError' => __('A kedvencek most nem tölthetők be. Kérjük, frissítsd az oldalt.', 'layero-shop-ui'),
					'favoriteAdd' => __('Kedvencekhez adás', 'layero-shop-ui'),
					'favoriteRemove' => __('Eltávolítás a kedvencekből', 'layero-shop-ui'),
					'added' => __('Kosárba téve', 'layero-shop-ui'),
					'subscribed' => __('Köszönjük, a kuponkódot e-mailben küldjük.', 'layero-shop-ui'),
				),
			)
		);
	}

	public function consent_defaults() {
		// Must precede tags added by other plugins. The final tag setup still needs an online consent test.
		$source = file_get_contents(LAYERO_SHOP_UI_PATH . 'assets/js/layero-consent.js');
		wp_print_inline_script_tag($source, array('id' => 'layero-consent-defaults'));
	}

}
