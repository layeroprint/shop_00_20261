<?php

namespace LayeroShop;

defined('ABSPATH') || exit;

/** Shared shop appearance, with WooCommerce owning every cart operation and total. */
final class Commerce_UI {
	public static function init() {
		add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueue'), 110);
		add_action('wp_footer', array(__CLASS__, 'drawer'), 5);
		add_filter('woocommerce_add_to_cart_fragments', array(__CLASS__, 'fragments'));
		add_filter('body_class', array(__CLASS__, 'body_classes'));
		add_filter('woocommerce_cart_item_quantity', array(__CLASS__, 'quantity'), 10, 3);
		add_filter('woocommerce_widget_cart_item_quantity', array(__CLASS__, 'drawer_quantity'), 10, 3);
		add_action('wc_ajax_layero_cart_quantity', array(__CLASS__, 'update_quantity'));
		add_action('woocommerce_before_cart', array(__CLASS__, 'cart_intro'));
		add_action('woocommerce_after_cart_table', array(__CLASS__, 'continue_shopping'));
		add_action('woocommerce_cart_is_empty', array(__CLASS__, 'empty_cart'), 5);
		add_action('woocommerce_before_checkout_form', array(__CLASS__, 'checkout_intro'), 5);
		add_action('woocommerce_before_cart_totals', array(__CLASS__, 'summary_intro'));
	}

	public static function enqueue() {
		if (! function_exists('WC')) { return; }
		wp_enqueue_style('layero-commerce', LAYERO_SHOP_UI_URL . 'assets/css/layero-commerce.css', array('layero-online'), LAYERO_SHOP_UI_VERSION . '.' . filemtime(LAYERO_SHOP_UI_PATH . 'assets/css/layero-commerce.css'));
		wp_enqueue_script('layero-commerce', LAYERO_SHOP_UI_URL . 'assets/js/layero-commerce.js', array('jquery', 'wc-add-to-cart', 'wc-cart-fragments', 'layero-static-shop'), LAYERO_SHOP_UI_VERSION . '.' . filemtime(LAYERO_SHOP_UI_PATH . 'assets/js/layero-commerce.js'), true);
	}

	public static function body_classes($classes) {
		if (function_exists('is_cart') && is_cart()) { $classes[] = 'lyr-cart-page'; }
		if (function_exists('is_checkout') && is_checkout() && ! is_order_received_page()) { $classes[] = 'lyr-checkout-page'; }
		return $classes;
	}

	private static function count() {
		return WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
	}

	public static function badge() {
		$count = self::count();
		return '<span class="sh-cart-badge' . ($count ? ' is-on' : '') . '" aria-hidden="true">' . esc_html($count) . '</span>';
	}

	public static function content() {
		ob_start();
		echo '<div class="lyr-woo-cart-content widget_shopping_cart_content" data-cart-count="' . esc_attr(self::count()) . '" data-cart-nonce="' . esc_attr(wp_create_nonce('layero_cart_quantity')) . '" data-quantity-url="' . esc_url(\WC_AJAX::get_endpoint('layero_cart_quantity')) . '">';
		woocommerce_mini_cart();
		if (! self::count()) {
			echo '<a class="sh-btn sh-btn--primary" href="' . esc_url(Helpers::products_url()) . '">Felfedezem a termékeket</a>';
		} else {
			echo '<p class="lyr-cart-note">A szállítás és az elérhető fizetési módok a pénztárnál pontosíthatók.</p>';
		}
		echo '</div>';
		return ob_get_clean();
	}

	public static function fragments($fragments) {
		$fragments['.sh-cart-badge'] = self::badge();
		// Same selector as WooCommerce's own fragment: one replacement, never stale markup.
		$fragments['div.widget_shopping_cart_content'] = self::content();
		return $fragments;
	}

