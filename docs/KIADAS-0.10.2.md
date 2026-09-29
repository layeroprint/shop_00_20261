# 0.10.2 — termékbannerek és vágatlan kiemelések

**Leváltott helyi terv:** a bannerelrendezést a felhasználó új irányba kérte. A 0.10.3 életképes bannerei váltják; a képvágás javítása megmarad. A 0.10.2 nem került GitHubra.

2026-09-29. Helyi kiadási jelölt; GitHubra még nincs feltöltve, éles környezetben még nincs ellenőrizve.

## Változások

- Három új hero-kompozíció a meglévő Camino figura, Hullám lámpa, tulipánváza és karácsonyi kedvenc-lámpa fotói alapján. ImageGen marketingillusztrációk; a katalógus eredeti fotói változatlanok.
- Asztalon külön szöveg- és képoszlop, mobilon a szöveg alatt teljes kép. Az ismert régi alapképek automatikusan az új bannerre váltanak; az egyedi Elementor-képek és szövegek megmaradnak.
- A Product Spotlight vágatlan eredeti képarányt és WordPress reszponzív képváltozatokat használ. A keret 4:5, legfeljebb 420 px széles; a kép teljes egészében belefér, fekvő képnél is.
- Célzott képstílus az Elementor általános képmagasság-szabályának kivédésére. A további hero-termékfotók szintén vágás nélkül jelennek meg.
- A mobilos lapozó a tartalomhoz igazodó magasságot kapott. A belső fókuszgörgetés okozta szövegeltűnés javítva; az inaktív diák rejtettek.
- Verzió- és CSS cache-kulcs frissítve; a statikus tükör újragenerálva.

## Helyi ellenőrzés

- PHP-szintaxis: Hero_Slider.php, Product_Spotlight.php, layero-shop-ui.php.
- Izolált WordPress/WooCommerce/Elementor: 11 sikeres megjelenítési feltétel, a három banner és négy kiemelt kép eredeti képaránya, egyedi beállítások megőrzése.
- Chrome, 1440×1000 és 390×844: mind a hét dia, teljes termékfotók, nincs vízszintes kilógás; helyes termékoldal a gomb után, hibamentes böngészőnapló.
- Statikus HTTP-előnézet ugyanezeken a szélességeken, normál animációval; részletes WordPress-próba csökkentett mozgással.
- A képek forrásai és generálási promptjai a külön statikus forrásrepó docs/TERMEK-BANNEREK.md dokumentumában vannak.

## Későbbi telepítés

A meglévő GitHub main ágba történő feltöltés után a cPanelben az aktív /home2/layeroro/shop/wp-content/plugins/layero_plugins tárolón az Update from Remote elegendő. A jelenlegi .cpanel.yml másik mappára mutat, ezért itt a Deploy HEAD Commit nem a használt frissítési lépés.

Telepítés után ellenőrizendő: 0.10.2 pluginverzió, friss Elementor/oldal-cache, az élő főoldal saját hero-beállításai, asztali és mobil termékképek. Ez a kiadás nem módosít árakat vagy WooCommerce-termékadatokat.
