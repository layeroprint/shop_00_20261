# 0.10.21 – Hírlevélblokk arculati áttervezése

2026-09-30. A felhasználó képernyőképe alapján a főoldali hírlevélblokk új megjelenést kapott: éjkék alap, arany címkiemelés, cián ikonok és gomb, finom rétegvonalak, elkülönített feliratkozási panel. Mobilon egymás alá kerül a szöveg és az űrlap.

A módosítás a `Subscriptions::render_banner()` HTML-jét, a hozzá tartozó bővítmény-CSS-t és az Elementor hírlevélwidget stílusválasztóit érinti. Az új `lyr-mailclub` osztályok nem ütköznek a korábbi `lyr-newsletter` komponenssel. A feliratkozási végpont, külön hozzájárulás, megerősítés és levélküldés változatlan. Az indulási értesítő HU/RO megjelenését a külön CSS-hatókör megőrzi. A statikus generált tükör nem módosult.

Ellenőrzés: PHP lint a három érintett PHP-fájlon; valódi helyi WordPress HTTP-oldal 1440 × 1000 és 390 × 844 nézetben, valamint 320 pixeles szélességpróba. Nincs vízszintes túlcsordulás; az e-mail és a hozzájárulás továbbra is kötelező; Tab billentyűvel a gomb fókusza látható. A lekért konzolhibák listája üres. A dizájnpróba nem küldött levelet.
