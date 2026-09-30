(function ($) {
  'use strict';
  $(function () {
    var drawer = document.getElementById('lyr-cart-drawer');
    if (!drawer) return;
    var trigger = null;
    var previousOverflow = '';
    var requestedFreshFragments = false;
    var pendingQuantityFocus = null;

    function refreshPageTotals() {
      if (document.body.classList.contains('lyr-cart-page')) $(document.body).trigger('wc_update_cart');
      if (document.body.classList.contains('lyr-checkout-page')) $(document.body).trigger('update_checkout');
    }
    function unlockQuantity() {
      drawer.querySelectorAll('[aria-busy]').forEach(function (content) { content.removeAttribute('aria-busy'); });
      drawer.querySelectorAll('[data-drawer-quantity]').forEach(function (button) {
        button.disabled = Number(button.dataset.drawerQuantity) < 0 && Number(button.closest('[data-cart-key]').dataset.quantity) <= 1;
      });
    }

    function announce(message) {
      var status = document.querySelector('.lyr-commerce-status');
      if (status) status.textContent = message;
      var drawerStatus = drawer.querySelector('.lyr-cart-status');
      if (drawerStatus) drawerStatus.textContent = message;
    }
    function sync() {
      var content = drawer.querySelector('[data-cart-count]');
      if (!content || !content.dataset.cartNonce || !content.dataset.quantityUrl) {
        // Discard a pre-upgrade WooCommerce fragment once, without a refresh loop.
        if (!requestedFreshFragments) {
          requestedFreshFragments = true;
          $(document.body).trigger('wc_fragment_refresh');
        }
        return;
      }
      var count = Math.max(0, parseInt(content.dataset.cartCount, 10) || 0);
      document.querySelectorAll('.sh-cart-badge').forEach(function (badge) {
        badge.hidden = false;
        badge.textContent = count;
        badge.classList.toggle('is-on', count > 0);
        badge.setAttribute('aria-hidden', 'true');
      });
      document.querySelectorAll('.sh-cart-btn').forEach(function (button) {
        button.setAttribute('aria-label', 'Kosár, ' + count + ' darab');
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-controls', drawer.id);
        button.setAttribute('aria-expanded', drawer.open ? 'true' : 'false');
      });
      drawer.querySelector('[data-layero-cart-count]').textContent = count ? '· ' + count + ' db' : '';
      var pageCount = document.querySelector('[data-layero-cart-page-count]');
      if (pageCount) pageCount.textContent = count + ' darab a kosaradban';
    }
    function open(source) {
      if (!drawer.showModal) return;
      trigger = source || document.activeElement;
      if (!drawer.open) {
        previousOverflow = document.body.style.overflow;
        drawer.showModal();
        document.body.style.overflow = 'hidden';
      }
      sync();
    }
    drawer.addEventListener('close', function () {
      document.body.style.overflow = previousOverflow;
      sync();
      if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
    });
    drawer.addEventListener('click', function (event) {
      var quantityButton = event.target.closest('[data-drawer-quantity]');
      if (quantityButton) {
        var content = drawer.querySelector('[data-cart-count]');
        var row = quantityButton.closest('[data-cart-key]');
        if (!content || content.getAttribute('aria-busy') === 'true') return;
        var quantity = Math.max(1, Number(row.dataset.quantity) + Number(quantityButton.dataset.drawerQuantity));
        var data = new URLSearchParams({ nonce: content.dataset.cartNonce, key: row.dataset.cartKey, quantity: quantity });
        content.setAttribute('aria-busy', 'true');
        content.querySelectorAll('[data-drawer-quantity]').forEach(function (button) { button.disabled = true; });
        announce('Kosár frissítése…');
        fetch(content.dataset.quantityUrl, { method: 'POST', credentials: 'same-origin', body: data })
          .then(function (response) { return response.json().then(function (payload) {
            if (!response.ok || !payload.success) throw new Error(payload.data && payload.data.message || 'A frissítés nem sikerült.');
            return payload;
          }); })
          .then(function () {
            pendingQuantityFocus = { key: row.dataset.cartKey, direction: quantityButton.dataset.drawerQuantity };
            announce('A mennyiséget frissítettük.');
            refreshPageTotals();
            $(document.body).trigger('wc_fragment_refresh');
          })
          .catch(function (error) {
            unlockQuantity();
            announce(error.message || 'Hálózati hiba. Ellenőrizd a kosarad, mielőtt újra próbálod.');
          });
      }
      if (event.target.closest('[data-layero-cart-close]')) drawer.close();
      if (event.target === drawer) {
        var bounds = drawer.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) drawer.close();
      }
    });
    document.addEventListener('click', function (event) {
      var button = event.target.closest('.sh-cart-btn');
      if (button && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0 && drawer.showModal) {
        event.preventDefault();
        open(button);
      }
      var quantityButton = event.target.closest('[data-layero-quantity]');
      if (quantityButton) {
        var input = quantityButton.closest('.lyr-cart-quantity').querySelector('input.qty');
        if (!input || input.disabled || input.readOnly) return;
        var step = Number(input.step) || 1;
        var min = input.min === '' ? 0 : Number(input.min);
        var max = input.max === '' ? Infinity : Number(input.max);
        input.value = Math.min(max, Math.max(min, Number(input.value || min) + Number(quantityButton.dataset.layeroQuantity) * step));
        $(input).trigger('change');
      }
    });
    $(document.body).on('wc_fragments_loaded wc_fragments_refreshed updated_wc_div updated_checkout', sync);
    $(document.body).on('wc_fragments_refreshed', function () {
      if (!pendingQuantityFocus) return;
      unlockQuantity();
      var target = drawer.querySelector('[data-cart-key="' + CSS.escape(pendingQuantityFocus.key) + '"] [data-drawer-quantity="' + pendingQuantityFocus.direction + '"]');
      if (drawer.open && target) (target.disabled ? target.parentNode.querySelector('[data-drawer-quantity="1"]') : target).focus({ preventScroll: true });
      pendingQuantityFocus = null;
    });
    $(document.body).on('added_to_cart', function (event, fragments, hash, button) {
      sync();
      announce('A termék a kosaradba került.');
      open(button && button[0]);
    });
    $(document.body).on('removed_from_cart', function () {
      sync();
      refreshPageTotals();
      announce('A terméket eltávolítottuk a kosárból.');
      if (drawer.open) drawer.querySelector('[data-layero-cart-close]').focus({ preventScroll: true });
    });
    $(document.body).on('wc_fragments_ajax_error', function () {
      pendingQuantityFocus = null;
      unlockQuantity();
      announce('A kosár frissítése nem sikerült. A Kosár megtekintése linken ellenőrizheted a tartalmát.');
    });
    sync();
    // The standard product form keeps server validation (including variations and personalization).
    if (document.querySelector('.lyr-single-product .woocommerce-message .wc-forward')) {
      announce('A termék a kosaradba került.');
      open(document.querySelector('.single_add_to_cart_button'));
    }
  });
})(jQuery);
