# 0.10.12 — főoldali WooCommerce termékkártyák

2026-09-29. A főoldal „Népszerű termékek” blokkja a helyi `index.html` nyolc termékének sorrendjét követi, amennyiben ezek a WooCommerce-ben publikált és látható termékek. Hiányzó terméket a meglévő WooCommerce-válogatásból pótol; a kártyákon továbbra is a WooCommerce neve, képe, ára és valódi termékoldala szerepel. A katalógus és a kedvencek terméksorrendje nem változik.

A főoldali kártyák név–kategória–ár sorrendet, egymásra helyezett akció-/termékjelöléseket, a fotón személyre szabási jelölést és a helyi felülethez igazított gombot kapnak. A szív asztalon rámutatásra vagy billentyűzetes fókuszra jelenik meg, érintős nézetben látható marad. Mobilon két oszlop van. A személyre szabható termék gombja továbbra is a WooCommerce-termékoldalra vezet.

Érintett fájlok: `includes/Widgets/Product_Grid.php`, `includes/Helpers.php`, `assets/css/layero-online.css`, `layero-shop-ui.php`. A statikus tükör és a termékkezelő adatai nem változtak. A verzióemelés frissíti a CSS gyorsítótárkulcsát.

Ellenőrzés: PHP-szintaxis, elkülönített kereskedelmi próbák, asztali és 390 px széles HTTP-s megjelenési próba, mobil gomb és böngészőhibák ellenőrzése. Az élő WooCommerce-adatokat és a cPanel-frissítés eredményét a telepítés után kell külön igazolni.
