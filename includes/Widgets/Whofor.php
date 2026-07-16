<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Whofor extends Base_Widget {
	public function get_name() {
		return 'layero_whofor';
	}

	public function get_title() {
		return __('Layero „Kinek keresed?" sáv', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-navigation-horizontal';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Belépők', 'layero-shop-ui')));
		$this->add_control('label', array(
			'label' => __('Címke', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Kinek keresed?',
		));

		$repeater = new Repeater();
		$repeater->add_control('icon', array(
			'label' => __('Ikon', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT,
			'default' => 'gift',
			'options' => array(
				'smile' => __('Mosoly (gyerek)', 'layero-shop-ui'),
				'star' => __('Csillag (rajongó)', 'layero-shop-ui'),
				'bulb' => __('Izzó (fény)', 'layero-shop-ui'),
				'home' => __('Ház (otthon)', 'layero-shop-ui'),
				'gift' => __('Ajándék (ünnep)', 'layero-shop-ui'),
				'briefcase' => __('Aktatáska (céges)', 'layero-shop-ui'),
				'heart' => __('Szív', 'layero-shop-ui'),
				'spark' => __('Szikra', 'layero-shop-ui'),
			),
		));
		$repeater->add_control('label', array('label' => __('Felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$repeater->add_control('url', array('label' => __('Link', 'layero-shop-ui'), 'type' => Controls_Manager::URL));
		$this->add_control('items', array(
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ label }}}',
			'default' => Shop_Content::whofor_items(),
		));

		$this->add_control('quiz_text', array(
			'label' => __('Kvíz-pill szöveg', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Nem tudom — kvíz ›',
			'description' => __('Üresen hagyva nem jelenik meg.', 'layero-shop-ui'),
		));
		$this->add_control('quiz_url', array(
			'label' => __('Kvíz link', 'layero-shop-ui'),
			'type' => Controls_Manager::URL,
			'default' => array('url' => '/kviz/'),
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array(
			'label' => __('Megjelenés', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_control('icon_color', array(
			'label' => __('Ikon szín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-whofor a svg' => 'color: {{VALUE}};',
			),
		));
		$this->add_control('pill_border_color', array(
			'label' => __('Pill szegély', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-whofor a' => 'border-color: {{VALUE}};',
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = ! empty($settings['items']) ? $settings['items'] : Shop_Content::whofor_items();
		$quiz_text = trim((string) ($settings['quiz_text'] ?? ''));
		?>
		<nav class="sh-whofor" aria-label="<?php esc_attr_e('Kinek keresel ajándékot?', 'layero-shop-ui'); ?>">
			<div class="shop-wrap sh-whofor__inner">
				<?php if (! empty($settings['label'])) : ?>
					<span class="sh-whofor__label"><?php echo esc_html($settings['label']); ?></span>
				<?php endif; ?>
				<?php foreach ($items as $item) : ?>
					<a href="<?php echo esc_url($this->get_link_url($item['url'] ?? array(), '/termekek/')); ?>">
						<?php echo Helpers::icon($item['icon'] ?? 'gift'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php echo esc_html($item['label'] ?? ''); ?>
					</a>
				<?php endforeach; ?>
				<?php if ($quiz_text) : ?>
					<a class="sh-whofor__quiz" href="<?php echo esc_url($this->get_link_url($settings['quiz_url'] ?? array(), '/kviz/')); ?>">
						<?php echo Helpers::icon('spark'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php echo esc_html($quiz_text); ?>
					</a>
				<?php endif; ?>
			</div>
		</nav>
		<?php
	}
}
