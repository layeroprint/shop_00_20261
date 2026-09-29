<?php
// Run only in the isolated local WordPress QA database.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
function faq_check($ok, $label) {
    if (! $ok) { throw new RuntimeException($label); }
    echo 'PASS: ' . $label . PHP_EOL;
}
$builder = '\LayeroShop\Page_Builder';
$legacy = (new ReflectionMethod($builder, 'legacy_faq_data'))->invoke(null);
$recognize = new ReflectionMethod($builder, 'is_legacy_faq');
$legacy = json_decode(wp_json_encode($legacy), true);
faq_check($recognize->invoke(null, $legacy), 'Recognizes the generated legacy FAQ.');
$edited = $legacy;
$edited[0]['elements'][0]['elements'][0]['settings']['html'] .= '<p>Custom content</p>';
faq_check(! $recognize->invoke(null, $edited), 'Preserves edited FAQ copy.');
$edited = $legacy;
$edited[3]['elements'][0]['elements'][0]['settings']['image']['url'] = home_url('/custom-photo.webp');
faq_check(! $recognize->invoke(null, $edited), 'Preserves custom CTA media.');
$edited = $legacy;
$edited[] = $legacy[0];
faq_check(! $recognize->invoke(null, $edited), 'Preserves additional Elementor widgets.');
$page = get_page_by_path('gyik');
if (! $page) {
    $page_id = wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'Gyakori kérdések', 'post_name' => 'gyik'), true);
    if (is_wp_error($page_id)) { throw new RuntimeException($page_id->get_error_message()); }
    $page = get_post($page_id);
}
update_post_meta($page->ID, '_wp_page_template', 'elementor_canvas');
update_post_meta($page->ID, '_elementor_edit_mode', 'builder');
$raw = wp_json_encode($legacy);
update_post_meta($page->ID, '_elementor_data', wp_slash($raw));
delete_post_meta($page->ID, '_layero_faq_revision');
delete_post_meta($page->ID, '_layero_faq_backup_0_10_8');
$home_id = (int) get_option('page_on_front');
$home_before = get_post_meta($home_id, '_elementor_data', true);
wp_set_current_user(0);
$builder::maybe_upgrade_faq();
faq_check($raw === get_post_meta($page->ID, '_elementor_data', true), 'Anonymous requests cannot migrate the page.');
$admins = get_users(array('role' => 'administrator', 'number' => 1));
wp_set_current_user($admins[0]->ID);
$builder::maybe_upgrade_faq();
$backup = get_post_meta($page->ID, '_layero_faq_backup_0_10_8', true);
faq_check($raw === ($backup['elementor_data'] ?? ''), 'Backs up the original Elementor data without alteration.');
$after = get_post_meta($page->ID, '_elementor_data', true);
faq_check(false !== strpos($after, 'layero_static_page') && false !== strpos($after, 'gyik'), 'Replaces the legacy FAQ with the current source-backed page.');
$builder::maybe_upgrade_faq();
faq_check($after === get_post_meta($page->ID, '_elementor_data', true), 'Migration is idempotent.');
faq_check($home_before === get_post_meta($home_id, '_elementor_data', true), 'Home page remains unchanged.');
$widget = \Elementor\Plugin::instance()->elements_manager->create_element_instance(array('id' => 'faqregression', 'elType' => 'widget', 'widgetType' => 'layero_static_page', 'settings' => array('page' => 'gyik'), 'elements' => array()));
ob_start(); $widget->print_element(); $html = ob_get_clean();
faq_check(20 === substr_count($html, '<details class="sh-faq-item"'), 'Renders all twenty questions on the server.');
faq_check(false !== strpos($html, 'id="sh-faq-q"') && false !== strpos($html, 'data-layero-page="gyik"'), 'Includes search and the WordPress initialization marker.');
faq_check(false !== strpos($html, home_url('/kapcsolat/')) && false === strpos($html, 'href="kapcsolat.html"'), 'Rewrites support links to WordPress routes.');
faq_check(false === strpos($html, 'layero-asset-0018.png') && false === strpos($html, 'consumers/odr'), 'Removes the oversized image and discontinued ODR link.');
echo 'Preview: ' . get_permalink($page) . PHP_EOL;
