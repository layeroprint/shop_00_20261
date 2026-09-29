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
    hero_check(3 === substr_count($html, '<source media="(max-width: 820px)"') && false !== strpos($html, 'sh-slider--lifestyle'), $case . ': mobile artwork and mixed slider styling.');
}
$lifestyle[0]['title'] = 'Saját szerkesztett kampány';
$html = hero_render(array('slides' => $lifestyle));
hero_check(3 === substr_count($html, '<article class="sh-slide ') && false !== strpos($html, $lifestyle[0]['title']), 'Custom campaign is not overwritten by migration.');
$old[0]['image'] = array('url' => home_url('/custom.webp'));
hero_check(7 === substr_count(hero_render(array('slides' => $old)), '<article class="sh-slide '), 'Custom legacy media prevents migration.');
