<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class Page_Builder {

	private static $id_counter = 0;

	public static function init() {
		add_action('init', array(__CLASS__, 'maybe_ensure_required_pages'), 20);
		add_action('admin_init', array(__CLASS__, 'maybe_upgrade_faq'));
		add_action('admin_init', array(__CLASS__, 'maybe_upgrade_catalog'));
		add_action('admin_init', array(__CLASS__, 'maybe_upgrade_information_pages'));
		add_action('admin_init', array(__CLASS__, 'maybe_restore_home_whofor'));
		add_action('admin_init', array(__CLASS__, 'maybe_remove_obsolete_blocks'));
		add_action('admin_init', array(__CLASS__, 'maybe_remove_home_gallery'));
		add_action('admin_init', array(__CLASS__, 'maybe_upgrade_home_testimonials'));
		add_filter('wp_robots', array(__CLASS__, 'legal_draft_robots'));
		add_filter('elementor/maintenance_mode/is_login_page', array(__CLASS__, 'allow_legal_pages'));
		add_filter('woocommerce_coming_soon_exclude', array(__CLASS__, 'allow_legal_pages'));
		add_action('admin_action_layero_build_pages', array(__CLASS__, 'handle_build'));
		add_action('admin_notices', array(__CLASS__, 'admin_notice'));
		add_action('admin_menu', array(__CLASS__, 'admin_menu'));
	}

	public static function admin_menu() {
		add_submenu_page(
			null,
			'Layero oldalak építése',
			'Layero Build',
			'manage_options',
			'layero-build-pages',
			array(__CLASS__, 'admin_page')
		);
	}

	public static function admin_page() {
		$pages = self::page_definitions();
		?>
		<div class="wrap">
			<h1>Layero Shop — Oldalak építése</h1>
			<p>Ez a művelet felépíti az összes Layero Shop oldalt az Elementor szerkesztőben, a Layero widgetekkel.</p>
			<p><strong>Figyelem:</strong> a meglévő Elementor-tartalom felülíródik!</p>
			<table class="widefat striped" style="max-width:600px;margin:16px 0;">
				<thead><tr><th>Oldal</th><th>Állapot</th></tr></thead>
				<tbody>
				<?php foreach ($pages as $cfg) :
					$post = self::find_page($cfg['title']);
				?>
					<tr>
						<td><?php echo esc_html($cfg['title']); ?></td>
						<td><?php echo $post ? 'Megtalálva (ID: ' . $post->ID . ')' : '<span style="color:red;">Nem található</span>'; ?></td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
			<form method="post" action="<?php echo esc_url(admin_url('admin.php')); ?>">
				<input type="hidden" name="action" value="layero_build_pages">
				<?php wp_nonce_field('layero_build_pages'); ?>
				<p><button type="submit" class="button button-primary button-hero">Oldalak felépítése most</button></p>
			</form>
		</div>
		<?php
	}

	public static function handle_build() {
		if (! current_user_can('manage_options')) {
			wp_die('Nincs jogosultságod.');
		}
		check_admin_referer('layero_build_pages');

		$results = self::build_all();

		set_transient('layero_build_results', $results, 120);
		wp_safe_redirect(admin_url('edit.php?post_type=page&layero_built=1'));
		exit;
	}

	public static function admin_notice() {
		if (empty($_GET['layero_built'])) {
			return;
		}
		$results = get_transient('layero_build_results');
		if (! $results) {
			return;
		}
		delete_transient('layero_build_results');

		echo '<div class="notice notice-success is-dismissible"><p><strong>Layero oldalak felépítve:</strong></p><ul>';
		foreach ($results as $title => $status) {
			echo '<li>' . esc_html($title) . ': ' . esc_html($status) . '</li>';
		}
		echo '</ul></div>';
	}

	public static function build_all() {
		$results = array();

		foreach (self::page_definitions() as $cfg) {
			$post = self::find_page($cfg['title']);
			if (! $post) {
				$results[$cfg['title']] = 'Nem található';
				continue;
			}

			$data = call_user_func(array(__CLASS__, $cfg['method']));
			self::set_elementor_data($post->ID, $data);
			update_post_meta($post->ID, '_wp_page_template', 'elementor_canvas');

			if ('publish' !== $post->post_status) {
				wp_update_post(array('ID' => $post->ID, 'post_status' => 'publish'));
			}

			$results[$cfg['title']] = 'OK (ID: ' . $post->ID . ')';
		}

		if (class_exists('\Elementor\Plugin')) {
			\Elementor\Plugin::$instance->files_manager->clear_cache();
		}

		return $results;
	}

	/** Privacy and terms must remain accessible from the launch subscription form. */
	public static function allow_legal_pages($allowed) {
		return $allowed || is_page(array('aszf', 'adatvedelem'));
	}

	public static function maybe_ensure_required_pages() {
		$option_name = 'layero_shop_ui_required_pages_version';
		if (LAYERO_SHOP_UI_VERSION === get_option($option_name)) {
			return;
		}

		$created = false;
		$complete = true;

		foreach (self::page_definitions() as $cfg) {
			if (empty($cfg['ensure']) || empty($cfg['slug'])) {
				continue;
			}

			if (self::find_page_by_slug($cfg['slug'])) {
				continue;
			}

			$post_id = wp_insert_post(
				array(
					'post_type' => 'page',
					'post_status' => 'publish',
					'post_title' => $cfg['title'],
					'post_name' => $cfg['slug'],
					'post_content' => '',
				),
				true
			);

			if (is_wp_error($post_id) || ! $post_id) {
				$complete = false;
				continue;
			}

			$data = call_user_func(array(__CLASS__, $cfg['method']));
			self::set_elementor_data($post_id, $data);
			update_post_meta($post_id, '_wp_page_template', 'elementor_canvas');
			update_post_meta($post_id, '_layero_auto_created', LAYERO_SHOP_UI_VERSION);

			if (! empty($cfg['legal_draft'])) {
				update_post_meta($post_id, '_layero_legal_draft', '1');
			}

			$created = true;
		}

		if ($created) {
			flush_rewrite_rules(false);
			if (class_exists('\Elementor\Plugin')) {
				\Elementor\Plugin::$instance->files_manager->clear_cache();
			}
		}

		if ($complete) {
			update_option($option_name, LAYERO_SHOP_UI_VERSION, false);
		}
	}

	public static function legal_draft_robots($robots) {
		if (function_exists('is_page') && is_page()) {
			$post_id = get_queried_object_id();
			if ($post_id && get_post_meta($post_id, '_layero_legal_draft', true)) {
				$robots['noindex'] = true;
				$robots['nofollow'] = true;
			}
		}

		return $robots;
	}

	/* ──────────────────────────────────────────────────────────────
	   Page definitions
	   ────────────────────────────────────────────────────────────── */

	private static function page_definitions() {
		return array(
			array('title' => 'Layero Kezdőlap', 'method' => 'home_data'),
			array('title' => 'Rólunk', 'method' => 'about_data'),
			array('title' => 'Gyakori kérdések', 'method' => 'faq_data'),
			array('title' => 'Termékek', 'method' => 'catalog_data'),
			array('title' => 'Kapcsolat', 'method' => 'contact_data'),
			array('title' => 'Ajándékkereső', 'method' => 'quiz_data'),
			array('title' => 'Kedvencek', 'method' => 'favorites_data'),
			array('title' => '404', 'method' => 'error_404_data'),
			array('title' => 'Egyedi rendelés', 'slug' => 'egyedi-rendeles', 'method' => 'custom_order_data', 'ensure' => true),
			array('title' => 'Cégeknek', 'slug' => 'cegeknek', 'method' => 'corporate_data', 'ensure' => true),
			array('title' => 'Kosár', 'method' => 'cart_data'),
			array('title' => 'Pénztár', 'method' => 'checkout_data'),
			array('title' => 'Fiókom', 'method' => 'account_data'),
			array('title' => 'Általános Szerződési Feltételek', 'slug' => 'aszf', 'method' => 'terms_data', 'ensure' => true, 'legal_draft' => true),
			array('title' => 'Adatvédelmi tájékoztató', 'slug' => 'adatvedelem', 'method' => 'privacy_data', 'ensure' => true, 'legal_draft' => true),
		);
	}

	/* ──────────────────────────────────────────────────────────────
	   HOME — Layero widgets
	   ────────────────────────────────────────────────────────────── */

	private static function home_data() {
		$widgets = array(
			'layero_hero_slider',
			'layero_whofor',
			'layero_trust_bar',
			'layero_value_marquee',
			'layero_category_bento',
			'layero_process_steps',
			'layero_product_grid',
			'layero_quiz_cta',
			'layero_product_spotlight',
			'layero_product_carousel',
			'layero_why_layero',
			'layero_testimonials',
			'layero_custom_cta',
			'layero_why_shop',
		);

		$sections = array();
		foreach ($widgets as $type) {
			$settings = 'layero_hero_slider' === $type
				? array('title_tag' => 'h1')
				: array();
			$sections[] = self::wrap_in_section(array(self::make_widget($type, $settings)));
		}

		return $sections;
	}

	/** Restore the missing gift navigation without replacing the existing homepage. */
	public static function maybe_restore_home_whofor() {
		if (! current_user_can('manage_options') || 'page' !== get_option('show_on_front')) { return; }
		$page = get_post((int) get_option('page_on_front'));
		if (! $page || 'page' !== $page->post_type || get_post_meta($page->ID, '_layero_home_whofor_revision', true)) { return; }
		$raw = get_post_meta($page->ID, '_elementor_data', true);
		$data = json_decode($raw, true);
		if (! is_array($data)) { return; }
		$types = wp_list_pluck(self::faq_widgets($data), 'widgetType');
		if (1 !== count(array_keys($types, 'layero_hero_slider', true)) || in_array('layero_whofor', $types, true) || false !== strpos($raw, 'sh-whofor')) { return; }
		if (! self::insert_home_whofor($data)) { return; }
		$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
		if (! add_post_meta($page->ID, '_layero_home_whofor_backup', wp_slash($backup), true)) { return; }
		update_post_meta($page->ID, '_elementor_data', wp_slash(wp_json_encode($data)));
		delete_post_meta($page->ID, '_elementor_element_cache');
		delete_post_meta($page->ID, '_elementor_css');
		if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) {
			(new \Elementor\Core\Files\CSS\Post($page->ID))->delete();
		}
		clean_post_cache($page->ID);
		update_post_meta($page->ID, '_layero_home_whofor_revision', '1');
	}

	private static function insert_home_whofor(&$elements) {
		foreach ($elements as $index => &$element) {
			if ('layero_hero_slider' === ($element['widgetType'] ?? '')) {
				array_splice($elements, $index + 1, 0, array(self::make_widget('layero_whofor')));
				return true;
			}
			if (! empty($element['elements']) && self::insert_home_whofor($element['elements'])) { return true; }
		}
		return false;
	}

	/** Remove the retired banner and home footnotes from existing Elementor pages. */
	public static function maybe_remove_obsolete_blocks() {
		if (! current_user_can('manage_options')) { return; }
		$pages = array();
		if ('page' === get_option('show_on_front')) {
			$pages[(int) get_option('page_on_front')] = array('layero_newsletter_banner', 'layero_footnotes');
		}
		$contact = self::find_page('Kapcsolat');
		if ($contact) { $pages[$contact->ID] = array('layero_newsletter_banner'); }

		foreach ($pages as $post_id => $types) {
			$page = get_post($post_id);
			if (! $page || 'page' !== $page->post_type || get_post_meta($post_id, '_layero_obsolete_blocks_revision', true)) { continue; }
			$raw = get_post_meta($post_id, '_elementor_data', true);
			$data = json_decode($raw, true);
			if (! is_array($data)) { continue; }
			$removed = 0;
			$updated = self::without_widgets($data, $types, $removed);
			if (! $removed) { continue; }
			$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
			if (! get_post_meta($post_id, '_layero_obsolete_blocks_backup', true)
				&& ! add_post_meta($post_id, '_layero_obsolete_blocks_backup', wp_slash($backup), true)) { continue; }
			if (! update_post_meta($post_id, '_elementor_data', wp_slash(wp_json_encode($updated)))) { continue; }
			delete_post_meta($post_id, '_elementor_element_cache');
			delete_post_meta($post_id, '_elementor_css');
			if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) {
				(new \Elementor\Core\Files\CSS\Post($post_id))->delete();
			}
			clean_post_cache($post_id);
			update_post_meta($post_id, '_layero_obsolete_blocks_revision', '1');
		}
	}

	/** Remove only the retired homepage gallery, preserving a separate recovery snapshot. */
	public static function maybe_remove_home_gallery() {
		if (! current_user_can('manage_options') || 'page' !== get_option('show_on_front')) { return; }
		$post_id = (int) get_option('page_on_front');
		$page = get_post($post_id);
		if (! $page || 'page' !== $page->post_type || get_post_meta($post_id, '_layero_home_gallery_revision', true)) { return; }
		$raw = get_post_meta($post_id, '_elementor_data', true);
		$data = json_decode($raw, true);
		if (! is_array($data)) { return; }
		$removed = 0;
		$updated = self::without_widgets($data, array('layero_gallery_strip'), $removed);
		if (! $removed) { return; }
		$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
		if (! get_post_meta($post_id, '_layero_home_gallery_backup', true)
			&& ! add_post_meta($post_id, '_layero_home_gallery_backup', wp_slash($backup), true)) { return; }
		if (! update_post_meta($post_id, '_elementor_data', wp_slash(wp_json_encode($updated)))) { return; }
		delete_post_meta($post_id, '_elementor_element_cache');
		delete_post_meta($post_id, '_elementor_css');
		if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) {
			(new \Elementor\Core\Files\CSS\Post($post_id))->delete();
		}
		clean_post_cache($post_id);
		update_post_meta($post_id, '_layero_home_gallery_revision', '1');
	}

	/** Append the requested samples only to the known three-item homepage list. */
	public static function maybe_upgrade_home_testimonials() {
		if (! current_user_can('manage_options') || 'page' !== get_option('show_on_front')) { return; }
		$post_id = (int) get_option('page_on_front');
		$page = get_post($post_id);
		if (! $page || 'page' !== $page->post_type || get_post_meta($post_id, '_layero_home_testimonials_revision', true)) { return; }
		$raw = get_post_meta($post_id, '_elementor_data', true);
		$data = json_decode($raw, true);
		if (! is_array($data) || ! self::append_home_testimonial_samples($data)) { return; }
		$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
		if (! get_post_meta($post_id, '_layero_home_testimonials_backup', true)
			&& ! add_post_meta($post_id, '_layero_home_testimonials_backup', wp_slash($backup), true)) { return; }
		if (! update_post_meta($post_id, '_elementor_data', wp_slash(wp_json_encode($data)))) { return; }
		delete_post_meta($post_id, '_elementor_element_cache');
		delete_post_meta($post_id, '_elementor_css');
		if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) {
			(new \Elementor\Core\Files\CSS\Post($post_id))->delete();
		}
		clean_post_cache($post_id);
		update_post_meta($post_id, '_layero_home_testimonials_revision', '1');
	}

	private static function append_home_testimonial_samples(&$elements) {
		$changed = false;
		$defaults = Shop_Content::testimonials();
		foreach ($elements as &$element) {
			if ('layero_testimonials' === ($element['widgetType'] ?? '')) {
				$items = $element['settings']['items'] ?? null;
				$matches = is_array($items) && 3 === count($items);
				if ($matches) {
					foreach (array_values($items) as $index => $item) {
						foreach (array('name', 'quote', 'meta') as $key) {
							if (($item[$key] ?? '') !== $defaults[$index][$key]) { $matches = false; }
						}
						if (5 !== (int) ($item['stars'] ?? 5) || 'yes' === ($item['is_sample'] ?? '')) { $matches = false; }
					}
				}
				if ($matches) {
					foreach (Shop_Content::testimonial_samples() as $index => $sample) {
						$sample['_id'] = 'sample' . ($index + 4);
						$element['settings']['items'][] = $sample;
					}
					$changed = true;
				}
			}
			if (! empty($element['elements']) && self::append_home_testimonial_samples($element['elements'])) { $changed = true; }
		}
		return $changed;
	}

	private static function without_widgets($elements, $types, &$removed) {
		$kept = array();
		foreach ($elements as $element) {
			if (in_array($element['widgetType'] ?? '', $types, true)) { $removed++; continue; }
			if (isset($element['elements']) && is_array($element['elements'])) {
				$had_children = ! empty($element['elements']);
				$element['elements'] = self::without_widgets($element['elements'], $types, $removed);
				if ($had_children && ! $element['elements']) { continue; }
			}
			$kept[] = $element;
		}
		return $kept;
	}
	/* ──────────────────────────────────────────────────────────────
	   RÓLUNK (About)
	   ────────────────────────────────────────────────────────────── */
	private static function about_data() {
		return self::information_page('rolunk');
	}

	private static function legacy_about_data() {
		$asset = self::asset_url();
		$sections = array();

		$sections[] = self::html_section(
			'<section class="sh-page-hd"><div class="shop-wrap">' .
			'<nav class="sh-crumbs" aria-label="Morzsamenü"><a href="/">Shop</a><span aria-hidden="true">/</span><span>Rólunk</span></nav>' .
			'<h1>Rólad szól, rétegről rétegre.</h1>' .
			'<p>A Layero egy szatmárnémeti 3D nyomtató műhely. Olyan ajándékokat és dekorációkat készítünk, amelyek egy konkrét emberről, pillanatról vagy történetről szólnak — nem tömegtermék, hanem személyes darab.</p>' .
			'</div></section>'
		);

		$sections[] = self::html_section(
			'<section class="sh-band sh-band--tight"><div class="shop-wrap sh-about">' .
			'<div class="sh-about__text">' .
			'<h2 class="sh-h2">Hogyan kezdődött?</h2>' .
			'<p>Egyetlen névre szóló lámpával kezdődött, amit ajándékba készítettünk. Annyi kérdés jött rá, hogy hamar kiderült: az embereknek nem még egy tárgy kell, hanem valami, ami tényleg róluk vagy a szeretteikről szól.</p>' .
			'<p>Azóta több száz egyedi darabot terveztünk és gyártottunk — szám-lámpáktól ballagási emlékeken át céges QR-displayekig. A legjobb ötleteink többsége nem a katalógusból, hanem egy-egy vásárló fejéből származik.</p>' .
			'<p>Minden darabot rendelésre készítünk, így nincs raktári túltermelés és felesleges hulladék. A műhelyünk áramát napelemek adják, az alapanyagunk pedig PLA biopolimer — növényi alapú, lebomló anyag.</p>' .
			'</div>' .
			'<figure class="sh-about__img"><img src="' . $asset . 'termekvilag/hero_slider/layero-asset-0009.png" alt="Világító, névre szóló Layero lámpa"></figure>' .
			'</div></section>'
		);

		$sections[] = self::html_section(
			'<section class="sh-band sh-band--tight sh-band--gray"><div class="shop-wrap">' .
			'<div class="sh-stats">' .
			'<div class="sh-stat"><b>500+</b><span>egyedi legyártott darab</span></div>' .
			'<div class="sh-stat"><b>1000+</b><span>elégedett vásárló</span></div>' .
			'<div class="sh-stat"><b>4.9</b><span>átlagos értékelés</span></div>' .
			'<div class="sh-stat"><b>~0</b><span>CO₂ a gyártásban¹</span></div>' .
			'</div></div></section>'
		);

		$sections[] = self::html_section(
			'<section class="sh-band sh-band--tight"><div class="shop-wrap">' .
			'<div class="sh-section-hd"><h2 class="sh-h2">Amiben hiszünk.</h2></div>' .
			'<div class="sh-values">' .
			'<article class="sh-value"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v6c0 5 3.8 8 9 9 5.2-1 9-4 9-9V7l-9-5Z"/><path d="m9 12 2 2 4-4"/></svg><h3>Személyes, nem tömeggyártott</h3><p>Minden darab egy konkrét emberről vagy pillanatról szól. Ami neked számít, azt tesszük a középpontba.</p></article>' .
			'<article class="sh-value"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg><h3>Fenntartható gyártás</h3><p>Napelemes energia, növényi alapú PLA, rendelésre gyártás — kevesebb hulladék, közel nulla kibocsátás.</p></article>' .
			'<article class="sh-value"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg><h3>Emberi ügyfélszolgálat</h3><p>Nálunk nem chatbot vár. Végigkísérünk az ötlettől a kész darabig, és minden reklamációt emberi módon kezelünk.</p></article>' .
			'<article class="sh-value"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><h3>Korrekt határidők</h3><p>Reális gyártási időt mondunk, és tartjuk. Ha csúszna valami, időben szólunk — meglepetés nélkül.</p></article>' .
			'</div></div></section>'
		);

		$sections[] = self::html_section(
			'<section class="sh-band sh-band--tight sh-band--gray"><div class="shop-wrap">' .
			'<div class="sh-section-hd"><h2 class="sh-h2">Így dolgozunk.</h2></div>' .
			'<ol class="sh-steps">' .
			'<li><span>1</span><div><b>Ötlet</b>Kiválasztasz egy terméket vagy leírod a saját ötleted — képpel, vázlattal, ahogy kényelmes.</div></li>' .
			'<li><span>2</span><div><b>Terv</b>E-mailben egyeztetjük és véglegesítjük a részleteket. Módosítás az árban.</div></li>' .
			'<li><span>3</span><div><b>Gyártás</b>A jóváhagyott terv alapján kinyomtatjuk és összeszereljük a darabot a műhelyünkben.</div></li>' .
			'<li><span>4</span><div><b>Kézbesítés</b>Gondosan becsomagolva, nyomon követhető csomagként küldjük — 1–3 munkanap a gyártás után.</div></li>' .
			'</ol></div></section>'
		);

		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_cta', array(
			'title' => 'Van egy ötleted? Legyártjuk neked.',
			'text' => 'Küldj egy leírást vagy referenciaképet — megtervezzük és kinyomtatjuk, ajánlatkéréstől a kész darabig.',
			'button_text' => 'Egyedi rendelést indítok',
			'button_url' => array('url' => '/egyedi-rendeles/'),
			'image' => array('url' => $asset . 'termekvilag/hero_slider/layero-asset-0010.png'),
		))));

		$sections[] = self::wrap_in_section(array(self::make_widget('layero_footnotes', array(
			'items' => array(
				array('text' => 'A műhelyünk áramát napelemek adják, a PLA pedig növényi alapú, lebomló anyag — így a gyártás CO₂-kibocsátása közel nulla.'),
			),
		))));

		return $sections;
	}

	/* ──────────────────────────────────────────────────────────────
	   GYIK (FAQ)
	   ────────────────────────────────────────────────────────────── */

	private static function catalog_data($settings = array()) {
		$settings = array_merge($settings, array('title_tag' => 'h1', 'category' => '', 'collection' => 'all', 'featured' => '', 'on_sale' => '', 'limit' => 24));
		return array(self::wrap_in_section(array(self::make_widget('layero_product_grid', $settings))));
	}

	/** Replace only the recognizable catalogue landing layout, with a full backup. */
	public static function maybe_upgrade_catalog() {
		if (! current_user_can('manage_options')) { return; }
		$page = self::find_page_by_slug('termekek');
		if (! $page || get_post_meta($page->ID, '_layero_catalog_revision', true)) { return; }
		$raw = get_post_meta($page->ID, '_elementor_data', true);
		$data = json_decode($raw, true);
		if (! is_array($data)) { return; }
		$widgets = self::faq_widgets($data);
		$types = wp_list_pluck($widgets, 'widgetType');
		$legacy_types = array('heading', 'text-editor', 'layero_category_bento', 'layero_product_grid', 'layero_product_carousel', 'layero_custom_cta', 'layero_trust_bar');
		if ($types !== $legacy_types || 'Termékek' !== ($widgets[0]['settings']['title'] ?? '')) { return; }
		$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
		if (! add_post_meta($page->ID, '_layero_catalog_backup_0_10_9', wp_slash($backup), true)) { return; }
		self::set_elementor_data($page->ID, self::catalog_data($widgets[3]['settings'] ?? array()));
		delete_post_meta($page->ID, '_elementor_element_cache');
		delete_post_meta($page->ID, '_elementor_css');
		if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) {
			(new \Elementor\Core\Files\CSS\Post($page->ID))->delete();
		}
		clean_post_cache($page->ID);
		update_post_meta($page->ID, '_layero_catalog_revision', '0.10.9');
	}

	private static function faq_data() {
		return array(self::wrap_in_section(array(self::make_widget('layero_static_page', array('page' => 'gyik')))));
	}

	/** Upgrade only the old, unedited generated FAQ; keep a recoverable backup. */
	public static function maybe_upgrade_faq() {
		if (! current_user_can('manage_options')) { return; }
		$page = self::find_page_by_slug('gyik');
		if (! $page || get_post_meta($page->ID, '_layero_faq_revision', true)) { return; }
		$raw = get_post_meta($page->ID, '_elementor_data', true);
		$data = json_decode($raw, true);
		if (! is_array($data) || ! self::is_legacy_faq($data)) { return; }
		$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
		if (! add_post_meta($page->ID, '_layero_faq_backup_0_10_8', wp_slash($backup), true)) { return; }
		self::set_elementor_data($page->ID, self::faq_data());
		delete_post_meta($page->ID, '_elementor_element_cache');
		delete_post_meta($page->ID, '_elementor_css');
		if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) {
			(new \Elementor\Core\Files\CSS\Post($page->ID))->delete();
		}
		clean_post_cache($page->ID);
		update_post_meta($page->ID, '_layero_faq_revision', '0.10.8');
	}

	private static function faq_widgets($elements) {
		$widgets = array();
		foreach ($elements as $element) {
			if ('widget' === ($element['elType'] ?? '')) { $widgets[] = $element; }
			if (! empty($element['elements'])) { $widgets = array_merge($widgets, self::faq_widgets($element['elements'])); }
		}
		return $widgets;
	}

	private static function is_legacy_faq($data) {
		$actual = self::faq_widgets($data);
		$expected = self::faq_widgets(self::legacy_faq_data());
		if (count($actual) !== count($expected)) { return false; }
		foreach ($expected as $i => $widget) {
			if (($actual[$i]['widgetType'] ?? '') !== $widget['widgetType']) { return false; }
			$settings = (array) ($actual[$i]['settings'] ?? array());
			foreach ((array) $widget['settings'] as $key => $value) {
				$current = $settings[$key] ?? null;
				if ('html' === $key) {
					// Older generated copies linked the corporate category instead of its landing page.
					if (is_string($current)) { $current = str_replace('href="/termekek/?cat=ceges"', 'href="/cegeknek/"', $current); }
					if (! is_string($current) || preg_replace('/\s+/u', ' ', trim($current)) !== preg_replace('/\s+/u', ' ', trim($value))) { return false; }
				} elseif ('image' === $key) {
					if (! is_array($current) || ! preg_match('~/termekvilag/hero_slider/layero-asset-0018\.png$~', $current['url'] ?? '')) { return false; }
				} elseif ('button_url' === $key) {
					if (! is_array($current) || ($current['url'] ?? '') !== $value['url']) { return false; }
				} elseif ($current !== $value) { return false; }
			}
		}
		return true;
	}

	private static function legacy_faq_data() {
		$sections = array();

		$sections[] = self::html_section(
			'<section class="sh-page-hd"><div class="shop-wrap">' .
			'<nav class="sh-crumbs" aria-label="Morzsamenü"><a href="/">Shop</a><span aria-hidden="true">/</span><span>Gyakori kérdések</span></nav>' .
			'<h1>Gyakori kérdések</h1>' .
			'<p>Összeszedtük a leggyakoribb kérdéseket a rendelésről, a személyre szabásról, a szállításról és a garanciáról. Ha nem találod a választ, <a href="/kapcsolat/">írj nekünk</a> — 24 órán belül válaszolunk.</p>' .
			'</div></section>'
		);

		$sections[] = self::html_section(
			'<nav class="sh-faq-nav shop-wrap" aria-label="GYIK témák">' .
			'<a href="#rendeles">Rendelés &amp; személyre szabás</a>' .
			'<a href="#szallitas">Szállítás &amp; fizetés</a>' .
			'<a href="#visszakuldes">Visszaküldés &amp; garancia</a>' .
			'<a href="#termek">Termék &amp; anyag</a>' .
			'<a href="#ceges">Céges &amp; egyedi</a>' .
			'</nav>'
		);

		$faq_html = '<section class="sh-band sh-band--tight"><div class="shop-wrap sh-faq">';

		$faq_html .= '<div class="sh-faq__group" id="rendeles"><h2 class="sh-h2">Rendelés és személyre szabás</h2><div class="sh-acc">';
		$faq_html .= '<details open><summary>Hogyan tudok személyre szabott terméket rendelni?</summary><div><p>Válaszd ki a terméket, add meg a személyre szabás részleteit (név, felirat, motívum), és tedd a kosárba. A rendelés után e-mailben egyeztetjük a pontos szövegeket és részleteket, és csak a jóváhagyásod után indítjuk a gyártást.</p></div></details>';
		$faq_html .= '<details><summary>Módosíthatom vagy lemondhatom a rendelésem?</summary><div><p>Amíg a gyártás nem indult el, a rendelés díjmentesen módosítható vagy lemondható. Írj a <a href="mailto:layeroprint@gmail.com">layeroprint@gmail.com</a> címre a rendelésszámoddal.</p></div></details>';
		$faq_html .= '<details><summary>Meddig kell megadnom a személyre szabás adatait?</summary><div><p>A rendelés után kapott visszaigazoló e-mailre válaszolva bármikor elküldheted. Minél előbb megkapjuk, annál hamarabb indul a gyártás — a feltüntetett gyártási idő az adatok véglegesítésétől számít.</p></div></details>';
		$faq_html .= '</div></div>';

		$faq_html .= '<div class="sh-faq__group" id="szallitas"><h2 class="sh-h2">Szállítás és fizetés</h2><div class="sh-acc">';
		$faq_html .= '<details><summary>Mennyibe kerül és meddig tart a szállítás?</summary><div><p>A szállítási díj Románia területén 25 lej, <b>200 lej feletti rendelésnél ingyenes</b>. A gyártási idő terméktől függően 3–15 munkanap; ehhez jön a futár 1–3 munkanapja. A pontos várható dátumot a terméknél és a visszaigazoló e-mailben is jelezzük.</p></div></details>';
		$faq_html .= '<details><summary>Milyen szállítási módok közül választhatok?</summary><div><p>Futárszolgálat házhoz, csomagpont (Easybox / posta) átvétel, valamint személyes átvétel a szatmárnémeti műhelyünkben. A választható lehetőségeket a pénztárnál látod.</p></div></details>';
		$faq_html .= '<details><summary>Hogyan tudok fizetni?</summary><div><p>Bankkártyával (VISA, Mastercard), Apple Pay-jel, Google Pay-jel, utánvéttel (fizetés átvételkor, +5 lej), vagy banki átutalással. Céges vásárlóknak proforma díjbekérőt is tudunk küldeni.</p></div></details>';
		$faq_html .= '<details><summary>Külföldre is szállítotok?</summary><div><p>Alapból Románia területére szállítunk. Nemzetközi kiszállításról egyedi egyeztetés alapján tudunk ajánlatot adni — írj nekünk a szállítási címmel, és visszajelzünk a díjról és a határidőről.</p></div></details>';
		$faq_html .= '<details><summary>Kapok számlát a rendelésről?</summary><div><p>Igen, minden rendeléshez elektronikus számlát küldünk a visszaigazoló e-mailben. Céges számlához add meg a cégadatokat és az adószámot a rendeléskor.</p></div></details>';
		$faq_html .= '</div></div>';

		$faq_html .= '<div class="sh-faq__group" id="visszakuldes"><h2 class="sh-h2">Visszaküldés, garancia és elállás</h2><div class="sh-acc">';
		$faq_html .= '<details><summary>Visszaküldhetem a terméket, ha meggondolom magam?</summary><div><p>A nem egyedi, raktári termékekre a törvényi <b>14 napos elállási jog</b> vonatkozik. Mivel a személyre szabott, egyedileg gyártott darabok kifejezetten a te kérésedre készülnek, ezekre a jogszabály szerint az elállási jog nem terjed ki — de gyártási vagy nyomtatási hiba esetén természetesen cserét vagy visszatérítést adunk.</p></div></details>';
		$faq_html .= '<details><summary>Mi a teendő, ha sérülten vagy hibásan érkezik a termék?</summary><div><p>Küldj egy fotót a sérülésről vagy hibáról a <a href="mailto:layeroprint@gmail.com">layeroprint@gmail.com</a> címre a rendelésszámoddal. Gyártási vagy szállítási hibára cserét vagy teljes visszatérítést adunk, a szállítási költséget mi álljuk.</p></div></details>';
		$faq_html .= '<details><summary>Van garancia a termékekre?</summary><div><p>Igen. Minden termékünkre a törvény által előírt <b>2 éves megfelelőségi jótállás (garanție legală de conformitate)</b> vonatkozik, ami a gyártási, anyag- és nyomtatási hibákra terjed ki. A világító daraboknál az elektronikára (LED, kapcsoló) is érvényes.</p><p>Panasz esetén az <a href="https://anpc.ro" target="_blank" rel="noopener">ANPC</a>-hez (Országos Fogyasztóvédelmi Hatóság) vagy az <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">EU online vitarendezési (SOL) platformjához</a> is fordulhatsz.</p></div></details>';
		$faq_html .= '<details><summary>Hogyan zajlik a visszatérítés?</summary><div><p>Jóváhagyott visszaküldés vagy reklamáció után a visszatérítést az eredeti fizetési módra indítjuk, jellemzően 14 napon belül. Csere esetén az új darab gyártását azonnal ütemezzük.</p></div></details>';
		$faq_html .= '</div></div>';

		$faq_html .= '<div class="sh-faq__group" id="termek"><h2 class="sh-h2">Termék, anyag és használat</h2><div class="sh-acc">';
		$faq_html .= '<details><summary>Milyen anyagból készülnek a termékek?</summary><div><p>Elsősorban PLA biopolimerből nyomtatunk, ami növényi (kukoricakeményítő) alapú, szagtalan, ipari komposztálásban lebomló anyag. A strapabíróbb daraboknál (pl. kulcstartók) PETG-t használunk. A műhelyünk áramát napelemek adják.</p></div></details>';
		$faq_html .= '<details><summary>Biztonságosak a világító lámpák, gyerekszobába is jók?</summary><div><p>Igen. A LED-világítás alacsony hőmérsékletű és USB-ről működik, így nem melegszik fel veszélyesen. A meleg, szűrt fény éjszakai fénynek is ideális a gyerekszobában.</p></div></details>';
		$faq_html .= '<details><summary>Hogyan tisztítsam és ápoljam a terméket?</summary><div><p>Száraz vagy enyhén nedves ruhával törölhető. Kerüld a közvetlen, tartós hőt (pl. radiátor, tűző nap az autóban) és az agresszív tisztítószereket, mivel a PLA hőérzékeny. Így évekig szép marad.</p></div></details>';
		$faq_html .= '<details><summary>Pontosan akkora lesz, amekkorát a fotón látok?</summary><div><p>A termékeknél megadott méretek tájékoztató jellegűek, és a személyre szabástól függően kis mértékben eltérhetnek. Bizonytalanság esetén nézd meg a <b>mérettáblázatot</b> a termékoldalon, vagy kérj egyedi méretet.</p></div></details>';
		$faq_html .= '</div></div>';

		$faq_html .= '<div class="sh-faq__group" id="ceges"><h2 class="sh-h2">Céges és egyedi rendelés</h2><div class="sh-acc">';
		$faq_html .= '<details><summary>Van egy ötletem, ami nincs a katalógusban — meg tudjátok csinálni?</summary><div><p>Nagy eséllyel igen — a legjobb darabjaink mind egyedi megkeresésből születtek. Írd le az ötletet (képpel, vázlattal, referenciával), és 24–48 órán belül visszajelzünk, hogy mennyiért és mennyi idő alatt tudjuk megvalósítani. <a href="/egyedi-rendeles/">Indíts egyedi rendelést ›</a></p></div></details>';
		$faq_html .= '<details><summary>Vállaltok nagyobb, céges mennyiséget?</summary><div><p>Igen, logózott ajándéktárgyakat, QR/NFC displayeket és rendezvényes csomagokat is gyártunk, mennyiségi kedvezménnyel. Nézd meg a <a href="/cegeknek/">céges megoldásokat</a>, vagy kérj ajánlatot a darabszámmal.</p></div></details>';
		$faq_html .= '<details><summary>Mennyi egy egyedi darab ára?</summary><div><p>A méret, a komplexitás és az anyag függvénye: egy egyszerűbb egyedi darab jellemzően 100–300 lej, összetettebb projektek egyedi kalkulációval készülnek. Pontos árat az ötlet ismeretében, 24–48 órán belül adunk.</p></div></details>';
		$faq_html .= '</div></div>';

		$faq_html .= '</div></section>';

		$sections[] = self::html_section($faq_html);

		$asset = self::asset_url();
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_cta', array(
			'title' => 'Nem találtad a választ?',
			'text' => 'Írj nekünk, és segítünk — akár termékválasztásban, akár egyedi ötletben.',
			'button_text' => 'Kapcsolatfelvétel',
			'button_url' => array('url' => '/kapcsolat/'),
			'image' => array('url' => $asset . 'termekvilag/hero_slider/layero-asset-0018.png'),
		))));

		return $sections;
	}

	/* ──────────────────────────────────────────────────────────────
	   KAPCSOLAT (Contact)
	   ────────────────────────────────────────────────────────────── */

	private static function contact_data() {
		return self::information_page('kapcsolat');
	}

	private static function legacy_contact_data() {
		$sections = array();

		$sections[] = self::html_section(
			'<section class="sh-contact shop-wrap">' .
			'<div>' .
			'<h1>Beszéljünk az ötletedről.</h1>' .
			'<p class="sh-contact__lead">Kérdésed van egy termékről, vagy valami teljesen egyedit szeretnél? Írj nekünk — általában 24 órán belül válaszolunk.</p>' .
			'<div class="sh-contact__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8.09 9.63a16 16 0 0 0 6.28 6.28l1.19-1.19a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92Z"/></svg><div><span>Telefon</span><strong>+40 756 642 387</strong></div></div>' .
			'<div class="sh-contact__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><div><span>E-mail</span><strong>layeroprint@gmail.com</strong></div></div>' .
			'<div class="sh-contact__item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><div><span>Műhely</span><strong>Szatmárnémeti, Románia</strong></div></div>' .
			'</div>' .
			'<form class="sh-form" id="sh-contact-form">' .
			'<div class="sh-form__row">' .
			'<div class="sh-field"><label for="cf-nev">Név</label><input id="cf-nev" type="text" required autocomplete="name"></div>' .
			'<div class="sh-field"><label for="cf-email">E-mail</label><input id="cf-email" type="email" required autocomplete="email"></div>' .
			'</div>' .
			'<div class="sh-field"><label for="cf-tema">Miben segíthetünk?</label>' .
			'<select id="cf-tema"><option>Kérdésem van egy termékről</option><option>Egyedi ötletem van</option><option>Céges megrendelés</option><option>Egyéb</option></select></div>' .
			'<div class="sh-field"><label for="cf-uzenet">Üzenet</label><textarea id="cf-uzenet" required placeholder="Írd le röviden, mire gondoltál…"></textarea></div>' .
			'<button class="sh-btn sh-btn--primary" type="submit">Üzenet küldése</button>' .
			'</form>' .
			'</section>'
		);

		return $sections;
	}

	/* ──────────────────────────────────────────────────────────────
	   AJÁNDÉKKERESŐ (Quiz)
	   ────────────────────────────────────────────────────────────── */

	private static function quiz_data() {
		return array(
			self::html_section('<div data-layero-page="kviz"><div id="sh-quiz-mount"></div></div>'),
		);
	}

	private static function information_page($slug) {
		return array(self::wrap_in_section(array(self::make_widget('layero_static_page', array('page' => $slug)))));
	}

	/** Replace only unchanged generated pages, after preserving their original Elementor data. */
	public static function maybe_upgrade_information_pages() {
		if (! current_user_can('manage_options')) { return; }
		foreach (array('rolunk' => 'legacy_about_data', 'kapcsolat' => 'legacy_contact_data') as $slug => $method) {
			$page = self::find_page_by_slug($slug);
			if (! $page || get_post_meta($page->ID, '_layero_information_revision', true)) { continue; }
			$raw = get_post_meta($page->ID, '_elementor_data', true);
			$data = json_decode($raw, true);
			if (! is_array($data) || self::information_signature($data) !== self::information_signature(self::$method())) { continue; }
			$backup = array('elementor_data' => $raw, 'post_content' => $page->post_content, 'saved_at' => gmdate('c'));
			if (! add_post_meta($page->ID, '_layero_information_backup_0_10_18', wp_slash($backup), true)) { continue; }
			self::set_elementor_data($page->ID, self::information_page($slug));
			delete_post_meta($page->ID, '_elementor_element_cache');
			delete_post_meta($page->ID, '_elementor_css');
			if (class_exists('\\Elementor\\Core\\Files\\CSS\\Post')) { (new \Elementor\Core\Files\CSS\Post($page->ID))->delete(); }
			clean_post_cache($page->ID);
			update_post_meta($page->ID, '_layero_information_revision', '0.10.18');
		}
	}

	private static function information_signature($elements) {
		$normalize = function ($value) use (&$normalize) {
			if (is_object($value)) { $value = get_object_vars($value); }
			if (is_array($value)) {
				unset($value['_id']);
				foreach ($value as $key => $item) { $value[$key] = $normalize($item); }
				ksort($value);
				return $value;
			}
			if (! is_string($value)) { return $value; }
			$value = str_replace(array(self::asset_url(), '.png'), array('ASSET/', '.webp'), $value);
			return preg_replace('/\s+/u', ' ', trim($value));
		};
		return array_map(function ($widget) use ($normalize) {
			return array($widget['elType'] ?? '', $widget['widgetType'] ?? '', $normalize($widget['settings'] ?? array()), self::information_signature($widget['elements'] ?? array()));
		}, $elements);
	}

	/* ──────────────────────────────────────────────────────────────
	   KEDVENCEK (Favorites / Wishlist)
	   ────────────────────────────────────────────────────────────── */

	private static function favorites_data() {
		return array(
			self::wrap_in_section(array(self::make_widget('layero_favorite_products', array(
				'title' => 'Kedvenc termékeim',
				'eyebrow' => 'Saját válogatás',
				'description' => 'Mentsd el, ami megtetszik, hasonlítsd össze nyugodtan, és térj vissza hozzá bármikor.',
				'empty_text' => 'A termékkártyák szív ikonjával menthetsz ide termékeket.',
				'browse_label' => 'Termékek böngészése',
				'limit' => 100,
			)))),
		);
	}

	/* ──────────────────────────────────────────────────────────────
	   404
	   ────────────────────────────────────────────────────────────── */

	private static function error_404_data() {
		return array(
			self::html_section(
				'<section class="sh-404 shop-wrap">' .
				'<span class="sh-404__code">404</span>' .
				'<h1>Ezt az oldalt nem találtuk.</h1>' .
				'<p>Lehet, hogy elavult a link, vagy elgépeltünk valamit. De ne aggódj — innen könnyen továbbjutsz.</p>' .
				'<div class="sh-404__actions">' .
				'<a class="sh-btn sh-btn--primary" href="/">Vissza a főoldalra</a>' .
				'<a class="sh-btn sh-btn--ghost" href="/termekek/">Összes termék</a>' .
				'<a class="sh-btn sh-btn--ghost" href="/kviz/">Ajándékkereső</a>' .
				'</div>' .
				'<div class="sh-404__cats" id="sh-404-cats"></div>' .
				'</section>'
			),
		);
	}

	/* ──────────────────────────────────────────────────────────────
	   EGYEDI RENDELÉS (Custom Order)
	   ────────────────────────────────────────────────────────────── */

	private static function custom_order_data() {
		$sections = array();

		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_order_hero')));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_process_steps', array(
			'eyebrow' => 'Így működik',
			'title' => 'Az ötlettől a kész darabig. <span>Négy átlátható lépés.</span>',
			'text' => '',
			'button_text' => '',
			'layout' => 'landing',
			'section_id' => 'folyamat',
			'columns' => '4',
			'steps' => array(
				array('number' => '1', 'icon' => 'bulb', 'title' => 'Elküldöd az ötleted', 'text' => 'Leírás, fotó, vázlat vagy referenciakép — ahogy kényelmes. Nem kell késznek lennie.'),
				array('number' => '2', 'icon' => 'tag', 'title' => 'Ajánlatot kapsz', 'text' => '24–48 órán belül visszajelzünk a pontos árral és a gyártási idővel. Ez ingyenes, és semmire nem kötelez.'),
				array('number' => '3', 'icon' => 'chat', 'title' => 'Egyeztetjük a részleteket', 'text' => 'E-mailben véglegesítjük a szöveget, méretet, színt. Módosítás az árban — addig igazítjuk, amíg pontosan az nem lesz, amit elképzeltél.'),
				array('number' => '4', 'icon' => 'truck', 'title' => 'Gyártjuk és kézbesítjük', 'text' => 'Csak a jóváhagyásod után nyomtatunk — a szatmárnémeti műhelyünkben, jellemzően 7–15 munkanap alatt.'),
			),
		))));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_order_references')));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_order_pricing')));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_order_testimonial')));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_custom_order_quote')));

		return $sections;
	}

	/* ──────────────────────────────────────────────────────────────
	   KOSÁR (Cart)
	   ────────────────────────────────────────────────────────────── */

	private static function cart_data() {
		$sections = array();

		$sections[] = self::html_section(
			'<section class="sh-page-hd"><div class="shop-wrap">' .
			'<h1>Kosár</h1>' .
			'</div></section>'
		);

		$sections[] = self::wrap_in_section(array(self::make_widget('shortcode', array(
			'shortcode' => '[woocommerce_cart]',
		))));

		$sections[] = self::wrap_in_section(array(self::make_widget('layero_trust_bar')));

		return $sections;
	}

	/* ──────────────────────────────────────────────────────────────
	   PÉNZTÁR (Checkout)
	   ────────────────────────────────────────────────────────────── */

	private static function checkout_data() {
		$sections = array();

		$sections[] = self::html_section(
			'<section class="sh-page-hd"><div class="shop-wrap">' .
			'<h1>Pénztár</h1>' .
			'</div></section>'
		);

		$sections[] = self::wrap_in_section(array(self::make_widget('shortcode', array(
			'shortcode' => '[woocommerce_checkout]',
		))));

		$sections[] = self::wrap_in_section(array(self::make_widget('layero_trust_bar')));

		return $sections;
	}

	/* ──────────────────────────────────────────────────────────────
	   FIÓKOM (My Account)
	   ────────────────────────────────────────────────────────────── */

	private static function account_data() {
		$sections = array();

		$sections[] = self::html_section(
			'<section class="sh-page-hd"><div class="shop-wrap">' .
			'<h1>Fiókom</h1>' .
			'</div></section>'
		);

		$sections[] = self::wrap_in_section(array(self::make_widget('shortcode', array(
			'shortcode' => '[layero_account]',
		))));

		return $sections;
	}

	private static function corporate_data() {
		$sections = array();

		$sections[] = self::wrap_in_section(array(self::make_widget('layero_corporate_hero')));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_corporate_solutions')));
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_corporate_benefits')));
		$sections[] = self::wrap_in_section(
			array(
				self::make_widget(
					'layero_process_steps',
					array(
						'eyebrow' => 'Így dolgozunk',
						'title' => 'Egyszerű, mint egy megrendelő. <span>Papírmunka nélkül.</span>',
						'text' => '',
						'button_text' => '',
						'layout' => 'landing',
						'columns' => '4',
						'steps' => array(
							array('number' => '1', 'icon' => 'briefcase', 'title' => 'Elküldöd az igényt', 'text' => 'Mire van szükségetek, kb. hány darab, mikorra — logót és arculatot e-mailben egyeztetünk.'),
							array('number' => '2', 'icon' => 'tag', 'title' => 'Ajánlat és terv', 'text' => '24–48 órán belül árajánlatot kapsz mennyiségi kedvezménnyel; a tervet jóváhagyásig igazítjuk.'),
							array('number' => '3', 'icon' => 'file', 'title' => 'Proforma és gyártás', 'text' => 'Proforma díjbekérő után indul a gyártás a műhelyünkben — céges számlával zárunk.'),
							array('number' => '4', 'icon' => 'truck', 'title' => 'Kézbesítés', 'text' => 'Gondosan csomagolva, futárral az irodáig — vagy személyes átvétel Szatmárnémetiben.'),
						),
					)
				),
			)
		);
		$sections[] = self::wrap_in_section(array(self::make_widget('layero_corporate_quote')));

		return $sections;
	}

	private static function terms_data() {
		return array(
			self::wrap_in_section(
				array(
					self::make_widget('layero_static_page', array('page' => 'aszf')),
				)
			),
		);
	}

	private static function privacy_data() {
		return array(
			self::wrap_in_section(
				array(
					self::make_widget('layero_static_page', array('page' => 'adatvedelem')),
				)
			),
		);
	}

	/* ══════════════════════════════════════════════════════════════
	   Helpers
	   ══════════════════════════════════════════════════════════════ */

	private static function find_page($title) {
		$query = new \WP_Query(array(
			'post_type'      => 'page',
			'title'          => $title,
			'post_status'    => array('publish', 'draft', 'pending', 'private'),
			'posts_per_page' => 1,
			'no_found_rows'  => true,
		));

		return $query->have_posts() ? $query->posts[0] : null;
	}

	private static function find_page_by_slug($slug) {
		$page = get_page_by_path(sanitize_title($slug), OBJECT, 'page');

		return $page instanceof \WP_Post ? $page : null;
	}

	private static function set_elementor_data($post_id, $data) {
		update_post_meta($post_id, '_elementor_data', wp_slash(wp_json_encode($data)));
		update_post_meta($post_id, '_elementor_edit_mode', 'builder');
		update_post_meta($post_id, '_elementor_template_type', 'wp-page');
		update_post_meta($post_id, '_elementor_version', '3.24.0');
	}

	private static function asset_url() {
		return LAYERO_SHOP_UI_URL . 'assets/demo/';
	}

	private static function make_id() {
		self::$id_counter++;
		return substr(md5('layero_build_' . self::$id_counter . '_' . wp_rand()), 0, 7);
	}

	private static function make_widget($type, $settings = array()) {
		return array(
			'id'         => self::make_id(),
			'elType'     => 'widget',
			'widgetType' => $type,
			'settings'   => (object) $settings,
		);
	}

	private static function wrap_in_section($widgets, $section_settings = array()) {
		$defaults = array(
			'layout' => 'full_width',
			'gap'    => 'no',
		);

		return array(
			'id'       => self::make_id(),
			'elType'   => 'section',
			'settings' => array_merge($defaults, $section_settings),
			'elements' => array(
				array(
					'id'       => self::make_id(),
					'elType'   => 'column',
					'settings' => array('_column_size' => 100),
					'elements' => $widgets,
				),
			),
		);
	}

	private static function html_section($html) {
		return self::wrap_in_section(array(
			self::make_widget('html', array('html' => $html)),
		));
	}
}
