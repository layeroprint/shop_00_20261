<?php
namespace LayeroShop;
if (! defined('ABSPATH')) { exit; }

final class Personalization {
	/** Null means legacy fields; [] deliberately means no fields. */
	public static function schema($product) {
		if (! $product) { return null; }
		$raw = $product->get_meta('_layero_personalization_fields', true);
		if ('' === $raw && $product->get_parent_id()) { return self::schema(wc_get_product($product->get_parent_id())); }
		if ('' === $raw) { return null; }
		$fields = is_string($raw) ? json_decode($raw, true) : $raw;
		if (! is_array($fields) || count($fields) > 20) { return new \WP_Error('schema', __('A termék személyre szabási beállítása hibás. Kérjük, jelezd nekünk.', 'layero-shop-ui')); }
		$result = array();
		foreach (array_values($fields) as $i => $field) {
			if (! is_array($field)) { return new \WP_Error('schema', 'Érvénytelen személyre szabási mező.'); }
			$type = $field['type'] ?? $field['field_type'] ?? 'text';
			$label = $field['label'] ?? $field['field_label'] ?? '';
			if (! is_string($label) || '' === trim($label) || ! in_array($type, array('text', 'textarea', 'select', 'number', 'checkbox'), true)) {
				return new \WP_Error('schema', 'Érvénytelen személyre szabási mező.');
			}
			$options = $field['options'] ?? array();
			if (is_string($options)) { $options = json_decode($options, true); }
			if (! is_array($options) || count(array_filter($options, 'is_string')) !== count($options) || ('select' === $type && empty($options))) {
				return new \WP_Error('schema', 'Érvénytelen személyre szabási választék.');
			}
			$key = isset($field['id']) && is_scalar($field['id']) ? sanitize_key((string) $field['id']) : 'field_' . $i;
			if ('' === $key || isset($result[$key])) { return new \WP_Error('schema', 'Ismétlődő személyre szabási azonosító.'); }
			$result[$key] = array('label' => sanitize_text_field($label), 'type' => $type,
				'required' => ! empty($field['required']), 'options' => array_map('sanitize_text_field', $options),
				'placeholder' => is_string($field['placeholder'] ?? '') ? sanitize_text_field($field['placeholder'] ?? '') : '',
				'maxlength' => min(1000, max(1, (int) ($field['maxlength'] ?? ('textarea' === $type ? 1000 : 100)))));
		}
		return $result;
	}

	public static function values($schema, $input) {
		if (is_wp_error($schema)) { return $schema; }
		if (! is_array($input) || array_diff(array_keys($input), array_keys($schema))) { return new \WP_Error('fields', 'Ismeretlen személyre szabási adat.'); }
		$data = array();
		foreach ($schema as $key => $field) {
			$raw = $input[$key] ?? '';
			if (! is_string($raw)) { return new \WP_Error('fields', 'Hibás személyre szabási adat.'); }
			$value = 'textarea' === $field['type'] ? sanitize_textarea_field(wp_unslash($raw)) : sanitize_text_field(wp_unslash($raw));
			$length = function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : preg_match_all('/./us', $value);
			$valid = (! $field['required'] || '' !== $value) && false !== $length && $length <= $field['maxlength'];
			if ('select' === $field['type'] && '' !== $value) { $valid = $valid && in_array($value, $field['options'], true); }
			if ('number' === $field['type'] && '' !== $value) { $valid = $valid && (bool) preg_match('/^-?\d+(?:[.,]\d+)?$/D', $value); }
			if ('checkbox' === $field['type'] && '' !== $value) { $valid = $valid && '1' === $value; }
			if (! $valid) { return new \WP_Error('fields', sprintf(__('Ellenőrizd ezt a mezőt: %s', 'layero-shop-ui'), $field['label'])); }
			if ('' !== $value) { $data[$key] = array('label' => $field['label'], 'value' => 'checkbox' === $field['type'] ? __('Igen', 'layero-shop-ui') : $value); }
		}
		return array('fields' => $data);
	}

	public static function render($schema) {
		if (is_wp_error($schema)) { echo '<p role="alert">' . esc_html($schema->get_error_message()) . '</p>'; return; }
		echo '<div class="lyr-personalization">';
		foreach ($schema as $key => $field) {
			$id = 'layero_field_' . $key;
			$name = 'layero_fields[' . $key . ']';
			echo '<label for="' . esc_attr($id) . '">' . esc_html($field['label']) . ($field['required'] ? ' *' : '') . '</label>';
			$attrs = ' id="' . esc_attr($id) . '" name="' . esc_attr($name) . '"' . ($field['required'] ? ' required' : '');
			$attrs .= ' maxlength="' . esc_attr($field['maxlength']) . '" placeholder="' . esc_attr($field['placeholder']) . '"';
			if ('select' === $field['type']) {
				echo '<select' . $attrs . '><option value="">' . esc_html__('Válassz…', 'layero-shop-ui') . '</option>';
				foreach ($field['options'] as $option) { echo '<option value="' . esc_attr($option) . '">' . esc_html($option) . '</option>'; }
				echo '</select>';
			} elseif ('textarea' === $field['type']) {
				echo '<textarea rows="3"' . $attrs . '></textarea>';
			} else {
				echo '<input type="' . ('checkbox' === $field['type'] ? 'checkbox' : 'text') . '"' . $attrs . ('checkbox' === $field['type'] ? ' value="1"' : '') . ('number' === $field['type'] ? ' inputmode="decimal"' : '') . '>';
			}
		}
		echo '</div>';
	}
}
