(function () {
  'use strict';
  function init() {
    var root = document.querySelector('[data-layero-single-product]');
    if (!root) return;
    var main = root.querySelector('#lyr-product-main-image');
    var dialog = root.querySelector('#lyr-gallery-dialog');
    var zoom = root.querySelector('[data-layero-gallery-open]');
    var close = root.querySelector('[data-layero-gallery-close]');
    root.querySelectorAll('[data-layero-gallery-image]').forEach(function (button, index) {
      button.addEventListener('click', function () {
        if (!main) return;
        main.src = button.dataset.layeroGalleryImage;
        main.removeAttribute('srcset');
        main.removeAttribute('sizes');
        main.alt = button.dataset.layeroGalleryAlt || '';
        var counter = root.querySelector('[data-layero-gallery-index]');
        if (counter) counter.textContent = String(index + 1).padStart(2, '0');
        root.querySelectorAll('[data-layero-gallery-image]').forEach(function (item) {
          var active = item === button;
          item.classList.toggle('is-on', active);
          item.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      });
    });
    if (dialog && zoom && typeof dialog.showModal === 'function') {
      zoom.addEventListener('click', function () {
        var enlarged = dialog.querySelector('img');
        enlarged.src = main.currentSrc || main.src;
        enlarged.alt = main.alt;
        dialog.showModal();
      });
      close.addEventListener('click', function () { dialog.close(); });
      dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener('close', function () { zoom.focus({ preventScroll: true }); });
    }
    root.querySelectorAll('.lyr-personalization').forEach(function (panel) {
      var heading = document.createElement('div');
      heading.className = 'sh-personalize__heading';
      var icon = document.createElement('span'); icon.textContent = '✎'; icon.setAttribute('aria-hidden', 'true');
      var title = document.createElement('h2'); title.textContent = 'Tedd személyessé';
      heading.append(icon, title); panel.prepend(heading);
      panel.querySelectorAll('input[type="text"][maxlength], textarea[maxlength]').forEach(function (input) {
        var label = input.labels && input.labels[0];
        if (!label) return;
        var count = document.createElement('span'); count.className = 'lyr-field-count'; count.setAttribute('aria-hidden', 'true'); label.appendChild(count);
        function updateCount() { count.textContent = input.value.length + ' / ' + input.maxLength; }
        input.addEventListener('input', updateCount); updateCount();
      });
    });
    var preview = root.querySelector('#lyr-product-preview');
    var field = root.querySelector('[name="layero_personalization_text"], input[type="text"][name^="layero_fields["]');
    if (preview && field) {
      root.querySelector('[data-layero-name-preview]').hidden = false;
      function updatePreview() { preview.textContent = field.value.trim() || 'A TE NEVED'; }
      field.addEventListener('input', updatePreview); updatePreview();
    }
    var form = root.querySelector('form.cart');
    var total = root.querySelector('[data-layero-order-total]');
    if (form && total) {
      var quantity = form.querySelector('input.qty');
      var amount = total.querySelector('[data-layero-order-amount]');
      var quantityLabel = total.querySelector('[data-layero-order-quantity]');
      var format = JSON.parse(total.dataset.priceFormat);
      var price = total.dataset.price === '' ? null : Number(total.dataset.price);
      function money(value) {
        var parts = value.toFixed(format.decimals).split('.');
        var number = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format.thousand);
        if (parts[1]) number += format.decimal + parts[1];
        return format.format.replace('%1$s', format.currency).replace('%2$s', number).replace(/&nbsp;/g, '\u00a0');
      }
      var minus, plus;
      function updateTotal() {
        var count = quantity ? Number(quantity.value) : 1;
        quantityLabel.textContent = String(Number.isFinite(count) && count > 0 ? count : '—');
        amount.textContent = price !== null && Number.isFinite(count) && count > 0 ? money(price * count) : (price === null ? 'Válassz változatot' : 'Adj meg mennyiséget');
        if (minus) minus.disabled = count <= Number(quantity.min || 1);
        if (plus) plus.disabled = quantity.max !== '' && count >= Number(quantity.max);
      }
      if (quantity && quantity.type !== 'hidden' && !quantity.readOnly) {
        function stepButton(label, direction, symbol) {
          var button = document.createElement('button'); button.type = 'button'; button.className = 'lyr-quantity-step';
          button.setAttribute('aria-label', label); button.textContent = symbol;
          button.addEventListener('click', function () {
            if (direction > 0) quantity.stepUp(); else quantity.stepDown();
            quantity.dispatchEvent(new Event('input', { bubbles: true }));
            quantity.dispatchEvent(new Event('change', { bubbles: true }));
          });
          return button;
        }
        minus = stepButton('Kevesebb', -1, '−'); plus = stepButton('Több', 1, '+');
        quantity.before(minus); quantity.after(plus);
      }
      form.addEventListener('input', updateTotal); form.addEventListener('change', updateTotal);
      if (window.jQuery && form.classList.contains('variations_form')) {
        window.jQuery(form).on('found_variation', function (event, variation) {
          price = variation && typeof variation.display_price === 'number' ? variation.display_price : null;
          updateTotal();
        }).on('reset_data hide_variation', function () { price = null; updateTotal(); });
      }
      updateTotal();
      // WooCommerce can adjust quantity bounds after selecting a variation.
      if (quantity) new MutationObserver(updateTotal).observe(quantity, { attributes: true, attributeFilter: ['min', 'max', 'step'] });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
