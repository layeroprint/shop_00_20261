<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;

if (! defined('ABSPATH')) {
	exit;
}

class Corporate_FAQ extends Base_Widget {
	public function get_name() {
		return 'layero_corporate_faq';
	}

	public function get_title() {
		return __('Layero céges GYIK', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-help-o';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Gyakori üzleti kérdések',
			'title' => 'Amit érdemes tudni <span>az első egyeztetés előtt.</span>',
		));
		$this->add_heading_tag_control();
		$repeater = new Repeater();
		$repeater->add_control('question', array('label' => __('Kérdés', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('answer', array('label' => __('Válasz', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$this->add_control('items', array(
			'label' => __('Kérdések', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ question }}}',
			'default' => array(
				array('question' => 'Van minimum rendelési mennyiség?', 'answer' => 'Nincs általános kötelező minimum. Egyedi prototípust és kis szériát is vállalunk; a darabár természetesen a mennyiséggel kedvezőbbé válhat.'),
				array('question' => 'Mennyi idő alatt készül el egy céges rendelés?', 'answer' => 'A tervezés és jóváhagyás után a legtöbb rendelés 5–10 munkanap alatt készül el. Nagy széria vagy összetett projekt esetén az ajánlatban külön gyártási ütemezést adunk.'),
				array('question' => 'Kaphatunk mintadarabot a teljes gyártás előtt?', 'answer' => 'Igen. Nagyobb rendelésnél kérhető fizikai prototípus, egyszerűbb munkáknál pedig digitális látványtervet küldünk jóváhagyásra.'),
				array('question' => 'Milyen fájlformátumban küldjük a logót?', 'answer' => 'A vektoros SVG, PDF vagy AI a legjobb, de jó minőségű PNG-ből is el tudunk indulni. Ha csak egy fotó vagy vázlat van, azt is küldd el.'),
				array('question' => 'Céges számla és proforma kérhető?', 'answer' => 'Igen. Céges adatokat tartalmazó számlát és igény esetén proforma díjbekérőt is biztosítunk.'),
				array('question' => 'Tudtok teljesen egyedi tárgyat tervezni?', 'answer' => 'Igen. A katalógus kiindulópont, nem korlát. Funkció, méret, arculat és felhasználás alapján új tárgyat is megtervezünk.'),
			),
		));
		$this->end_controls_section();
		$this->add_section_header_style_controls();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = ! empty($settings['items']) ? $settings['items'] : array();
		?>
		<section class="lyr-corp-section lyr-corp-faq">
			<div class="shop-wrap lyr-corp-faq__grid">
				<?php $this->render_section_header($settings, 'lyr-corp-section__head'); ?>
				<div class="lyr-corp-faq__items">
					<?php foreach ($items as $index => $item) : ?>
						<details<?php echo 0 === $index ? ' open' : ''; ?>><summary><span><?php echo esc_html($item['question'] ?? ''); ?></span><i aria-hidden="true"></i></summary><div><p><?php echo esc_html($item['answer'] ?? ''); ?></p></div></details>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
		<?php
	}
}
