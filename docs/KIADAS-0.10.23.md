# 0.10.23 – Egyetlen alsó személyre szabási jelvény

2026-09-30. A felhasználó az online főoldalon az elefántos lámpánál felső világoskék és alsó sötét személyre szabási jelvényt is látott. A főoldali WordPress-stílus nagyobb specifikussága felülírta a 0.10.22 alsó jelvényt elrejtő szabályát.

A felső személyre szabási jelvény kikerült a generált felső jelvénylistából. A képen egyetlen alsó sötét, csillagos jelölés jelenik meg. A renderelő a régi személyre szabási jelölőket eltávolítja, majd a feloldott konfigurációból egyszer állítja elő az alsó jelvényt; az üres konfiguráció üres marad. Az ismételt inicializálás nem duplikálja sem a jelvényt, sem a díszítő csillagot. Az akció/Bestseller/egyéb jelvények továbbra is a képen belül működnek. Termékadat és ár nem módosult.

Ellenőrzés: helyi HTTP-n az elefántos kártya a tényleges WordPress-főoldali külső osztályokkal és betöltött plugin-CSS-ekkel, 1440/390/320 px szélességen. A felső személyre szabási jelvény hiányzik; egyetlen látható alsó jelvény marad a kép határain belül. Ismételt inicializálás, régi jelölőből átvétel, üres konfiguráció és más jelvénytípusok megtartása ellenőrizve. Statikus főoldal és kategória is ellenőrizve. 20 meglévő jelvénymotor-próba és 5 szinkronpróba sikeres; JS/PHP-szintaxis és eltérésmentes fájltükör ellenőrizve. Képek: a webshop `output/playwright/badge-bottom-*` fájljai. Ez helyi DOM/CSS-próba; élő WordPressben újraellenőrzés telepítés után szükséges.

Online átvétel: `layeroprint/shop_00_20261` → `main`; cPanel aktív `layero_plugins` tároló → **Update from Remote**, szükség esetén Elementor **Clear Files & Data** és oldalgyorsítótár-ürítés. Az éles telepítést a felhasználó végzi.
