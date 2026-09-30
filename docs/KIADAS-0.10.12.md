# 0.10.12 — WooCommerce termékadatlap

2026-09-29. A WooCommerce termékoldal a helyi `termek.html` fő elrendezését használja: morzsamenü, nagy képgaléria, termékinformáció és vásárlási blokk, leírás/specifikáció, lenyíló tájékoztatók, valódi értékelések és kapcsolódó termékek. A termék permalinkje, ára, képei, készlete, variációi és személyre szabási mezői továbbra is a WooCommerce-adatból érkeznek. A vásárlási űrlap a meglévő szerveroldali ellenőrzést és kosarat használja.

Az új sablon kizárólag `is_product()` oldalon lép életbe. A régi téma/Elementor megjelenés visszakapcsolható a `layero_shop_ui_use_single_product_template` filterrel. Nem fut oldal- vagy termékadat-migráció, a statikus termékadatokat nem importálja. A katalógus és más oldalak sablonját nem érinti.

## Helyi ellenőrzés

- PHP-szintaxis és JavaScript-szintaxis rendben; a külön `commerce.php` ellenőrzés futott.
- Az izolált `127.0.0.1:8139` WordPress/WooCommerce-próbában a termékoldal HTTP 200 választ adott, a 390 px mobilnézetben a dokumentum nem lógott ki vízszintesen.
- A személyre szabott termék neve/száma/színe WooCommerce-kosárba került és ott megmaradt. A variáció választó használható. A galéria bélyegképe váltott, a nagyítás egyetlen ablakot nyitott és Escape-re bezárult. A konzolban nem volt hiba.

## Online frissítés

A plugin `main` ágának frissítése után a cPanel aktív `layero_plugins` Git-mappájában **Update from Remote** szükséges. Az aktív bővítmény 0.10.12 verzióját, egy egyszerű és egy variációs termék asztali/mobil adatlapját, valamint a kosárba helyezést az élő WordPressben is ellenőrizni kell. A termékenkénti leírás, kép és ár eltéréseit a termékkezelő → WooCommerce adatátadásban kell javítani, nem a sablonban.
