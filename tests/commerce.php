<?php
// Isolated regression checks. No WordPress database, orders, mail or payment calls.
namespace Automattic\WooCommerce\StoreApi\Exceptions {
	class RouteException extends \Exception {
		public function __construct($code, $message, $status) { parent::__construct($message, $status); }
	}
}
namespace {
	define('ABSPATH', __DIR__);
	$GLOBALS['hooks'] = array();
	function add_filter($hook, $callback, $priority = 10, $args = 1) { $GLOBALS['hooks'][$hook][] = $callback; }
	function add_action($hook, $callback, $priority = 10, $args = 1) { add_filter($hook, $callback, $priority, $args); }
	function add_shortcode($name, $callback) {}
	function __($text, $domain = '') { return $text; }
	function sanitize_key($value) { return strtolower($value); }
	function sanitize_text_field($value) { return trim(strip_tags($value)); }
	function sanitize_textarea_field($value) { return trim(strip_tags($value)); }
	function wp_unslash($value) { return stripslashes($value); }
	function wp_json_encode($value) { return json_encode($value); }
	function esc_html($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
	function is_wp_error($value) { return $value instanceof WP_Error; }
	function wc_add_notice($message, $type) { $GLOBALS['notices'][] = $message; }
	function WC() { return $GLOBALS['wc']; }
	function wc_get_product($id) { return $GLOBALS['products'][$id] ?? false; }
	function wc_get_order($id) { return $GLOBALS['orders'][$id] ?? false; }
	function is_wc_endpoint_url($endpoint) { return !empty($GLOBALS['order_pay']); }
	function get_query_var($name) { return $GLOBALS['order_pay'] ?? 0; }
	function absint($value) { return abs((int) $value); }
	class WP_Error {
		public $errors = array();
		public function __construct($code = '', $message = '') { if ($code) $this->add($code, $message); }
		public function add($code, $message) { $this->errors[$code] = $message; }
		public function get_error_message() { return reset($this->errors); }
	}
	class Product {
		public $meta; private $parent;
		public function __construct($meta = array(), $parent = 0) { $this->meta = $meta; $this->parent = $parent; }
		public function get_meta($key, $single = true) { return $this->meta[$key] ?? ''; }
		public function get_parent_id() { return $this->parent; }
	}
	class Cart {
		public $items = array();
		public function get_cart() { return $this->items; }
	}
	class Item {
		public $meta = array(); private $product;
		public function __construct($product) { $this->product = $product; }
		public function get_product() { return $this->product; }
		public function get_meta($key, $single = true) { return $this->meta[$key] ?? ''; }
		public function add_meta_data($key, $value, $unique = true) { $this->meta[$key] = $value; }
		public function update_meta_data($key, $value) { $this->meta[$key] = $value; }
	}
	class Order {
		private $items;
		public function __construct($items) { $this->items = $items; }
		public function get_items() { return $this->items; }
	}
	$count = 0;
	function check($condition, $label) {
		if (!$condition) throw new \RuntimeException('FAIL: ' . $label);
		$GLOBALS['count']++;
	}
	require __DIR__ . '/../includes/Helpers.php';
	require __DIR__ . '/../includes/WooCommerce.php';
	require __DIR__ . '/../includes/Payment_Rules.php';
	$rules = \LayeroShop\Payment_Rules::instance();
	$commerce = \LayeroShop\WooCommerce::instance();
	$key = \LayeroShop\Payment_Rules::META_KEY;
	$regular = new Product(array('_layero_personalizable' => 'no'));
	$custom = new Product(array($key => '1', '_layero_personalizable' => 'yes'));
	$GLOBALS['products'] = array(1 => $regular, 2 => $custom, 3 => new Product(array($key => '0'), 2));
	$GLOBALS['wc'] = (object) array('cart' => new Cart());
	$gateways = array('cod' => 'cod', 'bacs' => 'bank', 'card' => 'card');
	check($rules->filter_gateways($gateways) === $gateways, 'empty cart keeps methods');
	$GLOBALS['wc']->cart->items = array(array('data' => $regular, 'quantity' => 2));
	check($rules->filter_gateways($gateways) === $gateways, 'ordinary cart keeps COD');
	$GLOBALS['wc']->cart->items[] = array('data' => $GLOBALS['products'][3], 'quantity' => 1);
	check($rules->filter_gateways($gateways) === array('bacs' => 'bank', 'card' => 'card'), 'mixed cart and inherited flag block COD');
	foreach (array('', '0', 'no', 'false') as $value) check(!\LayeroShop\Payment_Rules::product_requires_prepayment(new Product(array($key => $value))), 'false flag ' . $value);
	foreach (array('1', 'yes', 'true', 'on', ' YES ') as $value) check(\LayeroShop\Payment_Rules::product_requires_prepayment(new Product(array($key => $value))), 'true flag ' . $value);
	$errors = new WP_Error();
	$rules->validate_checkout(array('payment_method' => 'cod'), $errors);
	check(isset($errors->errors['layero_prepayment_required']), 'forged classic checkout COD rejected');
	$errors = new WP_Error();
	$rules->validate_checkout(array('payment_method' => 'bacs'), $errors);
	check(!$errors->errors, 'prepayment allowed');
	$item = new Item($custom);
	$rules->save_item_rule($item, 'cart-key', array('data' => $custom), null);
	check($item->get_meta($key) === '1', 'rule preserved in order item');
	$deleted = new Item(false); $deleted->meta[$key] = '1';
	check($rules->order_requires_prepayment(new Order(array($deleted))), 'deleted product cannot lose order rule');
	$GLOBALS['orders'] = array(7 => new Order(array(new Item($regular))), 8 => new Order(array($deleted)));
	$GLOBALS['order_pay'] = 7;
	check($rules->filter_gateways($gateways) === $gateways, 'ordinary order-pay ignores unrelated custom cart');
	$GLOBALS['order_pay'] = 8;
	check(!isset($rules->filter_gateways($gateways)['cod']), 'order-pay blocks COD from snapshot');
	$GLOBALS['order_pay'] = 0;
	try {
		$rules->validate_store_api(new Order(array($item)), array('payment_method' => 'cod'));
		check(false, 'Store API accepted COD');
	} catch (\Automattic\WooCommerce\StoreApi\Exceptions\RouteException $e) { check($e->getCode() === 400, 'Store API COD rejected'); }
	$store_item = new Item($custom);
	$rules->validate_store_api(new Order(array($store_item)), array('payment_method' => 'card'));
	check($store_item->get_meta($key) === '1', 'Store API records rule');
	$GLOBALS['wc']->cart = null;
	check($rules->filter_gateways($gateways) === $gateways, 'no cart context is safe');

	$_POST = array('layero_personalization_text' => str_repeat('ő', 40), 'layero_personalization_size' => 'Kicsi', 'layero_personalization_color' => 'Natúr');
	check($commerce->validate_personalization(true, 2, 1), '40 Unicode characters accepted');
	$data = $commerce->add_cart_item_data(array(), 2, 3);
	check($data['layero_personalization']['text'] === str_repeat('ő', 40), 'Unicode value preserved');
	check($data === $commerce->add_cart_item_data(array(), 2, 3), 'same options merge consistently');
	check($data['layero_unique_key'] !== $commerce->add_cart_item_data(array(), 2, 4)['layero_unique_key'], 'different variations stay separate');
	$_POST['layero_personalization_text'] .= 'ő';
	check(!$commerce->validate_personalization(true, 2, 1), 'overlong name rejected');
	$_POST = array('layero_personalization_color' => 'Nem létező');
	check(!$commerce->validate_personalization(true, 2, 1), 'unknown option rejected');
	try { $commerce->add_cart_item_data(array(), 2, 0); check(false, 'invalid direct cart data accepted'); }
	catch (\Exception $e) { check(true, 'cart filter also rejects invalid options'); }
	$_POST = array('layero_personalization_text' => array('bad'));
	check(!$commerce->validate_personalization(true, 2, 1), 'array injection rejected');
	$_POST = array('layero_personalization_note' => str_repeat('x', 1001));
	check(!$commerce->validate_personalization(true, 2, 1), 'overlong note rejected');
	$_POST = array('layero_personalization_text' => '<b>Teszt</b>');
	$data = $commerce->add_cart_item_data(array(), 2, 0);
	check($data['layero_personalization']['text'] === 'Teszt', 'HTML sanitized');
	check($commerce->add_cart_item_data(array('existing' => true), 1, 0) === array('existing' => true), 'ordinary product ignores custom fields');
	check(!$commerce->validate_personalization(false, 2, 1), 'another validator failure preserved');
	$_POST = array();
	check(!$commerce->validate_personalization(true, 2, 1), 'empty personalization rejected');
	$rejected = false;
	try { $commerce->add_cart_item_data(array(), 2, 0); } catch (\Exception $error) { $rejected = true; }
	check($rejected, 'cart data cannot bypass empty personalization validation');
	$_POST = array('layero_personalization_text' => '0');
	$zero_data = $commerce->add_cart_item_data(array(), 2, 0);
	check($commerce->display_cart_item_data(array(), $zero_data)[0]['value'] === '0', 'zero inscription displayed in cart');
	$zero_item = new Item($custom);
	$commerce->add_order_item_meta($zero_item, 'key', $zero_data, null);
	check($zero_item->get_meta('Felirat / név') === '0', 'zero inscription preserved on order');
	check(isset($GLOBALS['hooks']['woocommerce_available_payment_gateways']), 'payment hook registered');
	check(isset($GLOBALS['hooks']['woocommerce_add_to_cart_validation']), 'validation hook registered');
	echo $count . " isolated commerce checks passed.\n";
}
