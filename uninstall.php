<?php
/**
 * Uninstall handler.
 *
 * A plugin nem hoz létre saját táblát. Eltávolításkor a saját útvonal-opciót
 * és a Layero kedvencek user meta értékeit törli.
 */

if (! defined('WP_UNINSTALL_PLUGIN')) {
	exit;
}

delete_option('layero_shop_ui_account_routes');
wp_clear_scheduled_hook('layero_subscription_cleanup');
delete_metadata('user', 0, '_layero_favorite_products', '', true);
