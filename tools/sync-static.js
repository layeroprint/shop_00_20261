/*
 * Layero statikus tükör szinkron
 * ------------------------------
 * A lokális statikus shopot (C:\layero webshop) tükrözi a pluginba, hogy az
 * oldal online (WordPress + Elementor "Layero statikus oldal" widget) pontosan
 * a lokális verzióra legyen visszaépíthető.
 *
 * Futtatás a plugin gyökeréből:  node tools/sync-static.js
 *
 * Mit csinál:
 *  1. shop.css       -> assets/css/layero-static-shop.css   (változatlan másolat)
 *  2. shop-data.js   -> assets/js/layero-static-data.js     (változatlan másolat)
 *  3. shop.js        -> assets/js/layero-static-shop.js     (+ WP adapter réteg:
 *       - STATIC_CFG / normalizeAssetUrl / normalizePageUrl / fixStaticUrls
 *       - data-layero-page marker támogatás a body data-page mellett
 *       - fixStaticUrls(document) + MutationObserver a boot végén)
 *  4. 16 oldal HTML  -> assets/static/*.html                (változatlan másolat)
 *  5. A forrásokban hivatkozott assets/... képek -> assets/demo/... (csak a
 *     hivatkozottak; meglévő fájlokat nem töröl)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PLUGIN_ROOT = path.resolve(__dirname, '..');
const SHOP_ROOT = path.resolve(PLUGIN_ROOT, '..');

const PAGES = [
  'index.html', 'kategoria.html', 'termek.html', 'rolunk.html', 'gyik.html',
  'kapcsolat.html', 'kviz.html', 'kosar.html', 'penztar.html', 'fiok.html',
  'kedvencek.html', '404.html', 'aszf.html', 'adatvedelem.html',
  'cegeknek.html', 'egyedi-rendeles.html',
];

function read(p) { return fs.readFileSync(p, 'utf8'); }
const ORIGIN_FILES = ['mount.js', 'lyo-origin.js', 'lyo-origin.css', 'integration.css'];

/* ── 3. shop.js -> layero-static-shop.js (adapter beszúrása) ───────── */

const ADAPTER = `  var STATIC_CFG = window.LayeroShopStatic || {};
  function normalizeAssetUrl(value) {
    if (!value || /^(https?:|data:|\\/wp-content\\/|\\/uploads\\/)/.test(value)) return value;
    if (value.indexOf('/wp-content/') === 0) return value;
    if (value.indexOf('assets/') === 0 && STATIC_CFG.assetBase) return STATIC_CFG.assetBase + value.slice(7);
    return value;
  }
  function normalizePageUrl(value) {
    if (!value || value.charAt(0) === '#' || /^(mailto:|tel:|https?:|data:)/.test(value)) return value;
    var clean = value.replace(/^\\.?\\//, '');
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
  var purchaseSelector = '[data-add], [data-add-quote], [data-dr-add], [data-qv], [data-qv-add], #sh-add-btn, #sh-bundle-add, .sh-stickybar button';
  function wooProductUrl(id) {
    return (STATIC_CFG.productUrls && STATIC_CFG.productUrls[id]) ||
      (STATIC_CFG.urls && STATIC_CFG.urls['kategoria.html']);
  }
  // A mirrored page is a catalogue in WordPress. Buying always continues on
  // the real Woo product page, where prices, variations and fields are checked.
  if (STATIC_CFG.commerce === 'woocommerce') {
    document.addEventListener('click', function (event) {
      var target = event.target.closest && event.target.closest(purchaseSelector + ', .sh-cart-btn');
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      var id = target.getAttribute('data-add') || target.getAttribute('data-add-quote') ||
        target.getAttribute('data-dr-add') || target.getAttribute('data-qv') || new URLSearchParams(location.search).get('id');
      var url = target.matches('.sh-cart-btn') ? STATIC_CFG.urls['kosar.html'] : wooProductUrl(id);
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
        var bits = part.trim().split(/\\s+/);
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
      staticNodes(purchaseSelector, root).forEach(function (button) {
        if (button.hasAttribute('data-qv')) return;
        if (button.textContent !== 'Termék megnyitása') button.textContent = 'Termék megnyitása';
        button.setAttribute('aria-label', 'Termék megnyitása');
      });
      staticNodes('.sh-cart-badge', root).forEach(function (badge) { badge.hidden = true; });
    }
  }
`;

