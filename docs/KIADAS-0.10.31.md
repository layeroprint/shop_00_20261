# 0.10.31 — célzott sebességjavítás, 2026-10-01

- A kezdőoldal rejtett hero-diáinak hét valódi képe és a hozzájuk tartozó picture-források csak a dia kiválasztásakor töltődnek. Az első lámpa-összehasonlító azonnal betölt, a közös gridméretezés és mind az öt dia megmarad. A mobil továbbra is a külön mobilkompozíciót választja.
- A statikus és WordPress termékszalag nem futtat animációs képkockákat képernyőn kívül, rejtett böngészőfülön vagy szüneteltetve. Visszatéréskor nincs nagy időugrás.
- A WordPress a már előállított WooCommerce-katalógust használja közvetlenül; a helyi demókatalógus JavaScript-fájlja nem töltődik le előtte. A teljes leírások, képek, árak, besorolások és vásárlási céloldalak megmaradnak.
- A bejelentkezett kedvencek nem küldenek külön egyesítési kérést, ha a helyi lista egyezik a szerver által már átadott listával. Eltérő helyi tételeknél az egyesítés továbbra is lefut.

Ellenőrzés: JS/PHP-szintaxis, öt szinkronteszt, 70 elkülönített kereskedelmi ellenőrzés, a frissített hero-regresszió és az új `tests/performance-wordpress.php` a külön helyi WordPressben. HTTP-s statikus és WordPress bannerpróba asztalon és 390 px-en, mobilkép, billentyűzetes lapozás, változatlan bannermagasság, konzolhiba nélkül.

A szinkron csak a közös JavaScriptet és HTML-tükröt érintette; mentése: `.layero-sync-backups/wp-static/2026-10-01T11-21-46-952Z-dGoEhI/`. A korábbi termékadat- és képelérések eltérései, illetve a párhuzamos tipográfiai CSS-módosítások nem részei ennek a kiadásnak.

Az éles mérések bejelentkezett Chrome-ban, kiiktatott böngésző-gyorsítótárral készülnek. Nem PageSpeed-pontszámok és nem valódi látogatói Core Web Vitals adatok. A nyilvános webhely karbantartási állapota külön kezelendő. A részletes eredmény a szülő webshop `docs/SEBESSEG-2026-10-01.md` dokumentumába kerül.
# Éles visszamérés során javított kompatibilitás

A WordPress 7.1.2 HTML-feldolgozója a `set_attribute('src', 'data:…')` hívást elutasítja, így az első kiadásban az eredeti képcím megmaradt. A késleltetett képeknél ezért a `src` és `srcset` attribútumot eltávolítjuk; a választott dia JavaScriptje állítja vissza a valódi címet. A regressziós próba most a ténylegesen letölthető forrás hiányát is ellenőrzi. A helyi asztali és mobilos WordPress-próba sikeres, a kiválasztott kép betöltődik, a közös magasság megmarad.
