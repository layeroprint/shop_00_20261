<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) { exit; }

class Custom_Order_References extends Base_Widget {
	public function get_name() { return 'layero_custom_order_references'; }
	public function get_title() { return __('Layero egyedi rendelés referenciák', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-gallery-grid'; }
	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array('eyebrow' => 'Referenciák', 'title' => 'Ezek mind egy ötletből indultak. <span>Ma valakinek a polcán állnak.</span>'));
		$this->add_heading_tag_control();
		$repeater = new Repeater(); $repeater->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT)); $repeater->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA)); $repeater->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA)); $repeater->add_control('url', array('label' => __('Link', 'layero-shop-ui'), 'type' => Controls_Manager::URL));
		$this->add_control('items', array('type' => Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'title_field' => '{{{ title }}}', 'default' => array(
			array('title' => 'Családi szobor', 'text' => 'Egy beküldött fotó alapján mintáztuk meg a teljes családot', 'image' => array('url' => Shop_Content::asset_url('kulcstartok/60-csaladi-szobor/60-csaladi-szobor-02.jpg')), 'url' => array('url' => 'termek.html?id=csaladi-szobor')),
			array('title' => 'Kedvenc-lámpa', 'text' => 'A család kutyusai, sziluettként az ünnepi jelenetben', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0017.webp')), 'url' => array('url' => 'termek.html?id=karacsonyi-lampa')),
			array('title' => 'El Camino szobor', 'text' => '800 kilométer emléke — névvel, távval, évszámmal', 'image' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0010.webp')), 'url' => array('url' => 'termek.html?id=camino-szobor')),
			array('title' => 'Névtábla-lámpa', 'text' => 'Egy gyerekszoba kedvenc figurája — a gyerek nevével', 'image' => array('url' => Shop_Content::asset_url('kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-01.jpg')), 'url' => array('url' => 'termek.html?id=stitch-nevtabla-lampa')),
		)));
		$this->add_control('footer_text', array('label' => __('Alsó biztatás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'A te ötleted lehet a következő — nem kell hozzá kész terv.'));
		$this->add_control('button_text', array('label' => __('Gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Elküldöm az ötletem ›'));
		$this->add_control('button_url', array('label' => __('Gomb URL', 'layero-shop-ui'), 'type' => Controls_Manager::URL, 'default' => array('url' => '#ajanlat')));
		$this->end_controls_section(); $this->add_section_header_style_controls();
	}
	protected function render() { $settings = $this->get_settings_for_display(); $items = ! empty($settings['items']) ? $settings['items'] : array(); ?>
		<section class="sh-band sh-band--tight sh-band--gray lyr-custom-order-references"><div class="shop-wrap"><?php $this->render_section_header($settings); ?><div class="lp-grid"><?php foreach ($items as $item) : $image = $item['image']['url'] ?? ''; ?><a class="sh-bento sh-reveal" href="<?php echo esc_url($this->get_link_url($item['url'] ?? array(), '#ajanlat')); ?>"><?php if ($image) : ?><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($item['title'] ?? ''); ?>" loading="lazy" decoding="async"><?php endif; ?><span class="sh-bento__body"><strong><?php echo esc_html($item['title'] ?? ''); ?></strong><small><?php echo esc_html($item['text'] ?? ''); ?></small><i aria-hidden="true"><?php esc_html_e('Megnézem ›', 'layero-shop-ui'); ?></i></span></a><?php endforeach; ?></div><div class="sh-whyus-foot"><span><?php echo esc_html($settings['footer_text'] ?? ''); ?></span><?php if (! empty($settings['button_text'])) : ?><a class="sh-btn sh-btn--primary" href="<?php echo esc_url($this->get_link_url($settings['button_url'] ?? array(), '#ajanlat')); ?>"><?php echo esc_html($settings['button_text']); ?></a><?php endif; ?></div></div></section>
	<?php }
}
