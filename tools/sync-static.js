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
 *  4. 12 oldal HTML  -> assets/static/*.html                (változatlan másolat)
 *  5. A forrásokban hivatkozott assets/... képek -> assets/demo/... (csak a
 *     hivatkozottak; meglévő fájlokat nem töröl)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const PLUGIN_ROOT = path.resolve(__dirname, '..');
const SHOP_ROOT = path.resolve(PLUGIN_ROOT, '..');

const PAGES = [
  'index.html', 'kategoria.html', 'termek.html', 'rolunk.html', 'gyik.html',
  'kapcsolat.html', 'kviz.html', 'kosar.html', 'penztar.html', 'fiok.html',
  'kedvencek.html', '404.html', 'aszf.html', 'adatvedelem.html',
];

function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); }

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

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
    var parts = clean.split('?');
    var mapped = STATIC_CFG.urls && STATIC_CFG.urls[parts[0]];
    if (!mapped) return value;
    return mapped + (parts[1] ? '?' + parts[1] : '');
  }
  function fixStaticUrls(root) {
    $all('img[src]', root).forEach(function (img) {
      var next = normalizeAssetUrl(img.getAttribute('src'));
      if (next && next !== img.getAttribute('src')) img.setAttribute('src', next);
    });
    $all('img[srcset]', root).forEach(function (img) {
      var raw = img.getAttribute('srcset');
      var next = raw.split(',').map(function (part) {
        var bits = part.trim().split(/\\s+/);
        bits[0] = normalizeAssetUrl(bits[0]);
        return bits.join(' ');
      }).join(', ');
      if (next !== raw) img.setAttribute('srcset', next);
    });
    $all('a[href]', root).forEach(function (link) {
      var next = normalizePageUrl(link.getAttribute('href'));
      if (next && next !== link.getAttribute('href')) link.setAttribute('href', next);
    });
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
  // a) adapter a $all helper után
  const helperAnchor = "function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }\n";
  let out = replaceOnce(src, helperAnchor, helperAnchor + ADAPTER, '$all helper');

  // b) oldal-felismerés: body data-page VAGY [data-layero-page] marker
  const pageAnchor = "  var page = document.body.getAttribute('data-page');\n";
  const pageReplace =
    "  var marker = document.querySelector('[data-layero-page]');\n" +
    "  var page = document.body.getAttribute('data-page') || (marker ? marker.getAttribute('data-layero-page') : '');\n";
  out = replaceOnce(out, pageAnchor, pageReplace, 'page detektálás');

  // c) URL-fix + MutationObserver közvetlenül az observeReveals() elé (boot vége)
  const bootAnchor = "  observeReveals();\n})();";
  out = replaceOnce(out, bootAnchor, BOOT_FIX + bootAnchor, 'boot observeReveals');

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

function main() {
  const shopCss = read(path.join(SHOP_ROOT, 'shop.css'));
  const shopData = read(path.join(SHOP_ROOT, 'shop-data.js'));
  const shopJs = read(path.join(SHOP_ROOT, 'shop.js'));

  write(path.join(PLUGIN_ROOT, 'assets/css/layero-static-shop.css'), shopCss);
  write(path.join(PLUGIN_ROOT, 'assets/js/layero-static-data.js'), shopData);
  write(path.join(PLUGIN_ROOT, 'assets/js/layero-static-shop.js'), buildStaticShopJs(shopJs));
  console.log('CSS / data / adaptált JS szinkronizálva.');

  const pageTexts = [];
  PAGES.forEach(function (page) {
    const from = path.join(SHOP_ROOT, page);
    const html = read(from);
    pageTexts.push(html);
    write(path.join(PLUGIN_ROOT, 'assets/static', page), html);
  });
  console.log(PAGES.length + ' oldal másolva az assets/static alá.');

  const refs = collectAssetRefs([shopCss, shopData, shopJs].concat(pageTexts));
  let copied = 0;
  const missing = [];
  refs.forEach(function (ref) {
    const from = path.join(SHOP_ROOT, ref);
    const to = path.join(PLUGIN_ROOT, 'assets/demo', ref.slice('assets/'.length));
    if (!fs.existsSync(from)) { missing.push(ref); return; }
    copyFile(from, to);
    copied += 1;
  });
  console.log(copied + ' hivatkozott kép szinkronizálva az assets/demo alá.');
  if (missing.length) {
    console.warn('Hiányzó forrásfájlok (' + missing.length + '):');
    missing.forEach(function (ref) { console.warn('  - ' + ref); });
  }
}

main();
