# Layero Shop UI 0.10.0 — helyi kiadási jelölt

2026-09-29. Ez a javításcsomag karbantartási módban telepíthető és ellenőrizhető; önmagában nem jelenti a webshop nyilvános indulásának jóváhagyását.

## Elkészült

- A fejléc keresője a WooCommerce nyilvános termékeiből dolgozik: valódi ár, kép, terméknév és termékoldal. A kiemelt termékek és a kategóriák darabszámai is natív adatot kapnak. Üres WooCommerce-találat esetén nem jelenik meg demótermék.
- Javított numerikus árrendezés, stabil sorrend és lapozás a terméklistában; a keresés, kategória és rendezés együtt megmarad.
- A Layero-fejléc elkészülte után a Hello Elementor / Elementor téma fejléce és lábléce rejtve marad. A mobilmenü Escape-re bezárul.
- Termékenkénti személyre szabási mezőséma, kötelező mezők és választék ellenőrzése a szerveren. A mezők bekerülnek a WooCommerce-kosárba és rendeléstételbe. A korábbi közös méret/szín választó megszűnt; az explicit séma nélküli személyre szabható termék feliratot vagy megjegyzést kér.
- Előrefizetendő terméknél utánvét tiltása, vegyes kosárban és szülő–variáció kapcsolatnál is. A korábbi 0.9.8-as helyi javítások részei ennek a csomagnak.
- Kapcsolat/céges/egyedi űrlap: tényleges mentés a **Layero megkeresések** WordPress-menüben, majd e-mail-értesítés. Hibás bemenet, hiányzó adatvédelmi jelölés, lejárt kérés, ismétlés és túl sok próbálkozás kezelése. E-mail-hiba esetén a mentett megkeresés megmarad.
- A bekötés nélküli hírlevél és nyitási értesítő nem gyűjt címet és nem ígér kupont. WordPress alatt a fejléc/lábléc nem ígér be nem kötött fizetési módot vagy fix ingyenes szállítási küszöböt.
- Korai Google Consent Mode alapállapot: hozzájárulás hiányában tiltás; visszavonáskor ismert Google-mérési sütik törlése. Ez integrációs alap, nem igazolás az összes online mérőkód viselkedéséről.
- Biztonságos statikus szinkron, teljes Origin-csomag, egységes gyorsítótár-verzió.

## Ellenőrzés

Elkülönített helyi WordPress 7.1.2, WooCommerce 11.1.2, Elementor 4.3.2, Hello Elementor, PHP 8.3.25, MariaDB 10.4.10. Kizárólag fiktív adatok; külső HTTP és e-mail a tesztkörnyezetben letiltva.

- 5 szinkronpróba: sortörések, hiányzó forrás, ismételt futás, hiba utáni visszaállítás, URL-átírás.
- 39 elkülönített kereskedelmi ellenőrzés.
- 26 valódi WordPress/WooCommerce-ellenőrzés: árak, keresés, rejtett termékek, kategóriaszám, lapozás, kötelező mezők, mennyiség, kupon, szállítás, kosár munkamenete, tesztrendelés, személyre szabás és variáció.
- 16 valódi WordPress-űrlapellenőrzés: jogosulatlan/hibás kérések, mentés, idézőjel és fordított perjel megőrzése, levélhiba, mentési hiba, sebességkorlát és privát hozzáférés.
- 49 futási PHP-fájl szintaxisellenőrzése; módosított JS-ek ellenőrzése; 357 tükrözött fájl egyezése.
- Chrome asztali és 390×844 mobilnézet: keresőből helyes termékoldal/ár, árrendezés, kötelező mezők, kosár és pénztárban megmaradó személyre szabás, utánvét hiánya az előrefizetendő kosárban, sikeres helyi kapcsolatfelvétel. Mobilon nincs oldalszintű vízszintes túlcsordulás, Escape bezárja a menüt. Az ellenőrzött oldalak konzoljában nem volt hiba.

