<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Corporate_Solutions extends Base_Widget {
	public function get_name() { return 'layero_corporate_solutions'; }
	public function get_title() { return __('Layero céges megoldások', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-gallery-grid'; }

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array('eyebrow' => 'Megoldások', 'title' => 'Mit gyártunk cégeknek? <span>Négy irány, egy műhely.</span>'));
		$this->add_heading_tag_control();
		$repeater = new Repeater();
		$repeater->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$repeater->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA));
		$repeater->add_control('button_text', array('label' => __('Link szövege', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Megnézem ›'));
		$repeater->add_control('button_url', array('label' => __('Link', 'layero-shop-ui'), 'type' => Controls_Manager::URL));
		$this->add_control('items', array(
			'label' => __('Megoldáskártyák', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'title_field' => '{{{ title }}}',
			'default' => array(
				array('title' => 'QR + NFC display', 'text' => 'Étlap, Google-értékelés vagy weboldal egy érintésre — a logóddal', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0022.webp')), 'button_url' => array('url' => 'termek.html?id=qr-nfc-display')),
				array('title' => 'Logós ajándéktárgyak', 'text' => 'Kulcstartók, poháralátétek, apró figyelmességek — darabtól a csomagig', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0027.webp')), 'button_url' => array('url' => 'termek.html?id=logos-kulcstarto')),
				array('title' => 'Rendezvény- és csapatcsomagok', 'text' => 'Egységes arculat, egyedi nevekkel — díszdobozban', 'image' => array('url' => Shop_Content::asset_url('images/categories/layero-asset-0222-1100.webp')), 'button_url' => array('url' => 'termek.html?id=ceges-ajandekcsomag')),
				array('title' => 'Teljesen egyedi projekt', 'text' => 'Ha olyat szeretnél, ami még nincs — megtervezzük és legyártjuk', 'image' => array('url' => Shop_Content::asset_url('images/categories/layero-asset-0224-1100.webp')), 'button_url' => array('url' => '/egyedi-rendeles/')),
			),
		));
		$this->end_controls_section();
		$this->add_section_header_style_controls();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = ! empty($settings['items']) ? $settings['items'] : array();
		?>
		<section class="sh-band sh-band--tight lyr-corp-section lyr-corp-solutions" id="megoldasok">
			<div class="shop-wrap">
				<?php $this->render_section_header($settings); ?>
				<div class="lp-grid">
					<?php foreach ($items as $item) : $image = $item['image']['url'] ?? ''; $button_text = $item['button_text'] ?? __('Megnézem ›', 'layero-shop-ui'); ?>
						<a class="sh-bento sh-reveal" href="<?php echo esc_url($this->get_link_url($item['button_url'] ?? array(), '#ajanlat')); ?>">
							<?php if ($image) : ?><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($item['title'] ?? ''); ?>" loading="lazy" decoding="async"><?php endif; ?>
							<span class="sh-bento__body"><strong><?php echo esc_html($item['title'] ?? ''); ?></strong><small><?php echo esc_html($item['text'] ?? ''); ?></small><?php if ($button_text) : ?><i aria-hidden="true"><?php echo esc_html($button_text); ?></i><?php endif; ?></span>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
		<?php
	}
}
