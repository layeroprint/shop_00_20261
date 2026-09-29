# Helyi ellenőrzések

Gyors próbák a plugin mappájából:

```text
node --test tests/sync-static.test.js
php -d xdebug.mode=off tests/commerce.php
node tools/sync-static.js --check
```

## Valódi WordPress-próba

A 2026-09-29-i helyi környezet a webshop gyökerének ignorált `output/wp-test/` mappájában van. Nem része a kiadásnak. WordPress/Elementor/WooCommerce/Hello Elementor hivatalos letöltésekből; a plugin helyi mappája csatlakozik a teszt WordPresshez.

- Webhely: `http://127.0.0.1:8139`, külön MariaDB: `127.0.0.1:3319`.
- Adatbázis neve: `layero_release_test`; a tesztek eltérő névnél vagy nem helyi domainnél leállnak.
- A tesztkörnyezet `wp-content/mu-plugins/layero-test-safety.php` fájlja letiltja a külső HTTP-kéréseket, és megszakítja az e-mailek tényleges küldését. Új környezetben ezt **a teszt előtt** be kell állítani.
- `setup-wordpress.php` fiktív termékeket, oldalakat és tesztfizetési/szállítási beállításokat hoz létre. `wordpress.php` tesztrendelést, `forms-wordpress.php` privát tesztmegkereséseket ment. Kizárólag elkülönített adatbázisban futtathatók.
- A backendtesztek az ismert fixture-árakkal és darabszámokkal dolgoznak; ne keverd össze az online katalógussal.

A webshop gyökeréből, a helyi adatbázis elindítása után:

```text
php -d memory_limit=512M -d xdebug.mode=off output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/setup-wordpress.php --path=output/wp-test/wordpress
php -d memory_limit=512M -d xdebug.mode=off output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/wordpress.php --path=output/wp-test/wordpress
php -d memory_limit=512M -d xdebug.mode=off output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/forms-wordpress.php --path=output/wp-test/wordpress
```

A böngészős próbához használt helyi webszerver:

```text
php -d memory_limit=512M -d xdebug.mode=off -S 127.0.0.1:8139 -t output/wp-test/wordpress output/wp-test/router.php
```

A fenti fájlok friss klónban nincsenek jelen: a külön WordPress és adatbázis létrehozása szükséges. Éles környezet URL-jét/hozzáférését soha ne helyettesítsd be ezekbe a parancsokba. A cPanel-telepítés nem másolja a `tests/` vagy `output/` tartalmát.
