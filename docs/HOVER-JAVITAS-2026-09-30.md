# A téma piros gombállapotainak megszüntetése

## Ok és javítás

A bejelentkezett online termékoldalon reprodukálható volt a képnagyító bezárógombjának rózsaszín háttere. A Hello Elementor `reset.css` fájljának `[type="button"]:hover` és `:focus` szabálya `#cc3366` hátteret adott a vezérlőknek, felülírva a kisebb prioritású komponensszíneket.

A külön `assets/css/layero-controls.css` a Layero vezérlőinek hover- és fókuszállapotát rögzíti: bezárók, kedvencek/összehasonlítás, gombváltozatok, lapozók, szűrők, képválasztók, Origin és sütikezelő. Világos felületen visszafogott cián, sötét felületen áttetsző háttér szerepel. A már kiválasztott kedvenc szív jelzése megmarad; a törlési műveletek rámutatási színe cián. A galéria korábbi WordPress-bezárója 44 × 44 pixeles kerek gombként is védett.

A fájlt az `includes/Assets.php` tölti be, saját fájlmódosítási időből képzett gyorsítótár-verzióval. Nincs témakód-módosítás, globális gombreset, adat- vagy kereskedelmi működésváltozás. A statikus fájltükör frissítése ehhez nem szükséges.

## Ellenőrzött állapot

- Helyi WordPress HTTP-n (`127.0.0.1:8139`): főoldal, katalógus, termék, céges, egyedi rendelési, kapcsolat-, fiók- és kosároldal gombjainak hover/fókusz vizsgálata. A kilencedik vizsgált `/kviz/` útvonal a helyi WordPressben 404-es oldalt adott, ezért ez nem igazol kvízoldali integrációs próbát.
- A kilenc útvonal összesen 283 gombján 358 hibás színállapot volt a javítás előtt; az ismételt vizsgálatban 0. Rejtett, később megjelenő panelvezérlőket is vizsgáltunk.
- 1440 és 390 px széles böngészőben a galéria és a sütipanel bezárója ellenőrizve. Escape bezárás, galéria-fókuszvisszaadás, látható billentyűzetes fókusz és csökkentett mozgás mellett is működik. Nincs vízszintes oldaltúlcsordulás vagy észlelt JavaScript-futási hiba.
- `php -l includes/Assets.php`: sikeres.

A galériapróba a közben külön elkészült közös képnagyítóval történt; annak átalakítása nem része ennek a hover-javításnak. A párhuzamos helyi módosítások megmaradtak.

Mérési eredmények és képek a webshop gyökerének `output/playwright/hover-*` fájljaiban. Ez a javítás helyi; éles telepítést ez a munkamenet nem végzett.
