# 0.10.14 — a helyi webshopváltozások egyesített kiadása

2026-09-30. A kiadás egyesíti a helyi fejlesztéseket a GitHub `main` ágának `06b649b` állapotával. Megmarad a 0.10.12 főoldali WooCommerce-kártyamegjelenése és a 0.10.13 valódi WooCommerce-termékoldala.

## Tartalom

- Layero Badge System: 56 jelvénytípus, adminbeállítások, kártyák és termékoldali jelvények. A korábbi helyi fejlesztési feljegyzés a `BADGE-RENDSZER.md` fájlban maradt meg; a GitHub korábbi 0.10.13 kiadási leírása továbbra is a termékoldalról szól.
- Frissített véleménykártyák, bannerek, főoldali tartalmak és a régi elemek célzott, mentést készítő eltávolítása.
- A legfrissebb statikus HTML/CSS/JavaScript és képek WordPress-tükre, beleértve a statikus termékadatlap változásait. A natív WooCommerce-termékoldal továbbra is a saját PHP-sablonját használja; a fájltükör nem alakítja át teljesen a natív termékoldalt.
- Az új sütikezelő a `sync-static.js` által másolt `assets/js/layero-consent.js` fájlba kerül. A meglévő korai `wp_head` betöltés a kategória-API-t a webshop kódja előtt elérhetővé teszi; a WordPress URL-adapter átírja az adatvédelmi hivatkozásokat.
- A plugin verziója 0.10.14, így a közös CSS/JS gyorsítótárkulcsa frissül. A telepítési fájllista a `templates/` mappát is tartalmazza. Böngészős naplók, helyi teszt-WordPress és mentések nem részei a kiadásnak.

## Ellenőrzés

- 19 jelvénymotor-próba és 5 szinkronteszt sikeres; a szinkronteszt az új sütikezelő másolását is ellenőrzi.
- 39 elkülönített PHP kereskedelmi ellenőrzés sikeres; az érintett PHP- és JavaScript-fájlok szintaxisa rendben.
- Valódi helyi WordPress/WooCommerce: `badges-wordpress.php`, `testimonials-wordpress.php` és `home-cleanup-wordpress.php` sikeres.
- `node tools/sync-static.js --check`: 371 ellenőrzött fájl, 0 eltérés.
- HTTP-s WordPress-böngészőpróba 1440 és 390 px szélességen: az új sütikezelő elérhető, a választás újratöltés után megmarad, a testreszabó panel Escape-pel zárható, az adatvédelmi hivatkozások WordPress URL-re mutatnak. Nincs vízszintes oldaltúlcsordulás vagy JavaScript-hiba. A képernyőkép a gyökérrepó ignorált `output/playwright/release-0.10.14-consent-mobile.png` fájlja.

## Online frissítés

A `layeroprint/shop_00_20261` repó `main` ágát a cPanel aktív `layero_plugins` Git-mappájában a **Pull or Deploy → Update from Remote** művelettel lehet átvenni. A korábban ellenőrzött telepítés közvetlenül ebből a mappából fut, ezért ott **Deploy HEAD Commit nem szükséges**. A `.cpanel.yml` másik célmappát használ; ne aktiválj második pluginpéldányt.

Ellenőrizd a 0.10.14 verziót, szükség szerint ürítsd az Elementor és a webhely gyorsítótárát, majd nézd meg a főoldalt, kategóriát, termékoldalt és sütibeállításokat mobilon is. Az élő WordPress frissítése, a külső mérőkódok vizsgálata és az élő rendelési próba ebben a GitHub-feltöltési feladatban nem történt meg. A termékkezelő és a WooCommerce termékadatai nem kerülnek szinkronizálásra ettől a fájlkiadástól.
