# Termékkezelő → WooCommerce adatátadás

A forrás a külön Layero Product Management. A statikus fájlszinkron csak UI-fájlokat másol; nem WooCommerce-termékimport.

## Személyre szabás

WooCommerce CSV-oszlop: `Meta: _layero_personalization_fields`. Értéke JSON, például:

```json
[
  {"id":"name","label":"Név","type":"text","required":1,"maxlength":40},
  {"id":"number","label":"Szám","type":"number","required":1},
  {"id":"color","label":"Szín","type":"select","required":1,"options":["Fehér","Fekete"]}
]
```

- `label` vagy `field_label`; `type` vagy `field_type`; opcionálisan `placeholder`, `maxlength`, `id`.
- Típusok: `text`, `textarea`, `number`, `select`, `checkbox`. Legfeljebb 20 mező. Alapértelmezett hossz 100, textarea esetén 1000; maximum 1000 karakter.
- `required`: 0/1 vagy logikai érték. Az `options` egyszerű szövegek tömbje; a termékkezelő által tárolt JSON-tömbsztring is olvasható. Összetett opcióobjektum nincs támogatva.
- Hiányzó `id` esetén `field_0`, `field_1` stb. készül. Célszerű stabil azonosítót exportálni.
- `[]`: nincs mező. Hiányzó/üres meta: régi felirat/megjegyzés csak kifejezett `yes`/`1` személyre szabhatósági jelölés esetén. A két állapot eltér.
- `Meta: _layero_personalizable`: `yes`/`1`, illetve `no`/`0`. A kifejezett tiltás felülírja a sémát. Automatikus beállításnál a nem üres séma személyre szabhatóvá teszi a terméket.
- Kategória vagy terméktípus alapján nem kapcsolunk be személyre szabást. Jelölés és mezőséma nélkül a normál WooCommerce vásárlási gomb jelenik meg: egyszerű, megvásárolható terméknél kosárba adás, változó terméknél változatválasztás.
- Hibás séma vagy hiányzó kötelező adat nem rendelhető meg. Az opcionális numerikus `0` megmarad. A mezők nem módosítanak árat; eltérő ár/készlet WooCommerce-variációval kezelendő.
- A séma a változó termék szülőjén legyen; a jelenlegi klasszikus termékűrlap ezt jeleníti meg. Variációnként eltérő mezők dinamikus UI-ja külön fejlesztés.
- A WooCommerce termékszerkesztő **Layero megjelenés** paneljén ellenőrizhető/szerkeszthető a JSON. Hibás admin-mentésnél a korábbi beállítás megmarad. A későbbi import ezt felülírhatja.

## Előrefizetés és ismételt import

`Meta: _layero_requires_prepayment` = `1`: a beépített `cod` utánvét tiltása. Kikapcsoláskor **`0` értéket exportálj**, ne hagyd ki a mezőt: a kihagyás ismételt importnál meghagyhatja a régi jelölést. A szülő termék tiltását egy variáció nem oldja fel.

Ugyanezt az explicit törlés/kikapcsolás elvet alkalmazd más jelöléseknél is. `_layero_non_returnable` jogi szövegeket nem helyettesít; a plugin nem igazol jogi megfelelést.

Az árak RON-ban értendők; nincs automatikus deviza- vagy alegység-konverzió. Importálás előtt SKU-alapú egyeztetés, utána néhány ismert termék adatainak, sémáinak és false-ra visszaállított jelöléseinek ellenőrzése szükséges. Az éles importot adatbázismentés előzze meg.
