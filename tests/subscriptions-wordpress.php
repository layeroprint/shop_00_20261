<?php
// Disposable local WordPress only. Capture mail without any external delivery.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true) || ! has_filter('pre_wp_mail') || ! has_filter('pre_http_request')) {
	throw new RuntimeException('Guarded local WordPress required.');
}
use LayeroShop\Subscriptions as Subs;
class Layero_Sub_Test_End extends RuntimeException {}
if (! defined('DOING_AJAX')) { define('DOING_AJAX', true); }
foreach (array('wp_die_handler', 'wp_die_ajax_handler') as $hook) { add_filter($hook, function () { return function () { throw new Layero_Sub_Test_End(); }; }); }
$mail = array(); $mail_ok = true; $ids = array(); $checks = 0;
$capture = function ($pre, $args) use (&$mail, &$mail_ok) { $mail[] = $args; return $mail_ok; };
add_filter('pre_wp_mail', $capture, PHP_INT_MAX, 2);
$check = function ($ok, $message) use (&$checks) { if (! $ok) { throw new RuntimeException('FAIL: ' . $message); } $checks++; };
$request = function ($changes = array(), $same_ip = false) {
	$_SERVER['REQUEST_METHOD'] = 'POST';
	if (! $same_ip) { $_SERVER['REMOTE_ADDR'] = 'local-qa-' . wp_generate_uuid4(); }
	$_POST = wp_slash(array_merge(array('nonce' => wp_create_nonce('layero_subscription'), 'email' => 'qa-' . wp_generate_uuid4() . '@example.invalid', 'purpose' => 'newsletter', 'language' => 'hu', 'consent' => '1', 'website' => ''), $changes));
	ob_start(); try { Subs::submit(); } catch (Layero_Sub_Test_End $e) {} return json_decode(ob_get_clean(), true);
};
$latest = function () use (&$ids) { $p = get_posts(array('post_type' => Subs::TYPE, 'post_status' => 'private', 'numberposts' => 1, 'orderby' => 'ID', 'order' => 'DESC'))[0]; $ids[] = $p->ID; return $p->ID; };
$link_args = function ($body, $action) { preg_match('~https?://[^\s]+layero_subscription=' . $action . '[^\s]+~', $body, $match); parse_str(parse_url($match[0] ?? '', PHP_URL_QUERY) ?? '', $args); return $args; };
ob_start();
try {
	foreach (array(array('nonce' => 'bad'), array('email' => array('nested')), array('consent' => ''), array('email' => 'bad'), array('website' => 'bot'), array('purpose' => 'unknown')) as $bad) { $check(false === $request($bad)['success'], 'invalid request rejected'); }
	$check(0 === count($mail), 'invalid requests never send mail');
	$email = 'qa-' . wp_generate_uuid4() . '@example.invalid';
	$check(true === $request(array('email' => $email))['success'], 'valid request accepted'); $id = $latest();
	$check('pending' === get_post_meta($id, '_state', true), 'new subscriber is not active');
	$args = $link_args(end($mail)['message'], 'confirm');
	$check(! empty($args['token']) && $id === (int) $args['subscriber'], 'actual mail carries confirmation link');
	$check(hash('sha256', $args['token']) === get_post_meta($id, '_confirm_hash', true), 'only hashed confirmation token retained');
	$check(is_wp_error(Subs::act('confirm', $id, str_repeat('a', 64), true)), 'forged token rejected');
	$check(true === Subs::act('confirm', $id, $args['token'], false) && 'pending' === get_post_meta($id, '_state', true), 'mail scanner GET never activates');
	$check(false === $request(array('email' => $email))['success'], 'resend throttled');
	$result = Subs::act('confirm', $id, $args['token'], true);
	$check(is_array($result) && 'confirmed' === get_post_meta($id, '_state', true), 'confirmation activates subscriber');
	$check(is_wp_error(Subs::act('confirm', $id, $args['token'], true)), 'used confirmation cannot be replayed');
	$count = count($mail); $check(true === $request(array('email' => $email))['success'] && count($mail) === $count, 'confirmed resubmission is idempotent and sends no extra mail');
	$export = Subs::export($email); $check(count($export['data']) === 1 && $export['done'], 'privacy export includes subscription');
	parse_str(parse_url($result['unsubscribe_url'], PHP_URL_QUERY), $unsubscribe);
	$check(true === Subs::act('unsubscribe', $id, $unsubscribe['token'], false) && get_post($id), 'mail scanner GET never deletes');
	$check(true === Subs::act('unsubscribe', $id, $unsubscribe['token'], true) && ! get_post($id), 'unsubscribe deletes data');
	$mail_ok = false; $check(false === $request()['success'], 'mail failure never claims success'); $failed_id = $latest();
	$check('failed' === get_post_meta($failed_id, '_mail_status', true) && 'pending' === get_post_meta($failed_id, '_state', true), 'mail failure stays inactive'); $mail_ok = true;
	$check(true === $request(array('purpose' => 'launch', 'language' => 'ro'))['success'], 'Romanian launch request accepted'); $launch_id = $latest();
	$launch_args = $link_args(end($mail)['message'], 'confirm');
	$check('launch' === get_post_meta($launch_id, '_purpose', true) && strpos(end($mail)['subject'], 'Confirmă') !== false, 'launch purpose and Romanian text preserved');
	update_post_meta($launch_id, '_requested_at', time() - 4 * DAY_IN_SECONDS);
	$check(is_wp_error(Subs::act('confirm', $launch_id, $launch_args['token'], true)), 'expired confirmation rejected');
	Subs::cleanup(); $check(! get_post($launch_id), 'expired pending data removed');
	$trash_email = 'qa-' . wp_generate_uuid4() . '@example.invalid'; $request(array('email' => $trash_email)); $trash_id = $latest(); wp_trash_post($trash_id);
	$check(count(Subs::export($trash_email)['data']) === 1, 'privacy export includes trashed records');
	$check(Subs::erase($trash_email)['items_removed'] && ! get_post($trash_id), 'privacy erasure removes trash too');
	$repeat = 'qa-' . wp_generate_uuid4() . '@example.invalid';
	for ($i = 0; $i < 5; $i++) { $request(array('email' => $repeat), $i > 0); } $latest();
	$blocked = $request(array('email' => $repeat), true); $check(false === $blocked['success'] && strpos($blocked['data']['message'], 'Túl sok') !== false, 'IP burst limited');
	$type = get_post_type_object(Subs::TYPE); $check(! $type->public && ! $type->show_in_rest && 'manage_woocommerce' === $type->cap->read_post, 'subscriber records remain staff-only');
	ob_start(); Subs::render_form(); $form = ob_get_clean();
	$check(strpos($form, 'name="consent" value="1" required') !== false && strpos($form, 'checked') === false, 'explicit unchecked consent is required');
	$check(wp_style_is('layero-subscriptions', 'enqueued') && wp_script_is('layero-subscriptions', 'enqueued'), 'form assets available');
} finally {
	foreach (array_unique($ids) as $id) { wp_delete_post($id, true); }
	remove_filter('pre_wp_mail', $capture, PHP_INT_MAX); ob_end_clean();
}
echo "$checks real WordPress subscription checks passed. No external mail sent.\n";
