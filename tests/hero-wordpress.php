<?php
// Run with WP-CLI only against the isolated local QA database.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
function hero_check($ok, $label) {
    if (! $ok) { throw new RuntimeException($label); }
    echo 'PASS: ' . $label . PHP_EOL;
}
function hero_widget($settings = array()) {
    return \Elementor\Plugin::instance()->elements_manager->create_element_instance(array('id' => 'heroregression', 'elType' => 'widget', 'widgetType' => 'layero_hero_slider', 'settings' => $settings, 'elements' => array()));
}
function hero_render($settings = array()) {
    ob_start(); hero_widget($settings)->print_element(); return ob_get_clean();
}
$widget = hero_widget();
$old = (new ReflectionMethod($widget, 'legacy_default_slides'))->invoke($widget);
$lifestyle = (new ReflectionMethod($widget, 'lifestyle_slides'))->invoke($widget);
foreach (array('fresh' => array(), '0.10.3' => array('slides' => $lifestyle), 'legacy' => array('slides' => $old)) as $case => $settings) {
    $html = hero_render($settings);
    hero_check(5 === substr_count($html, '<article class="sh-slide '), $case . ': five slides.');
    hero_check(strpos($html, $old[0]['title']) < strpos($html, $old[1]['title']) && strpos($html, $old[1]['title']) < strpos($html, $lifestyle[0]['title']), $case . ': original lamp and fan copy precede lifestyle scenes.');
    hero_check(false !== strpos($html, 'data-lamp-ba') && false !== strpos($html, 'data-spot'), $case . ': both original interactive widgets retained.');
    $tags = new WP_HTML_Tag_Processor($html);
    $mobile_sources = 0; $deferred_images = 0; $eager_images = 0;
    while ($tags->next_tag()) {
        if ('SOURCE' === $tags->get_tag() && '(max-width: 820px)' === $tags->get_attribute('media')) {
            $mobile_sources++;
            hero_check(! $tags->get_attribute('srcset') && $tags->get_attribute('data-slide-srcset'), $case . ': hidden mobile source waits for selection.');
        }
        if ('IMG' === $tags->get_tag()) {
            if ($tags->get_attribute('data-slide-src')) {
                $deferred_images++;
                hero_check(! $tags->get_attribute('src') && ! $tags->get_attribute('srcset'), $case . ': deferred image has no downloadable source before selection.');
            }
            elseif (0 === strpos((string) $tags->get_attribute('src'), 'http')) { $eager_images++; }
        }
    }
    hero_check(3 === $mobile_sources && false !== strpos($html, 'sh-slider--lifestyle'), $case . ': mobile artwork and mixed slider styling.');
    hero_check(7 === $deferred_images && 2 === $eager_images, $case . ': only the first comparison images load immediately.');
}
$lifestyle[0]['title'] = 'Saját szerkesztett kampány';
$html = hero_render(array('slides' => $lifestyle));
hero_check(3 === substr_count($html, '<article class="sh-slide ') && false !== strpos($html, $lifestyle[0]['title']), 'Custom campaign is not overwritten by migration.');
$old[0]['image'] = array('url' => home_url('/custom.webp'));
hero_check(7 === substr_count(hero_render(array('slides' => $old)), '<article class="sh-slide '), 'Custom legacy media prevents migration.');

// A gyorssáv visszaállítása kizárólag elkülönített helyi próbaoldalon történik.
$builder = '\LayeroShop\Page_Builder';
$home_data = (new ReflectionMethod($builder, 'home_data'))->invoke(null);
$home_types = wp_list_pluck((new ReflectionMethod($builder, 'faq_widgets'))->invoke(null, $home_data), 'widgetType');
hero_check(array_slice($home_types, 0, 3) === array('layero_hero_slider', 'layero_whofor', 'layero_trust_bar'), 'New homepage places gift navigation directly after the hero.');
$original_front = get_option('page_on_front');
$original_show = get_option('show_on_front');
$original_user = get_current_user_id();
$test_page = wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'QA ajándék gyorssáv', 'post_name' => 'qa-ajandek-gyorssav'));
$legacy = $home_data;
array_splice($legacy, 1, 1);
$legacy[0]['elements'][0]['elements'][0]['settings'] = array('autoplay_speed' => 0, 'hero_style' => 'studio');
$raw = wp_json_encode($legacy);
try {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $test_page);
    update_post_meta($test_page, '_elementor_data', wp_slash($raw));
    $raw = get_post_meta($test_page, '_elementor_data', true);
    wp_set_current_user(0);
    $builder::maybe_restore_home_whofor();
    hero_check($raw === get_post_meta($test_page, '_elementor_data', true), 'Anonymous request cannot restore or change homepage content.');
    $admins = get_users(array('role' => 'administrator', 'number' => 1));
    wp_set_current_user($admins[0]->ID);
    $builder::maybe_restore_home_whofor();
    $after = get_post_meta($test_page, '_elementor_data', true);
    $data = json_decode($after, true);
    $siblings = $data[0]['elements'][0]['elements'];
    hero_check('layero_whofor' === $siblings[1]['widgetType'], 'Navigation is the immediate next element after the existing hero.');
    array_splice($data[0]['elements'][0]['elements'], 1, 1);
    hero_check($data === json_decode($raw, true), 'All existing widgets, IDs, settings and content are preserved.');
    $backup = get_post_meta($test_page, '_layero_home_whofor_backup', true);
    hero_check($backup['elementor_data'] === $raw, 'Original Elementor data is backed up exactly.');
    $builder::maybe_restore_home_whofor();
    hero_check($after === get_post_meta($test_page, '_elementor_data', true), 'Repeated migration does not duplicate the bar.');
    delete_post_meta($test_page, '_layero_home_whofor_revision');
    $builder::maybe_restore_home_whofor();
    hero_check($after === get_post_meta($test_page, '_elementor_data', true), 'An existing gift navigation is retained without duplication.');
    $nav_widget = \Elementor\Plugin::instance()->elements_manager->create_element_instance($siblings[1]);
    ob_start(); $nav_widget->print_element(); $nav_html = ob_get_clean();
    hero_check(7 === substr_count($nav_html, '<a ') && false !== strpos($nav_html, 'Nem tudom — kvíz'), 'All six gift links and the quiz link render.');
    hero_check(false !== strpos($nav_html, '/termekek/?cat=rajongoi') && false !== strpos($nav_html, '/kviz/'), 'Gift links retain the filtered catalogue and quiz destinations.');
    update_post_meta($test_page, '_elementor_data', wp_slash(wp_json_encode(array_slice($legacy, 1))));
    $without_hero = get_post_meta($test_page, '_elementor_data', true);
    $builder::maybe_restore_home_whofor();
    hero_check($without_hero === get_post_meta($test_page, '_elementor_data', true), 'A page without the Layero hero is not modified.');
} catch (\Throwable $error) {
    $test_error = $error;
} finally {
    update_option('page_on_front', $original_front);
    update_option('show_on_front', $original_show);
    wp_set_current_user($original_user);
    wp_delete_post($test_page, true);
}
if (isset($test_error)) { WP_CLI::error($test_error->getMessage()); }
