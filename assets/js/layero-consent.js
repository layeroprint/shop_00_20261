/* Layero consent: load in <head>, before any optional service. No vendor tags are loaded here. */
(function () {
  'use strict';
  var KEY = 'layero_consent_v2';
  var VERSION = 2;
  var LIFETIME = 180 * 24 * 60 * 60 * 1000;
  var marketingEnabled = !!(window.LayeroConsentConfig && window.LayeroConsentConfig.marketingEnabled === true);
  var saved = read(), expiryTimer, banner, dialog, launcher, notice, returnFocus, showTimer;

  function defaults() { return { necessary: true, preferences: false, analytics: false, marketing: false }; }
  function valid(value) {
    return value && value.version === VERSION && value.marketingAvailable === marketingEnabled && typeof value.preferences === 'boolean' &&
      typeof value.analytics === 'boolean' && typeof value.marketing === 'boolean' &&
      Number.isFinite(value.updatedAt) && Number.isFinite(value.expiresAt) &&
      value.updatedAt <= Date.now() && value.expiresAt > Date.now() &&
      value.expiresAt > value.updatedAt && value.expiresAt - value.updatedAt <= LIFETIME;
  }
  function read() {
    try { var value = JSON.parse(localStorage.getItem(KEY)); return valid(value) ? value : null; }
    catch (error) { return null; }
  }
  function current() {
    if (!valid(saved)) return defaults();
    return { necessary: true, preferences: saved.preferences, analytics: saved.analytics, marketing: marketingEnabled && saved.marketing };
  }
  function googleState() {
    var state = current();
    return { analytics_storage: state.analytics ? 'granted' : 'denied',
      ad_storage: state.marketing ? 'granted' : 'denied',
      ad_user_data: state.marketing ? 'granted' : 'denied',
      ad_personalization: state.marketing ? 'granted' : 'denied',
      personalization_storage: state.preferences ? 'granted' : 'denied', security_storage: 'granted' };
  }
  function clearOptionalStorage() {
    var state = current();
    if (!state.preferences) {
      try { localStorage.removeItem('sh_recent'); } catch (error) { /* Storage may be disabled. */ }
      document.querySelectorAll('[data-consent-recent]').forEach(function (el) { el.remove(); });
    }
    // Only known, first-party, JavaScript-accessible measurement cookies; never cart/session cookies.
    var cookies;
    try { cookies = document.cookie.split(';'); } catch (error) { return; }
    cookies.forEach(function (entry) {
      var name = entry.trim().split('=')[0];
      if (!((!state.analytics && /^(_ga|_gid|_gat)(_|$)/.test(name)) ||
          (!state.marketing && /^(_gcl_|_fbp$|_fbc$)/.test(name)))) return;
      var domains = ['', location.hostname], parts = location.hostname.split('.');
      for (var i = 1; i < parts.length - 1; i++) domains.push(parts.slice(i).join('.'));
      var paths = ['/'], segments = location.pathname.split('/').filter(Boolean);
      segments.forEach(function (_, i) { paths.push('/' + segments.slice(0, i + 1).join('/')); });
      domains.forEach(function (domain) { paths.forEach(function (path) {
        document.cookie = name + '=; Max-Age=0; path=' + path + '; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      }); });
    });
  }
  function scheduleExpiry() {
    clearTimeout(expiryTimer);
    if (!saved) return;
    expiryTimer = setTimeout(function () {
      if (valid(saved)) { scheduleExpiry(); return; }
      saved = null; apply(); showBanner();
    }, Math.max(1, Math.min(saved.expiresAt - Date.now(), 86400000)));
  }
  function apply() {
    window.gtag('consent', 'update', googleState());
    clearOptionalStorage();
    scheduleExpiry();
    document.dispatchEvent(new CustomEvent('layero:consent', { detail: current() }));
  }
  function update(value) {
    value = value === 'all' ? { preferences: true, analytics: true, marketing: marketingEnabled } : value === 'min' ? defaults() : value || {};
    var now = Date.now();
    saved = { version: VERSION, marketingAvailable: marketingEnabled, necessary: true, preferences: value.preferences === true,
      analytics: value.analytics === true, marketing: marketingEnabled && value.marketing === true,
      updatedAt: now, expiresAt: now + LIFETIME };
    var persisted = false;
    try { localStorage.setItem(KEY, JSON.stringify(saved)); persisted = true; }
    catch (error) {
      // A full store must not resurrect an older approval after a rejected write.
      try { localStorage.removeItem(KEY); } catch (ignored) { /* Keep this page's choice in memory. */ }
    }
    try { localStorage.removeItem('sh_cookie_ok'); } catch (error) { /* Retired unversioned choice. */ }
    apply();
    return persisted;
  }
  // Undated legacy approvals cannot be treated as consent to new categories.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', googleState());
  window.gtag('set', 'ads_data_redaction', true);
  clearOptionalStorage();
  scheduleExpiry();
  window.LayeroConsent = {
    get: current,
    hasChoice: function () { return !!valid(saved); },
    allows: function (category) { return current()[category] === true; },
    update: update,
    open: function () { if (dialog) openSettings(); },
    show: function () { showBanner(); }
  };
  window.addEventListener('storage', function (event) {
    if (event.key !== KEY && event.key !== null) return;
    saved = read(); apply();
    if (saved) hideBanner(); else showBanner();
    if (dialog && dialog.open) fillSettings();
  });

  var cookieIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 12.5A9 9 0 1 1 11.5 3a4 4 0 0 0 5.2 5.2A4 4 0 0 0 21 12.5Z"/><path d="M8 8h.01M7 14h.01M12 11h.01M13 17h.01" stroke-width="3" stroke-linecap="round"/></svg>';
  // Local vector illustration: bevel, filament layers and embossed chocolate details.
  function mascot() {
    return '<svg class="ly-cookie-mascot" viewBox="0 0 180 180" fill="none" aria-hidden="true">' +
      '<defs><linearGradient id="ly-cookie-edge" x1="35" y1="35" x2="148" y2="154" gradientUnits="userSpaceOnUse"><stop stop-color="#f0c27a"/><stop offset="1" stop-color="#9c5c26"/></linearGradient>' +
      '<linearGradient id="ly-cookie-face" x1="45" y1="25" x2="132" y2="146" gradientUnits="userSpaceOnUse"><stop stop-color="#ffe1a8"/><stop offset=".5" stop-color="#f0c27a"/><stop offset="1" stop-color="#cd8c43"/></linearGradient>' +
      '<pattern id="ly-cookie-layers" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 .5H4" stroke="#70461e" stroke-opacity=".17"/><path d="M0 1.5H4" stroke="#fff2d6" stroke-opacity=".2"/></pattern>' +
      '<path id="ly-cookie-shape" d="M118 31C107 13 76 16 53 30C26 47 19 85 30 112C40 139 73 155 104 145C129 138 148 119 149 94C134 97 126 88 129 76C114 80 103 66 110 53C98 49 104 34 118 31Z"/></defs>' +
      '<ellipse cx="92" cy="159" rx="62" ry="9" fill="#00e5ff" opacity=".07"/>' +
      '<ellipse cx="92" cy="158" rx="43" ry="5" fill="#020812" opacity=".65"/>' +
      '<g transform="rotate(-12 90 90)"><use href="#ly-cookie-shape" transform="translate(6 8)" fill="url(#ly-cookie-edge)"/>' +
      '<use href="#ly-cookie-shape" fill="url(#ly-cookie-face)" stroke="#ffdea1" stroke-width="1.2"/>' +
      '<use href="#ly-cookie-shape" fill="url(#ly-cookie-layers)"/>' +
      '<g fill="#794b2a" stroke="#f6ce8c" stroke-width="1.5"><rect x="49" y="45" width="13" height="13" rx="4" transform="rotate(18 49 45)"/><rect x="78" y="31" width="10" height="11" rx="3" transform="rotate(-15 78 31)"/><rect x="40" y="100" width="12" height="12" rx="4" transform="rotate(-14 40 100)"/><rect x="102" y="117" width="13" height="13" rx="4" transform="rotate(20 102 117)"/></g>' +
      '<ellipse cx="65" cy="78" rx="5" ry="7" fill="#302720"/><ellipse cx="101" cy="79" rx="5" ry="7" fill="#302720"/>' +
      '<circle cx="66" cy="76" r="1.7" fill="#fff6df"/><circle cx="102" cy="77" r="1.7" fill="#fff6df"/>' +
      '<path d="M75 96Q83 105 93 96" stroke="#684326" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="56" cy="91" rx="7" ry="3" fill="#d98951" opacity=".6"/><ellipse cx="110" cy="92" rx="7" ry="3" fill="#d98951" opacity=".6"/></g>' +
      '<g fill="#f0c27a" transform="rotate(18 142 42)"><rect x="137" y="32" width="12" height="12" rx="3"/><rect x="154" y="55" width="7" height="7" rx="2"/></g>' +
      '<path d="M26 29v10M21 34h10M154 119v8M150 123h8" stroke="#00e5ff" stroke-width="1.5" stroke-linecap="round"/></svg>';
  }
  function showBanner() {
    if (!banner) return;
    banner.hidden = false;
    launcher.hidden = true;
  }
  function hideBanner() {
    clearTimeout(showTimer);
    if (!banner) return;
    banner.hidden = true;
    launcher.hidden = false;
  }
  function fillSettings() {
    var state = current();
    ['preferences', 'analytics', 'marketing'].forEach(function (key) { dialog.querySelector('[name="' + key + '"]').checked = state[key]; });
    var date = dialog.querySelector('[data-consent-date]');
    date.textContent = saved && valid(saved) ? 'Utolsó döntésed: ' + new Date(saved.updatedAt).toLocaleDateString('hu-HU') + ' · 180 napig őrizzük meg.' : 'A választható funkciók csak az engedélyeddel indulnak el.';
  }
  function openSettings() {
    clearTimeout(showTimer);
    returnFocus = document.activeElement;
    fillSettings();
    dialog.showModal();
    document.documentElement.classList.add('ly-consent-open');
    dialog.querySelector('[data-consent-heading]').focus();
  }
  function closeSettings() {
    dialog.close();
  }
  function saveChoice(value) {
    var persisted = update(value);
    var focusedInBanner = banner.contains(document.activeElement);
    hideBanner();
    if (dialog.open) closeSettings();
    else if (focusedInBanner) launcher.focus({ preventScroll: true });
    notice.textContent = '';
    setTimeout(function () {
      notice.textContent = persisted ? 'Sütibeállítások mentve. Bármikor módosíthatod őket.' : 'A beállítás ezen az oldalon érvényes. A böngésződ tiltja a mentést; újratöltés után ismét választanod kell.';
    }, 30);
  }
  function category(key, title, description, details) {
    var disabled = key === 'necessary' || (key === 'marketing' && !marketingEnabled);
    var status = key === 'necessary' ? 'Mindig aktív' : disabled ? 'Nem használjuk' : '';
    return '<section class="ly-consent-category"><div class="ly-consent-category__head"><h3 id="ly-consent-' + key + '">' + title + '</h3>' +
      (status ? '<span class="ly-consent-tag">' + status + '</span>' : '') +
      '<label class="ly-consent-switch"><input type="checkbox" role="switch" name="' + key + '" aria-labelledby="ly-consent-' + key + '" aria-describedby="ly-consent-desc-' + key + '"' + (disabled ? ' disabled' : '') + (key === 'necessary' ? ' checked' : '') + '><span aria-hidden="true"></span></label></div>' +
      '<p id="ly-consent-desc-' + key + '">' + description + '</p><details><summary>Mit jelent ez pontosan?</summary><p>' + details + '</p></details></section>';
  }
  function mount() {
    banner = document.createElement('section');
    banner.className = 'ly-consent-banner';
    banner.hidden = true;
    banner.setAttribute('aria-label', 'Sütik és adatvédelem');
    banner.innerHTML = '<div class="ly-consent-art">' + mascot() + '</div>' +
      '<div class="ly-consent-copy"><span class="ly-consent-eyebrow">APRÓ SÜTIK. TUDATOS DÖNTÉSEK.</span><h2>Egy kis süti.<br> A te döntésed.</h2>' +
      '<p>A kosaradhoz szükséges alapokat biztosítjuk. A kényelmi funkciókról és a statisztikáról te döntesz.</p>' +
      '<a class="ly-consent-privacy" href="adatvedelem.html#sutik">Adatvédelmi tájékoztató <span aria-hidden="true">↗</span></a></div>' +
      '<div class="ly-consent-actions"><button type="button" class="ly-consent-btn" data-consent-save="all">Összes elfogadása</button><button type="button" class="ly-consent-btn" data-consent-save="min">Csak a szükségesek</button><button type="button" class="ly-consent-settings" data-cookie-open>Testreszabom <span aria-hidden="true">↗</span></button></div>';
    document.body.appendChild(banner);
    launcher = document.createElement('button');
    launcher.type = 'button'; launcher.className = 'ly-consent-launcher';
    launcher.setAttribute('data-cookie-open', '');
    launcher.setAttribute('aria-label', 'Sütibeállítások megnyitása'); launcher.title = 'Sütibeállítások';
    launcher.innerHTML = cookieIcon;
    document.body.appendChild(launcher);
    dialog = document.createElement('dialog');
    dialog.className = 'ly-consent-dialog';
    dialog.setAttribute('aria-labelledby', 'ly-consent-title');
    dialog.innerHTML = '<header class="ly-consent-dialog__header"><span class="ly-consent-eyebrow">LAYERO · A TE BEÁLLÍTÁSAID</span>' +
      '<button type="button" class="ly-consent-close" aria-label="Bezárás mentés nélkül" data-consent-close>×</button>' +
      '<h2 id="ly-consent-title" tabindex="-1" data-consent-heading>Csak ami neked belefér.</h2><p>Válaszd ki, mi segítheti a böngészésedet. A döntésedet bármikor módosíthatod.</p></header>' +
      '<div class="ly-consent-dialog__body">' +
      category('necessary', 'Szükséges', 'A webshop alapműködéséhez és a kért funkciókhoz.', 'A kosár, a kiválasztott kupon, a kedvencek és az összehasonlítás megőrzése, valamint a sütibeállításod mentése. Ezeket a választásokat a böngésződ tárolja. A sütibeállítás 180 napig érvényes; a többi adat a törléséig marad meg.') +
      category('preferences', 'Kényelmi funkciók', 'Hogy könnyebben visszatalálj a kiszemelt darabokhoz.', 'Megjegyezzük az utoljára megtekintett legfeljebb 8 terméket ezen az eszközön, a böngésző tárhelyén. Kikapcsoláskor ezt a listát töröljük; a kosarad és a kedvenceid megmaradnak.') +
      category('analytics', 'Statisztika', 'Segít megérteni, mely termékek érdekelnek.', 'Engedélyeddel a termékmegtekintéseket, a kosárhoz adásokat és a pénztár megnyitását küldjük a Layero beállított statisztikai szolgáltatásának: termékazonosító, időpont, nyelv, darabszám és érték. A korábbi műveleteket utólag nem küldjük el. Az adatkezelés részletei az adatvédelmi tájékoztatóban találhatók.') +
      category('marketing', 'Marketing', marketingEnabled ? 'Személyre szabott hirdetések méréséhez.' : 'Jelenleg nincs bekapcsolt marketingkövetés.', marketingEnabled ? 'Külön engedélyt adsz a bekötött hirdetési szolgáltatásoknak. A szolgáltatók és a tárolási idők az adatvédelmi tájékoztatóban találhatók.' : 'Ehhez a kategóriához most nem kérünk engedélyt, és az összes elfogadása sem kapcsolja be. Ha ez változik, új döntést kérünk.') +
      '<p class="ly-consent-date" data-consent-date></p><a class="ly-consent-privacy" href="adatvedelem.html#sutik">Adatvédelmi tájékoztató ↗</a></div>' +
      '<footer class="ly-consent-dialog__footer"><button type="button" class="ly-consent-btn ly-consent-btn--save" data-consent-custom>Beállítások mentése</button><div><button type="button" class="ly-consent-btn" data-consent-save="all">Összes elfogadása</button><button type="button" class="ly-consent-btn" data-consent-save="min">Csak a szükségesek</button></div></footer>';
    document.body.appendChild(dialog);
    dialog.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var controls = Array.prototype.filter.call(dialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), summary'), function (el) {
        return el.getClientRects().length > 0;
      });
      var first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement.hasAttribute('data-consent-heading'))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
    notice = document.createElement('div'); notice.className = 'ly-consent-notice'; notice.setAttribute('role', 'status');
    document.body.appendChild(notice);
    dialog.addEventListener('close', function () {
      document.documentElement.classList.remove('ly-consent-open');
      var target = returnFocus && returnFocus.isConnected && returnFocus.getClientRects().length ? returnFocus : launcher;
      target.focus({ preventScroll: true });
    });
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-cookie-open], [data-consent-save], [data-consent-close], [data-consent-custom]');
      if (!button) return;
      event.preventDefault();
      if (button.hasAttribute('data-cookie-open')) openSettings();
      else if (button.hasAttribute('data-consent-close')) closeSettings();
      else if (button.hasAttribute('data-consent-custom')) saveChoice({ preferences: dialog.querySelector('[name="preferences"]').checked,
        analytics: dialog.querySelector('[name="analytics"]').checked, marketing: dialog.querySelector('[name="marketing"]').checked });
      else saveChoice(button.getAttribute('data-consent-save'));
    });
    banner.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { hideBanner(); launcher.focus({ preventScroll: true }); }
    });
    if (!valid(saved)) showTimer = setTimeout(showBanner, 700);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
