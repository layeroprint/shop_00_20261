<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class Forms {
	private static $instance = null;

	public static function instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action('wp_ajax_layero_contact_submit', array($this, 'submit_contact'));
		add_action('wp_ajax_nopriv_layero_contact_submit', array($this, 'submit_contact'));
	}

	public function submit_contact() {
		if (! check_ajax_referer('layero_contact', 'nonce', false)) {
			wp_send_json_error(array('message' => __('Lejárt a munkamenet. Frissítsd az oldalt, majd próbáld újra.', 'layero-shop-ui')), 403);
		}

		$honeypot = sanitize_text_field(wp_unslash($_POST['website'] ?? ''));
		if ('' !== $honeypot) {
			wp_send_json_success(array('message' => __('Köszönjük, megkaptuk az üzeneted.', 'layero-shop-ui')));
		}

		$name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
		$email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
		$topic = sanitize_text_field(wp_unslash($_POST['topic'] ?? ''));
		$message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));

		if ('' === $name || ! is_email($email) || strlen($message) < 10) {
			wp_send_json_error(array('message' => __('Ellenőrizd a nevet, az e-mail-címet és az üzenetet.', 'layero-shop-ui')), 422);
		}

		$rate_key = 'layero_contact_' . md5(strtolower($email));
		if (get_transient($rate_key)) {
			wp_send_json_error(array('message' => __('Az előző üzenetedet már fogadtuk. Kérjük, várj egy percet az újraküldéssel.', 'layero-shop-ui')), 429);
		}

		$recipient = sanitize_email((string) apply_filters('layero_shop_ui_contact_recipient', 'layeroprint@gmail.com'));
		if (! is_email($recipient)) {
			wp_send_json_error(array('message' => __('Az üzenetküldés átmenetileg nem érhető el. Írj nekünk közvetlenül e-mailben.', 'layero-shop-ui')), 500);
		}

		$site_name = wp_specialchars_decode((string) get_bloginfo('name'), ENT_QUOTES);
		$subject = sprintf('[%s] %s', $site_name, $topic ?: __('Új kapcsolatfelvétel', 'layero-shop-ui'));
		$body = implode(
			"\n",
			array(
				__('Új üzenet érkezett a Layero kapcsolati űrlapjáról.', 'layero-shop-ui'),
				'',
				__('Név:', 'layero-shop-ui') . ' ' . $name,
				__('E-mail:', 'layero-shop-ui') . ' ' . $email,
				__('Téma:', 'layero-shop-ui') . ' ' . ($topic ?: '—'),
				'',
				__('Üzenet:', 'layero-shop-ui'),
				$message,
			)
		);
		$headers = array(
			'Content-Type: text/plain; charset=UTF-8',
			'Reply-To: ' . $name . ' <' . $email . '>',
		);

		if (! wp_mail($recipient, $subject, $body, $headers)) {
			wp_send_json_error(array('message' => __('Az üzenetet most nem sikerült elküldeni. Próbáld újra később, vagy írj közvetlenül e-mailben.', 'layero-shop-ui')), 500);
		}

		set_transient($rate_key, 1, MINUTE_IN_SECONDS);
		wp_send_json_success(array('message' => __('Köszönjük, megkaptuk! Általában 24 órán belül válaszolunk.', 'layero-shop-ui')));
	}
}
