# Layero Shop UI for Elementor + WooCommerce

WordPress plugin a Layero shop aktuális frontendjének Elementor + WooCommerce újraépítéséhez.

A cél: a design, a widgetek, a hero slider, a kategóriák és a Layero élmény a pluginből jöjjön, de a webshop motorja WooCommerce maradjon: termékek, árak, kosár, checkout, fizetés, kuponok, rendelések.

## Aktuális shop szinkron

Aktuális helyi verzió: **0.10.30**, [a magyar és román karbantartási oldal olvashatósági javítása](docs/KIADAS-0.10.30.md). Tartalmazza a [0.10.29 új vektoros logóját és ikonjait](docs/KIADAS-0.10.29.md), a [0.10.28 olvasható tipográfiáját](docs/KIADAS-0.10.28.md), a [0.10.27 könnyebben olvasható termékleírását](docs/KIADAS-0.10.27.md), a [0.10.26 tíz lapozható főoldali véleményét](docs/KIADAS-0.10.26.md), a [0.10.25 Origin-modal javítását](docs/KIADAS-0.10.25.md), a [0.10.23 személyre szabási jelvényét](docs/KIADAS-0.10.23.md), a [0.10.22 képen belüli jelvényeit](docs/KIADAS-0.10.22.md), a [0.10.21 hírlevéldizájnját](docs/KIADAS-0.10.21.md), a [0.10.20 feliratkozási és auditjavításait](docs/KIADAS-0.10.20.md), valamint a [0.10.19 WooCommerce kosárpaneljét](docs/KIADAS-0.10.19.md) kuponokkal és 15 RON-os ajándékcsomagolással. A jogi dokumentumok cégadatait a felhasználó később adja meg; az éles telepítés és ellenőrzés állapotát a kiadási leírások rögzítik.

Helyi kiadási jelölt: **0.10.0**. [Javítások, tesztek és cPanel-frissítés](docs/KIADAS-0.10.0.md). A Windows sortöréshiba javítva, az Origin teljes futási csomagja és WordPress-regisztrációja elkészült.

A statikus tükör (css/js/data/oldalak/képek) egyetlen paranccsal frissíthető a
lokális shopból:

```text
node tools/sync-static.js --dry-run
node tools/sync-static.js
node tools/sync-static.js --check
```

A `--dry-run` nem ír fájlt. A `--check` eltérésnél 1-es kilépési kódot ad. A rendes futás a teljes forrást ellenőrzi, majd csak az eltéréseket írja ki; a felülírt fájlokat a webshop gyökerében levő `.layero-sync-backups/wp-static/` mappába menti. Hibás horgony, hiányzó erőforrás vagy JavaScript-szintaxis esetén az előzetes ellenőrzés leállítja a frissítést. Írási hibánál visszaállítást kísérel meg; kényszerített megszakítás ellen a megőrzött mentés használható.

A `commerce: 'woocommerce'` WordPress-beállítás mellett a statikus tükör vásárlási gombja a termék valódi WooCommerce-oldalára vezet. A statikus kosár nem kap új tételeket ebből az útvonalból. A „Layero statikus oldal” kosár/pénztár választása a WooCommerce shortcode-ját jeleníti meg. A kereső, a kiemelt termékek és a kategóriaszámok WooCommerce-adatot kapnak. A fájltükör nem termékimport.

A plugin jelenleg a statikus shop alábbi tartalmaira épül:

- a teljes lokális `shop.css` / `shop.js` / `shop-data.js` tükre (`assets/css/layero-static-shop.css`, `assets/js/layero-static-shop.js` + WP URL-adapter, `assets/js/layero-static-data.js`)
- 16 statikus oldal tükre az `assets/static` alatt (főoldal, cégeknek, egyedi rendelés, kategória, termék, rólunk, GYIK, kapcsolat, kvíz, kosár, pénztár, fiók, kedvencek, 404, ÁSZF, adatvédelem)
- 8 kategória: `lampak`, `kulcstartok`, `dekoraciok`, `szezonalis`, `rajongoi`, `baba-gyerek`, `ceges`, `egyedi`
- 25 Layero termék demó/fallback adata
- népszerű termék sorrend és újdonság válogatás
- kiemelt-termék rotáció fallback: `karacsonyi-lampa` (A hónap terméke) + `szam-lampa-nevvel` + `jurassic-lampa` + `holdfeny-lampa`
- „Kinek keresed?" ikonos pillek, 5 pontos duotone bizalmi sáv (Helyi gyártás — Szatmárnémetiben készül ponttal), érték-marquee, folyamatlépések, ajándékkereső CTA, letisztult összehasonlító kártya (kiemelt Layero-oszloppal), vélemények, egyedi rendelés CTA és shop-bizalom
- a hivatkozott demo képek a pluginben: `assets/demo`

## Elementor widgetek

Az Elementor szerkesztőben a `Layero Shop` kategória alatt:

