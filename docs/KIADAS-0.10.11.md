# 0.10.11 — kategóriák és szűrős katalógus

2026-09-29. A fejléc kategórialinkjei a `/termekek/?cat=…` WooCommerce-listára vezetnek. Az oldal most a statikus `kategoria.html` mintáját követi: sötét kategóriafejléc, vízszintes kategóriafülek, asztalon bal oldali szűrők és négyoszlopos termékrács. Mobilon két termékoszlop és összecsukható szűrőpanel látható. A mobil fejléc menüjében a kategóriák közvetlenül is elérhetők.

Az ár, akció, újdonság, bestseller, személyre szabhatóság és értékelés szűrése a WooCommerce tényleges adatait használja. Az értékelési feltétel legalább egy értékelés és minimum 4,8-as átlag. A darabszámok az adott kategória és keresés kínálatát jelzik, a további szűrők alkalmazása előtt. Nem jelenítünk meg adat nélküli LED- vagy elállásjelölést.

A keresés, rendezés, kategóriafülek és lapozás megőrzik az aktív szűrést; új kategória választása a fejlécből tiszta kategórialistát nyit. A szűrők törlése megtartja a kategóriát, keresést és rendezést. Az üres találat üres marad. Az URL megosztható, a szűrés JavaScript nélkül is működik. A JavaScript a csúszkát, a mobilpanel kezdeti összecsukását és Escape bezárását segíti.

## Érintett források

Natív `Product_Grid` widget, `Catalog` szűrőlogika, `Helpers::query_products()` találati azonosítói, nem generált `layero-online.css` és `layero-online.js`. A statikus tükör és a termékkezelő adatai nem változnak. A 0.10.9-ben átállított katalógushoz nem kell új adatbázismigráció vagy Elementor-újraépítés. A verzióemelés frissíti az eszközök gyorsítótárkulcsát.

## Ellenőrzés

- 28 elkülönített WordPress/WooCommerce-próba sikeres: kategória, keresés, rendezés, lapozás, kombinált szűrők, üres eredmény, hibás paraméterek és HTML-escape.
- PHP-szintaxis az öt érintett PHP-fájlon, JavaScript-szintaxis és `git diff --check` sikeres.
- Helyi HTTP-próba 1440×1000 és 390×844 méretben; mobilmenüből kategóriára jutás, aktív kategóriafül, ár szerinti találatok, Escape és vízszintes kilógás ellenőrizve. A konzolban nem jelentkezett hiba.

Kiadás: a `layeroprint/shop_00_20261` GitHub-repó `main` ága. A cPanelben az aktív `/home2/layeroro/shop/wp-content/plugins/layero_plugins` mappához az **Update from Remote** szükséges; külön Deploy HEAD Commit nincs. Az online ellenőrzés állapotát az átadási napló rögzíti. A karbantartási/hamarosan indul módot ez a kiadás nem módosítja.