const BOOT_FIX = `  fixStaticUrls(document);
  if (window.MutationObserver) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        [].forEach.call(mutation.addedNodes || [], function (node) {
          if (node && node.nodeType === 1) fixStaticUrls(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
`;

function replaceOnce(source, find, replace, label) {
  const idx = source.indexOf(find);
  if (idx === -1) throw new Error('Nem található a horgony: ' + label);
  if (source.indexOf(find, idx + 1) !== -1) throw new Error('Több találat a horgonyra: ' + label);
  return source.slice(0, idx) + replace + source.slice(idx + find.length);
}

function buildStaticShopJs(src) {
  // Only the generated JS is normalized; the editable source stays untouched.
  src = src.replace(/\r\n?/g, '\n');
  // a) adapter a $all helper után
  const helperAnchor = "function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }\n";
  let out = replaceOnce(src, helperAnchor, helperAnchor + ADAPTER, '$all helper');

  // b) oldal-felismerés: body data-page VAGY [data-layero-page] marker
  const pageAnchor = "  var page = document.body.getAttribute('data-page');\n";
  const pageReplace =
    "  var marker = document.querySelector('[data-layero-page]');\n" +
    "  var page = document.body.getAttribute('data-page') || (marker ? marker.getAttribute('data-layero-page') : '');\n";
  out = replaceOnce(out, pageAnchor, pageReplace, 'page detektálás');

  // c) URL-fix + MutationObserver közvetlenül az observeReveals() hívás elé
  const bootAnchor = '\n  observeReveals();\n';
  out = replaceOnce(out, bootAnchor, '\n' + BOOT_FIX + '  observeReveals();\n', 'boot observeReveals');

  return out;
}

/* ── 5. hivatkozott képek kigyűjtése ───────────────────────────────── */

function collectAssetRefs(texts) {
  const refs = new Set();
  const re = /assets\/[A-Za-z0-9_\-./]+\.(?:webp|jpe?g|png|svg|gif|ico|woff2?)/g;
  texts.forEach(function (text) {
    let m;
    while ((m = re.exec(text)) !== null) refs.add(m[0]);
  });
  return Array.from(refs).sort();
}

/* ── futtatás ──────────────────────────────────────────────────────── */

function prepareSync(shopRoot = SHOP_ROOT, pluginRoot = PLUGIN_ROOT) {
  const entries = new Map();
  function add(relative, content) {
    const target = path.resolve(pluginRoot, relative);
    if (!target.startsWith(path.resolve(pluginRoot) + path.sep)) throw new Error('Érvénytelen cél: ' + relative);
    entries.set(relative, { relative, target, content: Buffer.isBuffer(content) ? content : Buffer.from(content) });
  }
  const shopCss = read(path.join(shopRoot, 'shop.css'));
  const shopData = read(path.join(shopRoot, 'shop-data.js'));
  const shopJs = read(path.join(shopRoot, 'shop.js'));
  const adaptedJs = buildStaticShopJs(shopJs);
  new vm.Script(adaptedJs, { filename: 'layero-static-shop.js' });
  new vm.Script(shopData, { filename: 'layero-static-data.js' });
  add('assets/css/layero-static-shop.css', shopCss);
  add('assets/js/layero-static-data.js', shopData);
  add('assets/js/layero-static-shop.js', adaptedJs);
  const pageTexts = [];
  PAGES.forEach(function (page) {
    const html = read(path.join(shopRoot, page));
    pageTexts.push(html);
    add('assets/static/' + page, html);
  });
  const refs = new Set(collectAssetRefs([shopCss, shopData, shopJs].concat(pageTexts)));
  ORIGIN_FILES.forEach(file => refs.add('assets/layero-origin/' + file));
  // The fragment and CSS contain paths relative to the Origin directory.
  const originHtml = read(path.join(shopRoot, 'assets/layero-origin/origin-modal.html'));
  const originCss = read(path.join(shopRoot, 'assets/layero-origin/lyo-origin.css'));
  for (const text of [originHtml, originCss]) {
    const re = /(?:src=["']|url\(["']?)([^"')\s]+\.(?:svg|webp|png|jpe?g))/g;
    let match;
    while ((match = re.exec(text))) {
      if (/^(?:https?:|data:|\/)/.test(match[1])) continue;
      const ref = path.posix.normalize('assets/layero-origin/' + match[1]);
      if (!ref.startsWith('assets/')) throw new Error('Érvénytelen Origin erőforrás: ' + match[1]);
      refs.add(ref);
    }
  }
  Array.from(refs).sort().forEach(function (ref) {
    const from = path.resolve(shopRoot, ref);
    if (!from.startsWith(path.resolve(shopRoot, 'assets') + path.sep)) throw new Error('Érvénytelen erőforrás: ' + ref);
    const content = fs.readFileSync(from); // Missing files fail before any target is written.
    if (ref.endsWith('.js')) new vm.Script(content.toString(), { filename: ref });
    add('assets/demo/' + ref.slice(7), content);
  });
  return Array.from(entries.values()).map(entry => {
    entry.previous = fs.existsSync(entry.target) ? fs.readFileSync(entry.target) : null;
    entry.changed = !entry.previous || !entry.content.equals(entry.previous);
    return entry;
  });
}

