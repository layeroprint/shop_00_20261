# 0.10.25 — A román zászlógomb megnyitja a Layero modalt

2026-09-30. Az élő webshopban a lebegő zászlógomb a Rólunk oldalra navigált. A modal és vezérlője betöltődött, de az Elementor Pro oldalváltó effektje a link saját kattintáskezelőjében letiltotta az eseményt, és navigációt indított, mielőtt a modal delegált kezelője megnyithatta volna az ablakot.

A statikus forrás és a generált WordPress-tükör nyitógombja megkapta az Elementor célzott `data-e-disable-page-transition` kivételét. Az oldalváltó effekt a többi linken megmarad; a modal nélküli Rólunk tartaléklink és az akadálymentes dialog-jelölések is megmaradnak. A bővítmény és a megváltozott JavaScript gyorsítótár-verziója frissült.

Ellenőrzés: JavaScript/PHP-szintaxis, öt sikeres szinkronpróba, 377 fájlos eltérésmentes tükör. Helyi HTTP-próba a tényleges Elementor Pro 4.3.0 oldalváltó kódjával: megnyitás navigáció nélkül, rétegek, műhelynézet és képek, Escape-bezárás, fókuszvisszaadás, Enterrel újranyitás és 390 pixeles mobilnézet; túlcsordulás és konzolhiba nélkül. A próba az ignorált `output/origin-debug/` alatt van.

Éles átvétel: GitHub `layeroprint/shop_00_20261`, `main` ág → cPanel aktív `layero_plugins` tároló → **Update from Remote**. Ebben a telepítésben külön Deploy HEAD Commit nem szükséges. A zászlógombot az élő oldalon újratöltés után is ellenőrizni kell.
