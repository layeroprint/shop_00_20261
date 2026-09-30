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
    testimonials_check(3 === substr_count($html, '<article class="sh-review'), $case . ': three original reviews.');
    testimonials_check(1 === substr_count($html, 'lr-card--featured') && 1 === substr_count($html, 'lr-card--warm'), $case . ': reference card styles.');
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
