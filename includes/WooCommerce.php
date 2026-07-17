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
		add_filter('woocommerce_product_data_tabs', array($this, 'add_product_visual_tab'));
		add_action('woocommerce_product_data_panels', array($this, 'render_product_visual_panel'));
		add_action('woocommerce_admin_process_product_object', array($this, 'save_product_visual_fields'));
		add_action('woocommerce_before_add_to_cart_button', array($this, 'render_personalization_fields'));
		add_filter('woocommerce_add_cart_item_data', array($this, 'add_cart_item_data'), 10, 3);
		add_filter('woocommerce_get_item_data', array($this, 'display_cart_item_data'), 10, 2);
		add_action('woocommerce_checkout_create_order_line_item', array($this, 'add_order_item_meta'), 10, 4);
		add_shortcode('layero_mini_cart', array($this, 'mini_cart_shortcode'));
	}

	public function add_product_visual_tab($tabs) {
		$tabs['layero_visual'] = array(
			'label' => __('Layero megjelenés', 'layero-shop-ui'),
			'target' => 'layero_product_visual_data',
			'class' => array('show_if_simple', 'show_if_variable', 'show_if_grouped', 'show_if_external'),
			'priority' => 72,
		);

		return $tabs;
	}

	public function render_product_visual_panel() {
		if (! function_exists('woocommerce_wp_select') || ! function_exists('woocommerce_wp_text_input') || ! function_exists('woocommerce_wp_textarea_input')) {
			return;
		}

		global $post, $product_object;
		$product = $product_object;
		if (! $product && ! empty($post->ID) && function_exists('wc_get_product')) {
			$product = wc_get_product($post->ID);
		}

		$product_type = $product ? (string) $product->get_meta('_layero_product_type', true) : '';
		$badge_keys = $product ? Helpers::product_badge_keys($product) : array();
		$personalizable = $product ? (string) $product->get_meta('_layero_personalizable', true) : '';
		$lead_time = $product ? (string) $product->get_meta('_layero_lead_time', true) : '';

		echo '<div id="layero_product_visual_data" class="panel woocommerce_options_panel hidden layero-product-visual-panel">';
		echo '<input type="hidden" name="_layero_visual_fields_present" value="1">';
		echo '<div class="options_group">';
		echo '<p class="form-field layero-product-visual-intro"><strong>' . esc_html__('A termékkártya vizuális adatai', 'layero-shop-ui') . '</strong><span>' . esc_html__('Az itt beállított címkék és tulajdonságok automatikusan megjelennek a Layero Elementor termék-widgetjeiben.', 'layero-shop-ui') . '</span></p>';

		$type_options = array('' => __('Automatikus – WooCommerce kategória alapján', 'layero-shop-ui'));
		foreach (Helpers::product_type_definitions() as $key => $definition) {
			$type_options[$key] = $definition['label'];
		}
		$type_options['custom'] = __('Egyedi megnevezés', 'layero-shop-ui');
		woocommerce_wp_select(
			array(
				'id' => '_layero_product_type',
				'label' => __('Terméktípus', 'layero-shop-ui'),
				'value' => $product_type,
				'options' => $type_options,
				'description' => __('A kártyán a terméknév felett jelenik meg. Automatikus módban a termékkategóriából számítjuk.', 'layero-shop-ui'),
				'desc_tip' => true,
			)
		);
		woocommerce_wp_text_input(
			array(
				'id' => '_layero_card_type_label',
				'label' => __('Egyedi típusfelirat', 'layero-shop-ui'),
				'description' => __('Akkor használd, ha a Terméktípus mezőben az „Egyedi megnevezés” opciót választottad. A korábbi Layero típusfeliratok is megmaradnak.', 'layero-shop-ui'),
				'desc_tip' => true,
			)
		);
		echo '</div>';

		echo '<div class="options_group layero-product-badges">';
		echo '<p class="form-field layero-badge-picker"><label>' . esc_html__('Vizuális címkék', 'layero-shop-ui') . '</label><span class="layero-badge-picker__content">';
		foreach (Helpers::badge_definitions() as $key => $definition) {
			$checked = in_array($key, $badge_keys, true);
			echo '<label class="layero-badge-option layero-badge-option--' . esc_attr($definition['style']) . '">';
			echo '<input type="checkbox" name="_layero_badge_keys[]" value="' . esc_attr($key) . '" ' . checked($checked, true, false) . '>';
			echo '<span>' . esc_html($definition['label']) . '</span><small>' . esc_html($definition['description']) . '</small>';
			echo '</label>';
		}
		echo '<em>' . esc_html__('Legfeljebb 5 címke látszik. Az akciós százalékot a WooCommerce normál és akciós árából automatikusan számítjuk, ezért azt itt nem kell felvenned.', 'layero-shop-ui') . '</em>';
		echo '</span></p>';
		woocommerce_wp_textarea_input(
			array(
				'id' => '_layero_product_badges',
				'label' => __('Extra címkék (haladó)', 'layero-shop-ui'),
				'description' => __('Opcionális egyedi címkék, soronként egy. Formátum: Szöveg|stílus. Példa: Csak ma|coral. A régi címkék kompatibilitás miatt itt továbbra is működnek.', 'layero-shop-ui'),
				'desc_tip' => false,
				'rows' => 3,
			)
		);
		echo '</div>';

		echo '<div class="options_group">';
		woocommerce_wp_select(
			array(
				'id' => '_layero_personalizable',
				'label' => __('Személyre szabható', 'layero-shop-ui'),
				'value' => $personalizable,
				'options' => array(
					'' => __('Automatikus – terméktípus alapján', 'layero-shop-ui'),
					'yes' => __('Igen – címke és mezők megjelenítése', 'layero-shop-ui'),
					'no' => __('Nem – ne jelenjen meg', 'layero-shop-ui'),
				),
				'description' => __('Igen esetén a „Névre szabható” jelölés és a személyre szabási mezők is megjelennek.', 'layero-shop-ui'),
				'desc_tip' => true,
			)
		);

		$lead_options = array('' => __('Automatikus – terméktípus alapján', 'layero-shop-ui')) + Helpers::lead_time_options();
		woocommerce_wp_select(
			array(
				'id' => '_layero_lead_time',
				'label' => __('Gyártási idő', 'layero-shop-ui'),
				'value' => $lead_time,
				'options' => $lead_options,
				'description' => __('A termékkártyán kis információs címkeként jelenik meg.', 'layero-shop-ui'),
				'desc_tip' => true,
			)
		);
		woocommerce_wp_text_input(
			array(
				'id' => '_layero_lead_time_custom',
				'label' => __('Egyedi gyártási idő', 'layero-shop-ui'),
				'placeholder' => __('pl. 2–4 munkanap', 'layero-shop-ui'),
				'description' => __('Akkor érvényes, ha a Gyártási idő mezőben az „Egyedi szöveg” opciót választod.', 'layero-shop-ui'),
				'desc_tip' => true,
			)
		);
		echo '</div>';

		echo '<style>
			#woocommerce-product-data ul.wc-tabs li.layero_visual_options a::before{content:"\\f177"}
			.layero-product-visual-intro{display:flex;flex-direction:column;gap:5px;padding-top:4px!important}.layero-product-visual-intro span{color:#646970;max-width:720px}
			.layero-badge-picker__content{display:grid!important;grid-template-columns:repeat(2,minmax(180px,1fr));gap:8px;max-width:680px}
			.layero-badge-option{display:grid;grid-template-columns:20px 1fr;column-gap:8px;align-items:center;margin:0;padding:10px 12px;border:1px solid #dcdcde;border-radius:8px;background:#fff}
			.layero-badge-option input{grid-row:1 / span 2;margin:0}.layero-badge-option span{font-weight:700}.layero-badge-option small{color:#646970}.layero-badge-picker__content em{grid-column:1/-1;color:#646970;font-style:normal;font-size:12px;line-height:1.5}
			@media(max-width:782px){.layero-badge-picker__content{grid-template-columns:1fr}.layero-badge-picker__content em{grid-column:auto}}
		</style>';
		echo '</div>';
	}

	public function save_product_visual_fields($product) {
		if (! $product || ! is_a($product, 'WC_Product')) {
			return;
		}
		if (empty($_POST['_layero_visual_fields_present'])) {
			return;
		}

		$type = isset($_POST['_layero_product_type']) ? sanitize_key(wp_unslash($_POST['_layero_product_type'])) : '';
		$allowed_types = array_merge(array_keys(Helpers::product_type_definitions()), array('custom'));
		$type = in_array($type, $allowed_types, true) ? $type : '';
		$type_label = isset($_POST['_layero_card_type_label']) ? sanitize_text_field(wp_unslash($_POST['_layero_card_type_label'])) : '';
		$badges = isset($_POST['_layero_product_badges']) ? sanitize_textarea_field(wp_unslash($_POST['_layero_product_badges'])) : '';
		$badge_keys = isset($_POST['_layero_badge_keys']) ? array_map('sanitize_key', (array) wp_unslash($_POST['_layero_badge_keys'])) : array();
		$badge_keys = array_values(array_intersect(array_unique($badge_keys), array_keys(Helpers::badge_definitions())));
		$personalizable = isset($_POST['_layero_personalizable']) ? sanitize_key(wp_unslash($_POST['_layero_personalizable'])) : '';
		$personalizable = in_array($personalizable, array('yes', 'no'), true) ? $personalizable : '';
		$lead_time = isset($_POST['_layero_lead_time']) ? sanitize_key(wp_unslash($_POST['_layero_lead_time'])) : '';
		$lead_time = array_key_exists($lead_time, Helpers::lead_time_options()) ? $lead_time : '';
		$lead_time_custom = isset($_POST['_layero_lead_time_custom']) ? sanitize_text_field(wp_unslash($_POST['_layero_lead_time_custom'])) : '';

		$product->update_meta_data('_layero_product_type', $type);
		$product->update_meta_data('_layero_card_type_label', $type_label);
		$product->update_meta_data('_layero_badge_keys', $badge_keys);
		$product->update_meta_data('_layero_product_badges', $badges);
		$product->update_meta_data('_layero_personalizable', $personalizable);
		$product->update_meta_data('_layero_lead_time', $lead_time);
		$product->update_meta_data('_layero_lead_time_custom', $lead_time_custom);
	}

	public function render_personalization_fields() {
		global $product;
		$current_product = $product;
		if (! $current_product && function_exists('wc_get_product')) {
			$current_product = wc_get_product(get_the_ID());
		}
		$show_fields = Helpers::product_is_personalizable($current_product);

		if (! apply_filters('layero_shop_ui_show_personalization_fields', $show_fields, get_the_ID(), $current_product)) {
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
		if (function_exists('wc_get_product') && ! Helpers::product_is_personalizable(wc_get_product($product_id))) {
			return $cart_item_data;
		}

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
