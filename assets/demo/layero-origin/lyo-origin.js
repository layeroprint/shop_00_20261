/**
 * Layero Origin 1.0 — framework-free, local-only UI.
 * API: LayeroOrigin.init(), open(trigger?), close(), setLayers(0..100),
 *      setView('origin'|'workshop'), destroy().
 * No analytics, cookies, storage, HTTP calls, dependencies or auto-open.
 * All content remains in HTML; this file enhances interaction only.
 */
(function (window, document) {
  'use strict';
  if (window.LayeroOrigin) return;

  let instance = null;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const isElement = (node) => node && node.nodeType === 1;

  function createController(dialog) {
    if (!isElement(dialog)) return null;
    const abort = new AbortController();
    const options = { signal: abort.signal };
    const select = (s) => dialog.querySelector(s);
    const selectAll = (s) => Array.from(dialog.querySelectorAll(s));
    const range = select('#lyo-separation');
    const slices = selectAll('[data-slice]');
    const pin = select('[data-pin-plane]');
    const map = select('.lyo-map');
    const frame = select('.lyo-mapframe');
    const status = select('[data-origin-status]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const nativeDialog = typeof dialog.showModal === 'function';
    let opened = false;
    let closing = false;
    let view = 'origin';
    let returnFocus = null;
    let animationFrame = 0;
    let closeTimer = 0;
    let animationValue = Number(range ? range.value : 0);
    let layerValue = animationValue;
    let lockState = null;
    let fallbackBackdrop = null;
    let inertStates = [];
    let pointerStartedOutside = false;
    let destroyed = false;

    function emit(name, detail = {}) {
      dialog.dispatchEvent(new CustomEvent('layero:origin-' + name, {
        bubbles: true,
        detail: Object.assign({ view, layers: layerValue }, detail)
      }));
    }

    function renderLayers(percent) {
      animationValue = percent;
      const progress = percent / 100;
      slices.forEach((slice) => {
        const index = Number(slice.dataset.slice);
        const band = Math.floor(index / 4);
        const spread = (-54 + 36 * band) * progress;
        slice.setAttribute('transform', 'translate(0 ' + (index * 3.8 + spread).toFixed(2) + ')');
      });
      if (pin) pin.setAttribute('transform', 'translate(0 ' + (-54 * progress).toFixed(2) + ')');
    }

    function updateControlValues(value) {
      if (range) {
        range.value = String(value);
        range.style.setProperty('--lyo-progress', value + '%');
        range.setAttribute('aria-valuetext', Math.round(value) + ' százalékos rétegtávolság');
      }
      const output = select('[data-layer-output]');
      if (output) output.textContent = Math.round(value) + '%';
      selectAll('[data-layer-mode]').forEach((button) => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.layerMode) === value));
      });
      const caption = select('[data-layer-caption]');
      if (caption) caption.textContent = value > 1 ? 'RÉTEGRŐL RÉTEGRE.' : 'AZ ELSŐ RÉTEGTŐL.';
    }

    function setLayers(value, animate = true) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) throw new TypeError('LayeroOrigin.setLayers: finite number required.');
      layerValue = clamp(numeric, 0, 100);
      updateControlValues(layerValue);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (!animate || reducedMotion.matches || !opened || document.hidden) {
        renderLayers(layerValue);
        emit('layers', { userControlled: true });
        return;
      }
      const from = animationValue;
      const to = layerValue;
      const start = performance.now();
      const duration = 720;
      function tick(now) {
        const t = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        renderLayers(from + (to - from) * eased);
        if (t < 1 && opened && !destroyed) animationFrame = requestAnimationFrame(tick);
        else {
          animationFrame = 0;
          renderLayers(to);
          if (status) status.textContent = to === 0 ? 'A térkép rétegei összeálltak.' : 'A térkép rétegekre bontva látható.';
          emit('layers', { userControlled: true });
        }
      }
      animationFrame = requestAnimationFrame(tick);
    }

    function focusHeading() {
      const heading = select(view === 'origin' ? '#lyo-title' : '#lyo-workshop-title');
      if (heading) heading.focus({ preventScroll: true });
    }

    function setView(next, moveFocus = true) {
      if (!['origin', 'workshop'].includes(next)) throw new TypeError('LayeroOrigin.setView: origin or workshop required.');
      view = next;
      selectAll('[data-origin-view]').forEach((section) => {
        section.hidden = section.dataset.originView !== next;
      });
      const proof = select('[data-origin-proof]');
      const workshopButton = select('[data-workshop-open]');
      const backButton = select('[data-back-footer]');
      if (proof) proof.hidden = next !== 'origin';
      if (workshopButton) workshopButton.hidden = next !== 'origin';
      if (backButton) backButton.hidden = next === 'origin';
      dialog.setAttribute('aria-labelledby', next === 'origin' ? 'lyo-title' : 'lyo-workshop-title');
      dialog.setAttribute('aria-describedby', next === 'origin' ? 'lyo-lead' : 'lyo-workshop-lead');
      dialog.scrollTop = 0;
      if (moveFocus && opened) focusHeading();
      emit('view');
    }

    function lockScroll() {
      if (lockState) return;
      const body = document.body;
      const gap = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      lockState = {
        overflow: body.style.getPropertyValue('overflow'),
        overflowPriority: body.style.getPropertyPriority('overflow'),
        padding: body.style.getPropertyValue('padding-right'),
        paddingPriority: body.style.getPropertyPriority('padding-right')
      };
      const oldPadding = parseFloat(getComputedStyle(body).paddingRight) || 0;
      body.style.setProperty('overflow', 'hidden');
      if (gap > 0) body.style.setProperty('padding-right', oldPadding + gap + 'px');
    }

    function unlockScroll() {
      if (!lockState) return;
      const style = document.body.style;
      if (lockState.overflow) style.setProperty('overflow', lockState.overflow, lockState.overflowPriority);
      else style.removeProperty('overflow');
      if (lockState.padding) style.setProperty('padding-right', lockState.padding, lockState.paddingPriority);
      else style.removeProperty('padding-right');
      lockState = null;
    }

    function activateFallback() {
      fallbackBackdrop = document.createElement('div');
      fallbackBackdrop.className = 'lyo-fallback-shade';
      fallbackBackdrop.setAttribute('aria-hidden', 'true');
      document.body.append(fallbackBackdrop);
      fallbackBackdrop.addEventListener('click', () => close(), options);
      dialog.classList.add('lyo-fallback');
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('open', '');
      // The fragment belongs directly under body. Avoid inerting an ancestor.
      inertStates = Array.from(document.body.children)
        .filter((el) => el !== dialog && !el.contains(dialog) && el !== fallbackBackdrop)
        .map((el) => ({ el, inert: el.inert }));
      inertStates.forEach(({ el }) => { el.inert = true; });
    }

    function open(trigger) {
      if (opened || closing || destroyed) return;
      const active = document.activeElement;
      returnFocus = isElement(trigger) ? trigger : (isElement(active) && active !== document.body ? active : document.querySelector('[data-layero-origin-open]'));
      setView('origin', false);
      dialog.classList.remove('lyo-closing');
      if (nativeDialog) {
        try {
          // A no-script standalone preview can already have the open attribute.
          if (dialog.hasAttribute('open')) dialog.removeAttribute('open');
          dialog.showModal();
        } catch (error) {
          console.warn('Layero Origin: could not open dialog.', error);
          return;
        }
      } else activateFallback();
      opened = true;
      lockScroll();
      dialog.scrollTop = 0;
      renderLayers(layerValue);
      focusHeading();
      emit('open');
    }

    function finishClose() {
      clearTimeout(closeTimer);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (nativeDialog && dialog.open) dialog.close();
      else dialog.removeAttribute('open');
      opened = false;
      closing = false;
      dialog.classList.remove('lyo-closing');
      if (fallbackBackdrop) fallbackBackdrop.remove();
      fallbackBackdrop = null;
      inertStates.forEach(({ el, inert }) => { if (el.isConnected) el.inert = inert; });
      inertStates = [];
      unlockScroll();
      if (returnFocus && returnFocus.isConnected && !returnFocus.closest('[inert]')) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
      emit('close');
    }

    function close(immediate = false) {
      if (!opened || closing) return;
      closing = true;
      window.cancelAnimationFrame(animationFrame);
      renderLayers(layerValue);
      if (immediate || reducedMotion.matches || document.hidden) finishClose();
      else {
        dialog.classList.add('lyo-closing');
        closeTimer = window.setTimeout(finishClose, 180);
      }
    }

    function visibleFocusableElements() {
      return Array.from(dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'))
        .filter((el) => !el.closest('[hidden],[inert]') && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
    }

    document.addEventListener('click', (event) => {
      const trigger = isElement(event.target) ? event.target.closest('[data-layero-origin-open]') : null;
      if (!trigger || event.defaultPrevented) return;
      // Keep normal modified-click link behaviour for the progressive-enhancement anchor.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
      event.preventDefault();
      open(trigger);
    }, options);

    dialog.addEventListener('click', (event) => {
      const target = isElement(event.target) ? event.target : null;
      if (!target) return;
      if (target.closest('[data-origin-close]')) close();
      else if (target.closest('[data-workshop-open]')) setView('workshop');
      else if (target.closest('[data-origin-back]')) setView('origin');
      else if (target.closest('[data-layer-reset]')) setLayers(0);
      else {
        const button = target.closest('[data-layer-mode]');
        if (button) setLayers(Number(button.dataset.layerMode));
      }
      const r = dialog.getBoundingClientRect();
      const outside = event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
      if (target === dialog && outside && pointerStartedOutside) close();
      pointerStartedOutside = false;
    }, options);

    dialog.addEventListener('pointerdown', (event) => {
      const r = dialog.getBoundingClientRect();
      pointerStartedOutside = event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom);
    }, options);

    dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); }, options);
    dialog.addEventListener('close', () => {
      // Also release state when host code closes the native dialog directly.
      if (opened && !closing) finishClose();
    }, options);
    dialog.addEventListener('keydown', (event) => {
      if (!opened) return;
      if (event.key === 'Escape' && !nativeDialog) { event.preventDefault(); close(); return; }
      if (event.key !== 'Tab') return;
      const items = visibleFocusableElements();
      if (!items.length) { event.preventDefault(); focusHeading(); return; }
      const first = items[0], last = items[items.length - 1], active = document.activeElement;
      if (event.shiftKey && (active === first || !items.includes(active))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (active === last || !dialog.contains(active))) { event.preventDefault(); first.focus(); }
    }, options);

    if (range) {
      range.addEventListener('input', () => setLayers(Number(range.value), false), options);
      range.addEventListener('change', () => {
        if (status) status.textContent = 'Rétegtávolság: ' + Math.round(layerValue) + ' százalék.';
      }, options);
    }
    if (frame && map) {
      frame.addEventListener('pointermove', (event) => {
        if (!opened || view !== 'origin' || reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
        const r = frame.getBoundingClientRect();
        const x = clamp((event.clientX - r.left) / r.width - .5, -.5, .5);
        const y = clamp((event.clientY - r.top) / r.height - .5, -.5, .5);
        map.style.setProperty('--lyo-tilt-y', (x * 3.5).toFixed(2) + 'deg');
        map.style.setProperty('--lyo-tilt-x', (-y * 2.5).toFixed(2) + 'deg');
      }, options);
      frame.addEventListener('pointerleave', () => {
        map.style.setProperty('--lyo-tilt-x', '0deg');
        map.style.setProperty('--lyo-tilt-y', '0deg');
      }, options);
    }
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        cancelAnimationFrame(animationFrame);
        renderLayers(layerValue);
        if (map) { map.style.removeProperty('--lyo-tilt-x'); map.style.removeProperty('--lyo-tilt-y'); }
      }
    }, options);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(animationFrame); renderLayers(layerValue); }
    }, options);

    updateControlValues(layerValue);
    renderLayers(layerValue);
    dialog.dataset.ready = 'true';
    return {
      open, close, setLayers, setView,
      getState: () => ({ open: opened, closing, view, layers: layerValue }),
      destroy() {
        if (destroyed) return;
        destroyed = true;
        clearTimeout(closeTimer);
        cancelAnimationFrame(animationFrame);
        if (opened) { closing = true; finishClose(); }
        abort.abort();
        dialog.removeAttribute('data-ready');
        instance = null;
      }
    };
  }

  const api = {
    init() {
      if (instance) return instance;
      const dialog = document.querySelector('[data-layero-origin]');
      instance = createController(dialog);
      return instance;
    },
    open(trigger) { const c = api.init(); if (c) c.open(trigger); },
    close() { if (instance) instance.close(); },
    setLayers(value, animate = true) { const c = api.init(); if (c) c.setLayers(value, animate); },
    setView(value) { const c = api.init(); if (c) c.setView(value); },
    getState() { return instance ? instance.getState() : { open: false, closing: false, view: 'origin', layers: 0 }; },
    destroy() { if (instance) instance.destroy(); }
  };
  window.LayeroOrigin = Object.freeze(api);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => api.init(), { once: true });
  else api.init();
})(window, document);