A fizetési szolgáltató, a valódi levélkézbesítés, a futár/számlázó és az élő oldal további bővítményei nem szerepeltek ebben a helyi próbában. A helyi teszttermékek szándékosan helykitöltő képeket és próbaárakat használnak.

## cPanel Git Version Control frissítés

1. A telepítés **a plugin külön repójából** történik; a webshop gyökérrepója nem tartalmazza a plugint. A helyi kiadási ág: `codex/release-0.10.0`. A cPanel által követett távoli repót és ágat a feltöltés előtt egyeztetni kell. Nem történt távoli push vagy online telepítés.
2. Legyen mentés az élő adatbázisról és a jelenlegi `layero_shop_live` pluginmappáról. A bolt maradjon karbantartási módban.
3. Miután a kiadási commit a cPanel által követett ágra került: **Manage → Pull or Deploy → Update from Remote**, majd **Deploy HEAD Commit**.
4. A `.cpanel.yml` célja: `$HOME/shop/wp-content/plugins/layero_shop_live/`. Ezt a jelenlegi tárhely valódi WordPress-útvonalával össze kell vetni. A telepítés csak `assets/`, `includes/`, `languages/`, `layero-shop-ui.php`, `uninstall.php` fájlokat másol.
5. WordPressben a plugin verziója **0.10.0** legyen. Ürítsd az Elementor generált fájl/gyorsítótárát és az oldal/CDN gyorsítótárát. A kosár, pénztár, fiók és űrlap-végpont ne legyen teljesoldalas gyorsítótárazás alatt; hosszú élettartamú oldalcaching lejárt űrlap-azonosítót szolgálhat ki.
6. **Ne futtasd az oldalak újragenerálását a frissítéshez.** A fájlcsere elegendő a widgetjavításokhoz. A plugin a hiányzó, kötelező oldalakat létrehozhatja; meglévő oldal tartalmát a verzióellenőrzés nem írja felül. Az oldalkészítő külön művelet.
7. Online ellenőrzés: szám-lámpa kereső/termékár egyezése; lámpák növekvő rendezése; egy fejléc; termékmegadások; kosár/kupon/szállítás; szolgáltatói tesztfizetés; megkeresés mentése és valódi levélkézbesítés; sütiválasztás elutasítással és visszavonással is.

Visszaállításhoz az előző pluginmappa mentése vagy ellenőrzött korábbi kiadási commit telepítése használható. A jelen csomag nem töröl terméket/rendelést. A beérkezett megkeresések adatbázisban maradnak; a teljes adatbázis-visszaállítás új adatokat is visszavonna.

## Nyilvános indulás előtt hátravan

- A termékkezelő CSV-exportjának bővítése a [mezősémával](TERMEKADAT-SZERZODES.md), majd kontrollált import. A külső termékkezelő forrását ez a kiadás nem módosítja. A közvetlen online API-szinkron továbbra is külön fejlesztés.
- Termékenként jóváhagyott képek, leírások, árak, készlet, variációk és személyre szabási követelmények. A téves képet vagy helykitöltő leírást a termékkezelőben kell javítani.
- Fizetés/futár/számlázás szolgáltatóinak beállítása; tesztfizetés, sikertelen fizetés, levélkézbesítés és teljes rendelési próba a tárhelyen. Egyedi utánvétes gateway-azonosítót külön hozzá kell adni, ha nem `cod`.
- Cégadatokkal és a tényleges működéssel összehangolt ÁSZF, adatvédelem, megkeresések adatmegőrzése, szállítási/elállási tájékoztatók. A korábbi oldalszövegek és vélemények üzleti jóváhagyása is szükséges.
- Online mérőkódok/CMP összehangolása. Consent Mode önmagában nem jelenti valamennyi külső kérés leállítását.
- A klasszikus WooCommerce termékűrlap és pénztár ellenőrzött. A termék egyedi mezőinek beküldéséhez külön Store API-kliens nincs ebben a csomagban; hiányzó kötelező adatot a szerver elutasít.
- Tárhelymentés és visszaállítás próbája, jogosultságok, frissítési és hibajelzési folyamat.
