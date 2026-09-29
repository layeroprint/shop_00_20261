# 0.10.5 — önálló Elementor-hero inicializálása

2026-09-29. Az ötdiás 0.10.4 megjelenés megmarad. Az élő főoldal önálló Elementor-widgeteket használ, és nincs rajta a statikus `data-page="home"` vagy `data-layero-page` jelölő. Emiatt a statikus JavaScript eddig nem indította el a hero lapozását, lámpa-összehasonlítóját és termék-váltóját.

Az interakciók inicializálása a közös induláskor történik, a saját DOM-elemeik jelenléte alapján, a főoldal többi widgetjének újrarenderelése nélkül. A statikus forrásban készül a javítás; a plugin JavaScriptjét a szinkroneszköz generálja. Cache-kulcs: `20260929-hero-init`.

Az élő WPCode-részletek közül a **2084 — Layero hero – helyi 7 elrendezés** és **2086 — Layero hero – helyi interakciók** inaktiválva, nem törölve. Az előbbi felülírta az új HTML-t, az utóbbi a `data-autoplay="0"` ellenére automatikusan lapozott és külön eseménykezelőket indított. A teljes eredeti tartalmuk helyi mentése az ignorált `output/online-0.10.4/` mappában van. Ezeket nem kell visszakapcsolni; a Git-pull az adatbázisban tárolt snippeteket nem módosítja.

Ellenőrzés: forrás és generált JavaScript szintaxis; plugin PHP-szintaxis; öt sikeres szinkronteszt; jelölő nélküli önálló Elementor-próbaoldal (`http://127.0.0.1:8139/qa-onallo-hero/`). Öt lapozópont, billentyűzetes váltás, 50%-ról 56%-ra mozgó összehasonlító, Gyűrűk Ura termék kiválasztása és új életkép betöltése működött. 390×844 nézetben a külön mobilkép töltődött, vízszintes túlcsordulás és konzolhiba nélkül.

Az aktív cPanel-checkout közvetlenül a `wp-content/plugins/layero_plugins` mappa. Frissítés: **Update from Remote**; külön Deploy HEAD Commit nem szükséges.
