<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Hero_Slider extends Base_Widget {
	protected function is_dynamic_content(): bool {
		return true;
	}

	public function get_name() {
		return 'layero_hero_slider';
	}

	public function get_title() {
		return __('Layero főoldali slider', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-slider-full-screen';
	}

	protected function register_controls() {
		$this->start_controls_section('slides_section', array('label' => __('Slide-ok', 'layero-shop-ui')));

		$repeater = new Repeater();
		$repeater->add_control('layout', array(
			'label' => __('Elrendezés', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => '',
			'options' => array(
				'' => __('Automatikus (sorszám alapján)', 'layero-shop-ui'),
				'lifestyle-gift' => __('Életkép — személyes ajándék', 'layero-shop-ui'),
				'lifestyle-home' => __('Életkép — közös pillanatok', 'layero-shop-ui'),
				'lifestyle-festive' => __('Életkép — ünnepi meglepetés', 'layero-shop-ui'),
				'comparison' => __('Lámpa előtte / utána', 'layero-shop-ui'),
				'spotlight' => __('Termék-spotlight', 'layero-shop-ui'),
				'cover' => __('Teljes képes borító', 'layero-shop-ui'),
				'split' => __('Kétoszlopos termék', 'layero-shop-ui'),
				'festive' => __('Ünnepi kampány', 'layero-shop-ui'),
				'sale' => __('Akciós kampány', 'layero-shop-ui'),
				'statement' => __('Középre zárt állítás', 'layero-shop-ui'),
			),
		));
		$repeater->add_control('eyebrow', array(
			'label' => __('Felirat', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Layero Shop',
		));
		$repeater->add_control('title', array(
			'label' => __('Cím', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Ajándék, ami <em>rólad</em> szól.',
		));
		$repeater->add_control('text', array(
			'label' => __('Leírás', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXTAREA,
		));
		$repeater->add_control('image', array(
			'label' => __('Főkép', 'layero-shop-ui'),
			'type' => Controls_Manager::MEDIA,
		));
		$repeater->add_control('secondary_image', array(
			'label' => __('Másodlagos kép (előtte / utána)', 'layero-shop-ui'),
			'type' => Controls_Manager::MEDIA,
		));
		$repeater->add_control('mobile_image', array(
			'label' => __('Álló mobilkép (életképes banner)', 'layero-shop-ui'),
			'type' => Controls_Manager::MEDIA,
		));
		for ($i = 2; $i <= 4; $i++) {
			$repeater->add_control('spotlight_image_' . $i, array(
				'label' => sprintf(__('Spotlight kép %d', 'layero-shop-ui'), $i),
				'type' => Controls_Manager::MEDIA,
			));
		}
		$repeater->add_control('badge_text', array(
			'label' => __('Képcímke', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
		));
		$repeater->add_control('button_text', array(
			'label' => __('Fő gomb szöveg', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
		));
		$repeater->add_control('button_url', array(
			'label' => __('Fő gomb link', 'layero-shop-ui'),
			'type' => Controls_Manager::URL,
		));
		$repeater->add_control('secondary_text', array(
			'label' => __('Másodlagos link szöveg', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
		));
		$repeater->add_control('secondary_url', array(
			'label' => __('Másodlagos link', 'layero-shop-ui'),
			'type' => Controls_Manager::URL,
		));

		$this->add_control('slides', array(
			'label' => __('Slide lista', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ title }}}',
			'default' => $this->default_slides(),
		));
		$this->end_controls_section();

		$this->start_controls_section('settings_section', array('label' => __('Működés', 'layero-shop-ui')));
		$this->add_control('hero_style', array(
			'label' => __('Hero színvilág', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'studio',
			'options' => array(
				'studio' => __('Studio', 'layero-shop-ui'),
				'aurora' => __('Aurora', 'layero-shop-ui'),
				'editorial' => __('Editorial', 'layero-shop-ui'),
				'neon' => __('Neon', 'layero-shop-ui'),
				'sunset' => __('Sunset', 'layero-shop-ui'),
			),
		));
		$this->add_control('show_arrows', array(
			'label' => __('Nyilak megjelenítése', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->add_control('show_dots', array(
			'label' => __('Pont navigáció', 'layero-shop-ui'),
			'type' => Controls_Manager::SWITCHER,
			'default' => 'yes',
		));
		$this->add_control('autoplay_speed', array(
			'label' => __('Automatikus váltás (ms)', 'layero-shop-ui'),
			'type' => Controls_Manager::NUMBER,
			'default' => 0,
			'min' => 0,
			'step' => 500,
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array(
			'label' => __('Megjelenés', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_responsive_control('min_height', array(
			'label' => __('Minimum magasság', 'layero-shop-ui'),
			'type' => Controls_Manager::SLIDER,
			'size_units' => array('px', 'vh'),
			'range' => array(
				'px' => array('min' => 200, 'max' => 1000),
				'vh' => array('min' => 20, 'max' => 100),
			),
			'selectors' => array('{{WRAPPER}} .sh-slider' => 'min-height: {{SIZE}}{{UNIT}};'),
		));
		$this->add_control('title_tag', array(
			'label' => __('Cím HTML tag', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'h1',
			'options' => array('h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3'),
		));
		$this->add_group_control(
			\Elementor\Group_Control_Typography::get_type(),
			array(
				'name' => 'title_typography',
				'label' => __('Cím tipográfia', 'layero-shop-ui'),
				'selector' => '{{WRAPPER}} .sh-slide h1, {{WRAPPER}} .sh-slide h2, {{WRAPPER}} .sh-slide h3',
			)
		);
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$slides = ! empty($settings['slides']) ? $settings['slides'] : $this->default_slides();
		$migrated_defaults = $this->is_default_set($slides, $this->legacy_default_slides()) || $this->is_default_set($slides, $this->lifestyle_slides());
		if ($migrated_defaults) { $slides = $this->default_slides(); }
		$lifestyle = (bool) array_filter($slides, static function ($slide) { return 0 === strpos($slide['layout'] ?? '', 'lifestyle-'); });
		$title_tag = $settings['title_tag'] ?? 'h1';
		$hero_style = $settings['hero_style'] ?? 'studio';
		if (! in_array($title_tag, array('h1', 'h2', 'h3'), true)) {
			$title_tag = 'h1';
		}
		if (! in_array($hero_style, array('studio', 'aurora', 'editorial', 'neon', 'sunset'), true)) {
			$hero_style = 'studio';
		}
		if (function_exists('is_front_page') && is_front_page()) {
			$title_tag = 'h1';
		}
		?>
		<section class="sh-slider<?php echo $lifestyle ? ' sh-slider--lifestyle' : ''; ?>" id="sh-slider" data-autoplay="<?php echo esc_attr($migrated_defaults ? 0 : max(0, (int) ($settings['autoplay_speed'] ?? 0))); ?>" data-hero-style="<?php echo esc_attr($hero_style); ?>" aria-label="<?php esc_attr_e('Kiemelt ajánlatok', 'layero-shop-ui'); ?>">
			<?php foreach ($slides as $index => $slide) : ?>
				<?php $this->render_slide($slide, $index, 0 === $index ? 'h1' : ('h1' === $title_tag ? 'h2' : $title_tag)); ?>
			<?php endforeach; ?>
			<?php if ('yes' === ($settings['show_arrows'] ?? 'yes') && count($slides) > 1) : ?>
				<button class="sh-slider__nav sh-slider__nav--prev" type="button" data-slide-prev aria-label="<?php esc_attr_e('Előző', 'layero-shop-ui'); ?>">&lsaquo;</button>
				<button class="sh-slider__nav sh-slider__nav--next" type="button" data-slide-next aria-label="<?php esc_attr_e('Következő', 'layero-shop-ui'); ?>">&rsaquo;</button>
			<?php endif; ?>
			<?php if ('yes' === ($settings['show_dots'] ?? 'yes') && count($slides) > 1) : ?>
				<div class="sh-slider__dots" id="sh-slider-dots" role="tablist" aria-label="<?php esc_attr_e('Slide választó', 'layero-shop-ui'); ?>"></div>
			<?php endif; ?>
		</section>
		<?php
	}

	private function render_slide($slide, $index, $title_tag) {
		$layouts = array('comparison', 'spotlight', 'cover', 'split', 'festive', 'sale', 'statement');
		$layout = ! empty($slide['layout']) ? $slide['layout'] : ($layouts[$index] ?? 'cover');
		$is_on = 0 === $index ? ' is-on' : '';

		if ('comparison' === $layout) {
			$this->render_comparison_slide($slide, $is_on, $title_tag);
			return;
		}
		if ('spotlight' === $layout) {
			$this->render_spotlight_slide($slide, $is_on, $title_tag);
			return;
		}
		if (in_array($layout, array('cover', 'split', 'festive', 'lifestyle-gift', 'lifestyle-home', 'lifestyle-festive'), true)) {
			$this->render_campaign_slide($slide, $layout, $is_on, $title_tag);
			return;
		}

		$image_fallbacks = array(
			'cover' => 'termekvilag/hero_slider/layero-asset-0010.webp',
			'split' => 'termekvilag/hero_slider/layero-asset-0016.webp',
			'festive' => 'termekvilag/hero_slider/layero-asset-0017.webp',
			'sale' => 'termekvilag/hero_slider/layero-asset-0009.webp',
		);
		$image_url = $this->slide_image($slide, $image_fallbacks[$layout] ?? '');

		if ('statement' === $layout) {
			?>
			<article class="sh-slide sh-slide--mid sh-slide--ink<?php echo esc_attr($is_on); ?>">
				<div class="shop-wrap sh-slide__inner"><div class="sh-hc sh-hc--center sh-hc--hero"><?php $this->render_copy($slide, $title_tag); ?></div></div>
			</article>
			<?php
			return;
		}

		$layout_class = 'split' === $layout ? 'split2' : $layout;
		$copy_class = 'split' === $layout ? 'sh-hc sh-hc--xl' : 'sh-hc';
		?>
		<article class="sh-slide sh-slide--mid sh-slide--<?php echo esc_attr($layout_class . $is_on); ?>">
			<div class="shop-wrap sh-slide__inner sh-slide__inner--2col">
				<div class="<?php echo esc_attr($copy_class); ?>">
					<?php if ('festive' === $layout && ! empty($slide['eyebrow'])) : ?>
						<span class="sh-promo-badge"><?php echo esc_html($slide['eyebrow']); ?></span>
						<?php $slide['eyebrow'] = ''; ?>
					<?php endif; ?>
					<?php $this->render_copy($slide, $title_tag, 'sale' === $layout); ?>
				</div>
				<div class="sh-hframe">
					<img src="<?php echo esc_url($image_url); ?>" alt="" decoding="async">
					<?php if ('festive' === $layout) : ?><span class="sh-hframe__tag"><?php echo esc_html(! empty($slide['badge_text']) ? $slide['badge_text'] : '-20%'); ?></span><span class="sh-fchip sh-fchip--bl"><i>🎁</i> Ünnepi kedvenc</span><?php endif; ?>
					<?php if ('sale' === $layout) : ?><span class="sh-sale-seal"><?php echo esc_html(! empty($slide['badge_text']) ? $slide['badge_text'] : 'AKCIÓ'); ?></span><?php endif; ?>
					<?php if ('split' === $layout) : ?><span class="sh-fchip sh-fchip--tr"><i>✦</i> <?php echo esc_html(! empty($slide['badge_text']) ? $slide['badge_text'] : 'Névre szabható'); ?></span><?php endif; ?>
				</div>
			</div>
		</article>
		<?php
	}

	private function render_comparison_slide($slide, $is_on, $title_tag) {
		$off = ! empty($slide['secondary_image']['url']) ? $slide['secondary_image']['url'] : Shop_Content::asset_url('termekvilag/lampa-ba/layero-asset-0179-600.webp');
		$on = ! empty($slide['secondary_image']['url']) && ! empty($slide['image']['url']) ? $slide['image']['url'] : Shop_Content::asset_url('termekvilag/lampa-ba/layero-asset-0180-600.webp');
		?>
		<article class="sh-slide sh-slide--ba<?php echo esc_attr($is_on); ?>">
			<div class="shop-wrap sh-slide__ba-inner">
				<div class="sh-slide__ba-copy">
					<?php $this->render_copy($slide, $title_tag); ?>
					<p class="sh-slide__eta" id="sh-hero-eta"></p>
				</div>
				<div class="sh-slide__ba-stage">
					<div class="ro-ba" data-lamp-ba tabindex="0" role="img" aria-label="Egyedi lámpa felkapcsolt és lekapcsolt állapotának összehasonlítása">
						<img class="ro-ba__img" src="<?php echo esc_url($off); ?>" alt="" draggable="false" fetchpriority="high" decoding="async">
						<div class="ro-ba__top" aria-hidden="true"><img class="ro-ba__img" src="<?php echo esc_url($on); ?>" alt="" draggable="false" fetchpriority="high" decoding="async"></div>
						<div class="ro-ba__handle" aria-hidden="true"><span class="ro-ba__grip">&lsaquo;&rsaquo;</span></div>
						<span class="ro-ba__tag ro-ba__tag--on" aria-hidden="true">Felkapcsolva</span>
						<span class="ro-ba__tag ro-ba__tag--off" aria-hidden="true">Lekapcsolva</span>
					</div>
					<p class="sh-slide__ba-hint" aria-hidden="true">Húzd el a csúszkát — így világít este</p>
				</div>
			</div>
		</article>
		<?php
	}

	private function render_spotlight_slide($slide, $is_on, $title_tag) {
		$defaults = array(
			array('F1 2026 naptár', 'kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-01.jpg'),
			array('Borosüveg-tartó', 'termekvilag/hero_slider/layero-asset-0021.webp'),
			array('Gyűrűk Ura', 'kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-03.jpg'),
			array('Logós kulcstartó', 'termekvilag/hero_slider/layero-asset-0027.webp'),
		);
		$items = array();
		foreach ($defaults as $item_index => $default) {
			$key = 0 === $item_index ? 'image' : 'spotlight_image_' . ($item_index + 1);
			$url = ! empty($slide[$key]['url']) ? $slide[$key]['url'] : Shop_Content::asset_url($default[1]);
			$items[] = array($default[0], $url);
		}
		?>
		<article class="sh-slide sh-slide--spot<?php echo esc_attr($is_on); ?>">
			<div class="shop-wrap sh-slide__spot-inner">
				<div class="sh-slide__spot-copy"><?php $this->render_copy($slide, $title_tag); ?></div>
				<div class="sh-slide__spot-stage"><div class="sh-spot" data-spot>
					<div class="sh-spot__frame">
						<span class="sh-spot__badge" data-spot-badge><?php echo esc_html($items[0][0]); ?></span>
						<span class="sh-fchip sh-fchip--bl"><i>✦</i> Egyedi darab</span>
						<div class="sh-spot__imgs"><?php foreach ($items as $item_index => $item) : ?><img class="sh-spot__img<?php echo 0 === $item_index ? ' is-on' : ''; ?>" data-theme="<?php echo esc_attr($item[0]); ?>" src="<?php echo esc_url($item[1]); ?>" alt="<?php echo esc_attr($item[0]); ?>" decoding="async"><?php endforeach; ?></div>
					</div>
					<div class="sh-spot__dots" role="tablist" aria-label="Termékek"><?php foreach ($items as $item_index => $item) : ?><button class="sh-spot__dot<?php echo 0 === $item_index ? ' is-on' : ''; ?>" type="button" data-spot-dot="<?php echo esc_attr($item_index); ?>" role="tab" aria-selected="<?php echo 0 === $item_index ? 'true' : 'false'; ?>" aria-label="<?php echo esc_attr($item[0]); ?>"></button><?php endforeach; ?></div>
				</div></div>
			</div>
		</article>
		<?php
	}

	private function render_campaign_slide($slide, $layout, $is_on, $title_tag) {
		$art = array(
			'cover' => array('gift', 'layero-asset-0010', 'hero-collection.webp', 'Egy kisfiú édesanyjától kapja meg a névre szóló dínós lámpáját'),
			'split' => array('home', 'layero-asset-0016', 'hero-lamp.webp', 'Meghitt közös este a Hullám lámpa meleg fényében'),
			'festive' => array('festive', 'layero-asset-0017', 'hero-festive.webp', 'Ünnepi ajándékbontás a karácsonyi kedvenc-lámpával'),
		);
		$aliases = array('lifestyle-gift' => 'cover', 'lifestyle-home' => 'split', 'lifestyle-festive' => 'festive');
		$reference = $art[$aliases[$layout] ?? $layout];
		$image = $slide['image']['url'] ?? '';
		$filename = basename(wp_parse_url($image, PHP_URL_PATH) ?: '');
		$uses_default = ! $image || in_array($filename, array($reference[1] . '.webp', $reference[1] . '.png', $reference[2], 'lifestyle-' . $reference[0] . '.webp'), true);
		if ($uses_default) { $image = Shop_Content::asset_url('banners/lifestyle-' . $reference[0] . '.webp'); }
		$mobile = $slide['mobile_image']['url'] ?? '';
		if (! $mobile && $uses_default) { $mobile = Shop_Content::asset_url('banners/lifestyle-' . $reference[0] . '-mobile.webp'); }
		?>
		<article class="sh-slide sh-slide--lifestyle<?php echo esc_attr($is_on); ?>">
			<picture class="sh-lifestyle__media">
				<?php if ($mobile) : ?><source media="(max-width: 820px)" srcset="<?php echo esc_url($mobile); ?>"><?php endif; ?>
				<img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($uses_default ? $reference[3] : ''); ?>" decoding="async"<?php echo $is_on ? ' fetchpriority="high"' : ' loading="lazy"'; ?>>
			</picture>
			<div class="shop-wrap sh-lifestyle__inner">
				<div class="sh-lifestyle__copy"><?php $this->render_copy($slide, $title_tag); ?>
					<?php if (! empty($slide['badge_text'])) : ?><p class="sh-lifestyle__note"><?php echo esc_html($slide['badge_text']); ?></p><?php endif; ?>
				</div>
			</div>
		</article>
		<?php
	}

	private function render_copy($slide, $title_tag, $sale = false) {
		if (! empty($slide['eyebrow'])) {
			echo '<span class="sh-slide__eyebrow">' . esc_html($slide['eyebrow']) . '</span>';
		}
		$title_class = $sale ? ' class="sh-sale-big"' : '';
		echo '<' . esc_html($title_tag) . $title_class . '>' . wp_kses($slide['title'] ?? '', array('em' => array(), 'br' => array())) . '</' . esc_html($title_tag) . '>';
		if (! empty($slide['text'])) {
			echo '<p' . ($sale ? ' class="sh-sale-sub"' : '') . '>' . esc_html($slide['text']) . '</p>';
		}
		echo '<div class="sh-slide__cta">';
		if (! empty($slide['button_text'])) {
			echo '<a class="sh-btn sh-btn--white" href="' . esc_url($this->get_link_url($slide['button_url'] ?? array())) . '">' . esc_html($slide['button_text']) . '</a>';
		}
		if (! empty($slide['secondary_text'])) {
			echo '<a class="sh-link--light" href="' . esc_url($this->get_link_url($slide['secondary_url'] ?? array())) . '">' . esc_html(rtrim($slide['secondary_text'], " ›»")) . ' &rsaquo;</a>';
		}
		echo '</div>';
	}

	private function slide_image($slide, $fallback) {
		if (! empty($slide['image']['url'])) {
			return $slide['image']['url'];
		}
		return $fallback ? Shop_Content::asset_url($fallback) : '';
	}

	private function default_slides() {
		return array_merge(array_slice($this->legacy_default_slides(), 0, 2), $this->lifestyle_slides());
	}

	private function lifestyle_slides() {
		return array(
			array('layout' => 'lifestyle-gift', 'eyebrow' => 'Ajándék, ami csak neki szól', 'title' => 'Egy ajándék.<br>És az a bizonyos <em>mosoly.</em>', 'text' => 'A neve. A kedvenc világa. Egy apró részlet, amitől tudja: ezt neki választottad.', 'button_text' => 'Megtalálom az ajándékát', 'button_url' => array('url' => '/termekek/'), 'secondary_text' => 'Segíts választani', 'secondary_url' => array('url' => '/kviz/'), 'badge_text' => 'Személyre szabható • Szatmárnémetiben készül'),
			array('layout' => 'lifestyle-home', 'eyebrow' => 'A közös pillanataitokhoz', 'title' => 'Egy kis fény.<br><em>Sok közös este.</em>', 'text' => 'Lepd meg egy különleges lámpával, amely minden este a közös otthonotok része lesz.', 'button_text' => 'Lámpát választok neki', 'button_url' => array('url' => '/termekek/?cat=lampak'), 'secondary_text' => 'Saját ötletem van', 'secondary_url' => array('url' => '/egyedi-rendeles/'), 'badge_text' => 'Egyedi tervezés • Szatmárnémetiből'),
			array('layout' => 'lifestyle-festive', 'eyebrow' => 'A legszemélyesebb meglepetés', 'title' => 'Amikor kibontja,<br><em>magára ismer.</em>', 'text' => 'A közös történetetek, a kedvencetek, egy nektek fontos emlék. Idén ez legyen az ajándék.', 'button_text' => 'Ünnepi ajándékot keresek', 'button_url' => array('url' => '/termekek/?cat=szezonalis'), 'secondary_text' => 'Egyedi ajándékot kérek', 'secondary_url' => array('url' => '/egyedi-rendeles/'), 'badge_text' => 'Személyes részletek • Egyedi ajándékok'),
		);
	}

	private function is_default_set($slides, $legacy) {
		if (count($slides) !== count($legacy)) { return false; }
		foreach ($legacy as $index => $default) {
			$slide = $slides[$index];
			foreach (array('eyebrow', 'title', 'text', 'button_text', 'secondary_text', 'badge_text') as $key) {
				if (($slide[$key] ?? '') !== ($default[$key] ?? '')) { return false; }
			}
			if (! empty($slide['layout']) && $slide['layout'] !== $default['layout']) { return false; }
			foreach (array('button_url', 'secondary_url') as $key) {
				if ($this->get_link_url($slide[$key] ?? array()) !== $this->get_link_url($default[$key] ?? array())) { return false; }
			}
			foreach (array('mobile_image', 'secondary_image', 'spotlight_image_2', 'spotlight_image_3', 'spotlight_image_4') as $key) {
				if (is_array($slide[$key] ?? null) ? ! empty($slide[$key]['url']) : ! empty($slide[$key])) { return false; }
			}
			$image = $slide['image']['url'] ?? '';
			if ($image && $image !== ($default['image']['url'] ?? '')) { return false; }
		}
		return true;
	}

	private function legacy_default_slides() {
		return array(
			array('layout' => 'comparison', 'eyebrow' => 'Személyre szabott 3D ajándékok', 'title' => 'Ajándék, ami <em>rólad</em> szól.', 'text' => 'Névre szóló lámpák, kulcstartók és dekorációk — egyetlen példányban, a te ötletedből nyomtatva.', 'button_text' => 'Lámpák felfedezése', 'button_url' => array('url' => '/termekek/?cat=lampak'), 'secondary_text' => 'Összes termék', 'secondary_url' => array('url' => '/termekek/')),
			array('layout' => 'spotlight', 'eyebrow' => 'Népszerű termékek', 'title' => 'Ajándék minden <em>szenvedélyre</em>.', 'text' => 'F1-naptár, borosüveg-tartó, filmes falidísz vagy névre szóló kulcstartó — 3D nyomtatva, a te ötleted szerint.', 'button_text' => 'Összes termék', 'button_url' => array('url' => '/termekek/'), 'secondary_text' => 'Segíts választani', 'secondary_url' => array('url' => '/kviz/')),
			array('layout' => 'cover', 'eyebrow' => 'Új kollekció', 'title' => 'Az ajándék, amire <em>évekig</em> emlékeznek.', 'text' => 'Névre szóló lámpák és dekorációk — kézzel tervezve, 3D-ben nyomtatva, egyetlen példányban.', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0010.webp')), 'button_text' => 'Kollekció felfedezése', 'button_url' => array('url' => '/termekek/'), 'secondary_text' => 'Segíts választani', 'secondary_url' => array('url' => '/kviz/')),
			array('layout' => 'split', 'eyebrow' => 'Asztali lámpák', 'title' => 'A fény, ami a <em>nevedet</em> mondja.', 'text' => 'Egyedi tervezésű lámpák meleg LED-fénnyel — a te szövegeddel, a te dátumoddal.', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0016.webp')), 'button_text' => 'Lámpák megnézése', 'button_url' => array('url' => '/termekek/?cat=lampak'), 'secondary_text' => 'Összes termék', 'secondary_url' => array('url' => '/termekek/')),
			array('layout' => 'festive', 'eyebrow' => 'Ünnepi kollekció', 'title' => 'Karácsonyi <em>fény</em>, névre szabva.', 'text' => 'Ünnepi lámpák és mécses-szettek — rendeld időben, hogy biztosan ott legyen a fa alatt.', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0017.webp')), 'button_text' => 'Ünnepi kollekció', 'button_url' => array('url' => '/termekek/?cat=szezonalis'), 'secondary_text' => 'Összes termék', 'secondary_url' => array('url' => '/termekek/')),
			array('layout' => 'sale', 'eyebrow' => 'Szezonvég', 'title' => '<em>-20%</em> minden lámpára', 'text' => 'Csak most: a teljes lámpa-kollekcióra, a pénztárnál automatikusan levonva.', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0009.webp')), 'button_text' => 'Irány a lámpák', 'button_url' => array('url' => '/termekek/?cat=lampak'), 'secondary_text' => 'Összes termék', 'secondary_url' => array('url' => '/termekek/')),
			array('layout' => 'statement', 'eyebrow' => 'Layero — személyre szabott 3D', 'title' => 'Nem ajándék. <em>Emlék</em>, amit kinyomtatunk.', 'text' => 'Küldd el az ötleted vagy egy referenciaképet — megtervezzük, és egyetlen példányban legyártjuk.', 'button_text' => 'Ajánlatot kérek', 'button_url' => array('url' => '/egyedi-rendeles/'), 'secondary_text' => 'Nem tudom, mit — kvíz', 'secondary_url' => array('url' => '/kviz/')),
		);
	}
}
