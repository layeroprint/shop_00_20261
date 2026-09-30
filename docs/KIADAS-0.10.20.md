# 0.10.20 – Online audit javításai

Állapot: 2026-09-30, helyben ellenőrzött és online telepített kiadás. Az aktív cPanel-mappa Update from Remote művelete a `c882a38e21d50f6529408d1fac2dadedb63303e7` commitot igazolta; a weboldalon a 0.10.20 erőforrások futnak.

Online utóellenőrzés: vendégként is elérhető ÁSZF/adatvédelem, aktív elállási űrlap, indulási feliratkozó; bejelentkezett főoldalon hírlevélűrlap. Mobilon nincs vízszintes túlcsordulás. A Stitch lámpa mellett csak lámpák szerepeltek. A lekért konzolhibák listája üres, a korábbi font/CORS-hiba vendégként sem jelentkezett. A feliratkozói adminlista elérhető. Az éles postafiókba kézbesítés próbája még hátravan; tesztlevelet külön engedély nélkül nem küldtünk.

## Változások

- Valódi magyar/román feliratkozás: külön indulási és hírlevélcél, kötelező önkéntes jelölés, 72 órás e-mailes megerősítés, leiratkozás, privát adminlista, adatvédelmi export/törlés. Csak a megerősített rekordok használhatók. A link megnyitása önmagában nem aktivál és nem töröl. Megerősített rekordok legfeljebb 365 napig; napi takarítás. Ez feliratkozáskezelés, tömeges kampányküldő nincs beépítve.
- Levélküldési és tárolási hiba nem ad hamis sikerjelzést. A böngésző friss nonce-ot kér és időkorlátot használ. A megerősítés műveleti zárral védett; a tárolt tokenek hash-ek.
- Indulási értesítő a két Coming Soon widgetben; hírlevél a főoldal végén. A régi demó-sikervisszajelzés és kuponígéret kikerült.
- Átdolgozott ÁSZF és adatvédelem a statikus forrásból. A felhasználó a hiányzó cég- és szolgáltatói adatok megadását későbbre halasztotta; a dokumentumok véglegesítés alatt jelölést viselnek. Nem állítunk jogi jóváhagyást vagy teljes megfelelőséget.
- Online elállási űrlap az ÁSZF-ben, lábléclinkkel, fiók nélkül. A nyilatkozat privát megkeresésként mentődik, átvételi időponttal. Az ügyfélnek e-mail és letölthető szöveges igazolás készül; levélhibánál a mentés megmarad és a felület ezt pontosan jelzi. A művelet nem módosít automatikusan rendelést és nem indít visszatérítést.
- A jogi oldalak kivételt kapnak az Elementor/WooCommerce indulási képernyője alól. Más oldalak nem válnak emiatt nyilvánossá.
- Hasonló termékeknél a termékcsalád előnyt kap; lámpák mellé nem kerülnek pusztán közös ajándéktéma miatt kulcstartók.

## Külön online adat-/beállításjavítások

Ezek nem a plugin frissítésével kerülnek az adatbázisba:

- Babaelefánt és Stitch névtábla: a termékkezelőben és WooCommerce-importtal kötelező névmező; a baba születési adatai opcionálisak. A két soros import csak SKU-t és a négy kapcsolódó metaadatot érintette. Ár/termékleírás nem változott az importban. A termékkezelőben a meglévő személyre szabási üzleti szabályok érvényesülnek.
- Romániai szállítás: 25 RON; 200 RON kedvezmény utáni termékértéktől ingyenes, fizetős mód elrejtve. Online kosárban 100 + 25 = 125, illetve 200 + 0 = 200 RON ellenőrizve. A saját QA névvel hozzáadott tétel eltávolítva.
- Elementor Google Fonts Load: Optional mentés, majd eredeti Swap visszaállítás. Ez a beállításváltozás frissíti a fontgyorsítótárat. Friss főoldalon és vendégnézetben nincs korábbi CORS-betűhiba.
- Fizetési módok: a felhasználó külön kezeli, nem módosultak.

## Ellenőrzés

- `tests/subscriptions-wordpress.php`: 32 valódi WordPress-próba, külső levelezés tiltva.
- `tests/withdrawal-wordpress.php`: 20 próba; mentés, tartós igazolás, e-mail-hiba, jogioldal-kivételek.
- `tests/related-products-wordpress.php`: 7 termékcsalád/láthatóság/sorrend próba.
- `tests/lamp-personalization-wordpress.php`: 36 korábbi próba az importált sémákkal, tényleges helyi rendelésig.
- Meglévő kapcsolati űrlap: 16 próba; izolált kereskedelem: 70; szinkron: 5 próba.
- Módosított PHP-k lintje és érintett JS-ek szintaxisellenőrzése; fájltükör dry-run, mentéses szinkron és check.
- Helyi HTTP-n elállási űrlap és feliratkozás; asztali és 390 × 844 mobilnézet, túlcsordulás és konzol vizsgálata.

A helyi levelezési teszt az alkalmazás működését igazolja, nem az éles postafiókba kézbesítést. Az utóbbihoz a tulajdonosnak a saját címével végig kell mennie a feliratkozáson.

## Jogszabályi források

- [OUG 34/2014, aktuális szöveg](https://legislatie.just.ro/Public/DetaliiDocument/158913), benne a 2026. június 19-től alkalmazandó online elállási funkció.
- [OUG 140/2021](https://legislatie.just.ro/Public/DetaliiDocumentAfis/250044), megfelelőségi jogok.
- [506/2004. törvény](https://legislatie.just.ro/Public/DetaliiDocument/257056), elektronikus közvetlen üzletszerzés.
- [EDPB: érintetti jogok](https://www.edpb.europa.eu/topics/key-gdpr-concepts/data-subject-rights_en), [jogalapok](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en).

## Telepítés

Aktív tároló: `layeroprint/shop_00_20261`, ág: `main`; cPanel könyvtár: `/home2/layeroro/shop/wp-content/plugins/layero_plugins`. Az **Update from Remote** művelet frissíti az aktív példányt. A történelmi `.cpanel.yml` más célkönyvtárat használ, ezért **Deploy HEAD Commit nem szükséges**. Elementor **Clear Files & Data** szükséges, ha az elemgyorsítótár még régi jogi/widget tartalmat ad. Teljes oldal-újraépítés nem kell.
