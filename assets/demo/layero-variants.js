/* Shared, side-effect-free variation rules for the local storefront. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LayeroVariants = factory();
}(typeof window === 'object' ? window : this, function () {
  'use strict';
  function isVariable(p) { return !!p && Array.isArray(p.variaciok); }
  function options(p) { return (p.opciok || []).filter(function (o) { return o.variacio === true; }); }
  function find(p, id) { return isVariable(p) ? p.variaciok.find(function (v) { return String(v.id) === String(id); }) || null : null; }
  function available(v) { return !!v && v.rendelheto !== false && Number.isFinite(v.ar) && v.ar > 0 && (v.max_mennyiseg == null || v.max_mennyiseg > 0); }
  function limit(v) { return !v || v.max_mennyiseg == null ? 99 : Math.max(0, Math.min(99, Math.floor(v.max_mennyiseg))); }
  function resolve(p, selection) {
    var opts = options(p);
    if (!opts.length || opts.some(function (o) { return !selection[o.id]; })) return null;
    var matches = (p.variaciok || []).filter(function (v) { return opts.every(function (o) { return (v.attributumok || {})[o.id] === selection[o.id]; }); });
    return matches.length === 1 ? matches[0] : null;
  }
  function possible(p, selection, id, value) {
    return (p.variaciok || []).some(function (v) {
      return available(v) && options(p).every(function (o) {
        var chosen = o.id === id ? value : selection[o.id];
        return !chosen || (v.attributumok || {})[o.id] === chosen;
      });
    });
  }
  function label(p, v) { return options(p).map(function (o) { return o.nev + ': ' + (v.attributumok || {})[o.id]; }).join(' · '); }
  function view(p, v) {
    var result = Object.assign({}, p, { variaciok: undefined, regi_ar: undefined });
    if (v) {
      result.ar = v.ar;
      result.regi_ar = v.regi_ar;
      result.kepek = v.kepek && v.kepek.length ? v.kepek : p.kepek;
    }
    return result;
  }
  function range(p) {
    var prices = (p.variaciok || []).filter(available).map(function (v) { return v.ar; });
    if (!prices.length) prices = (p.variaciok || []).map(function (v) { return v.ar; }).filter(function (n) { return Number.isFinite(n) && n > 0; });
    return prices.length ? { min: Math.min.apply(null, prices), max: Math.max.apply(null, prices) } : { min: 0, max: 0 };
  }
  function lookup(products, id) {
    var p = products.find(function (p) { return p.id === id; });
    if (p) return { product: p, variation: null };
    for (var i = 0; i < products.length; i++) {
      var v = (products[i].variaciok || []).find(function (v) { return v.regi_id && v.regi_id === id; });
      if (v) return { product: products[i], variation: v };
    }
    return null;
  }
  function key(id, variationId, text) { return JSON.stringify([id, String(variationId), text || '']); }
  function normalizeCart(items, products) {
    if (!Array.isArray(items)) return [];
    var result = [];
    items.forEach(function (item) {
      if (!item || typeof item.id !== 'string' || !Number.isFinite(Number(item.qty)) || Number(item.qty) < 1) return;
      var next = Object.assign({}, item, { qty: Math.max(1, Math.min(99, Math.floor(Number(item.qty)))) });
      var found = lookup(products, item.id);
      if (found && found.variation) {
        next.id = found.product.id;
        next.variationId = String(found.variation.id);
        next.variant = label(found.product, found.variation) + (item.variant ? ' · ' + String(item.variant) : '');
        next.extra = item.variant || '';
        next.key = key(next.id, next.variationId, next.extra);
      }
      var same = result.find(function (r) { return r.key === next.key; });
      if (same) same.qty = Math.min(99, same.qty + next.qty); else result.push(next);
    });
    return result;
  }
  return { isVariable: isVariable, options: options, find: find, available: available, limit: limit, resolve: resolve, possible: possible, label: label, view: view, range: range, lookup: lookup, key: key, normalizeCart: normalizeCart };
}));
