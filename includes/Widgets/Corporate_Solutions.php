<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Corporate_Solutions extends Base_Widget {
	public function get_name() {
		return 'layero_corporate_solutions';
	}

	public function get_title() {
		return __('Layero céges megoldások', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Megoldások vállalkozásoknak',
			'title' => 'Nem katalógust adunk. <span>A márkádhoz tervezünk.</span>',
			'text' => 'Válassz egy bevált kiindulópontot, vagy küldd el a saját ötletedet.',
		));
		$this->add_heading_tag_control();

		$repeater = new Repeater();
		$repeater->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$repeater->add_control('features', array('label' => __('Előnyök, soronként', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$repeater->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA));
		$repeater->add_control('button_text', array('label' => __('Link szövege', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Részletek és ajánlat'));
		$repeater->add_control('button_url', array('label' => __('Link', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#ceges-ajanlat')));
		$this->add_control('items', array(
			'label' => __('Megoldáskártyák', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ title }}}',
			'default' => array(
				array(
					'eyebrow' => 'Vendéglátás és üzlet',
					'title' => 'QR + NFC displayek',
					'text' => 'Google-értékelés, digitális étlap vagy weboldal egyetlen érintésre — teljesen a céges arculatodra szabva.',
					'features' => "Egyedi logó és színek\nQR és programozott NFC\nAsztali vagy falra szerelhető",
					'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0022.webp')),
				),
				array(
					'eyebrow' => 'Partnerek és csapat',
					'title' => 'Logózott ajándékok',
					'text' => 'Kulcstartók, asztali tárgyak és csomagok, amelyek nem egy újabb reklámtárgynak, hanem valódi ajándéknak érződnek.',
					'features' => "1–500+ darabos széria\nNévvel is személyre szabható\nEgyedi csomagolási opciók",
					'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0027.webp')),
				),
				array(
					'eyebrow' => 'Rendezvény és kampány',
					'title' => 'Egyedi installációk',
					'text' => 'Névjegytartó, pultdisplay, díj, dekoráció vagy prototípus — olyan tárgy, amely pontosan az eseményhez készül.',
					'features' => "Gyors prototípus és látványterv\nKis széria is rendelhető\nRugalmas méret és anyaghasználat",
					'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0009.png')),
				),
			),
		));
		$this->end_controls_section();

		$this->add_section_header_style_controls();
		$this->start_controls_section('cards_style', array('label' => __('Kártyák', 'layero-shop-ui'), 'tab' => Controls_Manager::TAB_STYLE));
		$this->add_control('card_radius', array('label' => __('Lekerekítés', 'layero-shop-ui'), 'type' => Controls_Manager::SLIDER, 'size_units' => array('px'), 'range' => array('px' => array('min' => 0, 'max' => 32)), 'selectors' => array('{{WRAPPER}} .lyr-corp-solution' => 'border-radius: {{SIZE}}{{UNIT}};')));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = ! empty($settings['items']) ? $settings['items'] : array();
		?>
		<section class="lyr-corp-section lyr-corp-solutions" id="ceges-megoldasok">
			<div class="shop-wrap">
				<?php $this->render_section_header($settings, 'lyr-corp-section__head'); ?>
				<div class="lyr-corp-solutions__grid">
					<?php foreach ($items as $index => $item) :
						$image = $item['image']['url'] ?? '';
						$features = preg_split('/\r\n|\r|\n/', (string) ($item['features'] ?? ''));
						?>
						<article class="lyr-corp-solution<?php echo 0 === $index ? ' is-featured' : ''; ?>">
							<?php if ($image) : ?><figure><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($item['title'] ?? ''); ?>" loading="lazy" decoding="async"><span><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></span></figure><?php endif; ?>
							<div class="lyr-corp-solution__body">
								<span class="lyr-corp-kicker"><?php echo esc_html($item['eyebrow'] ?? ''); ?></span>
								<h3><?php echo esc_html($item['title'] ?? ''); ?></h3>
								<p><?php echo esc_html($item['text'] ?? ''); ?></p>
								<?php if ($features) : ?><ul><?php foreach ($features as $feature) : if ('' !== trim($feature)) : ?><li><?php echo esc_html(trim($feature)); ?></li><?php endif; endforeach; ?></ul><?php endif; ?>
								<?php if (! empty($item['button_text'])) : ?><a href="<?php echo esc_url($this->get_link_url($item['button_url'] ?? array(), '#ceges-ajanlat')); ?>"><?php echo esc_html($item['button_text']); ?> <span aria-hidden="true">↗</span></a><?php endif; ?>
							</div>
						</article>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
		<?php
	}
}
