/* ═══════════════════════════════════════════════════════════════════
   LAYERO SHOP — közös logika
   Fejléc/lábléc injektálás, kosár (localStorage), oldal-renderelők.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CART_KEY = 'layero_shop_cart_v1';
  var WISH_KEY = 'sh_wishlist';
  var V = window.LayeroVariants;
  var IS_WOO = !!(window.LayeroShopStatic && window.LayeroShopStatic.commerce === 'woocommerce');
  document.addEventListener('submit', function (event) {
    if (event.target.matches('form[data-cq-form], form[data-b2b-quote]')) return;
    if (IS_WOO || !event.target.matches('#sh-contact-form, #sh-newsletter-form, form[data-lp-quote]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    toast('Ez helyi előnézet: az adatokat nem küldtük el. A kitöltött mezők megmaradtak.');
  }, true);
  var HEART_SVG = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.6-9.3-9.2A5.2 5.2 0 0 1 12 6.1a5.2 5.2 0 0 1 9.3 4.7C19 15.4 12 20 12 20Z"/></svg>';
  var PENCIL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m16 3 5 5-12 12H4v-5L16 3Z"/><path d="m14 5 5 5"/></svg>';
  function personalizeLink(p, className, iconOnly) {
    return '<a class="' + className + '" href="termek.html?id=' + encodeURIComponent(p.id) + '#sh-persz" aria-label="Személyre szabás: ' + esc(p.nev) + '">' + PENCIL_ICON + (iconOnly ? '' : 'Személyre szabás') + '</a>';
  }
  /* ── segédek ─────────────────────────────────────────────────── */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var STATIC_CFG = window.LayeroShopStatic || {};
  function normalizeAssetUrl(value) {
    if (!value || /^(https?:|data:|\/wp-content\/|\/uploads\/)/.test(value)) return value;
    if (value.indexOf('/wp-content/') === 0) return value;
    if (value.indexOf('assets/') === 0 && STATIC_CFG.assetBase) return STATIC_CFG.assetBase + value.slice(7);
    return value;
  }
  function normalizePageUrl(value) {
    if (!value || value.charAt(0) === '#' || /^(mailto:|tel:|https?:|data:)/.test(value)) return value;
    var clean = value.replace(/^\.?\//, '');
    var parsed = new URL(clean, 'https://layero.invalid/');
    var name = parsed.pathname.slice(1);
    var mapped = STATIC_CFG.urls && STATIC_CFG.urls[name];
    if (name === 'termek.html' && STATIC_CFG.productUrls) {
      var productUrl = STATIC_CFG.productUrls[parsed.searchParams.get('id')];
      if (productUrl) { mapped = productUrl; parsed.searchParams.delete('id'); }
    }
    if (!mapped) return value;
    var target = new URL(mapped, location.href);
    parsed.searchParams.forEach(function (v, k) { target.searchParams.set(k, v); });
    if (parsed.hash) target.hash = parsed.hash;
    return target.href;
  }
  function staticNodes(selector, root) {
    var nodes = $all(selector, root);
    if (root.matches && root.matches(selector)) nodes.unshift(root);
    return nodes;
  }
  var purchaseSelector = '[data-add], [data-add-quote], [data-dr-add], [data-qv-add], #sh-add-btn, #sh-bundle-add, .sh-stickybar button';
  function wooProductUrl(id) {
    return (STATIC_CFG.productUrls && STATIC_CFG.productUrls[id]) ||
      (STATIC_CFG.urls && STATIC_CFG.urls['kategoria.html']);
  }
  // A mirrored page is a catalogue in WordPress. Buying always continues on
  // the real Woo product page, where prices, variations and fields are checked.
  if (STATIC_CFG.commerce === 'woocommerce') {
    document.addEventListener('click', function (event) {
      var target = event.target.closest && event.target.closest(purchaseSelector);
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      var id = target.getAttribute('data-add') || target.getAttribute('data-add-quote') ||
        target.getAttribute('data-dr-add') || target.getAttribute('data-qv-add') || new URLSearchParams(location.search).get('id');
      var url = wooProductUrl(id);
      if (url) location.assign(url);
    }, true);
  }
  function fixStaticUrls(root) {
    staticNodes('img[src]', root).forEach(function (img) {
      var next = normalizeAssetUrl(img.getAttribute('src'));
      if (next && next !== img.getAttribute('src')) img.setAttribute('src', next);
    });
    staticNodes('img[srcset]', root).forEach(function (img) {
      var raw = img.getAttribute('srcset');
      var next = raw.split(',').map(function (part) {
        var bits = part.trim().split(/\s+/);
        bits[0] = normalizeAssetUrl(bits[0]);
        return bits.join(' ');
      }).join(', ');
      if (next !== raw) img.setAttribute('srcset', next);
    });
    staticNodes('a[href]', root).forEach(function (link) {
      var next = normalizePageUrl(link.getAttribute('href'));
      if (next && next !== link.getAttribute('href')) link.setAttribute('href', next);
    });
    staticNodes('form[action]', root).forEach(function (form) {
      var next = normalizePageUrl(form.getAttribute('action'));
      if (next && next !== form.getAttribute('action')) form.setAttribute('action', next);
    });
    staticNodes('image[href]', root).forEach(function (img) {
      var next = normalizeAssetUrl(img.getAttribute('href'));
      if (next) img.setAttribute('href', next);
    });
    if (STATIC_CFG.commerce === 'woocommerce') {
      var wishes = staticNodes('[data-wish]', root);
      wishes.forEach(function (button) {
        var id = button.getAttribute('data-wish');
        var product = (window.SHOP_PRODUCTS || []).find(function (item) { return item.id === id; });
        if (!product || !product.wc_id) return;
        button.removeAttribute('data-wish');
        button.setAttribute('data-layero-wish-toggle', '');
        button.setAttribute('data-layero-product-id', product.wc_id);
      });
      if (wishes.length) document.dispatchEvent(new CustomEvent('layero:wishlist-rendered'));
      staticNodes(purchaseSelector, root).forEach(function (button) {
        if (button.hasAttribute('data-qv')) return;
        if (button.textContent !== 'Termék megnyitása') button.textContent = 'Termék megnyitása';
        button.setAttribute('aria-label', 'Termék megnyitása');
      });
    }
  }
  function prodById(id) {
    var found = V.lookup(SHOP_PRODUCTS, id);
    return found ? found.product : null;
  }
  var ANALYTICS_ENDPOINT = window.LAYERO_ANALYTICS_ENDPOINT || (/^(localhost|127\.0\.0\.1)$/i.test(location.hostname) ? 'http://127.0.0.1:3000/api/analytics/events' : '');
  function analyticsChannel() {
    return /^(localhost|127\.0\.0\.1)$/i.test(location.hostname) ? 'preview' : 'webshop';
  }
  function analyticsKey(type, productId) {
    var random = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now();
    return [type, productId, random].join(':');
  }
  function trackProductEvent(type, product, options) {
    if (!window.LayeroConsent || !window.LayeroConsent.allows('analytics')) return;
    if (!product || !product.id || !window.fetch || !ANALYTICS_ENDPOINT) return;
    options = options || {};
    var payload = {
      event_key: options.event_key || analyticsKey(type, product.id),
      event_type: type,
      product_slug: product.id,
      channel: analyticsChannel(),
      locale: document.documentElement.lang === 'ro' ? 'ro' : document.documentElement.lang === 'en' ? 'en' : 'hu',
      quantity: Math.max(1, Number(options.quantity || 1)),
      value: Math.max(0, Number(options.value || 0)),
      recommendation_source: options.recommendation_source || '',
      bundle_id: options.bundle_id || null,
      happened_at: new Date().toISOString()
    };
    fetch(ANALYTICS_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload), keepalive: true })
      .catch(function () { /* az analitika soha nem akadályozhatja a vásárlást */ });
  }
  function catById(id) {
    for (var i = 0; i < SHOP_CATS.length; i++) if (SHOP_CATS[i].id === id) return SHOP_CATS[i];
    return null;
  }
  function visibleCats() {
    return SHOP_CATS.filter(function (c) {
      return c.ajanlat === true || (IS_WOO && c.count > 0) || SHOP_PRODUCTS.some(function (p) { return p.cat === c.id; });
    });
  }
  /* minden ár-kiírás EZEN megy át — pénznem/formátum váltás egy helyen */
  function fmtPrice(n) { return n + ' RON'; }
  function fmtAr(ar) { return ar > 0 ? fmtPrice(ar) : 'Ajánlat alapján'; }
  // Search product identity, never the repeated marketing copy in descriptions.
  function searchWords(text) {
    return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  }
  function productSearchScore(p, words) {
    if (!words.length) return 0;
    var name = searchWords(p.nev);
    var details = p.search_details;
    if (typeof details !== 'string') {
      details = [p.sku || ''].concat((p.categories || [p.cat]).map(function (id) {
        var cat = catById(id); return cat ? cat.nev : '';
      }), (p.opciok || []).map(function (o) { return (o.ertekek || []).join(' '); })).join(' ');
    }
    var other = searchWords(details), score = 0;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (name.indexOf(word) !== -1) score += 3;
      else if (name.some(function (value) { return value.indexOf(word) === 0; })) score += 2;
      else if (other.some(function (value) { return value.indexOf(word) === 0; })) score += 1;
      else return 0;
    }
    return score + (name.join(' ') === words.join(' ') ? 10 : 0);
  }
  function searchProducts(products, query) {
    var words = searchWords(query);
    return products.map(function (p, index) { return { product: p, score: productSearchScore(p, words), index: index }; })
      .filter(function (hit) { return hit.score > 0; })
      .sort(function (a, b) { return b.score - a.score || a.index - b.index; })
      .map(function (hit) { return hit.product; });
  }

  /* fizetési-mód chipsor a döntési pontokra (vételdoboz, kosár, pénztár) —
     vizuális bizalomjel; az utánvét-chip csak ott, ahol tényleg elérhető */
  function payChipsHtml(includeCod) {
    var mc = '<svg viewBox="0 0 24 16" aria-hidden="true"><circle cx="9.5" cy="8" r="6" fill="#EB001B"/><circle cx="15" cy="8" r="6" fill="#F79E1B" fill-opacity="0.88"/></svg>';
    return '<div class="sh-paychips" aria-label="Elfogadott fizetési módok">' +
      '<i class="pc pc--visa">VISA</i>' +
      '<i class="pc pc--mc">' + mc + 'Mastercard</i>' +
      '<i class="pc">Apple&nbsp;Pay</i>' +
      '<i class="pc">G&nbsp;Pay</i>' +
      (includeCod ? '<i class="pc">Utánvét</i>' : '') +
      '<i class="pc pc--ssl">' + ICO.shield + 'SSL</i>' +
    '</div>';
  }
  // WooCommerce supplies real rating aggregates; the preview uses its actual reviews.
  function productReviews(p) {
    return (Array.isArray(p.reviews) ? p.reviews : []).filter(function (review) {
      return review && Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5;
    });
  }
  function ratingOf(p) {
    if (IS_WOO && p.rating_summary) {
      var average = Number(p.rating_summary.average), count = Number(p.rating_summary.count);
      if (Number.isFinite(average) && average >= 1 && average <= 5 && Number.isInteger(count) && count > 0) return { r: average.toFixed(1), n: count };
    }
    var reviews = productReviews(p);
    return { r: reviews.length ? (reviews.reduce(function (sum, review) {
      return sum + review.rating;
    }, 0) / reviews.length).toFixed(1) : '0.0', n: reviews.length };
  }
  function rateHtml(p, link) {
    var rt = ratingOf(p);
    if (!rt.n) return '';
    var full = Math.round(parseFloat(rt.r));
    var stars = '';
    for (var i = 0; i < 5; i++) stars += i < full ? '★' : '☆';
    return '<span class="sh-rate"><span class="stars">' + stars + '</span><b>' + rt.r + '</b>' +
      (link ? '<a href="#sh-velemenyek">(' + rt.n + ' értékelés)</a>' : '<span>(' + rt.n + ')</span>') +
    '</span>';
  }
  /* ár-blokk: akciós (áthúzott régi + piros most) vagy sima */
  function priceHtml(p) {
    if (V.isVariable(p)) {
      var range = V.range(p);
      return '<span class="now">' + (range.min === range.max ? fmtAr(range.min) : fmtPrice(range.min) + ' – ' + fmtPrice(range.max)) + '</span>';
    }
    if (p.ar <= 0) return '<span class="now">' + fmtAr(p.ar) + '</span>';
    if (p.regi_ar && p.regi_ar > p.ar) {
      return '<span class="now on-sale">' + fmtPrice(p.ar) + '</span><span class="was">' + fmtPrice(p.regi_ar) + '</span>';
    }
    return '<span class="now">' + fmtPrice(p.ar) + '</span>';
  }
  function discountPct(p) {
    if (p.regi_ar && p.regi_ar > p.ar && p.ar > 0) return Math.round((1 - p.ar / p.regi_ar) * 100);
    return 0;
  }
  /* Termékspecifikus választók. A termékkezelőből érkező `opciok` tömb az
     igazság forrása; az opciok: [] azt jelenti, hogy nincs választó. A régi,
     kézzel felvett demótermékek a mező hiányában megtartják a régi alapokat. */
  function productOptions(p) {
    if (Array.isArray(p.opciok)) {
      return p.opciok.map(function (option) {
        return {
          id: String(option.id || '').replace(/[^a-z0-9_-]/gi, '-'),
          nev: String(option.nev || 'Opció'),
          ertekek: Array.isArray(option.ertekek) ? option.ertekek.filter(Boolean).map(String) : [],
          variacio: option.variacio === true,
          defaultIndex: option.variacio === true ? -1 : 0
        };
      }).filter(function (option) { return option.ertekek.length; });
    }
    return [
      { id: 'meret', nev: 'Méret', ertekek: SHOP_VARIANSOK.meret, defaultIndex: 1 },
      { id: 'szin', nev: 'Szín', ertekek: SHOP_VARIANSOK.szin, defaultIndex: 0 }
    ];
  }
  function optionRowsHtml(p, dataAttr, withSizeGuide) {
    return productOptions(p).map(function (option) {
      var isSize = option.id === 'meret' || option.nev.toLowerCase() === 'méret';
      var title = esc(option.nev);
      if (withSizeGuide && isSize) title = '<span class="sh-opt__hd">' + title + ' <button class="sh-sizeguide" type="button" data-sizeguide>Mérettáblázat</button></span>';
      else title = '<span>' + title + '</span>';
      return '<div class="sh-opt' + (option.variacio ? ' sh-opt--variation' : '') + '">' + title + '<div class="sh-opt__row" role="group" aria-label="' + esc(option.nev) + '" ' + dataAttr + ' data-option-id="' + esc(option.id) + '">' +
        option.ertekek.map(function (value, index) {
          var on = index === Math.min(option.defaultIndex, option.ertekek.length - 1);
          var preview = option.variacio && (p.variaciok || []).find(function (v) { return (v.attributumok || {})[option.id] === value; });
          return '<button type="button" aria-pressed="' + on + '" data-option-value="' + esc(value) + '" class="' + (on ? 'is-on' : '') + '">' +
            (preview && preview.kepek && preview.kepek[0] ? '<img src="' + esc(preview.kepek[0]) + '" alt="" loading="lazy" decoding="async">' : '') + '<span>' + esc(value) + '</span></button>';
        }).join('') + '</div></div>';
    }).join('');
  }
  function selectedOptionText(root, selector) {
    return $all(selector, root).map(function (row) {
      var selected = $('.is-on', row);
      return selected ? selected.getAttribute('data-option-value') || selected.textContent : '';
    }).filter(Boolean).join(' · ');
  }
  function defaultVariant(p) {
    return productOptions(p).map(function (option) {
      return option.ertekek[Math.min(option.defaultIndex, option.ertekek.length - 1)] || '';
    }).filter(Boolean).join(' · ');
  }
  function variationSummary(p) {
    if (!V.isVariable(p)) return '';
    var colors = V.options(p).find(function (o) { return /sz[ií]n|colou?r/i.test(o.id + ' ' + o.nev); });
    return '<span class="sh-variant-summary">' + esc(colors ? colors.ertekek.length + ' színben' : p.variaciok.length + ' változatban') + '</span>';
  }
  function bindVariations(root, p, selector, initial, onChange) {
    var selected = initial ? Object.assign({}, initial.attributumok) : {};
    var state = { current: initial || null };
    var rows = $all(selector, root).filter(function (row) { return row.closest('.sh-opt--variation'); });
    function update() {
      state.current = V.resolve(p, selected);
      rows.forEach(function (row) {
        var id = row.getAttribute('data-option-id');
        $all('button', row).forEach(function (b) {
          var value = b.getAttribute('data-option-value');
          var on = selected[id] === value;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', String(on));
          b.disabled = !V.possible(p, selected, id, value) && !on;
          b.title = b.disabled ? 'Ez a kombináció jelenleg nem választható' : '';
        });
      });
      var status = $('[data-variation-status]', root);
      if (status) status.textContent = state.current ? V.available(state.current) ? V.label(p, state.current) : 'Ez a változat jelenleg nem választható.' : 'Válaszd ki a neked tetsző változatot.';
      onChange(state.current);
    }
    rows.forEach(function (row) {
      row.addEventListener('click', function (event) {
        var b = event.target.closest('button');
        if (!b || b.disabled || !row.contains(b)) return;
        var id = row.getAttribute('data-option-id'), value = b.getAttribute('data-option-value');
        if (selected[id] === value) delete selected[id]; else selected[id] = value;
        update();
      });
    });
    var reset = $('[data-variation-reset]', root);
    if (reset) reset.addEventListener('click', function () { selected = {}; update(); });
    update();
    return state;
  }
  function changeCartQuantity(items, item, delta) {
    var next = Math.max(1, Math.min(99, item.qty + delta));
    var p = prodById(item.id), v = V.find(p, item.variationId);
    var others = items.filter(function (r) { return r !== item && r.id === item.id && String(r.variationId) === String(item.variationId); }).reduce(function (n, r) { return n + r.qty; }, 0);
    if (delta > 0 && V.isVariable(p) && (!V.available(v) || next + others > V.limit(v))) {
      toast('Ebből a változatból több darab jelenleg nem választható.'); return;
    }
    item.qty = next;
  }
  /* (a generált „X-en nézik most" típusú ál-sürgetés eltávolítva —
     kitalált számok bizalmat rombolnak és megtévesztő gyakorlatnak minősülnek) */
  var CART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.3 10.5a1.5 1.5 0 0 1-1.5 1.7H6.2a1.5 1.5 0 0 1-1.5-1.7L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>';
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  var scrollLockDepth = 0;
  var scrollLockPrev = '';
  function lockScroll() {
    if (scrollLockDepth === 0) {
      scrollLockPrev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    scrollLockDepth++;
  }
  function unlockScroll() {
    scrollLockDepth = Math.max(0, scrollLockDepth - 1);
    if (scrollLockDepth === 0) document.body.style.overflow = scrollLockPrev || '';
  }

  /* ── kereskedelmi konstansok ─────────────────────────────────── */
  var MIN_ORDER = 50;
  var FREE_SHIP = 200;
  var SHIP_FEE = 25;          /* futár házhoz */
  var SHIP_FEE_LOCKER = 19;   /* csomagpont / easybox */
  var COD_FEE = 5;            /* utánvét felár */
  var GIFTWRAP_FEE = 15;
  var COUPONS = {
    LAYERO10: { tipus: 'pct', ertek: 10, cimke: '10% kedvezmény' },
    NYAR20:   { tipus: 'pct', ertek: 20, cimke: '20% nyári kedvezmény' },
    INGYEN:   { tipus: 'ship', ertek: 0, cimke: 'ingyenes szállítás' }
  };

  /* ── kosár ───────────────────────────────────────────────────── */
  function cartGet() {
    try { return V.normalizeCart(JSON.parse(localStorage.getItem(CART_KEY)) || [], SHOP_PRODUCTS); }
    catch (e) { return []; }
  }
  function cartSet(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(V.normalizeCart(items, SHOP_PRODUCTS)));
    updateBadge();
  }
  function cartAdd(id, qty, variant, analyticsMeta, variationId, extra) {
    var product = prodById(id);
    if (!product || IS_WOO) return false;
    var selected = V.find(product, variationId);
    if (V.isVariable(product) && !selected) { openQuickView(product.id); return false; }
    if (V.isVariable(product) && !V.available(selected)) { toast('Ez a változat jelenleg nem választható.'); return false; }
    var items = cartGet();
    var key = selected ? V.key(product.id, selected.id, extra) : id + '|' + (variant || '');
    var already = selected ? items.filter(function (it) { return it.id === product.id && String(it.variationId) === String(selected.id); }).reduce(function (sum, it) { return sum + it.qty; }, 0) : 0;
    if (selected && already + qty > V.limit(selected)) { toast('Ehhez a változathoz legfeljebb ' + V.limit(selected) + ' darab választható összesen.'); return false; }
    var found = null;
    items.forEach(function (it) { if (it.key === key) found = it; });
    if (found) found.qty += qty;
    else items.push({ key: key, id: product.id, qty: qty, variant: variant || '', variationId: selected ? String(selected.id) : undefined, extra: extra || '' });
    cartSet(items);
    if (product) trackProductEvent('add_to_cart', product, Object.assign({ quantity: qty, value: Number(selected ? selected.ar : product.ar || 0) * qty }, analyticsMeta || {}));
    return true;
  }

  /* kupon + ajándékcsomagolás állapot */
  function couponGet() { return (localStorage.getItem('sh_coupon') || '').toUpperCase(); }
  function couponSet(c) { if (c) localStorage.setItem('sh_coupon', c.toUpperCase()); else localStorage.removeItem('sh_coupon'); }
  function giftGet() { return localStorage.getItem('sh_giftwrap') === '1'; }
  function giftSet(on) { localStorage.setItem('sh_giftwrap', on ? '1' : '0'); }

  /* központi összegszámítás — drawer, kosár és pénztár közösen ezt hívja.
     opts.ship: 'futar' | 'csomagpont' | 'szemelyes' (alapértelmezés: futár)
     opts.pay:  'kartya' | 'utanvet' | 'atutalas' (utánvétnél +COD_FEE) */
  function cartTotals(opts) {
    opts = opts || {};
    var items = cartGet().map(function (it) {
      var p = prodById(it.id);
      if (!p) return null;
      var v = V.find(p, it.variationId);
      var sameQuantity = cartGet().filter(function (row) { return row.id === it.id && String(row.variationId) === String(it.variationId); }).reduce(function (n, row) { return n + row.qty; }, 0);
      var invalid = V.isVariable(p) && (!V.available(v) || sameQuantity > V.limit(v));
      var shown = V.isVariable(p) ? V.view(p, v) : p;
      return { it: it, p: shown, sor: invalid ? 0 : Math.round(shown.ar * it.qty * 100) / 100, invalid: invalid };
    }).filter(Boolean);
    var subtotal = items.reduce(function (s, r) { return s + r.sor; }, 0);
    var count = items.reduce(function (s, r) { return s + r.it.qty; }, 0);
    var code = couponGet();
    var coupon = COUPONS[code] ? { code: code, def: COUPONS[code] } : null;
    var discount = 0, freeByCoupon = false;
    if (coupon) {
      if (coupon.def.tipus === 'pct') discount = Math.round(subtotal * coupon.def.ertek / 100);
      if (coupon.def.tipus === 'ship') freeByCoupon = true;
    }
    var gift = giftGet() ? GIFTWRAP_FEE : 0;
    // ingyenes szállítás a részösszeg alapján (a progress bar-ral egyezően);
    // személyes átvétel mindig ingyenes, csomagpontra is jár a küszöb feletti ingyenesség
    var shipping = 0;
    if (items.length && opts.ship !== 'szemelyes' && subtotal < FREE_SHIP && !freeByCoupon) {
      shipping = opts.ship === 'csomagpont' ? SHIP_FEE_LOCKER : SHIP_FEE;
    }
    var codFee = (items.length && opts.pay === 'utanvet') ? COD_FEE : 0;
    var total = subtotal - discount + shipping + gift + codFee;
    return { items: items, subtotal: subtotal, count: count, coupon: coupon,
             discount: discount, gift: gift, shipping: shipping, codFee: codFee, total: total,
             freeByCoupon: freeByCoupon, invalid: items.some(function (r) { return r.invalid; }), belowMin: items.some(function (r) { return r.invalid; }) || (subtotal > 0 && subtotal < MIN_ORDER) };
  }
  function cartCount() {
    return cartGet().reduce(function (n, it) { return n + it.qty; }, 0);
  }
  function updateBadge() {
    if (IS_WOO) return; // The live badge is supplied by WooCommerce cart fragments.
    var badge = $('.sh-cart-badge');
    if (!badge) return;
    var n = cartCount();
    badge.textContent = n;
    badge.classList.toggle('is-on', n > 0);
  }

  /* ── kívánságlista ───────────────────────────────────────────── */
  function wishGet() {
    try { return (JSON.parse(localStorage.getItem(WISH_KEY)) || []).map(function (id) { var p = prodById(id); return p ? p.id : id; }).filter(function (id, i, all) { return all.indexOf(id) === i; }); }
    catch (e) { return []; }
  }
  function wishHas(id) { return wishGet().indexOf(id) !== -1; }
  function wishToggle(id) {
    var w = wishGet();
    var i = w.indexOf(id);
    if (i === -1) w.push(id); else w.splice(i, 1);
    localStorage.setItem(WISH_KEY, JSON.stringify(w));
    updateWishBadge();
    return i === -1;
  }
  function updateWishBadge() {
    var badge = $('.sh-wish-badge');
    if (!badge) return;
    var n = wishGet().length;
    badge.textContent = n;
    badge.classList.toggle('is-on', n > 0);
  }

  /* ── toast ───────────────────────────────────────────────────── */
  var toastT;
  function toast(msg) {
    var el = $('.sh-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'sh-toast';
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
      document.body.appendChild(el);
    }
    $('span', el).textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
  }

  /* ── konfetti-zápor (sikeres rendelés ünneplése) ─────────────────── */
  function launchConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var layer = document.createElement('div');
    layer.className = 'sh-confetti-layer';
    layer.setAttribute('aria-hidden', 'true');
    var colors = ['#00c2e0', '#ff9f2d', '#f0c27a', '#0a7c92', '#ffffff', '#3d9a50'];
    for (var i = 0; i < 110; i++) {
      var c = document.createElement('i');
      c.className = 'sh-confetti';
      c.style.setProperty('--x', (Math.random() * 100).toFixed(1) + 'vw');
      c.style.setProperty('--d', (2.4 + Math.random() * 2.6).toFixed(2) + 's');
      c.style.setProperty('--r', Math.round(Math.random() * 720 - 360) + 'deg');
      c.style.setProperty('--s', (0.55 + Math.random() * 0.9).toFixed(2));
      c.style.setProperty('--w', Math.round(Math.random() * 120 - 60) + 'px');
      c.style.background = colors[i % colors.length];
      c.style.animationDelay = (Math.random() * 0.8).toFixed(2) + 's';
      layer.appendChild(c);
    }
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 6500);
  }

  var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function starRow(k) {
    var s = '';
    for (var i = 0; i < 5; i++) s += i < k ? '★' : '☆';
    return s;
  }
  function reviewsHtml(p) {
    var reviews = productReviews(p);
    var rating = ratingOf(p);
    var cards = reviews.map(function (review) {
      var author = String(review.author || 'Vásárló');
      return '<article class="sh-rev"><header class="sh-rev__top"><span class="sh-rev__ava" aria-hidden="true">' + esc(author.trim().charAt(0).toUpperCase()) + '</span><div class="sh-rev__who"><b>' +
        esc(author) + '</b><span>Vásárlói vélemény</span></div></header>' +
        '<div class="sh-rev__stars" aria-label="' + review.rating + ' csillag">' + starRow(review.rating) + '</div>' +
        '<p>' + esc(review.text || '') + '</p></article>';
    }).join('');
    return '<section class="sh-band sh-band--tight sh-product-reviews' + (reviews.length ? '' : ' is-empty') + '" id="sh-velemenyek" data-product-panel><div class="shop-wrap">' +
      '<div class="sh-product-sectionhead"><span class="sh-label sh-kicker">Tapasztalatok</span><h2 class="sh-h2">Vásárlói vélemények</h2><p>Akik már kézbe vették ezt a darabot.</p></div>' +
      '<div class="sh-review-layout"><aside class="sh-review-summary" aria-label="Értékelések összesítése"><span class="sh-review-summary__label">Vásárlói értékelés</span>' +
      (rating.n ? '<div class="sh-review-score"><strong>' + esc(rating.r.replace('.', ',')) + '</strong><span>/ 5</span></div><div class="sh-review-summary__stars" aria-label="' + esc(rating.r) + ' az 5 csillagból">' + starRow(Math.round(Number(rating.r))) + '</div><p>' + rating.n + ' értékelés alapján</p>' : '<div class="sh-review-summary__stars is-empty" aria-hidden="true">☆☆☆☆☆</div><h3>Még nincs pontszám</h3><p>Az első értékelés még várat magára.</p>') +
      '<div class="sh-review-summary__help"><b>Kérdésed van?</b><p>Szívesen segítünk a választásban.</p><a href="kapcsolat.html">Írj nekünk <span aria-hidden="true">→</span></a></div></aside><div class="sh-review-content">' +
      (cards ? '<div class="sh-revlist">' + cards + '</div>' : '<div class="sh-review-empty"><span class="sh-review-empty__icon" aria-hidden="true">' + ICO.chat + '</span><span class="sh-label sh-kicker">A te tapasztalatod is számít</span><h3>Még nincs vásárlói vélemény</h3><p>Ehhez a termékhez még nem érkezett értékelés. Ha kérdésed van az anyagról, a méretről vagy a személyre szabásról, szívesen segítünk.</p><a class="sh-btn sh-btn--ghost" href="kapcsolat.html">Kérdezek a termékről <span aria-hidden="true">→</span></a></div>') +
      '</div></div>' +
      '</div></section>';
  }

  // Progressive tabs: without JavaScript every section and anchor stays available.
  function initProductTabs() {
    $all('[data-product-tabs]').forEach(function (root) {
      if (root.dataset.tabsReady) return;
      var nav = $('.sh-product-nav', root);
      if (!nav) return;
      var list = $('div', nav);
      var tabs = $all('a[href^="#"]', nav);
      var panels = tabs.map(function (tab) { return document.getElementById(tab.hash.slice(1)); });
      if (!tabs.length || panels.some(function (panel) { return !panel || !root.contains(panel); })) return;
      root.dataset.tabsReady = 'true';
      list.setAttribute('role', 'tablist');
      list.setAttribute('aria-label', 'Termékinformációk');
      tabs.forEach(function (tab, index) {
        tab.id = panels[index].id + '-tab';
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', panels[index].id);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
      });
      function targetFromHash(hash) {
        var id;
        try { id = decodeURIComponent(hash.slice(1)); } catch (error) { return null; }
        var target = document.getElementById(id);
        return target && root.contains(target) ? target : null;
      }
      function select(index, focus) {
        tabs.forEach(function (tab, i) {
          var active = i === index;
          tab.setAttribute('aria-selected', String(active));
          tab.tabIndex = active ? 0 : -1;
          panels[i].hidden = !active;
        });
        if (focus) {
          tabs[index].focus({ preventScroll: true });
          // Scroll only the mobile tab strip; the page stays at the same position.
          var tab = tabs[index];
          if (tab.offsetLeft < list.scrollLeft || tab.offsetLeft + tab.offsetWidth > list.scrollLeft + list.clientWidth) list.scrollLeft = Math.max(0, tab.offsetLeft - 16);
        }
      }
      function reveal(target, scroll) {
        var index = panels.findIndex(function (panel) { return panel === target || panel.contains(target); });
        if (index === -1) return false;
        select(index, false);
        var details = target.closest('details');
        if (details) details.open = true;
        if (scroll) (target === panels[index] ? nav : target).scrollIntoView({ block: 'start', behavior: 'instant' });
        return true;
      }
      tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function (event) {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          select(index, true);
          history.replaceState(null, '', tab.hash);
        });
        tab.addEventListener('keydown', function (event) {
          var next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
          if (next === -1) return;
          event.preventDefault(); select(next, true);
          history.replaceState(null, '', tabs[next].hash);
        });
      });
      // Top rating links, review pagination, form errors and comment permalinks.
      document.addEventListener('click', function (event) {
        var link = event.target.closest('a[href]');
        if (!link || nav.contains(link) || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        var url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        var target = targetFromHash(url.hash);
        if (target && reveal(target, true)) { event.preventDefault(); history.replaceState(null, '', url.hash); }
      });
      function hashChanged() { var target = targetFromHash(location.hash); if (target) reveal(target, true); }
      select(0, false);
      if (location.hash) hashChanged();
      window.addEventListener('hashchange', hashChanged);
    });
  }

  /* ── mérettáblázat ─────────────────────────────────────────────── */
  function sizeGuideHtml(p) {
    var sizes = (p.specs || []).filter(function (row) {
      return /méret|hossz|szélesség|magasság|átmérő/i.test(String(row[0]));
    });
    if (!sizes.length) return '<p>Ehhez a termékhez még nincs pontos méret megadva. <a href="kapcsolat.html">Kérj méretadatot rendelés előtt.</a></p>';
    return '<table class="sh-sizetable"><tbody>' + sizes.map(function (row) {
      return '<tr><th>' + esc(row[0]) + '</th><td>' + esc(row[1]) + '</td></tr>';
    }).join('') + '</tbody></table>';
  }

  /* ── általános info-modal (mérettáblázat stb.) ─────────────────── */
  var infoModalEl = null;
  var infoModalTrigger = null;
  function openInfoModal(title, bodyHtml) {
    infoModalTrigger = document.activeElement;
    if (!infoModalEl) {
      infoModalEl = document.createElement('div');
      infoModalEl.className = 'sh-modal sh-modal--wide';
      infoModalEl.setAttribute('role', 'dialog');
      infoModalEl.setAttribute('aria-modal', 'true');
      document.body.appendChild(infoModalEl);
      infoModalEl.addEventListener('click', function (e) {
        if (e.target === infoModalEl || e.target.closest('[data-info-close]')) closeInfoModal();
      });
      document.addEventListener('keydown', function (e) {
        if (!infoModalEl.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeInfoModal();
        if (e.key === 'Tab') {
          var controls = $all('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]', infoModalEl);
          var first = controls[0], last = controls[controls.length - 1];
          if (!infoModalEl.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
          else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
    infoModalEl.setAttribute('aria-label', title);
    infoModalEl.innerHTML =
      '<div class="sh-modal__box sh-modal__box--wide">' +
        '<button class="sh-modal__close" type="button" data-info-close aria-label="Bezárás">✕</button>' +
        '<h2>' + title + '</h2>' +
        '<div class="sh-modal__body">' + bodyHtml + '</div>' +
      '</div>';
    requestAnimationFrame(function () {
      infoModalEl.classList.add('is-open');
      requestAnimationFrame(function () {
        if (infoModalEl.classList.contains('is-open')) $('[data-info-close]', infoModalEl).focus({ preventScroll: true });
      });
    });
    lockScroll();
  }
  function closeInfoModal() {
    if (!infoModalEl || !infoModalEl.classList.contains('is-open')) return;
    infoModalEl.classList.remove('is-open');
    unlockScroll();
    if (infoModalTrigger && infoModalTrigger.isConnected) infoModalTrigger.focus();
  }

  /* ── összehasonlítás ───────────────────────────────────────────── */
  var CMP_KEY = 'sh_compare';
  var CMP_MAX = 4;
  var CMP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4 3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8"/></svg>';
  function cmpGet() { try { return JSON.parse(localStorage.getItem(CMP_KEY)) || []; } catch (e) { return []; } }
  function cmpHas(id) { return cmpGet().indexOf(id) !== -1; }
  function cmpToggle(id) {
    var a = cmpGet();
    var i = a.indexOf(id);
    if (i !== -1) { a.splice(i, 1); }
    else {
      if (a.length >= CMP_MAX) { toast('Legfeljebb ' + CMP_MAX + ' terméket hasonlíthatsz össze'); return false; }
      a.push(id);
    }
    localStorage.setItem(CMP_KEY, JSON.stringify(a));
    syncCompareUI();
    return i !== -1 ? false : true;
  }
  var cmpBar = null;
  function syncCompareUI() {
    var ids = cmpGet().filter(function (id) { return prodById(id); });
    // kártyagombok állapota
    $all('[data-compare]').forEach(function (b) {
      var on = ids.indexOf(b.getAttribute('data-compare')) !== -1;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (!cmpBar) {
      cmpBar = document.createElement('div');
      cmpBar.className = 'sh-cmpbar';
      cmpBar.setAttribute('role', 'region');
      cmpBar.setAttribute('aria-label', 'Összehasonlítás');
      document.body.appendChild(cmpBar);
      cmpBar.addEventListener('click', function (e) {
        var rm = e.target.closest('[data-cmp-rm]');
        if (rm) { cmpToggle(rm.getAttribute('data-cmp-rm')); return; }
        if (e.target.closest('[data-cmp-clear]')) { localStorage.removeItem(CMP_KEY); syncCompareUI(); return; }
        if (e.target.closest('[data-cmp-open]')) { openCompare(); }
      });
    }
    if (!ids.length) { cmpBar.classList.remove('is-on'); return; }
    var thumbs = ids.map(function (id) {
      var p = prodById(id);
      return '<figure class="sh-cmpbar__thumb"><img src="' + p.kepek[0] + '" alt="' + esc(p.nev) + '" loading="lazy" decoding="async">' +
        '<button type="button" data-cmp-rm="' + id + '" aria-label="Eltávolítás">✕</button></figure>';
    }).join('');
    cmpBar.innerHTML =
      '<div class="sh-cmpbar__inner shop-wrap">' +
        '<div class="sh-cmpbar__thumbs">' + thumbs + '</div>' +
        '<div class="sh-cmpbar__actions">' +
          '<button class="sh-link" type="button" data-cmp-clear>Törlés</button>' +
          '<button class="sh-btn sh-btn--primary" type="button" data-cmp-open' + (ids.length < 2 ? ' disabled' : '') + '>' +
            'Összehasonlítás (' + ids.length + ')</button>' +
        '</div>' +
      '</div>';
    cmpBar.classList.add('is-on');
  }
  function openCompare() {
    var ids = cmpGet().filter(function (id) { return prodById(id); });
    if (ids.length < 2) { toast('Válassz legalább 2 terméket az összehasonlításhoz'); return; }
    var prods = ids.map(prodById);
    // spec-címkék uniója, az első előfordulás sorrendjében
    var labels = [];
    prods.forEach(function (p) {
      (p.specs || []).filter(visibleProductSpec).forEach(function (row) { if (labels.indexOf(row[0]) === -1) labels.push(row[0]); });
    });
    function specVal(p, label) {
      var found = '—';
      (p.specs || []).forEach(function (row) { if (row[0] === label) found = row[1]; });
      return found;
    }
    var head = '<tr><th></th>' + prods.map(function (p) {
      return '<th><a href="termek.html?id=' + p.id + '"><img src="' + p.kepek[0] + '" alt="' + esc(p.nev) + '" loading="lazy" decoding="async">' +
        '<span>' + esc(p.nev) + '</span></a>' +
        '<button class="sh-cmp__rm" type="button" data-cmp-rm="' + p.id + '" aria-label="Eltávolítás">✕</button></th>';
    }).join('') + '</tr>';
    var rows = '';
    rows += '<tr><td>Ár</td>' + prods.map(function (p) { return '<td class="sh-cmp__price">' + (IS_WOO ? p.price_html : priceHtml(p)) + '</td>'; }).join('') + '</tr>';
    rows += '<tr><td>Értékelés</td>' + prods.map(function (p) {
      var rt = ratingOf(p);
      if (!rt.n) return '<td>Még nincs értékelés</td>';
      return '<td><span class="sh-cmp__stars">' + starRow(Math.round(parseFloat(rt.r))) + '</span> ' + rt.r + ' <small>(' + rt.n + ')</small></td>';
    }).join('') + '</tr>';
    labels.forEach(function (label) {
      rows += '<tr><td>' + esc(label) + '</td>' + prods.map(function (p) {
        return '<td>' + esc(specVal(p, label)) + '</td>';
      }).join('') + '</tr>';
    });
    rows += '<tr><td></td>' + prods.map(function (p) {
      return '<td>' + (p.ar > 0
        ? (p.szemelyre_szabott === true ? personalizeLink(p, 'sh-btn sh-btn--primary sh-cmp__add') : '<button class="sh-btn sh-btn--primary sh-cmp__add" type="button" data-add="' + p.id + '">Kosárba</button>')
        : '<a class="sh-btn sh-btn--primary sh-cmp__add" href="termek.html?id=' + p.id + '">Ajánlatot kérek</a>') + '</td>';
    }).join('') + '</tr>';

    openInfoModal('Termékek összehasonlítása',
      '<div class="sh-cmp__scroll"><table class="sh-cmp__table"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div>');
    // eltávolítás a táblából → azonnali újrarajzolás
    $all('[data-cmp-rm]', infoModalEl).forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        cmpToggle(b.getAttribute('data-cmp-rm'));
        if (cmpGet().filter(function (id) { return prodById(id); }).length >= 2) openCompare();
        else closeInfoModal();
      });
    });
  }

  /* ── profil, rendelések, hűségprogram (demo, localStorage) ─────── */
  var PROFILE_KEY = 'sh_profile', ORDERS_KEY = 'sh_orders';
  var LOYALTY_TIERS = [
    { nev: 'Bronz', min: 0 },
    { nev: 'Ezüst', min: 500 },
    { nev: 'Arany', min: 1500 }
  ];
  function profileGet() { try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null; } catch (e) { return null; } }
  function profileSet(p) {
    if (p) localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    else localStorage.removeItem(PROFILE_KEY);
    updateAcctBtn();
  }
  function ordersGet() { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch (e) { return []; } }
  function ordersAdd(o) {
    var a = ordersGet(); a.unshift(o);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(a.slice(0, 50)));
  }
  function loyaltyPoints() { return ordersGet().reduce(function (s, o) { return s + Math.floor(o.total || 0); }, 0); }
  function loyaltyTier(pts) {
    var cur = LOYALTY_TIERS[0], next = null;
    for (var i = 0; i < LOYALTY_TIERS.length; i++) {
      if (pts >= LOYALTY_TIERS[i].min) cur = LOYALTY_TIERS[i];
      else { next = LOYALTY_TIERS[i]; break; }
    }
    return { cur: cur, next: next };
  }
  function updateAcctBtn() {
    var b = $('.sh-acct-btn'); if (!b) return;
    var p = profileGet();
    if (p && p.nev) {
      b.innerHTML = '<span class="sh-acct-ava">' + esc(p.nev.trim().charAt(0).toUpperCase() || 'F') + '</span>';
      b.classList.add('is-in');
    } else {
      b.innerHTML = ICO.user;
      b.classList.remove('is-in');
    }
  }

  /* ── SEO: strukturált adatok + meta-leírás ─────────────────────── */
  function setMeta(desc) {
    if (!desc) return;
    var m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', desc);
  }
  function injectJsonLd(obj) {
    if (IS_WOO) return; // WooCommerce owns the product schema on WordPress.
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
  function absUrl(rel) { try { return new URL(rel, location.href).href; } catch (e) { return rel; } }

  /* ── fejléc + lábléc injektálás ──────────────────────────────── */
  var ICO = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z"/><path d="M8 10h8m-8 4h5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L8.09 9.63a16 16 0 0 0 6.28 6.28l1.19-1.19a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20.5A7.5 7.5 0 0 1 3.5 13C3.5 7.5 8 3.5 20.5 3.5c0 8.5-4.5 12.5-9.5 12.5Z"/><path d="M3.5 20.5c3-4.5 6.5-7 11-8"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    retur: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M3.5 13a9 9 0 1 0 2.2-8.3L3 7"/></svg>',
    invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l4 4v16l-3-1.5L13 22l-3-1.5L7 22l-3-1.5V4a2 2 0 0 1 2-2Z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>'
  };

  function searchForm(mod) {
    return '<form class="sh-search sh-search--' + mod + '" action="kategoria.html" role="search" autocomplete="off">' +
      ICO.search +
      '<input type="search" name="q" placeholder="Keresés a termékek között…" aria-label="Keresés">' +
      '<div class="sh-search__results" hidden></div>' +
    '</form>';
  }

  // élő keresési javaslatok (autocomplete) minden keresőmezőhöz
  function initSearch() {
    $all('.sh-search').forEach(function (form) {
      var input = $('input', form);
      var box = $('.sh-search__results', form);
      if (!input || !box) return;
      function render() {
        var raw = input.value.trim();
        if (raw.length < 2) { box.hidden = true; box.innerHTML = ''; return; }
        var hits = searchProducts(SHOP_PRODUCTS, raw).slice(0, 6);
        if (!hits.length) {
          box.innerHTML = '<div class="sh-search__empty">Nincs találat erre: „' + esc(raw) + '”.<br><a href="egyedi-rendeles.html">Indíts egyedi rendelést ›</a></div>';
        } else {
          box.innerHTML = hits.map(function (p) {
            return '<a class="sh-search__hit" href="' + esc(p.url || ('termek.html?id=' + encodeURIComponent(p.id))) + '">' +
              '<img src="' + esc(p.kepek[0]) + '" alt="" loading="lazy" decoding="async">' +
              '<span class="sh-search__hit-name">' + esc(p.nev) + '</span>' +
              '<span class="sh-search__hit-price">' + (IS_WOO ? p.price_html : fmtAr(p.ar)) + '</span>' +
            '</a>';
          }).join('') +
          '<a class="sh-search__all" href="kategoria.html?q=' + encodeURIComponent(raw) + '">Összes találat megtekintése ›</a>';
        }
        box.hidden = false;
      }
      input.addEventListener('input', render);
      input.addEventListener('focus', render);
      input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { box.hidden = true; input.blur(); } });
      document.addEventListener('click', function (e) { if (!form.contains(e.target)) box.hidden = true; });
    });
  }

  function renderChrome() {
    var page = document.body.getAttribute('data-page') || '';
    var header = document.createElement('header');
    header.className = 'sh-header';
    header.innerHTML =
      /* utility sáv */
      '<div class="sh-topbar"><div class="sh-topbar__inner">' +
        '<span class="sh-topbar__promo" data-rotate>' +
          '<span class="is-on" data-theme="navy">Romániában, Szatmárnémetiben tervezzük és gyártjuk — saját műhelyben</span>' +
          (IS_WOO ? '' : '<span data-theme="eco">Napelemes műhelyben, közel nulla CO₂-kibocsátással gyártunk</span>' +
          '<span data-theme="teal">PLA biopolimerből nyomtatunk — növényi alapú, lebomló anyag</span>' +
          '<span data-theme="amber">Ingyenes szállítás 200 lej feletti rendelésre</span>') +
          '<span data-theme="navy">Személyes ajándékok a saját műhelyünkből</span>' +
        '</span>' +
        '<nav class="sh-topbar__links">' +
          '<a href="tel:+40756642387">' + ICO.phone + '<span>+40 756 642 387</span></a>' +
          '<a href="mailto:layeroprint@gmail.com">' + ICO.mail + '<span>layeroprint@gmail.com</span></a>' +
          '<a href="kapcsolat.html"><span>Segítség</span></a>' +
        '</nav>' +
      '</div></div>' +
      /* fő sor */
      '<div class="sh-header__inner">' +
        '<a class="sh-logo sh-brand" href="index.html" aria-label="Layero Shop – főoldal">' +
          '<img src="assets/layero-asset-0251.webp" alt="" width="44" height="44">' +
          '<span class="sh-brand__type"><span class="sh-brand__name">Layero</span><small>Shop</small></span>' +
        '</a>' +
        '<nav class="sh-nav" id="sh-nav">' +
          searchForm('mobile') +
          '<a href="index.html"' + (page === 'home' ? ' aria-current="page"' : '') + '>Főoldal</a>' +
          '<div class="sh-nav__item">' +
            '<a href="kategoria.html"' + (page === 'kategoria' ? ' aria-current="page"' : '') + '>Termékek ' + ICO.chevron + '</a>' +
            '<div class="sh-mega">' +
              '<div class="sh-mega__cols">' +
                '<div class="sh-mega__cats">' +
                  '<span class="sh-mega__label">Kategóriák</span>' +
                  '<div class="sh-mega__grid">' +
                    visibleCats().map(function (c) {
                      var count = IS_WOO && typeof c.count === 'number' ? c.count : SHOP_PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
                      var target = c.ajanlat ? (c.id === 'ceges' ? 'cegeknek.html' : 'egyedi-rendeles.html') : 'kategoria.html?cat=' + c.id;
                      return '<a href="' + target + '">' +
                        '<figure><img src="' + c.img + '" alt="" loading="lazy" decoding="async"></figure>' +
                        '<span><strong>' + esc(c.nev) + '</strong><small>' + (c.ajanlat ? 'Árajánlat alapján' : count + ' termék') + '</small></span>' +
                        '<i class="sh-mega__arr" aria-hidden="true">›</i>' +
                      '</a>';
                    }).join('') +
                  '</div>' +
                '</div>' +
                (function () {
                  var f = prodById('szam-lampa-nevvel');
                  if (!f) return '';
                  return '<a class="sh-mega__feat" href="termek.html?id=' + f.id + '">' +
                    '<figure><img src="' + f.kepek[0] + '" alt="" loading="lazy" decoding="async"></figure>' +
                    '<span class="sh-mega__label sh-mega__label--gold">Bestseller</span>' +
                    '<strong>' + esc(f.nev) + '</strong>' +
                    '<span class="sh-mega__feat-price">' + fmtAr(f.ar) +
                      (f.regi_ar && f.regi_ar > f.ar ? ' <s>' + fmtPrice(f.regi_ar) + '</s>' : '') +
                    '</span>' +
                    '<b>Megnézem ›</b>' +
                  '</a>';
                })() +
              '</div>' +
              '<div class="sh-mega__foot">' +
                '<a href="kategoria.html">Összes termék ›</a>' +
                '<a href="kviz.html">Ajándékkereső kvíz ›</a>' +
                '<a href="egyedi-rendeles.html">Egyedi rendelést indítok ›</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<a href="cegeknek.html">Cégeknek</a>' +
          '<a href="egyedi-rendeles.html">Egyedi rendelés</a>' +
          '<a href="kapcsolat.html"' + (page === 'kapcsolat' ? ' aria-current="page"' : '') + '>Kapcsolat</a>' +
        '</nav>' +
        searchForm('desktop') +
        '<button class="sh-menu-btn" type="button" aria-label="Menü" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        '</button>' +
        '<a class="sh-acct-btn" href="fiok.html" aria-label="Fiókom">' + ICO.user + '</a>' +
        '<a class="sh-wish-btn" href="kedvencek.html" aria-label="Kedvencek">' +
          HEART_SVG +
          '<span class="sh-wish-badge">0</span>' +
        '</a>' +
        '<a class="sh-cart-btn" href="kosar.html" aria-label="Kosár">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.5 12.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>' +
          '<span class="sh-cart-badge">0</span>' +
        '</a>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);

    // A promó/utility sáv kikerül a sticky fejlécből: normál folyásban marad,
    // így legörgetéskor magától, simán kicsúszik a nézetből, a fő navigáció
    // pedig fent ragad. Nincs magasság-animáció → nincs "rezgés" finom
    // görgetésnél (ahogy a nagy webshopok fejléce is működik).
    var topbarNode = $('.sh-topbar', header);
    if (topbarNode) document.body.insertBefore(topbarNode, header);

    var menuBtn = $('.sh-menu-btn', header);
    menuBtn.addEventListener('click', function () {
      var nav = $('#sh-nav');
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (event) {
      var nav = $('#sh-nav');
      if (event.key === 'Escape' && nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
    document.body.classList.add('layero-shell-ready');

    var footer = document.createElement('footer');
    footer.className = 'sh-footer';
    footer.innerHTML =
      '<div class="shop-wrap">' +
        '<div class="sh-footer__intro">' +
          '<div class="sh-footer__brand">' +
            '<a class="sh-footer__logo sh-brand" href="index.html" aria-label="Layero Shop – főoldal"><img src="assets/layero-asset-0251.webp" alt="" width="60" height="60"><span class="sh-brand__type"><span class="sh-brand__name">Layero</span><small>Shop</small></span></a>' +
            '<p>Rétegről rétegre.<br><span>Személyesen neked.</span></p>' +
          '</div>' +
          '<div class="sh-footer__story">' +
            '<span class="sh-footer__eyebrow">Ötletből emlék</span>' +
            '<p>Személyre szabott 3D nyomtatott ajándékok és dekorációk. Szatmárnémetiben tervezve és készítve, a te történetedhez.</p>' +
            '<a class="sh-footer__story-link" href="rolunk.html">Ismerd meg a Layerót <span aria-hidden="true">↗</span></a>' +
          '</div>' +
        '</div>' +
        '<div class="sh-footer__cols">' +
        '<nav class="sh-footer__nav" aria-labelledby="sh-footer-shop"><h2 id="sh-footer-shop">Fedezd fel</h2>' +
          '<a href="kategoria.html">Összes termék</a>' +
          visibleCats().slice(0, 4).map(function (c) { var href = c.ajanlat ? (c.id === 'ceges' ? 'cegeknek.html' : 'egyedi-rendeles.html') : 'kategoria.html?cat=' + encodeURIComponent(c.id); return '<a href="' + esc(href) + '">' + esc(c.nev) + '</a>'; }).join('') +
          '<a href="kviz.html">Ajándékkereső</a>' +
        '</nav>' +
        '<nav class="sh-footer__nav" aria-labelledby="sh-footer-help"><h2 id="sh-footer-help">Segítünk</h2>' +
          '<a href="gyik.html">Gyakori kérdések</a>' +
          '<a href="gyik.html#szallitas">Szállítás és fizetés</a>' +
          '<a href="gyik.html#visszakuldes">Visszaküldés és garancia</a>' +
          '<a href="fiok.html">Fiókom</a>' +
          '<a href="kosar.html">Kosár</a>' +
        '</nav>' +
        '<nav class="sh-footer__nav" aria-labelledby="sh-footer-layero"><h2 id="sh-footer-layero">Layero</h2>' +
          '<a href="rolunk.html">Rólunk</a>' +
          '<a href="egyedi-rendeles.html">Egyedi rendelés</a>' +
          '<a href="cegeknek.html">Cégeknek</a>' +
          '<a href="kapcsolat.html">Kapcsolat</a>' +
        '</nav>' +
        '<section class="sh-footer__contact" aria-labelledby="sh-footer-contact">' +
          '<span class="sh-footer__eyebrow">Beszéljünk róla</span>' +
          '<h2 id="sh-footer-contact">Kérdésed van? <br>Itt vagyunk.</h2>' +
          '<a class="sh-footer__contact-link" href="tel:+40756642387"><span class="sh-footer__contact-icon" aria-hidden="true">' + ICO.phone + '</span><span><strong>+40 756 642 387</strong><small>Hétköznap 9–17 óráig</small></span></a>' +
          '<a class="sh-footer__contact-link" href="mailto:layeroprint@gmail.com"><span class="sh-footer__contact-icon" aria-hidden="true">' + ICO.mail + '</span><span><strong>layeroprint@gmail.com</strong><small>Írj nekünk e-mailt</small></span></a>' +
          '<a class="sh-footer__contact-cta" href="kapcsolat.html">Kapcsolatfelvétel <span aria-hidden="true">↗</span></a>' +
        '</section>' +
        '</div>' +
        '<div class="sh-footer__details">' +
          '<span class="sh-footer__location"><span aria-hidden="true">' + ICO.pin + '</span>Szatmárnémeti, Románia</span>' +
          '<a href="gyik.html#szallitas">Szállítási és fizetési tudnivalók <span aria-hidden="true">↗</span></a>' +
        '</div>' +
        '<div class="sh-footer__bottom">' +
        '<span>© ' + new Date().getFullYear() + ' Layero 3D Design' + (IS_WOO ? '' : ' · Helyi előnézet') + '</span>' +
        '<nav aria-label="Jogi információk és adatvédelem">' +
          '<a href="aszf.html">ÁSZF</a>' +
          '<a href="aszf.html#elallas-online">Elállás a szerződéstől</a>' +
          '<a href="adatvedelem.html">Adatvédelem</a>' +
          '<a href="https://anpc.ro" target="_blank" rel="noopener">ANPC</a>' +
          '<button type="button" data-cookie-open>Sütibeállítások</button>' +
        '</nav>' +
        '</div>' +
      '</div>';
    document.body.appendChild(footer);

    buildDrawer();
    initSearch();

    updateBadge();
    updateWishBadge();
    updateAcctBtn();
  }

  /* ── mini-kosár drawer ───────────────────────────────────────── */
  var drawerEl = null, drawerOv = null;
  function buildDrawer() {
    if (IS_WOO) return; // WordPress renders a drawer backed by the real cart.
    drawerOv = document.createElement('div');
    drawerOv.className = 'sh-drawer-ov';
    drawerEl = document.createElement('aside');
    drawerEl.className = 'sh-drawer';
    drawerEl.setAttribute('aria-label', 'Kosár');
    document.body.appendChild(drawerOv);
    document.body.appendChild(drawerEl);
    drawerOv.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawerEl.classList.contains('is-open')) closeDrawer(); });

    // fejléc kosár-ikon → drawer (kosároldalon marad a link)
    var cartBtn = $('.sh-cart-btn');
    if (cartBtn && document.body.getAttribute('data-page') !== 'kosar' && document.body.getAttribute('data-page') !== 'penztar') {
      cartBtn.addEventListener('click', function (e) { e.preventDefault(); openDrawer(); });
    }

    // delegált események a drawerben
    drawerEl.addEventListener('click', function (e) {
      var t = e.target;
      var rm = t.closest('[data-dr-rm]');
      if (rm) { var items = cartGet().filter(function (x) { return x.key !== rm.getAttribute('data-dr-rm'); }); cartSet(items); renderDrawer(); return; }
      var pm = t.closest('[data-dr-minus]'); var pl = t.closest('[data-dr-plus]');
      if (pm || pl) {
        var key = (pm || pl).getAttribute(pm ? 'data-dr-minus' : 'data-dr-plus');
        var arr = cartGet(); arr.forEach(function (x) { if (x.key === key) changeCartQuantity(arr, x, pm ? -1 : 1); });
        cartSet(arr); renderDrawer(); return;
      }
      var up = t.closest('[data-dr-add]');
      if (up) {
        var upProduct = prodById(up.getAttribute('data-dr-add'));
        if (!cartAdd(up.getAttribute('data-dr-add'), 1, upProduct ? defaultVariant(upProduct) : '')) return;
        toast('Hozzáadva a kosárhoz'); renderDrawer(); return;
      }
      var gw = t.closest('[data-dr-gift]');
      if (gw) { giftSet(!giftGet()); renderDrawer(); return; }
      var cp = t.closest('[data-dr-coupon]');
      if (cp) { applyCouponFromInput($('[data-dr-coupon-input]', drawerEl)); return; }
      var chip = t.closest('[data-coupon-chip]');
      if (chip) { var inp = $('[data-dr-coupon-input]', drawerEl); if (inp) { inp.value = chip.getAttribute('data-coupon-chip'); applyCouponFromInput(inp); } }
    });
  }
  function openDrawer() {
    renderDrawer();
    if (!drawerEl.classList.contains('is-open')) lockScroll();
    drawerOv.classList.add('is-open');
    drawerEl.classList.add('is-open');
  }
  function closeDrawer() {
    if (drawerEl.classList.contains('is-open')) unlockScroll();
    drawerOv.classList.remove('is-open');
    drawerEl.classList.remove('is-open');
  }

  function applyCouponFromInput(inp) {
    if (!inp) return;
    var code = (inp.value || '').trim().toUpperCase();
    var msg = $('[data-coupon-msg]', drawerEl);
    if (!code) return;
    if (COUPONS[code]) { couponSet(code); if (msg) { msg.className = 'sh-coupon__msg ok'; msg.textContent = 'Kupon aktiválva: ' + COUPONS[code].cimke; } toast('Kupon aktiválva'); renderDrawer(); }
    else { couponSet(''); if (msg) { msg.className = 'sh-coupon__msg err'; msg.textContent = 'Érvénytelen kód.'; } }
  }

  function renderDrawer() {
    if (!drawerEl) return;
    var t = cartTotals();
    if (!t.items.length) {
      drawerEl.innerHTML =
        '<div class="sh-drawer__head"><h2>Kosár</h2><button class="sh-drawer__close" type="button" data-dr-close aria-label="Bezárás">✕</button></div>' +
        '<div class="sh-drawer__empty">' +
          '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.3 10.5a1.5 1.5 0 0 1-1.5 1.7H6.2a1.5 1.5 0 0 1-1.5-1.7L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>' +
          '<p>A kosarad üres.</p>' +
          '<a class="sh-btn sh-btn--primary" href="kategoria.html" style="margin-top:14px;">Vásárlás</a>' +
        '</div>';
      wireDrawerClose();
      return;
    }
    var remaining = Math.max(0, FREE_SHIP - t.subtotal);
    var pct = Math.min(100, Math.floor(t.subtotal / FREE_SHIP * 100));
    // upsell: legolcsóbb, kosárban még nem lévő termék
    var inCart = t.items.map(function (r) { return r.p.id; });
    var up = SHOP_PRODUCTS.filter(function (x) { return x.ar > 0 && x.ar <= 150 && inCart.indexOf(x.id) === -1; }).sort(function (a, b) { return a.ar - b.ar; })[0];

    drawerEl.innerHTML =
      '<div class="sh-drawer__head"><h2>Kosár <span>· ' + t.count + ' db</span></h2><button class="sh-drawer__close" type="button" data-dr-close aria-label="Bezárás">✕</button></div>' +
      '<div class="sh-drawer__ship">' +
        (t.shipping === 0
          ? '<p><b>' + (t.freeByCoupon ? 'Ingyenes szállítás (kupon) 🎉' : 'Megvan az ingyenes szállítás! 🎉') + '</b></p>'
          : '<p>Még <b>' + fmtPrice(remaining) + '</b> és ingyenes a szállítás</p>') +
        '<div class="sh-drawer__bar"><div class="sh-drawer__fill" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<div class="sh-drawer__body">' +
        t.items.map(function (r) {
          return '<div class="sh-drawer-item">' +
            '<figure><img src="' + r.p.kepek[0] + '" alt="" loading="lazy" decoding="async"></figure>' +
            '<div><b>' + esc(r.p.nev) + '</b>' + (r.it.variant ? '<small>' + esc(r.it.variant) + '</small>' : '<small></small>') +
              '<div class="sh-qty"><button type="button" data-dr-minus="' + esc(r.it.key) + '">−</button><output>' + r.it.qty + '</output><button type="button" data-dr-plus="' + esc(r.it.key) + '">+</button></div>' +
            '</div>' +
            '<div style="text-align:right"><div class="sh-drawer-item__price">' + fmtPrice(r.sor) + '</div><button class="sh-drawer-item__rm" type="button" data-dr-rm="' + esc(r.it.key) + '">Törlés</button></div>' +
          '</div>';
        }).join('') +
        (up ? '<div class="sh-upsell"><h4>Tedd mellé</h4><div class="sh-upsell__item">' +
          '<figure><img src="' + up.kepek[0] + '" alt="" loading="lazy" decoding="async"></figure>' +
          '<div><b>' + esc(up.nev) + '</b>' + rateHtml(up, false) + '</div>' +
          '<span class="pr">' + fmtPrice(up.ar) + '</span>' +
          (up.szemelyre_szabott === true ? personalizeLink(up, 'sh-upsell__add', true) : '<button class="sh-upsell__add" type="button" data-dr-add="' + up.id + '" aria-label="Kosárba">+</button>') +
        '</div></div>' : '') +
      '</div>' +
      '<div class="sh-drawer__foot">' +
        '<div class="sh-giftwrap' + (t.gift ? ' is-on' : '') + '" data-dr-gift role="button" tabindex="0">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7S10 2 7 3.5 9 7 12 7ZM12 7s2-5 5-3.5S15 7 12 7Z"/></svg>' +
          '<div><b>Ajándékcsomagolás</b><small>Díszdoboz + kézzel írt üzenet · +' + GIFTWRAP_FEE + ' lej</small></div>' +
          '<span class="sh-giftwrap__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>' +
        '</div>' +
        '<div class="sh-coupon"><input type="text" placeholder="Kuponkód" data-dr-coupon-input aria-label="Kuponkód" value="' + (t.coupon ? t.coupon.code : '') + '"><button type="button" data-dr-coupon>Beváltás</button></div>' +
        '<p class="sh-coupon__msg' + (t.coupon ? ' ok' : '') + '" data-coupon-msg>' + (t.coupon ? 'Kupon: ' + t.coupon.def.cimke : '') + '</p>' +
        '<p class="sh-coupon-hint">Próbáld ki: <code data-coupon-chip="NYAR20">NYAR20</code> <code data-coupon-chip="LAYERO10">LAYERO10</code></p>' +
        '<div class="sh-sumrow"><span>Részösszeg</span><span>' + fmtPrice(t.subtotal) + '</span></div>' +
        (t.discount ? '<div class="sh-sumrow disc"><span>Kedvezmény</span><span>−' + fmtPrice(t.discount) + '</span></div>' : '') +
        (t.gift ? '<div class="sh-sumrow"><span>Ajándékcsomagolás</span><span>' + fmtPrice(t.gift) + '</span></div>' : '') +
        '<div class="sh-sumrow"><span>Szállítás</span><span>' + (t.shipping === 0 ? 'Ingyenes' : fmtPrice(t.shipping)) + '</span></div>' +
        '<div class="sh-sumrow total"><span>Összesen</span><span>' + fmtPrice(t.total) + '</span></div>' +
        (t.invalid ? '<p class="sh-coupon__msg err">Egy változat vagy mennyiség már nem elérhető. Ellenőrizd a kosarat.</p>' : t.belowMin ? '<p class="sh-coupon__msg err">Minimális rendelés ' + fmtPrice(MIN_ORDER) + ' — még ' + fmtPrice(MIN_ORDER - t.subtotal) + '.</p>' : '') +
        '<a class="sh-btn sh-btn--primary' + (t.belowMin ? ' is-disabled' : '') + '" href="penztar.html"' + (t.belowMin ? ' aria-disabled="true" style="opacity:.45;pointer-events:none"' : '') + '>Tovább a pénztárhoz</a>' +
        '<a class="sh-btn sh-btn--ghost" href="kosar.html">Kosár megtekintése</a>' +
        '<p class="sh-drawer__secure">' + ICO.shield + ' Biztonságos, SSL-titkosított fizetés</p>' +
        payChipsHtml(true) +
      '</div>';
    wireDrawerClose();
  }
  function wireDrawerClose() {
    var c = $('[data-dr-close]', drawerEl);
    if (c) c.addEventListener('click', closeDrawer);
  }

  /* ── globális: kívánságlista-gombok + gyorsnézet delegálás ────── */
  function initCardActions() {
    document.addEventListener('click', function (e) {
      var w = e.target.closest('[data-wish]');
      if (w) {
        e.preventDefault(); e.stopPropagation();
        var on = wishToggle(w.getAttribute('data-wish'));
        w.classList.toggle('is-on', on);
        w.setAttribute('aria-pressed', on ? 'true' : 'false');
        // minden azonos termékű szív frissítése az oldalon
        $all('[data-wish="' + w.getAttribute('data-wish') + '"]').forEach(function (b) {
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (on) toast('Kedvencekhez adva');
        return;
      }
      var cmp = e.target.closest('[data-compare]');
      if (cmp) {
        e.preventDefault(); e.stopPropagation();
        var wasOn = cmpHas(cmp.getAttribute('data-compare'));
        cmpToggle(cmp.getAttribute('data-compare'));
        if (!wasOn && cmpHas(cmp.getAttribute('data-compare'))) toast('Hozzáadva az összehasonlításhoz');
        return;
      }
      var q = e.target.closest('[data-qv]');
      if (q) {
        e.preventDefault(); e.stopPropagation();
        openQuickView(q.getAttribute('data-qv'));
        return;
      }
      var add = e.target.closest('[data-add]');
      if (add && add.hasAttribute('data-add')) {
        e.preventDefault(); e.stopPropagation();
        var ap = prodById(add.getAttribute('data-add'));
        if (ap) {
          if (!cartAdd(ap.id, 1, defaultVariant(ap))) return;
          openDrawer();  // pro AOV: azonnal megnyílik a kosár upsell-lel
        }
        return;
      }
      var quote = e.target.closest('[data-add-quote]');
      if (quote) {
        e.preventDefault(); e.stopPropagation();
        window.location.href = 'termek.html?id=' + quote.getAttribute('data-add-quote');
      }
    });
  }

  /* ── gyorsnézet-modal ────────────────────────────────────────── */
  var qvEl = null;
  var qvReturnFocus = null;
  function openQuickView(id) {
    if (!qvEl || !qvEl.classList.contains('is-open')) qvReturnFocus = document.activeElement;
    var p = prodById(id);
    if (!p) return;
    var cat = catById(p.cat);
    if (!qvEl) {
      qvEl = document.createElement('div');
      qvEl.className = 'sh-qv';
      qvEl.setAttribute('role', 'dialog');
      qvEl.setAttribute('aria-modal', 'true');
      qvEl.setAttribute('aria-label', 'Termék gyorsnézet');
      qvEl.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          var detail = event.target.closest('.lyrb-more[open]');
          if (detail) { event.stopPropagation(); detail.open = false; $('summary', detail).focus(); }
          return;
        }
        if (event.key !== 'Tab') return;
        var focusable = $all('button:not(:disabled), a[href], summary', qvEl).filter(function (el) { return el.getClientRects().length; });
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
      document.body.appendChild(qvEl);
      qvEl.addEventListener('click', function (e) { if (e.target === qvEl || e.target.closest('[data-qv-close]')) closeQuickView(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && qvEl.classList.contains('is-open')) closeQuickView(); });
    }
    var saved = wishHas(p.id) ? ' is-on' : '';
    qvEl.innerHTML =
      '<div class="sh-qv__box">' +
        '<button class="sh-qv__close" type="button" data-qv-close aria-label="Bezárás">✕</button>' +
        '<div class="sh-qv__grid">' +
          '<div class="sh-qv__media"><img src="' + p.kepek[0] + '" alt="' + esc(p.nev) + '" loading="lazy" decoding="async">' +
            infoChips(p, true) +
            '<button class="sh-heart' + saved + '" type="button" data-wish="' + p.id + '" aria-label="Kedvencekhez">' + HEART_SVG + '</button>' +
          '</div>' +
          '<div class="sh-qv__info">' +
            '<span class="sh-qv__cat">' + (cat ? esc(cat.nev) : '') + '</span>' +
            '<h2>' + esc(p.nev) + '</h2>' +
            rateHtml(p, false) +
            '<div class="sh-qv__price">' + (IS_WOO ? p.price_html : (p.regi_ar && p.regi_ar > p.ar ? '<span style="color:#e04726">' + fmtPrice(p.ar) + '</span> <span style="text-decoration:line-through;color:var(--faint);font-weight:450;font-size:.85rem">' + fmtPrice(p.regi_ar) + '</span>' : fmtAr(p.ar) + (p.ar > 0 ? '<small>-tól</small>' : ''))) + '</div>' +
            '<p class="sh-qv__desc">' + esc(p.leiras) + '</p>' +
            (p.ar > 0
              ? (p.szemelyre_szabott === true ? '' : optionRowsHtml(p, 'data-qv-option', false)) +
                (V.isVariable(p) && p.szemelyre_szabott !== true ? '<p class="sh-variation-status" role="status" data-variation-status></p><button type="button" class="sh-variation-reset" data-variation-reset>Választás törlése</button>' : '') +
                '<div class="sh-qv__foot">' +
                  (p.szemelyre_szabott === true ? personalizeLink(p, 'sh-btn sh-btn--primary') : '<button class="sh-btn sh-btn--primary" type="button" data-qv-add="' + p.id + '" style="flex:1;">Kosárba teszem</button>') +
                  '<a class="sh-link" href="termek.html?id=' + p.id + '">Részletek ›</a>' +
                '</div>'
              : '<div class="sh-qv__foot"><a class="sh-btn sh-btn--primary" href="kapcsolat.html" style="flex:1;">Ajánlatot kérek</a><a class="sh-link" href="termek.html?id=' + p.id + '">Részletek ›</a></div>'
            ) +
          '</div>' +
        '</div>' +
      '</div>';

    if (p.ar > 0 && p.szemelyre_szabott !== true) {
      $all('[data-qv-option]', qvEl).filter(function (row) { return !row.closest('.sh-opt--variation'); }).forEach(function (row) {
        row.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b) return;
          $all('button', row).forEach(function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
        });
      });
      var quickState = V.isVariable(p) ? bindVariations(qvEl, p, '[data-qv-option]', null, function (v) {
        $('[data-qv-add]', qvEl).disabled = !V.available(v);
        $('.sh-qv__price', qvEl).innerHTML = priceHtml(v ? V.view(p, v) : p);
        if (v) { var image = $('.sh-qv__media img', qvEl); image.src = v.kepek[0]; image.alt = p.nev + ' – ' + V.label(p, v); }
      }) : { current: null };
      $('[data-qv-add]', qvEl).addEventListener('click', function () {
        var extra = selectedOptionText(qvEl, '.sh-opt:not(.sh-opt--variation) [data-qv-option]');
        var text = quickState.current ? V.label(p, quickState.current) + (extra ? ' · ' + extra : '') : selectedOptionText(qvEl, '[data-qv-option]');
        if (!cartAdd(p.id, 1, text, null, quickState.current && quickState.current.id, extra)) return;
        closeQuickView();
        openDrawer();
      });
    }
    if (!qvEl.classList.contains('is-open')) lockScroll();
    requestAnimationFrame(function () { qvEl.classList.add('is-open'); $('[data-qv-close]', qvEl).focus(); });
  }
  function closeQuickView() {
    if (!qvEl || !qvEl.classList.contains('is-open')) return;
    qvEl.classList.remove('is-open');
    unlockScroll();
    if (qvReturnFocus && document.contains(qvReturnFocus)) qvReturnFocus.focus();
  }

  // Explicit array from WordPress or the product manager takes precedence.
  function visibleProductSpec(row) {
    return !/gyártási idő|készlet|raktár|stock|lead.?time/i.test(String(row[0] || ''));
  }
  function productBadges(p) {
    if (Array.isArray(p.badges)) return window.LayeroBadges ? LayeroBadges.forStorefront(p.badges) : [];
    var items = [], pct = discountPct(p);
    if (pct > 0 && pct <= 100) items.push({ id: 'salePercent', value: pct });
    if (p.badge) {
      var ids = { 'Bestseller': 'bestseller', 'Új': 'new', 'Szezonális': 'seasonal' };
      items.push(ids[p.badge] ? { id: ids[p.badge] } : { id: 'custom', label: p.badge, zone: 'overlay' });
    }
    if (p.szemelyre_szabott === true) items.push({ id: 'personal', label: 'Személyre szabható' });
    if (p.csak_elore_fizetes === true) items.push({ id: 'custom', label: 'Csak előre fizetés', zone: 'service' });
    return window.LayeroBadges ? LayeroBadges.forStorefront(items) : items;
  }
  function badgeOptions() { return { locale: document.documentElement.lang.indexOf('ro') === 0 ? 'ro' : 'hu', variant: 'signature' }; }
  function productBadgeDetails(p) {
    if (!window.LayeroBadges) return '';
    return LayeroBadges.mediaHTML(productBadges(p), badgeOptions());
  }

  /* ── terméktulajdonságok, készlet- és időjelzés nélkül ─────── */
  function infoChips(p, full) {
    if (window.LayeroBadges) return productBadgeDetails(p);
    var personal = p.szemelyre_szabott === true ? '<span class="sh-personal-mark" role="img" aria-label="Személyre szabható" title="Személyre szabható">' + PENCIL_ICON + '</span>' : '';
    var chips = '';
    if (full && p.csak_elore_fizetes === true) chips += '<span class="sh-chip-info sh-chip-info--pay" title="Utánvét nem elérhető · Doar cu plată în avans">Csak előre fizetés</span>';
    return personal + (chips ? '<div class="sh-chip-row">' + chips + '</div>' : '');
  }

  /* ── termékkártya HTML ───────────────────────────────────────── */
  function prodCard(p) {
    var cat = catById(p.cat);
    var img2 = p.kepek[1] ? '<img class="sh-pc-img2" src="' + p.kepek[1] + '" alt="" loading="lazy" decoding="async">' : '';
    var saved = wishHas(p.id) ? ' is-on' : '';
    var pct = discountPct(p);
    var badges = '';
    if (pct) badges += '<span class="sh-badge sh-badge--sale">-' + pct + '%</span>';
    if (p.badge === 'Bestseller') badges += '<span class="sh-badge sh-badge--best">Bestseller</span>';
    else if (p.badge === 'Új') badges += '<span class="sh-badge sh-badge--new">Új</span>';
    else if (p.badge) badges += '<span class="sh-badge sh-badge--info">' + esc(p.badge) + '</span>';
    var html = '<div class="sh-prod-card sh-reveal">' +
      '<figure>' +
        (badges ? '<div class="sh-badges">' + badges + '</div>' : '') +
        '<img src="' + p.kepek[0] + '" alt="' + esc(p.nev) + '" loading="lazy" decoding="async">' + img2 +
        (p.szemelyre_szabott === true ? '<span class="sh-personal-mark" role="img" aria-label="Személyre szabható" title="Személyre szabható">' + PENCIL_ICON + '</span>' : '') +
        '<div class="sh-card-tools">' +
          '<button class="sh-heart' + saved + '" type="button" data-wish="' + p.id + '" aria-label="Kedvencekhez" aria-pressed="' + (saved ? 'true' : 'false') + '">' + HEART_SVG + '</button>' +
          '<button class="sh-compare-btn' + (cmpHas(p.id) ? ' is-on' : '') + '" type="button" data-compare="' + p.id + '" aria-label="Összehasonlításhoz" aria-pressed="' + (cmpHas(p.id) ? 'true' : 'false') + '" title="Összehasonlítás">' + CMP_ICON + '</button>' +
        '</div>' +
        (p.ar > 0 ? '<div class="sh-quickview"><button type="button" data-qv="' + p.id + '">Gyorsnézet</button></div>' : '') +
      '</figure>' +
      '<div class="sh-prod-card__body">' +
        '<a class="sh-card-link" href="termek.html?id=' + p.id + '" aria-label="' + esc(p.nev) + '"></a>' +
        '<span class="sh-prod-card__name">' + esc(p.nev) + '</span>' +
        '<span class="sh-prod-card__cat">' + (cat ? esc(cat.nev) : '') + '</span>' +
        rateHtml(p, false) +
        variationSummary(p) +
        '<span class="sh-prod-card__price">' + priceHtml(p) + '</span>' +
        (p.ar > 0
          ? (p.szemelyre_szabott === true ? personalizeLink(p, 'sh-card-add') : '<button class="sh-card-add" type="button" data-add="' + p.id + '">' + CART_ICON + (V.isVariable(p) ? 'Változatot választok' : 'Kosárba') + '</button>')
          : '<button class="sh-card-add" type="button" data-add-quote="' + p.id + '">Ajánlatot kérek</button>') +
      '</div>' +
    '</div>';
    if (window.LayeroBadges) {
      var host = document.createElement('div');
      host.innerHTML = html;
      LayeroBadges.mountCard(host.firstElementChild, productBadges(p), badgeOptions());
      html = host.innerHTML;
    }
    return html;
  }

  /* ── FŐOLDAL ─────────────────────────────────────────────────── */
  function initSlider() {
    var slider = $('#sh-slider');
    if (!slider) return;
    var slides = $all('.sh-slide', slider);
    var dotsWrap = $('#sh-slider-dots');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var autoplayAttr = slider.getAttribute('data-autoplay');
    var autoplayMs = autoplayAttr === null ? 8000 : Math.max(0, Number(autoplayAttr) || 0);
    var cur = 0, timer = null;

    if (dotsWrap) dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<button type="button" role="tab" aria-label="' + (i + 1) + '. slide" aria-selected="' + (i === 0 ? 'true' : 'false') + '" tabindex="' + (i === 0 ? '0' : '-1') + '"' + (i === 0 ? ' class="is-on"' : '') + '></button>';
    }).join('');
    var dots = dotsWrap ? $all('button', dotsWrap) : [];

    // lágy crossfade: a régi slide a helyén marad (is-leaving), amíg az új
    // teljesen rá nem úszik; a szöveg elemenként, finoman érkezik (is-entering)
    var transT = null;
    function transitionTo(next, prev) {
      clearTimeout(transT);
      slides.forEach(function (s) {
        s.classList.remove('is-on', 'is-leaving', 'is-entering');
      });
      void slides[next].offsetWidth; // a szöveg-animáció újraindul
      slides[next].classList.add('is-on');
      if (!reduceMotion) {
        if (prev >= 0 && prev !== next) slides[prev].classList.add('is-leaving');
        slides[next].classList.add('is-entering');
        transT = setTimeout(function () {
          if (prev >= 0) slides[prev].classList.remove('is-leaving');
          slides[next].classList.remove('is-entering');
        }, 1500);
      }
      dots.forEach(function (d, k) {
        var on = k === next;
        d.classList.toggle('is-on', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
        d.setAttribute('tabindex', on ? '0' : '-1');
      });
    }

    function goTo(i) {
      var next = (i + slides.length) % slides.length;
      if (next === cur) return;
      var prev = cur;
      cur = next;
      transitionTo(next, prev);
    }
    // belépéskor a kép azonnal látszik, csak a szöveg úszik be finoman
    if (!reduceMotion) {
      slides[0].classList.add('is-entering');
      transT = setTimeout(function () { slides[0].classList.remove('is-entering'); }, 1600);
    }
    function start() { if (!reduceMotion && autoplayMs > 0 && slides.length > 1 && !timer) timer = setInterval(function () { goTo(cur + 1); }, Math.max(3000, autoplayMs)); }
    function stop() { clearInterval(timer); timer = null; }

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { stop(); goTo(i); start(); });
      d.addEventListener('keydown', function (event) {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        var target;
        if (event.key === 'ArrowRight') target = (i + 1) % slides.length;
        else if (event.key === 'ArrowLeft') target = (i + slides.length - 1) % slides.length;
        else if (event.key === 'Home') target = 0;
        else if (event.key === 'End') target = slides.length - 1;
        else return;
        event.preventDefault(); stop(); goTo(target); dots[target].focus();
      });
    });
    var prevButton = $('[data-slide-prev]', slider), nextButton = $('[data-slide-next]', slider);
    if (prevButton) prevButton.addEventListener('click', function () { stop(); goTo(cur - 1); start(); });
    if (nextButton) nextButton.addEventListener('click', function () { stop(); goTo(cur + 1); start(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', function (event) { if (!slider.contains(event.relatedTarget)) start(); });
    if (slider.classList.contains('sh-slider--lifestyle') && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        document.body.classList.toggle('sh-lifestyle-in-view', entries[0].intersectionRatio > 0.25);
      }, { threshold: [0, 0.25] }).observe(slider);
    }

    // swipe/drag minden nézetre — a lámpa-összehasonlítón belül nem indul,
    // ott a húzás az összehasonlító elválasztóját mozgatja
    var pointerId = null;
    var sx = 0;
    var sy = 0;
    var didDrag = false;
    function clearDrag() {
      slider.classList.remove('is-dragging');
      pointerId = null;
    }
    slider.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('a, button, input, select, textarea, [data-lamp-ba]')) return;
      pointerId = e.pointerId;
      sx = e.clientX;
      sy = e.clientY;
      didDrag = false;
      if (typeof slider.setPointerCapture === 'function') {
        try { slider.setPointerCapture(pointerId); } catch (error) {}
      }
    });
    slider.addEventListener('pointermove', function (e) {
      if (pointerId !== e.pointerId) return;
      var dx = e.clientX - sx;
      var dy = e.clientY - sy;
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        didDrag = true;
        slider.classList.add('is-dragging');
        stop();
        e.preventDefault();
      }
    });
    slider.addEventListener('pointerup', function (e) {
      if (pointerId !== e.pointerId) return;
      var dx = e.clientX - sx;
      var dy = e.clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        goTo(dx < 0 ? cur + 1 : cur - 1);
      }
      clearDrag();
      start();
    });
    slider.addEventListener('pointercancel', function () {
      clearDrag();
      start();
    });
    slider.addEventListener('click', function (e) {
      if (!didDrag) return;
      e.preventDefault();
      e.stopPropagation();
      didDrag = false;
    }, true);

    start();
  }

  /* fel-/lekapcsolva lámpa-összehasonlító (a prezentációs oldalról átvéve):
     húzásra vagy nyílbillentyűre mozog az elválasztó */
  function initLampBa() {
    $all('[data-lamp-ba]').forEach(function (ba) {
      var dragging = false;

      function setRatio(ratio) {
        var next = Math.min(Math.max(ratio, 0.05), 0.95);
        ba.style.setProperty('--pos', (next * 100).toFixed(2) + '%');
      }
      function setFromX(clientX) {
        var rect = ba.getBoundingClientRect();
        if (!rect.width) return;
        setRatio((clientX - rect.left) / rect.width);
      }
      function currentRatio() {
        var value = getComputedStyle(ba).getPropertyValue('--pos');
        var parsed = parseFloat(value);
        return isFinite(parsed) ? parsed / 100 : 0.5;
      }

      ba.addEventListener('pointerdown', function (event) {
        dragging = true;
        ba.classList.add('was-dragged');
        if (ba.setPointerCapture) {
          try { ba.setPointerCapture(event.pointerId); } catch (err) {}
        }
        setFromX(event.clientX);
        event.preventDefault();
      });
      ba.addEventListener('pointermove', function (event) {
        if (dragging) setFromX(event.clientX);
      });
      ba.addEventListener('pointerup', function () { dragging = false; });
      ba.addEventListener('pointercancel', function () { dragging = false; });
      ba.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        ba.classList.add('was-dragged');
        setRatio(currentRatio() + (event.key === 'ArrowRight' ? 0.06 : -0.06));
        event.preventDefault();
      });
    });

    // A határidőt az adott termékhez, egyeztetés után adjuk meg.
    var eta = $('#sh-hero-eta');
    if (eta) {
      eta.textContent = 'Szatmárnémetiben, rendelésre készül.';
    }
  }

  /* ── 2. slide: auto-váltó témás spotlight ──────────────────────────
     A jobb oldali termékfotó 3-4 téma közt vált (cross-fade), a badge és a
     pöttyök követik; hoverre megáll, pöttyre ugrik. Önálló, a külső slidertől
     független — a .sh-spot__img.is-on scope nem ütközik a .sh-slide.is-on-nal. */
  function initSpotlight() {
    var root = $('[data-spot]');
    if (!root) return;
    var imgs = $all('.sh-spot__img', root);
    var dots = $all('.sh-spot__dot', root);
    var badge = $('[data-spot-badge]', root);
    if (imgs.length < 2) return;
    var labels = imgs.map(function (im) { return im.getAttribute('data-theme') || ''; });
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var i = 0, timer = null;
    function show(n) {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
      dots.forEach(function (d, k) {
        var on = k === i;
        d.classList.toggle('is-on', on);
        d.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (badge) { badge.textContent = labels[i]; }
    }
    function start() { if (!reduceMotion && !timer) timer = setInterval(function () { show(i + 1); }, 3200); }
    function stop() { clearInterval(timer); timer = null; }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { stop(); show(k); start(); }); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    show(0);
    start();
  }

  /* ── Hero stílusváltó ─────────────────────────────────────────────
     A hero „skinjét" a #sh-slider data-hero-style attribútuma dönti el.
     Alapból a HTML-ben megadott érték él (ez megy ki a látogatónak).
     Kísérletezéshez: nyisd meg az index.html?herolab címet — a kis panelen
     élőben végigkattinthatod a stílusokat; a választás megmarad ebben a
     böngészőben (localStorage), amíg a panel × gombjával vissza nem állítod.
     Új stílus felvétele: adj hozzá egy presetet a shop.css-ben, és vedd fel
     ide is (id + megjelenő név + 2 swatch-szín az előnézeti négyzethez). */
  var HERO_STYLES = [
    { id: 'aurora',    name: 'Aurora',    sw: ['#7ee7f5', '#f4b860'] },
    { id: 'studio',    name: 'Studio',    sw: ['#e9b877', '#0c0d10'] },
    { id: 'editorial', name: 'Editorial', sw: ['#0f766e', '#f6f3ec'] },
    { id: 'neon',      name: 'Neon',      sw: ['#22d3ee', '#f472b6'] },
    { id: 'sunset',    name: 'Sunset',    sw: ['#fdba74', '#fb7185'] }
  ];
  var HERO_STYLE_KEY = 'layero:heroStyle';
  var HERO_LAB_KEY = 'layero:herolab';

  function initHeroStyleSwitcher() {
    var slider = $('#sh-slider');
    if (!slider) return;

    var defaultStyle = slider.getAttribute('data-hero-style') || 'aurora';
    function isValid(id) { return HERO_STYLES.some(function (s) { return s.id === id; }); }
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

    // mentett próba-felülírás alkalmazása (ha van és érvényes)
    var saved = lsGet(HERO_STYLE_KEY);
    slider.setAttribute('data-hero-style', (saved && isValid(saved)) ? saved : defaultStyle);

    // a panel csak neked: ?herolab paraméterre, vagy ha korábban már megnyitottad
    var labOn = false;
    try { labOn = new URLSearchParams(location.search).has('herolab'); } catch (e) {}
    labOn = labOn || lsGet(HERO_LAB_KEY) === '1';
    if (!labOn) return;
    lsSet(HERO_LAB_KEY, '1');

    var panel = document.createElement('div');
    panel.className = 'sh-herolab';
    panel.innerHTML =
      '<div class="sh-herolab__head">' +
        '<span class="sh-herolab__title">Hero stílus</span>' +
        '<button type="button" class="sh-herolab__close" title="Bezárás — vissza az alap stílusra" aria-label="Bezárás">×</button>' +
      '</div>' +
      '<div class="sh-herolab__list">' +
        HERO_STYLES.map(function (s) {
          return '<button type="button" class="sh-herolab__opt" data-style="' + s.id + '">' +
            '<span class="sh-herolab__sw" style="background:linear-gradient(135deg,' + s.sw[0] + ' 50%,' + s.sw[1] + ' 50%)"></span>' +
            '<span>' + s.name + '</span>' +
            (s.id === defaultStyle ? '<small>alap</small>' : '') +
          '</button>';
        }).join('') +
      '</div>' +
      '<p class="sh-herolab__hint"></p>';
    document.body.appendChild(panel);

    var opts = $all('.sh-herolab__opt', panel);
    var hint = $('.sh-herolab__hint', panel);

    function refresh() {
      var cur = slider.getAttribute('data-hero-style');
      opts.forEach(function (o) { o.classList.toggle('is-on', o.getAttribute('data-style') === cur); });
      hint.innerHTML = (cur === defaultStyle)
        ? 'Ez az induló stílus. Máshoz: válassz, majd a véglegesítéshez írd be a HTML-be.'
        : 'Véglegesítés mindenkinek: az index.html sliderére <code>data-hero-style="' + cur + '"</code>';
    }

    opts.forEach(function (o) {
      o.addEventListener('click', function () {
        var id = o.getAttribute('data-style');
        slider.setAttribute('data-hero-style', id);
        lsSet(HERO_STYLE_KEY, id);
        refresh();
      });
    });
    $('.sh-herolab__close', panel).addEventListener('click', function () {
      // panel zárása = próba vége: felülírás + jelző törlése, vissza a HTML-alapra
      lsDel(HERO_STYLE_KEY);
      lsDel(HERO_LAB_KEY);
      slider.setAttribute('data-hero-style', defaultStyle);
      panel.remove();
    });
    refresh();
  }

  function renderHome() {
    // SEO: szervezet + kereshető webhely
    injectJsonLd({
      '@context': 'https://schema.org', '@type': 'Organization',
      name: 'Layero Shop', url: location.href,
      logo: absUrl('assets/layero-asset-0251.webp'),
      description: 'Személyre szabott 3D nyomtatott ajándékok, világító lámpák, kulcstartók és dekorációk.',
      email: 'layeroprint@gmail.com', telephone: '+40756642387',
      address: { '@type': 'PostalAddress', addressLocality: 'Szatmárnémeti', addressCountry: 'RO' },
      sameAs: []
    });

    // kategóriák — bento-rács: az első csempe nagy (2×2), fotó-overlay stílus.
    // Csak a közvetlenül vásárolható kategóriák kiemeltek; az ajánlatkérősek
    // (ajanlat: true — céges, egyedi) külön sávba kerülnek alá.
    var cats = $('#sh-home-cats');
    if (cats) {
      var homeCats = visibleCats();
      var featured = homeCats.filter(function (c) { return !c.ajanlat; });
      var quoteCats = homeCats.filter(function (c) { return c.ajanlat; });
      cats.innerHTML = featured.map(function (c, i) {
        var count = IS_WOO && typeof c.count === 'number' ? c.count : SHOP_PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
        return '<a class="sh-bento sh-reveal' + (i === 0 ? ' sh-bento--hero' : '') + '" href="kategoria.html?cat=' + c.id + '">' +
          '<img src="' + c.img + '" alt="' + esc(c.nev) + '" loading="lazy" decoding="async">' +
          '<span class="sh-bento__body">' +
            '<strong>' + esc(c.nev) + '</strong>' +
            '<small>' + esc(c.leiras) + ' · ' + count + ' termék</small>' +
            '<i aria-hidden="true">Felfedezem ›</i>' +
          '</span>' +
        '</a>';
      }).join('');

      if (quoteCats.length && !document.getElementById('sh-quote-band')) {
        cats.insertAdjacentHTML('afterend',
          '<div class="sh-section-hd" style="margin-top:38px">' +
            '<span class="sh-label sh-kicker">Ajánlatkérés alapján</span>' +
            '<h2 class="sh-h2">Egyedi & céges megrendelések.</h2>' +
          '</div>' +
          '<div id="sh-quote-band" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px">' +
          quoteCats.map(function (c) {
            var quoteHref = c.id === 'ceges' ? 'cegeknek.html' : (c.id === 'egyedi' ? 'egyedi-rendeles.html' : 'kategoria.html?cat=' + c.id);
            return '<a class="sh-bento sh-bento--quote" href="' + quoteHref + '">' +
              '<img src="' + c.img + '" alt="' + esc(c.nev) + '" loading="lazy" decoding="async">' +
              '<span class="sh-bento__body">' +
                '<strong>' + esc(c.nev) + '</strong>' +
                '<small>' + esc(c.leiras) + ' · árajánlat és egyeztetés alapján</small>' +
                '<i aria-hidden="true">Ajánlatot kérek ›</i>' +
              '</span>' +
            '</a>';
          }).join('') + '</div>');
      }
    }

    // népszerű termékek — rács
    var pop = $('#sh-home-popular');
    if (pop) {
      var nepszeru = ['szam-lampa-nevvel', 'logos-kulcstarto', 'qr-nfc-display', 'tulipan-vaza', 'jurassic-lampa', 'bagoly-figura', 'holdfeny-lampa', 'camino-szobor'];
      pop.innerHTML = nepszeru.map(function (id) { return prodCard(prodById(id)); }).join('');

      try {
        var homeRecent = (window.LayeroConsent && window.LayeroConsent.allows('preferences') ? JSON.parse(localStorage.getItem('sh_recent') || '[]') : [])
          .filter(function (id) { return prodById(id); })
          .slice(0, 4);
        if (homeRecent.length && !$('#sh-home-recent')) {
          var recentBand = document.createElement('section');
          recentBand.className = 'sh-band sh-band--tight';
          recentBand.id = 'sh-home-recent';
          recentBand.setAttribute('data-consent-recent', '');
          recentBand.innerHTML =
            '<div class="shop-wrap">' +
              '<div class="sh-section-hd"><span class="sh-label sh-kicker">Folytasd innen</span>' +
                '<h2 class="sh-h2">Nemrég nézted.</h2></div>' +
              '<div class="sh-prod-grid">' + homeRecent.map(function (id) { return prodCard(prodById(id)); }).join('') + '</div>' +
            '</div>';
          var popularBand = pop.closest('.sh-band');
          if (popularBand) popularBand.insertAdjacentElement('afterend', recentBand);
        }
      } catch (e) { /* privát mód vagy sérült localStorage */ }
    }

    // újdonságok — carousel (a badge-elt / új termékek)
    var car = $('#sh-home-carousel');
    if (car) {
      var ujak = SHOP_PRODUCTS.filter(function (p) { return p.badge === 'Új'; });
      SHOP_PRODUCTS.forEach(function (p) { if (ujak.length < 8 && ujak.indexOf(p) === -1 && p.ar > 0) ujak.push(p); });
      var carCardsHtml = ujak.slice(0, 8).map(function (p) { return prodCard(p); }).join('');
      car.innerHTML = carCardsHtml;

      var carReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var carAuto = !carReduce && ujak.length > 2;
      var idleSnap = carAuto ? 'none' : '';

      if (carAuto) {
        // a végtelen, varrat nélküli görgetéshez megduplázzuk a kártyasort
        car.insertAdjacentHTML('beforeend', carCardsHtml);
      }
      // a szalag kártyái mindig látszódjanak (nincs görgetésre-előbukkanás)
      $all('.sh-prod-card', car).forEach(function (el) { el.classList.add('is-in'); });
      car.style.scrollSnapType = idleSnap;

      // gomb-animáció: a natív smooth scroll és a snap ütközik,
      // ezért az animáció idejére kikapcsoljuk a snapet
      var glideToken = 0;
      function glide(delta) {
        var start = car.scrollLeft;
        var target = Math.max(0, Math.min(car.scrollWidth - car.clientWidth, start + delta));
        var t0 = null, dur = 420, token = ++glideToken;
        car.style.scrollSnapType = 'none';
        function stepFn(ts) {
          if (token !== glideToken) return;
          if (!t0) t0 = ts;
          var p = Math.min(1, (ts - t0) / dur);
          car.scrollLeft = start + (target - start) * (1 - Math.pow(1 - p, 3));
          if (p < 1) requestAnimationFrame(stepFn);
          else car.style.scrollSnapType = idleSnap;
        }
        requestAnimationFrame(stepFn);
        // ha a rAF nem futna (rejtett fül), akkor is érjen célba
        setTimeout(function () {
          if (token === glideToken && car.style.scrollSnapType === 'none') {
            car.scrollLeft = target;
            car.style.scrollSnapType = idleSnap;
          }
        }, dur + 160);
      }
      var step = 500;

      // folyamatos, automatikus görgetés (marquee-jelleg)
      var carHold = function () {};
      if (carAuto) {
        var SPEED = 42;                 // px / másodperc
        var autoPaused = false, hovering = false, resumeTimer = 0, lastTs = 0;
        function autoResume() { if (!hovering && !document.hidden) autoPaused = false; }
        function autoPause() { autoPaused = true; clearTimeout(resumeTimer); }
        carHold = function (ms) { autoPause(); resumeTimer = setTimeout(autoResume, ms || 1800); };

        function autoStep(ts) {
          if (lastTs && !autoPaused) {
            car.scrollLeft += SPEED * (ts - lastTs) / 1000;
            var half = car.scrollWidth / 2;               // egy kártyasor szélessége
            if (car.scrollLeft >= half) car.scrollLeft -= half;
          }
          lastTs = ts;
          requestAnimationFrame(autoStep);
        }
        requestAnimationFrame(autoStep);

        // egérrel fölé húzva megáll, elhagyva folytatódik
        car.addEventListener('mouseenter', function () { hovering = true; autoPause(); });
        car.addEventListener('mouseleave', function () { hovering = false; autoResume(); });
        // kézi görgetés / húzás / érintés idejére szünet
        car.addEventListener('pointerdown', autoPause);
        window.addEventListener('pointerup', function () { carHold(1800); });
        car.addEventListener('wheel', function () { carHold(1800); }, { passive: true });
        car.addEventListener('touchmove', function () { carHold(1800); }, { passive: true });
        // rejtett fülön ne pörögjön feleslegesen
        document.addEventListener('visibilitychange', function () {
          if (document.hidden) autoPause(); else autoResume();
        });
      }

      $('[data-car-prev]').addEventListener('click', function () { carHold(2600); glide(-step); });
      $('[data-car-next]').addEventListener('click', function () { carHold(2600); glide(step); });
    }

    // termék-spotlight (fekete sáv) — auto-váltó kiemelt termékek,
    // a hero 2. slide-jának mintájára: cross-fade fotó, kísérő badge,
    // pöttyök, hoverre megáll; a bal oldali szöveg finoman követi
    var spot = $('#sh-home-spotlight');
    if (spot) {
      var featured = ['karacsonyi-lampa', 'szam-lampa-nevvel', 'jurassic-lampa', 'holdfeny-lampa']
        .map(prodById).filter(Boolean);
      var featBadge = featured.map(function (p, k) {
        return k === 0 ? 'A hónap terméke' : (p.badge || 'Kiemelt darab');
      });

      spot.innerHTML =
        '<div class="sh-spotlight__copy">' +
          '<span class="sh-spotlight__eyebrow">Kiemelt termékek</span>' +
          '<div class="sh-spotlight__dyn" data-f-dyn>' +
            '<h2 data-f-name></h2>' +
            '<p data-f-desc></p>' +
            '<div class="sh-spotlight__price"><span data-f-price></span><small>-tól, egyedi gyártással</small></div>' +
          '</div>' +
          '<a class="sh-btn sh-btn--white" data-f-link href="#">Megnézem a terméket</a>' +
        '</div>' +
        '<div class="sh-spotlight__stage">' +
          '<div class="sh-spotlight__frame">' +
            '<span class="sh-spotlight__badge" data-f-badge></span>' +
            '<span class="sh-spotlight__chip"><i aria-hidden="true">✦</i> Névre szabható</span>' +
            '<span class="sh-spotlight__chip sh-spotlight__chip--tr">' + ICO.pin + ' Szatmárnémetiben gyártva</span>' +
            featured.map(function (p, k) {
              return '<img class="sh-spotlight__img' + (k === 0 ? ' is-on' : '') + '" src="' + p.kepek[0] + '" alt="' + esc(p.nev) + '"' + (k === 0 ? '' : ' loading="lazy"') + ' decoding="async">';
            }).join('') +
          '</div>' +
          '<div class="sh-spotlight__dots" role="tablist" aria-label="Kiemelt termékek">' +
            featured.map(function (p, k) {
              return '<button class="sh-spotlight__dot' + (k === 0 ? ' is-on' : '') + '" type="button" role="tab" aria-selected="' + (k === 0 ? 'true' : 'false') + '" aria-label="' + esc(p.nev) + '"></button>';
            }).join('') +
          '</div>' +
        '</div>';

      if (featured.length > 1) {
        var fImgs = $all('.sh-spotlight__img', spot);
        var fDots = $all('.sh-spotlight__dot', spot);
        var fDyn = $('[data-f-dyn]', spot);
        var fBadgeEl = $('[data-f-badge]', spot);
        var fLink = $('[data-f-link]', spot);
        var fReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var fi = 0, fTimer = null, fSwapT = null;

        function fFill(p) {
          $('[data-f-name]', spot).textContent = p.nev;
          $('[data-f-desc]', spot).textContent = p.leiras;
          $('[data-f-price]', spot).innerHTML = fmtAr(p.ar);
          fLink.href = 'termek.html?id=' + p.id;
        }
        function fShow(n) {
          fi = (n + featured.length) % featured.length;
          fImgs.forEach(function (im, k) { im.classList.toggle('is-on', k === fi); });
          fDots.forEach(function (d, k) {
            var on = k === fi;
            d.classList.toggle('is-on', on);
            d.setAttribute('aria-selected', on ? 'true' : 'false');
          });
          fBadgeEl.textContent = featBadge[fi];
          clearTimeout(fSwapT);
          if (fReduce) { fFill(featured[fi]); return; }
          fDyn.classList.add('is-swap');
          fSwapT = setTimeout(function () {
            fFill(featured[fi]);
            fDyn.classList.remove('is-swap');
          }, 190);
        }
        function fStart() { if (!fReduce && !fTimer) fTimer = setInterval(function () { fShow(fi + 1); }, 4200); }
        function fStop() { clearInterval(fTimer); fTimer = null; }
        fDots.forEach(function (d, k) { d.addEventListener('click', function () { fStop(); fShow(k); fStart(); }); });
        spot.addEventListener('mouseenter', fStop);
        spot.addEventListener('mouseleave', fStart);
        fFill(featured[0]);
        fBadgeEl.textContent = featBadge[0];
        fStart();
      } else if (featured.length === 1) {
        var f0 = featured[0];
        $('[data-f-name]', spot).textContent = f0.nev;
        $('[data-f-desc]', spot).textContent = f0.leiras;
        $('[data-f-price]', spot).innerHTML = fmtAr(f0.ar);
        $('[data-f-link]', spot).href = 'termek.html?id=' + f0.id;
        $('[data-f-badge]', spot).textContent = featBadge[0];
      }
    }

    // hírlevél (demo)
    var nl = $('#sh-newsletter-form');
    if (nl) {
      nl.addEventListener('submit', function (e) {
        e.preventDefault();
        nl.reset();
        toast('Köszönjük! Feliratkoztál a hírlevélre (demo).');
      });
    }

  }

  /* ── KATEGÓRIA OLDAL: fazettás szűrőrendszer ─────────────────── */
  function renderKategoria() {
    var grid = $('#sh-cat-products');
    var pillWrap = $('#sh-cat-pills');
    var sortSel = $('#sh-sort');
    var title = $('#sh-cat-title');
    if (!grid) return;

    var active = param('cat') || 'all';
    var query = (param('q') || '').trim();

    /* ár-határok a kínálatból (a 0 lejes = ajánlat-alapú termékek nélkül) */
    var arak = SHOP_PRODUCTS.filter(function (p) { return p.ar > 0; }).map(function (p) { return p.ar; });
    var PMIN = Math.min.apply(null, arak);
    var PMAX = Math.max.apply(null, arak);

    /* szűrő-fazetták: címke + predikátum */
    function hasSpec(p, re) {
      return (p.specs || []).some(function (row) { return re.test(row[0]); });
    }
    var FEAT = {
      sale:  { label: 'Akciós',              test: function (p) { return !!(p.regi_ar && p.regi_ar > p.ar); } },
      uj:    { label: 'Újdonság',            test: function (p) { return p.badge === 'Új'; } },
      best:  { label: 'Bestseller',          test: function (p) { return p.badge === 'Bestseller'; } },
      led:   { label: 'LED-világítás',       test: function (p) { return hasSpec(p, /világítás/i); } },
      persz: { label: 'Személyre szabható',  test: function (p) { return p.szemelyre_szabott === true || hasSpec(p, /személyre szabás|testreszabás|felirat|gravírozás|egyediesítés/i); } },
      retur: { label: '14 napos elállás',    test: function (p) { return p.visszakuldheto === true; } },
      top:   { label: '4.8★ és fölötte',     test: function (p) { return parseFloat(ratingOf(p).r) >= 4.8; } }
    };
    var F = { min: PMIN, max: PMAX };
    Object.keys(FEAT).forEach(function (k) { F[k] = false; });

    function priceActive() { return F.min > PMIN || F.max < PMAX; }
  function passPrice(p) {
      if (!priceActive()) return true; /* teljes sávnál az ajánlat-alapú (0 lej) is látszik */
      if (V.isVariable(p)) return p.variaciok.some(function (v) { return V.available(v) && v.ar >= F.min && v.ar <= F.max; });
      return p.ar > 0 && p.ar >= F.min && p.ar <= F.max;
    }
    function baseList() {
      var list = SHOP_PRODUCTS.filter(function (p) { return active === 'all' || p.cat === active; });
      if (query) {
        list = searchProducts(list, query);
      }
      return list;
    }
    function filtered() {
      return baseList().filter(function (p) {
        if (!passPrice(p)) return false;
        for (var k in FEAT) if (F[k] && !FEAT[k].test(p)) return false;
        return true;
      });
    }
    function activeCount() {
      var n = priceActive() ? 1 : 0;
      for (var k in FEAT) if (F[k]) n++;
      return n;
    }

    /* kategória-pillek */
    pillWrap.innerHTML =
      '<button class="sh-pill" data-cat="all">Mind</button>' +
      visibleCats().map(function (c) {
        return '<button class="sh-pill" data-cat="' + c.id + '">' + esc(c.nev) + '</button>';
      }).join('');

    /* szűrőpanel felépítése */
    var panel = $('#sh-filters');
    var chipsEl = $('#sh-active-chips');
    var toggleBtn = $('#sh-filter-toggle');
    var toggleBadge = $('#sh-filter-badge');
    var overlay = $('#sh-filters-ov');
    if (panel) {
      var fcheck = function (k) {
        return '<label class="sh-fcheck"><input type="checkbox" data-f="' + k + '">' +
          '<i aria-hidden="true"></i><span>' + FEAT[k].label + '</span><b data-fc="' + k + '"></b></label>';
      };
      panel.innerHTML =
        '<div class="sh-filters__head">' +
          '<h3>Szűrők</h3>' +
          '<button type="button" id="sh-f-clear">Törlés</button>' +
          '<button type="button" class="sh-filters__close" id="sh-f-close" aria-label="Szűrők bezárása">✕</button>' +
        '</div>' +
        '<div class="sh-fgroup">' +
          '<h4>Ár</h4>' +
          '<div class="sh-range">' +
            '<div class="sh-range__track"><i id="sh-range-fill"></i></div>' +
            '<input type="range" id="sh-rmin" min="' + PMIN + '" max="' + PMAX + '" value="' + PMIN + '" step="5" aria-label="Minimum ár">' +
            '<input type="range" id="sh-rmax" min="' + PMIN + '" max="' + PMAX + '" value="' + PMAX + '" step="5" aria-label="Maximum ár">' +
          '</div>' +
          '<div class="sh-range__vals"><output id="sh-rmin-out"></output><output id="sh-rmax-out"></output></div>' +
        '</div>' +
        '<div class="sh-fgroup"><h4>Ajánlatok</h4>' + fcheck('sale') + fcheck('uj') + fcheck('best') + '</div>' +
        '<div class="sh-fgroup"><h4>Tulajdonságok</h4>' + fcheck('led') + fcheck('persz') + fcheck('retur') + '</div>' +
        '<div class="sh-fgroup"><h4>Értékelés</h4>' + fcheck('top') + '</div>' +
        '<button class="sh-btn sh-btn--primary sh-filters__apply" id="sh-f-apply" type="button">Mutasd a találatokat</button>' +
        /* döntéssegítő: aki elveszik a szűrőkben, azt a kvíz vezeti tovább */
        '<a class="sh-fquiz" href="kviz.html">' +
          '<b>Nem tudod, mit válassz?</b>' +
          '<span>4 kérdés, és mutatjuk, mi illik hozzá.</span>' +
          '<i>Ajándékkereső kvíz ›</i>' +
        '</a>';
    }

    /* ár-csúszka */
    var rmin = $('#sh-rmin'), rmax = $('#sh-rmax'), rfill = $('#sh-range-fill');
    var outMin = $('#sh-rmin-out'), outMax = $('#sh-rmax-out');
    function syncRange(which) {
      var a = parseInt(rmin.value, 10), b = parseInt(rmax.value, 10);
      if (a > b - 10) {
        if (which === 'min') { a = Math.max(PMIN, b - 10); rmin.value = a; }
        else { b = Math.min(PMAX, a + 10); rmax.value = b; }
      }
      F.min = a; F.max = b;
      var span = PMAX - PMIN || 1;
      rfill.style.left = ((a - PMIN) / span * 100) + '%';
      rfill.style.right = (100 - (b - PMIN) / span * 100) + '%';
      outMin.textContent = fmtPrice(a);
      outMax.textContent = fmtPrice(b);
    }

    /* mobil drawer nyit/zár */
    function openFilters() {
      panel.classList.add('is-open');
      if (overlay) overlay.classList.add('is-on');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('sh-flock');
    }
    function closeFilters() {
      panel.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-on');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('sh-flock');
    }

    function chipHtml(k, label) {
      return '<button class="sh-chip" type="button" data-chip="' + k + '">' + esc(label) + '<i aria-hidden="true">✕</i></button>';
    }

    /* szerkesztőségi USP-csempe a rács közepén — csak bő találatlistánál,
       keresésnél soha (3 találat mellett töltelléknek hatna) */
    function uspTileHtml() {
      return '<div class="sh-grid-usp sh-reveal">' +
        '<span class="sh-label">Miért Layero?</span>' +
        '<h3>Minden darab rendelésre, rétegről rétegre készül.</h3>' +
        '<ul>' +
          '<li>' + ICO.clock + '<span><b>Rendelésre készül</b> saját műhelyünkben</span></li>' +
          '<li>' + ICO.shield + '<span><b>2 év jótállás</b> minden termékre</span></li>' +
          '<li>' + ICO.box + '<span>Egyetlen példány — <b>a te ötletedből</b></span></li>' +
        '</ul>' +
        '<a class="sh-link" href="kviz.html">Nem tudod, mit válassz? Kvíz ›</a>' +
      '</div>';
    }

    function draw() {
      var list = filtered();
      var sort = sortSel.value;
      if (sort === 'ar-fel')    list = list.slice().sort(function (a, b) { return a.ar - b.ar; });
      if (sort === 'ar-le')     list = list.slice().sort(function (a, b) { return b.ar - a.ar; });
      if (sort === 'ertekeles') list = list.slice().sort(function (a, b) { return parseFloat(ratingOf(b).r) - parseFloat(ratingOf(a).r); });
      if (sort === 'nev')       list = list.slice().sort(function (a, b) { return a.nev.localeCompare(b.nev, 'hu'); });

      var cat = catById(active);
      title.textContent = query
        ? 'Találatok erre: „' + query + '”'
        : (cat ? cat.nev : 'Összes termék');
      $('#sh-cat-count').textContent = list.length + ' termék';
      var lead = $('#sh-cat-lead');
      if (lead) {
        lead.textContent = query
          ? 'Keresési találatok a teljes Layero-kínálatból.'
          : (cat ? cat.leiras : 'A teljes kínálat — ajándékok és dekorációk a saját műhelyünkből.');
      }
      var kicker = $('#sh-cat-kicker');
      if (kicker) kicker.textContent = query ? 'Keresés' : 'Kollekció';
      document.title = (query ? 'Keresés: ' + query : (cat ? cat.nev : 'Összes termék')) + ' — Layero Shop';
      setMeta(cat ? cat.nev + ' — ' + cat.leiras + ' a Layero Shopban, egyedi 3D gyártásban.' : 'A Layero Shop teljes kínálata — személyre szabott 3D nyomtatott ajándékok és dekorációk.');

      var cards = list.map(prodCard);
      if (!query && cards.length >= 8) cards.splice(6, 0, uspTileHtml());
      grid.innerHTML = list.length
        ? cards.join('')
        : '<div class="sh-empty" style="grid-column:1/-1">Nincs a szűrőknek megfelelő termék. ' +
            '<button class="sh-empty__reset" type="button" data-f-reset>Szűrők törlése ›</button>' +
            '<div class="sh-empty__sugg">' +
              visibleCats().filter(function (c) { return !c.ajanlat; }).slice(0, 3).map(function (c) {
                return '<a href="kategoria.html?cat=' + c.id + '">' + esc(c.nev) + ' ›</a>';
              }).join('') +
            '</div></div>';

      $all('.sh-pill', pillWrap).forEach(function (b) {
        b.classList.toggle('is-on', !query && b.getAttribute('data-cat') === active);
      });

      /* fazetta-darabszámok (kategória + keresés + ár alapján) */
      var base = baseList().filter(passPrice);
      $all('[data-fc]', panel).forEach(function (el) {
        var k = el.getAttribute('data-fc');
        var n = base.filter(FEAT[k].test).length;
        el.textContent = n;
        el.closest('.sh-fcheck').classList.toggle('is-off', n === 0 && !F[k]);
      });

      /* aktív chipek + szűrő-gomb jelvény */
      var chips = '';
      if (priceActive()) chips += chipHtml('__price', F.min + '–' + fmtPrice(F.max));
      for (var k in FEAT) if (F[k]) chips += chipHtml(k, FEAT[k].label);
      if (chips) chips += '<button class="sh-chip sh-chip--clear" type="button" data-chip="__all">Összes törlése</button>';
      if (chipsEl) { chipsEl.innerHTML = chips; chipsEl.hidden = !chips; }
      var n = activeCount();
      if (toggleBadge) { toggleBadge.textContent = n; toggleBadge.hidden = n === 0; }

      observeReveals();
    }

    function clearFilters() {
      Object.keys(FEAT).forEach(function (k) { F[k] = false; });
      rmin.value = PMIN; rmax.value = PMAX;
      syncRange('min');
      $all('input[data-f]', panel).forEach(function (i) { i.checked = false; });
      draw();
    }

    /* események */
    pillWrap.addEventListener('click', function (e) {
      var b = e.target.closest('.sh-pill');
      if (!b) return;
      active = b.getAttribute('data-cat');
      query = '';
      history.replaceState(null, '', active === 'all' ? 'kategoria.html' : 'kategoria.html?cat=' + active);
      draw();
    });
    sortSel.addEventListener('change', draw);
    if (panel) {
      panel.addEventListener('change', function (e) {
        var i = e.target.closest('input[data-f]');
        if (!i) return;
        F[i.getAttribute('data-f')] = i.checked;
        draw();
      });
      rmin.addEventListener('input', function () { syncRange('min'); draw(); });
      rmax.addEventListener('input', function () { syncRange('max'); draw(); });
      $('#sh-f-clear').addEventListener('click', clearFilters);
      $('#sh-f-close').addEventListener('click', closeFilters);
      $('#sh-f-apply').addEventListener('click', closeFilters);
    }
    if (toggleBtn) toggleBtn.addEventListener('click', function () {
      if (panel.classList.contains('is-open')) closeFilters(); else openFilters();
    });
    if (overlay) overlay.addEventListener('click', closeFilters);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel && panel.classList.contains('is-open')) closeFilters();
    });
    chipsEl.addEventListener('click', function (e) {
      var c = e.target.closest('[data-chip]');
      if (!c) return;
      var k = c.getAttribute('data-chip');
      if (k === '__all') { clearFilters(); return; }
      if (k === '__price') { rmin.value = PMIN; rmax.value = PMAX; syncRange('min'); }
      else { F[k] = false; var box = $('input[data-f="' + k + '"]', panel); if (box) box.checked = false; }
      draw();
    });
    grid.addEventListener('click', function (e) {
      if (e.target.closest('[data-f-reset]')) clearFilters();
    });

    syncRange('min');
    draw();
  }

  /* ── TERMÉK OLDAL ────────────────────────────────────────────── */
  function renderTermek() {
    var mount = $('#sh-product-mount');
    if (!mount) return;
    var originalId = param('id');
    var entry = V.lookup(SHOP_PRODUCTS, originalId);
    var p = entry ? entry.product : SHOP_PRODUCTS[0];
    var initialVariation = entry && entry.variation ? entry.variation : V.find(p, param('valtozat'));
    if (entry && entry.variation) {
      var canonical = new URL(location.href); canonical.searchParams.set('id', p.id); canonical.searchParams.set('valtozat', entry.variation.id);
      history.replaceState(null, '', canonical.href);
    }
    var selectionState = { current: null };
    trackProductEvent('product_view', p);
    var cat = catById(p.cat);
    var kerheto = p.ar > 0;
    /* A termékkezelő-szinkron explicit flageket ad; a régi demo-adatoknál (undefined)
       marad az eddigi viselkedés: minden kérhető terméken látszik a névmező. */
    var szemelyre = p.szemelyre_szabott !== undefined ? p.szemelyre_szabott === true : kerheto;
    var eloreFizetes = p.csak_elore_fizetes === true;
    function productAttr(value) { return esc(String(value)).replace(/"/g, '&quot;'); }

    document.title = p.nev + ' — Layero Shop';
    setMeta(p.leiras);

    // SEO: Product + morzsamenü strukturált adat
    var rtLd = ratingOf(p);
    var prodLd = {
      '@context': 'https://schema.org', '@type': 'Product',
      name: p.nev, description: p.leiras,
      image: p.kepek.map(absUrl),
      brand: { '@type': 'Brand', name: 'Layero' }
    };
    if (rtLd.n) prodLd.aggregateRating = { '@type': 'AggregateRating', ratingValue: rtLd.r, reviewCount: rtLd.n };
    if (V.isVariable(p)) prodLd.offers = { '@type': 'AggregateOffer', lowPrice: V.range(p).min, highPrice: V.range(p).max, priceCurrency: 'RON', offerCount: p.variaciok.length, url: location.href };
    else if (p.ar > 0) prodLd.offers = { '@type': 'Offer', price: p.ar, priceCurrency: 'RON', availability: 'https://schema.org/InStock', url: location.href };
    injectJsonLd(prodLd);
    injectJsonLd({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Shop', item: absUrl('index.html') },
        { '@type': 'ListItem', position: 2, name: cat ? cat.nev : 'Termékek', item: absUrl('kategoria.html?cat=' + p.cat) },
        { '@type': 'ListItem', position: 3, name: p.nev, item: location.href }
      ]
    });

    mount.innerHTML =
      '<nav class="sh-crumbs shop-wrap" aria-label="Morzsamenü">' +
        '<a href="index.html">Shop</a><span aria-hidden="true">/</span>' +
        '<a href="kategoria.html?cat=' + p.cat + '">' + (cat ? esc(cat.nev) : '') + '</a><span aria-hidden="true">/</span>' +
        '<span>' + esc(p.nev) + '</span>' +
      '</nav>' +
      '<div class="sh-product shop-wrap">' +
        '<div class="sh-pgallery">' +
          '<div class="sh-pstage">' +
            '<button type="button" class="sh-pgallery__main" aria-label="Termékkép nagyítása" aria-haspopup="dialog"><img id="sh-pmain" src="' + productAttr(p.kepek[0]) + '" alt="' + productAttr(p.nev) + '" fetchpriority="high" decoding="async"></button>' +
            (window.LayeroBadges ? productBadgeDetails(p) : '<div class="sh-pstage__badges">' +
              (discountPct(p) ? '<span class="sh-pstage__sale">−' + discountPct(p) + '%</span>' : '') +
              (szemelyre ? '<span>Személyre szabható</span>' : '<span>Layero kollekció</span>') +
            '</div>') +
            '<button class="sh-heart sh-pstage__wish' + (wishHas(p.id) ? ' is-on' : '') + '" type="button" data-wish="' + productAttr(p.id) + '" aria-label="Kedvencekhez" aria-pressed="' + wishHas(p.id) + '">' + HEART_SVG + '</button>' +
          '</div>' +
          '<div class="sh-pgallery__caption"><span>Kép <b id="sh-gallery-index">01</b> / ' + String(p.kepek.length).padStart(2, '0') + '</span><span>Kattints a nagyításhoz</span></div>' +
          '<div class="sh-pgallery__thumbs" aria-label="Termékképek">' +
            p.kepek.map(function (src, i) {
              return '<button type="button" class="' + (i === 0 ? 'is-on' : '') + '" data-src="' + productAttr(src) + '" aria-label="' + (i + 1) + '. termékkép" aria-pressed="' + (i === 0) + '"><img src="' + productAttr(src) + '" alt="" loading="lazy" decoding="async"><span aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span></button>';
            }).join('') +
          '</div>' +
          (szemelyre && kerheto ? '<div class="sh-pname-preview"><div><b>A te feliratod</b><small>Szemléltetés; az elhelyezést egyeztetjük.</small></div><span id="sh-persz-view">A TE NEVED</span></div>' : '') +
        '</div>' +
        '<div class="sh-pinfo">' +
          '<span class="sh-pinfo__cat">Layero kollekció / ' + (cat ? esc(cat.nev) : 'Egyedi tárgyak') + '</span>' +
          '<h1>' + esc(p.nev) + '</h1>' +
          '<p class="sh-pinfo__desc">' + esc(p.leiras) + '</p>' +
          (rateHtml(p, true) || (kerheto ? '<a class="sh-pinfo__review" href="#sh-velemenyek"><span aria-hidden="true">☆</span> Még nincs értékelés</a>' : '')) +
          '<div class="sh-pprice"><div><div class="sh-pinfo__price">' + (V.isVariable(p) ? priceHtml(p) : fmtAr(p.ar)) +
            (discountPct(p) ? '<del>' + fmtPrice(p.regi_ar) + '</del>' : '') +
            '</div>' + (kerheto ? '<small>RON / darab</small>' : '<small>A részletek alapján egyeztetjük</small>') + '</div>' +
          '</div>' +
          (kerheto ?
            (szemelyre ?
              '<div class="sh-personalize"><div class="sh-personalize__heading"><span aria-hidden="true">✎</span><h2>Tedd személyessé</h2><small>Opcionális</small></div>' +
                '<div class="sh-personalize__label"><label for="sh-persz">Felirat / név</label><span id="sh-persz-count">0 / 18</span></div>' +
                '<input class="sh-persz-input" id="sh-persz" type="text" maxlength="18" placeholder="Például: Olivér" autocomplete="off" aria-describedby="sh-persz-help">' +
                '<p class="sh-persz-hint" id="sh-persz-help">Legfeljebb 18 karakter. A pontos elhelyezést a tervezéskor egyeztetjük.</p>' +
              '</div>' : '') +
            optionRowsHtml(p, 'data-product-option', true) +
            (V.isVariable(p) ? '<p class="sh-variation-status" role="status" data-variation-status>Válaszd ki a neked tetsző változatot.</p><button type="button" class="sh-variation-reset" data-variation-reset>Választás törlése</button>' : '') +
            (eloreFizetes ?
              '<div class="sh-prepay" style="margin:12px 0;padding:12px 14px;border:1px solid #e0b64f;background:#fdf6e3;border-radius:10px;font-size:.85rem;line-height:1.55">' +
                '💳 <b>Csak előre fizetéssel rendelhető</b> — bankkártya, Apple Pay, Google Pay vagy banki átutalás. ' +
                'Utánvét (ramburs) személyre szabott terméknél nem elérhető.<br>' +
                '<span style="color:var(--faint)">Doar cu plată în avans — plata ramburs nu este disponibilă pentru produsele personalizate.</span>' +
              '</div>' : '') +
            '<div class="sh-order-total" aria-live="polite"><span>Összesen · <span id="sh-order-count">1</span> darab</span><strong id="sh-order-total">' + fmtPrice(p.ar) + '</strong></div>' +
            '<div class="sh-buy-row">' +
              '<div class="sh-qty">' +
                '<button type="button" id="sh-qty-minus" aria-label="Kevesebb">−</button>' +
                '<output id="sh-qty-val">1</output>' +
                '<button type="button" id="sh-qty-plus" aria-label="Több">+</button>' +
              '</div>' +
              '<button class="sh-btn sh-btn--primary" id="sh-add-btn" type="button">' + CART_ICON + '<span>Kosárba teszem</span><span aria-hidden="true">→</span></button>' +
            '</div>' +
            '<p class="sh-product-demo">Előnézeti kosár — itt még nem adsz le rendelést.</p>' +
            payChipsHtml(!eloreFizetes) +
            '<div class="sh-notify-wrap" id="sh-notify-wrap"></div>'
          :
            '<div class="sh-buy-row"><a class="sh-btn sh-btn--primary" href="kapcsolat.html">Ajánlatot kérek</a></div>'
          ) +
          '<ul class="sh-product-benefits">' +
            '<li>' + ICO.pin + '<span><b>Saját műhely</b><small>Szatmárnémetiben</small></span></li>' +
            '<li>' + ICO.box + '<span><b>Gondos kivitelezés</b><small>Figyelem a részletekre</small></span></li>' +
            '<li>' + ICO.mail + '<a href="kapcsolat.html"><b>Kérdezz bátran</b><small>Segítünk az ötletedben</small></a></li>' +
          '</ul>' +
          '<div class="sh-product-volume"><span>Több darabban gondolkodsz?</span><a href="cegeknek.html">Kérj egyedi ajánlatot <span aria-hidden="true">→</span></a></div>' +
          '<div id="sh-bundle-mount"></div>' +
        '</div>' +
      '</div>' +
      '<div data-product-tabs><nav class="sh-product-nav" aria-label="Termékinformációk"><div class="shop-wrap"><a href="#sh-product-details">A termékről</a><a href="#sh-velemenyek">Vélemények <span class="sh-tab-count">' + productReviews(p).length + '</span></a><a href="#sh-product-related">Hasonló darabok</a></div></nav>' +
      /* hosszú leírás + specifikáció */
      '<section class="sh-band sh-product-details" id="sh-product-details" data-product-panel>' +
        '<div class="shop-wrap sh-longdesc">' +
          '<div class="sh-longdesc__text">' +
            '<span class="sh-label sh-kicker">Ismerd meg közelebbről</span><h2 class="sh-h2">A részletekben rejlik.</h2>' +
            (p.hosszu || [p.leiras]).map(function (bek) { return '<p>' + esc(bek) + '</p>'; }).join('') +
          '</div>' +
          '<aside class="sh-specs">' +
            '<h3>Specifikáció</h3>' +
            '<table>' +
              (p.specs || []).filter(visibleProductSpec).map(function (row) {
                return '<tr><td>' + esc(row[0]) + '</td><td>' + esc(row[1]) + '</td></tr>';
              }).join('') +
            '</table>' +
          '</aside>' +
        '</div>' +
      '</section>' +
      /* vélemények + Q&A */
      reviewsHtml(p) +
      /* hasonló termékek */
      '<section class="sh-section shop-wrap" id="sh-product-related" data-product-panel>' +
        '<div class="sh-section-hd"><span class="sh-label sh-kicker">Ajánló</span><h2 class="sh-h2">Hasonló termékek.</h2><a class="sh-link" href="kategoria.html?cat=' + p.cat + '">Összes ›</a></div>' +
        '<div class="sh-prod-grid">' +
          SHOP_PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4).map(prodCard).join('') +
        '</div>' +
      '</section></div>';

    // galéria váltás
    $all('.sh-pgallery__thumbs button', mount).forEach(function (b, index) {
      b.addEventListener('click', function () {
        $all('.sh-pgallery__thumbs button', mount).forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('is-on');
        b.setAttribute('aria-pressed', 'true');
        $('#sh-gallery-index', mount).textContent = String(index + 1).padStart(2, '0');
        var img = $('#sh-pmain');
        img.src = b.getAttribute('data-src');
      });
    });

    if (kerheto) {
      // termékenként engedélyezett választók
      $all('[data-product-option]', mount).filter(function (row) { return !row.closest('.sh-opt--variation'); }).forEach(function (row) {
        row.addEventListener('click', function (e) {
          var b = e.target.closest('button');
          if (!b) return;
          $all('button', row).forEach(function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
        });
      });
      // mennyiség
      var qty = 1;
      var out = $('#sh-qty-val');
      function updateQuantity(next) {
        qty = Math.max(1, Math.min(selectionState.current ? Math.max(1, V.limit(selectionState.current)) : 99, next));
        out.textContent = qty;
        $('#sh-order-count').textContent = qty;
        $('#sh-order-total').textContent = V.isVariable(p) && !selectionState.current ? 'Válassz változatot' : fmtPrice(Math.round((selectionState.current ? selectionState.current.ar : p.ar) * qty * 100) / 100);
        $('#sh-qty-minus').disabled = qty === 1;
        $('#sh-qty-plus').disabled = qty >= (selectionState.current ? V.limit(selectionState.current) : 99);
      }
      $('#sh-qty-minus').addEventListener('click', function () { updateQuantity(qty - 1); });
      $('#sh-qty-plus').addEventListener('click', function () { updateQuantity(qty + 1); });
      updateQuantity(1);
      if (V.isVariable(p)) selectionState = bindVariations(mount, p, '[data-product-option]', initialVariation, function (v) {
        selectionState.current = v;
        $('.sh-pinfo__price', mount).innerHTML = priceHtml(v ? V.view(p, v) : p);
        $('#sh-add-btn').disabled = !V.available(v);
        if (v) {
          var url = new URL(location.href); url.searchParams.set('valtozat', v.id); history.replaceState(null, '', url.href);
          var img = $('#sh-pmain'); img.src = (v.kepek || p.kepek)[0]; img.alt = p.nev + ' – ' + V.label(p, v);
          $all('.sh-pgallery__thumbs button', mount).forEach(function (b, i) {
            var on = b.getAttribute('data-src') === img.getAttribute('src'); b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on));
            if (on) $('#sh-gallery-index', mount).textContent = String(i + 1).padStart(2, '0');
          });
        } else { var clearUrl = new URL(location.href); clearUrl.searchParams.delete('valtozat'); history.replaceState(null, '', clearUrl.href); }
        updateQuantity(qty);
        var sticky = $('.sh-stickybar');
        if (sticky) { var button = $('button', sticky); if (button) button.disabled = !V.available(v); $('strong', sticky).textContent = v ? fmtPrice(v.ar) : 'Válassz változatot'; if (v) $('img', sticky).src = v.kepek[0]; }
      });

      // Élő felirat-előnézet a galéria alatti külön kártyán.
      /* A névmező csak személyre szabható terméknél létezik */
      var persz = $('#sh-persz');
      var perszView = $('#sh-persz-view');
      if (persz) {
        persz.addEventListener('input', function () {
          var v = persz.value.trim();
          perszView.textContent = v || 'A TE NEVED';
          $('#sh-persz-count').textContent = persz.value.length + ' / 18';
        });
        // URL-ből érkező név előtöltése
        var labNev = (param('nev') || '').trim().slice(0, 18);
        if (labNev) {
          persz.value = labNev;
          persz.dispatchEvent(new Event('input'));
        }
      }

      // kosárba tétel (a sticky sáv is ezt hívja)
      function doAdd() {
        var extra = selectedOptionText(mount, '.sh-opt:not(.sh-opt--variation) [data-product-option]');
        var variant = selectionState.current ? V.label(p, selectionState.current) : selectedOptionText(mount, '[data-product-option]');
        if (selectionState.current && extra) variant += ' · ' + extra;
        var felirat = persz ? persz.value.trim() : '';
        if (felirat) variant += (variant ? ' · ' : '') + '„' + felirat + '”';
        if (!cartAdd(p.id, qty, variant, null, selectionState.current && selectionState.current.id, [extra, felirat].filter(Boolean).join(' · '))) return;
        openDrawer();
      }
      $('#sh-add-btn').addEventListener('click', doAdd);

      // áreséskori / elérhetőségi értesítés (retenció, demo)
      var nw = $('#sh-notify-wrap');
      if (nw) {
        nw.innerHTML = '<button class="sh-notify" type="button" id="sh-notify-btn">' + ICO.bell + 'Értesíts, ha akciós lesz</button>';
        $('#sh-notify-btn').addEventListener('click', function () {
          nw.innerHTML = '<form class="sh-notify-form"><input type="email" required placeholder="E-mail cím az értesítéshez" aria-label="E-mail az értesítéshez"><button class="sh-btn sh-btn--dark" type="submit">Kérem</button></form>';
          $('form', nw).addEventListener('submit', function (e) {
            e.preventDefault();
            try { var s = JSON.parse(localStorage.getItem('sh_notify') || '{}'); s[p.id] = 1; localStorage.setItem('sh_notify', JSON.stringify(s)); } catch (er) {}
            nw.innerHTML = '<p class="sh-notify-done">' + CHECK_SVG + ' Beállítottuk — szólunk e-mailben, ha ez a termék akcióba kerül (demo).</p>';
          });
        });
      }

      // A termékprofilban kezelt csomagok az egyetlen források; nincs véletlen ajánlás.
      var managedBundles = Array.isArray(p.csomagok) ? p.csomagok.filter(function (bundle) { return bundle && bundle.items && bundle.items.length; }) : [];
      var managedBundle = managedBundles[0];
      if (!managedBundle && p.kapcsolatok && Array.isArray(p.kapcsolatok.kiegeszitok) && p.kapcsolatok.kiegeszitok.length) {
        var managedAccessory = p.kapcsolatok.kiegeszitok[0];
        managedBundle = {
          title: 'Ajánlott kiegészítő',
          price: Number(p.ar) + Number(managedAccessory.target_price || 0),
          purchasable: managedAccessory.target_purchasable !== false,
          items: [
            { slug: p.id, name: p.nev, image: p.kepek[0], quantity: 1, required: true, purchasable: true },
            { slug: managedAccessory.target_slug, name: managedAccessory.target_name, image: managedAccessory.target_image, quantity: 1, required: false, purchasable: managedAccessory.target_purchasable !== false }
          ]
        };
      }
      if (managedBundle) {
        var bundleItems = managedBundle.items.map(function (item) {
          var linkedProduct = prodById(item.slug || item.target_slug);
          return {
            id: item.slug || item.target_slug,
            name: item.name || item.target_name || (linkedProduct && linkedProduct.nev) || '',
            image: item.image || item.target_image || (linkedProduct && linkedProduct.kepek && linkedProduct.kepek[0]) || '',
            quantity: Math.max(1, Number(item.quantity || 1)),
            required: item.required !== false,
            purchasable: item.purchasable !== false && !!linkedProduct,
            sku: item.sku || ''
          };
        });
        var bundleBlocked = managedBundle.purchasable === false || bundleItems.some(function (item) {
          var linkedProduct = prodById(item.id);
          return (item.required && !item.purchasable) || V.isVariable(linkedProduct) || (linkedProduct && linkedProduct.szemelyre_szabott === true);
        });
        $('#sh-bundle-mount').innerHTML =
          '<div class="sh-bundle">' +
            '<h3>' + esc(managedBundle.title || 'Gyakran veszik együtt') + '</h3>' +
            '<div class="sh-bundle__row">' +
              bundleItems.map(function (item, index) {
                return (index ? '<span class="sh-bundle__plus">+</span>' : '') +
                  '<figure><a href="termek.html?id=' + encodeURIComponent(item.id) + '"><img src="' + item.image + '" alt="' + esc(item.name) + '" loading="lazy" decoding="async"></a></figure>';
              }).join('') +
              '<div class="sh-bundle__info"><b>' + fmtPrice(Number(managedBundle.price || 0)) + ' együtt</b>' +
                bundleItems.map(function (item, index) {
                  return '<label>' + (!item.required ? '<input type="checkbox" data-bundle-optional="' + index + '" checked> ' : '') + esc(item.name) + (item.quantity > 1 ? ' × ' + item.quantity : '') + '</label>';
                }).join(' + ') +
                (bundleBlocked ? '<small>A személyre szabható vagy változatot igénylő darabokat a saját termékoldalukon állítsd be.</small>' : '') +
              '</div>' +
              '<button class="sh-btn sh-btn--dark" type="button" id="sh-bundle-add" ' + (bundleBlocked ? 'disabled' : '') + '>Mindet a kosárba</button>' +
            '</div>' +
          '</div>';
        $('#sh-bundle-add').addEventListener('click', function () {
          bundleItems.forEach(function (item, index) {
            var optional = $('[data-bundle-optional="' + index + '"]', $('#sh-bundle-mount'));
            if (!item.required && optional && !optional.checked) return;
            if (item.purchasable) cartAdd(item.id, item.quantity, item.sku ? 'SKU: ' + item.sku : '', {
              recommendation_source: 'bundle', bundle_id: managedBundle.id || null
            });
          });
          openDrawer();
          toast('A kiválasztott csomag a kosárba került.');
        });
      }

      // sticky kosárba-sáv, amikor a fő gomb kigördül a képből
      var bar = document.createElement('div');
      bar.className = 'sh-stickybar';
      bar.innerHTML =
        '<div class="sh-stickybar__inner">' +
          '<figure><img src="' + p.kepek[0] + '" alt="" loading="lazy" decoding="async"></figure>' +
          '<div class="sh-stickybar__name"><b>' + esc(p.nev) + '</b><span><strong>' + fmtAr(p.ar) + '</strong>' + '</span></div>' +
          '<button class="sh-btn sh-btn--primary" type="button">Kosárba</button>' +
        '</div>';
      document.body.appendChild(bar);
      if (V.isVariable(p)) { $('button', bar).disabled = !V.available(selectionState.current); $('strong', bar).textContent = selectionState.current ? fmtPrice(selectionState.current.ar) : 'Válassz változatot'; if (selectionState.current) $('img', bar).src = selectionState.current.kepek[0]; }
      $('button', bar).addEventListener('click', doAdd);
      if ('IntersectionObserver' in window) {
        var buyIO = new IntersectionObserver(function (entries) {
          bar.classList.toggle('is-on', !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
        }, { threshold: 0 });
        buyIO.observe($('#sh-add-btn', mount));
      }
    }

    // nemrég nézett termékek (localStorage)
    try {
      var recent = (window.LayeroConsent && window.LayeroConsent.allows('preferences') ? JSON.parse(localStorage.getItem('sh_recent') || '[]') : []).filter(function (id) { return id !== p.id && prodById(id); });
      if (recent.length) {
        var strip = document.createElement('section');
        strip.className = 'sh-section shop-wrap';
        strip.setAttribute('data-consent-recent', '');
        strip.innerHTML =
          '<div class="sh-section-hd"><h2 class="sh-h2">Nemrég nézted.</h2></div>' +
          '<div class="sh-prod-grid">' + recent.slice(0, 4).map(function (id) { return prodCard(prodById(id)); }).join('') + '</div>';
        mount.appendChild(strip);
      }
      recent.unshift(p.id);
      if (window.LayeroConsent && window.LayeroConsent.allows('preferences')) localStorage.setItem('sh_recent', JSON.stringify(recent.slice(0, 8)));
    } catch (e) { /* privát mód */ }

    // vélemények + Q&A eseménykötés
    // mérettáblázat modal
    var sg = $('[data-sizeguide]', mount);
    if (sg) sg.addEventListener('click', function () { openInfoModal('Mérettáblázat', sizeGuideHtml(p)); });
    // az imént kirenderelt kártyák (hasonló / nemrég nézett) össze­hasonlítás-gombjai
    syncCompareUI();

    observeReveals();
  }

  /* ── KOSÁR OLDAL ─────────────────────────────────────────────── */
  function renderKosar() {
    var mount = $('#sh-cart-mount');
    if (!mount) return;

    function draw() {
      var t = cartTotals();
      var items = t.items;
      if (!items.length) {
        mount.innerHTML =
          '<div class="sh-cart-empty shop-wrap">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.5 12.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>' +
            '<h2>A kosarad üres</h2>' +
            '<p>Nézz körül a személyes ajándékok és dekorációk között.</p>' +
            '<a class="sh-btn sh-btn--primary" href="kategoria.html">Vásárlás megkezdése</a>' +
          '</div>';
        return;
      }

      var rows = items.map(function (r) {
        var it = r.it, p = r.p, tetel = r.sor;
        return '<div class="sh-cart-item" data-key="' + esc(it.key) + '">' +
          '<figure><a href="termek.html?id=' + p.id + '"><img src="' + p.kepek[0] + '" alt="' + esc(p.nev) + '" loading="lazy" decoding="async"></a></figure>' +
          '<div>' +
            '<div class="sh-cart-item__name">' + esc(p.nev) + '</div>' +
            (it.variant ? '<div class="sh-cart-item__meta">' + esc(it.variant) + '</div>' : '') +
            (r.invalid ? '<p class="sh-cart-variation-error">Ez a változat vagy mennyiség már nem elérhető. <a href="termek.html?id=' + esc(p.id) + '">Válassz újra</a>, vagy távolítsd el.</p>' : '') +
            '<div class="sh-cart-item__actions">' +
              '<div class="sh-qty">' +
                '<button type="button" data-act="minus" aria-label="Kevesebb">−</button>' +
                '<output>' + it.qty + '</output>' +
                '<button type="button" data-act="plus" aria-label="Több">+</button>' +
              '</div>' +
              '<button class="sh-cart-item__remove" type="button" data-act="remove">Eltávolítás</button>' +
            '</div>' +
          '</div>' +
          '<div class="sh-cart-item__price">' + fmtPrice(tetel) + '</div>' +
        '</div>';
      }).join('');

      var minHianyzik = t.belowMin;
      // keresztértékesítés: olcsó kiegészítők, amik még nincsenek a kosárban
      var cartIds = items.map(function (r) { return r.it.id; });
      var extrak = SHOP_PRODUCTS.filter(function (x) {
        return x.ar > 0 && x.ar <= 150 && cartIds.indexOf(x.id) === -1;
      }).sort(function (a, b) { return a.ar - b.ar; }).slice(0, 3);

      var shipPct = Math.min(100, Math.floor(t.subtotal / FREE_SHIP * 100));
      mount.innerHTML =
        '<div class="shop-wrap"><h1 class="sh-cart-title">Kosár<small>' + cartCount() + ' tétel</small></h1></div>' +
        '<div class="sh-cart-layout shop-wrap">' +
          '<div>' +
            '<div id="sh-cart-items">' + rows + '</div>' +
            (extrak.length ?
              '<div class="sh-crosssell"><h3>Tedd mellé — jól passzol a kosaradhoz</h3><div class="sh-crosssell__row">' +
                extrak.map(function (x) {
                  return '<div class="sh-crosssell__item">' +
                    '<figure><a href="termek.html?id=' + x.id + '"><img src="' + x.kepek[0] + '" alt="' + esc(x.nev) + '" loading="lazy" decoding="async"></a></figure>' +
                    '<div><b>' + esc(x.nev) + '</b>' + fmtPrice(x.ar) + '</div>' +
                    (x.szemelyre_szabott === true ? personalizeLink(x, 'sh-crosssell__personalize', true) : '<button type="button" data-add="' + x.id + '" aria-label="Kosárba: ' + esc(x.nev) + '">+</button>') +
                  '</div>';
                }).join('') +
              '</div></div>' : '') +
          '</div>' +
          '<aside class="sh-summary">' +
            '<h2>Összesítő</h2>' +
            '<div class="sh-shipbar">' +
              '<div class="sh-shipbar__label">' +
                (t.shipping === 0
                  ? (t.freeByCoupon
                      ? '<b>Ingyenes szállítás</b> — a kuponod aktiválva'
                      : '<b>Ingyenes szállítás</b> — elérted a 200 lejt 🎉')
                  : 'Még <b>' + fmtPrice(FREE_SHIP - t.subtotal) + '</b> az ingyenes szállításig') +
              '</div>' +
              '<div class="sh-shipbar__track"><div class="sh-shipbar__fill" style="width:' + shipPct + '%"></div></div>' +
            '</div>' +
            '<div class="sh-summary__row"><span>Részösszeg</span><span>' + fmtPrice(t.subtotal) + '</span></div>' +
            (t.discount ? '<div class="sh-summary__row"><span>Kedvezmény' + (t.coupon ? ' (' + t.coupon.code + ')' : '') + '</span><span>−' + fmtPrice(t.discount) + '</span></div>' : '') +
            (t.gift ? '<div class="sh-summary__row"><span>Ajándékcsomagolás</span><span>' + fmtPrice(t.gift) + '</span></div>' : '') +
            '<div class="sh-summary__row"><span>Szállítás</span><span>' + (t.shipping === 0 ? 'Ingyenes' : fmtPrice(t.shipping)) + '</span></div>' +
            '<div class="sh-summary__row total"><span>Összesen</span><span>' + fmtPrice(t.total) + '</span></div>' +
            '<a class="sh-btn sh-btn--primary" href="penztar.html"' + (minHianyzik ? ' aria-disabled="true" style="opacity:.45;pointer-events:none"' : '') + '>Tovább a pénztárhoz</a>' +
            (t.invalid ? '<p class="sh-cart-variation-error">A folytatáshoz javítsd a jelzett tételeket.</p>' : minHianyzik ? '<p class="sh-summary__hint" style="color:var(--gold)">A minimális rendelési érték ' + fmtPrice(MIN_ORDER) + ' — még ' + fmtPrice(MIN_ORDER - t.subtotal) + ' hiányzik.</p>' : '') +
            (items.some(function (r) { return r.p.csak_elore_fizetes === true; })
              ? payChipsHtml(false) + '<p class="sh-summary__hint">A kosárban személyre szabott termék van, ezért <b>utánvét nem elérhető</b>.</p>'
              : payChipsHtml(true)) +
          '</aside>' +
        '</div>';

      $all('[data-add]', mount).forEach(function (b) {
        b.addEventListener('click', function (event) {
          event.stopPropagation();
          if (!cartAdd(b.getAttribute('data-add'), 1, '')) return;
          toast('A kosárba került!');
          draw();
        });
      });

      $('#sh-cart-items').addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-act]');
        if (!btn) return;
        var key = btn.closest('.sh-cart-item').getAttribute('data-key');
        var items2 = cartGet();
        var it = null;
        items2.forEach(function (x) { if (x.key === key) it = x; });
        if (!it) return;
        var act = btn.getAttribute('data-act');
        if (act === 'plus') changeCartQuantity(items2, it, 1);
        if (act === 'minus') changeCartQuantity(items2, it, -1);
        if (act === 'remove') items2 = items2.filter(function (x) { return x.key !== key; });
        cartSet(items2);
        draw();
      });

    }
    draw();
  }

  /* ── PÉNZTÁR (checkout) ──────────────────────────────────────── */
  function renderPenztar() {
    var mount = $('#sh-checkout-mount');
    if (!mount) return;
    var t = cartTotals();
    if (!t.items.length) {
      mount.innerHTML =
        '<div class="sh-cart-empty shop-wrap">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1.5 12.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>' +
          '<h2>A kosarad üres</h2><p>Előbb tegyél be valamit a kosaradba.</p>' +
          '<a class="sh-btn sh-btn--primary" href="kategoria.html">Vásárlás</a>' +
        '</div>';
      return;
    }

    t.items.forEach(function (row) {
      trackProductEvent('begin_checkout', row.p, { quantity: row.it.qty, value: row.sor });
    });

    var shipSel = 'futar';
    var paySel = 'kartya';

    function summaryHtml() {
      var tt = cartTotals({ ship: shipSel, pay: paySel });
      return '<h3>Rendelésed</h3>' +
        tt.items.map(function (r) {
          return '<div class="sh-co-line">' +
            '<figure><img src="' + r.p.kepek[0] + '" alt="" loading="lazy" decoding="async"><span class="qtb">' + r.it.qty + '</span></figure>' +
            '<div><b>' + esc(r.p.nev) + '</b>' + (r.it.variant ? '<small>' + esc(r.it.variant) + '</small>' : '') + '</div>' +
            '<span class="pr">' + fmtPrice(r.sor) + '</span>' +
          '</div>';
        }).join('') +
        '<div style="height:12px"></div>' +
        '<div class="sh-sumrow"><span>Részösszeg</span><span>' + fmtPrice(tt.subtotal) + '</span></div>' +
        (tt.discount ? '<div class="sh-sumrow disc"><span>Kedvezmény' + (tt.coupon ? ' (' + tt.coupon.code + ')' : '') + '</span><span>−' + fmtPrice(tt.discount) + '</span></div>' : '') +
        (tt.gift ? '<div class="sh-sumrow"><span>Ajándékcsomagolás</span><span>' + fmtPrice(tt.gift) + '</span></div>' : '') +
        '<div class="sh-sumrow"><span>Szállítás</span><span>' + (tt.shipping === 0 ? 'Ingyenes' : fmtPrice(tt.shipping)) + '</span></div>' +
        (tt.codFee ? '<div class="sh-sumrow"><span>Utánvét felár</span><span>+' + fmtPrice(tt.codFee) + '</span></div>' : '') +
        '<div class="sh-sumrow total"><span>Fizetendő</span><span>' + fmtPrice(tt.total) + '</span></div>' +
        (tt.belowMin ? '<p class="sh-cart-variation-error">' + (tt.invalid ? 'Egy változat vagy mennyiség már nem elérhető.' : 'A minimális rendelési érték 50 RON.') + ' <a href="kosar.html">Vissza a kosárhoz</a></p>' : '') +
        '<button class="sh-btn sh-btn--primary" type="submit" form="sh-co-form"' + (tt.belowMin ? ' disabled' : '') + '>Megrendelés elküldése</button>' +
        '<ul class="sh-co-trust">' +
          '<li>' + ICO.shield + ' SSL-titkosított, biztonságos fizetés</li>' +
          '<li>' + ICO.shield + ' 2 év törvényi jótállás minden termékre</li>' +
          '<li>' + ICO.retur + ' 14 napos elállás a nem személyre szabott termékekre</li>' +
          '<li>' + ICO.invoice + ' Számlát adunk minden rendeléshez</li>' +
        '</ul>' +
        payChipsHtml(false);
    }

    /* Ha a kosárban előre fizetendő (személyre szabott) termék van, az utánvét tiltott */
    var prepayOnly = t.items.some(function (r) { return r.p.csak_elore_fizetes === true; });
    var prepayNames = t.items.filter(function (r) { return r.p.csak_elore_fizetes === true; })
      .map(function (r) { return r.p.nev; });

    mount.innerHTML =
      '<div class="shop-wrap">' +
        '<h1 class="sh-checkout__title">Pénztár</h1><p role="status">Előnézet: ezen az oldalon még nem lehet rendelést leadni vagy fizetni.</p>' +
        '<div class="sh-checkout__steps"><b>1. Adatok</b> › <b>2. Szállítás</b> › <b>3. Fizetés</b> › <span>4. Kész</span></div>' +
        '<div class="sh-checkout">' +
          '<form id="sh-co-form" novalidate>' +
            '<div class="sh-co-block"><h3><i>1</i> Kapcsolat és számlázás</h3>' +
              '<div class="sh-form__row"><div class="sh-field"><label>Teljes név</label><input required name="nev" autocomplete="name"></div>' +
              '<div class="sh-field"><label>E-mail</label><input required type="email" name="email" autocomplete="email"></div></div>' +
              '<div class="sh-form__row"><div class="sh-field"><label>Telefon</label><input required name="tel" autocomplete="tel"></div>' +
              '<div class="sh-field"><label>Irányítószám</label><input required name="zip" autocomplete="postal-code"></div></div>' +
              '<div class="sh-form__row"><div class="sh-field"><label>Város</label><input required name="varos" autocomplete="address-level2"></div>' +
              '<div class="sh-field"><label>Cím</label><input required name="cim" autocomplete="street-address"></div></div>' +
            '</div>' +
            '<div class="sh-co-block"><h3><i>2</i> Szállítási mód</h3><div class="sh-co-choice" data-co-ship>' +
              '<label class="sh-co-opt is-on" data-val="futar"><span class="sh-co-opt__radio"></span><div><b>Futárszolgálat — házhoz</b><small>1–2 munkanap a feladás után</small></div><span class="pr" data-ship-futar>' + (t.shipping === 0 ? 'Ingyenes' : fmtPrice(t.shipping)) + '</span></label>' +
              '<label class="sh-co-opt" data-val="csomagpont"><span class="sh-co-opt__radio"></span><div><b>Csomagpont átvétel</b><small>Easybox / posta, 2–3 munkanap</small></div><span class="pr">' + (cartTotals({ ship: 'csomagpont', pay: paySel }).shipping === 0 ? 'Ingyenes' : fmtPrice(SHIP_FEE_LOCKER)) + '</span></label>' +
              '<label class="sh-co-opt" data-val="szemelyes"><span class="sh-co-opt__radio"></span><div><b>Személyes átvétel</b><small>Szatmárnémeti, műhelyünkben</small></div><span class="pr">Ingyenes</span></label>' +
            '</div></div>' +
            '<div class="sh-co-block"><h3><i>3</i> Fizetési mód</h3>' +
              (prepayOnly
                ? '<p style="margin:0 0 10px;padding:10px 12px;border:1px solid #e0b64f;background:#fdf6e3;border-radius:10px;font-size:.83rem;line-height:1.5">' +
                    '💳 A kosaradban személyre szabott termék van (' + prepayNames.map(esc).join(', ') + '), ezért <b>csak előre fizetés lehetséges</b> — az utánvét nem elérhető.<br>' +
                    '<span style="color:var(--faint)">Coșul conține produse personalizate — doar plată în avans, ramburs indisponibil.</span></p>'
                : '') +
              '<div class="sh-co-choice" data-co-pay>' +
              '<label class="sh-co-opt is-on" data-val="kartya"><span class="sh-co-opt__radio"></span><div><b>Bankkártya</b><small>VISA, Mastercard, Apple Pay, Google Pay</small></div></label>' +
              (prepayOnly
                ? '<label class="sh-co-opt" data-val="utanvet" data-disabled="1" aria-disabled="true" style="opacity:.45;pointer-events:none"><span class="sh-co-opt__radio"></span><div><b>Utánvét</b><small>Nem elérhető — a kosárban előre fizetendő, személyre szabott termék van</small></div></label>'
                : '<label class="sh-co-opt" data-val="utanvet"><span class="sh-co-opt__radio"></span><div><b>Utánvét</b><small>Fizetés átvételkor a futárnál (+' + fmtPrice(COD_FEE) + ')</small></div></label>') +
              '<label class="sh-co-opt" data-val="atutalas"><span class="sh-co-opt__radio"></span><div><b>Banki átutalás</b><small>A visszaigazoló e-mailben küldjük az adatokat</small></div></label>' +
            '</div></div>' +
            '<div class="sh-co-block">' +
              '<div class="sh-giftwrap' + (t.gift ? ' is-on' : '') + '" data-co-gift role="button" tabindex="0">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7S10 2 7 3.5 9 7 12 7ZM12 7s2-5 5-3.5S15 7 12 7Z"/></svg>' +
                '<div><b>Ajándékcsomagolás</b><small>Díszdoboz + kézzel írt üzenet · +' + GIFTWRAP_FEE + ' lej</small></div>' +
                '<span class="sh-giftwrap__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>' +
              '</div>' +
              '<div class="sh-coupon"><input type="text" placeholder="Kuponkód" data-co-coupon-input value="' + (t.coupon ? t.coupon.code : '') + '"><button type="button" data-co-coupon>Beváltás</button></div>' +
              '<p class="sh-coupon__msg' + (t.coupon ? ' ok' : '') + '" data-co-coupon-msg>' + (t.coupon ? 'Kupon: ' + t.coupon.def.cimke : '') + '</p>' +
            '</div>' +
          '</form>' +
          '<aside class="sh-co-summary" id="sh-co-summary">' + summaryHtml() + '</aside>' +
        '</div>' +
      '</div>';

    function refresh() { $('#sh-co-summary').innerHTML = summaryHtml(); }

    // választók
    $all('[data-co-ship] .sh-co-opt, [data-co-pay] .sh-co-opt', mount).forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        if (opt.getAttribute('data-disabled')) return;
        var group = opt.parentNode;
        $all('.sh-co-opt', group).forEach(function (o) { o.classList.remove('is-on'); });
        opt.classList.add('is-on');
        if (opt.closest('[data-co-ship]')) shipSel = opt.getAttribute('data-val');
        if (opt.closest('[data-co-pay]')) paySel = opt.getAttribute('data-val');
        refresh();
      });
    });
    // ajándékcsomagolás
    $('[data-co-gift]', mount).addEventListener('click', function () { giftSet(!giftGet()); this.classList.toggle('is-on', giftGet()); refresh(); });
    // kupon
    $('[data-co-coupon]', mount).addEventListener('click', function () {
      var code = ($('[data-co-coupon-input]', mount).value || '').trim().toUpperCase();
      var msg = $('[data-co-coupon-msg]', mount);
      if (COUPONS[code]) { couponSet(code); msg.className = 'sh-coupon__msg ok'; msg.textContent = 'Kupon: ' + COUPONS[code].cimke; refresh(); }
      else { couponSet(''); msg.className = 'sh-coupon__msg err'; msg.textContent = 'Érvénytelen kód.'; refresh(); }
    });
    // megrendelés
    $('#sh-co-form', mount).addEventListener('submit', function (e) {
      e.preventDefault();
      if (cartTotals().belowMin) { toast('Ellenőrizd a kosárban jelzett tételeket és a minimális rendelési értéket.'); return; }
      if (!this.checkValidity()) { this.reportValidity(); return; }
      // A browser preview must not create a fictitious order or clear the cart.
      openInfoModal('A rendelés még nem lett elküldve',
        '<p>Ez a webshop jelenleg előnézeti módban működik. Online rendelés és fizetés még nem érhető el.</p>' +
        '<p>A kosarad tartalmát megőriztük. Rendelési kérdéseddel <a href="kapcsolat.html">keress minket az elérhetőségeinken</a>.</p>');
    });
  }

  /* ── KAPCSOLAT OLDAL ─────────────────────────────────────────── */
  function renderKapcsolat() {
    var form = $('#sh-contact-form');
    if (!form) return;
    var fields = $('.sh-form__fields', form);
    form.setAttribute('novalidate', ''); // JS-validáció veszi át (szebb hibaüzenetek)

    // ?tema= előválasztás (pl. kapcsolat.html?tema=ceges)
    var tema = new URLSearchParams(location.search).get('tema');
    if (tema) {
      var r = $('.sh-ct-topics input[value="' + tema.replace(/[^a-z]/g, '') + '"]', form);
      if (r) r.checked = true;
    }

    // karakterszámláló
    var msg = $('#cf-uzenet', form);
    var count = $('#cf-count', form);
    if (msg && count) {
      var updCount = function () { count.textContent = msg.value.length + ' / ' + msg.getAttribute('maxlength'); };
      msg.addEventListener('input', updCount);
      updCount();
    }

    // mezőhibák: elhagyáskor jelez, gépelésre azonnal tisztul
    var errMsg = {
      'cf-nev': 'Add meg a neved, hogy tudjuk, kinek válaszolunk.',
      'cf-email': 'Érvényes e-mail címet adj meg — erre küldjük a választ.',
      'cf-uzenet': 'Írd le pár mondatban, miben segíthetünk.'
    };
    function setErr(field, on) {
      var wrap = field.closest('.sh-field');
      if (!wrap) return;
      wrap.classList.toggle('is-error', on);
      var err = $('.sh-field__err', wrap);
      if (on && !err) {
        err = document.createElement('small');
        err.className = 'sh-field__err';
        err.textContent = errMsg[field.id] || 'Ellenőrizd ezt a mezőt.';
        wrap.appendChild(err);
      } else if (!on && err) err.remove();
    }
    var reqFields = $all('input[required], textarea[required]', form);
    reqFields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) setErr(f, !f.checkValidity()); });
      f.addEventListener('input', function () { if (f.checkValidity()) setErr(f, false); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = null;
      reqFields.forEach(function (f) {
        var invalid = !f.checkValidity();
        setErr(f, invalid);
        if (invalid && !bad) bad = f;
      });
      if (bad) { bad.focus(); return; }

      var btn = $('.sh-ctform__send', form);
      if (btn) { btn.classList.add('is-busy'); btn.setAttribute('disabled', ''); btn.textContent = 'Küldés…'; }

      // demo: nincs backend — rövid „küldés" után siker-panel
      setTimeout(function () {
        if (fields) fields.hidden = true;
        var done = document.createElement('div');
        done.className = 'sh-ct-done';
        done.innerHTML =
          '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<circle cx="32" cy="32" r="28"/><path d="m21 33 8 8 15-16"/>' +
          '</svg>' +
          '<h2>Köszönjük, megkaptuk!</h2>' +
          '<p>Az üzeneted megérkezett (demo) — általában 24 órán belül válaszolunk a megadott e-mail címre.</p>' +
          '<button class="sh-btn sh-btn--ghost" type="button">Új üzenet írása</button>';
        form.appendChild(done);
        $('button', done).addEventListener('click', function () {
          done.remove();
          form.reset();
          if (msg && count) count.textContent = '0 / ' + msg.getAttribute('maxlength');
          if (fields) fields.hidden = false;
          if (btn) { btn.classList.remove('is-busy'); btn.removeAttribute('disabled'); btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-11 11"/><path d="M22 2 15 22l-4-9-9-4Z"/></svg>Üzenet küldése';
          }
          $('#cf-nev', form).focus();
        });
      }, 650);
    });
  }

  /* ── KÍVÁNSÁGLISTA OLDAL ─────────────────────────────────────── */
  function renderKedvencek() {
    var mount = $('#sh-wish-mount');
    if (!mount) return;
    function draw() {
      var items = wishGet().map(prodById).filter(Boolean);
      if (!items.length) {
        mount.innerHTML =
          '<div class="sh-wish-empty shop-wrap">' +
            HEART_SVG +
            '<h2>A kívánságlistád üres</h2>' +
            '<p>A termékeknél a szív ikonra kattintva bármit ide menthetsz későbbre.</p>' +
            '<a class="sh-btn sh-btn--primary" href="kategoria.html">Termékek böngészése</a>' +
          '</div>';
        return;
      }
      mount.innerHTML =
        '<div class="shop-wrap"><h1 class="sh-cart-title">Kívánságlista<small>' + items.length + ' mentett termék</small></h1></div>' +
        '<div class="sh-band sh-band--tight"><div class="shop-wrap"><div class="sh-prod-grid">' +
          items.map(prodCard).join('') +
        '</div></div></div>';
      observeReveals();
    }
    draw();
    // ha innen kiveszünk valamit, frissüljön a lista
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-wish]')) setTimeout(draw, 0);
    });
  }

  /* ── AJÁNDÉKKERESŐ KVÍZ ──────────────────────────────────────── */
  var QUIZ = [
    { label: "Kinek?", q: "Kit lepnél meg?", hint: "Gondolj arra, akinek mosolyt csalnál az arcára.", opts: [
      {"t":"Gyereknek","d":"Kedves kiegészítő vagy dekoráció a szobájába","icon":"bear","group":"kinek","value":"gyerek"},
      {"t":"A páromnak","d":"Valami, ami kettőnkről szól","icon":"heart","group":"kinek","value":"par"},
      {"t":"Szülőnek, nagyszülőnek","d":"Személyes figyelmesség, sok szeretettel","icon":"flower","group":"kinek","value":"szulo"},
      {"t":"Barátnak, kollégának","d":"A kedvenc hobbijához vagy a mindennapokhoz","icon":"users","group":"kinek","value":"barat"},
      {"t":"Magamnak, otthonra","d":"Mert magadnak is ér meglepetést szerezni","icon":"home","group":"kinek","value":"magam"},
      {"t":"Céges partnernek","d":"Egy gesztus, amiben a márkánk is benne van","icon":"case","group":"kinek","value":"ceges"}
    ] },
    { label: "Mire?", q: "Mit ünnepeltek?", hint: "A nagy alkalmak és az apró gesztusok is számítanak.", opts: [
      {"t":"Születésnap, névnap","d":"Az ő napja, az ő ajándéka","icon":"cake","group":"alkalom","value":"szuletesnap"},
      {"t":"Ballagás, diploma","d":"Egy új fejezet kezdetére","icon":"cap","group":"alkalom","value":"ballagas"},
      {"t":"Karácsony","d":"Személyes meglepetés a fa alá","icon":"tree","group":"alkalom","value":"karacsony"},
      {"t":"Évforduló, szerelem","d":"A közös pillanatok emlékére","icon":"heart","group":"alkalom","value":"evfordulo"},
      {"t":"Céges alkalom","d":"Köszönet a közös munkáért","icon":"case","group":"alkalom","value":"ceges"},
      {"t":"Csak úgy","d":"A legjobb meglepetés néha váratlan","icon":"spark","group":"alkalom","value":"csak-ugy"},
      {"t":"Babaszületés","d":"Emlék az első közös pillanatokról","icon":"bear","group":"alkalom","value":"babaszuletes"},
      {"t":"Anyák napja","d":"Egy kedves köszönet anyának, mamának","icon":"flower","group":"alkalom","value":"anyak-napja"}
    ] },
    { label: "Milyet?", q: "Minek örülne igazán?", hint: "Válaszd azt az irányt, ami a leginkább illik hozzá.", opts: [
      {"t":"Fény és hangulat","d":"Lámpák, amik otthonossá teszik a teret","icon":"lamp","reason":"A fények és a hangulat miatt választottuk.","group":"stilus","value":"feny"},
      {"t":"Apró és praktikus","d":"Egy kedves részlet a mindennapokban","icon":"key","reason":"A praktikus ajándékok közül válogattuk.","group":"stilus","value":"praktikus"},
      {"t":"Szép tárgy az otthonába","d":"Dekoráció, amire jó ránézni","icon":"home","reason":"Az otthonába keresett dekorációkhoz illik.","group":"stilus","value":"dekor"},
      {"t":"A kedvenc világából","d":"Hobbi, karakterek és gyűjtői darabok","icon":"game","reason":"A rajongói, gyűjtői irányhoz kapcsolódik.","group":"stilus","value":"rajongoi"},
      {"t":"Valami teljesen egyedi","d":"Saját ötletből születő ajándék","icon":"pen","reason":"Saját ötletedből készülhet el.","group":"stilus","value":"egyedi"},
      {"t":"Még keresem az ihletet","d":"Mutassatok többféle ötletet","icon":"spark","group":"stilus","any":true}
    ] },
    { label: "Mennyiért?", q: "Mekkora keretben gondolkodsz?", hint: "A termék árával számolunk, szállítási díj nélkül.", opts: [
      {"t":"100 RON-ig","d":"Egy kedves figyelmesség","icon":"gift","maxAr":100},
      {"t":"100–200 RON","d":"Egy személyes meglepetés","icon":"gift","minAr":100,"maxAr":200},
      {"t":"200 RON felett","d":"Egy igazán különleges darab","icon":"gift","minAr":200},
      {"t":"Mutassatok minden árban","d":"Előbb az ötletet szeretném megtalálni","icon":"spark"}
    ] }
  ];

  function quizIcon(name) {
    var paths = {
      bear: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="13" r="8"/><path d="M9 11h.01M15 11h.01M10 16q2 2 4 0M12 14v2"/>',
      heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
      flower: '<path d="M12 20v-7m0 5q-6 0-7-5 6 0 7 5Zm0-3q6 0 7-4-6 0-7 4Z"/><path d="M12 3c4-5 8 2 4 4 4 4-3 8-4 3-3 5-8 0-4-3-5-2 0-8 4-4Z"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v2"/>',
      home: '<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
      case: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12q9 6 18 0M12 12v4"/>',
      cake: '<path d="M4 21V11h16v10ZM4 15q2 4 4 0 2 4 4 0 2 4 4 0 2 4 4 0M8 11V7m4 4V6m4 5V7M8 3v1m4-2v1m4 0v1"/>',
      cap: '<path d="m2 9 10-5 10 5-10 5ZM6 11v6q6 5 12 0v-6m4-2v8"/>',
      tree: '<path d="m12 2-5 6h3l-5 6h3l-5 6h18l-5-6h3l-5-6h3ZM12 20v3"/>',
      spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
      lamp: '<path d="M8 3h8l5 12H3ZM12 15v6m-4 0h8M17 15v3"/>',
      key: '<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-3-3 3-3m-6 0 3-3M7 7h.01"/>',
      game: '<path d="M7 7h10c3 0 6 12 3 13-2 1-4-4-5-4H9c-1 0-3 5-5 4C1 19 4 7 7 7ZM7 10v4m-2-2h4m7-1h.01M18 13h.01M12 7V3"/>',
      search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
      pen: '<path d="m14 4 6 6M3 21l5-1L21 7a2 2 0 0 0-4-4L4 16ZM4 16l4 4M14 21h7"/>',
      gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13m0-13C3 9 5 0 9 3Zm0 0c9 1 7-8 3-5Z"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.gift) + '</svg>';
  }

  function quizMatch(p, opt) {
    var profile = p.ajandek;
    if (!opt || !profile || profile.version !== 1 || profile.enabled !== true) return 0;
    if (opt.any) return 1;
    var values = profile[opt.group];
    if (!Array.isArray(values) || values.indexOf(opt.value) === -1) return 0;
    // A szűkebb, kifejezetten erre az alkalomra/célcsoportra sorolt termék előrébb kerül.
    return Math.max(1, 12 - values.length);
  }

  function quizResults(answers) {
    if (!Array.isArray(answers) || answers.length !== 4 || answers.some(function (a) { return !a; })) return [];
    var budget = answers[3];
    var limited = budget.minAr !== undefined || budget.maxAr !== undefined;
    var list = SHOP_PRODUCTS.filter(function (p) {
      // Besorolás nélküli mintatermékből nem gyártunk látszólag megfelelő találatot.
      if (!p.ajandek || p.ajandek.enabled !== true || p.ajanlhato === false) return false;
      if ((p.badges || []).some(function (b) { return b.id === 'soldOut' || b.id === 'comingSoon'; })) return false;
      if (typeof p.ar !== 'number' || !Number.isFinite(p.ar) || p.ar < 0 || (limited && p.ar === 0)) return false;
      return !(budget.minAr !== undefined && p.ar <= budget.minAr) &&
        !(budget.maxAr !== undefined && p.ar > budget.maxAr);
    }).map(function (p, index) {
      var matches = answers.slice(0, 3).map(function (opt) { return quizMatch(p, opt); });
      return { p: p, index: index, s: matches[1] * 3 + matches[2] * 2 + matches[0], matches: matches };
    }).filter(function (hit) { return hit.matches.every(function (score) { return score > 0; }); });
    list.sort(function (a, b) { return b.s - a.s || a.index - b.index; });
    return list.slice(0, 3);
  }

  function renderKviz() {
    var mount = $('#sh-quiz-mount');
    if (!mount) return;
    var storageKey = 'layero_gift_finder_v3';
    var step = 0;
    var picks = [null, null, null, null];
    try {
      var saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved && Array.isArray(saved.picks) && saved.picks.length === QUIZ.length) {
        picks = saved.picks.map(function (pick, i) { return Number.isInteger(pick) && QUIZ[i].opts[pick] ? pick : null; });
        var firstMissing = picks.indexOf(null);
        step = Math.min(Number.isInteger(saved.step) ? Math.max(0, saved.step) : 0, firstMissing < 0 ? QUIZ.length : firstMissing);
      }
    } catch (e) { /* Tárolás nélkül is végig használható. */ }

    function save() {
      try { sessionStorage.setItem(storageKey, JSON.stringify({ step: step, picks: picks })); } catch (e) { /* Opcionális munkamenet-mentés. */ }
    }
    function complete() { return picks.every(function (pick) { return pick !== null; }); }
    function answers() { return picks.map(function (pick, i) { return pick === null ? null : QUIZ[i].opts[pick]; }); }
    function focusPanel() {
      var heading = $('[data-quiz-heading]', mount);
      if (!heading) return;
      heading.focus({ preventScroll: true });
      var panel = $('#sh-quiz-panel', mount);
      var top = panel.getBoundingClientRect().top;
      if (top < 90 || top > window.innerHeight * 0.45) panel.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    function stepsHtml() {
      return '<nav class="sh-quiz__steps" aria-label="Az ajándékkereső lépései"><ol>' + QUIZ.map(function (q, i) {
        var available = i === 0 || picks.slice(0, i).every(function (pick) { return pick !== null; });
        return '<li class="' + (i === step ? 'is-current' : picks[i] !== null ? 'is-done' : '') + '">' +
          '<button type="button" data-step="' + i + '"' + (available ? '' : ' disabled') + (i === step ? ' aria-current="step"' : '') +
          ' aria-label="' + (i + 1) + '. lépés: ' + q.label + (picks[i] !== null ? ' – válasz megadva' : '') + '">' +
          '<span class="sh-quiz__stepnum">' + (picks[i] !== null && i !== step ? quizIcon('check') : i + 1) + '</span><span>' + q.label + '</span></button></li>';
      }).join('') + '</ol></nav>';
    }
    function bindSteps() {
      $all('[data-step]', mount).forEach(function (button) {
        button.addEventListener('click', function () { step = Number(button.dataset.step); save(); drawStep(true); });
      });
    }
    function summaryHtml() {
      return '<div class="sh-quiz__summary" aria-label="A választásaid">' + answers().map(function (opt, i) {
        return opt ? '<button type="button" data-step="' + i + '" aria-label="' + esc(QUIZ[i].label + ' ' + opt.t + ' – módosítás') + '"><span>' + esc(QUIZ[i].label) + '</span> ' + esc(opt.t) + quizIcon('pen') + '</button>' : '';
      }).join('') + '</div>';
    }

    mount.innerHTML = '<div class="sh-quiz shop-wrap">' +
      '<div class="sh-quiz__top"><a href="index.html">Kezdőlap</a><span aria-hidden="true">/</span><span>Ajándékkereső</span><a class="sh-quiz__browse" href="kategoria.html">Inkább körülnézek ' + quizIcon('arrow') + '</a></div>' +
      '<div class="sh-quiz__layout"><aside class="sh-quiz__story" aria-labelledby="sh-quiz-title">' +
        '<div class="sh-quiz__story-copy"><span class="sh-quiz__eyebrow">' + quizIcon('gift') + ' A figyelmesség itt kezdődik</span>' +
          '<h1 id="sh-quiz-title">Egy ajándék.<br><em>Ami róla szól.</em></h1>' +
          '<p>Te ismered őt. Mi segítünk megtalálni azt a darabot, amiben magára ismer.</p></div>' +
        '<img class="sh-quiz__story-image" src="assets/banners/lifestyle-gift-mobile.webp" alt="Anya és kisfia egy névre szóló dínós lámpának örülnek" width="941" height="1672" fetchpriority="high">' +
        '<div class="sh-quiz__story-note"><span>' + quizIcon('spark') + '</span><div><strong>Apró részletek. Nagy mosolyok.</strong><p>Négy válasz, és máris közelebb az ötlet.</p></div></div>' +
      '</aside><section class="sh-quiz__panel" id="sh-quiz-panel" aria-label="Ajándékkereső kérdések"></section></div>' +
      '<p class="sh-quiz__help">Van már egy saját ötleted? <a href="egyedi-rendeles.html">Mesélj róla, megtervezzük együtt ' + quizIcon('arrow') + '</a></p></div>';
    var panel = $('#sh-quiz-panel', mount);

    function drawStep(moveFocus) {
      $('.sh-quiz', mount).classList.remove('sh-quiz--result');
      var Q = QUIZ[step];
      panel.innerHTML = stepsHtml() +
        '<div class="sh-quiz__question"><span class="sh-quiz__kicker">' + (step === 3 ? 'Már csak egy kérdés' : 'Ismerjük meg egy kicsit') + ' <span>0' + (step + 1) + ' / 04</span></span>' +
          '<h2 id="sh-quiz-question" tabindex="-1" data-quiz-heading>' + esc(Q.q) + '</h2><p id="sh-quiz-hint">' + esc(Q.hint) + '</p></div>' +
        '<form class="sh-quiz__form"><fieldset class="sh-quiz__opts" aria-describedby="sh-quiz-hint"><legend class="sh-quiz__sr">' + esc(Q.q) + '</legend>' +
          Q.opts.map(function (o, i) {
            return '<label class="sh-quiz__opt"><input type="radio" name="gift-answer" value="' + i + '"' + (picks[step] === i ? ' checked' : '') + '>' +
              '<span class="sh-quiz__choice"><span class="sh-quiz__icon">' + quizIcon(o.icon) + '</span><span class="sh-quiz__option-copy"><strong>' + esc(o.t) + '</strong><span>' + esc(o.d) + '</span></span>' +
              '<span class="sh-quiz__tick">' + quizIcon('check') + '</span></span></label>';
          }).join('') + '</fieldset>' +
          '<div class="sh-quiz__actions"><button type="button" class="sh-quiz__back" data-back' + (step === 0 ? ' disabled' : '') + '>' + quizIcon('arrow') + ' Vissza</button>' +
            '<button type="submit" class="sh-quiz__next"' + (picks[step] === null ? ' disabled' : '') + '>' + (complete() ? 'Ajánlások frissítése' : step === 3 ? 'Mutasd az ötleteket' : 'Tovább') + quizIcon('arrow') + '</button></div>' +
          '<p class="sh-quiz__micro" role="status">' + (picks[step] === null ? 'Válassz egy lehetőséget a folytatáshoz.' : 'A válaszodat később is módosíthatod.') + '</p>' +
        '</form>';
      $all('input[name="gift-answer"]', panel).forEach(function (input) {
        input.addEventListener('change', function () {
          picks[step] = Number(input.value);
          save();
          $('.sh-quiz__next', panel).disabled = false;
          $('.sh-quiz__micro', panel).textContent = 'A válaszodat később is módosíthatod.';
        });
      });
      $('form', panel).addEventListener('submit', function (event) {
        event.preventDefault();
        if (picks[step] === null) return;
        if (complete()) { step = QUIZ.length; save(); drawResult(true); }
        else { step++; save(); drawStep(true); }
      });
      $('[data-back]', panel).addEventListener('click', function () { if (step > 0) { step--; save(); drawStep(true); } });
      bindSteps();
      if (moveFocus) focusPanel();
    }

    function drawResult(moveFocus) {
      $('.sh-quiz', mount).classList.add('sh-quiz--result');
      var selected = answers();
      var hits = quizResults(selected);
      var limited = selected[3].minAr !== undefined || selected[3].maxAr !== undefined;
      panel.innerHTML = '<div class="sh-quiz__result-heading"><span class="sh-quiz__eyebrow">' + quizIcon('check') + ' A te ajándékötleteid</span>' +
        '<h1 tabindex="-1" data-quiz-heading>' + (hits.length ? 'Ezekben ott lehet a mosoly.' : 'Keressünk egy másik irányt.') + '</h1>' +
        '<p>' + (hits.length ? 'A válaszaid alapján válogattuk. Nézd meg, melyikben ismersz rá igazán.' : 'Ezekkel a válaszokkal most nincs megfelelő ajánlatunk' + (limited ? ' a megadott árkeretben.' : '.') ) + '</p></div>' +
        summaryHtml() + '<p class="sh-quiz__edit-note">A választásaidra kattintva finomíthatod az ajánlásokat.</p>' +
        (hits.length ? '<div class="sh-quiz__results">' + hits.map(function (hit, i) {
          var reason = selected[0].t + ' · ' + selected[1].t + (selected[2].any ? '' : ' · ' + selected[2].t);
          return '<article class="sh-quiz__recommendation"><div class="sh-quiz__pick-label">' + (i === 0 ? quizIcon('spark') + ' Első tippünk' : '0' + (i + 1) + ' · Még egy jó irány') + '</div>' + prodCard(hit.p) +
            '<p class="sh-quiz__reason">' + quizIcon('check') + '<span>' + esc(reason) + (limited ? '<small>A választott árkereten belül.</small>' : hit.p.ar <= 0 ? '<small>Az ár egyedi egyeztetéssel alakul ki.</small>' : '') + '</span></p></article>';
        }).join('') + '</div>' : '<div class="sh-quiz__empty">' + quizIcon('search') + '<h3>Egy kis változtatás, új ötletek.</h3><p>Próbálj másik stílust vagy tágabb árkeretet. A válaszaid megmaradnak.</p><button type="button" class="sh-quiz__next" data-step="3">Módosítom a keretet ' + quizIcon('arrow') + '</button></div>') +
        '<div class="sh-quiz__custom"><span class="sh-quiz__custom-icon">' + quizIcon('pen') + '</span><div><h3>Valami csak neki szólót képzeltél el?</h3><p>Saját ötletből is készülhet ajándék. A részleteket és az árat egyeztetjük.</p></div><a href="egyedi-rendeles.html">Mesélek az ötletemről ' + quizIcon('arrow') + '</a></div>' +
        '<div class="sh-quiz__foot"><button type="button" class="sh-quiz__back" data-restart>Új ajándékot keresek</button><a href="kategoria.html">Megnézem a teljes kínálatot ' + quizIcon('arrow') + '</a></div>';
      $('[data-restart]', panel).addEventListener('click', function () { step = 0; picks = [null, null, null, null]; save(); drawStep(true); });
      bindSteps();
      syncCompareUI();
      observeReveals();
      if (moveFocus) focusPanel();
    }

    if (step === QUIZ.length && complete()) drawResult(false);
    else drawStep(false);
  }

  /* ── FIÓK OLDAL (demo) ───────────────────────────────────────── */
  function renderFiok() {
    var mount = $('#sh-account-mount');
    if (!mount) return;

    function drawLogin() {
      mount.innerHTML =
        '<div class="sh-auth shop-wrap">' +
          '<div class="sh-auth__card">' +
            '<span class="sh-auth__ico">' + ICO.user + '</span>' +
            '<h1>Belépés a fiókodba</h1>' +
            '<p>Kövesd a rendeléseid, gyűjts hűségpontot, és mentsd el az adataid a gyorsabb rendeléshez.</p>' +
            '<form id="sh-auth-form" class="sh-form">' +
              '<div class="sh-field"><label>Teljes név</label><input name="nev" required autocomplete="name"></div>' +
              '<div class="sh-field"><label>E-mail</label><input name="email" type="email" required autocomplete="email"></div>' +
              '<button class="sh-btn sh-btn--primary" type="submit">Belépés / regisztráció</button>' +
            '</form>' +
            '<small>Demo fiók — az adatok csak a böngésződben tárolódnak, nem küldjük el sehova.</small>' +
          '</div>' +
        '</div>';
      $('#sh-auth-form').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!this.checkValidity()) { this.reportValidity(); return; }
        var fd = new FormData(this);
        profileSet({ nev: fd.get('nev'), email: fd.get('email') });
        toast('Üdv, ' + fd.get('nev').split(' ')[0] + '! Beléptél (demo).');
        drawDash();
      });
    }

    function drawDash() {
      var prof = profileGet();
      var pts = loyaltyPoints();
      var tier = loyaltyTier(pts);
      var orders = ordersGet();
      var progHtml = '';
      if (tier.next) {
        var span = tier.next.min - tier.cur.min;
        var pct = Math.min(100, Math.round((pts - tier.cur.min) / span * 100));
        progHtml = '<div class="sh-loyalty__track"><i style="width:' + pct + '%"></i></div>' +
          '<small>Még <b>' + (tier.next.min - pts) + ' pont</b> a(z) ' + tier.next.nev + ' szintig</small>';
      } else {
        progHtml = '<div class="sh-loyalty__track"><i style="width:100%"></i></div><small>Elérted a legmagasabb szintet 🎉</small>';
      }

      var ordersHtml = orders.length
        ? orders.map(function (o) {
            var d = new Date(o.date);
            var thumbs = o.items.slice(0, 4).map(function (it) {
              return '<img src="' + it.kep + '" alt="' + esc(it.nev) + '" title="' + esc(it.nev) + '" loading="lazy" decoding="async">';
            }).join('');
            var qty = o.items.reduce(function (s, it) { return s + it.qty; }, 0);
            return '<article class="sh-order">' +
              '<div class="sh-order__hd"><div><b>' + o.no + '</b><span>' + d.getFullYear() + '. ' + HONAPOK[d.getMonth()] + ' ' + d.getDate() + '.</span></div>' +
                '<span class="sh-order__status">Feldolgozás alatt</span></div>' +
              '<div class="sh-order__body"><div class="sh-order__thumbs">' + thumbs + '</div>' +
                '<div class="sh-order__meta"><span>' + qty + ' tétel</span><b>' + fmtPrice(o.total) + '</b></div></div>' +
            '</article>';
          }).join('')
        : '<div class="sh-order-empty"><p>Még nincs rendelésed.</p><a class="sh-btn sh-btn--primary" href="kategoria.html">Vásárlás megkezdése</a></div>';

      mount.innerHTML =
        '<section class="sh-page-hd"><div class="shop-wrap">' +
          '<nav class="sh-crumbs" aria-label="Morzsamenü"><a href="index.html">Shop</a><span aria-hidden="true">/</span><span>Fiókom</span></nav>' +
          '<h1>Szia, ' + esc(prof.nev.split(' ')[0]) + '!</h1>' +
          '<p>' + esc(prof.email) + '</p>' +
        '</div></section>' +
        '<div class="sh-band sh-band--tight"><div class="shop-wrap sh-account">' +
          '<aside class="sh-account__side">' +
            '<div class="sh-loyalty">' +
              '<span class="sh-loyalty__tier">' + tier.cur.nev + ' szint</span>' +
              '<b class="sh-loyalty__pts">' + pts + '<span> pont</span></b>' +
              progHtml +
            '</div>' +
            '<nav class="sh-account__nav">' +
              '<a href="kedvencek.html">' + HEART_SVG + ' Kívánságlista</a>' +
              '<a href="gyik.html">' + ICO.shield + ' Gyakori kérdések</a>' +
              '<a href="kapcsolat.html">' + ICO.mail + ' Ügyfélszolgálat</a>' +
              '<button type="button" id="sh-logout">' + ICO.user + ' Kijelentkezés</button>' +
            '</nav>' +
          '</aside>' +
          '<div class="sh-account__main">' +
            '<h2 class="sh-h2">Rendeléseim</h2>' +
            '<div class="sh-orders">' + ordersHtml + '</div>' +
            '<h2 class="sh-h2" style="margin-top:36px">Mentett adatok</h2>' +
            '<form class="sh-form sh-account__profile" id="sh-profile-form">' +
              '<div class="sh-form__row">' +
                '<div class="sh-field"><label>Név</label><input name="nev" value="' + esc(prof.nev) + '" required></div>' +
                '<div class="sh-field"><label>E-mail</label><input name="email" type="email" value="' + esc(prof.email) + '" required></div>' +
              '</div>' +
              '<div class="sh-form__row">' +
                '<div class="sh-field"><label>Telefon</label><input name="tel" value="' + esc(prof.tel || '') + '" autocomplete="tel"></div>' +
                '<div class="sh-field"><label>Szállítási cím</label><input name="cim" value="' + esc(prof.cim || '') + '" autocomplete="street-address"></div>' +
              '</div>' +
              '<button class="sh-btn sh-btn--dark" type="submit">Adatok mentése</button>' +
            '</form>' +
          '</div>' +
        '</div></div>';

      $('#sh-logout').addEventListener('click', function () {
        profileSet(null);
        toast('Kijelentkeztél. A rendeléseid a böngésződben maradnak.');
        drawLogin();
      });
      $('#sh-profile-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        profileSet({ nev: fd.get('nev'), email: fd.get('email'), tel: fd.get('tel'), cim: fd.get('cim') });
        toast('Adatok elmentve.');
      });
    }

    if (profileGet()) drawDash(); else drawLogin();
  }

  /* ── scroll reveal ───────────────────────────────────────────── */
  var revealIO = null;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      $all('.sh-reveal').forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            revealIO.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
    }
    $all('.sh-reveal:not(.is-in)').forEach(function (el) { revealIO.observe(el); });
  }

  /* ── globális extrák: forgó üzenet, cookie, popup, lebegők ────── */
  function renderExtras() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // akció-szalag visszaszámlálóval a fejléc alatt
    var header = $('.sh-header');
    if (!IS_WOO && header && document.body.getAttribute('data-page') !== 'kosar') {
      // (a naponta újrainduló ál-visszaszámláló eltávolítva — az akció
      // üzenete marad, hamis határidő nélkül)
      var promo = document.createElement('div');
      promo.className = 'sh-promobar';
      promo.innerHTML =
        '<span><b>Nyári akció</b> — akár <b>-20%</b> kiemelt termékekre</span>' +
        '<a href="kategoria.html">Megnézem ›</a>';
      header.parentNode.insertBefore(promo, header.nextSibling);
    }

    // topbar üzenet-rotáció — nyugodt, fix háttéren (a 4,5 mp-enként
    // színt váltó háttér zavaró volt, kikerült)
    var rot = $('[data-rotate]');
    if (rot) {
      var topbarEl = $('.sh-topbar');
      if (topbarEl) topbarEl.className = 'sh-topbar sh-topbar--navy';
      var msgs = $all('span', rot);
      var mi = 0;
      if (!reduceMotion) {
        setInterval(function () {
          msgs[mi].classList.remove('is-on');
          mi = (mi + 1) % msgs.length;
          msgs[mi].classList.add('is-on');
        }, 6000);
      }
    }

    // fejléc: görgetett állapotban finom árnyék kerül rá. A promó-sáv magától
    // kigördül (normál folyás), ezért nincs több magasság-animáció — így finom
    // görgetésnél sem rezeg/reszket a fejléc.
    var headerEl = $('.sh-header');
    if (headerEl) {
      var hdTick = false;
      var applyHdShadow = function () {
        headerEl.classList.toggle('is-scrolled', window.scrollY > 4);
      };
      window.addEventListener('scroll', function () {
        if (hdTick) return;
        hdTick = true;
        requestAnimationFrame(function () { hdTick = false; applyHdShadow(); });
      }, { passive: true });
      applyHdShadow();
    }

    // promó popup (–10% kupon) — EGYELŐRE KIKAPCSOLVA (felhasználói kérésre).
    // Visszakapcsolás: állítsd a PROMO_ENABLED-et true-ra.
    var PROMO_ENABLED = false;
    if (PROMO_ENABLED) {
    var promoModal = document.createElement('div');
    promoModal.className = 'sh-modal';
    promoModal.setAttribute('role', 'dialog');
    promoModal.setAttribute('aria-modal', 'true');
    promoModal.innerHTML =
      '<div class="sh-modal__box">' +
        '<button class="sh-modal__close" type="button" aria-label="Bezárás">✕</button>' +
        '<span class="sh-modal__badge">Első rendelés</span>' +
        '<h2>–10% az első rendelésedre</h2>' +
        '<p>Iratkozz fel, és e-mailben küldjük a kuponkódot — mellé havonta egyszer újdonságokat, spam nélkül.</p>' +
        '<form><input type="email" required placeholder="E-mail címed" aria-label="E-mail cím"><button class="sh-btn sh-btn--dark" type="submit">Kérem a kupont</button></form>' +
        '<button class="sh-modal__skip" type="button">Most nem, köszönöm</button>' +
      '</div>';
    document.body.appendChild(promoModal);
    var closePromo = function () {
      promoModal.classList.remove('is-open');
      sessionStorage.setItem('sh_promo_seen', '1');
    };
    var openPromo = function () { promoModal.classList.add('is-open'); };
    $('.sh-modal__close', promoModal).addEventListener('click', closePromo);
    $('.sh-modal__skip', promoModal).addEventListener('click', closePromo);
    promoModal.addEventListener('click', function (e) { if (e.target === promoModal) closePromo(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && promoModal.classList.contains('is-open')) closePromo();
    });
    $('form', promoModal).addEventListener('submit', function (e) {
      e.preventDefault();
      closePromo();
      toast('Köszönjük! A kuponkód úton van (demo).');
    });
    // csak exit-intent trigger, ülésenként egyszer — az időzített felugrás
    // olvasás közben zavart, kikerült; mobilon így nincs automatikus popup
    if (!sessionStorage.getItem('sh_promo_seen')) {
      var autoPromo = function () {
        if (sessionStorage.getItem('sh_promo_seen') || promoModal.classList.contains('is-open')) return;
        openPromo();
      };
      document.addEventListener('mouseout', function (e) {
        if (e.clientY <= 0 && !e.relatedTarget && !e.toElement) autoPromo();
      });
    }
    } // if (PROMO_ENABLED) — promó popup egyelőre kikapcsolva

    // lebegő gomb-stack (jobb alul): vissza-fel, kupon, egyedi ötlet, segítség
    var fab = document.createElement('div');
    fab.className = 'sh-fab';
    document.body.appendChild(fab);

    var top = document.createElement('button');
    top.className = 'sh-totop';
    top.type = 'button';
    top.setAttribute('aria-label', 'Vissza a tetejére');
    top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 14 7-7 7 7"/></svg>';
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
    fab.appendChild(top);
    var topTick = false;
    window.addEventListener('scroll', function () {
      if (topTick) return;
      topTick = true;
      requestAnimationFrame(function () {
        topTick = false;
        top.classList.toggle('is-on', window.scrollY > 600);
      });
    }, { passive: true });

    // (a tekergő –10% kuponjegy eltávolítva — a kedvezményt a promobár,
    // az exit-popup és a hírlevél-sáv már így is hirdeti; a lebegő réteg
    // maradjon funkcionális: fel, egyedi ötlet, segítség)

    // The origin controller owns this link; Elementor must not navigate its fallback URL.
    var originTrigger = document.createElement('template');
    originTrigger.innerHTML = "<a class=\"lyo-launcher\" href=\"rolunk.html\" data-layero-origin-open data-e-disable-page-transition aria-haspopup=\"dialog\" aria-controls=\"layero-origin\" aria-label=\"Szatmárnémeti (Satu Mare), Románia — a Layero műhelye\" title=\"Satu Mare · Szatmárnémeti — itt készül\"><img class=\"lyo-launcher__map\" src=\"assets/layero-origin/images/romania-flag-pin.svg\" width=\"36\" height=\"28\" alt=\"\" aria-hidden=\"true\"></a>";
    fab.appendChild(originTrigger.content.cloneNode(true));

    // egyedi ötlet + segítség — hoverre kinyíló pill
    var fabIdea = document.createElement('a');
    fabIdea.className = 'sh-fab__btn sh-fab__btn--idea';
    fabIdea.href = 'egyedi-rendeles.html';
    fabIdea.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2Z"/><path d="M9.5 21h5"/></svg><i>Egyedi ötletem van</i>';
    fab.appendChild(fabIdea);

    var fabHelp = document.createElement('a');
    fabHelp.className = 'sh-fab__btn sh-fab__btn--help';
    fabHelp.href = 'kapcsolat.html';
    fabHelp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H5.5L3 21l1-3.4A8 8 0 1 1 21 12Z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/></svg><i>Segítség</i>';
    fab.appendChild(fabHelp);


    // (a „valaki az imént rendelte" értesítések eltávolítva — kitalált
    // nevekkel és „ellenőrzött rendelés" felirattal megtévesztőek voltak,
    // az ilyen ál-social-proof bizalmat rombol és jogilag is aggályos;
    // a valódi bizalomépítést a vélemények és a garancia-blokk végzi)

  }

  /* GYIK: native, keyboard-accessible details and accent-insensitive search. */
  function initGyik() {
    var root = $('[data-faq-page]');
    if (!root || root.dataset.faqReady) return;
    root.dataset.faqReady = '1';
    var input = $('#sh-faq-q', root), clear = $('#sh-faq-clear', root);
    var status = $('#sh-faq-status', root), empty = $('#sh-faq-empty', root);
    var items = $all('.sh-faq-item', root), groups = $all('.sh-faq-group', root);
    var links = $all('#sh-faq-rail a', root), savedOpen = null;
    function norm(value) { return (value || '').toLocaleLowerCase('hu').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
    var searchable = items.map(function (item) { return norm(item.textContent); });
    function active(id) {
      links.forEach(function (link) {
        var on = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', on);
        if (on) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function filter() {
      var query = norm(input.value.trim()), words = query.split(/\s+/).filter(Boolean);
      root.classList.toggle('is-searching', !!query);
      clear.hidden = !input.value;
      if (query && !savedOpen) savedOpen = items.map(function (item) { return item.open; });
      var count = 0;
      items.forEach(function (item, i) {
        var match = words.every(function (word) { return searchable[i].indexOf(word) !== -1; });
        item.hidden = !match;
        if (match) count++;
        if (query) item.open = match;
        else if (savedOpen) item.open = savedOpen[i];
      });
      groups.forEach(function (group) { group.hidden = !$all('.sh-faq-item', group).some(function (item) { return !item.hidden; }); });
      empty.hidden = count !== 0;
      status.textContent = query ? count + ' válasz a keresésedre' : '';
      if (!query) savedOpen = null;
      var first = groups.find(function (group) { return !group.hidden; });
      active(first ? first.id : '');
    }
    function reset() { input.value = ''; filter(); }
    input.form.addEventListener('submit', function (event) { event.preventDefault(); filter(); });
    input.addEventListener('input', filter);
    input.addEventListener('keydown', function (event) { if (event.key === 'Escape') { event.preventDefault(); reset(); } });
    clear.addEventListener('click', function () { reset(); input.focus(); });
    $all('[data-faq-reset]', root).forEach(function (button) { button.addEventListener('click', function () { reset(); input.focus(); }); });
    function revealHash() {
      var id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (error) { return; }
      var target = document.getElementById(id);
      if (!target || !root.contains(target) || !target.matches('.sh-faq-item,.sh-faq-group')) return;
      if (input.value) reset();
      if (target.matches('.sh-faq-item')) target.open = true;
      var group = target.closest('.sh-faq-group');
      if (group) active(group.id);
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    $all('#sh-faq-rail a,[data-faq-jump]', root).forEach(function (link) {
      link.addEventListener('click', function () {
        if (input.value) reset();
        var target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        if (target.matches('.sh-faq-item')) target.open = true;
        var group = target.closest('.sh-faq-group');
        if (group) active(group.id);
      });
    });
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        if (input.value.trim()) return;
        entries.forEach(function (entry) { if (entry.isIntersecting) active(entry.target.id); });
      }, { rootMargin: '-132px 0px -60% 0px', threshold: 0 });
      groups.forEach(function (group) { spy.observe(group); });
    }
    window.addEventListener('hashchange', revealHash);
    if (window.location.hash) requestAnimationFrame(revealHash);
  }

  /* ── indítás ─────────────────────────────────────────────────── */
  renderChrome();
  renderExtras();
  initCardActions();
  syncCompareUI();
  // Elementor can render the hero on a page without the static home marker.
  // Initialize its interactions independently, without replacing other widgets.
  initSlider();
  initLampBa();
  initSpotlight();
  initHeroStyleSwitcher();
  var marker = document.querySelector('[data-layero-page]');
  var page = document.body.getAttribute('data-page') || (marker ? marker.getAttribute('data-layero-page') : '');
  if (page === 'home') renderHome();
  if (page === 'kategoria') renderKategoria();
  if (page === 'termek') renderTermek();
  initProductTabs();
  if (page === 'kosar') renderKosar();
  if (page === 'kapcsolat') renderKapcsolat();
  if (page === 'kedvencek') renderKedvencek();
  if (page === 'penztar') renderPenztar();
  if (page === 'fiok') renderFiok();
  if (page === 'kviz') renderKviz();
  if (page === 'gyik') initGyik();
  if (page === 'egyedi-rendeles') initCustomOrder();
  if (page === '404') {
    var c404 = $('#sh-404-cats');
    if (c404) c404.innerHTML = '<span>Népszerű kategóriák:</span>' +
      visibleCats().slice(0, 5).map(function (c) { return '<a href="kategoria.html?cat=' + c.id + '">' + esc(c.nev) + '</a>'; }).join('');
  }
  initLpShowcase();
  initLpQuoteForms();
  initBusinessPage();
  fixStaticUrls(document);
  if (window.MutationObserver) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        [].forEach.call(mutation.addedNodes || [], function (node) {
          if (node && node.nodeType === 1) fixStaticUrls(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
  observeReveals();

  /* ── LANDING (egyedi-rendeles / cegeknek): hero-showcase rotátor ──
     A spotlight-keret újrahasznosítva: a képek crossfade-del váltanak,
     a badge a kép data-badge feliratát követi; hoverre megáll. */

  /* Egyedi rendelés: hozzáférhető választó és valós előnézeti visszajelzés.
     A data-lp-quote és a mezőnevek megmaradnak a WordPress-adapter számára. */
  function initCustomOrder() {
    var form = $('[data-cq-form]');
    if (!form) return;
    var idea = $('#eq-otlet', form);
    var counter = $('[data-cq-count]', form);
    var status = $('[data-cq-status]', form);
    var summary = $('[data-cq-summary]');
    var radios = $all('input[name="tema"]', form);
    var required = $all('[required]', form);
    var submit = $('[data-cq-submit]', form);
    var copy = $('[data-cq-copy]', form);
    var attempted = false;
    form.noValidate = true;
    submit.disabled = false;
    $all('[data-cq-preview]').forEach(function (notice) { notice.hidden = IS_WOO; });

    function selectedType() {
      var radio = $('input[name="tema"]:checked', form);
      return radio ? radio.getAttribute('data-label') : 'Saját ötlet';
    }
    function updateType() {
      if (summary) summary.textContent = selectedType();
      form.setAttribute('data-layero-form-topic', 'Egyedi rendelés — ' + selectedType());
    }
    function updateCount() { counter.textContent = idea.value.length + ' / ' + idea.maxLength; }
    function isValid(field) {
      return field.checkValidity() && (field.type === 'checkbox' || field.value.trim().length > 0);
    }
    function showError(field, invalid) {
      var wrap = field.closest('.cq-field');
      var errorId = field.id + '-error';
      var error = document.getElementById(errorId);
      var descriptions = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (id) { return id && id !== errorId; });
      if (invalid) {
        field.setAttribute('aria-invalid', 'true');
        if (!error) {
          error = document.createElement('p');
          error.id = errorId;
          error.className = 'cq-field__error';
          wrap.appendChild(error);
        }
        error.textContent = field.getAttribute('data-err') || 'Ellenőrizd ezt a mezőt.';
        descriptions.push(errorId);
      } else {
        field.removeAttribute('aria-invalid');
        if (error) error.remove();
      }
      if (descriptions.length) field.setAttribute('aria-describedby', descriptions.join(' '));
      else field.removeAttribute('aria-describedby');
    }
    function validate() {
      var firstInvalid = null;
      required.forEach(function (field) {
        var invalid = !isValid(field);
        showError(field, invalid);
        if (invalid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    }
    required.forEach(function (field) {
      field.addEventListener('blur', function () {
        if (attempted || field.value.trim() && field.type !== 'checkbox') showError(field, !isValid(field));
      });
      field.addEventListener('input', function () {
        if (field.hasAttribute('aria-invalid')) showError(field, !isValid(field));
        status.textContent = '';
      });
    });
    radios.forEach(function (radio) { radio.addEventListener('change', updateType); });
    idea.addEventListener('input', updateCount);
    $all('[data-cq-idea]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var choice = radios.filter(function (radio) { return radio.value === link.getAttribute('data-cq-idea'); })[0];
        if (!choice) return;
        event.preventDefault();
        choice.checked = true;
        updateType();
        choice.focus({ preventScroll: true });
        form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      });
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      attempted = true;
      if (!validate()) {
        status.textContent = 'Néhány adat még hiányzik vagy javításra vár. Ellenőrizd a megjelölt mezőket.';
        return;
      }
      // Online a WordPress-adapter a capture fázisban kezeli a valódi küldést.
      // Adapter nélkül itt sem állítunk sikeres beküldést.
      status.textContent = IS_WOO
        ? 'A küldés most nem elérhető. A kitöltött adatok megmaradtak; kérjük, használd a kapcsolati oldalt.'
        : 'Az űrlap rendben van. Ez helyi előnézet: a megkeresést nem küldtük el. A kitöltött adataid megmaradtak, az ötletedet ki is másolhatod.';
    });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      copy.hidden = false;
      copy.addEventListener('click', function () {
        if (!idea.value.trim()) {
          showError(idea, true);
          idea.focus();
          status.textContent = 'Előbb írd le az ötleted, hogy legyen mit kimásolni.';
          return;
        }
        var brief = 'Layero — egyedi ötlet\n' + selectedType() + '\n\n' + idea.value.trim();
        copy.disabled = true;
        navigator.clipboard.writeText(brief).then(function () {
          status.textContent = 'Az ötletedet a vágólapra másoltuk. Beillesztheted egy e-mailbe vagy elmentheted magadnak.';
        }).catch(function () {
          status.textContent = 'A böngésző nem engedélyezte a másolást. Jelöld ki és másold ki a szöveget az ötlet mezőből.';
        }).finally(function () { copy.disabled = false; });
      });
    }
    form.addEventListener('reset', function () {
      window.setTimeout(function () {
        attempted = false;
        required.forEach(function (field) { showError(field, false); });
        updateCount();
        updateType();
        status.textContent = '';
      }, 0);
    });
    $all('.cq-faq details').forEach(function (item) {
      item.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && item.open) {
          item.open = false;
          $('summary', item).focus();
        }
      });
    });
    updateCount();
    updateType();
  }

  // Céges bemutató: kézi galéria, natív képnagyító és ellenőrizhető ajánlatkérés.
  function initBusinessPage() {
    var gallery = $('[data-b2b-gallery]');
    var form = $('[data-b2b-quote]');
    if (!gallery || !form) return;
    var thumbs = $all('[data-b2b-image]', gallery);
    var mainImage = $('[data-b2b-main]', gallery);
    var enlarge = $('[data-b2b-enlarge]', gallery);
    var dialog = $('[data-b2b-lightbox]');
    var current = 0;
    var imageDescriptions = [
      'Fekete-arany Bázis Bisztró QR + NFC display egy étterem asztalán',
      'Bázis Bisztró logó formájára készített kulcstartó',
      'Bázis Bisztró logós poháralátétek és asztali tartó'
    ];
    function selectImage(index) {
      current = (index + thumbs.length) % thumbs.length;
      var button = thumbs[current];
      var src = $('img', button).getAttribute('src');
      var title = button.getAttribute('aria-label');
      thumbs.forEach(function (thumb, i) { thumb.setAttribute('aria-pressed', String(i === current)); });
      mainImage.src = src;
      mainImage.alt = imageDescriptions[current];
      enlarge.setAttribute('aria-label', title + ' képének nagyítása');
      $('[data-b2b-image-title]', gallery).textContent = title;
      $('[data-b2b-image-index]', gallery).textContent = '0' + (current + 1) + ' / 03';
      if (dialog) {
        $('[data-b2b-dialog-image]', dialog).src = src;
        $('[data-b2b-dialog-image]', dialog).alt = imageDescriptions[current];
        $('[data-b2b-dialog-title]', dialog).textContent = title;
        $('[data-b2b-dialog-count]', dialog).textContent = (current + 1) + ' / ' + thumbs.length;
      }
    }
    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener('click', function () { selectImage(i); });
      thumb.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        selectImage(i + (event.key === 'ArrowRight' ? 1 : -1));
        thumbs[current].focus();
      });
    });
    if (dialog && typeof dialog.showModal === 'function') {
      enlarge.addEventListener('click', function () {
        selectImage(current);
        dialog.showModal();
        document.documentElement.classList.add('b2b-gallery-open');
      });
      $('[data-b2b-close]', dialog).addEventListener('click', function () { dialog.close(); });
      $('[data-b2b-prev]', dialog).addEventListener('click', function () { selectImage(current - 1); });
      $('[data-b2b-next]', dialog).addEventListener('click', function () { selectImage(current + 1); });
      dialog.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
          var controls = $all('button', dialog);
          var first = controls[0], last = controls[controls.length - 1];
          if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
          }
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          selectImage(current + (event.key === 'ArrowRight' ? 1 : -1));
        }
      });
      dialog.addEventListener('click', function (event) {
        var bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
      });
      dialog.addEventListener('close', function () {
        document.documentElement.classList.remove('b2b-gallery-open');
        enlarge.focus({ preventScroll: true });
      });
    }

    var textarea = $('textarea', form);
    var count = $('[data-b2b-count]', form);
    var status = $('[data-b2b-status]', form);
    var required = $all('[required]', form);
    function updateCount() { count.textContent = textarea.value.length + ' / ' + textarea.maxLength; }
    textarea.addEventListener('input', updateCount);
    form.addEventListener('reset', function () { setTimeout(updateCount, 0); });
    updateCount();
    $all('[data-b2b-interest]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var choice = $all('input[name="irany"]', form).filter(function (radio) { return radio.value === link.getAttribute('data-b2b-interest'); })[0];
        if (!choice) return;
        event.preventDefault();
        choice.checked = true;
        choice.dispatchEvent(new Event('change', { bubbles: true }));
        form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        choice.focus({ preventScroll: true });
      });
    });
    // Az online adapter kezeli a valódi küldést; a helyi oldal csak ellenőriz.
    if (IS_WOO) {
      $('[data-b2b-preview]', form).hidden = true;
      $('[data-b2b-submit-label]', form).textContent = 'Ajánlatot kérek';
      return;
    }
    form.noValidate = true;
    function validate(field) {
      var invalid = !field.value.trim() || !field.checkValidity();
      var wrapper = field.closest('.b2b-field');
      var error = $('.b2b-field__error', wrapper);
      if (invalid && !error) {
        error = document.createElement('small');
        error.className = 'b2b-field__error';
        error.id = field.id + '-error';
        error.textContent = field.getAttribute('data-error');
        wrapper.appendChild(error);
      }
      field.setAttribute('aria-invalid', String(invalid));
      if (invalid) field.setAttribute('aria-describedby', error.id);
      else {
        field.removeAttribute('aria-describedby');
        if (error) error.remove();
      }
      return !invalid;
    }
    required.forEach(function (field) {
      field.addEventListener('blur', function () { if (field.value || field.getAttribute('aria-invalid') === 'true') validate(field); });
      field.addEventListener('input', function () { if (field.hasAttribute('aria-invalid')) validate(field); });
    });
    form.addEventListener('input', function () { status.hidden = true; status.textContent = ''; });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var firstInvalid = null;
      required.forEach(function (field) { if (!validate(field) && !firstInvalid) firstInvalid = field; });
      if (firstInvalid) { firstInvalid.focus(); return; }
      status.textContent = 'Az ajánlatkérés ellenőrzése kész. Ez helyi előnézet: az üzenetet nem küldtük el. A kitöltött adataid megmaradtak; valódi megkereséshez írj a layeroprint@gmail.com címre.';
      status.hidden = false;
      status.focus();
    });
  }

  function initLpShowcase() {
    $all('[data-lp-showcase]').forEach(function (frame) {
      var imgs = $all('.sh-spotlight__img', frame);
      if (imgs.length < 2) return;
      var stage = frame.parentElement;
      var dots = stage ? $all('.sh-spotlight__dot', stage) : [];
      var badge = $('[data-lp-badge]', frame);
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var i = 0, timer = null;
      function show(n) {
        i = (n + imgs.length) % imgs.length;
        imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === i); });
        dots.forEach(function (d, k) {
          var on = k === i;
          d.classList.toggle('is-on', on);
          d.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        if (badge) badge.textContent = imgs[i].getAttribute('data-badge') || '';
      }
      function start() { if (!reduce && !timer) timer = setInterval(function () { show(i + 1); }, 3800); }
      function stop() { clearInterval(timer); timer = null; }
      dots.forEach(function (d, k) { d.addEventListener('click', function () { stop(); show(k); start(); }); });
      frame.addEventListener('mouseenter', stop);
      frame.addEventListener('mouseleave', start);
      start();
    });
  }

  /* ── LANDING: ajánlatkérő űrlapok (a kapcsolat-űrlap mintája) ─────
     form[data-lp-quote]: mezőnkénti hibaüzenet (data-err), karakter-
     számláló, küldés-állapot, siker-panel (data-success), újrakezdés. */
  function initLpQuoteForms() {
    $all('form[data-lp-quote]').forEach(function (form) {
      if (form.hasAttribute('data-cq-form') || form.hasAttribute('data-b2b-quote')) return;
      var fields = $('.sh-form__fields', form);
      form.setAttribute('novalidate', '');

      var ta = $('textarea[maxlength]', form);
      var count = $('[data-lp-count]', form);
      if (ta && count) {
        var updCount = function () { count.textContent = ta.value.length + ' / ' + ta.getAttribute('maxlength'); };
        ta.addEventListener('input', updCount);
        updCount();
      }

      function setErr(field, on) {
        var wrap = field.closest('.sh-field');
        if (!wrap) return;
        wrap.classList.toggle('is-error', on);
        var err = $('.sh-field__err', wrap);
        if (on && !err) {
          err = document.createElement('small');
          err.className = 'sh-field__err';
          err.textContent = field.getAttribute('data-err') || 'Ellenőrizd ezt a mezőt.';
          wrap.appendChild(err);
        } else if (!on && err) err.remove();
      }
      var reqFields = $all('input[required], textarea[required]', form);
      reqFields.forEach(function (f) {
        f.addEventListener('blur', function () { if (f.value) setErr(f, !f.checkValidity()); });
        f.addEventListener('input', function () { if (f.checkValidity()) setErr(f, false); });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var bad = null;
        reqFields.forEach(function (f) {
          var invalid = !f.checkValidity();
          setErr(f, invalid);
          if (invalid && !bad) bad = f;
        });
        if (bad) { bad.focus(); return; }

        var btn = $('.sh-ctform__send', form);
        var btnHtml = btn ? btn.innerHTML : '';
        if (btn) { btn.classList.add('is-busy'); btn.setAttribute('disabled', ''); btn.textContent = 'Küldés…'; }

        // demo: nincs backend — rövid „küldés" után siker-panel
        setTimeout(function () {
          if (fields) fields.hidden = true;
          var done = document.createElement('div');
          done.className = 'sh-ct-done';
          done.innerHTML =
            '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<circle cx="32" cy="32" r="28"/><path d="m21 33 8 8 15-16"/>' +
            '</svg>' +
            '<h2>Köszönjük, megkaptuk!</h2>' +
            '<p>' + esc(form.getAttribute('data-success') || 'A megkeresés megérkezett — hamarosan válaszolunk.') + '</p>' +
            '<button class="sh-btn sh-btn--ghost" type="button">Új üzenet írása</button>';
          form.appendChild(done);
          $('button', done).addEventListener('click', function () {
            done.remove();
            form.reset();
            if (ta && count) count.textContent = '0 / ' + ta.getAttribute('maxlength');
            if (fields) fields.hidden = false;
            if (btn) { btn.classList.remove('is-busy'); btn.removeAttribute('disabled'); btn.innerHTML = btnHtml; }
          });
        }, 650);
      });
    });
  }
})();


