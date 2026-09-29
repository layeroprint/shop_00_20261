<?php

namespace LayeroShop;

if (! defined('ABSPATH')) { exit; }

/** One public catalogue for the native widgets and the shared shop UI. */
final class Catalog {
	private static $products = null;

	public static function init() {
		add_filter('woocommerce_product_data_store_cpt_get_products_query', array(__CLASS__, 'query_args'), 10, 2);
	}

	public static function query_args($query, $vars) {
		if (! empty($vars['layero_price_order'])) {
			$query['meta_key'] = '_price';
			$query['orderby'] = array('meta_value_num' => 'DESC' === $vars['layero_price_order'] ? 'DESC' : 'ASC', 'ID' => 'ASC');
		} elseif (! empty($vars['layero_stable_order']) && in_array($vars['orderby'] ?? '', array('date', 'title', 'menu_order'), true)) {
			$query['orderby'] = array($vars['orderby'] => 'ASC' === strtoupper($vars['order'] ?? '') ? 'ASC' : 'DESC', 'ID' => 'ASC');
		}
		return $query;
	}

	public static function products() {
		if (null === self::$products) {
			self::$products = Helpers::is_woo_active() ? wc_get_products(array(
				'status' => 'publish', 'visibility' => 'catalog', 'limit' => -1,
				'orderby' => 'title', 'order' => 'ASC',
			)) : array();
			self::$products = array_values(array_filter(self::$products, array(__CLASS__, 'visible')));
		}
		return self::$products;
	}

	public static function visible($product) {
		return $product && 'publish' === $product->get_status()
			&& in_array($product->get_catalog_visibility(), array('visible', 'catalog'), true)
			&& ('yes' !== get_option('woocommerce_hide_out_of_stock_items') || $product->is_in_stock());
	}

	public static function category_slugs($product) {
		$ids = $product->get_category_ids();
		foreach ($ids as $id) {
			$ids = array_merge($ids, get_ancestors($id, 'product_cat', 'taxonomy'));
		}
		$slugs = array();
		foreach (array_unique($ids) as $id) {
			$term = get_term($id, 'product_cat');
			if ($term && ! is_wp_error($term)) { $slugs[] = $term->slug; }
		}
		return array_values(array_unique($slugs));
	}

	public static function category_count($slug) {
		$count = 0;
		foreach (self::products() as $product) {
			if (in_array($slug, self::category_slugs($product), true)) { $count++; }
		}
		return $count;
	}

	public static function snapshot() {
		$items = array();
		$urls = array();
		$category_ids = wp_list_pluck(Shop_Content::categories(), 'id');
		foreach (self::products() as $product) {
			$slug = $product->get_slug();
			$categories = self::category_slugs($product);
			$known = array_values(array_intersect($category_ids, $categories));
			$images = array();
			foreach (array_merge(array($product->get_image_id()), $product->get_gallery_image_ids()) as $image_id) {
				$image = $image_id ? wp_get_attachment_image_url($image_id, 'woocommerce_single') : '';
				if ($image) { $images[] = $image; }
			}
			$price = '' === $product->get_price() ? 0 : (float) wc_get_price_to_display($product);
			$regular = '' === $product->get_regular_price() ? 0 : (float) wc_get_price_to_display($product, array('price' => $product->get_regular_price()));
			$urls[$slug] = $product->get_permalink();
			$items[] = array(
				'id' => $slug, 'wc_id' => $product->get_id(), 'url' => $urls[$slug],
				'nev' => $product->get_name(), 'cat' => $known[0] ?? ($categories[0] ?? ''), 'categories' => $categories,
				'ar' => $price, 'regi_ar' => $regular, 'price_html' => wp_kses_post($product->get_price_html()),
				'kepek' => $images ?: array(wc_placeholder_img_src()),
				'leiras' => wp_strip_all_tags($product->get_short_description() ?: $product->get_description()),
				'hosszu' => array(wp_strip_all_tags($product->get_description())), 'specs' => array(),
				'badge' => $product->is_featured() ? 'Kiemelt' : '',
				'szemelyre_szabott' => Helpers::product_is_personalizable($product),
				'keszlet' => $product->is_in_stock() ? 'rendelheto' : 'elfogyott', 'opciok' => array(),
			);
		}
		$cats = array();
		foreach (Shop_Content::categories() as $category) {
			$cats[] = array('id' => $category['id'], 'nev' => $category['name'], 'leiras' => $category['description'],
				'img' => Shop_Content::asset_url($category['image']), 'ajanlat' => ! empty($category['quote']),
				'count' => self::category_count($category['id']));
		}
		return array('products' => $items, 'categories' => $cats, 'urls' => $urls);
	}
}
