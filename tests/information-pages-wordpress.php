<?php
if (! defined('WP_CLI') || ! WP_CLI || 'layero_release_test' !== DB_NAME || ! in_array(parse_url(home_url(), PHP_URL_HOST), array('127.0.0.1', 'localhost'), true)) {
	throw new RuntimeException('Local QA fixture required.');
}
$builder = '\\LayeroShop\\Page_Builder';
$checks = 0;
$check = function ($ok, $label) use (&$checks) { if (! $ok) { throw new RuntimeException($label); } $checks++; };
$old_user = get_current_user_id();
$admins = get_users(array('role' => 'administrator', 'number' => 1));
wp_set_current_user($admins[0]->ID);
try {
	foreach (array('kapcsolat' => 'legacy_contact_data', 'rolunk' => 'legacy_about_data') as $slug => $method) {
		$page = get_page_by_path($slug);
		$created = ! $page;
		if ($created) { $page = get_post(wp_insert_post(array('post_type' => 'page', 'post_status' => 'publish', 'post_title' => 'QA ' . $slug, 'post_name' => $slug))); }
		$keys = array('_elementor_data', '_layero_information_revision', '_layero_information_backup_0_10_18');
		$saved = array();
		foreach ($keys as $key) { $saved[$key] = get_post_meta($page->ID, $key, false); delete_post_meta($page->ID, $key); }
		try {
			$legacy = (new ReflectionMethod($builder, $method))->invoke(null);
			$raw = wp_json_encode($legacy);
			update_post_meta($page->ID, '_elementor_data', wp_slash($raw));
			$builder::maybe_upgrade_information_pages();
			$check('0.10.18' === get_post_meta($page->ID, '_layero_information_revision', true), $slug . ' migration');
			$check($raw === get_post_meta($page->ID, '_layero_information_backup_0_10_18', true)['elementor_data'], $slug . ' lossless backup');
			$next = get_post_meta($page->ID, '_elementor_data', true);
			$check(false !== strpos($next, 'layero_static_page'), $slug . ' shared source');
			$builder::maybe_upgrade_information_pages();
			$check($next === get_post_meta($page->ID, '_elementor_data', true), $slug . ' idempotent');
			delete_post_meta($page->ID, '_layero_information_revision');
			delete_post_meta($page->ID, '_layero_information_backup_0_10_18');
			$legacy[0]['settings']['custom_css'] = 'selector { color: red; }';
			$edited = wp_json_encode($legacy);
			update_post_meta($page->ID, '_elementor_data', wp_slash($edited));
			$builder::maybe_upgrade_information_pages();
			$check($edited === get_post_meta($page->ID, '_elementor_data', true), $slug . ' customized layout preserved');
		} finally {
			foreach ($saved as $key => $values) { delete_post_meta($page->ID, $key); foreach ($values as $value) { add_post_meta($page->ID, $key, wp_slash($value)); } }
			if ($created) { wp_trash_post($page->ID); }
		}
	}
} finally { wp_set_current_user($old_user); }
echo $checks . " information-page migration checks passed.\n";
