<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;

if (! defined('ABSPATH')) {
	exit;
}

/**
 * Önálló, izolált "În curând" (coming soon, román) widget.
 *
 * A magyar Coming_Soon testvérpárja, de teljesen független tőle: minden
 * stílusát a SAJÁT .lyr-cs-ro scope alá zárja (külön keyframe-nevekkel),
 * a viselkedését saját data-attribútumokra (data-lyr-cs-ro) kötött inline
 * szkriptből hozza. get_style_depends / get_script_depends üres — így sem a
 * többi widgetre, sem a magyar coming soon widgetre, sem a shop CSS-re nincs
 * semmilyen hatása.
 */
class Coming_Soon_Ro extends Base_Widget {
	public function get_name() {
		return 'layero_coming_soon_ro';
	}

	public function get_title() {
		return __('Layero în curând (coming soon RO)', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-countdown';
	}

	public function get_style_depends() {
		return array();
	}

	public function get_script_depends() {
		return array();
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Conținut', 'layero-shop-ui')));

		$this->add_control('kicker', array(
			'label' => __('Supratitlu', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Magazinul se pregătește', 'layero-shop-ui'),
		));

		$this->add_control('title', array(
			'label' => __('Titlu (accent: <span class="hl-amber">…</span>)', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXTAREA,
			'default' => __('În curând, o nouă casă pentru <span class="hl-amber">cadourile personalizate</span>.', 'layero-shop-ui'),
		));

		$this->add_control('lead', array(
			'label' => __('Introducere (accent: <span class="hl-cyan">…</span>)', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXTAREA,
			'default' => __('Lămpi luminoase personalizate, brelocuri, decorațiuni și cadouri corporative — <span class="hl-cyan">în producție 3D unicat</span>, strat cu strat. Lucrăm la magazinul nostru online; abonează-te și îți scriem primul, imediat ce deschidem.', 'layero-shop-ui'),
		));

		$this->add_control('launch', array(
			'label' => __('Data lansării (numărătoare inversă)', 'layero-shop-ui'),
			'type' => Controls_Manager::DATE_TIME,
			'default' => '2026-08-15 10:00:00',
			'description' => __('Dacă data a trecut, apare textul „În curând!".', 'layero-shop-ui'),
		));

		$this->add_control('chips', array(
			'label' => __('Etichete de categorie (câte una pe rând)', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXTAREA,
			'default' => "Lămpi tematice\nBrelocuri\nDecorațiuni\nCadouri corporative",
		));

		$this->add_control('visit_text', array(
			'label' => __('Text link secundar', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Până atunci, vizitează site-ul nostru de prezentare', 'layero-shop-ui'),
			'separator' => 'before',
		));

		$this->add_control('visit_url', array(
			'label' => __('URL link secundar', 'layero-shop-ui'),
			'type' => Controls_Manager::URL,
			'default' => array('url' => 'https://layero.ro', 'is_external' => 'on'),
		));

		$this->end_controls_section();

		$this->start_controls_section('notify_section', array('label' => __('Abonare', 'layero-shop-ui')));

		$this->add_control('show_notify', array(
			'label' => __('Afișează abonarea', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));

		$this->add_control('notify_placeholder', array(
			'label' => __('Placeholder câmp', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Adresa ta de e-mail', 'layero-shop-ui'),
		));

		$this->add_control('notify_button', array(
			'label' => __('Text buton', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Anunță-mă', 'layero-shop-ui'),
		));

		$this->add_control('notify_hint', array(
			'label' => __('Text mărunt', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXTAREA,
			'default' => __('Îți scriem doar despre lansare — fără spam, te poți dezabona oricând.', 'layero-shop-ui'),
		));

		$this->add_control('notify_success', array(
			'label' => __('Mesaj de succes', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Mulțumim! Te anunțăm imediat ce se lansează magazinul.', 'layero-shop-ui'),
		));

		$this->end_controls_section();

		$this->start_controls_section('contact_section', array('label' => __('Contact / subsol', 'layero-shop-ui')));

		$this->add_control('contact_email', array(
			'label' => __('E-mail', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'layeroprint@gmail.com',
		));

		$this->add_control('contact_phone', array(
			'label' => __('Telefon', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => '+40 756 642 387',
		));

		$this->add_control('contact_location', array(
			'label' => __('Locație', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => __('Satu Mare, România', 'layero-shop-ui'),
		));

		$this->add_control('copyright', array(
			'label' => __('Nume copyright', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Layero 3D Design',
		));

		$this->end_controls_section();
	}

	protected function render() {
		$s = $this->get_settings_for_display();
		$logo = LAYERO_SHOP_UI_URL . 'assets/demo/layero-asset-0251.webp';
		$launch = ! empty($s['launch']) ? $s['launch'] : '2026-08-15 10:00:00';
		$chips = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) ($s['chips'] ?? ''))));
		$show_notify = 'yes' === ($s['show_notify'] ?? 'yes');
		$year = gmdate('Y');

		$title_tags = array('span' => array('class' => array()), 'em' => array(), 'br' => array());

		$visit = $s['visit_url'] ?? array();
		$visit_url = is_array($visit) ? ($visit['url'] ?? '') : '';
		$visit_target = ! empty($visit['is_external']) ? ' target="_blank"' : '';
		$visit_rel = ! empty($visit['is_external']) ? ' rel="noopener"' : '';

		$email = $s['contact_email'] ?? '';
		$phone = $s['contact_phone'] ?? '';
		$phone_href = preg_replace('/[^0-9+]/', '', (string) $phone);
		?>
		<style>
			.lyr-cs-ro {
				--ink: #eaf6fb; --muted: #9db6c8; --faint: #6f8ba0;
				--line: rgba(125, 231, 245, 0.16); --accent: #00c2e0; --accent-2: #7ee7f5;
				--amber: #f4b860; --cyan-hl: #67d3ea;
				position: relative; overflow: hidden; min-height: 100vh;
				display: flex; flex-direction: column; color: var(--ink);
				font-family: "Sora", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
				line-height: 1.6;
				background:
					radial-gradient(circle at 4% 15%, rgba(18, 230, 255, 0.18), transparent 30%),
					radial-gradient(circle at 88% 8%, rgba(255, 155, 56, 0.18), transparent 28%),
					linear-gradient(180deg, #020711 0%, #06101b 44%, #020711 100%);
			}
			.lyr-cs-ro::before {
				content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
				background:
					linear-gradient(90deg, rgba(7, 180, 235, 0.15), transparent 36%, transparent 67%, rgba(255, 120, 24, 0.12)),
					repeating-radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.022) 0 1px, transparent 1px 7px);
				opacity: 0.78; mix-blend-mode: screen;
			}
			.lyr-cs-ro__wrap {
				position: relative; z-index: 1; flex: 1; width: 100%; max-width: 720px;
				margin: 0 auto; padding: clamp(40px, 5vw, 64px) clamp(22px, 5vw, 40px) clamp(28px, 3vw, 40px);
				display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
			}
			.lyr-cs-ro__brand { display: inline-flex; align-items: center; gap: 13px; margin-bottom: clamp(24px, 3.5vw, 38px); text-decoration: none; }
			.lyr-cs-ro__brand img { width: 46px; height: 46px; object-fit: contain; filter: drop-shadow(0 0 18px rgba(0, 194, 224, 0.55)); animation: lyr-cs-ro-pulse 4.5s ease-in-out infinite; }
			@keyframes lyr-cs-ro-pulse { 0%,100% { filter: drop-shadow(0 0 14px rgba(0,194,224,.45)); } 50% { filter: drop-shadow(0 0 26px rgba(0,194,224,.75)); } }
			.lyr-cs-ro__brand b { font-size: 1.42rem; font-weight: 800; letter-spacing: -0.02em; color: #fff; }
			.lyr-cs-ro__brand b small { font-weight: 600; font-size: 0.62em; letter-spacing: 0.24em; text-transform: uppercase; color: var(--accent-2); margin-left: 3px; }
			.lyr-cs-ro__kicker { display: inline-flex; align-items: center; gap: 9px; font-size: 0.72rem; font-weight: 650; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-2); margin-bottom: 16px; }
			.lyr-cs-ro__kicker::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 0 rgba(0,194,224,.5); animation: lyr-cs-ro-dot 2.4s ease-out infinite; }
			@keyframes lyr-cs-ro-dot { 0% { box-shadow: 0 0 0 0 rgba(0,194,224,.55); } 70% { box-shadow: 0 0 0 9px rgba(0,194,224,0); } 100% { box-shadow: 0 0 0 0 rgba(0,194,224,0); } }
			.lyr-cs-ro h1 { font-size: clamp(2rem, 5.2vw, 3.35rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.035em; text-wrap: balance; margin: 0 0 16px; color: var(--ink); }
			.lyr-cs-ro .hl-amber { color: var(--amber); }
			.lyr-cs-ro .hl-cyan { color: var(--cyan-hl); }
			.lyr-cs-ro__lead { max-width: 46ch; color: var(--muted); font-size: clamp(0.98rem, 1.6vw, 1.12rem); margin: 0 auto clamp(26px, 3.5vw, 36px); }
			.lyr-cs-ro__count { display: flex; justify-content: center; gap: clamp(10px, 2.2vw, 20px); margin-bottom: clamp(26px, 3.5vw, 36px); }
			.lyr-cs-ro__cell { min-width: clamp(66px, 15vw, 92px); padding: clamp(13px, 2vw, 18px) clamp(8px, 1.5vw, 14px) 12px; border: 1px solid var(--line); border-radius: 16px; background: rgba(255,255,255,0.045); box-shadow: 0 18px 44px rgba(0,0,0,0.28), inset 0 1px rgba(255,255,255,0.05); }
			.lyr-cs-ro__num { font-size: clamp(1.7rem, 5vw, 2.7rem); font-weight: 700; line-height: 1; color: #fff; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
			.lyr-cs-ro__lbl { display: block; margin-top: 8px; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--faint); }
			.lyr-cs-ro__notify { width: 100%; max-width: 470px; margin: 0 auto; }
			.lyr-cs-ro__row { display: flex; gap: 9px; padding: 7px; border: 1px solid var(--line); border-radius: 980px; background: rgba(255,255,255,0.05); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
			.lyr-cs-ro__row:focus-within { border-color: rgba(0,194,224,0.55); box-shadow: 0 0 0 4px rgba(0,194,224,0.1); }
			.lyr-cs-ro__notify input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: #fff; font: 500 0.95rem/1.2 inherit; padding: 0 8px 0 16px; }
			.lyr-cs-ro__notify input::placeholder { color: var(--faint); }
			.lyr-cs-ro__notify button { flex: 0 0 auto; border: 0; border-radius: 980px; padding: 0 22px; min-height: 46px; font: 700 0.86rem/1 inherit; color: #042028; background: linear-gradient(180deg, var(--accent-2), var(--accent) 78%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 22px rgba(0,194,224,0.32); cursor: pointer; transition: transform 0.15s ease, filter 0.2s ease; white-space: nowrap; }
			.lyr-cs-ro__notify button:hover { transform: translateY(-1px); filter: brightness(1.05); }
			.lyr-cs-ro__notify button:active { transform: scale(0.98); }
			.lyr-cs-ro__hint { margin-top: 12px; font-size: 0.76rem; color: var(--faint); }
			.lyr-cs-ro__ok { display: none; align-items: center; justify-content: center; gap: 10px; min-height: 60px; padding: 16px 22px; border: 1px solid rgba(61,154,80,0.4); border-radius: 980px; background: rgba(61,154,80,0.12); color: #bff0cb; font-size: 0.92rem; font-weight: 600; }
			.lyr-cs-ro__ok svg { width: 22px; height: 22px; stroke: #7fe0a0; }
			.lyr-cs-ro__notify.is-done .lyr-cs-ro__row, .lyr-cs-ro__notify.is-done .lyr-cs-ro__hint { display: none; }
			.lyr-cs-ro__notify.is-done .lyr-cs-ro__ok { display: flex; }
			.lyr-cs-ro__chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: clamp(30px, 4vw, 40px); }
			.lyr-cs-ro__chips span { font-size: 0.76rem; font-weight: 500; color: var(--muted); padding: 7px 15px; border: 1px solid var(--line); border-radius: 980px; background: rgba(255,255,255,0.025); }
			.lyr-cs-ro__visit { margin-top: clamp(28px, 4vw, 38px); display: inline-flex; align-items: center; gap: 8px; font-size: 0.92rem; font-weight: 600; color: var(--accent-2); text-decoration: none; transition: gap 0.2s ease, color 0.2s ease; }
			.lyr-cs-ro__visit:hover { gap: 12px; color: #fff; }
			.lyr-cs-ro__visit svg { width: 17px; height: 17px; }
			.lyr-cs-ro__foot { position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,0.06); }
			.lyr-cs-ro__foot-in { max-width: 720px; margin: 0 auto; padding: 20px clamp(22px,5vw,40px) 26px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 24px; text-align: center; }
			.lyr-cs-ro__foot-in a, .lyr-cs-ro__foot-in span.lyr-cs-ro__loc { display: inline-flex; align-items: center; gap: 7px; font-size: 0.82rem; color: var(--muted); text-decoration: none; transition: color 0.18s ease; }
			.lyr-cs-ro__foot-in a:hover { color: var(--accent-2); }
			.lyr-cs-ro__foot-in svg { width: 15px; height: 15px; stroke: currentColor; }
			.lyr-cs-ro__copy { flex-basis: 100%; margin-top: 4px; font-size: 0.74rem; color: var(--faint); }
			@media (max-width: 480px) {
				.lyr-cs-ro__count { gap: 7px; }
				.lyr-cs-ro__row { flex-direction: column; padding: 12px; border-radius: 18px; }
				.lyr-cs-ro__notify input { padding: 6px 8px 12px; text-align: center; border-bottom: 1px solid var(--line); }
				.lyr-cs-ro__notify button { width: 100%; min-height: 48px; }
			}
			@media (prefers-reduced-motion: reduce) {
				.lyr-cs-ro__brand img, .lyr-cs-ro__kicker::before { animation: none; }
			}
		</style>

		<div class="lyr-cs-ro" data-lyr-cs-ro data-launch="<?php echo esc_attr($launch); ?>">
			<div class="lyr-cs-ro__wrap">
				<span class="lyr-cs-ro__brand">
					<img src="<?php echo esc_url($logo); ?>" alt="Layero" width="46" height="46">
					<b>Layero <small>Shop</small></b>
				</span>

				<?php if (! empty($s['kicker'])) : ?>
					<span class="lyr-cs-ro__kicker"><?php echo esc_html($s['kicker']); ?></span>
				<?php endif; ?>

				<?php if (! empty($s['title'])) : ?>
					<h1><?php echo wp_kses($s['title'], $title_tags); ?></h1>
				<?php endif; ?>

				<?php if (! empty($s['lead'])) : ?>
					<p class="lyr-cs-ro__lead"><?php echo wp_kses($s['lead'], $title_tags); ?></p>
				<?php endif; ?>

				<div class="lyr-cs-ro__count" role="timer" aria-label="Numărătoare inversă până la lansare">
					<div class="lyr-cs-ro__cell"><span class="lyr-cs-ro__num" data-d>00</span><span class="lyr-cs-ro__lbl">Zile</span></div>
					<div class="lyr-cs-ro__cell"><span class="lyr-cs-ro__num" data-h>00</span><span class="lyr-cs-ro__lbl">Ore</span></div>
					<div class="lyr-cs-ro__cell"><span class="lyr-cs-ro__num" data-m>00</span><span class="lyr-cs-ro__lbl">Min</span></div>
					<div class="lyr-cs-ro__cell"><span class="lyr-cs-ro__num" data-s>00</span><span class="lyr-cs-ro__lbl">Sec</span></div>
				</div>

				<?php if ($show_notify) : ?>
					<form class="lyr-cs-ro__notify" data-lyr-cs-ro-form novalidate>
						<div class="lyr-cs-ro__row">
							<input type="email" placeholder="<?php echo esc_attr($s['notify_placeholder'] ?? ''); ?>" aria-label="Adresă de e-mail" autocomplete="email">
							<button type="submit"><?php echo esc_html($s['notify_button'] ?? 'Anunță-mă'); ?></button>
						</div>
						<?php if (! empty($s['notify_hint'])) : ?>
							<p class="lyr-cs-ro__hint"><?php echo esc_html($s['notify_hint']); ?></p>
						<?php endif; ?>
						<div class="lyr-cs-ro__ok" role="status">
							<svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>
							<span><?php echo esc_html($s['notify_success'] ?? 'Mulțumim!'); ?></span>
						</div>
					</form>
				<?php endif; ?>

				<?php if (! empty($chips)) : ?>
					<div class="lyr-cs-ro__chips" aria-hidden="true">
						<?php foreach ($chips as $chip) : ?>
							<span><?php echo esc_html($chip); ?></span>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

				<?php if (! empty($s['visit_text']) && ! empty($visit_url)) : ?>
					<a class="lyr-cs-ro__visit" href="<?php echo esc_url($visit_url); ?>"<?php echo $visit_target . $visit_rel; ?>>
						<?php echo esc_html($s['visit_text']); ?>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
					</a>
				<?php endif; ?>
			</div>

			<footer class="lyr-cs-ro__foot">
				<div class="lyr-cs-ro__foot-in">
					<?php if (! empty($email)) : ?>
						<a href="mailto:<?php echo esc_attr($email); ?>"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><?php echo esc_html($email); ?></a>
					<?php endif; ?>
					<?php if (! empty($phone)) : ?>
						<a href="tel:<?php echo esc_attr($phone_href); ?>"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/></svg><?php echo esc_html($phone); ?></a>
					<?php endif; ?>
					<?php if (! empty($s['contact_location'])) : ?>
						<span class="lyr-cs-ro__loc"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><?php echo esc_html($s['contact_location']); ?></span>
					<?php endif; ?>
					<p class="lyr-cs-ro__copy">© <?php echo esc_html($year); ?> <?php echo esc_html($s['copyright'] ?? 'Layero 3D Design'); ?></p>
				</div>
			</footer>
		</div>

		<script>
		(function () {
			var roots = document.querySelectorAll('[data-lyr-cs-ro]');
			for (var i = 0; i < roots.length; i++) {
				(function (root) {
					if (root.getAttribute('data-lyr-ro-init')) { return; }
					root.setAttribute('data-lyr-ro-init', '1');

					var target = new Date(String(root.getAttribute('data-launch') || '').replace(' ', 'T')).getTime();
					var box = root.querySelector('.lyr-cs-ro__count');
					var d = root.querySelector('[data-d]'), h = root.querySelector('[data-h]'),
						m = root.querySelector('[data-m]'), sc = root.querySelector('[data-s]');
					function pad(n) { return (n < 10 ? '0' : '') + n; }
					function tick() {
						var diff = target - Date.now();
						if (isNaN(target)) { return; }
						if (diff <= 0) {
							if (box) { box.innerHTML = '<div class="lyr-cs-ro__cell" style="min-width:auto;padding-inline:26px"><span class="lyr-cs-ro__num" style="font-size:clamp(1.3rem,4vw,2rem)">În curând!</span></div>'; }
							clearInterval(t);
							return;
						}
						var sec = Math.floor(diff / 1000);
						if (d) { d.textContent = pad(Math.floor(sec / 86400)); }
						if (h) { h.textContent = pad(Math.floor(sec % 86400 / 3600)); }
						if (m) { m.textContent = pad(Math.floor(sec % 3600 / 60)); }
						if (sc) { sc.textContent = pad(sec % 60); }
					}
					tick();
					var t = setInterval(tick, 1000);

					var form = root.querySelector('[data-lyr-cs-ro-form]');
					if (form) {
						var email = form.querySelector('input[type="email"]');
						form.addEventListener('submit', function (e) {
							e.preventDefault();
							var v = (email && email.value ? email.value : '').trim();
							if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
								if (email) { email.focus(); }
								var row = form.querySelector('.lyr-cs-ro__row');
								if (row) { row.style.borderColor = 'rgba(255,120,90,.7)'; }
								return;
							}
							form.classList.add('is-done');
						});
					}
				})(roots[i]);
			}
		})();
		</script>
		<?php
	}
}
