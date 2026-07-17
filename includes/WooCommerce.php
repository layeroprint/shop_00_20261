<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class WooCommerce {
	private static $instance = null;

	public static function instance() {
		if (null === self::$instance) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action('woocommerce_product_options_general_product_data', array($this, 'render_product_badge_fields'));
		add_action('woocommerce_admin_process_product_object', array($this, 'save_product_badge_fields'));
		add_action('woocommerce_before_add_to_cart_button', array($this, 'render_personalization_fields'));
		add_filter('woocommerce_add_cart_item_data', array($this, 'add_cart_item_data'), 10, 3);
		add_filter('woocommerce_get_item_data', array($this, 'display_cart_item_data'), 10, 2);
		add_action('woocommerce_checkout_create_order_line_item', array($this, 'add_order_item_meta'), 10, 4);
		add_action('rest_api_init', array($this, 'register_analytics_routes'));
		add_shortcode('layero_mini_cart', array($this, 'mini_cart_shortcode'));
	}

	public function render_product_badge_fields() {
		if (! function_exists('woocommerce_wp_text_input') || ! function_exists('woocommerce_wp_textarea_input')) {
			return;
		}

		echo '<div class="options_group layero-product-badges">';
		woocommerce_wp_text_input(
			array(
				'id' => '_layero_card_type_label',
				'label' => __('Layero kártya típus', 'layero-shop-ui'),
				'description' => __('Ez jelenik meg a termékkártyán a WooCommerce kategória helyett. Példa: Tematikus lámpák, Céges megoldások, Dekorációk.', 'layero-shop-ui'),
				'desc_tip' => true,
			)
		);
		woocommerce_wp_textarea_input(
			array(
				'id' => '_layero_product_badges',
				'label' => __('Layero kártya címkék', 'layero-shop-ui'),
				'description' => __('Egy címke soronként. Formátum: Szöveg|stílus. Példa: Bestseller|best, B2B kedvenc|dark, Új|new, Egyedi|info. Stílusok: best, new, sale, dark, accent, gold, eco, coral, info.', 'layero-shop-ui'),
				'desc_tip' => false,
				'rows' => 4,
			)
		);
		echo '</div>';
	}

	public function save_product_badge_fields($product) {
		if (! $product || ! is_a($product, 'WC_Product')) {
			return;
		}

		$type_label = isset($_POST['_layero_card_type_label']) ? sanitize_text_field(wp_unslash($_POST['_layero_card_type_label'])) : '';
		$badges = isset($_POST['_layero_product_badges']) ? sanitize_textarea_field(wp_unslash($_POST['_layero_product_badges'])) : '';

		$product->update_meta_data('_layero_card_type_label', $type_label);
		$product->update_meta_data('_layero_product_badges', $badges);
	}

	public function render_personalization_fields() {
		if (! apply_filters('layero_shop_ui_show_personalization_fields', true, get_the_ID())) {
			return;
		}
		?>
		<div class="lyr-personalization" data-layero-personalization>
			<label for="layero_personalization_text"><?php echo esc_html__('Felirat / név', 'layero-shop-ui'); ?></label>
			<input id="layero_personalization_text" name="layero_personalization_text" type="text" maxlength="40" placeholder="<?php echo esc_attr__('pl. Olivér', 'layero-shop-ui'); ?>">
			<div class="lyr-personalization__row">
				<label for="layero_personalization_size"><?php echo esc_html__('Méret', 'layero-shop-ui'); ?></label>
				<select id="layero_personalization_size" name="layero_personalization_size">
					<option value="Közepes"><?php echo esc_html__('Közepes', 'layero-shop-ui'); ?></option>
					<option value="Kicsi"><?php echo esc_html__('Kicsi', 'layero-shop-ui'); ?></option>
					<option value="Nagy"><?php echo esc_html__('Nagy', 'layero-shop-ui'); ?></option>
				</select>
				<label for="layero_personalization_color"><?php echo esc_html__('Szín', 'layero-shop-ui'); ?></label>
				<select id="layero_personalization_color" name="layero_personalization_color">
					<option value="Natúr"><?php echo esc_html__('Natúr', 'layero-shop-ui'); ?></option>
					<option value="Fekete"><?php echo esc_html__('Fekete', 'layero-shop-ui'); ?></option>
					<option value="Fehér"><?php echo esc_html__('Fehér', 'layero-shop-ui'); ?></option>
				</select>
			</div>
			<label for="layero_personalization_note"><?php echo esc_html__('Egyedi megjegyzés', 'layero-shop-ui'); ?></label>
			<textarea id="layero_personalization_note" name="layero_personalization_note" rows="3" placeholder="<?php echo esc_attr__('Színek, alkalom, referencia vagy extra kérés...', 'layero-shop-ui'); ?>"></textarea>
			<p><?php echo esc_html__('Ez csak illusztráció - a pontos elhelyezést a tervezéskor egyeztetjük.', 'layero-shop-ui'); ?></p>
		</div>
		<?php
	}

	public function add_cart_item_data($cart_item_data, $product_id, $variation_id) {
		$text = isset($_POST['layero_personalization_text']) ? sanitize_text_field(wp_unslash($_POST['layero_personalization_text'])) : '';
		$size = isset($_POST['layero_personalization_size']) ? sanitize_text_field(wp_unslash($_POST['layero_personalization_size'])) : '';
		$color = isset($_POST['layero_personalization_color']) ? sanitize_text_field(wp_unslash($_POST['layero_personalization_color'])) : '';
		$note = isset($_POST['layero_personalization_note']) ? sanitize_textarea_field(wp_unslash($_POST['layero_personalization_note'])) : '';

		if ($text || $size || $color || $note) {
			$cart_item_data['layero_personalization'] = array(
				'text' => $text,
				'size' => $size,
				'color' => $color,
				'note' => $note,
			);
			$cart_item_data['layero_unique_key'] = md5($product_id . '|' . $variation_id . '|' . $text . '|' . $size . '|' . $color . '|' . $note);
		}

		return $cart_item_data;
	}

	public function display_cart_item_data($item_data, $cart_item) {
		if (empty($cart_item['layero_personalization'])) {
			return $item_data;
		}

		$data = $cart_item['layero_personalization'];
		if (! empty($data['text'])) {
			$item_data[] = array(
				'name' => __('Felirat / név', 'layero-shop-ui'),
				'value' => esc_html($data['text']),
			);
		}
		if (! empty($data['size'])) {
			$item_data[] = array(
				'name' => __('Méret', 'layero-shop-ui'),
				'value' => esc_html($data['size']),
			);
		}
		if (! empty($data['color'])) {
			$item_data[] = array(
				'name' => __('Szín', 'layero-shop-ui'),
				'value' => esc_html($data['color']),
			);
		}
		if (! empty($data['note'])) {
			$item_data[] = array(
				'name' => __('Egyedi megjegyzés', 'layero-shop-ui'),
				'value' => esc_html($data['note']),
			);
		}

		return $item_data;
	}

	public function add_order_item_meta($item, $cart_item_key, $values, $order) {
		$product = isset($values['data']) && is_a($values['data'], 'WC_Product') ? $values['data'] : null;
		if ($product) {
			$unit_cost = (float) $product->get_meta('_layero_cost_price', true);
			if ($unit_cost > 0) {
				$item->add_meta_data('_layero_cost_at_sale', $unit_cost, true);
			}
		}
		if (empty($values['layero_personalization'])) {
			return;
		}

		$data = $values['layero_personalization'];
		if (! empty($data['text'])) {
			$item->add_meta_data(__('Felirat / név', 'layero-shop-ui'), $data['text'], true);
		}
		if (! empty($data['size'])) {
			$item->add_meta_data(__('Méret', 'layero-shop-ui'), $data['size'], true);
		}
		if (! empty($data['color'])) {
			$item->add_meta_data(__('Szín', 'layero-shop-ui'), $data['color'], true);
		}
		if (! empty($data['note'])) {
			$item->add_meta_data(__('Egyedi megjegyzés', 'layero-shop-ui'), $data['note'], true);
		}
	}

	public function register_analytics_routes() {
		register_rest_route(
			'layero/v1',
			'/product-analytics',
			array(
				'methods' => 'GET',
				'callback' => array($this, 'get_product_analytics'),
				'permission_callback' => array($this, 'analytics_permission'),
				'args' => array(
					'after' => array('sanitize_callback' => 'sanitize_text_field'),
					'before' => array('sanitize_callback' => 'sanitize_text_field'),
				),
			)
		);
	}

	public function analytics_permission() {
		return current_user_can('manage_woocommerce');
	}

	private function analytics_order_args($request) {
		$after = $request->get_param('after');
		$before = $request->get_param('before');
		$args = array(
			'limit' => -1,
			'return' => 'objects',
			'status' => array('wc-pending', 'wc-on-hold', 'wc-processing', 'wc-completed', 'wc-cancelled', 'wc-refunded', 'wc-failed'),
		);
		if ($after || $before) {
			$args['date_created'] = ($after ? $after : '1970-01-01') . '...' . ($before ? $before : gmdate('Y-m-d H:i:s'));
		}
		return $args;
	}

	public function get_product_analytics($request) {
		if (! function_exists('wc_get_orders')) {
			return new \WP_Error('woocommerce_unavailable', __('A WooCommerce nem érhető el.', 'layero-shop-ui'), array('status' => 503));
		}

		$orders = array();
		$daily = array();
		foreach (wc_get_orders($this->analytics_order_args($request)) as $order) {
			$status = $order->get_status();
			$ordered_at = $order->get_date_created();
			$updated_at = $order->get_date_modified();
			$order_items = array();
			foreach ($order->get_items('line_item') as $item_id => $item) {
				$product = $item->get_product();
				if (! $product) {
					continue;
				}
				$quantity = (int) $item->get_quantity();
				$refund = abs((float) $order->get_total_refunded_for_item($item_id));
				$actual_cost = (float) $item->get_meta('_wc_cog_item_total_cost', true);
				$estimated_unit = (float) $item->get_meta('_layero_cost_at_sale', true);
				$row = array(
					'product_id' => $item->get_product_id(),
					'variation_id' => $item->get_variation_id() ?: null,
					'sku' => $product->get_sku(),
					'quantity' => $quantity,
					'returned_quantity' => $refund > 0 ? min($quantity, max(1, (int) round($quantity * $refund / max(0.01, (float) $item->get_total())))) : 0,
					'net_revenue' => (float) $item->get_total(),
					'discount' => max(0, (float) $item->get_subtotal() - (float) $item->get_total()),
					'refund' => $refund,
				);
				if ($actual_cost > 0) {
					$row['cost_actual'] = $actual_cost;
				} elseif ($estimated_unit > 0) {
					$row['cost_estimated'] = $estimated_unit;
				}
				$order_items[] = $row;

				$date = $ordered_at ? $ordered_at->date('Y-m-d') : gmdate('Y-m-d');
				$key = $date . ':' . $item->get_product_id();
				if (! isset($daily[$key])) {
					$daily[$key] = array('date' => $date, 'product_id' => $item->get_product_id(), 'orders' => 0, 'units' => 0, 'net_revenue' => 0, 'refunds' => 0);
				}
				$daily[$key]['orders']++;
				$daily[$key]['units'] += $quantity;
				$daily[$key]['net_revenue'] += (float) $item->get_total();
				$daily[$key]['refunds'] += $refund;
			}
			$orders[] = array(
				'external_order_id' => (string) $order->get_id(),
				'channel' => 'woocommerce',
				'status' => $status,
				'currency' => $order->get_currency(),
				'ordered_at' => $ordered_at ? $ordered_at->date(DATE_ATOM) : gmdate(DATE_ATOM),
				'source_updated_at' => $updated_at ? $updated_at->date(DATE_ATOM) : null,
				'items' => $order_items,
			);
		}

		return rest_ensure_response(array(
			'privacy' => 'business_data_only',
			'orders' => $orders,
			'daily' => array_values($daily),
			'generated_at' => gmdate(DATE_ATOM),
		));
	}

	public function mini_cart_shortcode() {
		if (! function_exists('woocommerce_mini_cart')) {
			return '';
		}

		ob_start();
		?>
		<div class="lyr-mini-cart">
			<button class="lyr-mini-cart__toggle" type="button" data-layero-cart-toggle aria-expanded="false">
				<?php echo Helpers::icon('cart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<span><?php echo esc_html__('Kosár', 'layero-shop-ui'); ?></span>
				<b><?php echo esc_html(WC()->cart ? WC()->cart->get_cart_contents_count() : 0); ?></b>
			</button>
			<div class="lyr-mini-cart__panel" data-layero-cart-panel hidden>
				<?php woocommerce_mini_cart(); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
