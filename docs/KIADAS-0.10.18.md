# 0.10.18 – helyi és online felület egységesítése

2026-09-30. A kiinduló online felületen a WooCommerce kosárba helyezte a terméket, de a közös fejléc elrejtette a számlálót, és nem nyitott működő kosárpanelt. A natív kosár/pénztár elrendezése eltért a helyi tervtől.

## Javítások

- Valódi WooCommerce oldalsó kosár: sikeres hozzáadáskor megnyílik, a fejléc darabszámot mutat, törlés és mennyiségváltozás után frissül. Megőrzi a személyre szabási adatokat; billentyűzettel, Escape-pel és mobilon is használható.
- A mennyiségvégpont csak meglévő kosársorra, a látogató saját munkamenetében, ellenőrzött nonce-szal fogad módosítást. Az összegzést, kuponokat, szállítást és fizetést továbbra is a WooCommerce számolja.
- Kosár és pénztár közös Layero tipográfiával, képekkel, mennyiségvezérlőkkel és összesítő kártyával. Mobilon egy oszlop és látható termékképek.
- Gyorsnézet és összehasonlítás a natív termékkártyákon; a gyorsnézet vásárlási gombja a megfelelő valódi termékoldalra vezet.
- Az összehasonlító a WooCommerce publikus jellemzőit, tényleges árformázását és értékelési összesítését használja. A gyorsnézeti kép vágatlanul jelenik meg.
- A kedvencek közös, valós termékazonosítókat használnak a natív és a JavaScriptből készült kártyákon; a fejléc számlálója követi őket.
- Bejelentkezett kedvencmentésnél a felület szerverválaszra vár, közben tiltja az ismételt kattintást, és sikertelen kérésnél hibaüzenetet ad.
- Az ajándékkereső megkapja a termékkezelő explicit `_layero_gift_profile` adatait. Hibás vagy tiltott profilhoz nem talál ki ajánlást.
- A céges ajánlatkérés cég-, telefon-, darabszám- és iránymezője eljut a meglévő szerveroldali feldolgozóhoz.
- Céges/egyedi navigáció a megfelelő ajánlatkérő oldalra vezet.
- A változatkezelő függőség része a szinkronnak és a WordPress betöltési sorrendnek.
- A változatlanul generált Kapcsolat és Rólunk oldal célzott, mentett migrációval a helyi HTML tükörnézetére vált. Módosított tartalmat vagy egyedi elrendezést nem ír felül. Mentés: `_layero_information_backup_0_10_18`; jelző: `_layero_information_revision`.
- A kiadás tartalmazza a korábban elkészült készlet-/határidőjelzés-szabályt, főoldali galériatisztítást és céges galériát is.

## Ellenőrzések

- JavaScript szintaxis; érintett PHP-fájlok szintaxisa; statikus tükör száraz próba és egyezésvizsgálat.
- 5 szinkronteszt, 70 elkülönített kereskedelmi ellenőrzés.
- Helyi WordPress: 27 kosárpanel/profil/termékjellemző, 10 információsoldal-migráció, 27 kereskedelmi, 16 űrlap-ellenőrzés; katalógus-, jelvény-, készletszabály-, főoldal- és GYIK-próbák.
- Böngésző: 1440 és 390 képpontos nézet, kosárba helyezés, panel, darabszám és végösszeg együtt frissülése, személyre szabás, Escape, kedvencek, gyorsnézet, összehasonlítás, pénztár.
- A helyi rendelési teszt fiktív adatokat használt, külső e-mail és HTTP letiltásával. Az éles fizetést és kézbesítést ez nem igazolja.
- A vendég kedvenclista újratöltés után megmarad. A kéttermékes összehasonlító akciós árát és értékelési sorát, mobilos görgetését és Escape-bezárását böngészőben ellenőriztem. A bejelentkezett kedvencmentés böngészős próbáját az automatikus jóváhagyás-ellenőrzés blokkolta; külön engedélyre vár.

Az online telepítési és utóellenőrzési eredmények a gyökérprojekt külön állapotfeljegyzésében szerepelnek. A tesztkörnyezet és az `output/` nem része a közzétételnek.
