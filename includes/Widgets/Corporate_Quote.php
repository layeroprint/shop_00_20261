<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use LayeroShop\Helpers;

if (! defined('ABSPATH')) { exit; }

class Corporate_Quote extends Base_Widget {
	public function get_name() { return 'layero_corporate_quote'; }
	public function get_title() { return __('Layero céges ajánlatkérő', 'layero-shop-ui'); }
	public function get_icon() { return 'eicon-form-horizontal'; }

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Tartalom', 'layero-shop-ui')));
		$this->add_control('eyebrow', array('label' => __('Kis felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Árajánlat'));
		$this->add_control('title', array('label' => __('Cím', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Kérj ajánlatot a csapatodnak.'));
		$this->add_control('text', array('label' => __('Leírás', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Darabszám és logó még nem kell hozzá — elég az irány. A részleteket e-mailben egyeztetjük.'));
		$this->add_control('button_text', array('label' => __('Küldés gomb', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Árajánlatot kérek'));
		$this->add_control('privacy_text', array('label' => __('Adatvédelmi szöveg', 'layero-shop-ui'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'Az adatokat kizárólag az ajánlat elkészítéséhez használjuk.'));
		$this->add_control('response_note', array('label' => __('Sikeres küldés szövege', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT, 'default' => 'Köszönjük! A megkeresés megérkezett; 24–48 órán belül tételes ajánlattal jelentkezünk.'));

		$point = new Repeater();
		$point->add_control('icon', array('label' => __('Ikon', 'layero-shop-ui'), 'type' => Controls_Manager::SELECT, 'default' => 'clock', 'options' => array('clock' => __('Óra', 'layero-shop-ui'), 'briefcase' => __('Aktatáska', 'layero-shop-ui'), 'pin' => __('Helyszín', 'layero-shop-ui'), 'check' => __('Pipa', 'layero-shop-ui'))));
		$point->add_control('title', array('label' => __('Kiemelt rész', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$point->add_control('text', array('label' => __('Magyarázat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('points', array('label' => __('Bizalmi pontok', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $point->get_controls(), 'title_field' => '{{{ title }}}', 'default' => array(
			array('icon' => 'clock', 'title' => '24–48 órán belül válaszolunk', 'text' => 'tételes árral és határidővel.'),
			array('icon' => 'briefcase', 'title' => 'Proforma díjbekérő + céges számla', 'text' => 'adószámmal, ahogy a könyvelés szereti.'),
			array('icon' => 'pin', 'title' => 'Helyi gyártás, rugalmas utánrendelés', 'text' => 'a terveid nálunk maradnak, bármikor kérhetsz újabb szériát.'),
		)));

		$direction = new Repeater();
		$direction->add_control('label', array('label' => __('Felirat', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$direction->add_control('value', array('label' => __('Belső érték', 'layero-shop-ui'), 'type' => Controls_Manager::TEXT));
		$this->add_control('directions', array('label' => __('Termékirányok', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $direction->get_controls(), 'title_field' => '{{{ label }}}', 'default' => array(
			array('label' => 'QR + NFC display', 'value' => 'qr-nfc'), array('label' => 'Logós ajándék', 'value' => 'logos'), array('label' => 'Rendezvény / csapat', 'value' => 'rendezveny'), array('label' => 'Egyedi projekt', 'value' => 'egyedi'),
		)));
		$this->add_control('quantities', array('label' => __('Darabszám-opciók', 'layero-shop-ui'), 'type' => Controls_Manager::REPEATER, 'fields' => $direction->get_controls(), 'title_field' => '{{{ label }}}', 'default' => array(
			array('label' => '1–20', 'value' => '1-20'), array('label' => '20–50', 'value' => '20-50'), array('label' => '50–100', 'value' => '50-100'), array('label' => '100+', 'value' => '100+'),
		)));
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$points = ! empty($settings['points']) ? $settings['points'] : array();
		$directions = ! empty($settings['directions']) ? $settings['directions'] : array();
		$quantities = ! empty($settings['quantities']) ? $settings['quantities'] : array();
		$uid = 'lyr-corp-' . $this->get_id();
		?>
		<section class="sh-band sh-band--tight sh-band--gray lyr-corp-quote lyr-landing-quote" id="ajanlat">
			<div class="shop-wrap lp-quote">
				<div class="lp-quote__side">
					<?php if (! empty($settings['eyebrow'])) : ?><span class="sh-label sh-kicker"><?php echo esc_html($settings['eyebrow']); ?></span><?php endif; ?>
					<h2 class="sh-h2"><?php echo wp_kses($settings['title'] ?? '', array('span' => array(), 'em' => array(), 'br' => array())); ?></h2>
					<?php if (! empty($settings['text'])) : ?><p><?php echo esc_html($settings['text']); ?></p><?php endif; ?>
					<?php if ($points) : ?><ul class="lp-quote__list"><?php foreach ($points as $point) : ?><li><?php echo Helpers::icon($point['icon'] ?? 'check'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><div><b><?php echo esc_html($point['title'] ?? $point['text'] ?? ''); ?></b><?php if (! empty($point['title']) && ! empty($point['text'])) : ?> — <?php echo esc_html($point['text']); ?><?php endif; ?></div></li><?php endforeach; ?></ul><?php endif; ?>
				</div>
				<form class="sh-form sh-ctform lyr-corp-form lyr-landing-form" data-layero-corporate-form data-layero-form-topic="Céges ajánlatkérés" data-layero-success="<?php echo esc_attr($settings['response_note'] ?? ''); ?>" novalidate>
					<div class="sh-form__fields">
						<div class="sh-form__row">
							<div class="sh-field"><label for="<?php echo esc_attr($uid); ?>-company"><?php esc_html_e('Cégnév', 'layero-shop-ui'); ?></label><input id="<?php echo esc_attr($uid); ?>-company" name="company" type="text" required autocomplete="organization" placeholder="Pl. Bázis Bisztró Kft."></div>
							<div class="sh-field"><label for="<?php echo esc_attr($uid); ?>-name"><?php esc_html_e('Kapcsolattartó', 'layero-shop-ui'); ?></label><input id="<?php echo esc_attr($uid); ?>-name" name="name" type="text" required autocomplete="name" placeholder="A te neved"></div>
						</div>
						<div class="sh-form__row">
							<div class="sh-field"><label for="<?php echo esc_attr($uid); ?>-email"><?php esc_html_e('E-mail', 'layero-shop-ui'); ?></label><input id="<?php echo esc_attr($uid); ?>-email" name="email" type="email" required autocomplete="email" placeholder="valaki@ceged.ro"></div>
							<div class="sh-field"><label for="<?php echo esc_attr($uid); ?>-phone"><?php esc_html_e('Telefon (opcionális)', 'layero-shop-ui'); ?></label><input id="<?php echo esc_attr($uid); ?>-phone" name="phone" type="tel" autocomplete="tel" placeholder="+40 …"></div>
						</div>
						<?php if ($directions) : ?><fieldset class="sh-ct-topics"><legend><?php esc_html_e('Mire van szükségetek?', 'layero-shop-ui'); ?></legend><div class="sh-ct-topics__row" role="radiogroup" aria-label="<?php esc_attr_e('Termékirány választása', 'layero-shop-ui'); ?>"><?php foreach ($directions as $index => $option) : ?><label class="sh-ct-topic"><input type="radio" name="direction" value="<?php echo esc_attr($option['value'] ?? sanitize_title($option['label'] ?? '')); ?>" <?php checked(0, $index); ?>><span><?php echo esc_html($option['label'] ?? ''); ?></span></label><?php endforeach; ?></div></fieldset><?php endif; ?>
						<?php if ($quantities) : ?><fieldset class="sh-ct-topics"><legend><?php esc_html_e('Nagyságrendileg hány darab?', 'layero-shop-ui'); ?></legend><div class="sh-ct-topics__row" role="radiogroup" aria-label="<?php esc_attr_e('Darabszám választása', 'layero-shop-ui'); ?>"><?php foreach ($quantities as $index => $option) : ?><label class="sh-ct-topic"><input type="radio" name="quantity" value="<?php echo esc_attr($option['value'] ?? sanitize_title($option['label'] ?? '')); ?>" <?php checked(0, $index); ?>><span><?php echo esc_html($option['label'] ?? ''); ?></span></label><?php endforeach; ?></div></fieldset><?php endif; ?>
						<div class="sh-field"><div class="sh-ct-lblrow"><label for="<?php echo esc_attr($uid); ?>-message"><?php esc_html_e('Üzenet', 'layero-shop-ui'); ?></label><span class="sh-ct-count" data-layero-count aria-hidden="true">0 / 800</span></div><textarea id="<?php echo esc_attr($uid); ?>-message" name="message" required minlength="10" maxlength="800" placeholder="Írd le röviden, mire készültök — rendezvény, ügyfélajándék, étterem-display… A logót és az arculatot e-mailben kérjük be."></textarea></div>
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
