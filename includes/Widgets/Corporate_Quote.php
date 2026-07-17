<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;

if (! defined('ABSPATH')) {
	exit;
}

class Corporate_Quote extends Base_Widget {
	public function get_name() {
		return 'layero_corporate_quote';
	}

	public function get_title() {
		return __('Layero céges ajánlatkérő', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-form-horizontal';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Ajánlatkérés'));
		$this->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Mesélj a projektről. <span>Mi megtervezzük a következő lépést.</span>'));
		$this->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Nem kell kész specifikáció. Egy rövid leírás, hozzávetőleges darabszám és határidő már elég ahhoz, hogy elinduljunk.'));
		$this->add_control('response_note', array('label' => __('Válaszidő szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Általában 24–48 órán belül válaszolunk.'));
		$this->add_control('button_text', array('label' => __('Küldés gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Céges ajánlatot kérek'));

		$repeater = new Repeater();
		$repeater->add_control('text', array('label' => __('Pont', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('points', array(
			'label' => __('Bizalmi pontok', 'layero-shop-ui'),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'title_field' => '{{{ text }}}',
			'default' => array(
				array('text' => 'Díjmentes első egyeztetés'),
				array('text' => 'Tételes, átlátható ajánlat'),
				array('text' => 'Látványterv jóváhagyásra'),
				array('text' => 'Céges számla és proforma lehetőség'),
			),
		));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$points = ! empty($settings['points']) ? $settings['points'] : array();
		?>
		<section class="lyr-corp-quote" id="ceges-ajanlat">
			<div class="shop-wrap lyr-corp-quote__grid">
				<div class="lyr-corp-quote__intro">
					<span class="lyr-corp-kicker"><?php echo Helpers::icon('mail'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html($settings['eyebrow'] ?? ''); ?></span>
					<h2><?php echo wp_kses($settings['title'] ?? '', array('span' => array(), 'em' => array(), 'br' => array())); ?></h2>
					<p><?php echo esc_html($settings['text'] ?? ''); ?></p>
					<?php if ($points) : ?><ul><?php foreach ($points as $point) : ?><li><?php echo Helpers::icon('check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html($point['text'] ?? ''); ?></li><?php endforeach; ?></ul><?php endif; ?>
					<div class="lyr-corp-quote__contact"><a href="tel:+40756642387">+40 756 642 387</a><a href="mailto:layeroprint@gmail.com">layeroprint@gmail.com</a></div>
				</div>
				<form class="lyr-corp-form" data-layero-corporate-form novalidate>
					<div class="lyr-corp-form__row">
						<label><span><?php esc_html_e('Kapcsolattartó neve', 'layero-shop-ui'); ?> *</span><input type="text" name="name" autocomplete="name" required></label>
						<label><span><?php esc_html_e('Cégnév', 'layero-shop-ui'); ?></span><input type="text" name="company" autocomplete="organization"></label>
					</div>
					<div class="lyr-corp-form__row">
						<label><span><?php esc_html_e('E-mail', 'layero-shop-ui'); ?> *</span><input type="email" name="email" autocomplete="email" required></label>
						<label><span><?php esc_html_e('Telefonszám', 'layero-shop-ui'); ?></span><input type="tel" name="phone" autocomplete="tel"></label>
					</div>
					<div class="lyr-corp-form__row">
						<label><span><?php esc_html_e('Hozzávetőleges darabszám', 'layero-shop-ui'); ?></span><select name="quantity"><option value=""><?php esc_html_e('Még nem tudom', 'layero-shop-ui'); ?></option><option>1–10</option><option>11–50</option><option>51–100</option><option>101–500</option><option>500+</option></select></label>
						<label><span><?php esc_html_e('Kívánt határidő', 'layero-shop-ui'); ?></span><input type="date" name="deadline"></label>
					</div>
					<label><span><?php esc_html_e('Mire van szükséged?', 'layero-shop-ui'); ?> *</span><textarea name="message" rows="6" minlength="10" required placeholder="Terméktípus, felhasználás, arculati elképzelés vagy bármilyen fontos részlet..."></textarea></label>
					<label class="lyr-corp-form__consent"><input type="checkbox" name="consent" required><span><?php esc_html_e('Elfogadom, hogy a Layero az ajánlatkérés megválaszolásához kezelje a megadott adatokat.', 'layero-shop-ui'); ?> <a href="<?php echo esc_url(home_url('/adatvedelem/')); ?>"><?php esc_html_e('Adatvédelmi tájékoztató', 'layero-shop-ui'); ?></a></span></label>
					<label class="lyr-corp-form__hp" aria-hidden="true"><span>Website</span><input type="text" name="website" tabindex="-1" autocomplete="off"></label>
					<button class="lyr-btn lyr-btn--primary" type="submit"><?php echo esc_html($settings['button_text'] ?? ''); ?></button>
					<p class="lyr-corp-form__note"><?php echo esc_html($settings['response_note'] ?? ''); ?></p>
					<div class="lyr-corp-form__status" data-layero-corporate-status role="status" aria-live="polite"></div>
				</form>
			</div>
		</section>
		<?php
	}
}
