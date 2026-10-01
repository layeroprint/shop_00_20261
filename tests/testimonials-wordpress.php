<?php
// Run only with WP-CLI against the isolated local QA database.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
function testimonials_check($ok, $label) {
    if (! $ok) { throw new RuntimeException($label); }
    echo 'PASS: ' . $label . PHP_EOL;
}
function testimonials_render($settings = array()) {
    static $id = 0;
    $widget = \Elementor\Plugin::instance()->elements_manager->create_element_instance(array('id' => 'testimonialsqa' . ++$id, 'elType' => 'widget', 'widgetType' => 'layero_testimonials', 'settings' => $settings, 'elements' => array()));
    ob_start(); $widget->print_element(); return ob_get_clean();
}
$defaults = \LayeroShop\Shop_Content::testimonials();
$legacy = $defaults;
foreach ($legacy as &$item) { unset($item['topic'], $item['card_style'], $item['product_icon']); }
unset($item);
foreach (array('fresh' => array(), 'legacy' => array('title' => 'Vásárlóink mondták. <span>1000+ elégedett vásárló.</span>', 'items' => $legacy)) as $case => $settings) {
    $html = testimonials_render($settings);
    $fresh = 'fresh' === $case;
    testimonials_check(($fresh ? 10 : 3) === substr_count($html, '<article class="sh-review'), $case . ': expected card count.');
    testimonials_check(($fresh ? 2 : 1) === substr_count($html, 'lr-card--featured') && ($fresh ? 4 : 1) === substr_count($html, 'lr-card--warm'), $case . ': reference card styles.');
    testimonials_check(($fresh ? 7 : 0) === substr_count($html, 'data-lr-sample') && ($fresh ? 7 : 0) === substr_count($html, 'Mintavélemény – kitalált szerző és értékelés'), $case . ': samples are clearly identified.');
    testimonials_check(false !== strpos($html, 'm7 4-3 11') && false !== strpos($html, 'width="14" height="15"'), $case . ': original product icons.');
    testimonials_check(1 === substr_count($html, 'elégedett vásárló'), $case . ': customer count is not repeated in the heading.');
    foreach ($defaults as $item) {
        testimonials_check(false !== strpos($html, esc_html($item['quote'])) && false !== strpos($html, esc_html($item['name'])), $case . ': original review text and author retained.');
    }
}
$custom = array_merge($legacy[0], array('topic' => '', 'card_style' => 'standard', 'product_icon' => 'sparkle', 'stars' => 3));
$html = testimonials_render(array('items' => array($custom), 'show_summary' => ''));
testimonials_check(false === strpos($html, 'lr-card--featured') && false === strpos($html, 'Névre szóló ajándék'), 'Explicit light style and empty topic are respected.');
testimonials_check(false === strpos($html, 'm7 4-3 11') && false === strpos($html, 'class="lr-summary"'), 'Selected product icon and disabled summary are respected.');
testimonials_check(false !== strpos($html, '3 / 5') && false !== strpos($html, '3 csillag az 5-ből') && 3 === substr_count($html, '<path fill="currentColor"') && 2 === substr_count($html, '<path fill="#b7c2c9"'), 'Visible stars, numeric rating and accessible label agree.');
$custom['name'] = '<script>example</script>';
$custom['quote'] = '<img src=x onerror=example>';
$html = testimonials_render(array('items' => array($custom)));
testimonials_check(false === strpos($html, '<script>example') && false === strpos($html, '<img src=x') && false !== strpos($html, esc_html($custom['quote'])), 'Editor text is escaped.');
testimonials_check(false === strpos(testimonials_render(array('items' => array())), 'data-lyr-testimonials'), 'An intentionally empty repeater does not restore example reviews.');

$samples = \LayeroShop\Shop_Content::testimonial_samples();
$static = file_get_contents(dirname(__DIR__) . '/assets/static/index.html');
foreach ($samples as $sample) {
    testimonials_check(false !== strpos($static, $sample['quote']) && false !== strpos($static, $sample['name']) && false !== strpos($static, $sample['topic']), 'Sample matches the existing static homepage: ' . $sample['name']);
}
$samples[0]['topic'] = '';
$html = testimonials_render(array('items' => array($samples[0])));
testimonials_check(false !== strpos($html, 'class="lr-topic">Minta</span>') && false !== strpos($html, 'data-lr-sample'), 'A cleared sample topic retains a visible sample label.');
$samples[0]['topic'] = '<img src=x onerror=example>';
$html = testimonials_render(array('items' => array($samples[0])));
testimonials_check(false !== strpos($html, 'Minta · &lt;img') && false === strpos($html, '<img src=x'), 'Edited sample topics remain labelled and escaped.');

