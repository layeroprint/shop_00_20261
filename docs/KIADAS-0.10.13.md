# 0.10.13 — Layero Badge System

Helyi kiadás, 2026-09-30. Éles feltöltés ebben a feladatban nem történt.

A termékkártyák az átadott Layero Badge System 56 jelvénytípusát használják. Zónánként két kiemelés, tulajdonság vagy szolgáltatási adat jelenik meg; a többi érvényes jelvény lenyitható. A termékoldal és a statikus gyorsnézet szintén megkapta a jelvényeket. A képek eredeti megjelenése, a WooCommerce ármarkupja és a vásárlási hivatkozások megmaradnak.

## Beállítás

Termékek → termék szerkesztése → Termékadatok → Általános → **Layero Badge System**. Nyolc lenyitható csoportból választható több jelvény. Az értéket igénylő mezőket is ki kell tölteni. Hibás értéknél a korábbi konfiguráció marad érvényben, és az admin hibát jelez.

Az új `_layero_badge_config` termékmeta tömbként tárolja az `{id, value?}` bejegyzéseket. Az `_layero_badge_keys` és `_layero_product_badges` korábbi adatai is megmaradnak. Ezekből és a WooCommerce adataiból a `Badge_System::for_product()` állítja össze a listát. A duplikációkat és ellentmondó állapotokat a megjelenítőmotor rendezi.

Példa új, kereskedő által ellenőrzött konfigurációra:

```json
[{"id":"logo"},{"id":"giftWrap"},{"id":"productionTime","value":"3–7 munkanap"}]
```

Ez a példa nem kerül automatikusan termékre. Az ár, a készlet, a személyre szabás és a vállalt szolgáltatások valóságtartalmáért továbbra is a termékadat és a kereskedői beállítás felel. A jelvény nem módosítja a rendelhetőséget. A külön Termékkezelő adatbázisa és szinkronja nem változott.

A WooCommerce „kiemelt” jelölése „Kiemelt”, nem „Bestseller”. A Bestseller- és Újdonság-szűrő az új konfigurációt is figyelembe veszi. Az `instock` állapotból nem következik fizikai raktárkészlet. Variációs terméknél általános „Akció” szerepel, eltérő variációk árából nem keletkezik százalék.

## Erőforrások és frissítés

- A statikus webshop `assets/layero-badges/` mappája a forrás, az `assets/demo/layero-badges/` a szinkronizált WordPress-tükör.
- `includes/Badge_System.php`: admin és adatleképezés; `Helpers.php`: escape-elt kártyakonfiguráció; `Catalog.php`: statikus megjelenítőnek átadott WooCommerce-adatok és szűrők.
- `Assets.php`: függőségi sorrend; a jelvény-CSS a webshop stílusai után, a motor az adapter és a termékrenderelők előtt töltődik.
- A kedvencek AJAX-válaszának feldolgozása és az Elementor inicializálása célzottan futtatja az adaptert. Nincs új globális DOM-figyelő.
- A kiadáshoz a `templates/` mappa is szükséges a 0.10.12-ben bevezetett termékoldal miatt. A helyi WordPress-próba és az `output/` nem telepítendő.
- A `.cpanel.yml` telepítési lista kiegészült a `templates/` mappával, így a termékoldal új jelvénysora is része lesz a következő telepítésnek.

## Ellenőrzés

19 motorteszt, 5 szinkronteszt, 39 izolált kereskedelmi ellenőrzés és PHP/JS-szintaxispróbák sikeresek. A `tests/badges-wordpress.php` valódi, elkülönített WooCommerce-termékkel vizsgálja a többjelvényes mentést, hibás adatok kezelését, az ár/készlet/személyre szabás leképezését és a biztonságos HTML-t. A teszt a terméket végül törli.

HTTP-s böngészőpróbák: 320, 390, 768, 1024 és 1440 px; magyar/román feliratok; hosszú egyedi címke; lenyitás és Escape; ismételt inicializálás; statikus szűrő, kedvencek, gyorsnézet és termékoldal. A futó helyi WordPress-kategória és termékoldal erőforrásai és jelvényei is ellenőrizve.

A helyi `/kedvencek/` oldal 404-et ad; a meglévő kedvencek-komponenst külön böngészős próbakonténerben inicializálva a valódi AJAX-válaszból betöltött termékkártya megkapta a jelvényt, hibaüzenet nélkül.

Élesítés után az aktuális téma/Elementor stílusait, a bejelentkezett és vendég kedvenceket, valamint az egyszerű és variációs termék vásárlását az élő környezetben külön ellenőrizni kell.
