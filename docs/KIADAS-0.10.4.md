# 0.10.4 — két eredeti és három új főoldali dia

2026-09-29. A tulajdonos pontosítása szerint az eredeti lámpa-összehasonlító és rajongói ajánló is megmarad az eredeti szövegével. Ezek mellé kerül a három életkép. A statikus forrás és az Elementor widget azonos ötdiás alapösszeállítást kap.

- A régi hét alapdia és a 0.10.3 három érintetlen életképes alapdiája megjelenítéskor az új ötös összeállításra vált. Az egyedileg módosított szöveg, link vagy kép megakadályozza ezt az automatikus cserét.
- Az eredeti két dia magassága megmarad; a teljes képernyős méretezés csak az aktív életképre vonatkozik. A lámpás dia H1 főcíme megkapja az eredeti tipográfiát.
- A PHP-szintaxis ellenőrzése és 14 célzott, izolált WordPress-ellenőrzés sikeres. Parancs a statikus forrás gyökeréből: `php -d xdebug.mode=off -d memory_limit=512M output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/hero-wordpress.php --path=output/wp-test/wordpress`.
- Asztali és 390 px mobil WordPress-előnézet ellenőrizve: öt lapozópont, eredeti szövegek, külön mobilkép, vízszintes túlcsordulás és böngészőhiba nélkül.

## Az éles főoldalon talált ütközés

A WPCode **2084 — „Layero hero – helyi 7 elrendezés”** aktív PHP-részlete az `elementor/widget/render_content` szűrővel teljesen felülírta a plugin új hero-kimenetét. Sorszám alapján a régi elrendezéseket tette az új szövegek mellé. Az Elementor gyorsítótár ürítése ezt nem oldja meg. A snippet a plugin jelenlegi rendererének korábbi pótlása; az új megjelenéshez inaktiválni kell, nem törölni. Biztonsági másolata a helyi, nem publikált `output/online-0.10.4/` alatt marad.

A cPanel aktív `layero_plugins` repójában **Update from Remote** szükséges; **Deploy HEAD Commit nem szükséges**. A pluginfrissítés mellett az élő WPCode-felülírás külön adminisztrációs lépés, mert a Git-pull a WordPress-adatbázist nem módosítja. Éles ellenőrzésnél az öt diát és a két megmaradó interakciót is vizsgálni kell.
