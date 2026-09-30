(function () {
  'use strict';
  document.addEventListener('submit', async function (event) {
    var form = event.target;
    if (!form.matches('[data-layero-subscription]')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (!form.reportValidity() || form.dataset.sending === '1') return;
    var ro = form.dataset.language === 'ro';
    var status = form.querySelector('[data-subscription-status]');
    var button = form.querySelector('[type="submit"]');
    var endpoint = form.dataset.endpoint;
    form.dataset.sending = '1'; button.disabled = true;
    status.textContent = ro ? 'Se procesează…' : 'Feldolgozás…';
    status.dataset.state = 'pending';
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 25000);
    try {
      var nonceUrl = new URL(endpoint, location.href); nonceUrl.searchParams.set('action', 'layero_subscription_nonce');
      var nonceResponse = await fetch(nonceUrl, { credentials: 'same-origin', cache: 'no-store', signal: controller.signal });
      var nonceResult = await nonceResponse.json();
      if (!nonceResponse.ok || !nonceResult.success || !nonceResult.data.nonce) throw new Error();
      var data = new FormData(form); data.set('action', 'layero_subscribe'); data.set('nonce', nonceResult.data.nonce);
      var response = await fetch(endpoint, { method: 'POST', body: data, credentials: 'same-origin', signal: controller.signal });
      var result = await response.json();
      if (!result || !result.data || typeof result.data.message !== 'string') throw new Error();
      status.textContent = result.data.message;
      status.dataset.state = result.success && response.ok ? 'success' : 'error';
      if (result.success && response.ok) form.reset();
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = ro ? 'Nu am putut verifica abonarea. Încearcă din nou mai târziu.' : 'A feliratkozást most nem tudtuk ellenőrizni. Próbáld újra később.';
    } finally { clearTimeout(timer); delete form.dataset.sending; button.disabled = false; }
  }, true);
})();
