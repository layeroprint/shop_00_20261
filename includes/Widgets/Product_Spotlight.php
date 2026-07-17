<?php

namespace LayeroShop\Widgets;

use Elementor\Controls_Manager;
use LayeroShop\Helpers;
use LayeroShop\Shop_Content;

if (! defined('ABSPATH')) {
	exit;
}

class Product_Spotlight extends Base_Widget {
	protected function is_dynamic_content(): bool {
		return true;
	}

	public function get_name() {
		return 'layero_product_spotlight';
	}

	public function get_title() {
		return __('Layero kiemelt termék', 'layero-shop-ui');
	}

	public function get_icon() {
		return 'eicon-product-info';
	}

	protected function register_controls() {
		$this->start_controls_section('content_section', array('label' => __('Termékek', 'layero-shop-ui')));
		$this->add_control('product_ids', array(
			'label' => __('WooCommerce termék ID-k (vesszővel)', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'description' => __('Több ID esetén auto-váltó slider lesz. Ha üres, a demó termékeket használja.', 'layero-shop-ui'),
		));
		$this->add_control('demo_product_ids', array(
			'label' => __('Fallback demó termékek', 'layero-shop-ui'),
			'type' => Controls_Manager::SELECT2,
			'multiple' => true,
			'default' => Shop_Content::featured_product_ids(),
			'options' => wp_list_pluck(Shop_Content::products(), 'name', 'id'),
		));
		$this->add_control('eyebrow', array(
			'label' => __('Kis felirat', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Kiemelt termékek',
		));
		$this->add_control('first_badge', array(
			'label' => __('Első termék badge', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'A hónap terméke',
		));
		$this->add_control('custom_chip', array(
			'label' => __('Bal alsó chip', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => '✦ Névre szabható',
		));
		$this->add_control('origin_chip', array(
			'label' => __('Jobb felső chip (származás)', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Szatmárnémetiben gyártva',
			'description' => __('Üresen hagyva nem jelenik meg.', 'layero-shop-ui'),
		));
		$this->add_control('button_text', array(
			'label' => __('Gomb szöveg', 'layero-shop-ui'),
			'type' => Controls_Manager::TEXT,
			'default' => 'Megnézem a terméket',
		));
		$this->add_control('interval', array(
			'label' => __('Váltás (mp)', 'layero-shop-ui'),
			'type' => Controls_Manager::NUMBER,
			'default' => 4.2,
			'min' => 2,
			'max' => 12,
			'step' => 0.1,
		));
		$this->end_controls_section();

		$this->start_controls_section('style_section', array(
			'label' => __('Megjelenés', 'layero-shop-ui'),
			'tab' => Controls_Manager::TAB_STYLE,
		));
		$this->add_control('bg_color', array(
			'label' => __('Háttérszín', 'layero-shop-ui'),
			'type' => Controls_Manager::COLOR,
			'selectors' => array(
				'{{WRAPPER}} .sh-band--dark' => 'background: {{VALUE}};',
			),
		));
		$this->add_group_control(
			\Elementor\Group_Control_Typography::get_type(),
			array(
				'name' => 'title_typography',
				'label' => __('Cím tipográfia', 'layero-shop-ui'),
				'selector' => '{{WRAPPER}} .sh-spotlight__copy h2',
			)
		);
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$items = $this->collect_items($settings);

		if (empty($items)) {
			return;
		}

		$eyebrow = $settings['eyebrow'] ?? 'Kiemelt termékek';
		$button_text = $settings['button_text'] ?? __('Megnézem a terméket', 'layero-shop-ui');
		$origin_chip = trim((string) ($settings['origin_chip'] ?? ''));
		$custom_chip = trim((string) ($settings['custom_chip'] ?? ''));
		$interval_ms = (int) round(max(2, min(12, (float) ($settings['interval'] ?? 4.2))) * 1000);
		$first = $items[0];

		$payload = array_map(
			function ($item) {
				return array(
					'name' => $item['name'],
					'desc' => $item['desc'],
					'price' => $item['price_html'],
					'url' => $item['url'],
					'badge' => $item['badge'],
				);
			},
			$items
		);
		?>
		<section class="sh-band sh-band--dark">
			<div class="sh-spotlight" data-lyr-spotlight data-lyr-interval="<?php echo esc_attr($interval_ms); ?>">
				<div class="sh-spotlight__copy">
					<span class="sh-spotlight__eyebrow"><?php echo esc_html($eyebrow); ?></span>
					<div class="sh-spotlight__dyn" data-f-dyn>
						<h2 data-f-name><?php echo esc_html($first['name']); ?></h2>
						<p data-f-desc><?php echo esc_html($first['desc']); ?></p>
						<div class="sh-spotlight__price"><span data-f-price><?php echo wp_kses_post($first['price_html']); ?></span><small><?php esc_html_e('-tól, egyedi gyártással', 'layero-shop-ui'); ?></small></div>
					</div>
					<a class="sh-btn sh-btn--white lyr-btn lyr-btn--white" data-f-link href="<?php echo esc_url($first['url']); ?>"><?php echo esc_html($button_text); ?></a>
				</div>
				<div class="sh-spotlight__stage">
					<div class="sh-spotlight__frame">
						<span class="sh-spotlight__badge" data-f-badge><?php echo esc_html($first['badge']); ?></span>
						<?php if ($custom_chip) : ?>
							<span class="sh-spotlight__chip"><?php echo esc_html($custom_chip); ?></span>
						<?php endif; ?>
						<?php if ($origin_chip) : ?>
							<span class="sh-spotlight__chip sh-spotlight__chip--tr"><?php echo Helpers::icon('pin'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php echo esc_html($origin_chip); ?></span>
						<?php endif; ?>
						<?php foreach ($items as $index => $item) : ?>
							<img class="sh-spotlight__img<?php echo 0 === $index ? ' is-on' : ''; ?>" src="<?php echo esc_url($item['image_url']); ?>" alt="<?php echo esc_attr($item['name']); ?>"<?php echo 0 === $index ? '' : ' loading="lazy"'; ?> decoding="async">
						<?php endforeach; ?>
					</div>
					<?php if (count($items) > 1) : ?>
						<div class="sh-spotlight__dots" role="tablist" aria-label="<?php esc_attr_e('Kiemelt termékek', 'layero-shop-ui'); ?>">
							<?php foreach ($items as $index => $item) : ?>
								<button class="sh-spotlight__dot<?php echo 0 === $index ? ' is-on' : ''; ?>" type="button" role="tab" aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>" aria-label="<?php echo esc_attr($item['name']); ?>"></button>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>
				<?php if (count($items) > 1) : ?>
					<script type="application/json" data-lyr-spotlight-items><?php echo wp_json_encode($payload); ?></script>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}

	private function collect_items($settings) {
		$items = array();

		if (Helpers::is_woo_active() && ! empty($settings['product_ids'])) {
			$ids = array_filter(array_map('absint', explode(',', (string) $settings['product_ids'])));
			foreach ($ids as $index => $id) {
				$product = wc_get_product($id);
				if (! $product) {
					continue;
				}
				$image_id = $product->get_image_id();
				$items[] = array(
					'name' => $product->get_name(),
					'desc' => wp_trim_words(wp_strip_all_tags($product->get_short_description() ?: $product->get_description()), 28),
					'price_html' => $product->get_price_html(),
					'url' => get_permalink($product->get_id()),
					'image_url' => $image_id ? (string) wp_get_attachment_image_url($image_id, 'large') : '',
					'badge' => 0 === $index
						? ($settings['first_badge'] ?? 'A hónap terméke')
						: __('Kiemelt darab', 'layero-shop-ui'),
				);
			}
		}

		if (empty($items)) {
			$ids = ! empty($settings['demo_product_ids']) ? (array) $settings['demo_product_ids'] : Shop_Content::featured_product_ids();
			$demos = Shop_Content::products_by_ids($ids);
			foreach ($demos as $index => $demo) {
				$items[] = array(
					'name' => $demo['name'],
					'desc' => $demo['description'],
					'price_html' => $demo['price'] ? number_format_i18n($demo['price'], 0) . ' RON' : __('Ajánlat alapján', 'layero-shop-ui'),
					'url' => Helpers::product_url($demo['id']),
					'image_url' => Shop_Content::asset_url($demo['image']),
					'badge' => 0 === $index
						? ($settings['first_badge'] ?? 'A hónap terméke')
						: ($demo['badge'] ? $demo['badge'] : __('Kiemelt darab', 'layero-shop-ui')),
				);
			}
		}

		return $items;
	}
}
