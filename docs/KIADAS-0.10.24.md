# 0.10.24 – termékkereső javítása

A „mot” keresés korábban a leírások „motívum” és „dombornyomott” szavaiba is beleillett. A gyorskereső az első hat, ábécében elöl álló találatot mutatta; a teljes katalógus külön, ugyancsak túl tág leíráskeresést használt.

Mindkét felület most terméknévben, SKU-ban, kategórianevekben és a látható/választható attribútumértékekben keres. Minden keresett szónak teljesülnie kell; szókezdettel, ékezetfüggetlenül, tetszőleges szósorrendben. A terméknévben egyező találatok előnyt kapnak. A teljes katalógus alapértelmezett keresési sorrendje ugyanezt a rangsort használja; az ár/név/dátum szerinti választott rendezés továbbra is érvényes.

Az ismétlődő marketingleírások nem keresési mezők. A termékadatok és árak nem változnak. Az üres találatot nem pótolja más termék. Mobilon a fókuszált kereső a menü szélességét követi, a találati doboz nem lóg ki balra.

## Ellenőrzések

- Gyökérforrás: `node --check shop.js`, `node --test tests/search.test.cjs` – 5 sikeres próba, köztük a tényleges statikus katalógus „mot” keresése.
- Plugin: a változott PHP-k szintaxisellenőrzése; a generált JavaScript ellenőrzése; `node --test tests/sync-static.test.js` – 5 sikeres próba; `php -d xdebug.mode=off tests/commerce.php` – 70 sikeres ellenőrzés.
- Elkülönített WordPress: `tests/search-wordpress.php` WP-CLI `eval-file` módban – valódi WooCommerce-találatok, natív widget, árszűrés, nulla találat, ékezetek, szósorrend, rangsor és adatmezők. A próba fiktív termékei a végén törlődnek; az éles adatbázist tiltja.
- Helyi HTTP-előnézet asztalon és 390 × 844 nézetben: gyorskereső → találati oldal, Escape, üres keresés, mobilos doboz és konzol. Mobilon a doboz 21–354 pixel között maradt a 375 pixeles tartalomban.

A fájltükör frissítése célzottan, a szinkron eszköz ellenőrzésével és mentésével történt. A teljes munkapéldányban más, korábbi vagy párhuzamos módosítások is vannak; a kiadásba kizárólag a keresőhöz tartozó változások kerülnek. Az eltérő jelvényfájlok nem részei ennek a javításnak.
