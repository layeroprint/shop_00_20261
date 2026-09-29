# 0.10.7 — azonos hero-magasság minden dián

2026-09-29. Az első két eredeti és a három életképes dia eltérő magasságot adott: Full HD-n 720-ról 880 pixelre ugrott a hero. Most mindegyik ugyanabban a CSS-grid cellában vesz részt a méretezésben. Az aktív állapot csak a láthatóságot változtatja; a közös minimum és a legtöbb helyet igénylő tartalom határozza meg az öt dia magasságát. Nem fix magassággal vágjuk le a mobilos tartalmat.

- Az életképes összeállítás minimuma már nem az aktív dia típusától függ. A telefonos/tabletes szabályok is a teljes összeállításra vonatkoznak.
- Az eredeti rajongói dia asztalon függőlegesen középre rendezett; a mobilos sorrend megmarad.
- A képválasztás, az elmosott széles háttér, az öt dia sorrendje és szövege változatlan.
- Forrás: a gyökér `shop.css`; a plugin CSS/HTML tükre a szinkronnal készül. Cache-kulcs: `20260929-hero-height`. Nincs új JavaScript.

Helyi HTTP-böngészőpróba: mind az öt dia egyező magasságot adott 320×740, 390×844, 768×1024, 1366×768, 1920×1080 és 3440×1440 nézetben. Az alattuk következő tartalom relatív pozíciója végig azonos; a gombok elférnek, nincs vízszintes túlcsordulás. Az ultraszéles fotóhátterek szándékosan túlnyúlnak a maszkolt kereten az elmosás széleinek kitöltéséhez.

Telepítés: a cPanel aktív `layero_plugins` repójában **Update from Remote**. Deploy HEAD Commit nem szükséges. A korábban kikapcsolt WPCode 2084/2086 kódrészletek maradjanak inaktívak.
