(function () {
  'use strict';
  function boot() {
    if (!(window.LayeroShopUI || {}).ajaxUrl) return;
    document.querySelectorAll('[data-layero-withdrawal]').forEach(function (form) {
      form.querySelector('[type="submit"]').disabled = false;
      var preview = form.querySelector('[data-withdrawal-preview]'); if (preview) preview.remove();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  document.addEventListener('submit', async function (event) {
    var form = event.target;
    if (!form.matches('[data-layero-withdrawal]')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (!form.reportValidity() || form.dataset.sending === '1') return;
    var config = window.LayeroShopUI || {};
    var status = form.querySelector('[data-withdrawal-status]');
    if (!config.ajaxUrl) { status.textContent = 'A helyi előnézet nem küld nyilatkozatot. Használd az online webshopot vagy írj a layeroprint@gmail.com címre.'; return; }
    var button = form.querySelector('[type="submit"]');
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 25000);
    form.dataset.sending = '1'; button.disabled = true; status.textContent = 'Nyilatkozat küldése…';
    try {
      var nonceUrl = new URL(config.ajaxUrl, location.href); nonceUrl.searchParams.set('action', 'layero_contact_nonce');
      var nonceResponse = await fetch(nonceUrl, {credentials:'same-origin', cache:'no-store', signal:controller.signal});
      var nonce = await nonceResponse.json();
      if (!nonceResponse.ok || !nonce.success || !nonce.data.nonce) throw new Error('Az űrlap most nem elérhető. Próbáld újra, vagy írj e-mailt.');
      var data = new FormData(form); data.set('action', 'layero_withdrawal_submit'); data.set('nonce', nonce.data.nonce);
      var response = await fetch(config.ajaxUrl, {method:'POST', credentials:'same-origin', body:data, signal:controller.signal});
      var result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.data && result.data.message || 'A mentés nem sikerült. Az adataid megmaradtak.');
      if (typeof result.data.receipt !== 'string') throw new Error('Nem sikerült ellenőrizni a visszaigazolást. Ellenőrizd az e-mailjeidet, vagy írj nekünk.');
      status.textContent = result.data.message;
      var download = document.createElement('a');
      download.href = URL.createObjectURL(new Blob(['\uFEFF' + result.data.receipt], {type:'text/plain;charset=utf-8'}));
      download.download = 'layero-elallas-' + result.data.reference + '.txt';
      download.textContent = 'Átvételi igazolás letöltése'; download.className = 'sh-btn sh-btn--outline';
      form.querySelector('[data-withdrawal-receipt]').replaceChildren(download);
      form.reset();
    } catch (error) { status.textContent = error.name === 'AbortError' ? 'A válasz késik. Ellenőrizd az e-mailjeidet, mielőtt újraküldöd a nyilatkozatot.' : error.message; }
    finally { clearTimeout(timer); delete form.dataset.sending; button.disabled = false; }
  }, true);
})();