function applySync(plan, backupRoot = path.join(SHOP_ROOT, '.layero-sync-backups', 'wp-static')) {
  const changed = plan.filter(entry => entry.changed);
  if (!changed.length) return null;
  // Save all overwritten files before the first write, including uncommitted work.
  fs.mkdirSync(backupRoot, { recursive: true });
  const backup = fs.mkdtempSync(path.join(backupRoot, new Date().toISOString().replace(/[:.]/g, '-') + '-'));
  for (const entry of changed) {
    const current = fs.existsSync(entry.target) ? fs.readFileSync(entry.target) : null;
    if ((current === null) !== (entry.previous === null) || (current && !current.equals(entry.previous))) {
      throw new Error('Időközben módosult: ' + entry.relative + '. Futtasd újra az ellenőrzést.');
    }
    if (entry.previous) {
      const saved = path.join(backup, entry.relative);
      fs.mkdirSync(path.dirname(saved), { recursive: true });
      fs.writeFileSync(saved, entry.previous);
    }
  }
  fs.writeFileSync(path.join(backup, 'manifest.json'), JSON.stringify(changed.map(e => ({ target: e.target, saved: e.previous !== null ? e.relative : null })), null, 2));
  const written = [];
  try {
    for (const entry of changed) {
      fs.mkdirSync(path.dirname(entry.target), { recursive: true });
      written.push(entry);
      fs.writeFileSync(entry.target, entry.content);
    }
  } catch (error) {
    const failures = [];
    for (const entry of written.reverse()) {
      try {
        if (entry.previous !== null) fs.writeFileSync(entry.target, entry.previous);
        else if (fs.existsSync(entry.target)) fs.unlinkSync(entry.target);
      } catch (rollbackError) { failures.push(entry.relative); }
    }
    throw new Error(error.message + '\nMentés: ' + backup + (failures.length ? '\nKézi visszaállítás kell: ' + failures.join(', ') : '\nA megírt fájlokat visszaállítottuk.'));
  }
  return backup;
}

function main(args = process.argv.slice(2)) {
  if (args.some(arg => !['--dry-run', '--check'].includes(arg))) throw new Error('Használat: node tools/sync-static.js [--dry-run | --check]');
  const plan = prepareSync();
  const changed = plan.filter(entry => entry.changed);
  console.log(plan.length + ' ellenőrzött fájl; ' + changed.length + ' eltérés.');
  if (args.length) {
    changed.forEach(entry => console.log('  ' + entry.relative));
    if (args.includes('--check') && changed.length) process.exitCode = 1;
    return;
  }
  const backup = applySync(plan);
  console.log(backup ? 'Szinkron kész. Előző állapot: ' + backup : 'A tükör naprakész; nem írtunk fájlt.');
}

module.exports = { buildStaticShopJs, collectAssetRefs, prepareSync, applySync, PAGES, ORIGIN_FILES };
if (require.main === module) {
  try { main(); } catch (error) { console.error('A szinkron nem sikerült: ' + error.message); process.exitCode = 1; }
}