	public static function drawer() {
		if (! function_exists('WC') || ! WC()->cart) { return; }
		?>
		<dialog id="lyr-cart-drawer" class="lyr-cart-drawer" aria-labelledby="lyr-cart-heading">
			<div class="sh-drawer__head"><h2 id="lyr-cart-heading">Kosár <span data-layero-cart-count></span></h2><button class="sh-drawer__close" type="button" data-layero-cart-close aria-label="Kosár bezárása">✕</button></div>
			<div class="lyr-cart-drawer__body woocommerce widget_shopping_cart"><?php echo self::content(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
			<p class="lyr-cart-status" role="status" aria-live="polite"></p>
			<button class="lyr-cart-continue" type="button" data-layero-cart-close>Tovább válogatok</button>
		</dialog>
		<div class="lyr-commerce-status screen-reader-text" role="status" aria-live="polite"></div>
		<?php
	}

	public static function quantity($html, $key, $item) {
		$product = $item['data'];
		if ($product->is_sold_individually()) { return $html; }
		$name = $product->get_name();
		return '<div class="lyr-cart-quantity"><button type="button" data-layero-quantity="-1" aria-label="' . esc_attr($name . ' mennyiségének csökkentése') . '">−</button>' . $html . '<button type="button" data-layero-quantity="1" aria-label="' . esc_attr($name . ' mennyiségének növelése') . '">+</button></div>';
	}

	public static function drawer_quantity($html, $item, $key) {
		if ($item['data']->is_sold_individually()) { return $html; }
		$name = $item['data']->get_name();
		return $html . '<div class="lyr-drawer-quantity" data-cart-key="' . esc_attr($key) . '" data-quantity="' . esc_attr($item['quantity']) . '"><button type="button" data-drawer-quantity="-1" aria-label="' . esc_attr($name . ' mennyiségének csökkentése') . '"' . disabled($item['quantity'] <= 1, true, false) . '>−</button><output>' . esc_html($item['quantity']) . '</output><button type="button" data-drawer-quantity="1" aria-label="' . esc_attr($name . ' mennyiségének növelése') . '">+</button></div>';
	}

	/** Update only an existing item in this visitor's WooCommerce session. */
	public static function update_quantity() {
		if ('POST' !== ($_SERVER['REQUEST_METHOD'] ?? '') || ! check_ajax_referer('layero_cart_quantity', 'nonce', false)) {
			wp_send_json_error(array('message' => 'Lejárt a kosár munkamenete. Frissítsd az oldalt, majd próbáld újra.'), 403);
		}
		$key = isset($_POST['key']) && is_string($_POST['key']) ? wc_clean(wp_unslash($_POST['key'])) : '';
		$raw = $_POST['quantity'] ?? '';
		$item = WC()->cart ? WC()->cart->get_cart_item($key) : null;
		if (! $item || ! is_scalar($raw) || ! is_numeric($raw) || ! is_finite((float) $raw) || (float) $raw < 1) {
			wp_send_json_error(array('message' => 'A termék vagy a mennyiség már nem elérhető. Frissítsd a kosarat.'), 422);
		}
		$quantity = wc_stock_amount($raw);
		$product = $item['data'];
		$max = $product->get_max_purchase_quantity();
		$stock_quantities = WC()->cart->get_cart_item_quantities();
		$combined_quantity = ($stock_quantities[$product->get_stock_managed_by_id()] ?? $item['quantity']) - $item['quantity'] + $quantity;
		if (($product->is_sold_individually() && $quantity > 1) || ($max >= 0 && $quantity > $max)
			|| ! $product->has_enough_stock($combined_quantity)
			|| ! apply_filters('woocommerce_update_cart_validation', true, $key, $item, $quantity)) {
			wc_clear_notices();
			wp_send_json_error(array('message' => 'Ez a mennyiség nem rendelhető. Ellenőrizd a kosároldalon.'), 422);
		}
		WC()->cart->set_quantity($key, $quantity, true);
		WC()->cart->set_session();
		wp_send_json_success(array('message' => 'A mennyiséget frissítettük.'));
	}

	private static function steps($checkout = false) {
		echo '<nav class="lyr-commerce-steps" aria-label="Vásárlás lépései"><a href="' . esc_url(wc_get_cart_url()) . '"' . ($checkout ? '' : ' aria-current="step"') . '>1. Kosár</a><span aria-hidden="true">›</span>';
		echo $checkout ? '<span aria-current="step">2. Pénztár</span>' : '<span>2. Pénztár</span>';
		echo '</nav>';
	}

	public static function cart_intro() {
		self::steps();
		echo '<div class="lyr-commerce-heading"><h1 class="sh-cart-title">Kosár<small data-layero-cart-page-count>' . esc_html(self::count()) . ' darab a kosaradban</small></h1></div>';
	}

	public static function empty_cart() {
		self::steps();
		echo '<div class="lyr-commerce-heading"><h1 class="sh-cart-title">A kosarad még üres</h1><p>Találj egy személyes ajándékot, és tedd a kosaradba.</p></div>';
	}

	public static function continue_shopping() {
		echo '<a class="lyr-continue-shopping" href="' . esc_url(Helpers::products_url()) . '">← Tovább válogatok</a>';
	}

	public static function checkout_intro() {
		if (is_wc_endpoint_url('order-pay') || is_wc_endpoint_url('order-received')) { return; }
		self::steps(true);
		echo '<div class="lyr-commerce-heading"><h1 class="sh-checkout__title">Pénztár</h1><p>Már csak a szállítási és fizetési adatok vannak hátra.</p></div>';
	}

	public static function summary_intro() {
		echo '<h2 class="lyr-cart-summary-title">Összesítő</h2>';
	}
}
