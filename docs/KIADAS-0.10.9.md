# 0.10.9 — közvetlen kategóriaoldalak

2026-09-29. A `/termekek/?cat=…` oldal eddig azonos „Termékek” bevezetőt, teljes kategóriaajánlót, majd csak közel kétezer képponttal lejjebb szűrt termékeket mutatott. A termékrács címe továbbra is „Összes termék” volt, alatta általános újdonságokkal.

Az új oldal a kiválasztott kategória nevével, leírásával, morzsamenüvel és a lekérdezés tényleges találatszámával kezdődik. Közvetlenül utána kategóriaválasztó, kategórián belüli kereső, rendezés és termékrács következik. A teljes katalógus külön elérhető; az üres keresés nem kap más kategóriából pótló termékeket. Mobilon két termék fér egymás mellé. A főoldali kategóriakártyák ugyanerre a katalógusútvonalra vezetnek; a céges és egyedi ajánlatkérés saját oldala megmarad.

## Forrás és átállás

A javítás a natív WordPress-widgetet érinti: `includes/Widgets/Product_Grid.php`, `Category_Bento.php`, `includes/Helpers.php`, valamint a nem generált `assets/css/layero-online.css`. A statikus `kategoria.html` már korábban is közvetlen kategóriafejléccel indult, ezért a generált statikus tükör nem változott. A pluginverzió frissíti a CSS gyorsítótárkulcsát.

A `Page_Builder::maybe_upgrade_catalog()` adminisztrátori látogatáskor kizárólag a `/termekek/` oldal ismert hét widgetes összeállítását cseréli egyetlen dinamikus termékrácsra. Nem használja az összes oldal újraépítését. A teljes régi Elementor-adat és `post_content` a `_layero_catalog_backup_0_10_9` metaadatban megmarad. A `_layero_catalog_revision` megakadályozza az ismételt átállást; eltérő widget-összeállítást nem ír felül. A korábbi termékrács megjelenési beállításait megtartja, a teljes kategórialistázást viszont nem korlátozza régi „kiemelt” vagy „akciós” válogatási kapcsoló.

Visszaállítás: a mentés `elementor_data` értékét megfelelő `wp_slash()` használatával visszaírni az `_elementor_data` mezőbe, Elementor-oldalgyorsítótár törlése mellett. A revíziójelző maradjon meg, különben az átállás ismét lefuthat.

## Ellenőrzés

- PHP-szintaxis az öt módosított PHP-fájlon.
- 17 elkülönített WordPress-próba: mentés, jogosultság, ismételhetőség, eltérő oldalszerkezet védelme, kezdőlap megőrzése, kategóriacím és valódi találatszám, keresés, árrendezés, üres/érvénytelen kategória, kimeneti escape, 24 + 2 különböző terméket adó lapozás.
- 39 meglévő elkülönített kereskedelmi ellenőrzés sikeres.
- Helyi HTTP-böngészőpróba: kategóriaváltás, rendezés és üres keresés, mobil termékrács, konzolhiba nélkül.

Parancs: `php -d memory_limit=512M -d xdebug.mode=off output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/catalog-wordpress.php --path=output/wp-test/wordpress` a webshop gyökeréből. Kizárólag a helyi `layero_release_test` adatbázison fut: fiktív termékeket és katalógusoldalt készít. A termékkezelő adatai és az online árak nem változnak.
