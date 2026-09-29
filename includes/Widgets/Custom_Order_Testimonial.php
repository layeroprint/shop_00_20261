<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) { exit; }

class Custom_Order_Testimonial extends Base_Widget {
	public function get_name() { return 'layero_custom_order_testimonial'; }
	public function get_title() { return __('Layero egyedi rendelés vélemény', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-testimonial'; }
	protected function register_controls() { $this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui'))); $this->add_control('quote', array('label' => __('Idézet', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Egyedi ötlettel kerestem meg őket, és <em>pontosan azt kaptam, amit elképzeltem</em>. Minden lépés profi volt.')); $this->add_control('name', array('label' => __('Név', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Szabó Nóra')); $this->add_control('initials', array('label' => __('Monogram', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'SN')); $this->add_control('role', array('label' => __('Szerep', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Egyedi rendelés')); $this->add_control('image', array('label' => __('Kép', 'layero-shop-ui'), 'type' => Controls_Manager::MEDIA, 'default' => array('url' => Shop_Content::asset_url('kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-02.jpg')))); $this->end_controls_section(); }
	protected function render() { $settings = $this->get_settings_for_display(); $image = $settings['image']['url'] ?? ''; ?>
		<section class="sh-band sh-band--tight sh-band--gray lyr-custom-order-testimonial"><div class="shop-wrap"><div class="lp-case sh-reveal"><div><div class="sh-review__stars" aria-label="<?php esc_attr_e('5 csillag', 'layero-shop-ui'); ?>">★★★★★</div><blockquote>„<?php echo wp_kses($settings['quote'] ?? '', array('em' => array(), 'strong' => array())); ?>”</blockquote><footer><span class="sh-review__avatar" aria-hidden="true"><?php echo esc_html($settings['initials'] ?? ''); ?></span><div><strong><?php echo esc_html($settings['name'] ?? ''); ?></strong><span><?php echo esc_html($settings['role'] ?? ''); ?></span></div></footer></div><?php if ($image) : ?><figure><img src="<?php echo esc_url($image); ?>" alt="<?php echo esc_attr($settings['role'] ?? ''); ?>" loading="lazy" decoding="async"></figure><?php endif; ?></div></div></section>
	<?php }
}
