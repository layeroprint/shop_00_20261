<?php
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true) || ! has_filter('pre_wp_mail') || ! has_filter('pre_http_request')) { throw new RuntimeException('Guarded local WordPress required.'); }
class Layero_Withdrawal_End extends RuntimeException {}
if (! defined('DOING_AJAX')) { define('DOING_AJAX', true); }
foreach (array('wp_die_handler', 'wp_die_ajax_handler') as $hook) { add_filter($hook, function () { return function () { throw new Layero_Withdrawal_End(); }; }); }
$checks = 0; $ids = array(); $mail = array(); $delivery = true;
add_filter('pre_wp_mail', function ($pre, $args) use (&$mail, &$delivery) { $mail[] = $args; return $delivery; }, PHP_INT_MAX, 2);
$check = function ($ok, $label) use (&$checks) { if (! $ok) { throw new RuntimeException('FAIL: ' . $label); } $checks++; };
$send = function ($changes = array()) {
	$_SERVER['REQUEST_METHOD'] = 'POST'; $_SERVER['REMOTE_ADDR'] = 'local-qa-' . wp_generate_uuid4();
	$_POST = wp_slash(array_merge(array('nonce' => wp_create_nonce('layero_contact'), 'name' => "QA Ági O'Neil", 'email' => 'qa-' . wp_generate_uuid4() . '@example.invalid', 'order_reference' => 'QA-001 – 2026.09.30.', 'message' => '', 'website' => ''), $changes));
	ob_start(); try { \LayeroShop\Forms::instance()->submit_withdrawal(); } catch (Layero_Withdrawal_End $e) {} return json_decode(ob_get_clean(), true);
};
ob_start();
try {
	foreach (array(array('nonce' => 'bad'), array('order_reference' => ''), array('order_reference' => array('x')), array('email' => 'bad'), array('website' => 'bot')) as $bad) { $check(false === $send($bad)['success'], 'bad request rejected'); }
	$check(count($mail) === 0, 'invalid requests send no mail');
	$result = $send(); $check(true === $result['success'], 'guest request accepted without marketing consent or mandatory reason');
	$id = $result['data']['reference']; $ids[] = $id; $post = get_post($id);
	$check($post && 'private' === $post->post_status, 'withdrawal stored privately');
	$check(strpos($post->post_content, "QA Ági O'Neil") !== false && strpos($post->post_content, 'QA-001') !== false, 'identity and order reference persist');
	$check(get_post_meta($id, '_layero_withdrawal_received_at', true), 'receipt timestamp stored');
	$check(count($mail) === 2, 'staff notice and customer receipt generated');
	$receipt = end($mail); $check(strpos($receipt['to'], '@example.invalid') !== false && strpos($receipt['message'], 'Beérkezés:') !== false, 'customer receipt includes time');
	$check($receipt['message'] === $result['data']['receipt'], 'download and email contain identical durable record');
	$check('accepted' === get_post_meta($id, '_layero_receipt_mail_status', true), 'receipt mail acceptance recorded');
	$delivery = false; $failed = $send(); $ids[] = $failed['data']['reference'];
	$check(true === $failed['success'] && strpos($failed['data']['message'], 'nem sikerült') !== false, 'mail failure acknowledges stored withdrawal accurately');
	$check(! empty($failed['data']['receipt']), 'downloadable proof available even when mail fails');
	$fail_insert = function ($empty, $data) { return 'layero_inquiry' === ($data['post_type'] ?? '') ? true : $empty; };
	add_filter('wp_insert_post_empty_content', $fail_insert, 10, 2); $check(false === $send()['success'], 'storage failure never reports success'); remove_filter('wp_insert_post_empty_content', $fail_insert, 10);
	$original = $GLOBALS['wp_query'];
	$GLOBALS['wp_query'] = new WP_Query(array('pagename' => 'aszf'));
	$check(\LayeroShop\Page_Builder::allow_legal_pages(false), 'terms bypass coming-soon mode');
	$GLOBALS['wp_query'] = new WP_Query(array('pagename' => 'adatvedelem'));
	$check(\LayeroShop\Page_Builder::allow_legal_pages(false), 'privacy bypasses coming-soon mode');
	$GLOBALS['wp_query'] = new WP_Query(array('pagename' => 'kapcsolat'));
	$check(! \LayeroShop\Page_Builder::allow_legal_pages(false), 'other pages do not bypass coming-soon mode'); $GLOBALS['wp_query'] = $original;
} finally { foreach ($ids as $id) { wp_delete_post($id, true); } ob_end_clean(); }
echo "$checks real WordPress withdrawal checks passed. No external mail or live order changes.\n";
