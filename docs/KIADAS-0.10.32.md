# 0.10.32 — Mobilos navigáció és vásárlási felületek

A forgó fejlécüzenetek azonos helyet foglalnak el. A mobilmenü zárva kihagyható billentyűzettel; nyitva a szabad képernyőmagasságot használja, kezeli a háttérgörgetést, Escape-et és a nézetváltást. A fiók- és kedvencikonok, szűrő, mennyiségválasztó és több műveleti hivatkozás nagyobb érintési felületet kapott. A katalógus keresőmezője szélesebb; a pénztár beviteli mezői 16 px-esek.

A 0.10.31 teljesítményjavítására épül. A közös statikus CSS/JS és HTML-verziók a forrásból, mentést készítő célzott szinkronnal készültek. Termékadatot, árat, fizetési vagy szállítási szabályt nem módosít.

Ellenőrzés: 15 statikus oldal 320 px-en; érintett oldalak asztali nézetben; helyi WooCommerce kereső/szűrő, képnézegető, mennyiség, QA-kupon, szállítás és megőrzött személyre szabás. Öt szinkronpróba és 70 elkülönített kereskedelmi ellenőrzés sikeres. Az éles telepítés utóellenőrzése külön dokumentálandó.

Telepítés a meglévő aktív `/home2/layeroro/shop/wp-content/plugins/layero_plugins` cPanel Git-mappában az **Update from Remote** művelettel. A korábbi `.cpanel.yml` más célmappát használ; nincs szükség Deploy HEAD Commitra vagy oldal-újraépítésre.
