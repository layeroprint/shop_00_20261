<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;

if (! defined('ABSPATH')) {
	exit;
}

class Corporate_Benefits extends Base_Widget {
	public function get_name() {
		return 'layero_corporate_benefits';
	}

	public function get_title() {
		return __('Layero céges előnyök', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-icon-box';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Miért Layero B2B?',
			'title' => 'Kis műhely rugalmassága. <span>Üzleti szintű folyamat.</span>',
			'text' => 'Egy kapcsolattartó, átlátható ajánlat és jóváhagyott terv a gyártás előtt.',
		));
		$this->add_heading_tag_control();

		$repeater = new Repeater();
		$repeater->add_control('icon', array(
			'label' => __('Ikon', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'check',
			'options' => array('briefcase' => __('Aktatáska', 'layero-shop-ui'), 'spark' => __('Szikra', 'layero-shop-ui'), 'package' => __('Csomag', 'layero-shop-ui'), 'clock' => __('Óra', 'layero-shop-ui'), 'leaf' => __('Levél', 'layero-shop-ui'), 'check' => __('Pipa', 'layero-shop-ui'), 'gift' => __('Ajándék', 'layero-shop-ui')),
		));
		$repeater->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$this->add_control('items', array(
			'label' => __('Előnyök', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ title }}}',
			'default' => array(
				array('icon' => 'spark', 'title' => 'Egyedi tervezés', 'text' => 'Nem sablonra tesszük rá a logót: a tárgy formája, színe és funkciója is a márkádhoz igazítható.'),
				array('icon' => 'package', 'title' => 'Skálázható mennyiség', 'text' => 'Próbadarabtól az 500+ darabos szériáig ugyanazzal a követhető minőséggel dolgozunk.'),
				array('icon' => 'clock', 'title' => 'Gyors visszajelzés', 'text' => 'Az igény beérkezése után jellemzően 24–48 órán belül pontosítunk és ajánlatot adunk.'),
				array('icon' => 'check', 'title' => 'Jóváhagyás gyártás előtt', 'text' => 'A végleges vizuális tervet és specifikációt előre egyeztetjük. Csak jóváhagyás után indul a gyártás.'),
			),
		));
		$this->end_controls_section();
		$this->add_section_header_style_controls();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = ! empty($settings['items']) ? $settings['items'] : array();
		?>
		<section class="lyr-corp-section lyr-corp-benefits">
			<div class="shop-wrap">
				<?php $this->render_section_header($settings, 'lyr-corp-section__head'); ?>
				<div class="lyr-corp-benefits__grid">
					<?php foreach ($items as $item) : ?>
						<article><span><?php echo Helpers::icon($item['icon'] ?? 'check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span><h3><?php echo esc_html($item['title'] ?? ''); ?></h3><p><?php echo esc_html($item['text'] ?? ''); ?></p></article>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
		<?php
	}
}
