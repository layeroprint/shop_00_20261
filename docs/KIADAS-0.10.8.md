# 0.10.8 — új GYIK

2026-09-29. A GYIK öt témakörben húsz kérdést, ékezetérzéketlen keresőt, gyors válaszokat és egy kompakt kapcsolatblokkot kapott. A túlméretezett fotós lezárás megszűnik. A natív lenyíló válaszok billentyűzettel is kezelhetők; mobilon keresés közben a találatok kerülnek a témalista helyére.

A fájlok a webshop gyökerében levő `gyik.html`, `shop.css` és `shop.js` szinkronizált tükrei. Verzió: `0.10.8`, statikus cache-kulcs: `20260929-faq`. A termékadatok, árak, WooCommerce-beállítások és hero-diák nem változtak.

## Biztonságos oldalfrissítés

A `Page_Builder` az új GYIK-et már a `layero_static_page` widgettel készíti. Adminlátogatáskor kizárólag a régi, változatlan generált `/gyik/` oldalt állítja át. A régi négy widget típusát és tartalmát ellenőrzi; az egyedi változatok megmaradnak. Az eredeti Elementor-adat és `post_content` az oldal `_layero_faq_backup_0_10_8` metaadatába kerül. A `_layero_faq_revision` megakadályozza az ismételt átállást. Elementor CSS- és elemgyorsítótár érvénytelenítése történik, más oldalt nem épít újra.

A régi generátor `/termekek/?cat=ceges` céges hivatkozását is felismeri a későbbi `/cegeknek/` mellett. Az online Elementor HTML-mezőjében pontosan ez az egy eltérés volt; más szöveg vagy egyedi célhivatkozás továbbra is megakadályozza az automatikus cserét.

Telepítés: a cPanel aktív `layero_plugins` checkoutjában **Update from Remote**, majd egy WordPress-adminoldal megnyitása és a `/gyik/` újratöltése. **Deploy HEAD Commit és az összes oldal újraépítése nem szükséges.** Egyedileg módosított GYIK esetén a migráció szándékosan nem fut; először össze kell vetni a tartalmat.

Visszaállításhoz a mentés `elementor_data` értéke kerül vissza az `_elementor_data` mezőbe, WordPress slash-kezeléssel és az Elementor cache újragenerálásával. A revíziójelző megtartandó, hogy az automatikus átállás ne induljon újra. Előbb készüljön adatbázismentés.

## Ellenőrzés

`tests/faq-wordpress.php`: régi oldal felismerése; egyedi szöveg, kép és további widget megőrzése; adminjogosultság; pontos mentés; idempotens átállás; kezdőlap változatlansága; húsz kérdés szerveroldali renderelése; WP URL-ek és keresőjelölő; régi fotó/ODR-link hiánya. Kizárólag a helyi `layero_release_test` adatbázisban futtatható, ott létrehozza/frissíti a GYIK fixture-oldalt.

HTTP-böngészőpróba statikusan és WordPressben, asztalon és mobilon. A keresés, üres találat, törlés, gyorslinkek és natív lenyíló válaszok ellenőrizve. A tartalom a pontos szállítási/fizetési lehetőségeket a pénztárra bízza; az ÁSZF teljes jogi felülvizsgálata nem része ennek a kiadásnak.
