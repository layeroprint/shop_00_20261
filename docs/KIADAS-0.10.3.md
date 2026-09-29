# 0.10.3 — személyes, életképes nyitóbannerek

2026-09-29. A felhasználó jóváhagyta a 0.10.3 megjelenését és GitHubra küldését. Az éles cPanel-frissítés külön lépés.

## Eredmény

A korábbi kétoszlopos termékkompozíciót teljes felületű, személyes ajándékozási jelenet váltja. Három életkép: névre szóló lámpát kapó gyerek, közös este a Hullám lámpa fényében, ünnepi kedvenc-lámpa ajándékozása. A rövidebb üzenet és hangsúlyos vásárlási gomb közvetlenül a képre kerül. Mobilra külön álló változat készült mindhárom jelenetből.

- A nyitó összeállítás alapértelmezetten kézzel lapozható. Nyíl-, Home/End billentyűkezelés; a böngésző Ctrl+Home művelete változatlanul használható.
- Mobilon a lebegő oldalgombok nem takarják a nyitó ajánlatot; a banner elhagyása után visszatérnek.
- A Hero Slider három új elrendezést és külön mobilkép mezőt kapott. Az érintetlen, korábbi hét alapdia megjelenítéskor az új három életképre frissül; egyedi régi összeállítás és saját képek/szövegek megmaradnak.
- A kiemelt termékek 0.10.2-ben javított, teljes eredeti képet mutató megjelenítése megmarad.
- Az új képek ImageGennel készült kampányillusztrációk, nem valódi vásárlói fotók. A katalógusfotók nem változnak.

## Ellenőrzés

- JavaScript-szintaxis: statikus forrás és WordPress-tükör.
- PHP-szintaxis: Hero Slider és pluginbelépő.
- Öt sikeres fájlszinkron-/adapterteszt; 14 sikeres izolált WordPress/Elementor ellenőrzés, beleértve a régi alapbeállítások váltását és az egyedi tartalom megőrzését.
- WordPress böngészős próba 1440×1000, 1920×1080 és 390×844 méreten; kiegészítő 320 és 768 px szélességellenőrzés. Mobilon külön képfájl töltődik, nincs vízszintes kilógás, a fő vásárlási gomb a helyi terméklistát nyitja.
- Statikus HTTP-előnézet asztalon és mobilon. A részletes vizuális próbák normál animációval futottak. A megvizsgált oldalak böngészőnaplójában nem volt hiba vagy figyelmeztetés.
- A szinkronellenőrzésnek nulla eltérést kell mutatnia. A képernyőképek a külön statikus forrásrepo output/lifestyle mappájában vannak.

A konverzió növekedését nem mértük; az új megoldás személyesebb üzenetre és könnyebben felismerhető következő lépésre épít. Az éles Elementor-beállításokat és szerveres cache-t a telepítés után ellenőrizni kell.

## Későbbi frissítés

GitHub main feltöltés után a cPanel aktív /home2/layeroro/shop/wp-content/plugins/layero_plugins tárolójában Update from Remote szükséges. Ebben a telepítésben a Deploy HEAD Commit nem szükséges. Ez a változtatás nem módosítja a WooCommerce árakat vagy termékadatokat.

A részletes tervezési irány, a képfájlok és a beépített ImageGen-promptok a külön statikus forrásrepo docs/LIFESTYLE-BANNEREK.md dokumentumában vannak.
