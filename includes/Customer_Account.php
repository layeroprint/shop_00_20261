<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

/**
 * WooCommerce-native customer account additions.
 *
 * Orders and addresses stay in WooCommerce. Only favorite product IDs are
 * stored here, in user meta, so the module remains HPOS compatible.
 */
final class Customer_Account {
	const FAVORITES_META = '_layero_favorite_products';
	const FAVORITES_ENDPOINT = 'layero_favorites';
	const FAVORITES_SLUG = 'kedvencek';
	const ROUTES_VERSION = '2';
	const MAX_FAVORITES = 100;

	private static $instance = null;

	public static function instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action('init', array($this, 'register_endpoint'));
		add_action('wp_loaded', array($this, 'maybe_flush_routes'));
		add_filter('woocommerce_get_query_vars', array($this, 'register_woocommerce_query_var'));
		add_filter('woocommerce_account_menu_items', array($this, 'add_account_menu_item'));
		add_action('woocommerce_account_' . self::FAVORITES_ENDPOINT . '_endpoint', array($this, 'render_favorites_endpoint'));
		add_action('woocommerce_account_dashboard', array($this, 'render_woocommerce_dashboard'), 5);
		add_filter('body_class', array($this, 'account_body_classes'));

		add_action('wp_ajax_layero_toggle_favorite', array($this, 'ajax_toggle_favorite'));
		add_action('wp_ajax_layero_sync_favorites', array($this, 'ajax_sync_favorites'));
		add_action('wp_ajax_layero_load_favorites', array($this, 'ajax_load_favorites'));
		add_action('wp_ajax_nopriv_layero_load_favorites', array($this, 'ajax_load_favorites'));

