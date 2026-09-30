'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { buildStaticShopJs, prepareSync, applySync, PAGES, ORIGIN_FILES } = require('../tools/sync-static');

const source = "function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }\n" +
  "  var page = document.body.getAttribute('data-page');\n" +
  '  observeReveals();\n';
const outputRoot = path.resolve(__dirname, '../../output/sync-tests');

function fixture(t) {
  fs.mkdirSync(outputRoot, { recursive: true });
  const root = fs.mkdtempSync(path.join(outputRoot, 'case-'));
  const shop = path.join(root, 'shop');
  const plugin = path.join(root, 'plugin');
  const backups = path.join(root, 'backups');
  function write(relative, text) {
    const file = path.join(shop, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
  }
  write('shop.js', source.replace(/\n/g, '\r\n'));
  write('shop-data.js', 'var SHOP_PRODUCTS = [];');
  write('shop.css', 'body { color: black; }');
  for (const page of PAGES) write(page, '<body><img src="assets/picture.svg"></body>');
  write('assets/picture.svg', '<svg/>');
  write('assets/layero-consent.js', 'window.LayeroConsent = { allows: () => false };');
  write('assets/layero-variants.js', 'window.LayeroVariants = {};');
  write('assets/testimonials.css', '.lr-card { display: flex; }');
  write('assets/testimonials.js', 'void 0;');
  for (const file of ['catalog.json', 'layero-badges.js', 'layero-badges.css', 'layero-adapter.js']) write('assets/layero-badges/' + file, file.endsWith('.js') ? 'void 0;' : '{}');
  for (const file of ORIGIN_FILES) write('assets/layero-origin/' + file, file.endsWith('.js') ? 'void 0;' : '');
  write('assets/layero-origin/origin-modal.html', '<img src="images/process.svg"><img src="../logo.svg">');
  write('assets/layero-origin/lyo-origin.css', 'body {background:url("images/texture.svg")}');
  write('assets/layero-origin/images/process.svg', '<svg/>');
  write('assets/layero-origin/images/texture.svg', '<svg/>');
  write('assets/logo.svg', '<svg/>');
  t.after(() => {
    const resolved = path.resolve(root);
    assert.ok(resolved.startsWith(outputRoot + path.sep));
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  return { shop, plugin, backups, write };
}

test('LF and CRLF build identical valid JavaScript; duplicate/missing anchors fail', () => {
  const lf = buildStaticShopJs(source);
  assert.equal(buildStaticShopJs(source.replace(/\n/g, '\r\n')), lf);
  assert.doesNotThrow(() => new vm.Script(lf));
  assert.throws(() => buildStaticShopJs(source.replace('observeReveals();', 'changed();')), /horgony/);
  assert.throws(() => buildStaticShopJs(source + '  observeReveals();\n'), /Több/);
});

test('preflight missing asset or broken JS does not write any plugin file', t => {
  const f = fixture(t);
  f.write('index.html', '<img src="assets/missing.svg">');
  assert.throws(() => prepareSync(f.shop, f.plugin), /ENOENT/);
  assert.equal(fs.existsSync(f.plugin), false);
  f.write('index.html', '');
  f.write('shop.js', 'invalid source');
  assert.throws(() => prepareSync(f.shop, f.plugin), /horgony/);
  assert.equal(fs.existsSync(f.plugin), false);
});

test('sync includes Origin dependencies, preserves previous content, is idempotent', t => {
  const f = fixture(t);
  const plan = prepareSync(f.shop, f.plugin);
  assert.ok(plan.some(e => e.relative.endsWith('images/texture.svg')));
  assert.ok(plan.some(e => e.relative.endsWith('demo/logo.svg')));
  assert.ok(plan.some(e => e.relative.endsWith('layero-origin/mount.js')));
  assert.ok(plan.some(e => e.relative.endsWith('layero-badges/layero-badges.js')));
  assert.ok(plan.some(e => e.relative.endsWith('layero-badges/catalog.json')));
  assert.ok(plan.some(e => e.relative === 'assets/demo/layero-variants.js'));
  assert.equal(plan.find(e => e.relative === 'assets/js/layero-consent.js').content.toString(), 'window.LayeroConsent = { allows: () => false };');
  assert.equal(plan.find(e => e.relative === 'assets/css/layero-testimonials.css').content.toString(), '.lr-card { display: flex; }');
  assert.equal(plan.find(e => e.relative === 'assets/js/layero-testimonials.js').content.toString(), 'void 0;');
  applySync(plan, f.backups);
  assert.equal(prepareSync(f.shop, f.plugin).filter(e => e.changed).length, 0);
  assert.equal(applySync(prepareSync(f.shop, f.plugin), f.backups), null);
  f.write('shop.css', 'new CSS');
  const backup = applySync(prepareSync(f.shop, f.plugin), f.backups);
  assert.equal(fs.readFileSync(path.join(backup, 'assets/css/layero-static-shop.css'), 'utf8'), 'body { color: black; }');
  assert.equal(fs.readFileSync(path.join(f.shop, 'shop.js'), 'utf8'), source.replace(/\n/g, '\r\n'));
});

test('a write failure rolls back previous writes; source races abort before writes', t => {
  const f = fixture(t);
  applySync(prepareSync(f.shop, f.plugin), f.backups);
  f.write('shop.css', 'new CSS');
  f.write('shop-data.js', 'var changed = true;');
  const plan = prepareSync(f.shop, f.plugin);
  const write = fs.writeFileSync;
  let failed = false;
  fs.writeFileSync = function (file, data, ...rest) {
    if (!failed && file === path.join(f.plugin, 'assets/js/layero-static-data.js')) {
      failed = true;
      throw new Error('simulated disk failure');
    }
    return write.call(fs, file, data, ...rest);
  };
  try { assert.throws(() => applySync(plan, f.backups), /visszaállítottuk/); }
  finally { fs.writeFileSync = write; }
  assert.equal(fs.readFileSync(path.join(f.plugin, 'assets/css/layero-static-shop.css'), 'utf8'), 'body { color: black; }');
  write(path.join(f.plugin, 'assets/js/layero-static-data.js'), 'user edit');
  assert.throws(() => applySync(plan, f.backups), /Időközben módosult/);
  assert.equal(fs.readFileSync(path.join(f.plugin, 'assets/js/layero-static-data.js'), 'utf8'), 'user edit');
});

test('WP adapter preserves fragments and queries and resolves actual product permalinks', () => {
  const document = {
    body: { getAttribute: () => 'home' }, querySelector: () => null,
    querySelectorAll: () => [], addEventListener: () => {}
  };
  const context = { document, URL, URLSearchParams, location: { href: 'https://shop.example/rolunk/' },
    window: { LayeroShopStatic: { productUrls: { lamp: 'https://shop.example/termek/lamp/' },
      urls: { 'rolunk.html': 'https://shop.example/about/?lang=hu', 'termek.html': 'https://shop.example/catalog/' } } }, observeReveals() {} };
  vm.createContext(context);
  vm.runInContext(buildStaticShopJs(source), context);
  assert.equal(context.normalizePageUrl('rolunk.html?from=origin#muhely'), 'https://shop.example/about/?lang=hu&from=origin#muhely');
  assert.equal(context.normalizePageUrl('termek.html?id=lamp&utm_source=quiz'), 'https://shop.example/termek/lamp/?utm_source=quiz');
  assert.equal(context.normalizePageUrl('mailto:test@example.com'), 'mailto:test@example.com');
  assert.equal(context.normalizePageUrl('#section'), '#section');
  const attrs = { href: 'termek.html?id=lamp' };
  const node = { querySelectorAll: () => [], matches: sel => sel === 'a[href]', getAttribute: key => attrs[key], setAttribute: (key, value) => { attrs[key] = value; } };
  context.fixStaticUrls(node);
  assert.equal(attrs.href, 'https://shop.example/termek/lamp/');
});
