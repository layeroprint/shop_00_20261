# Layero Shop UI for Elementor + WooCommerce

WordPress plugin a Layero shop aktuális frontendjének Elementor + WooCommerce újraépítéséhez.

A cél: a design, a widgetek, a hero slider, a kategóriák és a Layero élmény a pluginből jöjjön, de a webshop motorja WooCommerce maradjon: termékek, árak, kosár, checkout, fizetés, kuponok, rendelések.

## Aktuális shop szinkron

A statikus tükör (css/js/data/oldalak/képek) egyetlen paranccsal frissíthető a
lokális shopból:

```text
node tools/sync-static.js
```

A plugin jelenleg a statikus shop alábbi tartalmaira épül:

- a teljes lokális `shop.css` / `shop.js` / `shop-data.js` tükre (`assets/css/layero-static-shop.css`, `assets/js/layero-static-shop.js` + WP URL-adapter, `assets/js/layero-static-data.js`)
- 14 statikus oldal tükre az `assets/static` alatt (főoldal, kategória, termék, rólunk, GYIK, kapcsolat, kvíz, kosár, pénztár, fiók, kedvencek, 404, ÁSZF, adatvédelem)
- 8 kategória: `lampak`, `kulcstartok`, `dekoraciok`, `szezonalis`, `rajongoi`, `baba-gyerek`, `ceges`, `egyedi`
- 25 Layero termék demó/fallback adata
- népszerű termék sorrend és újdonság válogatás
- kiemelt-termék rotáció fallback: `karacsonyi-lampa` (A hónap terméke) + `szam-lampa-nevvel` + `jurassic-lampa` + `holdfeny-lampa`
- „Kinek keresed?" ikonos pillek, 5 pontos duotone bizalmi sáv (Helyi gyártás — Szatmárnémetiben készül ponttal), érték-marquee, folyamatlépések, ajándékkereső CTA, letisztult összehasonlító kártya (kiemelt Layero-oszloppal), vélemények, galéria, egyedi rendelés CTA, shop-bizalom, hírlevél és lábjegyzetek
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

A termékoldalon a plugin személyre szabási mezőket ad:

- Felirat / név
- Méret: Kicsi, Közepes, Nagy
- Szín: Natúr, Fekete, Fehér
- Egyedi megjegyzés

Ezek bekerülnek:

- kosár tételadatba
- checkout tételadatba
- rendelési tétel metaadatba

A WooCommerce termék szerkesztőben két Layero kártyamező is elérhető:

- `Layero kártya típus`: felülírja a termékkártyán látható kategóriasort.
- `Layero kártya címkék`: több badge soronként, `Szöveg|stílus` formában. Példák: `Bestseller|best`, `B2B kedvenc|dark`, `Új|new`, `Egyedi|info`. A támogatott stílusok: `best`, `new`, `sale`, `dark`, `accent`, `gold`, `eco`, `coral`, `info`.

Shortcode:

```text
[layero_mini_cart]
```

## Online építés menete

1. A WooCommerce-ben hozd létre a kategóriákat a fenti slugokkal.
2. A termékek slugjai lehetőleg egyezzenek a statikus shop `shop-data.js` id mezőivel.
3. Tölts fel rendes WooCommerce termékképeket.
4. Elementorral rakd össze az oldalt a Layero widgetekből.
5. Amíg nincs minden Woo adat kész, a widgetek a plugin `assets/demo` képeiből és `Shop_Content` fallback adataiból építik fel a látványt.

## Remote

```text
https://github.com/layeroprint/shop_00_20261.git
```
