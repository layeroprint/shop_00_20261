(function ($) {
  'use strict';
  $(function () {
    var drawer = document.getElementById('lyr-cart-drawer');
    if (!drawer) return;
    var trigger = null;
    var previousOverflow = '';
    var requestedFreshFragments = false;
    var busy = false;
    var fragmentRequests = [];
    var cartTriggers = '.sh-cart-btn, [data-layero-cart-toggle]';

    function refreshPageTotals() {
      if (document.body.classList.contains('lyr-cart-page')) $(document.body).trigger('wc_update_cart');
      if (document.body.classList.contains('lyr-checkout-page')) $(document.body).trigger('update_checkout');
      $(document.body).trigger('wc_fragment_refresh');
    }
    function announce(message) {
      var status = document.querySelector('.lyr-commerce-status');
      if (status) status.textContent = message;
      drawer.querySelector('.lyr-cart-status').textContent = message;
    }
    function sync() {
      var content = drawer.querySelector('[data-cart-count]');
      if (!content || content.dataset.cartVersion !== '2') {
        if (!requestedFreshFragments) {
          requestedFreshFragments = true;
          $(document.body).trigger('wc_fragment_refresh');
        }
        return;
      }
      var count = Math.max(0, parseInt(content.dataset.cartCount, 10) || 0);
      document.querySelectorAll('.sh-cart-badge, [data-layero-cart-toggle] b').forEach(function (badge) {
        badge.hidden = false;
        badge.textContent = count;
        badge.classList.toggle('is-on', count > 0);
        badge.setAttribute('aria-hidden', 'true');
      });
      document.querySelectorAll(cartTriggers).forEach(function (button) {
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
      if (!drawer.open) {
        trigger = source || document.activeElement;
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
    function focusControl(selector) {
      if (!drawer.open) return;
      var target = selector && drawer.querySelector(selector);
      if (!target || target.disabled) target = drawer.querySelector('[data-layero-cart-close]');
      target.focus({ preventScroll: true });
    }
    function mutate(url, data, focusSelector) {
      if (busy) return;
      fragmentRequests.slice().forEach(function (request) { request.abort(); });
      busy = true;
      var content = drawer.querySelector('.lyr-woo-cart-content');
      var list = content.querySelector('.sh-drawer__body');
      var listScroll = list ? list.scrollTop : 0;
      var bodyScroll = drawer.querySelector('.lyr-cart-drawer__body').scrollTop;
      var controls = Array.from(content.querySelectorAll('button, input'));
      var disabled = controls.map(function (control) { return control.disabled; });
      controls.forEach(function (control) { control.disabled = true; });
      content.setAttribute('aria-busy', 'true');
      data.nonce = content.dataset.cartNonce;
      announce('Kosár frissítése…');
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 15000);
      fetch(url, { method: 'POST', credentials: 'same-origin', body: new URLSearchParams(data), signal: controller.signal })
        .then(function (response) { return response.json().then(function (payload) {
          if (!response.ok || !payload.success) throw new Error(payload.data && payload.data.message || 'A frissítés nem sikerült.');
          if (!payload.data.fragments || !payload.data.fragments['.lyr-woo-cart-content']) throw new Error('A kosár válasza hiányos. Frissítsd az oldalt.');
          return payload.data;
        }); })
        .then(function (payload) {
          Object.keys(payload.fragments).forEach(function (selector) { $(selector).replaceWith(payload.fragments[selector]); });
          sync();
          var updatedList = drawer.querySelector('.sh-drawer__body');
          if (updatedList) updatedList.scrollTop = listScroll;
          drawer.querySelector('.lyr-cart-drawer__body').scrollTop = bodyScroll;
          announce(payload.message);
          focusControl(focusSelector);
          refreshPageTotals();
        })
        .catch(function (error) {
          // A lost response can follow a committed mutation: never retry automatically.
          var gift = content.querySelector('[data-cart-giftwrap]');
          if (gift) gift.checked = gift.defaultChecked;
          announce(error.name === 'AbortError' || error instanceof TypeError
            ? 'Hálózati hiba. A Kosár megtekintése linken ellenőrizd a tartalmát, mielőtt újra próbálod.'
            : error.message);
        })
        .finally(function () {
          clearTimeout(timeout);
          busy = false;
          content.removeAttribute('aria-busy');
          controls.forEach(function (control, index) { control.disabled = disabled[index]; });
        });
    }
    drawer.addEventListener('submit', function (event) {
      var form = event.target.closest('[data-cart-coupon]');
      if (!form) return;
      event.preventDefault();
      var content = drawer.querySelector('[data-cart-count]');
      mutate(content.dataset.actionUrl, { operation: 'apply_coupon', value: form.elements.coupon_code.value.trim() }, '#lyr-drawer-coupon');
    });
    drawer.addEventListener('change', function (event) {
      if (!event.target.matches('[data-cart-giftwrap]')) return;
      var content = drawer.querySelector('[data-cart-count]');
      mutate(content.dataset.actionUrl, { operation: 'giftwrap', value: event.target.checked ? 'yes' : 'no' }, '[data-cart-giftwrap]');
    });
    drawer.addEventListener('click', function (event) {
      if (busy && event.target.closest('a')) {
        event.preventDefault();
        announce('A kosár frissítése folyamatban van…');
        return;
      }
      var content = drawer.querySelector('[data-cart-count]');
      var quantityButton = event.target.closest('[data-drawer-quantity]');
      var remove = event.target.closest('[data-cart-remove]');
      var coupon = event.target.closest('[data-cart-remove-coupon]');
      if (quantityButton) {
        var row = quantityButton.closest('[data-cart-key]');
        var quantity = Math.max(1, Number(row.dataset.quantity) + Number(quantityButton.dataset.drawerQuantity));
        mutate(content.dataset.quantityUrl, { key: row.dataset.cartKey, quantity: quantity },
          '[data-cart-key="' + CSS.escape(row.dataset.cartKey) + '"] [data-drawer-quantity="' + quantityButton.dataset.drawerQuantity + '"]');
      }
      if (remove) mutate(content.dataset.actionUrl, { operation: 'remove', value: remove.dataset.cartRemove }, '[data-cart-remove]');
      if (coupon) mutate(content.dataset.actionUrl, { operation: 'remove_coupon', value: coupon.dataset.cartRemoveCoupon }, '#lyr-drawer-coupon');
      if (event.target.closest('[data-layero-cart-close]')) drawer.close();
      if (event.target === drawer) {
        var bounds = drawer.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) drawer.close();
      }
    });
    // Capture before older header/shortcode handlers: one click opens only this drawer.
    document.addEventListener('click', function (event) {
      var button = event.target.closest(cartTriggers);
      if (!button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0 || !drawer.showModal) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      document.querySelectorAll('[data-layero-cart-panel]').forEach(function (panel) { panel.hidden = true; });
      open(button);
      $(document.body).trigger('wc_fragment_refresh');
    }, true);
    document.addEventListener('click', function (event) {
      var quantityButton = event.target.closest('[data-layero-quantity]');
      if (!quantityButton) return;
      var input = quantityButton.closest('.lyr-cart-quantity').querySelector('input.qty');
      if (!input || input.disabled || input.readOnly) return;
      var step = Number(input.step) || 1;
      var min = input.min === '' ? 0 : Number(input.min);
      var max = input.max === '' ? Infinity : Number(input.max);
      input.value = Math.min(max, Math.max(min, Number(input.value || min) + Number(quantityButton.dataset.layeroQuantity) * step));
      $(input).trigger('change');
    });
    // Preserve draft and focus through WooCommerce's background fragment refresh.
    $(document).ajaxSend(function (event, xhr, settings) {
      if (settings.url.indexOf('get_refreshed_fragments') === -1) return;
      fragmentRequests.push(xhr);
      xhr.always(function () { fragmentRequests = fragmentRequests.filter(function (request) { return request !== xhr; }); });
      var input = drawer.querySelector('#lyr-drawer-coupon');
      var draft = input ? input.value : '';
      var focused = document.activeElement;
      var focusSelector = null;
      if (focused && drawer.contains(focused)) {
        if (focused.id) focusSelector = '#' + CSS.escape(focused.id);
        else if (focused.matches('[data-cart-giftwrap]')) focusSelector = '[data-cart-giftwrap]';
        else if (focused.matches('[data-drawer-quantity]')) focusSelector = '[data-cart-key="' + CSS.escape(focused.closest('[data-cart-key]').dataset.cartKey) + '"] [data-drawer-quantity="' + focused.dataset.drawerQuantity + '"]';
        else if (focused.matches('[data-cart-remove]')) focusSelector = '[data-cart-remove="' + CSS.escape(focused.dataset.cartRemove) + '"]';
      }
      var list = drawer.querySelector('.sh-drawer__body');
      var scroll = list ? list.scrollTop : 0;
      xhr.done(function () {
        var updatedInput = drawer.querySelector('#lyr-drawer-coupon');
        if (updatedInput && !updatedInput.value) updatedInput.value = draft;
        var updatedList = drawer.querySelector('.sh-drawer__body');
        if (updatedList) updatedList.scrollTop = scroll;
        if (focused && !focused.isConnected && focusSelector) focusControl(focusSelector);
      });
    });
    $(document.body).on('wc_fragments_loaded wc_fragments_refreshed updated_wc_div updated_checkout', sync);
    $(document.body).on('added_to_cart', function (event, fragments, hash, button) {
      sync();
      announce('A termék a kosaradba került.');
      open(button && button[0]);
    });
    $(document.body).on('removed_from_cart', function () {
      sync();
      refreshPageTotals();
      announce('A terméket eltávolítottuk a kosárból.');
    });
    $(document.body).on('wc_fragments_ajax_error', function () {
      announce('A kosár frissítése nem sikerült. A Kosár megtekintése linken ellenőrizheted a tartalmát.');
    });
    sync();
    if (document.querySelector('.lyr-single-product .woocommerce-message .wc-forward')) {
      announce('A termék a kosaradba került.');
      open(document.querySelector('.single_add_to_cart_button'));
    }
  });
})(jQuery);
