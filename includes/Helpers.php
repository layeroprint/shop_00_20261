<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class Helpers {
	public static function is_woo_active() {
		return class_exists('WooCommerce') && function_exists('wc_get_products');
	}

	public static function products_url($category = '', $args = array()) {
		$query = array();

		if ('' !== $category) {
			$query['cat'] = sanitize_title($category);
		}

		foreach ((array) $args as $key => $value) {
			if ('' !== $value && null !== $value) {
				$query[sanitize_key($key)] = sanitize_text_field((string) $value);
			}
		}

		return ! empty($query) ? add_query_arg($query, home_url('/termekek/')) : home_url('/termekek/');
	}

	public static function product_url($product_id = '', $args = array()) {
		$query = array();

		if ('' !== $product_id) {
			$query['id'] = sanitize_title($product_id);
		}

		foreach ((array) $args as $key => $value) {
			if ('' !== $value && null !== $value) {
				$query[sanitize_key($key)] = sanitize_text_field((string) $value);
			}
		}

		return ! empty($query) ? add_query_arg($query, home_url('/termek/')) : home_url('/termek/');
	}

	public static function normalize_shop_url($url) {
		if (! is_string($url)) {
			return $url;
		}

		$url = trim($url);
		if ('' === $url || '#' === $url[0] || preg_match('#^(mailto|tel|sms|javascript):#i', $url)) {
			return $url;
		}

		$decoded = html_entity_decode($url, ENT_QUOTES, get_bloginfo('charset') ?: 'UTF-8');
		$home_host = wp_parse_url(home_url(), PHP_URL_HOST);
		$url_host = wp_parse_url($decoded, PHP_URL_HOST);

		if ($url_host && $home_host && 0 !== strcasecmp($url_host, $home_host)) {
			return $url;
		}

		$path = (string) wp_parse_url($decoded, PHP_URL_PATH);
		$query = (string) wp_parse_url($decoded, PHP_URL_QUERY);
		$query_args = array();
		if ('' !== $query) {
			parse_str($query, $query_args);
		}

		$route = trim($path, '/');
		$route = '' === $route ? trim($decoded, '/') : $route;
		$route = preg_replace('#/+#', '/', $route);
		$route_lc = strtolower($route);

		if ('shop' === $route_lc || 'shop/' === $route_lc || 'kategoria.html' === $route_lc || 'termekek' === $route_lc) {
			$category = isset($query_args['cat']) ? sanitize_title($query_args['cat']) : '';
			unset($query_args['cat']);

			return self::products_url($category, $query_args);
		}

		if (preg_match('#^product-category/([^/]+)/?$#i', $route, $matches)) {
			return self::products_url($matches[1], $query_args);
		}

		if ('termek.html' === $route_lc || 'termek' === $route_lc) {
			$product_id = isset($query_args['id']) ? sanitize_title($query_args['id']) : '';
			unset($query_args['id']);

			return self::product_url($product_id, $query_args);
		}

		if (preg_match('#^product/([^/]+)/?$#i', $route, $matches)) {
			return self::product_url($matches[1], $query_args);
		}

		$page_map = array(
			'index.html' => '/',
			'rolunk.html' => '/rolunk/',
			'gyik.html' => '/gyik/',
			'kapcsolat.html' => '/kapcsolat/',
			'kviz.html' => '/kviz/',
			'kosar.html' => '/kosar/',
			'penztar.html' => '/penztar/',
			'fiok.html' => '/fiok/',
			'kedvencek.html' => '/kedvencek/',
			'404.html' => '/404/',
			'aszf.html' => '/aszf/',
			'adatvedelem.html' => '/adatvedelem/',
		);

		if (isset($page_map[$route_lc])) {
			return ! empty($query_args) ? add_query_arg($query_args, home_url($page_map[$route_lc])) : home_url($page_map[$route_lc]);
		}

		return $url;
	}

	public static function icon($name) {
		$icons = array(
			'cart' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1.3 10.5a1.5 1.5 0 0 1-1.5 1.7H6.2a1.5 1.5 0 0 1-1.5-1.7L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>',
			'truck' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h8A1.5 1.5 0 0 1 14 6.5V16H3V6.5Z"/><path d="M14 9h3.6a1.5 1.5 0 0 1 1.3.8L21 13.5V16h-7V9Z"/><circle cx="6.5" cy="18" r="1.9"/><circle cx="17.5" cy="18" r="1.9"/></svg>',
			'shield' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
			'bolt' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>',
			'leaf' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20.5A7.5 7.5 0 0 1 3.5 13C3.5 7.5 8 3.5 20.5 3.5c0 8.5-4.5 12.5-9.5 12.5Z"/><path d="M3.5 20.5c3-4.5 6.5-7 11-8"/></svg>',
			'tag' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.6 12.4 11 5a1.8 1.8 0 0 1 1.3-.5H18a1.5 1.5 0 0 1 1.5 1.5v5.7a1.8 1.8 0 0 1-.5 1.3l-7.4 7.4a1.8 1.8 0 0 1-2.5 0l-5-5a1.8 1.8 0 0 1 0-2.5Z"/><circle cx="15.3" cy="8.7" r="1.15" fill="currentColor" stroke="none"/></svg>',
			'question' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9.5"/></svg>',
			'crown' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5 7 11l5-6 5 6 3.5-2.5-1.6 9a1.5 1.5 0 0 1-1.48 1.24H6.58A1.5 1.5 0 0 1 5.1 17.5L3.5 8.5Z"/><path d="m9.5 14.5 1.8 1.8 3.2-3.6"/></svg>',
			'clock' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7v6h6"/><path d="M3.5 13a9 9 0 1 0 2.2-8.3L3 7"/><path d="M12 8.5V12l2.5 2"/></svg>',
			'headset' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v3.5A1.5 1.5 0 0 0 5.5 18H7v-6H5.5A1.5 1.5 0 0 0 4 13.5"/><path d="M20 13v3.5a1.5 1.5 0 0 1-1.5 1.5H17v-6h1.5a1.5 1.5 0 0 1 1.5 1.5"/><path d="M18 18v1a2 2 0 0 1-2 2h-3"/></svg>',
			'check' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
			'mail' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 6.5h15v11h-15z"/><path d="m5 7 7 6 7-6"/></svg>',
			'spark' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="M19 15l.8 2.8L22.5 19l-2.7.8L19 22.5l-.8-2.7-2.7-.8 2.7-.8L19 15Z"/></svg>',
			'heart' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.6-9.3-9.2A5.2 5.2 0 0 1 12 6.1a5.2 5.2 0 0 1 9.3 4.7C19 15.4 12 20 12 20Z"/></svg>',
			'user' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
			'package' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 7 8-4 8 4v10l-8 4-8-4Z"/><path d="m4 7 8 4 8-4M12 11v10M8 5l8 4"/></svg>',
			'wallet' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 17.5Z"/><path d="M4 7h16M15 12h5v4h-5a2 2 0 0 1 0-4Z"/></svg>',
			'download' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14"/></svg>',
			'logout' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4H5v16h5M14 8l4 4-4 4m-7-4h11"/></svg>',
			'pin' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
			'smile' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M9 10h.01M15 10h.01"/><path d="M8.8 14.2a4.2 4.2 0 0 0 6.4 0"/></svg>',
			'star' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3.6 2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8Z"/></svg>',
			'bulb' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0-3.4 10.9c.6.5 1 1.2 1 2V17h4.8v-1.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z"/><path d="M10 20.5h4"/></svg>',
			'home' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 11 8-7 8 7"/><path d="M6 9.5V20h12V9.5"/></svg>',
			'gift' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11"/><path d="M12 9c-4.5 0-5-2.5-4-3.8C9 4 11 4.5 12 9Zm0 0c4.5 0 5-2.5 4-3.8C15 4 13 4.5 12 9Z"/></svg>',
			'briefcase' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="7.5" width="17" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3.5 12.5h17"/></svg>',
		);

		return isset($icons[$name]) ? $icons[$name] : $icons['spark'];
	}

	public static function query_products($settings = array()) {
		if (! self::is_woo_active()) {
			return array();
		}

		$limit = isset($settings['limit']) ? absint($settings['limit']) : 8;
		$args = array(
			'limit' => $limit ? $limit : 8,
			'status' => 'publish',
			'orderby' => isset($settings['orderby']) ? sanitize_key($settings['orderby']) : 'date',
			'order' => isset($settings['order']) ? sanitize_key($settings['order']) : 'DESC',
		);

		if (! empty($settings['category'])) {
			$args['category'] = array(sanitize_title($settings['category']));
		}

		if (! empty($settings['featured'])) {
			$args['featured'] = true;
		}

		if (! empty($settings['product_ids'])) {
			$ids = self::normalize_ids($settings['product_ids']);
			if (! empty($ids)) {
				$args['include'] = $ids;
				$args['orderby'] = 'include';
			}
		}

		if (! empty($settings['on_sale'])) {
			$sale_ids = wc_get_product_ids_on_sale();
			if (empty($sale_ids)) {
				return array();
			}

			$args['include'] = ! empty($args['include']) ? array_values(array_intersect($args['include'], $sale_ids)) : $sale_ids;
			if (empty($args['include'])) {
				return array();
			}
		}

		if (! empty($settings['search'])) {
			$args['s'] = sanitize_text_field($settings['search']);
		}

		return wc_get_products($args);
	}

	public static function product_image($product, $size = 'woocommerce_thumbnail') {
		if (! $product) {
			return '';
		}

		$image_id = $product->get_image_id();
		if ($image_id) {
			return wp_get_attachment_image($image_id, $size, false, array('loading' => 'lazy'));
		}

		return function_exists('wc_placeholder_img') ? wc_placeholder_img($size) : '';
	}

	public static function product_card_type_label($product) {
		if (! $product || ! method_exists($product, 'get_meta')) {
			return '';
		}

		return trim((string) $product->get_meta('_layero_card_type_label', true));
	}

	public static function product_badges($product) {
		if (! $product) {
			return array();
		}

		$badges = array();
		if (method_exists($product, 'is_on_sale') && $product->is_on_sale()) {
			$badges[] = array(
				'label' => self::product_sale_badge_label($product),
				'style' => 'sale',
			);
		}

		if (method_exists($product, 'get_meta')) {
			$badges = array_merge($badges, self::parse_badge_lines((string) $product->get_meta('_layero_product_badges', true)));
		}

		if (method_exists($product, 'is_featured') && $product->is_featured() && ! self::has_badge_like($badges, array('kiemelt', 'bestseller'))) {
			$badges[] = array(
				'label' => __('Kiemelt', 'layero-shop-ui'),
				'style' => 'best',
			);
		}

		return array_slice($badges, 0, 5);
	}

	public static function demo_product_badges($product) {
		$badges = array();
		$price = isset($product['price']) ? (float) $product['price'] : 0;
		$regular = isset($product['regular_price']) ? (float) $product['regular_price'] : 0;

		if ($regular > 0 && $price > 0 && $regular > $price) {
			$badges[] = array(
				'label' => '-' . (int) round((($regular - $price) / $regular) * 100) . '%',
				'style' => 'sale',
			);
		}

		if (! empty($product['badge'])) {
			$badges[] = array(
				'label' => $product['badge'],
				'style' => self::badge_style_for_label($product['badge']),
			);
		}

		return array_slice($badges, 0, 5);
	}

	public static function product_badges_html($badges) {
		if (empty($badges)) {
			return '';
		}

		$html = '<div class="sh-badges lyr-badges">';
		foreach ($badges as $badge) {
			if (empty($badge['label'])) {
				continue;
			}
			$style = ! empty($badge['style']) ? sanitize_html_class($badge['style']) : 'info';
			$html .= '<span class="sh-badge sh-badge--' . esc_attr($style) . ' lyr-badge lyr-badge--' . esc_attr($style) . '">' . esc_html($badge['label']) . '</span>';
		}
		$html .= '</div>';

		return $html;
	}

	private static function parse_badge_lines($raw) {
		$badges = array();
		$lines = preg_split('/\r\n|\r|\n/', (string) $raw);

		foreach ($lines as $line) {
			$line = trim($line);
			if ('' === $line) {
				continue;
			}

			$parts = array_map('trim', explode('|', $line, 2));
			$label = sanitize_text_field($parts[0]);
			if ('' === $label) {
				continue;
			}

			$badges[] = array(
				'label' => $label,
				'style' => self::normalize_badge_style($parts[1] ?? '', $label),
			);
		}

		return $badges;
	}

	private static function product_sale_badge_label($product) {
		$regular = (float) $product->get_regular_price();
		$price = (float) $product->get_price();

		if (! $regular && method_exists($product, 'get_variation_regular_price')) {
			$regular = (float) $product->get_variation_regular_price('max', true);
		}
		if (! $price && method_exists($product, 'get_variation_sale_price')) {
			$price = (float) $product->get_variation_sale_price('min', true);
		}

		if ($regular > 0 && $price > 0 && $regular > $price) {
			return '-' . (int) round((($regular - $price) / $regular) * 100) . '%';
		}

		return __('Akció', 'layero-shop-ui');
	}

	private static function normalize_badge_style($style, $label) {
		$style = sanitize_html_class(strtolower((string) $style));
		$allowed = array('sale', 'best', 'new', 'info', 'dark', 'accent', 'gold', 'eco', 'coral', 'b2b', 'custom', 'limited', 'personal');

		if (in_array($style, $allowed, true)) {
			return $style;
		}

		return self::badge_style_for_label($label);
	}

	private static function badge_style_for_label($label) {
		$normalized = function_exists('remove_accents') ? remove_accents((string) $label) : (string) $label;
		$normalized = strtolower($normalized);

		if (false !== strpos($normalized, 'bestseller') || false !== strpos($normalized, 'top')) {
			return 'best';
		}
		if ('uj' === trim($normalized) || false !== strpos($normalized, 'ujdonsag')) {
			return 'new';
		}
		if (false !== strpos($normalized, 'b2b') || false !== strpos($normalized, 'ceges')) {
			return 'dark';
		}
		if (false !== strpos($normalized, 'szezon') || false !== strpos($normalized, 'limit')) {
			return 'gold';
		}
		if (false !== strpos($normalized, 'eco') || false !== strpos($normalized, 'zold')) {
			return 'eco';
		}
		if (false !== strpos($normalized, 'egyedi') || false !== strpos($normalized, 'personal')) {
			return 'info';
		}

		return 'accent';
	}

	private static function has_badge_like($badges, $needles) {
		foreach ($badges as $badge) {
			$label = function_exists('remove_accents') ? remove_accents((string) ($badge['label'] ?? '')) : (string) ($badge['label'] ?? '');
			$label = strtolower($label);
			foreach ($needles as $needle) {
				if (false !== strpos($label, $needle)) {
					return true;
				}
			}
		}

		return false;
	}

	public static function product_card($product, $args = array()) {
		if (! $product) {
			return '';
		}

		$args = wp_parse_args(
			$args,
			array(
				'show_excerpt' => false,
				'button_text' => '',
				'image_size' => 'woocommerce_thumbnail',
			)
		);

		$link = get_permalink($product->get_id());
		$cat_names = function_exists('wc_get_product_category_list') ? wc_get_product_category_list($product->get_id(), ', ') : '';
		$classes = implode(' ', array_map('sanitize_html_class', wc_get_product_class('lyr-product-card', $product)));
		$classes = trim($classes . ' sh-prod-card sh-reveal');
		$is_simple_ajax = $product->supports('ajax_add_to_cart') && $product->is_purchasable() && $product->is_in_stock();
		$button_text = $args['button_text'] ? $args['button_text'] : $product->add_to_cart_text();
		$excerpt = wp_trim_words(wp_strip_all_tags($product->get_short_description() ?: $product->get_description()), 18);
		$card_type_label = self::product_card_type_label($product);
		$badges = self::product_badges($product);

		ob_start();
		?>
		<article class="<?php echo esc_attr($classes); ?>" data-layero-product-card data-layero-product-id="<?php echo esc_attr($product->get_id()); ?>">
			<figure class="lyr-product-card__media">
				<?php echo self::product_badges_html($badges); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php echo self::product_image($product, $args['image_size']); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</figure>
			<button class="sh-heart lyr-product-card__wish" type="button" data-layero-wish-toggle data-layero-product-id="<?php echo esc_attr($product->get_id()); ?>" aria-label="<?php esc_attr_e('Kedvencekhez adás', 'layero-shop-ui'); ?>">
				<?php echo self::icon('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>
			<div class="sh-prod-card__body lyr-product-card__body">
				<a class="sh-card-link" href="<?php echo esc_url($link); ?>" aria-label="<?php echo esc_attr($product->get_name()); ?>"></a>
				<?php if ($card_type_label) : ?>
					<span class="sh-prod-card__cat lyr-product-card__cat"><?php echo esc_html($card_type_label); ?></span>
				<?php elseif ($cat_names) : ?>
					<span class="sh-prod-card__cat lyr-product-card__cat"><?php echo wp_kses_post($cat_names); ?></span>
				<?php endif; ?>
				<span class="sh-prod-card__name"><?php echo esc_html($product->get_name()); ?></span>
				<?php if (false && $args['show_excerpt'] && $excerpt) : ?>
					<p><?php echo esc_html($excerpt); ?></p>
				<?php endif; ?>
				<?php if (function_exists('wc_get_rating_html')) : ?>
					<div class="sh-rate lyr-product-card__rating"><?php echo wc_get_rating_html($product->get_average_rating()); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
				<?php endif; ?>
				<span class="sh-prod-card__price lyr-product-card__price"><?php echo wp_kses_post($product->get_price_html()); ?></span>
				<a
					href="<?php echo esc_url($product->add_to_cart_url()); ?>"
					data-quantity="1"
					data-product_id="<?php echo esc_attr($product->get_id()); ?>"
					data-product_sku="<?php echo esc_attr($product->get_sku()); ?>"
					class="sh-card-add lyr-btn lyr-btn--primary lyr-product-card__add <?php echo $is_simple_ajax ? 'ajax_add_to_cart add_to_cart_button' : ''; ?>"
					aria-label="<?php echo esc_attr($product->add_to_cart_description()); ?>"
					rel="nofollow"
				><?php echo self::icon('cart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><span><?php echo esc_html($button_text); ?></span></a>
			</div>
		</article>
		<?php
		return ob_get_clean();
	}

	public static function demo_product_card($product, $args = array()) {
		if (empty($product)) {
			return '';
		}

		$args = wp_parse_args(
			$args,
			array(
				'show_excerpt' => true,
				'button_text' => __('Megnézem', 'layero-shop-ui'),
			)
		);

		$category = Shop_Content::category_by_slug($product['category']);
		$link = self::product_url($product['id']);
		$category_link = self::products_url($product['category']);
		$price = ! empty($product['price']) ? number_format_i18n($product['price'], 0) . ' RON' : __('Ajánlatkérés', 'layero-shop-ui');
		$badges = self::demo_product_badges($product);

		ob_start();
		?>
		<article class="sh-prod-card sh-reveal lyr-product-card lyr-product-card--demo" data-layero-product-card data-layero-product-id="<?php echo esc_attr($product['id']); ?>">
			<figure class="lyr-product-card__media">
				<?php echo self::product_badges_html($badges); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<img src="<?php echo esc_url(Shop_Content::asset_url($product['image'])); ?>" alt="<?php echo esc_attr($product['name']); ?>" loading="lazy">
			</figure>
			<button class="sh-heart lyr-product-card__wish" type="button" data-layero-wish-toggle data-layero-product-id="<?php echo esc_attr($product['id']); ?>" aria-label="<?php esc_attr_e('Kedvencekhez adás', 'layero-shop-ui'); ?>">
				<?php echo self::icon('heart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</button>
			<div class="sh-prod-card__body lyr-product-card__body">
				<a class="sh-card-link" href="<?php echo esc_url($link); ?>" aria-label="<?php echo esc_attr($product['name']); ?>"></a>
				<?php if ($category) : ?>
					<span class="sh-prod-card__cat lyr-product-card__cat"><?php echo esc_html($category['name']); ?></span>
				<?php endif; ?>
				<span class="sh-prod-card__name"><?php echo esc_html($product['name']); ?></span>
				<?php if (false && $args['show_excerpt']) : ?>
					<p><?php echo esc_html($product['description']); ?></p>
				<?php endif; ?>
				<span class="sh-prod-card__price lyr-product-card__price">
					<?php if (! empty($product['regular_price']) && $product['regular_price'] > $product['price']) : ?>
						<del><?php echo esc_html(number_format_i18n($product['regular_price'], 0) . ' RON'); ?></del>
					<?php endif; ?>
					<?php echo esc_html($price); ?>
				</span>
				<a class="sh-card-add lyr-btn lyr-btn--primary lyr-product-card__add" href="<?php echo esc_url($link); ?>">
					<?php echo self::icon('cart'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<span><?php echo esc_html($args['button_text']); ?></span>
				</a>
			</div>
		</article>
		<?php
		return ob_get_clean();
	}

	public static function category_card($term, $large = false, $show_count = true) {
		if (! $term || is_wp_error($term)) {
			return '';
		}

		$thumbnail_id = get_term_meta($term->term_id, 'thumbnail_id', true);
		$image = $thumbnail_id ? wp_get_attachment_image($thumbnail_id, 'large', false, array('loading' => 'lazy')) : '';
		$fallback = Shop_Content::category_by_slug($term->slug);
		$link = get_term_link($term);
		$link = is_wp_error($link) ? '#' : $link;
		$description = $term->description ? $term->description : ($fallback ? $fallback['description'] : '');

		ob_start();
		?>
		<a class="sh-bento sh-reveal lyr-category-card <?php echo $large ? 'sh-bento--hero lyr-category-card--hero' : ''; ?>" href="<?php echo esc_url($link); ?>">
				<?php if ($image) : ?>
					<?php echo $image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php elseif ($fallback) : ?>
					<img src="<?php echo esc_url(Shop_Content::asset_url($fallback['image'])); ?>" alt="<?php echo esc_attr($term->name); ?>" loading="lazy">
				<?php elseif (function_exists('wc_placeholder_img')) : ?>
					<?php echo wc_placeholder_img('large'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				<?php endif; ?>
			<span class="sh-bento__body">
				<strong><?php echo esc_html($term->name); ?></strong>
				<small>
					<?php echo esc_html($description); ?>
				<?php if ($show_count) : ?>
					<?php echo $description ? ' · ' : ''; ?><?php echo esc_html($term->count); ?> <?php echo esc_html__('termék', 'layero-shop-ui'); ?>
				<?php endif; ?>
				</small>
				<i aria-hidden="true"><?php esc_html_e('Felfedezem', 'layero-shop-ui'); ?> &rsaquo;</i>
			</span>
		</a>
		<?php
		return ob_get_clean();
	}

	public static function demo_category_card($category, $large = false, $show_count = true) {
		$link = self::products_url($category['id']);

		ob_start();
		?>
		<a class="sh-bento sh-reveal lyr-category-card <?php echo $large ? 'sh-bento--hero lyr-category-card--hero' : ''; ?>" href="<?php echo esc_url($link); ?>">
			<img src="<?php echo esc_url(Shop_Content::asset_url($category['image'])); ?>" alt="<?php echo esc_attr($category['name']); ?>" loading="lazy">
			<span class="sh-bento__body">
				<strong><?php echo esc_html($category['name']); ?></strong>
				<small>
					<?php echo esc_html($category['description']); ?>
				<?php if ($show_count) : ?>
					· <?php echo esc_html($category['count']); ?> <?php echo esc_html__('termék', 'layero-shop-ui'); ?>
				<?php endif; ?>
				</small>
				<i aria-hidden="true"><?php esc_html_e('Felfedezem', 'layero-shop-ui'); ?> &rsaquo;</i>
			</span>
		</a>
		<?php
		return ob_get_clean();
	}

	public static function star_rating($stars) {
		$stars = max(1, min(5, absint($stars)));

		return str_repeat('★', $stars) . str_repeat('☆', 5 - $stars);
	}

	private static function normalize_ids($value) {
		if (is_string($value)) {
			$value = explode(',', $value);
		}

		return array_values(
			array_filter(
				array_map(
					'absint',
					(array) $value
				)
			)
		);
	}
}