/* ═══════════════════════════════════════════════════════════════════
   ELEVATE 4.0 — „LIVING LIGHT" interaktív réteg
   Külön IIFE: a fő szkript már felépítette a fejlécet/kártyákat, mire
   ez lefut. Minden effekt tiszteletben tartja a prefers-reduced-motion-t
   és a mutató típusát; a fő logikát nem érinti.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function raf(fn) { return window.requestAnimationFrame ? requestAnimationFrame(fn) : setTimeout(fn, 16); }

  /* ── 1. görgetés-jelző fénysáv — ELTÁVOLÍTVA (felhasználói kérésre;
        a felső futó csík zavaró volt, és nem illik a csík-mentes UI-ba) ── */

  /* (A kártyák kurzort követő fény-foltja + 3D-dőlése eltávolítva —
     a felhasználó szerint remegett/„ugrált" a border. A kártyák hoverje
     most a tiszta, stabil CSS-emelés + árnyék.) */

  /* ── 3. HERO ────────────────────────────────────────────────────── */
  /* (A görgetés-jelző eltávolítva — a villanykapcsolós hero interaktív
     kapcsolóval zárul, a cue redundáns zaj lenne.) */

  /* ── 4. repülés a kosárba + jelvény-pukkanás ────────────────────── */
  (function () {
    var PRODS = window.SHOP_PRODUCTS || [];
    function prod(id) { for (var i = 0; i < PRODS.length; i++) if (PRODS[i].id === id) return PRODS[i]; return null; }

    // jelvény-pukkanás minden kosárszám-növekedéskor (kártya, drawer, upsell)
    var badge = $('.sh-cart-badge');
    if (badge && !reduce) {
      var prev = parseInt(badge.textContent, 10) || 0;
      var mo = new MutationObserver(function () {
        var n = parseInt(badge.textContent, 10) || 0;
        if (n > prev) {
          badge.classList.remove('is-bump'); void badge.offsetWidth; badge.classList.add('is-bump');
          var cb = $('.sh-cart-btn');
          if (cb) { cb.classList.remove('is-pulse'); void cb.offsetWidth; cb.classList.add('is-pulse'); }
        }
        prev = n;
      });
      mo.observe(badge, { childList: true, characterData: true, subtree: true });
    }

    if (reduce) return;
    // capture fázis: a fő „kosárba" kezelő előtt indítjuk a repülést
    document.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      var src = null, imgUrl = null;
      var btn = e.target.closest('[data-add]');
      if (btn) {
        // rács- / gyorsnézet-kártya
        var p = prod(btn.getAttribute('data-add'));
        if (!p || !p.kepek || !p.kepek[0] || p.szemelyre_szabott === true || Array.isArray(p.variaciok)) return;
        imgUrl = p.kepek[0];
        var host = btn.closest('.sh-prod-card') || btn.closest('.sh-qv__box') || document;
        src = host.querySelector ? (host.querySelector('figure img') || host.querySelector('img')) : null;
      } else if (e.target.closest('#sh-add-btn')) {
        // termékoldal fő „Kosárba" gombja
        var main = document.querySelector('#sh-pmain');
        if (!main) return;
        src = main; imgUrl = main.currentSrc || main.src;
      } else {
        return;
      }
      flyToCart(src || btn, imgUrl);
    }, true);

    function flyToCart(sourceEl, imgUrl) {
      var cart = $('.sh-cart-btn');
      if (!cart || !sourceEl) return;
      var s = sourceEl.getBoundingClientRect(), c = cart.getBoundingClientRect();
      if (!s.width) return;
      var size = Math.min(120, Math.max(58, s.width * 0.5));
      var fly = document.createElement('img');
      fly.src = imgUrl; fly.className = 'sh-fly'; fly.alt = '';
      fly.style.width = size + 'px'; fly.style.height = size + 'px';
      fly.style.left = (s.left + s.width / 2 - size / 2) + 'px';
      fly.style.top = (s.top + s.height / 2 - size / 2) + 'px';
      document.body.appendChild(fly);
      var dx = (c.left + c.width / 2) - (s.left + s.width / 2);
      var dy = (c.top + c.height / 2) - (s.top + s.height / 2);
      raf(function () {
        raf(function () {
          fly.style.transform = 'translate(' + dx.toFixed(0) + 'px,' + dy.toFixed(0) + 'px) scale(0.12) rotate(9deg)';
          fly.style.opacity = '0.25';
        });
      });
      var done = false;
      function fin() { if (done) return; done = true; if (fly.parentNode) fly.remove(); }
      fly.addEventListener('transitionend', fin);
      setTimeout(fin, 1050);
    }
  })();

  /* ── 5. gördülő számok ([data-count]) ───────────────────────────── */
  (function () {
    var els = [].slice.call(document.querySelectorAll('[data-count]'));
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduce) { el.textContent = target + suffix; return; }
      var dur = 1400, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString('hu-HU') + suffix;
        if (t < 1) raf(step);
      }
      raf(step);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ── 6. állandó sticky fejléc ──────────────────────────────────── */
  (function () {
    var header = $('.sh-header');
    if (header) header.classList.remove('is-away');
  })();

  /* ── 7. termékgaléria: lightbox + rámutatós pan-zoom ────────────── */
  (function () {
    var wrap = $('.sh-pgallery__main');
    if (!wrap) return;
    var mainImg = $('img', wrap);

    // pan-zoom: a kurzor alatti részletre nagyít
    if (fine && !reduce && mainImg) {
      var zPend = false, zE = null;
      wrap.addEventListener('pointermove', function (e) {
        zE = e;
        if (zPend) return; zPend = true;
        raf(function () {
          zPend = false;
          var r = wrap.getBoundingClientRect();
          mainImg.style.transformOrigin =
            (((zE.clientX - r.left) / r.width) * 100).toFixed(1) + '% ' +
            (((zE.clientY - r.top) / r.height) * 100).toFixed(1) + '%';
          wrap.classList.add('is-zooming');
        });
      }, { passive: true });
      wrap.addEventListener('pointerleave', function () {
        wrap.classList.remove('is-zooming');
        mainImg.style.transformOrigin = '';
      });
    }

    // lightbox
    var lbx = null, idx = 0, zoomed = false, galleryTrigger = null, galleryOverflow = '';
    function srcs() {
      var t = [].slice.call(wrap.closest('.sh-pgallery').querySelectorAll('.sh-pgallery__thumbs button'));
      var images = t.map(function (b) { return b.getAttribute('data-src') || b.getAttribute('data-layero-gallery-image'); }).filter(Boolean);
      return images.length ? images.map(function (src) { return new URL(src, document.baseURI).href; }) : (mainImg ? [mainImg.src] : []);
    }
    function build() {
      if (lbx) return;
      lbx = document.createElement('dialog');
      lbx.className = 'sh-lbx';
      lbx.setAttribute('role', 'dialog');
      lbx.setAttribute('aria-modal', 'true');
      lbx.setAttribute('aria-label', 'Képnézegető');
      var h1 = document.querySelector('.sh-pinfo h1');
      lbx.innerHTML =
        '<div class="sh-lbx__stage"><img alt=""></div>' +
        '<button class="sh-lbx__close" type="button" aria-label="Bezárás">✕</button>' +
        '<button class="sh-lbx__nav sh-lbx__nav--prev" type="button" aria-label="Előző kép">‹</button>' +
        '<button class="sh-lbx__nav sh-lbx__nav--next" type="button" aria-label="Következő kép">›</button>' +
        '<div class="sh-lbx__bar">' +
          '<span class="sh-lbx__cap"></span>' +
          '<div class="sh-lbx__dots"></div>' +
        '</div>';
      document.body.appendChild(lbx);
      $('.sh-lbx__stage img', lbx).alt = h1 ? h1.textContent : 'Termékfotó';
      $('.sh-lbx__cap', lbx).textContent = h1 ? h1.textContent : '';
      var stage = $('.sh-lbx__stage', lbx);
      $('.sh-lbx__close', lbx).addEventListener('click', close);
      lbx.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
      $('.sh-lbx__nav--prev', lbx).addEventListener('click', function () { go(idx - 1); });
      $('.sh-lbx__nav--next', lbx).addEventListener('click', function () { go(idx + 1); });
      lbx.addEventListener('click', function (e) { if (e.target === lbx || e.target === stage) close(); });
      // kattintásra 2× zoom a kattintás pontjára
      stage.addEventListener('click', function (e) {
        if (e.target.tagName !== 'IMG') return;
        zoomed = !zoomed;
        if (zoomed) {
          var r = e.target.getBoundingClientRect();
          e.target.style.transformOrigin =
            (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '% ' +
            (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%';
        }
        stage.classList.toggle('is-zoomed', zoomed);
      });
      // swipe mobilon
      var sx = null;
      lbx.addEventListener('pointerdown', function (e) { sx = e.clientX; }, { passive: true });
      lbx.addEventListener('pointerup', function (e) {
        if (sx === null || zoomed) return;
        var dx = e.clientX - sx; sx = null;
        if (Math.abs(dx) > 44) go(idx + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }
    function go(i) {
      var list = srcs();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      zoomed = false;
      var stage = $('.sh-lbx__stage', lbx);
      stage.classList.remove('is-zoomed');
      var img = $('img', stage);
      img.style.transformOrigin = '';
      img.src = list[idx];
      var dots = $('.sh-lbx__dots', lbx);
      var focusedDot = dots.contains(document.activeElement);
      dots.innerHTML = list.map(function (_, n) {
        return '<button type="button"' + (n === idx ? ' class="is-on"' : '') + ' aria-pressed="' + (n === idx ? 'true' : 'false') + '" aria-label="' + (n + 1) + '. kép"></button>';
      }).join('');
      [].forEach.call(dots.children, function (b, n) {
        b.addEventListener('click', function () { go(n); });
      });
      if (focusedDot) dots.children[idx].focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        go(idx + (e.key === 'ArrowLeft' ? -1 : 1));
        $('.sh-lbx__close', lbx).focus();
      } else if (e.key === 'Tab') {
        var buttons = lbx.querySelectorAll('button');
        var first = buttons[0], last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    function open(startSrc) {
      build();
      if (lbx.open) return;
      galleryTrigger = document.activeElement;
      var list = srcs();
      var active = wrap.closest('.sh-pgallery').querySelector('.sh-pgallery__thumbs button.is-on');
      var selected = active && (active.getAttribute('data-src') || active.getAttribute('data-layero-gallery-image'));
      var at = Math.max(0, list.indexOf(selected ? new URL(selected, document.baseURI).href : startSrc));
      go(at);
      lbx.classList.add('is-open');
      lbx.showModal();
      galleryOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
      $('.sh-lbx__close', lbx).focus();
    }
    function close() {
      if (!lbx || !lbx.classList.contains('is-open')) return;
      lbx.classList.remove('is-open');
      lbx.close();
      document.body.style.overflow = galleryOverflow;
      document.removeEventListener('keydown', onKey);
      if (galleryTrigger) galleryTrigger.focus({ preventScroll: true });
    }
    wrap.addEventListener('click', function () {
      open(mainImg ? (mainImg.currentSrc || mainImg.src) : null);
    });
  })();

  /* ── 8. szív-pukkanás a kedvencekhez adáskor ────────────────────── */
  (function () {
    var COLORS = ['#ff5b77', '#ff9f2d', '#f0c27a', '#00c2e0'];
    document.addEventListener('click', function (e) {
      if (!e.target.closest) return;
      var b = e.target.closest('[data-wish]');
      if (!b) return;
      // a fő kezelő már átbillentette az állapotot, mire ez lefut
      setTimeout(function () {
        if (!b.classList.contains('is-on')) return;
        b.classList.remove('is-pop'); void b.offsetWidth; b.classList.add('is-pop');
        if (reduce) return;
        var r = b.getBoundingClientRect();
        var burst = document.createElement('div');
        burst.className = 'sh-wishburst';
        burst.setAttribute('aria-hidden', 'true');
        burst.style.left = (r.left + r.width / 2) + 'px';
        burst.style.top = (r.top + r.height / 2) + 'px';
        for (var i = 0; i < 8; i++) {
          var p = document.createElement('i');
          var a = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
          var d = 22 + Math.random() * 16;
          p.style.setProperty('--dx', (Math.cos(a) * d).toFixed(0) + 'px');
          p.style.setProperty('--dy', (Math.sin(a) * d).toFixed(0) + 'px');
          p.style.setProperty('--c', COLORS[i % COLORS.length]);
          burst.appendChild(p);
        }
        document.body.appendChild(burst);
        setTimeout(function () { burst.remove(); }, 720);
      }, 0);
    });
  })();

  /* ── 9. blur-up képbetöltés: a fotók fényből élesednek elő ──────── */
  (function () {
    if (reduce) return;
    var SEL = '.sh-prod-card figure img:not(.sh-pc-img2), .sh-bento img, .sh-gallery-strip img, .sh-pgallery__thumbs img';
    [].forEach.call(document.querySelectorAll(SEL), function (img) {
      if (!img.complete) img.classList.add('sh-imgwait');
    });
    document.addEventListener('load', function (e) {
      var t = e.target;
      if (!t || t.tagName !== 'IMG' || !t.matches || !t.matches(SEL)) return;
      t.classList.remove('sh-imgwait');
      t.classList.add('sh-imgin');
    }, true);
  })();
})();
