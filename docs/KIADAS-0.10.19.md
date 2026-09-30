# 0.10.19 – saját dizájnú WooCommerce kosárpanel

2026-09-30. A fejléc kosárgombja és a korábbi `layero_mini_cart` gomb egyetlen oldalsó panelt nyit. A „Kosár megtekintése” és „Tovább a pénztárhoz” link továbbra is a valódi WooCommerce-oldalra vezet.

## Működés

- A helyi kosár megjelenését követő terméksorok, képek, mennyiségválasztó, törlés, kuponmező, összesítő és türkiz pénztárgomb. Asztalon magas ablaknál külön görgethető terméklista, mobilon és alacsony ablaknál teljes, görgethető panel.
- A termékek, variációk és személyre szabási mezők a látogató WooCommerce-munkamenetéből érkeznek. A panel nem használja a statikus demókosarat.
- A kupon beváltása/eltávolítása a WooCommerce saját szabályait követi. Nincs demókupon-ajánló vagy feltételezett fizetésimód-jelvény.
- A szállítási sor a ténylegesen számított díjat mutatja; ismeretlen díjnál ezt jelzi. Az ingyenes szállítás sikerjelzése kizárólag ténylegesen kiválasztott ingyenes módhoz tartozik. Egy ismert csomagnál a haladási sáv az adott zóna ingyenes módszabályából és annak kuponkezeléséből készül. Több csomagnál nincs feltételezett közös küszöb.
- A felhasználó kifejezetten jóváhagyta a választható **15 RON-os ajándékcsomagolást**. A kiválasztás WooCommerce-munkamenetben marad, a felár natív rendelési díjtételként mentődik. A bruttó 15 RON az aktív standard adószabályt használja; nincs új adókulcs vagy üzleti szállítási beállítás. A funkció RON pénznemben érhető el. Utolsó termék törlése és kosárürítés törli a választást.
- A módosítások POST-kéréshez és nonce-hoz kötöttek; a termék és mennyiség szerveroldali ellenőrzést kap. Sikertelen kérésnél nincs automatikus ismétlés vagy hamis sikerjelzés. A hibás kupon szövege megmarad.
- A natív mini-kosár fragmentumát más bővítménynek meghagyjuk; a Layero-panel saját fragmentumot használ. Az Escape, fókusz-visszaadás és csökkentett mozgás megmarad.

## Ellenőrzés

- 31 új valódi WordPress-próba: kupon, hibás nonce/adat, 15 RON-os díj ismétlés nélkül, adóval együtt számított összeg, natív rendelési díj mentése, szállítási zóna és kuponküszöb, törlés és üres kosár.
- 27 meglévő kosárfelület-/profilpróba, 70 elkülönített kereskedelmi ellenőrzés, 5 szinkronteszt; érintett PHP és JavaScript szintaxis rendben.
- Böngészőben: variáció és személyre szabás (a `0` értékkel), mennyiség, kupon, csomagolás, újratöltés, Escape és visszaadott fókusz, valódi pénztári egyezés. Példa: 2 × 90 − 18 + 20 + 15 = 197 RON, a panelen és a pénztárnál is.
- 1440 × 1000, 390 × 844 és 320 × 568 nézet. Kis képernyőn a pénztárgomb görgetéssel elérhető, nincs vízszintes túlcsordulás. Hibás kupon, kupon- és csomagolástörlés, utolsó termék törlése és üres állapot újratöltése is ellenőrizve.
- A fiktív rendelési díj tesztje az elkülönített helyi adatbázisban futott; a tesztrendelés és az ideiglenes adó-/szállítási szabályok törlődnek. Fizetés és e-mail nem indult.

Parancs: `php -d memory_limit=512M -d xdebug.mode=off output/wp-test/wp-cli.phar eval-file layero_shop_00_2026/tests/cart-drawer-wordpress.php --path=output/wp-test/wordpress` (a webshop gyökeréből).

Ez a kiadás kizárólag a WordPress kereskedelmi felületét módosítja. Nem frissíti a teljes statikus fájltükröt vagy a termékadatokat. Az online telepítés eredménye a gyökérprojekt `docs/KOSARPANEL-2026-09-30.md` feljegyzésében szerepel.
