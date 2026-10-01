# 0.10.28 — Olvasható tipográfia és mobilos UX

2026-10-01. A korábbi 8–13 px-es olvasandó feliratok legalább 14 px-esek; a fontos vezérlők jellemzően 15 px, a törzsszöveg és beviteli mezők 16 px. A termékoldali fizetési magyarázat, műhely/ajándék/kapcsolat előnysáv és ajánlatkérés külön javítást kapott. A nagyobb betűkhöz igazodik a fejléc, a kártyák, a mobilos katalógus, a kosár/pénztár, a hírlevél, az űrlapok, a sütikezelő és az Origin-panel tördelése. A halvány szöveg- és kiemelőszínek sötétebbek. A fő vezérlők legalább 44 px magasak.

A közös CSS, vélemény-, jelvény- és Origin-stílusok a gyökérforrás célzott, mentést készítő szinkronjával frissültek. Az online/WooCommerce/fiókstílusok a plugin saját forrásában módosultak. A jelvény CSS-verziója a pluginverziót követi. A kiadás nem tartalmazza a gyökérprojekt függőben levő termékadat-, kép-, JavaScript- és HTML-tartalomváltozásait. Nincs termékimport vagy rendelési/fizetési működésváltozás.

Ellenőrzés: 16 helyi statikus oldal HTTP-n, asztali és mobilos nézetek; stabil 768 és 1440 px-en nincs 14 px alatti olvasandó felirat vagy oldal-túlcsordulás. 320 px-es kosár, mobilos süti- és Origin-panel, Escape bezárás; helyi WordPress személyre szabható termékmezők. Öt szinkronpróba, 70 elkülönített kereskedelmi ellenőrzés, PHP-szintaxis sikeres. Ezek nem helyettesítik a futó WooCommerce rendelési próbáját.

Éles átvétel: `layeroprint/shop_00_20261` `main` → cPanel aktív `layero_plugins` tároló → **Update from Remote**. Külön Deploy HEAD Commit nem szükséges. Az előző kiadási pont `d0e2ad6068ce3ddd22691dd95004fa5bc5b98a52` (0.10.27). A telepítés utáni eredményt a főprojekt `docs/TIPOGRAFIA-UX-2026-10-01.md` fájlja rögzíti.
