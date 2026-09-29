<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;

if (! defined('ABSPATH')) { exit; }

class Custom_Order_Pricing extends Base_Widget {
	public function get_name() { return 'layero_custom_order_pricing'; }
	public function get_title() { return __('Layero egyedi rendelés árak', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-price-table'; }
	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui'))); $this->add_section_header_controls(array('eyebrow' => 'Árak, őszintén', 'title' => 'Mennyibe kerül? <span>Nincs rejtett költség.</span>')); $this->add_heading_tag_control();
		$repeater = new Repeater(); $repeater->add_control('tag', array('label' => __('Címke', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT)); $repeater->add_control('value', array('label' => __('Fő érték', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT)); $repeater->add_control('suffix', array('label' => __('Kiegészítés', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT)); $repeater->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA)); $repeater->add_control('features', array('label' => __('Pontok, soronként', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA)); $repeater->add_control('featured', array('label' => __('Kiemelt kártya', 'layero-shop-ui'), 'type' => Controls_Manager::SWITCHER));
		$this->add_control('items', array('type' => Controls_Manager::REPEATER, 'fields' => $repeater->get_controls(), 'title_field' => '{{{ tag }}}', 'default' => array(
			array('tag' => 'Egyszerűbb darab', 'value' => '100–300', 'suffix' => 'lej', 'text' => 'Névtáblák, kisebb figurák, feliratos dekorációk — a legtöbb egyedi kérés ebbe a sávba esik.', 'features' => "Tervezés az árban\nMódosítási kör az árban"),
			array('tag' => 'Pontos ajánlat', 'value' => '24–48', 'suffix' => 'órán belül', 'text' => 'Az ötleted alapján konkrét árat és határidőt mondunk — ingyen, és semmire nem kötelez.', 'features' => "Ár és határidő előre\nGyártás csak jóváhagyás után\nA jóváhagyásig díjmentesen lemondható", 'featured' => 'yes'),
			array('tag' => 'Összetett projekt', 'value' => 'Egyedi', 'suffix' => 'kalkuláció', 'text' => 'Nagyobb méret, több alkatrész, világítás vagy különleges anyag — tételes ajánlatot kapsz.', 'features' => "Tételes, átlátható árazás\nJellemzően 7–15 munkanap"),
		)));
		$this->end_controls_section(); $this->add_section_header_style_controls();
	}
	protected function render() { $settings = $this->get_settings_for_display(); $items = ! empty($settings['items']) ? $settings['items'] : array(); ?>
		<section class="sh-band sh-band--tight lyr-custom-order-pricing"><div class="shop-wrap"><?php $this->render_section_header($settings); ?><div class="lp-price"><?php foreach ($items as $item) : $features = preg_split('/\r\n|\r|\n/', (string) ($item['features'] ?? '')); ?><article class="sh-reveal<?php echo 'yes' === ($item['featured'] ?? '') ? ' is-hero' : ''; ?>"><span class="lp-price__tag"><?php echo esc_html($item['tag'] ?? ''); ?></span><b><?php echo esc_html($item['value'] ?? ''); ?><?php if (! empty($item['suffix'])) : ?> <small><?php echo esc_html($item['suffix']); ?></small><?php endif; ?></b><p><?php echo esc_html($item['text'] ?? ''); ?></p><?php if ($features) : ?><ul><?php foreach ($features as $feature) : if ('' !== trim($feature)) : ?><li><?php echo Helpers::icon('check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html(trim($feature)); ?></li><?php endif; endforeach; ?></ul><?php endif; ?></article><?php endforeach; ?></div></div></section>
	<?php }
}
