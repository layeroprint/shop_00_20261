# A helyi termékadatlap megjelenése WooCommerce alatt

A helyi `shop.js` új adatlapja és a külön PHP-s WooCommerce-sablon eltért. A statikus fájltükör frissítése önmagában nem frissíti a natív termékoldal szerkezetét.

A `templates/single-product.php` most ugyanazokat a közös termékoldali osztályokat és a `data-layero-page="termek"` jelölést használja. Az Assets meglévő adaptere bekapcsolja a helyi CSS termékoldalra korlátozott szabályait. A főfotó vágatlan, a bélyegképek görgethetők; képszámláló, kedvencek gomb, nagyobb cím, külön árblokk, szakaszmenü és az új részletes leírás/szállítás elrendezés jelenik meg.

A natív WooCommerce-űrlap, termékazonosító, variációk és szerveroldali ellenőrzések megmaradnak. A saját mezőséma adja a személyre szabási mezőket és karakterkorlátokat; üres séma esetén nincs kitalált mező. A mezők új panelt és számlálót kapnak, a felirat biztonságos szöveges előnézetként látszik. Az új mennyiséggombok a WooCommerce eredeti számmezőjét kezelik. Az összeg a WooCommerce megjelenítési árából és pénznem-formátumából számol, variációválasztáskor frissül, törléskor visszaáll.

Az online vásárlási felület nem veszi át a demókosarat, a demó fizetési logókat vagy a helyi előnézet üzleti/jogi ígéreteit. Az árak és a termékadatok nem változtak. A korábban megkezdett készlet-/határidőjelzés-eltávolítás érintett sablonrészét megőriztük.

## Helyben ellenőrizve

- PHP- és JavaScript-szintaxis; 70 elkülönített kereskedelmi próba.
- `tests/single-product-wordpress.php`: 24 próba a külön `layero_release_test` adatbázisban. Natív űrlap, kötelező mezők, egyszerű és variációs termék, darabszám, kupon, szállítás, WooCommerce-session és előrefizetési korlátozás.
- Böngészőben 1440, 390 és 320 px szélesség, képnagyítás és Escape/fókuszvisszaadás; nincs vízszintes oldaltúlcsordulás vagy megfigyelt JavaScript-hiba.
- `Olivér <3` felirat, 10-es szám, fekete szín és 2 darab megmaradt a valódi helyi WooCommerce-kosárban újratöltés után. A teszt saját kosársorát eltávolítottuk; a korábbi sorokat megőriztük.
- Variáció kiválasztása: 2 × 90 = 180; választás törlésekor ismét „Válassz változatot”.

Próbaparancs a webshop gyökeréből:

```text
php -d memory_limit=512M -d xdebug.mode=off output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/single-product-wordpress.php --path=output/wp-test/wordpress
```

A külön natív CSS és JS verziója `LAYERO_SHOP_UI_VERSION + '-product-20260930'`. A teljes fájltükröt ez a javítás nem szinkronizálja. Rendelés, fizetés és e-mail-küldés nem történt.
