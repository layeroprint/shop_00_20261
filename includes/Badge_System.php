<?php
namespace LayeroShop;
if (! defined('ABSPATH')) { exit; }

/** Product facts and approved merchant labels; no sample assignments. */
final class Badge_System {
	public static function catalog() {
		static $catalog;
		if (null === $catalog) {
			$catalog = json_decode(file_get_contents(LAYERO_SHOP_UI_PATH . 'assets/demo/layero-badges/catalog.json'), true);
		}
		return $catalog ?: array('groups' => array(), 'badges' => array());
	}

	public static function for_storefront($items) {
		$hidden = array('inStock', 'lowStock', 'soldOut', 'backInStock', 'madeToOrder', 'backorder', 'preorder', 'comingSoon', 'productionTime', 'deliveryEstimate');
		return array_values(array_filter($items, static function ($item) use ($hidden) {
			$id = is_string($item) ? $item : ($item['id'] ?? '');
			$label = is_array($item) ? (string) ($item['label'] ?? $item['value'] ?? '') : '';
			return ! in_array($id, $hidden, true) && ! preg_match('/munkanap|zile lucrătoare|készlet|raktáron|elfogyott|\bstoc\b/ui', $label);
		}));
	}

	public static function for_product($product) {
		$config = $product->get_meta('_layero_badge_config', true);
		$config = is_array($config) ? $config : array();
		if ('manual' === $product->get_meta('_layero_badge_mode', true)) { return self::for_storefront($config); }
		$items = array();
		foreach (Helpers::product_badges($product) as $badge) {
			$label = $badge['label'];
			$ids = array('Bestseller' => 'bestseller', 'Új' => 'new', 'Szezonális' => 'seasonal', 'Limitált' => 'limited');
			if ('sale' === $badge['style']) {
				$items[] = preg_match('/^-(\d+)%$/', $label, $match)
					? array('id' => 'salePercent', 'value' => (int) $match[1]) : array('id' => 'sale');
			} else {
				$items[] = isset($ids[$label]) ? array('id' => $ids[$label]) : array('id' => 'custom', 'label' => $label, 'zone' => 'overlay');
			}
		}
		if (Helpers::product_is_personalizable($product)) {
			$schema = Personalization::schema($product);
			if (! is_wp_error($schema) && (null === $schema || ! empty($schema))) {
				$items[] = array('id' => 'personal', 'label' => 'Személyre szabható');
			}
		}
		return self::for_storefront(array_merge($items, $config));
	}

	public static function admin_fields($product) {
		$catalog = self::catalog();
		$config = $product ? $product->get_meta('_layero_badge_config', true) : array();
		$selected = array();
		foreach (is_array($config) ? $config : array() as $item) { $selected[$item['id']] = $item; }
		echo '<div class="options_group layero-badge-system" style="padding:12px">';
		echo '<h4>Layero Badge System</h4><p>Csak a termékre érvényes, ellenőrzött jelöléseket válaszd. Az akció és a személyre szabás a meglévő termékadatokból is megjelenik. A készlet- és határidőjelzések a webshopban ki vannak kapcsolva.</p>';
		echo '<input type="hidden" name="_layero_badge_system_present" value="1">';
		foreach ($catalog['groups'] as $group) {
			echo '<details style="margin:8px 0"><summary style="cursor:pointer;padding:8px;font-weight:600">' . esc_html($group['label']) . '</summary><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;padding:8px">';
			foreach ($catalog['badges'] as $badge) {
				if ($badge['group'] !== $group['id']) { continue; }
				$id = $badge['id'];
				echo '<div><label style="float:none;width:auto;margin:0;display:block"><input style="float:none;margin:0 6px 0 0" type="checkbox" name="_layero_badge_system_ids[]" value="' . esc_attr($id) . '" ' . checked(isset($selected[$id]), true, false) . '> ' . esc_html($badge['labels']['hu']) . '</label>';
				if (false !== strpos($badge['labels']['hu'], '{value}')) {
					echo '<input style="width:100%;margin:6px 0" type="text" aria-label="' . esc_attr($badge['labels']['hu']) . ' értéke" name="_layero_badge_system_values[' . esc_attr($id) . ']" value="' . esc_attr($selected[$id]['value'] ?? '') . '" placeholder="Érték megadása" maxlength="48">';
				}
				echo '</div>';
			}
			echo '</div></details>';
		}
		echo '</div>';
	}

	public static function save($product) {
		// Called only within WooCommerce's authenticated, nonce-checked product save.
		if (empty($_POST['_layero_badge_system_present'])) { return; }
		$ids = isset($_POST['_layero_badge_system_ids']) ? (array) wp_unslash($_POST['_layero_badge_system_ids']) : array();
		$values = isset($_POST['_layero_badge_system_values']) ? (array) wp_unslash($_POST['_layero_badge_system_values']) : array();
		$items = array();
		foreach (self::catalog()['badges'] as $badge) {
			$id = $badge['id'];
			if (! in_array($id, $ids, true)) { continue; }
			$item = array('id' => $id);
			if (false !== strpos($badge['labels']['hu'], '{value}')) {
				$value = isset($values[$id]) && is_scalar($values[$id]) ? sanitize_text_field($values[$id]) : '';
				$valid = '' !== $value;
				if (in_array($id, array('salePercent', 'coupon'), true)) { $valid = is_numeric($value) && $value > 0 && $value <= 100; }
				if (in_array($id, array('lowStock', 'warranty', 'returns'), true)) { $valid = ctype_digit($value) && $value >= 1 && $value <= 99999; }
				if (! $valid) {
					\WC_Admin_Meta_Boxes::add_error('Hibás vagy hiányzó jelvényérték: ' . esc_html($badge['labels']['hu']) . '. A korábbi Layero jelvénybeállítás megmaradt.');
					return;
				}
				$item['value'] = $value;
			}
			$items[] = $item;
		}
		$product->update_meta_data('_layero_badge_config', $items);
	}
}
