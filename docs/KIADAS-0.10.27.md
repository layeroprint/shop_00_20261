# 0.10.27 — Könnyebben olvasható termékleírás

2026-10-01. A termékoldal hosszú leírása áttekinthető, kétoszlopos elrendezést kapott. A bevezető, a fontos tudnivalók és a specifikáció mindig láthatók. A részletes témák és a magyar/román ápolási útmutató külön lenyithatók, egyenként vagy egyszerre. Mobilon a blokkok egymás alatt jelennek meg.

Az átrendezés a meglévő DOM-elemeket használja: a WooCommerce-ben tárolt szöveg, a termékadatok, a hivatkozások és a táblázatok megmaradnak. JavaScript nélkül a teljes leírás olvasható. A rövid leírások nem kapnak felesleges lenyitást. Enter/szóköz nyit, Escape zár és visszaadja a fókuszt. A nyomtatás megnyitja az összes témát, utána visszaáll az előző állapot.

A közös CSS/JS a gyökér `shop.css` és `shop.js` forrásából, a szinkroneszköz mentést készítő eljárásával frissült. A kiadás nem tartalmazza a helyi termékadatok, képek vagy más statikus oldalak függőben levő módosításait. A pluginverzió és a közös JavaScript gyorsítótár-azonosítója frissült.

Ellenőrzés: a korábban exportált 70 termékleírás 1317 tartalmi elemének és az ismételt inicializálás eredményének megőrzése; helyi WordPress BMW-próbatermék 320, 390, 768 és 1440 px-en; egyenkénti és közös lenyitás, billentyűzet, közvetlen hivatkozás, termékfülek, JavaScript nélküli tartalom és nyomtatási állapot. Öt szinkronpróba, 70 elkülönített kereskedelmi ellenőrzés, JavaScript- és PHP-szintaxisellenőrzés sikeres.

Éles átvétel: GitHub `layeroprint/shop_00_20261` `main` → cPanel aktív `layero_plugins` tároló → **Update from Remote**. Külön Deploy HEAD Commit nem szükséges. Az előző kiadási pont `345bd4634e0fa3f13e4622e08abf02d292bd7f89` (0.10.26). A telepítés utáni eredményt a főprojekt `docs/TERMEKLEIRAS-OLVASHATOSAG-2026-10-01.md` fájlja rögzíti.
