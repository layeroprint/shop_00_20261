# 0.10.16 — főoldali galériasáv eltávolítása

2026-09-30. Helyi WordPress-bővítményfrissítés a felhasználó által megjelölt, hat termékfotóból álló főoldali sáv eltávolítására.

- Az új főoldalak összeállításában már nincs `layero_gallery_strip`.
- A meglévő, statikus kezdőlapként beállított WordPress-oldalon az első adminisztrátori adminbetöltés célzottan eltávolítja ezt a widgetet és a miatta kiürülő kereteket. A többi elem, beállítás és az oldal szöveges tartalma megmarad.
- Az eredeti Elementor-adat és oldaltartalom külön `_layero_home_gallery_backup` mentésbe kerül. A `_layero_home_gallery_revision` megakadályozza az ismételt módosítást. A korábbi hírlevél/lábjegyzet eltávolítás jelölése és mentése független ettől.
- A módosítás törli az érintett oldal Elementor HTML- és CSS-gyorsítótárát. Az összes oldal újraépítése nem szükséges.
- A termékadatlapok és a céges oldal galériája nem érintett. A régi widget regisztrációja a mentett Elementor-tartalom kompatibilitása miatt megmarad.

## Ellenőrzés és átvétel

A változott PHP-fájlok szintaxisellenőrzése és a külön helyi WordPress-adatbázisban futtatott `tests/home-cleanup-wordpress.php` 16 ellenőrzése sikeres. A próba lefedi az adminisztrátori jogosultságot, a kezdőlap típusát, a célzott törlést, vegyes tartalmú keretek megőrzését, a külön mentést, a gyorsítótár-törlést és az ismételt futtatást.

A régi galériaelemmel létrehozott, majd célzottan frissített helyi WordPress-próbaoldalt HTTP-n, 1440 × 1000 és 390 × 844 méretben ellenőriztük. Nincs galériaelem, üres galériakeret, vízszintes túlcsordulás vagy konzolhiba; a véleményblokk után az egyedi ajándék banner következik. Képernyőképek: a gyökérprojekt ignorált `output/playwright/gallery-removal-desktop.png` és `gallery-removal-mobile.png` fájljai.

Ez helyi módosítás; GitHub-feltöltés és éles telepítés még nem történt. Az online átvételhez a 0.10.16 fájljait kell telepíteni, majd adminisztrátorként megnyitni a WordPress vezérlőpultját. Az éles kezdőlapon ellenőrizendő a sáv eltűnése; külső oldalgyorsítótár esetén annak ürítése is szükséges lehet.

A statikus főoldal már nem tartalmazta ezt a sávot, ezért fájltükör-szinkron nem futott. A vizsgálat közben más munka módosította az `index.html` és `assets/testimonials.css` forrásokat; ezek két tüköreltérését ez a feladat nem írja felül.
