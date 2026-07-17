(function ($) {
	'use strict';

	var WISH_KEY = 'sh_wishlist';
	var WISH_OWNER_KEY = 'layero_wishlist_owner';
	var wishlistBootPromise = null;
	var wishQueue = Promise.resolve();

	function accountConfig() {
		return window.LayeroShopUI || {};
	}

	function accountRequest(action, data) {
		var config = accountConfig();
		if (!config.ajaxUrl || !config.accountNonce || !window.fetch) {
			return Promise.reject(new Error('Layero account AJAX is unavailable.'));
		}

		var body = new window.FormData();
		body.append('action', action);
		body.append('nonce', config.accountNonce);
		Object.keys(data || {}).forEach(function (key) {
			body.append(key, data[key]);
		});

		return window.fetch(config.ajaxUrl, {
			method: 'POST',
			credentials: 'same-origin',
			body: body
		}).then(function (response) {
			return response.json().then(function (payload) {
				if (!response.ok || !payload || !payload.success) {
					throw new Error(payload && payload.data && payload.data.message ? payload.data.message : 'Layero account request failed.');
				}
				return payload.data || {};
			});
		});
	}

	function initSlider(root) {
		if (root.dataset.layeroSliderReady === '1') return;
		root.dataset.layeroSliderReady = '1';

		var slides = Array.prototype.slice.call(root.querySelectorAll('.sh-slide, .lyr-hero__slide'));
		var dotsWrap = root.querySelector('.sh-slider__dots, .lyr-hero__dots');
		var prev = root.querySelector('[data-slide-prev], .lyr-hero__nav--prev');
		var next = root.querySelector('[data-slide-next], .lyr-hero__nav--next');
		if (!slides.length) return;

		var current = 0;
		var timer = null;
		var pointerId = null;
		var startX = 0;
		var startY = 0;
		var dragged = false;
		var speed = parseInt(root.getAttribute('data-layero-speed'), 10);
		speed = Number.isFinite(speed) ? speed : 6500;

		var dots = [];
		if (dotsWrap) {
			dotsWrap.innerHTML = slides.map(function (_, index) {
				return '<button type="button" role="tab" aria-label="' + (index + 1) + '. slide"></button>';
			}).join('');
			dots = Array.prototype.slice.call(dotsWrap.querySelectorAll('button'));
		}

		function go(index) {
			current = (index + slides.length) % slides.length;
			slides.forEach(function (slide, i) {
				var active = i === current;
				slide.classList.toggle('is-on', active);
				slide.classList.toggle('is-active', active);
				slide.setAttribute('aria-hidden', active ? 'false' : 'true');
			});
			dots.forEach(function (dot, i) {
				var active = i === current;
				dot.classList.toggle('is-on', active);
				dot.classList.toggle('is-active', active);
				dot.setAttribute('aria-selected', active ? 'true' : 'false');
			});
		}

		function stop() {
			if (timer) window.clearInterval(timer);
			timer = null;
		}

		function start() {
			stop();
			if (speed > 0 && slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				timer = window.setInterval(function () { go(current + 1); }, speed);
			}
		}

		if (prev) prev.addEventListener('click', function () { stop(); go(current - 1); start(); });
		if (next) next.addEventListener('click', function () { stop(); go(current + 1); start(); });
		dots.forEach(function (dot, i) {
			dot.addEventListener('click', function () { stop(); go(i); start(); });
		});

		root.addEventListener('mouseenter', stop);
		root.addEventListener('mouseleave', start);
		root.addEventListener('focusin', stop);
		root.addEventListener('focusout', start);

		root.addEventListener('pointerdown', function (event) {
			if (event.target.closest('a,button,input,textarea,select')) return;
			pointerId = event.pointerId;
			startX = event.clientX;
			startY = event.clientY;
			dragged = false;
			stop();
			if (typeof root.setPointerCapture === 'function') {
				try { root.setPointerCapture(pointerId); } catch (error) {}
			}
		});

		root.addEventListener('pointermove', function (event) {
			if (pointerId !== event.pointerId) return;
			if (Math.abs(event.clientX - startX) > 8) {
				dragged = true;
				root.classList.add('is-dragging');
			}
		});

		function finishPointer(event) {
			if (pointerId !== event.pointerId) return;
			var dx = event.clientX - startX;
			var dy = event.clientY - startY;
			if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
			pointerId = null;
			window.setTimeout(function () {
				dragged = false;
				root.classList.remove('is-dragging');
			}, 0);
			start();
		}

		root.addEventListener('pointerup', finishPointer);
		root.addEventListener('pointercancel', function () {
			pointerId = null;
			dragged = false;
			root.classList.remove('is-dragging');
			start();
		});
		root.addEventListener('click', function (event) {
			if (dragged) event.preventDefault();
		});

		go(0);
		start();
	}

	function wishGet() {
		try {
			var items = JSON.parse(window.localStorage.getItem(WISH_KEY) || '[]');
			return Array.isArray(items) ? items.map(String) : [];
		} catch (error) {
			return [];
		}
	}

	function wishSet(items) {
		items = (Array.isArray(items) ? items : []).map(String).filter(function (item, index, all) {
			return item && all.indexOf(item) === index;
		});
		try {
			window.localStorage.setItem(WISH_KEY, JSON.stringify(items));
		} catch (error) {}
	}

	function wishOwnerGet() {
		try { return String(window.localStorage.getItem(WISH_OWNER_KEY) || ''); } catch (error) { return ''; }
	}

	function wishOwnerSet(owner) {
		try {
			if (owner) window.localStorage.setItem(WISH_OWNER_KEY, String(owner));
			else window.localStorage.removeItem(WISH_OWNER_KEY);
		} catch (error) {}
	}

	function bootstrapWishlist() {
		if (wishlistBootPromise) return wishlistBootPromise;

		var config = accountConfig();
		var owner = wishOwnerGet();
		var userId = String(config.userId || '');
		var merged = wishGet();
		if (!config.isLoggedIn && owner) {
			merged = [];
			wishOwnerSet('');
		} else if (config.isLoggedIn && owner && owner !== userId) {
			merged = [];
		}
		(Array.isArray(config.favoriteIds) ? config.favoriteIds : []).map(String).forEach(function (id) {
			if (id && merged.indexOf(id) === -1) merged.push(id);
		});
		wishSet(merged);
		if (config.isLoggedIn) wishOwnerSet(userId);
		refreshWishButtons(document);
		refreshFavoritesGrid(document);

		if (!config.isLoggedIn) {
			wishlistBootPromise = Promise.resolve(merged);
			return wishlistBootPromise;
		}

		wishlistBootPromise = accountRequest('layero_sync_favorites', { ids: JSON.stringify(merged) })
			.then(function (result) {
				var ids = Array.isArray(result.ids) ? result.ids.map(String) : merged;
				wishSet(ids);
				refreshWishButtons(document);
				refreshFavoritesGrid(document);
				return ids;
			})
			.catch(function () { return merged; });

		return wishlistBootPromise;
	}

	function refreshWishButtons(context) {
		var items = wishGet();
		(context || document).querySelectorAll('[data-layero-wish-toggle]').forEach(function (button) {
			var id = String(button.getAttribute('data-layero-product-id') || '');
			var active = id && items.indexOf(id) !== -1;
			button.classList.toggle('is-on', active);
			button.classList.toggle('is-active', active);
			button.setAttribute('aria-pressed', active ? 'true' : 'false');
			if (accountConfig().i18n) {
				button.setAttribute('aria-label', active ? accountConfig().i18n.favoriteRemove : accountConfig().i18n.favoriteAdd);
			}
		});
	}

	function refreshFavoritesGrid(context) {
		(context || document).querySelectorAll('[data-layero-favorites-grid]').forEach(function (grid) {
			var items = wishGet();
			var visible = 0;
			grid.querySelectorAll('[data-layero-product-card]').forEach(function (card) {
				var id = String(card.getAttribute('data-layero-product-id') || '');
				var show = id && items.indexOf(id) !== -1;
				card.hidden = !show;
				if (show) visible++;
			});
			var empty = grid.parentElement ? grid.parentElement.querySelector('[data-layero-favorites-empty]') : null;
			if (empty) empty.hidden = visible > 0;
		});
	}

	function initWishlist(context) {
		(context || document).querySelectorAll('[data-layero-wish-toggle]').forEach(function (button) {
			if (button.dataset.layeroWishReady === '1') return;
			button.dataset.layeroWishReady = '1';
			button.addEventListener('click', function (event) {
				event.preventDefault();
				event.stopPropagation();
				var id = String(button.getAttribute('data-layero-product-id') || '');
				if (!id) return;
				var items = wishGet();
				var index = items.indexOf(id);
				if (index === -1) items.push(id);
				else items.splice(index, 1);
				wishSet(items);
				refreshWishButtons(document);
				refreshFavoritesGrid(document);

				if (!accountConfig().isLoggedIn) {
					refreshFavoritesWidgets(document, true);
					return;
				}

				wishQueue = wishQueue
					.then(function () { return bootstrapWishlist(); })
					.then(function () {
						return accountRequest('layero_toggle_favorite', { product_id: id });
					})
					.then(function (result) {
						if (Array.isArray(result.ids)) wishSet(result.ids);
						refreshWishButtons(document);
						refreshFavoritesGrid(document);
						refreshFavoritesWidgets(document, true);
					})
					.catch(function () {
						refreshFavoritesWidgets(document, true);
					});
			});
		});
		bootstrapWishlist().then(function () {
			refreshWishButtons(context || document);
			refreshFavoritesGrid(context || document);
		});
	}

	function loadFavoritesWidget(root, force) {
		if (!root) return;
		if (!force && root.dataset.layeroFavoritesReady === '1') return;
		root.dataset.layeroFavoritesReady = '1';
		var grid = root.querySelector('[data-layero-favorites-grid-target]');
		var empty = root.querySelector('[data-layero-favorites-widget-empty]');
		var count = root.querySelector('[data-layero-favorites-count]');
		var status = root.querySelector('[data-layero-favorites-status]');
		if (!grid) return;

		root.classList.add('is-loading');
		if (status) status.textContent = accountConfig().i18n && accountConfig().i18n.favoritesLoading ? accountConfig().i18n.favoritesLoading : '';
		accountRequest('layero_load_favorites', {
			ids: JSON.stringify(wishGet()),
			limit: parseInt(root.getAttribute('data-limit'), 10) || 100
		}).then(function (result) {
			if (Array.isArray(result.ids)) wishSet(result.ids);
			grid.innerHTML = result.html || '';
			if (count) count.textContent = String(result.count || 0);
			if (empty) empty.hidden = (result.count || 0) > 0;
			if (status) status.textContent = '';
			root.classList.remove('is-loading');
			initWishlist(grid);
		}).catch(function () {
			root.classList.remove('is-loading');
			if (status) status.textContent = accountConfig().i18n && accountConfig().i18n.favoritesError ? accountConfig().i18n.favoritesError : '';
		});
	}

	function refreshFavoritesWidgets(context, force) {
		(context || document).querySelectorAll('[data-layero-favorites-widget]').forEach(function (root) {
			loadFavoritesWidget(root, force);
		});
	}

	function upgradeLegacyFavoritesMount(context) {
		(context || document).querySelectorAll('#sh-wish-mount').forEach(function (mount) {
			mount.removeAttribute('id');
			mount.className = (mount.className + ' lyr-favorites').trim();
			mount.setAttribute('data-layero-favorites-widget', '');
			mount.setAttribute('data-limit', '100');
			mount.innerHTML = '<div class="shop-wrap">' +
				'<header class="lyr-account-section-head"><div><span class="lyr-eyebrow">Mentett termékek</span><h1>Kedvenc termékeim</h1></div><b data-layero-favorites-count>0</b></header>' +
				'<div class="sh-prod-grid lyr-product-grid lyr-favorites-grid" data-layero-favorites-grid-target></div>' +
				'<div class="lyr-account-empty" data-layero-favorites-widget-empty><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 20s-7-4.6-9.3-9.2A5.2 5.2 0 0 1 12 6.1a5.2 5.2 0 0 1 9.3 4.7C19 15.4 12 20 12 20Z"/></svg><h3>Még nincs kedvenc terméked.</h3><p>A termékkártyák szív ikonjával menthetsz ide termékeket.</p><a class="lyr-btn lyr-btn--primary" href="' + escapeHtml(accountConfig().productsUrl || '/termekek/') + '">Termékek böngészése</a></div>' +
				'<p class="lyr-favorites-status" data-layero-favorites-status aria-live="polite"></p></div>';
		});
	}

	function escapeHtml(value) {
		return String(value || '').replace(/[&<>"']/g, function (char) {
			return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char];
		});
	}

	function initQuiz(root) {
		if (root.dataset.layeroQuizReady === '1') return;
		root.dataset.layeroQuizReady = '1';

		var dataNode = root.querySelector('[data-layero-quiz-data]');
		var title = root.querySelector('[data-layero-quiz-title]');
		var lead = root.querySelector('[data-layero-quiz-lead]');
		var options = root.querySelector('[data-layero-quiz-options]');
		var back = root.querySelector('[data-layero-quiz-back]');
		var result = root.querySelector('[data-layero-quiz-result]');
		var productsRoot = root.querySelector('[data-layero-quiz-products]');
		var progress = root.querySelector('[data-layero-quiz-progress]');
		var count = root.querySelector('[data-layero-quiz-count]');
		var restart = root.querySelector('[data-layero-quiz-restart]');
		if (!dataNode || !title || !options || !result || !productsRoot) return;

		var payload;
		try {
			payload = JSON.parse(dataNode.textContent || '{}');
		} catch (error) {
			return;
		}
		var questions = payload.questions || [];
		var products = payload.products || [];
		var step = 0;
		var answers = [];
		var heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.6-9.3-9.2A5.2 5.2 0 0 1 12 6.1a5.2 5.2 0 0 1 9.3 4.7C19 15.4 12 20 12 20Z"/></svg>';
		var cart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l1.3 10.5a1.5 1.5 0 0 1-1.5 1.7H6.2a1.5 1.5 0 0 1-1.5-1.7L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>';

		function renderQuestion() {
			var question = questions[step];
			if (!question) return;
			result.hidden = true;
			options.hidden = false;
			if (lead) lead.hidden = false;
			title.hidden = false;
			title.textContent = question.title || '';
			options.innerHTML = (question.options || []).map(function (option, index) {
				return '<button class="lyr-quiz__option" type="button" data-index="' + index + '">' + escapeHtml(option.label) + '</button>';
			}).join('');
			if (progress) progress.style.width = (((step + 1) / Math.max(questions.length, 1)) * 100) + '%';
			if (count) count.textContent = (step + 1) + ' / ' + questions.length;
			if (back) back.hidden = step === 0;
		}

		function productScore(product, scores) {
			var score = scores[product.category] || 0;
			if (product.badge) score += 0.25;
			return score;
		}

		function badgeStyle(label) {
			var normalized = String(label || '').toLowerCase();
			if (normalized.indexOf('bestseller') !== -1 || normalized.indexOf('top') !== -1) return 'best';
			if (normalized === 'új' || normalized === 'uj' || normalized.indexOf('újdonság') !== -1 || normalized.indexOf('ujdonsag') !== -1) return 'new';
			if (normalized.indexOf('b2b') !== -1 || normalized.indexOf('céges') !== -1 || normalized.indexOf('ceges') !== -1) return 'dark';
			if (normalized.indexOf('szezon') !== -1 || normalized.indexOf('limit') !== -1) return 'gold';
			if (normalized.indexOf('eco') !== -1) return 'eco';
			if (normalized.indexOf('egyedi') !== -1) return 'info';
			return 'accent';
		}

		function discountBadge(product) {
			var price = parseFloat(product.price || 0);
			var regular = parseFloat(product.regular_price || 0);
			if (!regular || !price || regular <= price) return '';
			return '-' + Math.round(((regular - price) / regular) * 100) + '%';
		}

		function badges(product) {
			var items = [];
			var discount = discountBadge(product);
			if (discount) items.push({ label: discount, style: 'sale' });
			if (product.badge) items.push({ label: product.badge, style: badgeStyle(product.badge) });
			if (!items.length) return '';
			return '<div class="sh-badges lyr-badges">' + items.map(function (item) {
				return '<span class="sh-badge sh-badge--' + item.style + ' lyr-badge lyr-badge--' + item.style + '">' + escapeHtml(item.label) + '</span>';
			}).join('') + '</div>';
		}

		function card(product) {
			var price = product.price > 0 ? product.price + ' RON' : 'Ajánlatkérés';
			var was = product.regular_price && product.regular_price > product.price ? '<del>' + escapeHtml(product.regular_price + ' RON') + '</del>' : '';
			return '<article class="sh-prod-card sh-reveal lyr-product-card lyr-product-card--demo" data-layero-product-card data-layero-product-id="' + escapeHtml(product.id) + '">' +
				'<figure class="lyr-product-card__media">' + badges(product) + '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name) + '" loading="lazy"></figure>' +
				'<button class="sh-heart lyr-product-card__wish" type="button" data-layero-wish-toggle data-layero-product-id="' + escapeHtml(product.id) + '" aria-label="Kedvencekhez adás">' + heart + '</button>' +
				'<div class="sh-prod-card__body lyr-product-card__body"><a class="sh-card-link" href="' + escapeHtml(product.url) + '" aria-label="' + escapeHtml(product.name) + '"></a>' +
				'<span class="sh-prod-card__cat lyr-product-card__cat">' + escapeHtml(product.category_label || product.category) + '</span>' +
				'<span class="sh-prod-card__name">' + escapeHtml(product.name) + '</span>' +
				'<span class="sh-prod-card__price lyr-product-card__price">' + was + escapeHtml(price) + '</span>' +
				'<a class="sh-card-add lyr-btn lyr-btn--primary lyr-product-card__add" href="' + escapeHtml(product.url) + '">' + cart + '<span>Megnézem</span></a></div></article>';
		}

		function renderResult() {
			var scores = {};
			answers.forEach(function (tags) {
				(tags || []).forEach(function (tag) {
					scores[tag] = (scores[tag] || 0) + 1;
				});
			});
			var ranked = products.slice().map(function (product) {
				product._score = productScore(product, scores);
				return product;
			}).sort(function (a, b) {
				return b._score - a._score || b.price - a.price;
			});
			var hits = ranked.filter(function (product) { return product._score > 0; }).slice(0, 4);
			if (!hits.length) hits = ranked.slice(0, 4);
			productsRoot.innerHTML = hits.map(card).join('');
			options.hidden = true;
			if (lead) lead.hidden = true;
			title.hidden = true;
			if (back) back.hidden = true;
			result.hidden = false;
			initWishlist(root);
		}

		options.addEventListener('click', function (event) {
			var button = event.target.closest('[data-index]');
			if (!button) return;
			var question = questions[step];
			var option = question && question.options ? question.options[parseInt(button.getAttribute('data-index'), 10)] : null;
			answers[step] = option ? option.tags || [] : [];
			step++;
			if (step >= questions.length) renderResult();
			else renderQuestion();
		});

		if (back) {
			back.addEventListener('click', function () {
				if (step === 0) return;
				answers.pop();
				step--;
				renderQuestion();
			});
		}

		if (restart) {
			restart.addEventListener('click', function () {
				step = 0;
				answers = [];
				renderQuestion();
			});
		}

		renderQuestion();
	}

	function initCarousel(track) {
		if (track.dataset.layeroCarouselReady === '1') return;
		track.dataset.layeroCarouselReady = '1';

		var root = track.closest('.lyr-product-carousel') || track.parentElement;
		var prev = root ? root.querySelector('[data-layero-carousel-prev]') : null;
		var next = root ? root.querySelector('[data-layero-carousel-next]') : null;
		var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var hold = function () {};

		function move(direction) {
			track.scrollBy({
				left: direction * Math.max(280, Math.round(track.clientWidth * 0.78)),
				behavior: 'smooth'
			});
		}

		if (prev) prev.addEventListener('click', function () { hold(2600); move(-1); });
		if (next) next.addEventListener('click', function () { hold(2600); move(1); });

		/* folyamatos marquee-görgetés: a kártyasort megduplázzuk, és a
		   görgetés varrat nélkül visszaugrik az elejére (mint a lokális shopon) */
		if (track.hasAttribute('data-layero-marquee') && !reduce) {
			var cards = track.children.length;
			if (cards > 2) {
				track.insertAdjacentHTML('beforeend', track.innerHTML);
				Array.prototype.forEach.call(track.querySelectorAll('.sh-reveal'), function (el) {
					el.classList.add('is-in');
				});
				track.style.scrollSnapType = 'none';

				var speed = parseInt(track.getAttribute('data-layero-marquee-speed'), 10);
				speed = Number.isFinite(speed) && speed > 0 ? speed : 42;
				var paused = false;
				var hovering = false;
				var resumeTimer = 0;
				var lastTs = 0;

				var resume = function () { if (!hovering && !document.hidden) paused = false; };
				var pause = function () { paused = true; window.clearTimeout(resumeTimer); };
				hold = function (ms) { pause(); resumeTimer = window.setTimeout(resume, ms || 1800); };

				function step(ts) {
					if (lastTs && !paused) {
						track.scrollLeft += speed * (ts - lastTs) / 1000;
						var half = track.scrollWidth / 2;
						if (track.scrollLeft >= half) track.scrollLeft -= half;
					}
					lastTs = ts;
					window.requestAnimationFrame(step);
				}
				window.requestAnimationFrame(step);

				track.addEventListener('mouseenter', function () { hovering = true; pause(); });
				track.addEventListener('mouseleave', function () { hovering = false; resume(); });
				track.addEventListener('pointerdown', pause);
				window.addEventListener('pointerup', function () { hold(1800); });
				track.addEventListener('wheel', function () { hold(1800); }, { passive: true });
				track.addEventListener('touchmove', function () { hold(1800); }, { passive: true });
				document.addEventListener('visibilitychange', function () {
					if (document.hidden) pause();
					else resume();
				});
			}
		}
	}

	function initSpotlight(root) {
		if (root.dataset.layeroSpotlightReady === '1') return;
		root.dataset.layeroSpotlightReady = '1';

		var imgs = Array.prototype.slice.call(root.querySelectorAll('.sh-spotlight__img'));
		var dots = Array.prototype.slice.call(root.querySelectorAll('.sh-spotlight__dot'));
		var dataNode = root.querySelector('[data-lyr-spotlight-items]');
		if (imgs.length < 2 || !dataNode) return;

		var items;
		try {
			items = JSON.parse(dataNode.textContent || '[]');
		} catch (error) {
			return;
		}
		if (!items || items.length < 2) return;

		var dyn = root.querySelector('[data-f-dyn]');
		var badge = root.querySelector('[data-f-badge]');
		var link = root.querySelector('[data-f-link]');
		var nameEl = root.querySelector('[data-f-name]');
		var descEl = root.querySelector('[data-f-desc]');
		var priceEl = root.querySelector('[data-f-price]');
		var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var interval = parseInt(root.getAttribute('data-lyr-interval'), 10);
		interval = Number.isFinite(interval) && interval >= 2000 ? interval : 4200;
		var current = 0;
		var timer = null;
		var swapTimer = null;

		function fill(item) {
			if (nameEl) nameEl.textContent = item.name || '';
			if (descEl) descEl.textContent = item.desc || '';
			if (priceEl) priceEl.innerHTML = item.price || '';
			if (link && item.url) link.setAttribute('href', item.url);
		}

		function show(index) {
			current = (index + items.length) % items.length;
			imgs.forEach(function (img, i) { img.classList.toggle('is-on', i === current); });
			dots.forEach(function (dot, i) {
				var on = i === current;
				dot.classList.toggle('is-on', on);
				dot.setAttribute('aria-selected', on ? 'true' : 'false');
			});
			if (badge) badge.textContent = items[current].badge || '';
			window.clearTimeout(swapTimer);
			if (reduce || !dyn) {
				fill(items[current]);
				return;
			}
			dyn.classList.add('is-swap');
			swapTimer = window.setTimeout(function () {
				fill(items[current]);
				dyn.classList.remove('is-swap');
			}, 190);
		}

		function stop() {
			if (timer) window.clearInterval(timer);
			timer = null;
		}

		function start() {
			stop();
			if (!reduce) timer = window.setInterval(function () { show(current + 1); }, interval);
		}

		dots.forEach(function (dot, i) {
			dot.addEventListener('click', function () { stop(); show(i); start(); });
		});
		root.addEventListener('mouseenter', stop);
		root.addEventListener('mouseleave', start);

		start();
	}

	function initNewsletter(form) {
		if (form.dataset.layeroNewsletterReady === '1') return;
		form.dataset.layeroNewsletterReady = '1';

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			var root = form.closest('.lyr-newsletter');
			var note = root ? root.querySelector('[data-layero-newsletter-note]') : null;
			form.classList.add('is-done');
			if (note) {
				note.textContent = (window.LayeroShopUI && LayeroShopUI.i18n && LayeroShopUI.i18n.subscribed) ? LayeroShopUI.i18n.subscribed : 'Köszönjük, feliratkoztál.';
			}
		});
	}

	function initCorporateForm(form) {
		if (form.dataset.layeroCorporateReady === '1') return;
		form.dataset.layeroCorporateReady = '1';

		var status = form.querySelector('[data-layero-corporate-status]');
		var submit = form.querySelector('button[type="submit"]');
		var originalText = submit ? submit.textContent : '';

		function showStatus(message, type) {
			if (!status) return;
			status.textContent = message || '';
			status.className = 'lyr-corp-form__status is-visible ' + ('success' === type ? 'is-success' : 'is-error');
		}

		function validate() {
			var firstInvalid = null;
			form.querySelectorAll('input[required], textarea[required], select[required]').forEach(function (field) {
				var invalid = !field.checkValidity();
				field.classList.toggle('is-error', invalid);
				if (invalid && !firstInvalid) firstInvalid = field;
			});
			if (firstInvalid) firstInvalid.focus();
			return !firstInvalid;
		}

		form.addEventListener('input', function (event) {
			if (event.target && event.target.checkValidity && event.target.checkValidity()) event.target.classList.remove('is-error');
		});

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (!validate()) {
				showStatus('Kérjük, töltsd ki a kötelező mezőket.', 'error');
				return;
			}

			var config = accountConfig();
			if (!config.ajaxUrl || !config.contactNonce || !window.fetch) {
				showStatus('Az ajánlatkérés most nem küldhető el. Kérjük, írj a layeroprint@gmail.com címre.', 'error');
				return;
			}

			var data = new window.FormData(form);
			data.append('action', 'layero_contact_submit');
			data.append('nonce', config.contactNonce);
			data.append('topic', 'Céges ajánlatkérés');

			if (submit) {
				submit.disabled = true;
				submit.textContent = 'Küldés…';
			}
			if (status) status.className = 'lyr-corp-form__status';

			window.fetch(config.ajaxUrl, {
				method: 'POST',
				credentials: 'same-origin',
				body: data
			}).then(function (response) {
				return response.json().then(function (payload) {
					if (!response.ok || !payload || !payload.success) {
						throw new Error(payload && payload.data && payload.data.message ? payload.data.message : 'Az ajánlatkérést most nem sikerült elküldeni.');
					}
					return payload.data || {};
				});
			}).then(function (payload) {
				form.reset();
				showStatus(payload.message || 'Köszönjük! Megkaptuk az ajánlatkérést.', 'success');
			}).catch(function (error) {
				showStatus(error.message || 'Az ajánlatkérést most nem sikerült elküldeni.', 'error');
			}).finally(function () {
				if (submit) {
					submit.disabled = false;
					submit.textContent = originalText;
				}
			});
		});
	}

	function initMiniCart(root) {
		if (root.dataset.layeroCartReady === '1') return;
		root.dataset.layeroCartReady = '1';

		var toggle = root.querySelector('[data-layero-cart-toggle]');
		var panel = root.querySelector('[data-layero-cart-panel]');
		if (!toggle || !panel) return;
		toggle.addEventListener('click', function () {
			var open = panel.hasAttribute('hidden');
			panel.toggleAttribute('hidden', !open);
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	}

	function boot(context) {
		upgradeLegacyFavoritesMount(context || document);
		(context || document).querySelectorAll('[data-layero-slider]').forEach(initSlider);
		(context || document).querySelectorAll('[data-layero-quiz]').forEach(initQuiz);
		(context || document).querySelectorAll('[data-layero-carousel]').forEach(initCarousel);
		(context || document).querySelectorAll('[data-lyr-spotlight]').forEach(initSpotlight);
		(context || document).querySelectorAll('[data-layero-newsletter]').forEach(initNewsletter);
		(context || document).querySelectorAll('[data-layero-corporate-form]').forEach(initCorporateForm);
		(context || document).querySelectorAll('.lyr-mini-cart').forEach(initMiniCart);
		initWishlist(context || document);
		bootstrapWishlist().then(function () { refreshFavoritesWidgets(context || document, false); });
	}

	document.addEventListener('DOMContentLoaded', function () { boot(document); });
	$(window).on('elementor/frontend/init', function () {
		if (!window.elementorFrontend) return;
		window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
			boot($scope[0]);
		});
	});
})(jQuery);
