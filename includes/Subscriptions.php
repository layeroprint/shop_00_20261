<?php
namespace LayeroShop;
if (! defined('ABSPATH')) { exit; }

/** Explicit opt-in, confirmation and erasure. No marketing mail is sent automatically. */
final class Subscriptions {
	const TYPE = 'layero_subscriber';
	const CONSENT_VERSION = '2026-09-30';
	public static function init() {
		add_action('init', array(__CLASS__, 'register'));
		add_action('wp_enqueue_scripts', array(__CLASS__, 'assets'));
		add_filter('the_content', array(__CLASS__, 'home_banner'), 20);
		add_action('wp_ajax_layero_subscribe', array(__CLASS__, 'submit'));
		add_action('wp_ajax_nopriv_layero_subscribe', array(__CLASS__, 'submit'));
		add_action('wp_ajax_layero_subscription_nonce', array(__CLASS__, 'nonce'));
		add_action('wp_ajax_nopriv_layero_subscription_nonce', array(__CLASS__, 'nonce'));
		add_action('template_redirect', array(__CLASS__, 'endpoint'), 0);
		add_action('layero_subscription_cleanup', array(__CLASS__, 'cleanup'));
		add_filter('manage_' . self::TYPE . '_posts_columns', array(__CLASS__, 'columns'));
		add_action('manage_' . self::TYPE . '_posts_custom_column', array(__CLASS__, 'column'), 10, 2);
		add_filter('wp_privacy_personal_data_exporters', array(__CLASS__, 'exporters'));
		add_filter('wp_privacy_personal_data_erasers', array(__CLASS__, 'erasers'));
	}
	public static function register() {
		register_post_type(self::TYPE, array('label' => 'Layero feliratkozók', 'public' => false, 'show_ui' => true,
			'show_in_rest' => false, 'rewrite' => false, 'query_var' => false, 'supports' => array(), 'map_meta_cap' => false,
			'capabilities' => array('edit_post' => 'manage_woocommerce', 'read_post' => 'manage_woocommerce', 'delete_post' => 'manage_woocommerce',
				'edit_posts' => 'manage_woocommerce', 'edit_others_posts' => 'manage_woocommerce', 'publish_posts' => 'manage_woocommerce',
				'read_private_posts' => 'manage_woocommerce', 'delete_posts' => 'manage_woocommerce', 'delete_private_posts' => 'manage_woocommerce',
				'edit_private_posts' => 'manage_woocommerce', 'create_posts' => 'do_not_allow')));
		if (! wp_next_scheduled('layero_subscription_cleanup')) { wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', 'layero_subscription_cleanup'); }
	}
	public static function nonce() {
		nocache_headers(); wp_send_json_success(array('nonce' => wp_create_nonce('layero_subscription')));
	}
	private static function hash($value) { return hash_hmac('sha256', $value, wp_salt('auth')); }
	private static function find($email, $purpose = null, $include_trash = false) {
		$query = array(array('key' => '_email_hash', 'value' => self::hash(strtolower($email))));
		if ($purpose) { $query[] = array('key' => '_purpose', 'value' => $purpose); }
		return get_posts(array('post_type' => self::TYPE, 'post_status' => $include_trash ? array('private', 'trash') : 'private', 'numberposts' => -1, 'meta_query' => $query));
	}
	public static function submit() {
		$lang = isset($_POST['language']) && 'ro' === $_POST['language'] ? 'ro' : 'hu';
		$error = function ($hu, $ro, $status = 422) use ($lang) { wp_send_json_error(array('message' => 'ro' === $lang ? $ro : $hu), $status); };
		if ('POST' !== ($_SERVER['REQUEST_METHOD'] ?? '')) { $error('Hibás kérés.', 'Cerere nevalidă.', 405); }
		foreach (array('email' => 254, 'consent' => 4, 'purpose' => 12, 'website' => 200, 'nonce' => 100, 'language' => 2) as $key => $limit) {
			if (isset($_POST[$key]) && (! is_string($_POST[$key]) || strlen($_POST[$key]) > $limit)) { $error('Hibás űrlapadat.', 'Date de formular nevalide.'); }
		}
		if (! wp_verify_nonce(wp_unslash($_POST['nonce'] ?? ''), 'layero_subscription')) { $error('Frissítsd az oldalt, és próbáld újra.', 'Reîncarcă pagina și încearcă din nou.', 403); }
		if ('1' !== ($_POST['consent'] ?? '') || '' !== trim($_POST['website'] ?? '')) { $error('A feliratkozáshoz külön hozzájárulás szükséges.', 'Abonarea necesită acordul tău explicit.'); }
		$purpose = $_POST['purpose'] ?? '';
		if (! in_array($purpose, array('launch', 'newsletter'), true)) { $error('Ismeretlen feliratkozástípus.', 'Tip de abonare necunoscut.'); }
		$raw_email = trim(wp_unslash($_POST['email'] ?? ''));
		if (! is_email($raw_email)) { $error('Adj meg érvényes e-mail-címet.', 'Introdu o adresă de e-mail validă.'); }
		$email = strtolower(sanitize_email($raw_email));
		$rate = 'lyr_sub_ip_' . self::hash($_SERVER['REMOTE_ADDR'] ?? '');
		$attempts = (int) get_transient($rate);
		if ($attempts >= 5) { $error('Túl sok próbálkozás. Várj néhány percet.', 'Prea multe încercări. Așteaptă câteva minute.', 429); }
		set_transient($rate, $attempts + 1, 10 * MINUTE_IN_SECONDS);
		$lock = 'lyr_sub_lock_' . self::hash($email . ':' . $purpose);
		$locked_at = (int) get_option($lock);
		if ($locked_at && $locked_at < time() - 2 * MINUTE_IN_SECONDS) { delete_option($lock); }
		if (! add_option($lock, time(), '', false)) { $error('A kérés feldolgozása folyamatban van.', 'Cererea este în curs de procesare.', 429); }
		$accepted = true; $throttled = false; $failure = false;
		try {
			$found = self::find($email, $purpose); $post = $found ? $found[0] : null;
			if ($post && 'confirmed' === get_post_meta($post->ID, '_state', true)) {
				// Idempotent response avoids exposing membership and does not send unsolicited repeats.
			} elseif (get_transient('lyr_sub_mail_' . self::hash($email))) { $throttled = true; }
			else {
				$id = $post ? $post->ID : wp_insert_post(array('post_type' => self::TYPE, 'post_status' => 'private', 'post_title' => $email), true);
				if (is_wp_error($id) || ! $id) { $failure = true; }
				else {
					$token = bin2hex(random_bytes(32));
					$meta = array('_email' => $email, '_email_hash' => self::hash($email), '_purpose' => $purpose, '_language' => $lang,
						'_state' => 'pending', '_consent_version' => self::CONSENT_VERSION, '_requested_at' => time(), '_confirm_hash' => hash('sha256', $token));
					foreach ($meta as $key => $value) {
						update_post_meta($id, $key, $value);
						if ((string) get_post_meta($id, $key, true) !== (string) $value) { throw new \RuntimeException('Subscription storage failed.'); }
					}
					$url = self::url('confirm', $id, $token);
					$cancel = self::url('unsubscribe', $id, $token);
					$purpose_text = 'launch' === $purpose ? ('ro' === $lang ? 'o notificare despre lansarea magazinului' : 'értesítés a webshop indulásáról') : ('ro' === $lang ? 'noutăți și produse Layero' : 'Layero-újdonságok és termékhírek');
					$subject = 'ro' === $lang ? 'Confirmă abonarea la Layero' : 'Erősítsd meg a Layero-feliratkozásodat';
					$body = 'ro' === $lang ? "Ai solicitat: $purpose_text.\n\nConfirmă adresa, apoi apasă butonul de confirmare pe pagină (link valabil 72 de ore):\n$url\n\nDacă nu ai solicitat abonarea, nu confirma. Cererea expiră automat.\nAnulează cererea: $cancel" : "Ezt kérted: $purpose_text.\n\nNyisd meg a linket, majd az oldalon erősítsd meg a feliratkozást (72 órán belül):\n$url\n\nHa nem te kérted, ne erősítsd meg. A kérés automatikusan lejár.\nA kérés törlése: $cancel";
					$accepted = wp_mail($email, $subject, $body . "\n\nLayero\nlayeroprint@gmail.com\n" . home_url('/adatvedelem/'), array('Content-Type: text/plain; charset=UTF-8'));
					update_post_meta($id, '_mail_status', $accepted ? 'accepted' : 'failed');
					if ($accepted) { set_transient('lyr_sub_mail_' . self::hash($email), 1, MINUTE_IN_SECONDS); }
				}
			}
		} catch (\Throwable $e) { $failure = true; } finally { delete_option($lock); }
		if ($throttled) { $error('Várj egy percet az újabb kérés előtt.', 'Așteaptă un minut înainte de a încerca din nou.', 429); }
		if ($failure || ! $accepted) { $error('A megerősítő levél küldése most nem sikerült. Próbáld újra később.', 'Nu am putut trimite mesajul de confirmare. Încearcă mai târziu.', 503); }
		wp_send_json_success(array('message' => 'ro' === $lang ? 'Dacă adresa trebuie confirmată, verifică mesajul Layero și dosarul spam. Abonarea devine activă după confirmare.' : 'Ha a cím még megerősítésre vár, keresd a Layero levelét a beérkezett és a spam mappában. A feliratkozás a megerősítés után lesz aktív.'));
	}
	public static function url($action, $id, $token) { return add_query_arg(array('layero_subscription' => $action, 'subscriber' => $id, 'token' => $token), home_url('/')); }
	public static function act($action, $id, $token, $commit = false) {
		if (! $commit) { return self::apply_action($action, $id, $token, false); }
		$lock = 'lyr_sub_action_' . absint($id);
		$started = (int) get_option($lock);
		if ($started && $started < time() - 2 * MINUTE_IN_SECONDS) { delete_option($lock); }
		if (! add_option($lock, time(), '', false)) { return new \WP_Error('busy', 'A kérés feldolgozása folyamatban van. Próbáld újra rövidesen.'); }
		try { return self::apply_action($action, $id, $token, true); } finally { delete_option($lock); }
	}
	private static function apply_action($action, $id, $token, $commit) {
		$post = get_post($id);
		if (! in_array($action, array('confirm', 'unsubscribe'), true) || ! $post || self::TYPE !== $post->post_type || 'private' !== $post->post_status || ! is_string($token) || ! preg_match('/^[a-f0-9]{64}$/D', $token)) { return new \WP_Error('invalid', 'A hivatkozás érvénytelen vagy lejárt.'); }
		$state = get_post_meta($id, '_state', true);
		if (! in_array($state, array('pending', 'confirmed'), true)) { return new \WP_Error('invalid', 'A hivatkozás érvénytelen vagy lejárt.'); }
		$hash = get_post_meta($id, 'confirmed' === $state ? '_unsubscribe_hash' : '_confirm_hash', true);
		if (! $hash || ! hash_equals($hash, hash('sha256', $token))) { return new \WP_Error('invalid', 'A hivatkozás érvénytelen vagy lejárt.'); }
		if ('confirm' === $action && ('pending' !== $state || (int) get_post_meta($id, '_requested_at', true) + 3 * DAY_IN_SECONDS < time())) { return new \WP_Error('expired', 'A megerősítő hivatkozás lejárt. Kérj új levelet a feliratkozási űrlapon.'); }
		if (! $commit) { return true; }
		if ('unsubscribe' === $action) { return wp_delete_post($id, true) ? true : new \WP_Error('storage', 'A törlés nem sikerült. Próbáld újra.'); }
		$unsubscribe_token = bin2hex(random_bytes(32));
		update_post_meta($id, '_unsubscribe_hash', hash('sha256', $unsubscribe_token));
		$confirmed_at = time(); update_post_meta($id, '_confirmed_at', $confirmed_at);
		if (hash('sha256', $unsubscribe_token) !== get_post_meta($id, '_unsubscribe_hash', true) || $confirmed_at !== (int) get_post_meta($id, '_confirmed_at', true)) { return new \WP_Error('storage', 'A megerősítés mentése nem sikerült. Próbáld újra.'); }
		update_post_meta($id, '_state', 'confirmed');
		if ('confirmed' !== get_post_meta($id, '_state', true)) { return new \WP_Error('storage', 'A megerősítés mentése nem sikerült. Próbáld újra.'); }
		delete_post_meta($id, '_confirm_hash');
		$lang = get_post_meta($id, '_language', true); $url = self::url('unsubscribe', $id, $unsubscribe_token);
		$body = 'ro' === $lang ? "Abonarea ta este confirmată.\nDezabonare oricând (confirmă pe pagină):\n$url" : "A feliratkozásodat megerősítetted.\nBármikor leiratkozhatsz (az oldalon erősítsd meg):\n$url";
		$mail = wp_mail(get_post_meta($id, '_email', true), 'Layero — ' . ('ro' === $lang ? 'abonare confirmată' : 'megerősített feliratkozás'), $body, array('Content-Type: text/plain; charset=UTF-8'));
		update_post_meta($id, '_welcome_mail_status', $mail ? 'accepted' : 'failed');
		return array('unsubscribe_url' => $url);
	}
	public static function endpoint() {
		if (! isset($_GET['layero_subscription'])) { return; }
		$action = is_string($_GET['layero_subscription']) ? $_GET['layero_subscription'] : '';
		$id = isset($_GET['subscriber']) && is_scalar($_GET['subscriber']) ? absint($_GET['subscriber']) : 0;
		$token = isset($_GET['token']) && is_string($_GET['token']) ? $_GET['token'] : '';
		$lang = 'ro' === get_post_meta($id, '_language', true) ? 'ro' : 'hu';
		$commit = 'POST' === ($_SERVER['REQUEST_METHOD'] ?? '') && isset($_POST['confirm']) && '1' === $_POST['confirm'];
		$result = self::act($action, $id, $token, $commit);
		$ok = ! is_wp_error($result);
		nocache_headers(); status_header($ok ? 200 : 400); header('Referrer-Policy: no-referrer'); header('X-Robots-Tag: noindex, nofollow');
		$title = 'unsubscribe' === $action ? ('ro' === $lang ? 'Dezabonare' : 'Leiratkozás') : ('ro' === $lang ? 'Confirmă abonarea' : 'Feliratkozás megerősítése');
		if (! $ok) { $message = 'ro' === $lang ? 'Linkul este nevalid sau a expirat. Solicită un mesaj nou din formular.' : $result->get_error_message(); }
		elseif ($commit) { $message = 'unsubscribe' === $action ? ('ro' === $lang ? 'Datele abonării au fost șterse. Nu vei mai primi aceste notificări.' : 'A feliratkozás adatait töröltük. Ebből a listából nem kapsz több értesítést.') : ('ro' === $lang ? 'Abonarea este activă. Mulțumim!' : 'A feliratkozásod aktív. Köszönjük!'); }
		else { $message = 'unsubscribe' === $action ? ('ro' === $lang ? 'Apasă butonul pentru a șterge abonarea.' : 'A gombbal törölheted a feliratkozásodat.') : ('ro' === $lang ? 'Apasă butonul pentru a confirma că dorești această abonare.' : 'A gombbal megerősíted, hogy kéred ezt a feliratkozást.'); }
		echo '<!doctype html><html lang="' . esc_attr($lang) . '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . esc_html($title) . ' — Layero</title><style>body{margin:0;background:#020812;color:#c6d1dd;font:18px/1.6 system-ui,sans-serif}main{max-width:600px;margin:10vh auto;padding:28px}button,a{font:inherit}button{padding:12px 22px;border:0;border-radius:12px;color:#020812;background:#00d7e8;cursor:pointer}a{color:#00e5ff}button:focus-visible,a:focus-visible{outline:3px solid #f0c27a;outline-offset:4px}h1{line-height:1.2}p{overflow-wrap:anywhere}</style><main><strong>Layero</strong><h1>' . esc_html($title) . '</h1><p role="status">' . esc_html($message) . '</p>';
		if ($ok && ! $commit) { echo '<form method="post"><button type="submit" name="confirm" value="1">' . esc_html('ro' === $lang ? 'Confirmă' : 'Megerősítem') . '</button></form>'; }
		if (is_array($result)) { echo '<p><a href="' . esc_url($result['unsubscribe_url']) . '">' . esc_html('ro' === $lang ? 'Dezabonare' : 'Leiratkozás') . '</a></p>'; }
		echo '<p><a href="' . esc_url(home_url('/adatvedelem/')) . '">' . esc_html('ro' === $lang ? 'Protecția datelor' : 'Adatvédelmi tájékoztató') . '</a></p><p><a href="' . esc_url(home_url('/')) . '">' . esc_html('ro' === $lang ? 'Înapoi la Layero' : 'Vissza a Layeróhoz') . '</a></p></main></html>'; exit;
	}
	public static function render_form($purpose = 'newsletter', $lang = 'hu', $class = '') {
		$id = wp_unique_id('layero-subscription-');
		self::assets();
		$label = 'ro' === $lang ? 'Adresa de e-mail' : 'E-mail-cím';
		$consent = 'launch' === $purpose ? ('ro' === $lang ? 'Doresc o notificare prin e-mail când se lansează magazinul Layero.' : 'E-mailes értesítést kérek a Layero webshop indulásáról.') : ('ro' === $lang ? 'Doresc noutăți și produse Layero prin e-mail.' : 'E-mailben kérem a Layero újdonságait és termékhíreit.');
		echo '<form class="lyr-subscription ' . esc_attr($class) . '" data-layero-subscription data-endpoint="' . esc_url(admin_url('admin-ajax.php')) . '" data-language="' . esc_attr($lang) . '"><label for="' . esc_attr($id) . '">' . esc_html($label) . '</label><div class="lyr-subscription__row"><input id="' . esc_attr($id) . '" type="email" name="email" required maxlength="254" autocomplete="email" placeholder="nev@example.com"><button type="submit">' . esc_html('ro' === $lang ? 'Mă abonez' : 'Feliratkozom') . '</button></div><input type="hidden" name="purpose" value="' . esc_attr($purpose) . '"><input type="hidden" name="language" value="' . esc_attr($lang) . '"><input type="text" name="website" class="lyr-subscription__trap" tabindex="-1" autocomplete="off" aria-hidden="true"><label class="lyr-subscription__consent"><input type="checkbox" name="consent" value="1" required><span>' . esc_html($consent) . ' <a href="' . esc_url(home_url('/adatvedelem/#feliratkozas')) . '">' . esc_html('ro' === $lang ? 'Informații despre datele tale' : 'Adatkezelési tájékoztató') . '</a></span></label><p class="lyr-subscription__hint">' . esc_html('ro' === $lang ? 'Confirmare prin e-mail. Dezabonare oricând. Nu este necesară pentru cumpărături.' : 'E-mailes megerősítéssel. Bármikor leiratkozhatsz. A vásárláshoz nem szükséges.') . '</p><p data-subscription-status role="status" aria-live="polite"></p></form>';
	}
	public static function render_banner() {
		echo '<section class="sh-band" aria-label="Layero-hírlevél"><div class="shop-wrap"><div class="sh-nlbanner"><div><h2>Újdonságok, rétegről rétegre.</h2><p>Kérd a Layero új termékeit és ajándékötleteit e-mailben.</p></div>';
		self::render_form('newsletter');
		echo '</div></div></section>';
	}
	public static function home_banner($content) {
		if (! is_front_page() || ! is_main_query() || ! in_the_loop() || is_feed() || false !== strpos($content, 'data-layero-subscription')) { return $content; }
		if (! is_user_logged_in() && 'disabled' !== get_option('elementor_maintenance_mode_mode', 'disabled')) { return $content; }
		ob_start(); self::render_banner(); return $content . ob_get_clean();
	}
	public static function assets() {
		wp_enqueue_script('layero-subscriptions', LAYERO_SHOP_UI_URL . 'assets/js/layero-subscriptions.js', array(), LAYERO_SHOP_UI_VERSION, true);
		wp_enqueue_style('layero-subscriptions', LAYERO_SHOP_UI_URL . 'assets/css/layero-subscriptions.css', array(), LAYERO_SHOP_UI_VERSION);
	}
	public static function cleanup() {
		$posts = get_posts(array('post_type' => self::TYPE, 'post_status' => 'private', 'numberposts' => 100, 'meta_query' => array('relation' => 'OR',
			array('relation' => 'AND', array('key' => '_state', 'value' => 'pending'), array('key' => '_requested_at', 'value' => time() - 3 * DAY_IN_SECONDS, 'compare' => '<', 'type' => 'NUMERIC')),
			array('relation' => 'AND', array('key' => '_state', 'value' => 'confirmed'), array('key' => '_confirmed_at', 'value' => time() - 365 * DAY_IN_SECONDS, 'compare' => '<', 'type' => 'NUMERIC')))));
		foreach ($posts as $post) { wp_delete_post($post->ID, true); }
	}
	public static function columns($columns) { return array('cb' => $columns['cb'], 'title' => 'E-mail-cím', 'purpose' => 'Értesítés', 'state' => 'Állapot', 'mail' => 'Levélküldés', 'confirmed' => 'Megerősítés', 'date' => 'Kérés'); }
	public static function column($column, $id) {
		if ('purpose' === $column) { echo esc_html('launch' === get_post_meta($id, '_purpose', true) ? 'Webshop indulása' : 'Layero-hírlevél'); }
		if ('state' === $column) { echo esc_html('confirmed' === get_post_meta($id, '_state', true) ? 'Megerősített' : 'Megerősítésre vár'); }
		if ('mail' === $column) { echo esc_html('failed' === get_post_meta($id, '_mail_status', true) ? 'Küldési hiba' : 'Küldésre elfogadva'); }
		if ('confirmed' === $column) { $time = (int) get_post_meta($id, '_confirmed_at', true); echo $time ? esc_html(wp_date('Y-m-d H:i', $time)) : '—'; }
	}
	public static function exporters($items) { $items['layero-subscriptions'] = array('exporter_friendly_name' => 'Layero feliratkozások', 'callback' => array(__CLASS__, 'export')); return $items; }
	public static function erasers($items) { $items['layero-subscriptions'] = array('eraser_friendly_name' => 'Layero feliratkozások', 'callback' => array(__CLASS__, 'erase')); return $items; }
	public static function export($email, $page = 1) {
		$data = array(); foreach (self::find($email, null, true) as $post) {
			$rows = array(); foreach (array('_email' => 'E-mail', '_purpose' => 'Értesítés típusa', '_state' => 'Állapot', '_consent_version' => 'Hozzájárulás szövegváltozata', '_requested_at' => 'Kérés ideje (Unix)', '_confirmed_at' => 'Megerősítés ideje (Unix)') as $key => $label) { $rows[] = array('name' => $label, 'value' => (string) get_post_meta($post->ID, $key, true)); }
			$data[] = array('group_id' => 'layero-subscriptions', 'group_label' => 'Layero feliratkozások', 'item_id' => 'layero-subscription-' . $post->ID, 'data' => $rows);
		} return array('data' => $data, 'done' => true);
	}
	public static function erase($email, $page = 1) {
		$removed = false; $retained = false; foreach (self::find($email, null, true) as $post) { if (wp_delete_post($post->ID, true)) { $removed = true; } else { $retained = true; } }
		return array('items_removed' => $removed, 'items_retained' => $retained, 'messages' => $retained ? array('Egy feliratkozás törlése nem sikerült; kérjük, ellenőrizze kézzel.') : array(), 'done' => true);
	}
}
