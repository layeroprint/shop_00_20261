<?php
/** Layero drawer; prices, variations, discounts, fees and totals belong to WooCommerce. */
defined('ABSPATH') || exit;
if (! $cart || $cart->is_empty()) : ?>
	<div class="sh-drawer__empty">
		<?php echo \LayeroShop\Helpers::icon('cart'); ?>
		<p>A kosarad még üres.</p>
		<a class="sh-btn sh-btn--primary" href="<?php echo esc_url(\LayeroShop\Helpers::products_url()); ?>">Felfedezem a termékeket</a>
	</div>
<?php else : ?>
	<?php if ($shipping['free'] || null !== $shipping['progress']) :
		$progress = $shipping['progress'] ?? array('percent' => 100, 'remaining' => 0); ?>
		<div class="sh-drawer__ship">
			<p><?php if ($shipping['free']) : ?><b>Megvan az ingyenes szállítás! 🎉</b>
			<?php elseif ($progress['remaining'] > 0) : ?>Még <b><?php echo wp_kses_post(wc_price($progress['remaining'])); ?></b> az ingyenes szállítás értékhatáráig
			<?php else : ?><b>Elérhető az ingyenes szállítás!</b> Válaszd ki a pénztárnál.
			<?php endif; ?></p>
			<div class="sh-drawer__bar" aria-hidden="true"><div class="sh-drawer__fill" style="width:<?php echo esc_attr($progress['percent']); ?>%"></div></div>
		</div>
	<?php endif; ?>
	<div class="sh-drawer__body" tabindex="0" aria-label="Kosárban lévő termékek">
		<?php foreach ($cart->get_cart() as $key => $item) :
			$product = apply_filters('woocommerce_cart_item_product', $item['data'], $item, $key);
			if (! $product || ! $product->exists() || $item['quantity'] <= 0 || ! apply_filters('woocommerce_widget_cart_item_visible', true, $item, $key)) { continue; }
			$name = apply_filters('woocommerce_cart_item_name', $product->get_name(), $item, $key);
			$url = apply_filters('woocommerce_cart_item_permalink', $product->is_visible() ? $product->get_permalink($item) : '', $item, $key);
			$thumbnail = apply_filters('woocommerce_cart_item_thumbnail', $product->get_image('woocommerce_thumbnail', array('alt' => '', 'loading' => 'lazy')), $item, $key);
			?>
			<div class="sh-drawer-item">
				<figure><?php echo wp_kses_post($thumbnail); ?></figure>
				<div class="lyr-drawer-item-details">
					<?php if ($url) : ?><a class="lyr-drawer-item-name" href="<?php echo esc_url($url); ?>"><?php echo wp_kses_post($name); ?></a><?php else : ?><b><?php echo wp_kses_post($name); ?></b><?php endif; ?>
					<?php echo wp_kses_post(wc_get_formatted_cart_item_data($item)); ?>
					<?php echo self::drawer_quantity('', $item, $key); ?>
				</div>
				<div class="lyr-drawer-item-total">
					<div class="sh-drawer-item__price"><?php echo wp_kses_post(apply_filters('woocommerce_cart_item_subtotal', $cart->get_product_subtotal($product, $item['quantity']), $item, $key)); ?></div>
					<button class="sh-drawer-item__rm" type="button" data-cart-remove="<?php echo esc_attr($key); ?>" aria-label="<?php echo esc_attr(wp_strip_all_tags($name) . ' törlése a kosárból'); ?>">Törlés</button>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="sh-drawer__foot">
		<?php if ('RON' === get_woocommerce_currency()) : $gift = (bool) WC()->session->get('layero_giftwrap'); ?>
			<label class="sh-giftwrap<?php echo $gift ? ' is-on' : ''; ?>">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7S10 2 7 3.5 9 7 12 7ZM12 7s2-5 5-3.5S15 7 12 7Z"/></svg>
				<span><b>Ajándékcsomagolás</b><small>A rendeléshez · +<?php echo wp_kses_post(wc_price(15)); ?></small></span>
				<input type="checkbox" data-cart-giftwrap <?php checked($gift); ?> aria-label="Ajándékcsomagolás, 15 RON">
			</label>
		<?php endif; ?>
		<?php if (wc_coupons_enabled()) : ?>
			<form class="sh-coupon" data-cart-coupon>
				<label class="screen-reader-text" for="lyr-drawer-coupon">Kuponkód</label>
				<input id="lyr-drawer-coupon" name="coupon_code" type="text" placeholder="KUPONKÓD" autocomplete="off" maxlength="200" required>
				<button type="submit">Beváltás</button>
			</form>
		<?php endif; ?>
		<dl class="lyr-drawer-totals">
			<div><dt>Részösszeg</dt><dd><?php echo wp_kses_post($cart->get_cart_subtotal()); ?></dd></div>
			<?php foreach ($cart->get_coupons() as $code => $coupon) : ?>
				<div class="lyr-drawer-discount"><dt>Kupon: <?php echo esc_html($code); ?><button type="button" data-cart-remove-coupon="<?php echo esc_attr($code); ?>" aria-label="<?php echo esc_attr($code . ' kupon eltávolítása'); ?>">Eltávolítás</button></dt><dd><?php
					$discount = $cart->get_coupon_discount_amount($code, ! $cart->display_prices_including_tax());
					echo $coupon->get_free_shipping() && ! $discount ? 'Ingyenes szállítás' : wp_kses_post('−' . wc_price($discount));
				?></dd></div>
			<?php endforeach; ?>
			<?php if ($shipping['needed']) : ?><div><dt>Szállítás<?php if (! empty($shipping['methods'])) : ?><small><?php echo esc_html($shipping['methods'] . (! empty($shipping['estimated']) ? ' · becsült díj' : '')); ?></small><?php endif; ?></dt><dd><?php echo wp_kses_post($shipping['label']); ?></dd></div><?php endif; ?>
			<?php foreach ($cart->get_fees() as $fee) : ?><div><dt><?php echo esc_html($fee->name); ?></dt><dd><?php wc_cart_totals_fee_html($fee); ?></dd></div><?php endforeach; ?>
			<?php if (wc_tax_enabled() && ! $cart->display_prices_including_tax()) : ?>
				<?php if ('itemized' === get_option('woocommerce_tax_total_display')) : ?>
					<?php foreach ($cart->get_tax_totals() as $tax) : ?><div><dt><?php echo esc_html($tax->label); ?></dt><dd><?php echo wp_kses_post($tax->formatted_amount); ?></dd></div><?php endforeach; ?>
				<?php else : ?><div><dt><?php echo esc_html(WC()->countries->tax_or_vat()); ?></dt><dd><?php wc_cart_totals_taxes_total_html(); ?></dd></div><?php endif; ?>
			<?php endif; ?>
			<div class="lyr-drawer-grand-total"><dt><?php echo $shipping['needed'] && ! $shipping['known'] ? 'Összesen, szállítás nélkül' : 'Összesen'; ?></dt><dd><?php wc_cart_totals_order_total_html(); ?></dd></div>
		</dl>
		<a class="sh-btn sh-btn--primary" href="<?php echo esc_url(wc_get_checkout_url()); ?>">Tovább a pénztárhoz</a>
		<a class="sh-btn sh-btn--ghost" href="<?php echo esc_url(wc_get_cart_url()); ?>">Kosár megtekintése</a>
		<?php if (is_ssl()) : ?><p class="sh-drawer__secure"><?php echo \LayeroShop\Helpers::icon('shield'); ?> Biztonságos, titkosított kapcsolat</p><?php endif; ?>
		<p class="lyr-cart-note">A szállítási és fizetési módot a pénztárnál választhatod ki.</p>
	</div>
<?php endif; ?>
