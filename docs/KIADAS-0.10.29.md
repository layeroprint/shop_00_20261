# 0.10.29 — Új vektoros Layero-logó

2026-10-01, élesítve. A felhasználó által átadott logó kerül a közös fejlécbe, láblécbe, Origin-panelbe és a két Hamarosan-widgetbe. A teljes SVG-ben a felirat is vektoros; világos és sötét háttérhez külön változat tartozik. A favicon és az Apple-ikon is az átadott csomagból származik. A nyilvános WordPress-fejléc az új ikonokat írja ki, az admin médiatári beállítását nem változtatja meg.

A statikus forrás szinkronja előzetes ellenőrzéssel és mentéssel történt. A függőben levő termékadat-tükör és két új termékkép kimaradt; nincs termékimport vagy rendelési változás. A korábbi, nem commitolt WooCommerce- és feliratkozásstílusok megmaradtak.

Ellenőrzés: statikus főoldal 1440/768/390/320 px, két statikus Hamarosan-oldal asztalon/mobilon, Origin asztalon/mobilon, főoldal-hivatkozások és billentyűzetfókusz. Külön helyi WordPress-főoldal 1440/390 px: megfelelő logók, ikonok és főoldal-URL. JavaScript/PHP-szintaxis, 5 szinkronpróba és 70 elkülönített kereskedelmi ellenőrzés sikeres. Részletek a főprojekt `docs/LOGO-2026-10-01.md` fájljában.

A felhasználó külön kérésére a GitHub `layeroprint/shop_00_20261` `main` ága és a cPanel aktív `layero_plugins` mappája átvette a `6b1250266df242ad1b15d1fc621f2e9ee497ba16` kiadást az **Update from Remote** művelettel. Előző állapot: `9b671a98a7a6fe69ab8760edc45e5b72b79bde86`.

Éles utóellenőrzés: főoldal 1440/390 px, betöltött fejléc- és lábléclogó, helyes képarány, túlcsordulás nélkül; `0.10.29` script és ikonok. Origin megnyitás az új logóval és Escape bezárás; böngészős figyelmeztetés vagy hiba nem jelentkezett. Bejelentkezés nélkül a meglévő HTTP 503-as Coming soon HU oldal is az új sötét logót és ikonokat használja. A karbantartási állapot, termékadatok, rendelések és fizetési beállítások változatlanok.
