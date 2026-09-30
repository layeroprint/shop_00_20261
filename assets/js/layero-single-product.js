(function () {
  'use strict';
  function init() {
    var root = document.querySelector('[data-layero-single-product]');
    if (!root) return;
    var main = root.querySelector('#lyr-product-main-image');
    var dialog = root.querySelector('#lyr-gallery-dialog');
    var zoom = root.querySelector('[data-layero-gallery-open]');
    var close = root.querySelector('[data-layero-gallery-close]');
    root.querySelectorAll('[data-layero-gallery-image]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (!main) return;
        main.src = button.dataset.layeroGalleryImage;
        main.removeAttribute('srcset');
        main.removeAttribute('sizes');
        main.alt = button.dataset.layeroGalleryAlt || '';
        root.querySelectorAll('[data-layero-gallery-image]').forEach(function (item) {
          var active = item === button;
          item.classList.toggle('is-on', active);
          item.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      });
    });
    if (dialog && zoom && typeof dialog.showModal === 'function') {
      zoom.addEventListener('click', function () {
        var enlarged = dialog.querySelector('img');
        enlarged.src = main.currentSrc || main.src;
        enlarged.alt = main.alt;
        dialog.showModal();
      });
      close.addEventListener('click', function () { dialog.close(); });
      dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
    }
    var preview = root.querySelector('#lyr-product-preview');
    var field = root.querySelector('[name="layero_personalization_text"], input[type="text"][name^="layero_fields["]');
    if (preview && field) {
      field.addEventListener('input', function () {
        preview.textContent = field.value.trim().slice(0, 40);
        preview.classList.toggle('is-on', preview.textContent.length > 0);
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
