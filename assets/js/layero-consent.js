(function () {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  function state(choice) {
    var allowed = choice === 'all' ? 'granted' : 'denied';
    return { analytics_storage: allowed, ad_storage: allowed, ad_user_data: allowed, ad_personalization: allowed };
  }
  var choice = null;
  try { choice = localStorage.getItem('sh_cookie_ok'); } catch (error) { /* Default to denied. */ }
  window.gtag('consent', 'default', state(choice));
  window.LayeroConsent = {
    update: function (value) {
      window.gtag('consent', 'update', state(value));
      if (value !== 'all') {
        document.cookie.split(';').forEach(function (entry) {
          var name = entry.trim().split('=')[0];
          if (!/^(_ga|_gid|_gat|_gcl)(_|$)/.test(name)) return;
          var expiration = name + '=; Max-Age=0; path=/; SameSite=Lax';
          document.cookie = expiration;
          var parts = location.hostname.split('.');
          for (var i = 0; i < parts.length - 1; i++) {
            document.cookie = expiration + '; domain=' + parts.slice(i).join('.');
          }
        });
      }
      document.dispatchEvent(new CustomEvent('layero:consent', { detail: state(value) }));
    }
  };
})();
