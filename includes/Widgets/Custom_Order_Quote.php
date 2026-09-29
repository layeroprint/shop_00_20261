<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;

if (! defined('ABSPATH')) { exit; }

class Custom_Order_Quote extends Base_Widget {
	public function get_name() { return 'layero_custom_order_quote'; }
	public function get_title() { return __('Layero egyedi rendelés ajánlatkérő', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-form-horizontal'; }

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Ajánlatkérés'));
		$this->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Mesélj az ötletedről.'));
		$this->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Pár mondat elég — a részleteket úgyis együtt tesszük helyre. Referenciaképet a válasz-e-mailben is küldhetsz.'));
		$this->add_control('button_text', array('label' => __('Küldés gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Ajánlatot kérek — ingyenes'));
		$this->add_control('privacy_text', array('label' => __('Adatvédelmi szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Az adataidat kizárólag az ajánlat elkészítéséhez használjuk.'));
		$this->add_control('response_note', array('label' => __('Sikeres küldés szövege', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Köszönjük! Az ötleted megérkezett; 24–48 órán belül konkrét ajánlattal jelentkezünk.'));

		$point = new Repeater();
		$point->add_control('icon', array('label' => __('Ikon', 'layero-shop-ui'), 'type' => Controls_Manager::SELECT, 'default' => 'clock', 'options' => array('clock' => __('Óra', 'layero-shop-ui'), 'shield' => __('Pajzs', 'layero-shop-ui'), 'pin' => __('Helyszín', 'layero-shop-ui'), 'check' => __('Pipa', 'layero-shop-ui'))));
		$point->add_control('title', array('label' => __('Kiemelt rész', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$point->add_control('text', array('label' => __('Magyarázat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('points', array('label' => __('Bizalmi pontok', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $point->get_controls(), 'title_field' => '{{{ title }}}', 'default' => array(
			array('icon' => 'clock', 'title' => '24–48 órán belül válaszolunk', 'text' => 'konkrét árral és határidővel.'),
			array('icon' => 'shield', 'title' => 'Semmire nem kötelez', 'text' => 'a gyártás csak a jóváhagyásod után indul.'),
			array('icon' => 'pin', 'title' => 'Saját műhely, Szatmárnémeti', 'text' => '2 év jótállás minden darabra.'),
		)));

		$occasion = new Repeater();
		$occasion->add_control('label', array('label' => __('Felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$occasion->add_control('value', array('label' => __('Belső érték', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('occasions', array('label' => __('Alkalmak', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $occasion->get_controls(), 'title_field' => '{{{ label }}}', 'default' => array(
			array('label' => 'Születésnap', 'value' => 'szuletesnap'), array('label' => 'Évforduló / esküvő', 'value' => 'evfordulo'), array('label' => 'Ünnep', 'value' => 'unnep'), array('label' => 'Csak úgy', 'value' => 'csak-ugy'),
		)));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$points = ! empty($settings['points']) ? $settings['points'] : array();
		$occasions = ! empty($settings['occasions']) ? $settings['occasions'] : array();
		$uid = 'lyr-custom-' . $this->get_id();
		?>
		<section class="sh-band sh-band--tight lyr-custom-order-quote lyr-landing-quote" id="ajanlat">
			<div class="shop-wrap lp-quote">
				<div class="lp-quote__side">
					<?php if (! empty($settings['eyebrow'])) : ?><span class="sh-label sh-kicker"><?php echo esc_html($settings['eyebrow']); ?></span><?php endif; ?>
					<h2 class="sh-h2"><?php echo wp_kses($settings['title'] ?? '', array('span' => array(), 'em' => array(), 'br' => array())); ?></h2>
					<?php if (! empty($settings['text'])) : ?><p><?php echo esc_html($settings['text']); ?></p><?php endif; ?>
					<?php if ($points) : ?><ul class="lp-quote__list"><?php foreach ($points as $point) : ?><li><?php echo Helpers::icon($point['icon'] ?? 'check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><div><b><?php echo esc_html($point['title'] ?? ''); ?></b><?php if (! empty($point['text'])) : ?> — <?php echo esc_html($point['text']); ?><?php endif; ?></div></li><?php endforeach; ?></ul><?php endif; ?>
				</div>
				<form class="sh-form sh-ctform lyr-corp-form lyr-landing-form" data-layero-corporate-form data-layero-form-topic="Egyedi rendelés" data-layero-success="<?php echo esc_attr($settings['response_note'] ?? ''); ?>" novalidate>
					<div class="sh-form__fields">
						<div class="sh-form__row">
							<div class="sh-field"><label for="<?php echo esc_attr($uid); ?>-name"><?php esc_html_e('Név', 'layero-shop-ui'); ?></label><input id="<?php echo esc_attr($uid); ?>-name" name="name" type="text" required autocomplete="name" placeholder="Hogy szólíthatunk?"></div>
							<div class="sh-field"><label for="<?php echo esc_attr($uid); ?>-email"><?php esc_html_e('E-mail', 'layero-shop-ui'); ?></label><input id="<?php echo esc_attr($uid); ?>-email" name="email" type="email" required autocomplete="email" placeholder="valaki@email.com"></div>
						</div>
						<?php if ($occasions) : ?><fieldset class="sh-ct-topics"><legend><?php esc_html_e('Milyen alkalomra készül?', 'layero-shop-ui'); ?></legend><div class="sh-ct-topics__row" role="radiogroup" aria-label="<?php esc_attr_e('Alkalom választása', 'layero-shop-ui'); ?>"><?php foreach ($occasions as $index => $option) : ?><label class="sh-ct-topic"><input type="radio" name="occasion" value="<?php echo esc_attr($option['value'] ?? sanitize_title($option['label'] ?? '')); ?>" <?php checked(0, $index); ?>><span><?php echo esc_html($option['label'] ?? ''); ?></span></label><?php endforeach; ?></div></fieldset><?php endif; ?>
						<div class="sh-field"><div class="sh-ct-lblrow"><label for="<?php echo esc_attr($uid); ?>-message"><?php esc_html_e('Az ötleted', 'layero-shop-ui'); ?></label><span class="sh-ct-count" data-layero-count aria-hidden="true">0 / 800</span></div><textarea id="<?php echo esc_attr($uid); ?>-message" name="message" required minlength="10" maxlength="800" placeholder="Írd le, mire gondolsz — kinek készül, mi legyen rajta, milyen méretben… Ha van referenciaképed, említsd meg, és e-mailben bekérjük."></textarea></div>
						<label class="lyr-corp-form__hp" aria-hidden="true"><span>Website</span><input type="text" name="website" tabindex="-1" autocomplete="off"></label>
						<button class="sh-btn sh-btn--primary sh-ctform__send" type="submit"><?php echo Helpers::icon('send'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo esc_html($settings['button_text'] ?? ''); ?></button>
						<p class="sh-ct-privacy"><?php esc_html_e('Az elküldéssel elfogadod az', 'layero-shop-ui'); ?> <a href="<?php echo esc_url(home_url('/adatvedelem/')); ?>"><?php esc_html_e('adatkezelési tájékoztatót', 'layero-shop-ui'); ?></a>. <?php echo esc_html($settings['privacy_text'] ?? ''); ?></p>
						<div class="lyr-corp-form__status" data-layero-corporate-status role="status" aria-live="polite"></div>
					</div>
				</form>
			</div>
		</section>
		<?php
	}
}
