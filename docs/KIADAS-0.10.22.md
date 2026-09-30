# 0.10.22 – Termékjelvények a képen belül

2026-09-30. Kiadási cél: `layeroprint/shop_00_20261`, `main` ág. Az éles telepítést a felhasználó végzi; ebben a feladatban online telepítés és élő WordPress-böngészőpróba nem történt.

A termékkártyák összes jelvénye a termékképen belül jelenik meg. A tulajdonság- és szolgáltatásjelvények sem kerülnek a terméknév alá vagy az ár elé; a régi személyre szabási jelölő nem ismétlődik. Két jelvény látszik közvetlenül, a többi a képen belüli „+N további” lenyitóban érhető el. Hosszú lista a képen belül görgethető. A statikus termékoldal és gyorsnézet ugyanazt a megjelenítést használja. A gyorsnézetben az első Escape a nyitott jelvénylistát, a következő a párbeszédablakot zárja.

A forrásból mentéssel frissült a WordPress-fájltükör. A jelvénymotor, jelvény-CSS, statikus script és érintett HTML-oldalak gyorsítótár-verziója frissült; a bővítmény verziója 0.10.22. A WooCommerce-termékadatok és árak nem módosultak.

Ellenőrzés: 20 meglévő jelvénymotor-próba, 5 szinkronpróba, JavaScript- és PHP-szintaxisellenőrzés, eltérésmentes fájltükör. Helyi HTTP-s főoldal/kategória/termékoldal/gyorsnézet asztali és mobilnézetben; Enter/Escape és fókusz; nyolcjelvényes, hosszú feliratos próba 320, 768 és 1440 px szélességen; ismételt adapter-inicializálás. Jelvényhez kapcsolódó JavaScript-hiba nem jelentkezett. Képek a webshop helyi `output/playwright/badges-on-image-*` fájljaiban.

Telepítés: a cPanel aktív `/home2/layeroro/shop/wp-content/plugins/layero_plugins` Git-tárolójában **Update from Remote**. A történelmi `.cpanel.yml` más célkönyvtárat használ; **Deploy HEAD Commit nem szükséges**. Frissítés után a főoldali és kategóriakártyák jelvényeit asztali és mobilnézetben is ellenőrizni kell. Ha Elementor még régi tartalmat mutat, **Clear Files & Data**, majd az oldal gyorsítótárának ürítése.