		add_shortcode('layero_account', array($this, 'account_shortcode'));
		add_shortcode('layero_account_dashboard', array($this, 'dashboard_shortcode'));
		add_shortcode('layero_account_navigation', array($this, 'navigation_shortcode'));
		add_shortcode('layero_order_history', array($this, 'orders_shortcode'));
		add_shortcode('layero_favorites', array($this, 'favorites_shortcode'));
		add_shortcode('layero_account_details', array($this, 'details_shortcode'));
	}

	public function register_endpoint() {
		add_rewrite_endpoint(self::FAVORITES_SLUG, EP_PAGES);
	}

	public function maybe_flush_routes() {
		if (self::ROUTES_VERSION === get_option('layero_shop_ui_account_routes')) {
			return;
		}

		flush_rewrite_rules(false);
		update_option('layero_shop_ui_account_routes', self::ROUTES_VERSION, false);
	}

	public function register_woocommerce_query_var($query_vars) {
		$query_vars[self::FAVORITES_ENDPOINT] = self::FAVORITES_SLUG;

		return $query_vars;
	}

	public function add_account_menu_item($items) {
		$updated = array();
		foreach ((array) $items as $endpoint => $label) {
			if ('customer-logout' === $endpoint) {
				$updated[self::FAVORITES_ENDPOINT] = __('Kedvencek', 'layero-shop-ui');
			}
			$updated[$endpoint] = $label;
		}

		if (! isset($updated[self::FAVORITES_ENDPOINT])) {
			$updated[self::FAVORITES_ENDPOINT] = __('Kedvencek', 'layero-shop-ui');
		}

		return $updated;
	}

	public function account_body_classes($classes) {
		if (function_exists('is_account_page') && is_account_page()) {
			$classes[] = 'layero-account-page';
			if (function_exists('is_wc_endpoint_url') && ! is_wc_endpoint_url()) {
				$classes[] = 'layero-account-dashboard-active';
			}
		}

		if (function_exists('is_page') && is_page(self::FAVORITES_SLUG)) {
			$classes[] = 'layero-favorites-page';
		}

		return $classes;
	}

	public static function get_favorite_ids($user_id = 0) {
		$user_id = $user_id ? absint($user_id) : get_current_user_id();
		if (! $user_id) {
			return array();
		}

		return self::normalize_product_ids(get_user_meta($user_id, self::FAVORITES_META, true));
	}

	private static function save_favorite_ids($ids, $user_id = 0) {
		$user_id = $user_id ? absint($user_id) : get_current_user_id();
		if (! $user_id) {
			return array();
		}

		$ids = self::normalize_product_ids($ids);
		$valid = array();
		foreach ($ids as $product_id) {
			$product = function_exists('wc_get_product') ? wc_get_product($product_id) : null;
			if ($product && 'publish' === $product->get_status()) {
				$valid[] = $product_id;
			}
			if (count($valid) >= self::MAX_FAVORITES) {
				break;
			}
		}

		update_user_meta($user_id, self::FAVORITES_META, $valid);

		return $valid;
	}

	private static function normalize_product_ids($ids) {
		if (is_string($ids)) {
			$decoded = json_decode($ids, true);
			$ids = is_array($decoded) ? $decoded : explode(',', $ids);
		}

		$normalized = array();
		foreach (array_slice((array) $ids, 0, self::MAX_FAVORITES) as $value) {
			$product_id = absint($value);
			if (! $product_id && is_scalar($value) && function_exists('get_page_by_path')) {
				$product = get_page_by_path(sanitize_title((string) $value), OBJECT, 'product');
				$product_id = $product ? absint($product->ID) : 0;
			}
			if ($product_id && ! in_array($product_id, $normalized, true)) {
				$normalized[] = $product_id;
			}
		}

		return $normalized;
	}

	private function verify_ajax_request() {
		if (! check_ajax_referer('layero_account', 'nonce', false)) {
			wp_send_json_error(array('message' => __('Lejárt a munkamenet. Frissítsd az oldalt.', 'layero-shop-ui')), 403);
		}
	}

	public function ajax_toggle_favorite() {
		$this->verify_ajax_request();
		if (! is_user_logged_in()) {
			wp_send_json_error(array('message' => __('A szinkronizáláshoz jelentkezz be.', 'layero-shop-ui')), 401);
		}

		$product_id = isset($_POST['product_id']) ? absint(wp_unslash($_POST['product_id'])) : 0;
		$product = $product_id && function_exists('wc_get_product') ? wc_get_product($product_id) : null;
		if (! $product || 'publish' !== $product->get_status()) {
			wp_send_json_error(array('message' => __('A termék nem található.', 'layero-shop-ui')), 404);
		}

		$ids = self::get_favorite_ids();
		$index = array_search($product_id, $ids, true);
		if (false === $index) {
			array_unshift($ids, $product_id);
			$active = true;
		} else {
			unset($ids[$index]);
			$active = false;
		}

		$ids = self::save_favorite_ids($ids);
		wp_send_json_success(array('ids' => $ids, 'active' => $active, 'count' => count($ids)));
	}

	public function ajax_sync_favorites() {
		$this->verify_ajax_request();
		if (! is_user_logged_in()) {
			wp_send_json_error(array('message' => __('A szinkronizáláshoz jelentkezz be.', 'layero-shop-ui')), 401);
		}

		$browser_ids = isset($_POST['ids']) ? wp_unslash($_POST['ids']) : array();
		$ids = array_values(array_unique(array_merge(self::get_favorite_ids(), self::normalize_product_ids($browser_ids))));
		$ids = self::save_favorite_ids($ids);

		wp_send_json_success(array('ids' => $ids, 'count' => count($ids)));
	}

	public function ajax_load_favorites() {
		$this->verify_ajax_request();
		$limit = isset($_POST['limit']) ? min(self::MAX_FAVORITES, max(1, absint(wp_unslash($_POST['limit'])))) : self::MAX_FAVORITES;
		$ids = is_user_logged_in()
			? self::get_favorite_ids()
			: self::normalize_product_ids(isset($_POST['ids']) ? wp_unslash($_POST['ids']) : array());
		$ids = array_slice($ids, 0, $limit);

		$html = '';
		$rendered_ids = array();
		if (! empty($ids) && Helpers::is_woo_active()) {
			$products = Helpers::query_products(array(
				'limit' => count($ids),
				'product_ids' => $ids,
				'orderby' => 'include',
			));
			foreach ($products as $product) {
				$rendered_ids[] = $product->get_id();
				$html .= Helpers::product_card($product);
			}
		}

		wp_send_json_success(array('ids' => $rendered_ids, 'html' => $html, 'count' => count($rendered_ids)));
	}

	public function render_favorites_endpoint() {
		echo $this->render_favorites(array('title' => __('Kedvenc termékeim', 'layero-shop-ui'))); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	public function render_woocommerce_dashboard() {
		if (is_user_logged_in()) {
			echo $this->render_dashboard(array('recent_limit' => 3)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}

	public function account_shortcode($atts = array()) {
		if (! Helpers::is_woo_active()) {
			return $this->unavailable_notice();
		}
		if (! is_user_logged_in()) {
			return '<div class="lyr-account-auth">' . do_shortcode('[woocommerce_my_account]') . '</div>';
		}

		$atts = shortcode_atts(array('recent_limit' => 3), $atts, 'layero_account');
		$endpoint = $this->current_account_endpoint();
		$content = $this->render_account_endpoint($endpoint, $atts);
		$endpoint_class = $endpoint ? sanitize_html_class($endpoint) : 'dashboard';

		return '<div class="lyr-account-shell"><div class="lyr-account-layout"><aside class="lyr-account-sidebar">' .
			$this->render_profile_summary() . $this->render_navigation() .
			'</aside><main class="lyr-account-main"><div class="lyr-account-endpoint lyr-account-endpoint--' . esc_attr($endpoint_class) . '">' .
			$content . '</div></main></div></div>';
	}

	private function current_account_endpoint() {
		if (function_exists('WC') && WC() && isset(WC()->query) && method_exists(WC()->query, 'get_current_endpoint')) {
			return (string) WC()->query->get_current_endpoint();
		}

		$endpoints = array('orders', 'view-order', 'downloads', 'edit-address', 'payment-methods', 'add-payment-method', 'edit-account', self::FAVORITES_ENDPOINT);
		foreach ($endpoints as $endpoint) {
			if (function_exists('is_wc_endpoint_url') && is_wc_endpoint_url($endpoint)) {
				return $endpoint;
			}
		}

		return '';
	}

	private function render_account_endpoint($endpoint, $atts) {
		if (! $endpoint) {
			return $this->render_dashboard($atts);
		}

		if ('orders' === $endpoint) {
			return $this->render_orders(array(
				'limit' => 50,
				'title' => __('Rendelési előzmények', 'layero-shop-ui'),
			));
		}

		if (self::FAVORITES_ENDPOINT === $endpoint) {
			return $this->render_favorites(array('title' => __('Kedvenc termékeim', 'layero-shop-ui')));
		}

		$allowed_native_endpoints = array('view-order', 'downloads', 'edit-address', 'payment-methods', 'add-payment-method', 'edit-account');
		if (! in_array($endpoint, $allowed_native_endpoints, true)) {
			return $this->render_dashboard($atts);
		}

		$value = function_exists('get_query_var') ? get_query_var($endpoint, '') : '';
		ob_start();
		do_action('woocommerce_account_' . $endpoint . '_endpoint', $value);
		$native_content = ob_get_clean();

		if (! trim($native_content)) {
			return '<div class="lyr-account-empty"><h3>' . esc_html__('Ez a fiókrész jelenleg nem érhető el.', 'layero-shop-ui') . '</h3><p>' . esc_html__('Próbáld újra később, vagy térj vissza a profil főoldalára.', 'layero-shop-ui') . '</p><a class="lyr-btn lyr-btn--primary" href="' . esc_url($this->account_url('dashboard')) . '">' . esc_html__('Vissza a fiókhoz', 'layero-shop-ui') . '</a></div>';
		}

		return '<div class="woocommerce lyr-account-native"><div class="woocommerce-MyAccount-content">' . $native_content . '</div></div>';
	}

	public function dashboard_shortcode($atts = array()) {
		$atts = shortcode_atts(array('recent_limit' => 3), $atts, 'layero_account_dashboard');

		return $this->render_dashboard($atts);
	}

	public function navigation_shortcode() {
		return $this->render_navigation();
	}

	public function orders_shortcode($atts = array()) {
		$atts = shortcode_atts(array('limit' => 10, 'title' => __('Rendelési előzmények', 'layero-shop-ui')), $atts, 'layero_order_history');

		return $this->render_orders($atts);
	}

	public function favorites_shortcode($atts = array()) {
		return $this->render_favorites(shortcode_atts(array(
			'title' => __('Kedvenc termékeim', 'layero-shop-ui'),
			'empty_text' => __('A termékkártyák szív ikonjával menthetsz ide termékeket.', 'layero-shop-ui'),
			'limit' => self::MAX_FAVORITES,
		), $atts, 'layero_favorites'));
	}

	public function details_shortcode($atts = array()) {
		return $this->render_details(shortcode_atts(array('title' => __('Fiókadatok', 'layero-shop-ui')), $atts, 'layero_account_details'));
	}

	public function render_dashboard($args = array()) {
		if (! Helpers::is_woo_active()) {
			return $this->unavailable_notice();
		}
		if (! is_user_logged_in()) {
			return '<div class="lyr-account-auth">' . do_shortcode('[woocommerce_my_account]') . '</div>';
		}

		$args = wp_parse_args($args, array('recent_limit' => 3, 'title' => __('Szia, %s!', 'layero-shop-ui')));
		$user = wp_get_current_user();
		$name = $user->first_name ?: $user->display_name;
		$order_count = function_exists('wc_get_customer_order_count') ? wc_get_customer_order_count($user->ID) : 0;
		$total_spent = function_exists('wc_get_customer_total_spent') ? wc_get_customer_total_spent($user->ID) : 0;
		$favorite_count = count(self::get_favorite_ids($user->ID));
		$active_count = $this->active_order_count($user->ID);
		$title = false !== strpos($args['title'], '%s') ? sprintf($args['title'], $name) : $args['title'];

		ob_start();
		?>
		<div class="lyr-account-dashboard">
			<header class="lyr-account-heading">
				<span class="lyr-eyebrow"><?php esc_html_e('Személyes fiók', 'layero-shop-ui'); ?></span>
				<h2><?php echo esc_html($title); ?></h2>
				<p><?php esc_html_e('Innen minden rendelésedet, kedvencedet és fiókadatodat egy helyen kezelheted.', 'layero-shop-ui'); ?></p>
			</header>
			<div class="lyr-account-stats">
				<?php echo $this->stat_card('package', __('Rendelések', 'layero-shop-ui'), number_format_i18n($order_count), $this->account_url('orders')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo $this->stat_card('clock', __('Folyamatban', 'layero-shop-ui'), number_format_i18n($active_count), $this->account_url('orders')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo $this->stat_card('heart', __('Kedvencek', 'layero-shop-ui'), number_format_i18n($favorite_count), self::favorites_url()); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo $this->stat_card('wallet', __('Eddigi vásárlás', 'layero-shop-ui'), wc_price((float) $total_spent), $this->account_url('orders'), true); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
			<div class="lyr-account-section-head">
				<div><span class="lyr-eyebrow"><?php esc_html_e('Legutóbbi aktivitás', 'layero-shop-ui'); ?></span><h3><?php esc_html_e('Legutóbbi rendelések', 'layero-shop-ui'); ?></h3></div>
				<a href="<?php echo esc_url($this->account_url('orders')); ?>"><?php esc_html_e('Összes rendelés', 'layero-shop-ui'); ?> &rsaquo;</a>
			</div>
			<?php echo $this->render_orders(array('limit' => absint($args['recent_limit']), 'title' => '', 'compact' => true)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<?php echo $this->render_details(array('title' => __('Fiók és címek', 'layero-shop-ui'), 'compact' => true)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function render_navigation($args = array()) {
		if (! is_user_logged_in() || ! function_exists('wc_get_account_menu_items')) {
			return '';
		}

		$args = wp_parse_args($args, array('show_profile' => false));
		$items = wc_get_account_menu_items();
		ob_start();
		if ($args['show_profile']) {
			echo $this->render_profile_summary(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
		?>
		<nav class="lyr-account-nav" aria-label="<?php esc_attr_e('Fiók navigáció', 'layero-shop-ui'); ?>">
			<?php foreach ($items as $endpoint => $label) : ?>
				<a class="<?php echo $this->is_current_endpoint($endpoint) ? 'is-active' : ''; ?>" href="<?php echo esc_url($this->account_url($endpoint)); ?>">
					<?php echo Helpers::icon($this->menu_icon($endpoint)); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php echo esc_html($label); ?></span>
				</a>
			<?php endforeach; ?>
		</nav>
		<?php
		return ob_get_clean();
	}

	public function render_orders($args = array()) {
		if (! is_user_logged_in()) {
			return $this->login_notice();
		}
		if (! function_exists('wc_get_orders')) {
			return $this->unavailable_notice();
		}

		$args = wp_parse_args($args, array('limit' => 10, 'title' => __('Rendelési előzmények', 'layero-shop-ui'), 'compact' => false));
		$limit = min(50, max(1, absint($args['limit'])));
		$orders = wc_get_orders(array(
			'customer_id' => get_current_user_id(),
			'limit' => $limit,
			'orderby' => 'date',
			'order' => 'DESC',
		));

		ob_start();
		?>
		<div class="lyr-orders <?php echo ! empty($args['compact']) ? 'lyr-orders--compact' : ''; ?>">
			<?php if ($args['title']) : ?><h2><?php echo esc_html($args['title']); ?></h2><?php endif; ?>
			<?php if (empty($orders)) : ?>
				<div class="lyr-account-empty">
					<?php echo Helpers::icon('package'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<h3><?php esc_html_e('Még nincs rendelésed.', 'layero-shop-ui'); ?></h3>
					<p><?php esc_html_e('Ha megtaláltad a megfelelő ajándékot, a rendelésed itt fog megjelenni.', 'layero-shop-ui'); ?></p>
					<a class="lyr-btn lyr-btn--primary" href="<?php echo esc_url(Helpers::products_url()); ?>"><?php esc_html_e('Termékek böngészése', 'layero-shop-ui'); ?></a>
				</div>
			<?php else : ?>
				<div class="lyr-orders-list">
					<?php foreach ($orders as $order) : ?>
						<?php echo $this->render_order_card($order); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}

	public function render_favorites($args = array()) {
		$args = wp_parse_args($args, array(
			'title' => __('Kedvenc termékeim', 'layero-shop-ui'),
			'eyebrow' => __('Saját válogatás', 'layero-shop-ui'),
			'description' => __('Mentsd el, ami megtetszik, hasonlítsd össze nyugodtan, és térj vissza hozzá bármikor.', 'layero-shop-ui'),
			'empty_text' => __('A termékkártyák szív ikonjával menthetsz ide termékeket.', 'layero-shop-ui'),
			'browse_label' => __('Termékek böngészése', 'layero-shop-ui'),
			'browse_url' => Helpers::products_url(),
			'limit' => self::MAX_FAVORITES,
		));
		$limit = min(self::MAX_FAVORITES, max(1, absint($args['limit'])));
		$standalone = function_exists('is_page') && is_page(self::FAVORITES_SLUG);
		$heading_tag = $standalone ? 'h1' : 'h2';
		$browse_url = $args['browse_url'] ? $args['browse_url'] : Helpers::products_url();
		$account_url = $this->account_url('dashboard');
		$products = array();
		if (is_user_logged_in()) {
			$ids = array_slice(self::get_favorite_ids(), 0, $limit);
			if (! empty($ids)) {
				$products = Helpers::query_products(array('limit' => count($ids), 'product_ids' => $ids, 'orderby' => 'include'));
			}
		}

		ob_start();
		?>
		<section class="lyr-favorites <?php echo $standalone ? 'lyr-favorites--standalone' : 'lyr-favorites--embedded'; ?>" data-layero-favorites-widget data-limit="<?php echo esc_attr($limit); ?>">
			<?php if ($args['title']) : ?>
				<?php if ($standalone) : ?>
					<header class="lyr-favorites-hero">
						<div class="lyr-favorites-hero-copy">
							<span class="lyr-eyebrow"><?php echo esc_html($args['eyebrow']); ?></span>
							<<?php echo esc_html($heading_tag); ?>><?php echo esc_html($args['title']); ?></<?php echo esc_html($heading_tag); ?>>
							<?php if ($args['description']) : ?><p><?php echo esc_html($args['description']); ?></p><?php endif; ?>
						</div>
						<div class="lyr-favorites-hero-side">
							<div class="lyr-favorites-count-card">
								<span><?php echo Helpers::icon('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
								<div><b data-layero-favorites-count><?php echo esc_html(count($products)); ?></b><small><?php esc_html_e('mentett termék', 'layero-shop-ui'); ?></small></div>
							</div>
							<a class="lyr-btn lyr-btn--white" href="<?php echo esc_url($browse_url); ?>"><?php echo esc_html($args['browse_label']); ?> <span aria-hidden="true">&rsaquo;</span></a>
						</div>
					</header>
				<?php else : ?>
					<header class="lyr-account-section-head"><div><span class="lyr-eyebrow"><?php esc_html_e('Mentett termékek', 'layero-shop-ui'); ?></span><<?php echo esc_html($heading_tag); ?>><?php echo esc_html($args['title']); ?></<?php echo esc_html($heading_tag); ?>></div><b data-layero-favorites-count><?php echo esc_html(count($products)); ?></b></header>
				<?php endif; ?>
			<?php endif; ?>
			<div class="lyr-favorites-content">
				<?php if ($standalone) : ?>
					<div class="lyr-favorites-toolbar">
						<div>
							<?php echo Helpers::icon(is_user_logged_in() ? 'spark' : 'user'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span><?php echo esc_html(is_user_logged_in() ? __('A mentéseid a Layero fiókoddal szinkronban maradnak.', 'layero-shop-ui') : __('Jelentkezz be, hogy a mentéseid minden eszközödön megmaradjanak.', 'layero-shop-ui')); ?></span>
						</div>
						<a href="<?php echo esc_url($account_url); ?>"><?php echo esc_html(is_user_logged_in() ? __('Fiókom megnyitása', 'layero-shop-ui') : __('Belépés és szinkronizálás', 'layero-shop-ui')); ?> &rsaquo;</a>
					</div>
				<?php endif; ?>
				<div class="sh-prod-grid lyr-product-grid lyr-favorites-grid" data-layero-favorites-grid-target>
					<?php foreach ($products as $product) : ?>
						<?php echo Helpers::product_card($product); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php endforeach; ?>
				</div>
				<div class="lyr-account-empty" data-layero-favorites-widget-empty <?php echo ! empty($products) ? 'hidden' : ''; ?>>
					<span class="lyr-favorites-empty-icon"><?php echo Helpers::icon('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<h3><?php esc_html_e('Még nincs kedvenc terméked.', 'layero-shop-ui'); ?></h3>
					<p><?php echo esc_html($args['empty_text']); ?></p>
					<div class="lyr-favorites-empty-actions">
						<a class="lyr-btn lyr-btn--primary" href="<?php echo esc_url($browse_url); ?>"><?php echo esc_html($args['browse_label']); ?></a>
						<?php if ($standalone) : ?><a class="lyr-btn lyr-btn--quiet" href="<?php echo esc_url(home_url('/kviz/')); ?>"><?php esc_html_e('Ajándékkereső', 'layero-shop-ui'); ?></a><?php endif; ?>
					</div>
				</div>
				<p class="lyr-favorites-status" data-layero-favorites-status aria-live="polite"></p>
			</div>
		</section>
		<?php
		return ob_get_clean();
	}

	public function render_details($args = array()) {
		if (! Helpers::is_woo_active()) {
			return $this->unavailable_notice();
		}
		if (! is_user_logged_in()) {
			return $this->login_notice();
		}

		$args = wp_parse_args($args, array('title' => __('Fiókadatok', 'layero-shop-ui'), 'compact' => false));
		$user = wp_get_current_user();
		$billing = function_exists('wc_get_account_formatted_address') ? wc_get_account_formatted_address('billing', $user->ID) : '';
		$shipping = function_exists('wc_get_account_formatted_address') ? wc_get_account_formatted_address('shipping', $user->ID) : '';
		$address_base = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : home_url('/fiok/');

		ob_start();
		?>
		<section class="lyr-account-details <?php echo ! empty($args['compact']) ? 'lyr-account-details--compact' : ''; ?>">
			<?php if ($args['title']) : ?><h2><?php echo esc_html($args['title']); ?></h2><?php endif; ?>
			<div class="lyr-account-detail-grid">
				<article>
					<span class="lyr-account-detail-icon"><?php echo Helpers::icon('user'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<h3><?php esc_html_e('Személyes adatok', 'layero-shop-ui'); ?></h3>
					<p><strong><?php echo esc_html($user->display_name); ?></strong><br><?php echo esc_html($user->user_email); ?></p>
					<a href="<?php echo esc_url($this->account_url('edit-account')); ?>"><?php esc_html_e('Adatok és jelszó szerkesztése', 'layero-shop-ui'); ?> &rsaquo;</a>
				</article>
				<article>
					<span class="lyr-account-detail-icon"><?php echo Helpers::icon('pin'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<h3><?php esc_html_e('Számlázási cím', 'layero-shop-ui'); ?></h3>
					<address><?php echo $billing ? wp_kses_post($billing) : esc_html__('Még nincs megadva.', 'layero-shop-ui'); ?></address>
					<a href="<?php echo esc_url(wc_get_endpoint_url('edit-address', 'billing', $address_base)); ?>"><?php esc_html_e('Számlázási cím szerkesztése', 'layero-shop-ui'); ?> &rsaquo;</a>
				</article>
				<article>
					<span class="lyr-account-detail-icon"><?php echo Helpers::icon('truck'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<h3><?php esc_html_e('Szállítási cím', 'layero-shop-ui'); ?></h3>
					<address><?php echo $shipping ? wp_kses_post($shipping) : esc_html__('Még nincs megadva.', 'layero-shop-ui'); ?></address>
					<a href="<?php echo esc_url(wc_get_endpoint_url('edit-address', 'shipping', $address_base)); ?>"><?php esc_html_e('Szállítási cím szerkesztése', 'layero-shop-ui'); ?> &rsaquo;</a>
				</article>
			</div>
		</section>
		<?php
		return ob_get_clean();
	}

	private function render_profile_summary() {
		$user = wp_get_current_user();
		if (! $user || ! $user->exists()) {
			return '';
		}

		return '<div class="lyr-account-profile">' . get_avatar($user->ID, 64) . '<div><strong>' . esc_html($user->display_name) . '</strong><span>' . esc_html($user->user_email) . '</span></div></div>';
	}

	private function render_order_card($order) {
		if (! $order || absint($order->get_customer_id()) !== get_current_user_id()) {
			return '';
		}

		$date = $order->get_date_created();
		$actions = function_exists('wc_get_account_orders_actions') ? wc_get_account_orders_actions($order) : array();
		$thumbs = '';
		foreach (array_slice($order->get_items(), 0, 4) as $item) {
			$product = $item->get_product();
			if ($product) {
				$thumbs .= '<span title="' . esc_attr($item->get_name()) . '">' . $product->get_image('woocommerce_thumbnail') . '</span>';
			}
		}

		ob_start();
		?>
		<article class="lyr-order-card">
			<header>
				<div><strong><?php echo esc_html(sprintf(__('Rendelés #%s', 'layero-shop-ui'), $order->get_order_number())); ?></strong><span><?php echo $date ? esc_html(wc_format_datetime($date)) : ''; ?></span></div>
				<span class="lyr-order-status lyr-order-status--<?php echo esc_attr($order->get_status()); ?>"><?php echo esc_html(wc_get_order_status_name($order->get_status())); ?></span>
			</header>
			<div class="lyr-order-card-body">
				<div class="lyr-order-thumbs"><?php echo wp_kses_post($thumbs); ?></div>
				<div class="lyr-order-total"><span><?php echo esc_html(sprintf(_n('%s termék', '%s termék', $order->get_item_count(), 'layero-shop-ui'), number_format_i18n($order->get_item_count()))); ?></span><strong><?php echo wp_kses_post($order->get_formatted_order_total()); ?></strong></div>
			</div>
			<?php if (! empty($actions)) : ?>
				<footer class="lyr-order-actions">
					<?php foreach ($actions as $key => $action) : ?>
						<a class="lyr-btn <?php echo 'view' === $key ? 'lyr-btn--primary' : 'lyr-btn--ghost'; ?>" href="<?php echo esc_url($action['url']); ?>"><?php echo esc_html($action['name']); ?></a>
					<?php endforeach; ?>
				</footer>
			<?php endif; ?>
		</article>
		<?php
		return ob_get_clean();
	}

	private function stat_card($icon, $label, $value, $url, $allow_html = false) {
		return '<a class="lyr-account-stat" href="' . esc_url($url) . '"><span>' . Helpers::icon($icon) . '</span><div><small>' . esc_html($label) . '</small><strong>' . ($allow_html ? wp_kses_post($value) : esc_html($value)) . '</strong></div></a>';
	}

	private function active_order_count($user_id) {
		if (! function_exists('wc_get_orders')) {
			return 0;
		}

		$result = wc_get_orders(array(
			'customer_id' => absint($user_id),
			'status' => array('pending', 'on-hold', 'processing'),
			'limit' => 1,
			'paginate' => true,
			'return' => 'ids',
		));

		return is_object($result) && isset($result->total) ? absint($result->total) : 0;
	}

	private function account_url($endpoint = 'dashboard') {
		if ('dashboard' === $endpoint) {
			return function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : home_url('/fiok/');
		}
		if (self::FAVORITES_ENDPOINT === $endpoint) {
			return self::favorites_url();
		}

		return function_exists('wc_get_account_endpoint_url') ? wc_get_account_endpoint_url($endpoint) : home_url('/fiok/');
	}

	public static function favorites_url() {
		if (function_exists('wc_get_account_endpoint_url')) {
			return wc_get_account_endpoint_url(self::FAVORITES_ENDPOINT);
		}

		return home_url('/kedvencek/');
	}

	private function is_current_endpoint($endpoint) {
		if ('dashboard' === $endpoint) {
			return function_exists('is_account_page') && is_account_page() && function_exists('is_wc_endpoint_url') && ! is_wc_endpoint_url();
		}
		if ('orders' === $endpoint && function_exists('is_wc_endpoint_url') && is_wc_endpoint_url('view-order')) {
			return true;
		}
		if ('payment-methods' === $endpoint && function_exists('is_wc_endpoint_url') && is_wc_endpoint_url('add-payment-method')) {
			return true;
		}

		return function_exists('is_wc_endpoint_url') && is_wc_endpoint_url($endpoint);
	}

	private function menu_icon($endpoint) {
		$icons = array(
			'dashboard' => 'home',
			'orders' => 'package',
			'downloads' => 'download',
			'edit-address' => 'pin',
			'payment-methods' => 'wallet',
			'edit-account' => 'user',
			self::FAVORITES_ENDPOINT => 'heart',
			'customer-logout' => 'logout',
		);

		return $icons[$endpoint] ?? 'spark';
	}

	private function login_notice() {
		$url = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : home_url('/fiok/');

		return '<div class="lyr-account-empty"><h3>' . esc_html__('Jelentkezz be a fiókodba.', 'layero-shop-ui') . '</h3><p>' . esc_html__('A személyes adatok és rendelések csak bejelentkezés után érhetők el.', 'layero-shop-ui') . '</p><a class="lyr-btn lyr-btn--primary" href="' . esc_url($url) . '">' . esc_html__('Belépés', 'layero-shop-ui') . '</a></div>';
	}

	private function unavailable_notice() {
		return '<div class="lyr-account-empty"><h3>' . esc_html__('A fiókkezelés nem érhető el.', 'layero-shop-ui') . '</h3><p>' . esc_html__('A modulhoz aktív WooCommerce bővítmény szükséges.', 'layero-shop-ui') . '</p></div>';
	}
}
