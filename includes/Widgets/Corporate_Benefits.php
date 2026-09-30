<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) { exit; }

class Corporate_Benefits extends Base_Widget {
	public function get_name() { return 'layero_corporate_benefits'; }
	public function get_title() { return __('Layero céges esettanulmány és számok', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-counter'; }

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Esettanulmány', 'layero-shop-ui')));
		$this->add_control('quote', array('label' => __('Idézet', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Céges QR-displayt rendeltünk az étterembe — két hét alatt <em>megduplázódtak a Google-értékeléseink</em>.'));
		$this->add_control('name', array('label' => __('Név', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Balogh Tamás'));
		$this->add_control('initials', array('label' => __('Monogram', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'BT'));
		$this->add_control('role', array('label' => __('Szerep / projekt', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'QR + NFC display · vendéglátás'));
		$this->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA, 'default' => array('url' => Shop_Content::asset_url('termekvilag/hero_slider/layero-asset-0022.webp'))));
		$this->end_controls_section();

		$this->start_controls_section('stats_section', array('label' => __('Bizalmi számok', 'layero-shop-ui')));
		$stat = new Repeater();
		$stat->add_control('value', array('label' => __('Érték', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$stat->add_control('label', array('label' => __('Magyarázat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('stats', array('type' => Controls_Manager::REPEATER, 'fields' => $stat->get_controls(), 'title_field' => '{{{ value }}} — {{{ label }}}', 'default' => array(
			array('value' => '24–48 h', 'label' => 'árajánlat a megkereséstől'),
			array('value' => 'Egyedi', 'label' => 'egyeztetett ütemezés'),
			array('value' => '2 év', 'label' => 'jótállás minden darabra'),
			array('value' => '1 műhely', 'label' => 'tervezéstől a csomagolásig'),
		)));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$image = $settings['image']['url'] ?? '';
		$stats = ! empty($settings['stats']) ? $settings['stats'] : array();
		?>
		<section class="sh-band sh-band--tight sh-band--gray lyr-corp-case">
			<div class="shop-wrap">
				<div class="lp-case sh-reveal">
					<div><div class="sh-review__stars" aria-label="<?php esc_attr_e('5 csillag', 'layero-shop-ui'); ?>">★★★★★</div><blockquote>„<?php echo wp_kses($settings['quote'] ?? '', array('em' => array(), 'strong' => array())); ?>”</blockquote><footer><span class="sh-review__avatar" aria-hidden="true"><?php echo esc_html($settings['initials'] ?? ''); ?></span><div><strong><?php echo esc_html($settings['name'] ?? ''); ?></strong><span><?php echo esc_html($settings['role'] ?? ''); ?></span></div></footer></div>
					<?php if ($image) : ?><figure><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($settings['role'] ?? ''); ?>" loading="lazy" decoding="async"></figure><?php endif; ?>
				</div>
				<?php if ($stats) : ?><div class="sh-stats lyr-corp-case__stats"><?php foreach ($stats as $item) : ?><?php $old_time = Shop_Content::without_legacy_lead_time($item['value'] ?? '', '') !== ($item['value'] ?? ''); ?><div class="sh-stat sh-reveal"><b><?php echo esc_html($old_time ? 'Egyedi' : ($item['value'] ?? '')); ?></b><span><?php echo esc_html($old_time ? 'egyeztetett ütemezés' : ($item['label'] ?? '')); ?></span></div><?php endforeach; ?></div><?php endif; ?>
			</div>
		</section>
		<?php
	}
}
