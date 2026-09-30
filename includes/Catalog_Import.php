<?php
namespace LayeroShop;
if (! defined('ABSPATH')) { exit; }

/** Converts Product Management's versioned CSV fields before WC saves a row. */
final class Catalog_Import {
	public static function init() {
		add_filter('woocommerce_product_import_pre_insert_product_object', array(__CLASS__, 'import'), 10, 2);
	}

	public static function config($raw) {
		$items = is_string($raw) ? json_decode($raw, true) : $raw;
		if (! is_array($items) || ! array_is_list($items) || count($items) > 56) { throw new \Exception('Layero: hibás jelvénylista.'); }
		$catalog = array_column(Badge_System::catalog()['badges'], null, 'id');
		$result = array(); $seen = array();
		foreach ($items as $item) {
			if (! is_array($item) || ! isset($catalog[$item['id'] ?? '']) || isset($seen[$item['id']]) || array_diff(array_keys($item), array('id', 'value', 'startsAt', 'endsAt'))) { throw new \Exception('Layero: ismeretlen vagy ismétlődő jelvény.'); }
			$id = $item['id']; $seen[$id] = true; $clean = array('id' => $id);
			if (false !== strpos($catalog[$id]['labels']['hu'], '{value}')) {
				$value = $item['value'] ?? null;
				if (! is_scalar($value) || is_bool($value) || '' === trim((string) $value) || mb_strlen((string) $value) > 48) { throw new \Exception('Layero: hiányzó vagy túl hosszú jelvényérték.'); }
				if (in_array($id, array('salePercent', 'coupon'), true) && (! is_numeric($value) || $value <= 0 || $value > 100)) { throw new \Exception('Layero: hibás kedvezményszázalék.'); }
				if (in_array($id, array('lowStock', 'warranty', 'returns'), true) && (! is_numeric($value) || (float) (int) $value !== (float) $value || $value < 1 || $value > 99999)) { throw new \Exception('Layero: hibás darabszám vagy időtartam.'); }
				$clean['value'] = sanitize_text_field((string) $value);
			}
			foreach (array('startsAt', 'endsAt') as $key) {
				if (isset($item[$key])) {
					if (! is_string($item[$key]) || ! preg_match('/^\d{4}-\d{2}-\d{2}T/', $item[$key]) || false === strtotime($item[$key])) { throw new \Exception('Layero: hibás jelvény-időzítés.'); }
					$clean[$key] = $item[$key];
				}
			}
			if (isset($clean['startsAt'], $clean['endsAt']) && strtotime($clean['startsAt']) >= strtotime($clean['endsAt'])) { throw new \Exception('Layero: hibás jelvény-időszak.'); }
			$result[] = $clean;
		}
		$states = array('soldOut', 'comingSoon', 'preorder', 'backorder', 'madeToOrder', 'lowStock', 'backInStock', 'inStock');
		if (count(array_intersect($states, array_keys($seen))) > 1) { throw new \Exception('Layero: ellentmondó készletjelvények.'); }
		return $result;
	}

	public static function import($product, $data) {
		$incoming = array();
		foreach ($data['meta_data'] ?? array() as $meta) { $incoming[$meta['key']] = $meta['value']; }
		if (! array_key_exists('_layero_badge_config_json', $incoming)) { return $product; }
		$config = self::config($incoming['_layero_badge_config_json']);
		$mode = $incoming['_layero_badge_mode'] ?? 'auto';
		if (! in_array($mode, array('auto', 'manual'), true)) { throw new \Exception('Layero: hibás jelvénymód.'); }
		$category = $incoming['_layero_shop_category'] ?? '';
		if (! in_array($category, wp_list_pluck(Shop_Content::categories(), 'id'), true)) { throw new \Exception('Layero: ismeretlen webshop-kategória.'); }
		$fulfillment = $incoming['_layero_fulfillment_mode'] ?? 'made_to_order';
		if (! in_array($fulfillment, array('stocked', 'made_to_order'), true)) { throw new \Exception('Layero: hibás teljesítési mód.'); }
		if (in_array('returns', array_column($config, 'id'), true) && ($product->get_meta('_layero_non_returnable') || 'yes' === $product->get_meta('_layero_personalizable'))) { throw new \Exception('Layero: nem visszaküldhető terméken visszaküldési jelvény szerepel.'); }
		if (array_key_exists('_layero_personalization_fields', $incoming) && is_wp_error(Personalization::schema($product))) { throw new \Exception('Layero: hibás személyre szabási mezők.'); }
		$product->update_meta_data('_layero_badge_config', $config);
		$product->update_meta_data('_layero_badge_mode', $mode);
		$product->update_meta_data('_layero_shop_category', $category);
		$product->update_meta_data('_layero_fulfillment_mode', $fulfillment);
		$product->update_meta_data('_layero_badge_keys', array());
		$product->update_meta_data('_layero_product_badges', '');
		$product->delete_meta_data('_layero_badge_config_json');
		return $product;
	}
}