// Exercise the same targeted upgrade used by the live homepage.
$builder = '\\LayeroShop\\Page_Builder';
$old_front = get_option('page_on_front');
$old_show = get_option('show_on_front');
$old_user = get_current_user_id();
$page_id = wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'QA testimonial upgrade', 'post_content' => 'Preserve page content'), true);
if (is_wp_error($page_id)) { throw new RuntimeException($page_id->get_error_message()); }
$admins = get_users(array('role' => 'administrator', 'number' => 1));
try {
    $legacy[0]['_id'] = 'original1';
    $legacy[0]['topic'] = '';
    $legacy[0]['card_style'] = 'standard';
    $widget = array('id' => 'reviews', 'elType' => 'widget', 'widgetType' => 'layero_testimonials', 'settings' => array('title' => 'Keep custom title', 'items' => $legacy), 'elements' => array());
    $custom_widget = array('id' => 'custom', 'elType' => 'widget', 'widgetType' => 'html', 'settings' => array('html' => '<p>Keep "quotes" and \\paths</p>'), 'elements' => array());
    $data = array(array('id' => 'section', 'elType' => 'section', 'settings' => array('padding' => array('top' => '17')), 'elements' => array($custom_widget, $widget)));
    $raw = wp_json_encode($data);
    update_option('show_on_front', 'page');
    update_option('page_on_front', $page_id);
    update_post_meta($page_id, '_elementor_data', wp_slash($raw));
    update_post_meta($page_id, '_elementor_element_cache', 'old');
    update_post_meta($page_id, '_elementor_css', array('time' => 1));
    wp_set_current_user(0);
    $builder::maybe_upgrade_home_testimonials();
    testimonials_check($raw === get_post_meta($page_id, '_elementor_data', true), 'Anonymous request cannot upgrade homepage data.');
    wp_set_current_user($admins[0]->ID);
    update_option('show_on_front', 'posts');
    $builder::maybe_upgrade_home_testimonials();
    testimonials_check($raw === get_post_meta($page_id, '_elementor_data', true), 'Posts homepage leaves the stored page untouched.');
    update_option('show_on_front', 'page');
    $builder::maybe_upgrade_home_testimonials();
    $after = get_post_meta($page_id, '_elementor_data', true);
    $updated = json_decode($after, true);
    $items = $updated[0]['elements'][1]['settings']['items'];
    testimonials_check(10 === count($items) && $legacy === array_slice($items, 0, 3), 'Upgrade appends seven samples and preserves all original item settings and IDs.');
    $restored = $updated;
    $restored[0]['elements'][1]['settings']['items'] = $legacy;
    testimonials_check($data === $restored, 'Other widgets, layout and testimonial title remain unchanged.');
    testimonials_check('Preserve page content' === get_post($page_id)->post_content, 'Page content remains unchanged.');
    $backup = get_post_meta($page_id, '_layero_home_testimonials_backup', true);
    testimonials_check($raw === ($backup['elementor_data'] ?? '') && 'Preserve page content' === ($backup['post_content'] ?? null), 'Original homepage data is backed up before the upgrade.');
    testimonials_check(! metadata_exists('post', $page_id, '_elementor_element_cache') && ! metadata_exists('post', $page_id, '_elementor_css'), 'Elementor caches are invalidated.');
    testimonials_check('1' === get_post_meta($page_id, '_layero_home_testimonials_revision', true), 'Upgrade records completion.');
    testimonials_check(7 === substr_count(testimonials_render(array('items' => $items)), 'data-lr-sample'), 'Migrated samples render with their sample labels.');
    $builder::maybe_upgrade_home_testimonials();
    testimonials_check($after === get_post_meta($page_id, '_elementor_data', true) && $backup === get_post_meta($page_id, '_layero_home_testimonials_backup', true), 'Repeated upgrade preserves the page and its first backup.');

    $edited_quote = $legacy; $edited_quote[0]['quote'] = 'Owner-edited review';
    $edited_rating = $legacy; $edited_rating[0]['stars'] = 4;
    $reordered = array_reverse($legacy);
    foreach (array('custom quote' => $edited_quote, 'custom rating' => $edited_rating, 'custom order' => $reordered, 'empty list' => array(), 'already ten cards' => $items) as $case => $case_items) {
        delete_post_meta($page_id, '_layero_home_testimonials_revision');
        delete_post_meta($page_id, '_layero_home_testimonials_backup');
        $data[0]['elements'][1]['settings']['items'] = $case_items;
        $case_raw = wp_json_encode($data);
        update_post_meta($page_id, '_elementor_data', wp_slash($case_raw));
        $builder::maybe_upgrade_home_testimonials();
        testimonials_check($case_raw === get_post_meta($page_id, '_elementor_data', true) && ! metadata_exists('post', $page_id, '_layero_home_testimonials_backup'), 'Upgrade skips ' . $case . '.');
    }
} finally {
    update_option('page_on_front', $old_front);
    update_option('show_on_front', $old_show);
    wp_set_current_user($old_user);
    wp_delete_post($page_id, true);
}
