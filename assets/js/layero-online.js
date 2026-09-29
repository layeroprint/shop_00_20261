(function () {
  'use strict';
  var selector = '#sh-contact-form, form[data-lp-quote], form[data-layero-corporate-form], form[data-layero-contact]';
  var config = window.LayeroShopUI || {};
  function text(tag, value) { var node = document.createElement(tag); node.textContent = value; return node; }
  function value(form, selectors) {
    var field = form.querySelector(selectors);
    return field ? field.value.trim() : '';
  }
  function prepare(form) {
    if (form.dataset.layeroOnlineReady) return;
    form.dataset.layeroOnlineReady = '1';
    var rules = [['[name="name"], [name="nev"], #cf-nev', 100], ['input[type="email"]', 254], ['textarea', 4000]];
    rules.forEach(function (rule) { var field = form.querySelector(rule[0]); if (field && field.maxLength < 0) field.maxLength = rule[1]; });
    if (!form.querySelector('[name="consent"]')) {
      var label = text('label', ' Elolvastam az adatvédelmi tájékoztatót. ');
      label.className = 'lyr-form-consent';
      var check = document.createElement('input'); check.type = 'checkbox'; check.name = 'consent'; check.value = '1'; check.required = true;
      var link = text('a', 'Adatvédelmi tájékoztató'); link.href = ((window.LayeroShopStatic || {}).urls || {})['adatvedelem.html'] || '/adatvedelem/';
      label.prepend(check); label.appendChild(link);
      var submit = form.querySelector('[type="submit"]');
      if (submit) submit.before(label); else form.appendChild(label);
    }
    if (!form.querySelector('[name="website"]')) {
      var trap = document.createElement('input'); trap.name = 'website'; trap.type = 'text'; trap.tabIndex = -1;
      trap.autocomplete = 'off'; trap.hidden = true; form.appendChild(trap);
    }
    var status = text('p', ''); status.className = 'lyr-online-status'; status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
    form.appendChild(status);
    var notice = text('p', 'Referenciaképet az első egyeztetéskor e-mailben tudsz küldeni.');
    notice.className = 'lyr-form-note'; form.appendChild(notice);
  }
  function boot() {
    document.querySelectorAll(selector).forEach(prepare);
    // Until a newsletter provider is connected, do not collect addresses or promise coupons.
    document.querySelectorAll('.lyr-newsletter, .sh-nlbanner').forEach(function (block) {
      if (block.dataset.layeroNewsletterDisabled) return;
      block.dataset.layeroNewsletterDisabled = '1';
      block.replaceChildren(text('h2', 'Kérdésed vagy egyedi ötleted van?'), text('p', 'Írd meg nekünk, és egyeztetjük a részleteket.'));
      var link = text('a', 'Kapcsolatfelvétel'); link.className = 'sh-btn sh-btn--dark'; link.href = '/kapcsolat/'; block.appendChild(link);
    });
  }
  // Capture prevents the old demo handlers from claiming a successful submission.
  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form.matches(selector)) return;
    event.preventDefault(); event.stopImmediatePropagation(); prepare(form);
    var status = form.querySelector('.lyr-online-status');
    if (!form.reportValidity() || form.dataset.layeroSending === '1') return;
    if (!config.ajaxUrl || !config.contactNonce) { status.textContent = 'Az űrlap most nem elérhető. Írj közvetlenül a kapcsolati e-mail-címre.'; return; }
    var data = new FormData(form);
    data.set('name', value(form, '[name="name"], [name="nev"], #cf-nev'));
    data.set('email', value(form, '[name="email"], input[type="email"]'));
    data.set('message', value(form, '[name="message"], [name="uzenet"], [name="otlet"], #cf-uzenet, textarea'));
    data.set('topic', form.getAttribute('data-layero-form-topic') || value(form, '[name="tema"]:checked, #cf-tema') || 'Kapcsolat / ajánlatkérés');
    data.set('occasion', value(form, '[name="occasion"], [name="alkalom"]:checked'));
    data.set('action', 'layero_contact_submit'); data.set('nonce', config.contactNonce);
    var button = form.querySelector('[type="submit"]');
    form.dataset.layeroSending = '1'; if (button) button.disabled = true; status.textContent = 'Küldés…';
    fetch(config.ajaxUrl, { method: 'POST', credentials: 'same-origin', body: data }).then(function (response) {
      return response.json().then(function (payload) {
        if (!response.ok || !payload.success) throw new Error(payload.data && payload.data.message || 'Nem sikerült elküldeni. Az adataid megmaradtak, próbáld újra.');
        return payload.data;
      });
    }).then(function (payload) {
      status.textContent = payload.message; form.reset();
    }).catch(function (error) {
      status.textContent = error.message || 'Hálózati hiba. Az adataid megmaradtak, próbáld újra.';
    }).finally(function () { form.dataset.layeroSending = '0'; if (button) button.disabled = false; });
  }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

// Progressive enhancement: server-rendered catalogue filters also work without JS.
(function () {
  'use strict';
  function initCatalogueFilters() {
    document.querySelectorAll('.lyr-catalog-filters').forEach(function (panel) {
      if (window.matchMedia('(max-width: 900px)').matches) panel.open = false;
      panel.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && panel.open) { panel.open = false; panel.querySelector('summary').focus(); }
      });
      var form = panel.querySelector('form');
      var low = form.querySelector('[data-price-range="min_price"]');
      var high = form.querySelector('[data-price-range="max_price"]');
      var bar = form.querySelector('.sh-range__track i');
      function draw() {
        var span = Number(high.max) - Number(low.min) || 1;
        bar.style.left = ((Number(low.value) - Number(low.min)) / span * 100) + '%';
        bar.style.right = (100 - (Number(high.value) - Number(low.min)) / span * 100) + '%';
      }
      [low, high].forEach(function (range) {
        var field = form.elements[range.dataset.priceRange];
        range.addEventListener('input', function () {
          if (Number(low.value) > Number(high.value)) range.value = range === low ? high.value : low.value;
          field.value = range.value; draw();
        });
        field.addEventListener('input', function () {
          range.value = field.value === '' ? (range === low ? range.min : range.max) : field.value;
          draw();
        });
      });
      draw();
    });
    var pills = document.querySelector('.lyr-catalog-pills');
    var active = pills && pills.querySelector('[aria-current="page"]');
    if (active) pills.scrollLeft = Math.max(0, active.offsetLeft - pills.offsetLeft - 20);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCatalogueFilters);
  else initCatalogueFilters();
})();
