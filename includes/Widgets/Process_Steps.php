<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Process_Steps extends Base_Widget {
	public function get_name() {
		return 'layero_process_steps';
	}

	public function get_title() {
		return __('Layero folyamat lépések', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-number-field';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_section_header_controls(array(
			'eyebrow' => 'Folyamat',
			'title' => 'Így készül a te darabod. <span>Az ötlettől a csomagig.</span>',
			'button_text' => 'Hogyan működik?',
			'button_url' => array('url' => '/gyik/'),
		));
		$this->add_heading_tag_control();
		$this->add_control('layout', array(
			'label' => __('Elrendezés', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'cards',
			'options' => array(
				'cards' => __('Kártyás', 'layero-shop-ui'),
				'landing' => __('Landing oldal – ikonos kártyák', 'layero-shop-ui'),
			),
		));
		$this->add_control('section_id', array('label' => __('Szekció azonosító', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'description' => __('Példa: folyamat. Horgonylinkhez használható.', 'layero-shop-ui')));

		$repeater = new Repeater();
		$repeater->add_control('number', array('label' => __('Sorszám', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => '1'));
		$repeater->add_control('icon', array(
			'label' => __('Ikon', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'spark',
			'options' => array(
				'bulb' => __('Ötlet / izzó', 'layero-shop-ui'),
				'tag' => __('Ajánlat / címke', 'layero-shop-ui'),
				'chat' => __('Egyeztetés / üzenet', 'layero-shop-ui'),
				'briefcase' => __('Cég / aktatáska', 'layero-shop-ui'),
				'file' => __('Dokumentum', 'layero-shop-ui'),
				'truck' => __('Kézbesítés', 'layero-shop-ui'),
				'package' => __('Csomag', 'layero-shop-ui'),
				'check' => __('Pipa', 'layero-shop-ui'),
				'spark' => __('Szikra', 'layero-shop-ui'),
			),
		));
		$repeater->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('text', array('label' => __('Szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA));
		$this->add_control('steps', array(
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ number }}} - {{{ title }}}',
			'default' => Shop_Content::process_steps(),
		));
		$this->end_controls_section();

		$this->add_section_header_style_controls();

		$this->start_controls_section('steps_style', array(
			'label' => __('Lépések', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_responsive_control('columns', array(
			'label' => __('Oszlopok', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => '3',
			'tablet_default' => '2',
			'mobile_default' => '1',
			'options' => array('1' => '1', '2' => '2', '3' => '3', '4' => '4'),
			'selectors' => array(
				'{{WRAPPER}} .sh-flow, {{WRAPPER}} .lp-steps' => 'grid-template-columns: repeat({{VALUE}}, 1fr);',
			),
		));
		$this->add_control('accent_color', array(
			'label' => __('Sorszám szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-flow__num, {{WRAPPER}} .lp-steps__ic' => 'background-color: {{VALUE}};',
			),
		));
		$this->add_control('ghost_color', array(
			'label' => __('Háttérszám szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-flow__ghost, {{WRAPPER}} .lp-steps__ghost' => 'color: {{VALUE}};',
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$steps = ! empty($settings['steps']) ? $settings['steps'] : Shop_Content::process_steps();
		$is_landing = 'landing' === ($settings['layout'] ?? 'cards');
		$section_id = sanitize_html_class((string) ($settings['section_id'] ?? ''));
		?>
		<section class="sh-band sh-band--tight lyr-process<?php echo $is_landing ? ' lyr-process--landing' : ''; ?>"<?php echo $section_id ? ' id="' . esc_attr($section_id) . '"' : ''; ?>>
			<div class="shop-wrap">
				<?php $this->render_section_header($settings); ?>
				<?php if ($is_landing) : ?>
					<ol class="lp-steps">
						<?php foreach ($steps as $step) : ?>
							<li class="sh-reveal">
								<span class="lp-steps__ic"><?php echo Helpers::icon($step['icon'] ?? 'spark'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
								<b><?php echo esc_html($step['title'] ?? ''); ?></b>
								<p><?php echo esc_html($step['text'] ?? ''); ?></p>
								<i class="lp-steps__ghost" aria-hidden="true"><?php echo esc_html(ltrim((string) ($step['number'] ?? ''), '0')); ?></i>
							</li>
						<?php endforeach; ?>
					</ol>
				<?php else : ?>
					<div class="sh-flow">
					<?php foreach ($steps as $step) : ?>
						<article class="sh-reveal">
							<span class="sh-flow__num"><?php echo esc_html($step['number'] ?? ''); ?></span>
							<h3><?php echo esc_html($step['title'] ?? ''); ?></h3>
							<p><?php echo esc_html($step['text'] ?? ''); ?></p>
							<span class="sh-flow__ghost" aria-hidden="true"><?php echo esc_html($step['number'] ?? ''); ?></span>
						</article>
					<?php endforeach; ?>
					</div>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}
}
