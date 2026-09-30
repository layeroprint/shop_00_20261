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
		add_action('wc_ajax_layero_cart_quantity', array(__CLASS__, 'update_quantity'));
		add_action('wc_ajax_layero_cart_action', array(__CLASS__, 'cart_action'));
		add_action('woocommerce_cart_calculate_fees', array(__CLASS__, 'giftwrap_fee'));
		add_action('woocommerce_cart_emptied', array(__CLASS__, 'clear_giftwrap'));
		add_action('woocommerce_cart_item_removed', array(__CLASS__, 'clear_empty_giftwrap'), 10, 2);
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
		$cart = WC()->cart;
		// A restored session has totals but no shipping packages yet on ordinary pages.
		if ($cart) { $cart->calculate_totals(); }
		ob_start();
		echo '<div class="lyr-woo-cart-content" data-cart-version="2" data-cart-count="' . esc_attr(self::count()) . '" data-cart-nonce="' . esc_attr(wp_create_nonce('layero_cart_quantity')) . '" data-quantity-url="' . esc_url(\WC_AJAX::get_endpoint('layero_cart_quantity')) . '" data-action-url="' . esc_url(\WC_AJAX::get_endpoint('layero_cart_action')) . '">';
		$shipping = self::shipping();
		include LAYERO_SHOP_UI_PATH . 'templates/cart-drawer.php';
		echo '</div>';
		return ob_get_clean();
	}

	public static function fragments($fragments) {
		$fragments['.sh-cart-badge'] = self::badge();
		// Keep other plugins' native mini-cart fragments intact.
		$fragments['.lyr-woo-cart-content'] = self::content();
		return $fragments;
	}

	public static function drawer() {
		if (! function_exists('WC') || ! WC()->cart) { return; }
		?>
		<dialog id="lyr-cart-drawer" class="lyr-cart-drawer" aria-labelledby="lyr-cart-heading">
			<div class="sh-drawer__head"><h2 id="lyr-cart-heading">Kosár <span data-layero-cart-count></span></h2><button class="sh-drawer__close" type="button" data-layero-cart-close aria-label="Kosár bezárása">✕</button></div>
			<div class="lyr-cart-drawer__body"><?php echo self::content(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
			<p class="lyr-cart-status" role="status" aria-live="polite"></p>
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
		if ($item['data']->is_sold_individually()) { return '<small>1 db</small>'; }
		$name = $item['data']->get_name();
		$max = $item['data']->get_max_purchase_quantity();
		return '<div class="lyr-drawer-quantity" data-cart-key="' . esc_attr($key) . '" data-quantity="' . esc_attr($item['quantity']) . '"><button type="button" data-drawer-quantity="-1" aria-label="' . esc_attr($name . ' mennyiségének csökkentése') . '"' . disabled($item['quantity'] <= 1, true, false) . '>−</button><output>' . esc_html($item['quantity']) . '</output><button type="button" data-drawer-quantity="1" aria-label="' . esc_attr($name . ' mennyiségének növelése') . '"' . disabled($max >= 0 && $item['quantity'] >= $max, true, false) . '>+</button></div>';
	}

	/** Read the active shipping packages; never create or select a rate here. */
	public static function shipping() {
		$result = array('needed' => WC()->cart && WC()->cart->needs_shipping(), 'known' => false, 'free' => false, 'progress' => null, 'label' => 'A pénztárnál számítjuk');
		if (! $result['needed']) { return $result; }
		$packages = WC()->shipping()->get_packages();
		$chosen = WC()->session->get('chosen_shipping_methods', array());
		$labels = array();
		$all_free = ! empty($packages);
		$result['known'] = ! empty($packages);
		$result['estimated'] = ! WC()->cart->show_shipping();
		foreach ($packages as $index => $package) {
			$rate = $package['rates'][$chosen[$index] ?? ''] ?? null;
			if (! $rate) { $result['known'] = false; $all_free = false; continue; }
			$labels[] = $rate->get_label();
			$all_free = $all_free && 'free_shipping' === $rate->get_method_id() && 0.0 === (float) $rate->get_cost();
		}
		$result['free'] = $result['known'] && $all_free;
		if ($result['known']) {
			$result['label'] = $result['free'] ? 'Ingyenes' : WC()->cart->get_cart_shipping_total();
			$result['methods'] = implode(', ', array_unique($labels));
		}
		// A single known destination permits a truthful minimum-spend progress bar.
		if (1 !== count($packages) || ! WC()->cart->show_shipping()) { return $result; }
		$package = reset($packages);
		if (empty($package['destination']['country'])) { return $result; }
		$zone = \WC_Shipping_Zones::get_zone_matching_package($package);
		foreach ($zone->get_shipping_methods(true) as $method) {
			if ('free_shipping' !== $method->id) { continue; }
			if ($method->is_available($package)) {
				// Respect rate filters too (some extensions suppress otherwise available rates).
				foreach ($package['rates'] as $rate) {
					if ('free_shipping' === $rate->get_method_id() && $rate->get_instance_id() === $method->get_instance_id()) {
						$result['progress'] = array('percent' => 100, 'remaining' => 0);
						return $result;
					}
				}
				continue;
			}
			if (! in_array($method->requires, array('min_amount', 'either'), true) || (float) $method->min_amount <= 0) { continue; }
			$total = WC()->cart->get_displayed_subtotal();
			if ('no' === $method->ignore_discounts) {
				$total -= WC()->cart->get_discount_total();
				if (WC()->cart->display_prices_including_tax()) { $total -= WC()->cart->get_discount_tax(); }
			}
			$total = round($total, wc_get_price_decimals());
			$remaining = max(0, (float) $method->min_amount - $total);
			if ($remaining > 0 && (null === $result['progress'] || $remaining < $result['progress']['remaining'])) {
				$result['progress'] = array('percent' => max(0, min(100, 100 * $total / (float) $method->min_amount)), 'remaining' => $remaining);
			}
		}
		return $result;
	}

	private static function mutation_response($message) {
		WC()->cart->calculate_totals();
		WC()->cart->set_session();
		wp_send_json_success(array('message' => $message, 'fragments' => self::fragments(array()), 'cart_hash' => WC()->cart->get_cart_hash()));
	}

	public static function clear_giftwrap() {
		if (WC()->session) { WC()->session->set('layero_giftwrap', false); }
	}

	public static function clear_empty_giftwrap($key, $cart) {
		if ($cart->is_empty()) { self::clear_giftwrap(); }
	}

	public static function giftwrap_fee($cart) {
		if ($cart->is_empty()) { self::clear_giftwrap(); return; }
		if ('RON' !== get_woocommerce_currency() || ! WC()->session || ! WC()->session->get('layero_giftwrap')) { return; }
		// Approved consumer price: 15 RON including any applicable standard VAT.
		$taxable = wc_tax_enabled() && ! WC()->customer->get_is_vat_exempt();
		$tax = $taxable ? array_sum(\WC_Tax::calc_tax(15, \WC_Tax::get_rates(''), true)) : 0;
		$cart->add_fee('Ajándékcsomagolás', 15 - $tax, $taxable, '');
	}

	public static function cart_action() {
		if ('POST' !== ($_SERVER['REQUEST_METHOD'] ?? '') || ! check_ajax_referer('layero_cart_quantity', 'nonce', false) || ! WC()->cart) {
			wp_send_json_error(array('message' => 'Lejárt a kosár munkamenete. Frissítsd az oldalt, majd próbáld újra.'), 403);
		}
		$action = isset($_POST['operation']) && is_string($_POST['operation']) ? sanitize_key($_POST['operation']) : '';
		$value = isset($_POST['value']) && is_string($_POST['value']) ? wc_clean(wp_unslash($_POST['value'])) : '';
		if ('giftwrap' === $action) {
			if ('RON' !== get_woocommerce_currency() || WC()->cart->is_empty() || ! in_array($value, array('yes', 'no'), true)) {
				wp_send_json_error(array('message' => 'Az ajándékcsomagolás most nem választható.'), 422);
			}
			WC()->session->set('layero_giftwrap', 'yes' === $value);
			self::mutation_response('yes' === $value ? 'Ajándékcsomagolást kértél a rendeléshez.' : 'Az ajándékcsomagolást eltávolítottuk.');
		}
		if ('remove' === $action) {
			if (! WC()->cart->get_cart_item($value) || ! WC()->cart->remove_cart_item($value)) {
				wp_send_json_error(array('message' => 'Ez a tétel már nincs a kosárban. Frissítsd az oldalt.'), 422);
			}
			self::mutation_response('A terméket eltávolítottuk a kosárból.');
		}
		if (! in_array($action, array('apply_coupon', 'remove_coupon'), true) || ! wc_coupons_enabled() || '' === $value || strlen($value) > 200 || WC()->cart->is_empty()) {
			wp_send_json_error(array('message' => 'Adj meg egy érvényes kuponkódot.'), 422);
		}
		$code = wc_format_coupon_code($value);
		$notices = wc_get_notices();
		wc_clear_notices();
		$success = 'apply_coupon' === $action ? WC()->cart->apply_coupon($code) : WC()->cart->remove_coupon($code);
		$errors = wc_get_notices('error');
		wc_set_notices($notices);
		if (! $success) {
			$message = $errors ? wp_strip_all_tags($errors[0]['notice']) : 'A kupon nem alkalmazható erre a kosárra.';
			wp_send_json_error(array('message' => html_entity_decode($message, ENT_QUOTES, 'UTF-8')), 422);
		}
		self::mutation_response('apply_coupon' === $action ? 'A kupont beváltottuk.' : 'A kupont eltávolítottuk.');
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
		self::mutation_response('A mennyiséget frissítettük.');
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
