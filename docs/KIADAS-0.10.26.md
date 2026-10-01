# 0.10.26 — Tíz lapozható főoldali vélemény

2026-10-01. A statikus főoldal tíz kártyát tartalmazott, az élő Elementor-widget listája azonban továbbra is háromelemes volt. A WordPress-widget az eredeti három kártyával és a statikus forrás hét meglévő, kitalált mintájával indul. A hét minta látható „Minta” témacímkét és a kitalált tartalmat jelző akadálymentes megnevezést kap; nem kerülnek WooCommerce-termékértékelésként az adatbázisba.

Az adminisztrátor következő adminoldal-betöltése célzottan bővíti a kezdőlap ismert, eredeti háromelemű listáját. A név, idézet, termék, sorrend és pontszám alapján felismerhető listához hozzáfűzi a hét mintát, az eredeti elemek minden beállítását megőrzi. Egyedi szöveg, megváltoztatott pontszám vagy sorrend, üres lista és már tízelemes lista esetén nem ír át tartalmat. Más oldalt és widgetet nem épít újra.

Írás előtt a `_layero_home_testimonials_backup` oldalmeta menti a teljes eredeti Elementor-adatot és oldaltartalmat. A `_layero_home_testimonials_revision` jelzi az egyszeri frissítést. A művelet törli az érintett oldal Elementor-gyorsítótárát. Visszaállításkor a mentett `elementor_data` érték célzottan visszatehető az oldal `_elementor_data` mezőjébe; a revision jelölés megtartása megakadályozza az újbóli bővítést.

Szerkesztés: a főoldal „Layero vélemények” widgetjének listájában a „Mintavélemény” kapcsoló vezérli a jelölést. Aktív kapcsolónál egy kiürített vagy átírt témacímke mellett is megmarad a látható „Minta” felirat. Csak valódi, jóváhagyott tartalomra cserélés után kapcsold ki.

Ellenőrzés: az öt megváltozott PHP-fájl szintaxisa, az öt szinkronpróba és az elkülönített WordPress/Elementor-próba sikeres. Utóbbi ellenőrzi a tíz kártyát, a hét jelölt mintát, a statikus mintákkal egyezést, szöveg-escape-elést, célzott mentést, ismételt futást, egyedi és üres listák megőrzését. A közös CSS/JS már egyezik a statikus forrással; a teljes tükör frissítése ebben a kiadásban nem szükséges. A tükörben maradt képszinkron-eltérések ettől a javítástól függetlenek.

Éles átvétel: GitHub `layeroprint/shop_00_20261`, `main` → cPanel aktív `layero_plugins` tároló → **Update from Remote**, majd adminoldal-betöltés és a főoldal újratöltése. A telepítés utáni asztali és mobilos eredményt a főprojekt `docs/VELEMENYEK.md` fájlja rögzíti.
