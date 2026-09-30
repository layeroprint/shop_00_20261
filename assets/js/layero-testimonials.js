/*
 * Layero Testimonials 1.0 — függőségmentes, progresszív kiegészítés.
 * - Nincs automatikus lapozás, fetch, cookie vagy localStorage.
 * - A tartalom teljes egészében a HTML-ben található.
 * - A gombok csak tényleges vízszintes túlcsordulásnál láthatók.
 * - Dinamikusan beillesztett Elementor/DOM blokkokat is inicializál.
 * - Ugyanaz a script többször is biztonságosan betölthető.
 */
(() => {
  'use strict';

  const GLOBAL = 'LayeroTestimonials';
  const SELECTOR = '.lyr-testimonials--studio[data-lyr-testimonials]';
  const existing = window[GLOBAL];
  if (existing && typeof existing.init === 'function') {
    existing.init(document);
    return;
  }

  const instances = new Map();
  let sequence = 0;
  let mutationObserver;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const pad = value => String(value).padStart(2, '0');

  function uniqueId(type) {
    let id;
    do { id = `lr-${type}-${++sequence}`; } while (document.getElementById(id));
    return id;
  }

  function createInstance(root) {
    const track = root.querySelector('[data-lr-track]');
    const controls = root.querySelector('[data-lr-controls]');
    const prev = root.querySelector('[data-lr-prev]');
    const next = root.querySelector('[data-lr-next]');
    const current = root.querySelector('[data-lr-current]');
    const total = root.querySelector('[data-lr-total]');
    const status = root.querySelector('[data-lr-status]');
    const hint = root.querySelector('[data-lr-hint]');
    const heading = root.querySelector('.lr-title');
    if (!track || !controls || !prev || !next || !current || !total) return null;

    const trackId = uniqueId('track');
    track.id = trackId;
    prev.setAttribute('aria-controls', trackId);
    next.setAttribute('aria-controls', trackId);
    if (heading) {
      heading.id = uniqueId('heading');
      root.setAttribute('aria-labelledby', heading.id);
      root.removeAttribute('aria-label');
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cards = [];
    let frame = 0;
    let settleTimer = 0;
    let lastRange = '';
    let announceOnSettle = false;
    let requestedLeft = null;
    let destroyed = false;
    let resizeObserver = null;
    let supportsResizeObserver = typeof ResizeObserver === 'function';

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

    function range() {
      const viewport = track.getBoundingClientRect();
      const visible = cards.map((card, index) => {
        const rect = card.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(rect.right, viewport.right) - Math.max(rect.left, viewport.left));
        return { index, ratio: overlap / Math.max(1, Math.min(rect.width, viewport.width)) };
      }).filter(item => item.ratio >= 0.55);
      if (visible.length) return [visible[0].index, visible[visible.length - 1].index];
      const nearest = cards.map((card, index) => ({ index, distance: Math.abs(card.getBoundingClientRect().left - viewport.left) }))
        .sort((a, b) => a.distance - b.distance)[0];
      return [nearest ? nearest.index : 0, nearest ? nearest.index : 0];
    }

    function sync(announce = false) {
      if (destroyed) return;
      const overflowing = maxScroll() > 2 && cards.length > 1;
      controls.hidden = !overflowing;
      if (hint) hint.hidden = !overflowing;
      if (overflowing) {
        track.tabIndex = 0;
        track.setAttribute('aria-label', root.dataset.lrTrackLabel || 'Vásárlói vélemények. Bal és jobb nyíllal, illetve görgetéssel lapozható.');
      } else {
        track.removeAttribute('tabindex');
        track.setAttribute('aria-label', root.dataset.lrTrackStatic || 'Vásárlói vélemények');
      }
      const left = clamp(track.scrollLeft, 0, maxScroll());
      prev.disabled = !overflowing || left <= 2;
      next.disabled = !overflowing || left >= maxScroll() - 2;
      total.textContent = pad(cards.length);
      const [first, last] = range();
      const display = cards.length === 0 ? '00' : first === last ? pad(first + 1) : `${pad(first + 1)}–${pad(last + 1)}`;
      if (current.textContent !== display) current.textContent = display;
      if (announce && status && display !== lastRange) {
        const reviewWord = root.dataset.lrReview || 'vélemény';
        const totalWord = root.dataset.lrTotalWord || 'összesen';
        status.textContent = cards.length === 0 ? (root.dataset.lrEmpty || 'Nincs megjeleníthető vélemény.') :
          (first === last ? `${first + 1}. ${reviewWord}` : `${first + 1}–${last + 1}. ${reviewWord}`) + `, ${totalWord} ${cards.length}.`;
        lastRange = display;
      }
    }

    function schedule() {
      if (frame || destroyed) return;
      frame = requestAnimationFrame(() => { frame = 0; sync(); });
    }

    function positions() {
      const viewport = track.getBoundingClientRect();
      return cards.map(card => clamp(track.scrollLeft + card.getBoundingClientRect().left - viewport.left, 0, maxScroll()));
    }

    function goTo(left) {
      if (maxScroll() <= 2) return;
      requestedLeft = clamp(left, 0, maxScroll());
      announceOnSettle = true;
      track.scrollTo({ left: requestedLeft, behavior: reduced.matches ? 'auto' : 'smooth' });
      // A kezdő/végpont ismételt kiválasztásakor nem feltétlenül keletkezik scroll esemény.
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 220);
    }

    function step(direction) {
      const left = requestedLeft === null ? track.scrollLeft : requestedLeft;
      const all = positions();
      const target = direction > 0 ? all.find(value => value > left + 2) : all.slice().reverse().find(value => value < left - 2);
      goTo(target === undefined ? (direction > 0 ? maxScroll() : 0) : target);
    }

    function settle() {
      requestedLeft = null;
      sync(announceOnSettle);
      announceOnSettle = false;
    }

    function onScroll() {
      schedule();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 170);
    }

    function onManualScroll() {
      requestedLeft = null;
      announceOnSettle = true;
    }

    function onKey(event) {
      if (event.target !== track || maxScroll() <= 2) return;
      const actions = {
        ArrowLeft: () => step(-1),
        ArrowRight: () => step(1),
        Home: () => goTo(0),
        End: () => goTo(maxScroll())
      };
      if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
    }

    const onPrev = () => step(-1);
    const onNext = () => step(1);
    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('pointerdown', onManualScroll, { passive: true });
    track.addEventListener('wheel', onManualScroll, { passive: true });
    track.addEventListener('keydown', onKey);
    window.addEventListener('resize', schedule, { passive: true });

    if (supportsResizeObserver) resizeObserver = new ResizeObserver(schedule);

    function refresh() {
      if (destroyed) return;
      cards = Array.from(track.children).filter(element => element.matches('.lr-card'));
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver.observe(track);
        cards.forEach(card => resizeObserver.observe(card));
      }
      schedule();
    }

    function destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      if (resizeObserver) resizeObserver.disconnect();
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('pointerdown', onManualScroll);
      track.removeEventListener('wheel', onManualScroll);
      track.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', schedule);
      controls.hidden = true;
      if (hint) hint.hidden = false;
      track.tabIndex = 0;
      track.setAttribute('aria-label', root.dataset.lrTrackFallback || 'Vásárlói vélemények; vízszintesen görgethető, amikor nem férnek el');
      if (status) status.textContent = '';
    }

    refresh();
    const bindings = [
      ['[data-lr-track]', track], ['[data-lr-controls]', controls],
      ['[data-lr-prev]', prev], ['[data-lr-next]', next],
      ['[data-lr-current]', current], ['[data-lr-total]', total],
      ['[data-lr-status]', status], ['[data-lr-hint]', hint], ['.lr-title', heading]
    ];
    return { refresh, destroy, isCurrent: () => bindings.every(([selector, element]) => root.querySelector(selector) === element) };
  }

  function init(scope = document) {
    if (!scope || typeof scope.querySelectorAll !== 'function') return;
    const roots = scope.nodeType === 1 && scope.matches(SELECTOR) ? [scope] : [];
    roots.push(...scope.querySelectorAll(SELECTOR));
    roots.forEach(root => {
      const instance = instances.get(root);
      if (instance && instance.isCurrent()) instance.refresh();
      else {
        if (instance) { instance.destroy(); instances.delete(root); }
        const created = createInstance(root);
        if (created) instances.set(root, created);
      }
    });
  }

  function destroy(scope = document) {
    instances.forEach((instance, root) => {
      if (scope === document || scope === root || (scope.contains && scope.contains(root))) {
        instance.destroy();
        instances.delete(root);
      }
    });
  }

  function start() {
    init(document);
    if (typeof MutationObserver !== 'function') return;
    mutationObserver = new MutationObserver(records => {
      const refreshRoots = new Set();
      records.forEach(record => {
        // Saját számláló-szövegfrissítéseink nem indítanak újabb inicializálást.
        const changedElements = [...record.addedNodes, ...record.removedNodes].filter(node => node.nodeType === 1);
        if (!changedElements.length) return;
        if (record.target.nodeType === 1) {
          const owner = record.target.closest(SELECTOR);
          if (owner) refreshRoots.add(owner);
        }
        record.addedNodes.forEach(node => {
          if (node.nodeType === 1) init(node);
        });
      });
      refreshRoots.forEach(root => {
        if (!root.isConnected) return;
        init(root);
      });
      instances.forEach((instance, root) => {
        if (!root.isConnected) { instance.destroy(); instances.delete(root); }
      });
    });
    mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  window[GLOBAL] = Object.freeze({ version: '1.0.0', init, destroy });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
