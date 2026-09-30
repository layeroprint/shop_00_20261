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
		add_action('init', array($this, 'register_inquiries'));
		add_action('wp_ajax_layero_contact_submit', array($this, 'submit_contact'));
		add_action('wp_ajax_nopriv_layero_contact_submit', array($this, 'submit_contact'));
		add_action('wp_ajax_layero_withdrawal_submit', array($this, 'submit_withdrawal'));
		add_action('wp_ajax_nopriv_layero_withdrawal_submit', array($this, 'submit_withdrawal'));
		add_action('wp_ajax_layero_contact_nonce', array($this, 'nonce'));
		add_action('wp_ajax_nopriv_layero_contact_nonce', array($this, 'nonce'));
		add_action('wp_enqueue_scripts', function () {
			if (is_page('aszf')) { wp_enqueue_script('layero-withdrawal', LAYERO_SHOP_UI_URL . 'assets/js/layero-withdrawal.js', array('layero-shop-ui'), LAYERO_SHOP_UI_VERSION, true); }
		});
	}

	public function register_inquiries() {
		register_post_type('layero_inquiry', array(
			'label' => __('Layero megkeresések', 'layero-shop-ui'), 'public' => false, 'show_ui' => true,
			'show_in_rest' => false, 'rewrite' => false, 'query_var' => false, 'supports' => array('title', 'editor'),
			'map_meta_cap' => false,
			'capabilities' => array('edit_post' => 'manage_woocommerce', 'read_post' => 'manage_woocommerce',
				'delete_post' => 'manage_woocommerce', 'edit_posts' => 'manage_woocommerce', 'edit_others_posts' => 'manage_woocommerce',
				'publish_posts' => 'manage_woocommerce', 'read_private_posts' => 'manage_woocommerce',
				'delete_posts' => 'manage_woocommerce', 'delete_private_posts' => 'manage_woocommerce',
				'edit_private_posts' => 'manage_woocommerce', 'create_posts' => 'do_not_allow'),
		));
	}

	public function submit_contact() {
		$this->process(false);
	}

	public function nonce() {
		nocache_headers(); wp_send_json_success(array('nonce' => wp_create_nonce('layero_contact')));
	}

	public function submit_withdrawal() {
		$this->process(true);
	}

	private function process($withdrawal) {
		if (! isset($_SERVER['REQUEST_METHOD']) || 'POST' !== $_SERVER['REQUEST_METHOD']) {
			wp_send_json_error(array('message' => __('Hibás kérés.', 'layero-shop-ui')), 405);
		}
		if (! isset($_POST['nonce']) || ! is_string($_POST['nonce']) || strlen($_POST['nonce']) > 100 || ! wp_verify_nonce(wp_unslash($_POST['nonce']), 'layero_contact')) {
			wp_send_json_error(array('message' => __('Lejárt a munkamenet. Frissítsd az oldalt, majd próbáld újra.', 'layero-shop-ui')), 403);
		}
		$limits = array('name' => 100, 'email' => 254, 'topic' => 150, 'message' => 4000, 'company' => 200,
			'phone' => 50, 'quantity' => 50, 'deadline' => 100, 'direction' => 200, 'occasion' => 200, 'website' => 200, 'consent' => 10, 'order_reference' => 250);
		foreach ($limits as $field => $limit) {
			$raw = $_POST[$field] ?? '';
			$length = is_string($raw) ? (function_exists('mb_strlen') ? mb_strlen(wp_unslash($raw), 'UTF-8') : preg_match_all('/./us', wp_unslash($raw))) : false;
			if (false === $length || $length > $limit) {
				wp_send_json_error(array('message' => __('Az egyik mező túl hosszú vagy hibás.', 'layero-shop-ui')), 422);
			}
		}
		if (! $withdrawal && '1' !== ($_POST['consent'] ?? '') && 'on' !== ($_POST['consent'] ?? '')) {
			wp_send_json_error(array('message' => __('Jelöld, hogy elolvastad az adatvédelmi tájékoztatót.', 'layero-shop-ui')), 422);
		}
		$ip_key = 'layero_contact_ip_' . hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? '', wp_salt('nonce'));
		$attempts = (int) get_transient($ip_key);
		if ($attempts >= 5) { wp_send_json_error(array('message' => __('Túl sok próbálkozás. Kérjük, várj néhány percet.', 'layero-shop-ui')), 429); }
		set_transient($ip_key, $attempts + 1, 5 * MINUTE_IN_SECONDS);

		$honeypot = sanitize_text_field(wp_unslash($_POST['website'] ?? ''));
		if ('' !== $honeypot) {
			wp_send_json_error(array('message' => __('Az űrlap ellenőrzése sikertelen.', 'layero-shop-ui')), 422);
		}

		$name = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
		$email = sanitize_email(wp_unslash($_POST['email'] ?? ''));
		$topic = sanitize_text_field(wp_unslash($_POST['topic'] ?? ''));
		$message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));
		$company = sanitize_text_field(wp_unslash($_POST['company'] ?? ''));
		$phone = sanitize_text_field(wp_unslash($_POST['phone'] ?? ''));
		$quantity = sanitize_text_field(wp_unslash($_POST['quantity'] ?? ''));
		$deadline = sanitize_text_field(wp_unslash($_POST['deadline'] ?? ''));
		$direction = sanitize_text_field(wp_unslash($_POST['direction'] ?? ''));
		$occasion = sanitize_text_field(wp_unslash($_POST['occasion'] ?? ''));
		if ($withdrawal) {
			$reference = sanitize_text_field(wp_unslash($_POST['order_reference'] ?? ''));
			if ('' === $reference) { wp_send_json_error(array('message' => 'Add meg a rendelés számát vagy az azonosításához szükséges adatokat.'), 422); }
			$topic = 'Elállási nyilatkozat';
			$message = "Ezúton közlöm, hogy elállok az alábbi rendelésben megjelölt termékekre kötött szerződéstől.\nRendelés: " . $reference . "\nTermékek / kiegészítés: " . ($message ?: 'A rendelés egésze.');
		}

		if ('' === $name || ! is_email(trim(wp_unslash($_POST['email'] ?? ''))) || strlen($message) < 10) {
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
		$body_lines = array(
			__('Új üzenet érkezett a Layero kapcsolati űrlapjáról.', 'layero-shop-ui'),
			'',
			__('Név:', 'layero-shop-ui') . ' ' . $name,
			__('E-mail:', 'layero-shop-ui') . ' ' . $email,
			__('Téma:', 'layero-shop-ui') . ' ' . ($topic ?: '—'),
		);
		$optional_fields = array(
			__('Cégnév:', 'layero-shop-ui') => $company,
			__('Telefonszám:', 'layero-shop-ui') => $phone,
			__('Darabszám:', 'layero-shop-ui') => $quantity,
			__('Kívánt határidő:', 'layero-shop-ui') => $deadline,
			__('Termékirány:', 'layero-shop-ui') => $direction,
			__('Alkalom:', 'layero-shop-ui') => $occasion,
		);
		foreach ($optional_fields as $label => $value) {
			if ('' !== $value) {
				$body_lines[] = $label . ' ' . $value;
			}
		}
		$body_lines[] = '';
		$body_lines[] = __('Üzenet:', 'layero-shop-ui');
		$body_lines[] = $message;
		$body = implode("\n", $body_lines);
		$received = current_time('mysql') . ' (' . wp_timezone_string() . ')';
		if ($withdrawal) { $body .= "\n\nBeérkezés: " . $received; }
		$headers = array(
			'Content-Type: text/plain; charset=UTF-8',
			'Reply-To: ' . $name . ' <' . $email . '>',
		);

		// Persist first: a mail transport failure must not lose the customer's request.
		$inquiry = wp_insert_post(wp_slash(array('post_type' => 'layero_inquiry', 'post_status' => 'private',
			'post_title' => $topic . ' — ' . $name, 'post_content' => $body, 'post_author' => 0)), true);
		if (is_wp_error($inquiry) || ! $inquiry) {
			wp_send_json_error(array('message' => __('Az üzenetet nem sikerült menteni. Próbáld újra, vagy írj közvetlenül e-mailben.', 'layero-shop-ui')), 500);
		}
		update_post_meta($inquiry, $withdrawal ? '_layero_withdrawal_received_at' : '_layero_privacy_acknowledged', current_time('mysql', true));
		update_post_meta($inquiry, '_layero_email', strtolower($email));
		$sent = wp_mail($recipient, $subject, $body, $headers);
		update_post_meta($inquiry, '_layero_mail_status', $sent ? 'accepted' : 'failed');
		if (! $sent) {
			wp_update_post(wp_slash(array('ID' => $inquiry, 'post_content' => $body . "\n\n" . __('Az e-mail-értesítés sikertelen; a megkeresés itt megmaradt.', 'layero-shop-ui'))));
		}

		set_transient($rate_key, 1, MINUTE_IN_SECONDS);
		if ($withdrawal) {
			$receipt = "Layero — Elállási nyilatkozat átvétele\nAzonosító: " . $inquiry . "\n\n" . $body . "\n\nA nyilatkozatot rögzítettük. Ez az átvételt igazolja; a visszaküldés és a visszatérítés részleteit külön egyeztetjük.\nKapcsolat: layeroprint@gmail.com";
			$receipt_sent = wp_mail($email, 'Layero — Elállási nyilatkozat átvétele #' . $inquiry, $receipt, array('Content-Type: text/plain; charset=UTF-8'));
			update_post_meta($inquiry, '_layero_receipt_mail_status', $receipt_sent ? 'accepted' : 'failed');
			wp_send_json_success(array('message' => $receipt_sent ? 'Az elállási nyilatkozatot rögzítettük, a visszaigazolást elküldtük a megadott e-mail-címre. Itt is letöltheted.' : 'Az elállási nyilatkozatot rögzítettük, de a visszaigazoló levél küldése nem sikerült. Töltsd le az igazolást; nem kell újra elküldened a nyilatkozatot.', 'receipt' => $receipt, 'reference' => $inquiry));
		}
		wp_send_json_success(array('message' => __('Köszönjük, a megkeresésedet elmentettük. A megadott e-mail-címen jelentkezünk.', 'layero-shop-ui')));
	}
}
