<?php
// Run with WP-CLI only against the isolated local QA database.
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
    throw new RuntimeException('Local QA database required.');
}
function cleanup_check($ok, $label) {
    if (! $ok) { throw new RuntimeException($label); }
    echo 'PASS: ' . $label . PHP_EOL;
}

$builder = '\\LayeroShop\\Page_Builder';
$widgets = new ReflectionMethod($builder, 'faq_widgets');
$home = (new ReflectionMethod($builder, 'home_data'))->invoke(null);
$contact_data = (new ReflectionMethod($builder, 'contact_data'))->invoke(null);
$home_types = wp_list_pluck($widgets->invoke(null, $home), 'widgetType');
$contact_types = wp_list_pluck($widgets->invoke(null, $contact_data), 'widgetType');
cleanup_check(! in_array('layero_newsletter_banner', $home_types, true) && ! in_array('layero_footnotes', $home_types, true), 'New homepage omits both retired blocks.');
cleanup_check(! in_array('layero_gallery_strip', $home_types, true), 'New homepage omits the retired gallery strip.');
cleanup_check(! in_array('layero_newsletter_banner', $contact_types, true), 'New contact page omits the retired banner.');

$make_widget = new ReflectionMethod($builder, 'make_widget');
$wrap = new ReflectionMethod($builder, 'wrap_in_section');
$keep = $wrap->invoke(null, array($make_widget->invoke(null, 'html', array('html' => '<p>Preserved custom content</p>'))));
$banner = $wrap->invoke(null, array($make_widget->invoke(null, 'layero_newsletter_banner')));
$notes = $wrap->invoke(null, array($make_widget->invoke(null, 'layero_footnotes')));
$keep = json_decode(wp_json_encode($keep), true);
$legacy = array($keep, $banner, $notes);
$raw = wp_json_encode($legacy);
$old_front = get_option('page_on_front');
$old_show = get_option('show_on_front');
$old_user = get_current_user_id();
$find_page = new ReflectionMethod($builder, 'find_page');
$contact = $find_page->invoke(null, 'Kapcsolat');
$contact_revision = $contact ? get_post_meta($contact->ID, '_layero_obsolete_blocks_revision', true) : null;
$page_id = wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'QA obsolete blocks', 'post_name' => 'qa-obsolete-blocks'), true);
if (is_wp_error($page_id)) { throw new RuntimeException($page_id->get_error_message()); }
try {
    if ($contact && ! $contact_revision) { update_post_meta($contact->ID, '_layero_obsolete_blocks_revision', 'qa-skip'); }
    update_option('show_on_front', 'page');
    update_option('page_on_front', $page_id);
    update_post_meta($page_id, '_elementor_data', wp_slash($raw));
    $stored_raw = get_post_meta($page_id, '_elementor_data', true);
    wp_set_current_user(0);
    $builder::maybe_remove_obsolete_blocks();
    cleanup_check($stored_raw === get_post_meta($page_id, '_elementor_data', true), 'Anonymous request leaves the page untouched.');
    $admins = get_users(array('role' => 'administrator', 'number' => 1));
    wp_set_current_user($admins[0]->ID);
    $builder::maybe_remove_obsolete_blocks();
    $after = get_post_meta($page_id, '_elementor_data', true);
    cleanup_check(array($keep) === json_decode($after, true), 'Only the two obsolete sections are removed.');
    $backup = get_post_meta($page_id, '_layero_obsolete_blocks_backup', true);
    cleanup_check($stored_raw === ($backup['elementor_data'] ?? ''), 'Original Elementor data is backed up.');
    $builder::maybe_remove_obsolete_blocks();
    cleanup_check($after === get_post_meta($page_id, '_elementor_data', true), 'Migration is idempotent.');

    // The gallery upgrade must also run after the earlier block cleanup finished.
    $gallery = $make_widget->invoke(null, 'layero_gallery_strip');
    $custom = $make_widget->invoke(null, 'html', array('html' => '<p>Keep "quotes" and \\paths</p>'));
    $mixed = $wrap->invoke(null, array($gallery, $custom));
    $mixed_kept = $mixed;
    $mixed_kept['elements'][0]['elements'] = array($custom);
    $gallery_only = $wrap->invoke(null, array($gallery));
    $gallery_raw = wp_json_encode(array($keep, $gallery_only, $mixed));
    update_post_meta($page_id, '_elementor_data', wp_slash($gallery_raw));
    update_post_meta($page_id, '_elementor_element_cache', 'stale-cache');
    update_post_meta($page_id, '_elementor_css', array('time' => 1));
    $content_before = get_post($page_id)->post_content;
    wp_set_current_user(0);
    $builder::maybe_remove_home_gallery();
    cleanup_check($gallery_raw === get_post_meta($page_id, '_elementor_data', true), 'Anonymous request cannot remove the gallery.');
    wp_set_current_user($admins[0]->ID);
    update_option('show_on_front', 'posts');
    $builder::maybe_remove_home_gallery();
    cleanup_check($gallery_raw === get_post_meta($page_id, '_elementor_data', true), 'Posts homepage leaves the stored page untouched.');
    update_option('show_on_front', 'page');
    $builder::maybe_remove_home_gallery();
    $gallery_after = get_post_meta($page_id, '_elementor_data', true);
    $expected = json_decode(wp_json_encode(array($keep, $mixed_kept)), true);
    cleanup_check($expected === json_decode($gallery_after, true), 'Gallery and its empty section are removed; mixed sections and custom content survive.');
    $gallery_backup = get_post_meta($page_id, '_layero_home_gallery_backup', true);
    cleanup_check($gallery_raw === ($gallery_backup['elementor_data'] ?? '') && $content_before === ($gallery_backup['post_content'] ?? null), 'Separate gallery backup preserves original page data.');
    cleanup_check($backup === get_post_meta($page_id, '_layero_obsolete_blocks_backup', true), 'Earlier cleanup backup is preserved.');
    cleanup_check($content_before === get_post($page_id)->post_content, 'Page content is unchanged.');
    cleanup_check(! metadata_exists('post', $page_id, '_elementor_element_cache') && ! metadata_exists('post', $page_id, '_elementor_css'), 'Elementor caches are invalidated.');
    cleanup_check('1' === get_post_meta($page_id, '_layero_home_gallery_revision', true), 'Gallery upgrade records completion.');
    $builder::maybe_remove_home_gallery();
    cleanup_check($gallery_after === get_post_meta($page_id, '_elementor_data', true) && $gallery_backup === get_post_meta($page_id, '_layero_home_gallery_backup', true), 'Repeated gallery upgrade preserves the page and backup.');
} finally {
    update_option('page_on_front', $old_front);
    update_option('show_on_front', $old_show);
    wp_set_current_user($old_user);
    if ($contact && ! $contact_revision) { delete_post_meta($contact->ID, '_layero_obsolete_blocks_revision'); }
    wp_delete_post($page_id, true);
}
