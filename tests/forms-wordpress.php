<?php
// WP-CLI only; messages stay in the disposable local database, with outbound mail intercepted.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Only run against the local QA fixture.');
}
add_filter('pre_wp_mail', '__return_true', 10000);
add_filter('pre_http_request', function () { return new WP_Error('local_qa', 'External requests disabled during QA.'); }, PHP_INT_MAX);

class Layero_Test_Json_End extends RuntimeException {}
if (! defined('DOING_AJAX')) { define('DOING_AJAX', true); }
add_filter('wp_die_handler', function () { return function () { throw new Layero_Test_Json_End(); }; });
add_filter('wp_die_ajax_handler', function () { return function () { throw new Layero_Test_Json_End(); }; });
$GLOBALS['form_checks'] = 0;
function layero_form_check($condition, $label) {
	if (! $condition) { throw new RuntimeException('FAIL: ' . $label); }
	$GLOBALS['form_checks']++;
}
function layero_form_request($changes = array(), $same_ip = false) {
	$_SERVER['REQUEST_METHOD'] = 'POST';
	if (! $same_ip) { $_SERVER['REMOTE_ADDR'] = 'local-qa-' . wp_generate_uuid4(); }
	$_POST = wp_slash(array_merge(array('nonce' => wp_create_nonce('layero_contact'), 'name' => 'QA Teszt',
		'email' => 'qa-' . wp_generate_uuid4() . '@example.invalid', 'message' => "Helyi próba: O'Neil és C:\\QA\\referencia.",
		'topic' => 'Helyi űrlappróba', 'consent' => '1'), $changes));
	$_REQUEST = $_POST;
	ob_start();
	try { \LayeroShop\Forms::instance()->submit_contact(); } catch (Layero_Test_Json_End $e) {}
	return json_decode(ob_get_clean(), true);
}
ob_start(); // Keep headers available during all JSON responses.
layero_form_check(false === layero_form_request(array('nonce' => 'invalid'))['success'], 'bad nonce rejected');
layero_form_check(false === layero_form_request(array('nonce' => array('nested')))['success'], 'nested nonce rejected cleanly');
layero_form_check(false === layero_form_request(array('consent' => ''))['success'], 'privacy acknowledgment required');
layero_form_check(false === layero_form_request(array('name' => array('nested')))['success'], 'nested input rejected');
layero_form_check(false === layero_form_request(array('name' => str_repeat('A', 101)))['success'], 'name length bounded');
layero_form_check(false === layero_form_request(array('email' => 'invalid'))['success'], 'invalid email rejected');
layero_form_check(false === layero_form_request(array('website' => 'bot'))['success'], 'honeypot rejected');
$email = 'qa-' . wp_generate_uuid4() . '@example.invalid';
layero_form_check(true === layero_form_request(array('email' => $email))['success'], 'valid request accepted');
$posts = get_posts(array('post_type' => 'layero_inquiry', 'post_status' => 'private', 'numberposts' => 1, 'orderby' => 'ID', 'order' => 'DESC'));
$saved = $posts[0];
layero_form_check(strpos($saved->post_content, $email) !== false && strpos($saved->post_content, "O'Neil és C:\\QA\\referencia.") !== false, 'request persisted without losing quotes or slashes');
layero_form_check('accepted' === get_post_meta($saved->ID, '_layero_mail_status', true), 'mail acceptance recorded');
layero_form_check(false === layero_form_request(array('email' => $email))['success'], 'duplicate email throttled');
$failed_mail = function () { return false; };
add_filter('pre_wp_mail', $failed_mail, PHP_INT_MAX);
layero_form_check(true === layero_form_request()['success'], 'mail failure still acknowledges saved request');
$posts = get_posts(array('post_type' => 'layero_inquiry', 'post_status' => 'private', 'numberposts' => 1, 'orderby' => 'ID', 'order' => 'DESC'));
layero_form_check('failed' === get_post_meta($posts[0]->ID, '_layero_mail_status', true) && strpos($posts[0]->post_content, 'sikertelen') !== false, 'mail failure retained for administrator');
remove_filter('pre_wp_mail', $failed_mail, PHP_INT_MAX);
$fail_insert = function ($empty, $data) { return 'layero_inquiry' === ($data['post_type'] ?? '') ? true : $empty; };
add_filter('wp_insert_post_empty_content', $fail_insert, 10, 2);
layero_form_check(false === layero_form_request()['success'], 'storage failure never reports success');
remove_filter('wp_insert_post_empty_content', $fail_insert, 10);
for ($i = 0; $i < 5; $i++) { layero_form_request(array('website' => 'bot'), $i > 0); }
$throttled = layero_form_request(array(), true);
layero_form_check(false === $throttled['success'] && strpos($throttled['data']['message'], 'Túl sok') !== false, 'IP rate limit blocks burst');
$type = get_post_type_object('layero_inquiry');
layero_form_check(! $type->public && ! $type->show_in_rest && 'manage_woocommerce' === $type->cap->read_post, 'inquiries are private and staff-only');
ob_end_clean();
echo $GLOBALS['form_checks'] . " real WordPress form checks passed. No external mail sent.\n";
