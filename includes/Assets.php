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
			array('layero-static-data'),
			LAYERO_SHOP_UI_VERSION,
			true
		);
	}

	public function enqueue() {
		wp_enqueue_style('layero-shop-ui');
		wp_enqueue_style('layero-static-shop');

		if (function_exists('is_account_page') && is_account_page()) {
			wp_enqueue_style('layero-account');
		}

		wp_enqueue_script('layero-shop-ui');
		wp_enqueue_script('layero-static-data');
		wp_enqueue_script('layero-static-shop');

		wp_add_inline_script(
			'layero-static-data',
			'window.LayeroShopStatic = window.LayeroShopStatic || ' . wp_json_encode(
				array(
					'assetBase' => trailingslashit(LAYERO_SHOP_UI_URL . 'assets/demo'),
					'homeUrl' => home_url('/'),
					'urls' => array(
						'index.html' => home_url('/'),
						'kategoria.html' => home_url('/termekek/'),
						'rolunk.html' => home_url('/rolunk/'),
						'gyik.html' => home_url('/gyik/'),
						'kapcsolat.html' => home_url('/kapcsolat/'),
						'kviz.html' => home_url('/kviz/'),
						'kosar.html' => home_url('/kosar/'),
						'penztar.html' => home_url('/penztar/'),
						'fiok.html' => home_url('/fiok/'),
						'kedvencek.html' => home_url('/kedvencek/'),
						'termek.html' => home_url('/termek/'),
						'aszf.html' => home_url('/aszf/'),
						'adatvedelem.html' => home_url('/adatvedelem/'),
					),
				)
			) . ';',
			'before'
		);

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
}
