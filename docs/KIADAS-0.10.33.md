# 0.10.33 — Egységes tartalmi oldalrács és friss lábléc

A nem teljes szélességű tartalom a fejléc és lábléc közös rácsához igazodik a statikus oldalakon és a WooCommerce saját nézeteiben. Közös szélesség- és térközváltozók váltják fel az eltérő oldalankénti rácsokat; a teljes szélességű bannerek és háttérsávok megmaradnak.

A javítás a katalógust, termékoldalt, céges és egyedi rendelési oldalt, kapcsolatot, fiókot, kedvenceket, kosarat, pénztárt és jogi oldalakat is érinti. A Layero-widgeteket tartalmazó egyoszlopos Elementor-szekcióknál megszűnik a második dobozszélesség és a plusz vízszintes oszloptérköz.

A rácsjavítás első, célzott CSS/HTML-tükrözésekor a korábbról függő termékadat- és két termékkép-eltérés kimaradt. A CSS-verziók egységesen frissültek. A kiadás a 0.10.32 helyi javításaira épül.

Ellenőrzés: 16 statikus fő oldal hét képernyőméreten, négy további előnézeti oldal, kitöltött statikus kosár/pénztár, valamint 13 helyi WordPress-útvonal négy képernyőméreten. A kitöltött WooCommerce-kosár/pénztár további hat mérése is sikeres. A rácsmérések nem mutattak eltérő tartalmi széleket vagy vízszintes túlcsordulást. Az ellenőrzött változat konzolja hibamentes; az öt szinkronpróba, 70 elkülönített kereskedelmi ellenőrzés, PHP-szintaxis és diffellenőrzés sikeres.

Az első rácspróba után elkészült lábléc új rétegmintás SVG-hátteret és finomított tördelést használ. A felhasználó GitHub-feltöltési kérésekor a teljes statikus tükröt előellenőrzés után, mentéssel frissítettük: a lábléc CSS/JS, az új SVG, a meglévő termékadat-változások és a két függő termékkép is bekerült. A 384 fájlos tükör ellenőrzése nulla eltérést mutatott. Ez fájlszinkron, nem WooCommerce-termékimport.

A feltöltés előtti célzott próbában a lábléc 1440 és 390 px-es helyi HTTP-nézetben betöltött, nem okozott vízszintes túlcsordulást; a mobilmenü és a sütibeállító megnyitása, illetve Escape bezárása működött. A konzol hibamentes, a forrás és a tükör JavaScript-szintaxisa, a belépő PHP-fájl szintaxisa, az öt szinkronpróba és 70 elkülönített kereskedelmi ellenőrzés sikeres. Képek: `output/playwright/git-release-footer-*.png`.

GitHub-cél: **`layeroprint/shop_00_20261`, `main` ág**. Éles tárhelyfrissítés ebben a feladatban nem történt; az új lábléc és az Elementor-beállítások együttműködése az élő oldalon még ellenőrizendő. Az első rácspróba részletei: a webshop gyökerének `docs/OLDALRACS-2026-10-01.md` fájlja; ellenőrzési anyagai: `output/grid-20261001/`.