- `Layero főoldali slider`
- `Layero „Kinek keresed?" sáv`
- `Layero bizalmi sáv`
- `Layero érték-marquee`
- `Layero kategóriák`
- `Layero folyamat lépések`
- `Layero termékrács`
- `Layero ajándékkereső CTA`
- `Layero kiemelt termék` (több terméknél auto-váltó slider, származás-chippel)
- `Layero termék-körhinta` (folyamatos marquee-görgetéssel)
- `Layero összehasonlító blokk`
- `Layero vélemények`
- `Layero galéria csík`
- `Layero egyedi rendelés CTA`
- `Layero céges hero`
- `Layero céges megoldások`
- `Layero céges esettanulmány és számok`
- `Layero céges ajánlatkérő`
- `Layero egyedi rendelés hero`
- `Layero egyedi rendelés referenciák`
- `Layero egyedi rendelés árak`
- `Layero egyedi rendelés vélemény`
- `Layero egyedi rendelés ajánlatkérő`
- `Layero Shop bizalom ikonok`
- `Layero hírlevél banner`
- `Layero lábjegyzetek`
- `Layero statikus oldal` (a lokális oldalak 1:1 tükre)
- `Layero profil irányítópult`
- `Layero profil navigáció`
- `Layero rendelési előzmények`
- `Layero kedvenc termékek`
- `Layero fiók és címek`

## Vásárlói fiók

A profilmodul a WooCommerce saját ügyfél-, rendelés-, cím- és jogosultságkezelését használja, így HPOS-kompatibilis. A kedvencek bejelentkezett vásárlóknál user metában tárolódnak, vendégeknél a böngészőben maradnak, majd belépéskor automatikusan egyesülnek a fiók kedvenceivel.

A WooCommerce `Fiókom` navigáció új `Kedvencek` végpontot kap. A meglévő rendelés-, letöltés-, cím-, fizetési mód- és profiloldalak továbbra is a WooCommerce ellenőrzött űrlapjait használják.

Elérhető shortcode-ok:

```text
[layero_account]
[layero_account_dashboard]
[layero_account_navigation]
[layero_order_history limit="10"]
[layero_favorites]
[layero_account_details]
```

## WooCommerce integráció

A termékkártyákon és termékoldalakon a készletállapot, készletdarabszám és gyártási idő megjelenítése ki van kapcsolva. Az aktív bővítmény a WooCommerce mennyiségi készletkezelését is kikapcsolja: nincs készletből számított maximum vagy rendelési készletlevonás. A meglévő termékadatok megmaradnak. Ellenőrzés: `tests/stock-policy-wordpress.php` a külön helyi tesztadatbázisban.

A termékkezelő CSV-jében már létező `Meta: _layero_requires_prepayment` (`1`) jelölést a `Payment_Rules` kezeli: utánvét (`cod`) letiltása egyszerű és variációs terméknél, vegyes kosárnál, valamint későbbi rendelésfizetésnél. A szülő jelölése variációknál is érvényes. A szabály a rendelési tételbe is elmentődik. A klasszikus pénztár és Store API szerveroldali védelmet kapott; a blokkos felület és külső fizetési bővítmények működését futó WordPress alatt még ellenőrizni kell. Más, egyedi utánvétes fizetési azonosítók jelenleg nem tartoznak a tiltáshoz.

A személyre szabható termékek Layero-kártyája és natív listagombja a termékoldalra vezet. A szerver ellenőrzi a termékenkénti mezőket, majd a WooCommerce-kosárba és rendeléstételbe menti őket. A séma nélküli korábbi termékek feliratot vagy megjegyzést kérnek; általános méret/szín választó nincs. [Mezőséma és import](docs/TERMEKADAT-SZERZODES.md).

A kapcsolati, céges és egyedi űrlap megkeresést ment a WordPress **Layero megkeresések** menüjébe. Az e-mail-értesítés hibája nem törli a mentést. Hírlevélszolgáltató bekötéséig nincs feliratkozás vagy kuponígéret.

## Online építés menete

1. A WooCommerce-ben hozd létre a kategóriákat a fenti slugokkal.
2. A termékek slugjai lehetőleg egyezzenek a statikus shop `shop-data.js` id mezőivel.
3. Tölts fel rendes WooCommerce termékképeket.
4. Elementorral rakd össze az oldalt a Layero widgetekből.
5. Aktív WooCommerce mellett a termék-widgetek a WooCommerce kínálatát jelenítik meg; üres találatot nem pótolnak demótermékkel. A dizájnhoz használt kategória- és dekorációs képek továbbra is az `assets/demo` mappából jönnek.

## Helyi ellenőrzések

```text
node --test tests/sync-static.test.js
php -d xdebug.mode=off tests/commerce.php
```

A PHP-teszt WordPress-helyettesítő objektumokkal fut, nem küld rendelést, e-mailt vagy fizetést. Nem helyettesíti a WooCommerce-ben végzett teljes rendelési próbát. A Node-tesztek a szülő webshop `output/sync-tests/` mappáját használják ideiglenes fájlokhoz.

A valódi WordPress-integrációs próbák külön helyi adatbázist igényelnek. [Tesztkörnyezet és parancsok](tests/README.md).

## Remote

```text
https://github.com/layeroprint/shop_00_20261.git
```
