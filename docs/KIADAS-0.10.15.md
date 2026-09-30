# 0.10.15 — helyi webshopváltozások GitHub-kiadása

2026-09-30. A kiadás alapja a `layeroprint/shop_00_20261` távoli `main` ágának `82c380b` commitja.

## Tartalom

- Átdolgozott céges oldal, háromképes nagyítható galéria és négy új bemutatókép.
- Új egyedi rendelési oldal, inspirációs választók, akadálymentes űrlapellenőrzés és ötletmásolás.
- Négylépéses ajándékkereső, megőrzött válaszokkal és szigorú árkeretszűréssel.
- A meglévő helyi PHP-módosítások: CSV-jelvényimport, kézi/automatikus jelvénymód, teljesítési jelzések, elsődleges webshop-kategória és a személyre szabhatóság pontosítása. A kategória önmagában nem kapcsol be személyre szabást.
- Frissített statikus fájltükör és 0.10.15 verzióval frissített WordPress-erőforrások.

## Ellenőrzés

- `node --check` a statikus és a generált webshopkódon; PHP-szintaxisellenőrzés minden változott PHP-fájlon: sikeres.
- Öt szinkronteszt és 70 elkülönített kereskedelmi ellenőrzés: sikeres.
- `node tools/sync-static.js --check`: 375 ellenőrzött fájl, 0 eltérés. A szinkron előzetes próba és automatikus mentés után futott.
- Helyi HTTP-s cégesoldal-próba: 320, 768 és 1440 px képernyőképek; asztali galériaváltás és bezárás; asztali és 390 px mobil ajánlatkérő-előválasztás és görgetés. Nincs ismételt HTML-azonosító, hibás belső horgony vagy JavaScript-kivétel.
- A főoldal és az egyedi rendelési oldal betöltési próbája sikeres. A böngésző egy hiányzó helyi `/favicon.ico` kérést jelzett; ez nem a webshop JavaScript-hibája.
- 1440 és 390 px szélességen az ajándékkereső négy lépése és újratöltés után megőrzött eredménye ellenőrizve. Az egyedi ajánlatkérő üresmező-ellenőrzése, fiktív adatos kitöltése és adatmegőrzése sikeres; nem indult POST-kérés. Egyik oldalon sem volt vízszintes túlcsordulás vagy JavaScript-kivétel.

Az ellenőrzési képek és segédek a gyökérrepo ignorált `output/playwright/release015-*` fájljai. Nem részei a kiadásnak.

## Online átvétel és határok

Cél: a `layeroprint/shop_00_20261` GitHub-repó `main` ága. A cPanel aktív `layero_plugins` Git-mappájában a **Pull or Deploy → Update from Remote** veszi át a változásokat. A korábban ellenőrzött közvetlen telepítésnél **Deploy HEAD Commit nem szükséges**. Frissítés után ellenőrizendő a 0.10.15 pluginverzió, a megváltozott oldalak és az online ajánlatküldés; szükség szerint ürítendő a gyorsítótár.

Ebben a feladatban nincs éles WordPress-telepítés, valódi ajánlatküldés, levélkézbesítési próba vagy WooCommerce-termékimport. Az új importkód felkerül, de ettől a termékkezelő és a WooCommerce adatai nem változnak. A PHP-próba elkülönített ellenőrzés; nem igazolja az új CSV-import éles lefutását.
