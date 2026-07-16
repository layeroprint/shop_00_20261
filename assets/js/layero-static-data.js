/* ═══════════════════════════════════════════════════════════════════
   LAYERO SHOP — demo termékadatok
   A képek a prezentációs oldal meglévő fotói (assets/...).
   Éles induláskor csak ezt a fájlt kell valós adatokra cserélni.

   Mezők: leiras = rövid leírás (termékkártya + ár alatti szöveg),
          hosszu = hosszú leírás bekezdései (termékoldal alsó blokk),
          specs  = [címke, érték] párok a spec-táblázathoz.
   ═══════════════════════════════════════════════════════════════════ */

/* ajanlat: true → nem közvetlenül vásárolható; a főoldalon külön
   „Ajánlatkérés alapján" sávban jelenik meg, nem a kiemelt rácsban. */
var SHOP_CATS = [
  { id: 'lampak',      nev: 'Tematikus lámpák',    leiras: 'Névre szóló fény — LED-del, a te szövegeddel, esti rituálékhoz', img: 'assets/images/categories/layero-asset-0227-1100.webp' },
  { id: 'kulcstartok', nev: 'Kulcstartók',         leiras: 'Apró, személyes ajándék, ami minden nap kézbe kerül',   img: 'assets/images/categories/layero-asset-0226-1100.webp' },
  { id: 'dekoraciok',  nev: 'Dekorációk',          leiras: 'Vázák, kaspók és lakásdíszek, amiket máshol nem találsz meg',      img: 'assets/images/categories/layero-asset-0223-1100.webp' },
  { id: 'szezonalis',  nev: 'Szezonális & Ünnepi', leiras: 'Ünnepi darabok, amik évről évre előkerülnek — nem hervadnak el',   img: 'assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-01.jpg' },
  { id: 'rajongoi',    nev: 'Gyűjtői / rajongói',  leiras: 'Film, játék, sport és hobbi — ajándék, ami pontosan róla szól',       img: 'assets/images/categories/layero-asset-0225-1100.webp' },
  { id: 'baba-gyerek', nev: 'Baba & Gyerek',       leiras: 'Születési adatokkal, névvel — emlék, ami a gyerekszobában marad', img: 'assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-01.jpg' },
  { id: 'ceges',       nev: 'Céges megoldások',    leiras: 'Logós ajándék és QR + NFC display — árajánlat egyeztetés alapján', img: 'assets/images/categories/layero-asset-0222-1100.webp', ajanlat: true },
  { id: 'egyedi',      nev: 'Egyedi rendelés',     leiras: 'Küldd el az ötleted vagy referenciaképed — megtervezzük és legyártjuk',  img: 'assets/images/categories/layero-asset-0224-1100.webp', ajanlat: true }
];

var SHOP_PRODUCTS = [
  /* ── Tematikus lámpák ── */
  { id: 'szam-lampa-nevvel',   nev: 'Névre szóló szám-lámpa',        cat: 'lampak',      ar: 189, regi_ar: 239, badge: 'Bestseller', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0009.webp', 'assets/termekvilag/hero_slider/layero-asset-0013.webp'],
    leiras: 'Kedvenc játékos, mezszám és név egyben — LED háttérfénnyel világító, egyedi gyártású asztali lámpa.',
    hosszu: [
      'A szám-lámpa a legszemélyesebb ajándékaink egyike: a kiválasztott szám sziluettjébe komponáljuk a kedvenc játékos alakját, alá pedig a saját neved vagy az ünnepelt neve kerül. Bekapcsolva a meleg fehér LED egyenletesen világítja át a rétegeket, és a kontraszt kirajzolja a teljes jelenetet.',
      'A lámpa rendelésre készül: a szám, a név, a sportág és a póz is cserélhető. Foci, kosár, kézilabda vagy bármilyen más téma — küldd el, mire gondolsz, és a digitális tervet jóváhagyásra megmutatjuk gyártás előtt.',
      'USB-ről működik, érintőkapcsolóval. Stabil, súlyozott talpat kap, így polcra, éjjeliszekrényre és íróasztalra is biztonságosan kihelyezhető.'
    ],
    specs: [['Anyag', 'PLA biopolimer, matt felület'], ['Méret', 'kb. 18 × 20 cm (Közepes)'], ['Világítás', 'meleg fehér LED, USB'], ['Kapcsoló', 'érintős, a talpban'], ['Személyre szabás', 'szám, név, sportág, póz'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'programozo-lampa',    nev: 'Programozó kör-lámpa',          cat: 'lampak',      ar: 219, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0018.webp', 'assets/termekvilag/hero_slider/layero-asset-0009.webp'],
    leiras: 'Egyedi névvel és üzenettel gravírozott, áramkör-mintás világító dekoráció a jövő informatikusának.',
    hosszu: [
      'Ballagásra, diplomára vagy első munkanapra: a programozó kör-lámpa egy teljes kis világot rajzol fénybe — monitorok előtt ülő alak, szerverek, áramkör-minták, és középen a saját kódsorod: Név = "…", Üzenet = "…".',
      'A szöveg tetszőlegesen átírható, így ugyanez a design működik mérnöknek, gamernek vagy bárkinek, akinek a képernyő a második otthona. A kétrétegű előlap nappal is szép kontrasztot ad, este pedig a meleg háttérfény emeli ki a részleteket.'
    ],
    specs: [['Anyag', 'PLA biopolimer'], ['Átmérő', 'kb. 20 cm'], ['Világítás', 'meleg fehér LED, USB'], ['Személyre szabás', 'név + egyedi üzenet'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'jurassic-lampa',      nev: 'Dínós henger-lámpa névvel',     cat: 'lampak',      ar: 199, regi_ar: 249, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0011.webp', 'assets/termekvilag/hero_slider/layero-asset-0017.webp'],
    leiras: 'Kőmintás felületű, névre szóló henger-lámpa dinós motívummal — a gyerekszoba kedvence.',
    hosszu: [
      'A henger-lámpa különlegessége a litofán technika: a fal vastagságának változása rajzolja ki a képet, így kikapcsolva egyszerű kőmintás hengert látsz, bekapcsolva viszont előtűnik a teljes dinós jelenet és a név.',
      'Éjszakai fénynek is tökéletes: a meleg, szűrt fény nem vakít, a gyerekszobában pont annyi világosságot ad, amennyi az elalváshoz kell. A név betűtípusa a témához illeszkedik, és bármilyen névvel kérhető.'
    ],
    specs: [['Anyag', 'PLA, litofán technika'], ['Méret', 'kb. 11 × 19 cm'], ['Világítás', 'meleg fehér LED, USB'], ['Személyre szabás', 'név, motívum'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'hullam-gomblampa',    nev: 'Hullám asztali lámpa',          cat: 'lampak',      ar: 249, regi_ar: 299, badge: 'Új', szemelyre_szabott: false, visszakuldheto: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0016.webp', 'assets/termekvilag/hero_slider/layero-asset-0019.webp'],
    leiras: 'Organikus, csavart bordázatú lámpabúra fa lábakon, meleg fényű LED-del — skandináv hangulat bármelyik szobába.',
    hosszu: [
      'A hullám lámpa nem személyre szabott darab, hanem designtárgy: a csavart bordázat úgy szórja szét a fényt, hogy a búra teljes felülete egyenletesen izzik, árnyékjáték nélkül. Nappali dohányzóasztalra, hálószoba éjjeliszekrényére vagy dolgozósarokba egyaránt illik.',
      'A tömörfa hatású lábak és a matt búra kellemesen semleges párost alkotnak, így bármilyen belső térhez passzol — a skandináv minimáltól az indusztriálig.'
    ],
    specs: [['Anyag', 'PLA búra, fa hatású láb'], ['Méret', 'kb. 22 × 30 cm'], ['Világítás', 'E14 foglalat, LED izzóval'], ['Kapcsoló', 'vezetéken'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'karacsonyi-lampa',    nev: 'Karácsonyi kedvenc-lámpa',      cat: 'lampak',      ar: 229, badge: 'Szezonális', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0017.webp', 'assets/termekvilag/hero_slider/layero-asset-0019.webp'],
    leiras: 'Világító ünnepi jelenet a te kutyusaiddal — fotó alapján készül, hogy a család minden tagja ott legyen a fa alatt.',
    hosszu: [
      'Küldj egy-két fotót a kedvenceidről, és mi sziluettként belerajzoljuk őket az ünnepi jelenetbe: kanapé, ajándékok, hópelyhek, gömbök — és középen ők. A kész lámpa bekapcsolva meleg, ünnepi fénnyel világítja meg a jelenetet.',
      'Az adventi időszak legkeresettebb darabja, ezért novembertől érdemes időben rendelni. Kutyán kívül macskával, nyuszival vagy akár az egész családdal is kérhető.'
    ],
    specs: [['Anyag', 'PLA biopolimer'], ['Átmérő', 'kb. 20 cm'], ['Világítás', 'meleg fehér LED, USB'], ['Személyre szabás', 'fotó alapján, több kedvenc'], ['Gyártási idő', '7–12 munkanap (szezonban)']] },
  { id: 'holdfeny-lampa',      nev: 'Holdfény erdei lámpa',          cat: 'lampak',      ar: 159, regi_ar: 199, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0019.webp', 'assets/termekvilag/hero_slider/layero-asset-0017.webp'],
    leiras: 'Szarvasos, hegyvidéki sziluett kör-lámpa rejtett világítással — nappal dísz, este hangulatfény.',
    hosszu: [
      'A holdfény lámpa a természet nyugalmát hozza a szobába: hegyvonulat, fenyves és egy szarvas sziluettje rajzolódik ki a kör alakú, holdat idéző fénylap előtt. A rejtett LED-sor hátulról világít, így a fény puha és vakításmentes.',
      'Több méretben készül, így polcra, komódra és nagyobb felületre is találsz megfelelőt. Szarvas helyett farkas, medve vagy saját motívum is kérhető.'
    ],
    specs: [['Anyag', 'PLA biopolimer'], ['Méret', '3 méretben (16 / 20 / 26 cm)'], ['Világítás', 'rejtett LED-sor, USB'], ['Személyre szabás', 'motívum cserélhető'], ['Gyártási idő', '5–10 munkanap']] },

  /* ── Kulcstartók ── */
  { id: 'logos-kulcstarto',    nev: 'Logós kulcstartó',              cat: 'kulcstartok', ar: 39, badge: 'Bestseller', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0027.webp', 'assets/termekvilag/hero_slider/layero-asset-0022.webp'],
    leiras: 'Egyedi logóval, kétszínű nyomtatással készült, strapabíró kulcstartó — darabonként vagy céges csomagban.',
    hosszu: [
      'A logós kulcstartó a legegyszerűbb módja annak, hogy a márkád ott legyen az emberek zsebében — szó szerint. A logót kétszínű, domború nyomtatással visszük fel, így nem kopik és nem pattogzik le, ellentétben a matricázott vagy festett megoldásokkal.',
      'Egy darabot is legyártunk, de igazán céges mennyiségben éri meg: rendezvényre, csapatépítőre vagy törzsvásárlói ajándéknak 50–500 darabos tételben is vállaljuk, mennyiségi kedvezménnyel. Kérj árajánlatot a kapcsolat oldalon.'
    ],
    specs: [['Anyag', 'PETG, extra strapabíró'], ['Méret', 'kb. 4 × 5,5 cm'], ['Kivitel', 'kétszínű, domború logó'], ['Szerelék', 'fém karika + lánc'], ['Mennyiségi kedvezmény', '50 db felett'], ['Gyártási idő', '3–7 munkanap']] },
  { id: 'csapat-kulcstarto',   nev: 'Csapat-kulcstartó szett',       cat: 'kulcstartok', ar: 149, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0027.webp', 'assets/termekvilag/hero_slider/layero-asset-0009.webp'],
    leiras: '6 darabos szett kluboknak, baráti társaságoknak — egységes design, egyedi nevekkel minden darabon.',
    hosszu: [
      'Egy csapat, egy design, hat név: a szett minden darabja ugyanazt a formavilágot viseli, de mindenki a sajátját kapja. Fociedzésre, pecás bandának, motoros klubnak vagy a baráti körnek — a közös identitás apró, hordható formája.',
      'A szett alapára 6 darabra vonatkozik; nagyobb csapatnak darabonként bővíthető. A forma, a színek és a betűtípus is igazítható a csapat arculatához.'
    ],
    specs: [['Anyag', 'PETG'], ['Tartalom', '6 db, egyedi nevekkel'], ['Bővíthető', 'igen, darabonként'], ['Személyre szabás', 'forma, szín, nevek'], ['Gyártási idő', '5–10 munkanap']] },

  /* ── Dekorációk ── */
  { id: 'tulipan-vaza',        nev: 'Tulipán üvegcső-váza',          cat: 'dekoraciok',  ar: 119, regi_ar: 149, badge: 'Új', szemelyre_szabott: false,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0020.webp', 'assets/termekvilag/hero_slider/layero-asset-0025.webp'],
    leiras: 'Minimál fa-hatású keret üvegcsővel és nyomtatott tulipánnal — örök virág, ami sosem hervad el.',
    hosszu: [
      'A tulipán-váza kétféleképpen él: a nyomtatott, kézzel nem megkülönböztethető tulipánnal örök dísz, az üvegcsőbe azonban élő virágot is tehetsz, és akkor klasszikus egyszálas váza lesz belőle.',
      'Anyák napjára, nőnapra vagy köszönetajándéknak ideális — olyan virág, ami évek múlva is ugyanúgy áll az ablakpárkányon. A tulipán színe választható, a keret pedig natúr fa hatású vagy festett kivitelben készül.'
    ],
    specs: [['Anyag', 'PLA keret, valódi üvegcső'], ['Méret', 'kb. 8 × 22 cm'], ['Tulipán színe', 'piros / sárga / rózsaszín'], ['Élő virághoz', 'igen, az üvegcső kivehető'], ['Gyártási idő', '3–7 munkanap']] },
  { id: 'leveles-kaspo',       nev: 'Leveles kaspó',                 cat: 'dekoraciok',  ar: 99, szemelyre_szabott: false, visszakuldheto: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0025.webp', 'assets/termekvilag/hero_slider/layero-asset-0020.webp'],
    leiras: 'Botanikus formavilágú, rétegzett levelekből épülő kaspó réz-hatású belsővel — élő növénynek vagy szárazvirágnak.',
    hosszu: [
      'A kaspó falát egymásra boruló, erezetükben is kidolgozott levelek alkotják, a belső réz-hatású henger pedig meleg kontrasztot ad a mélyzöld külsőnek. Élő növénnyel és szárazvirág-kompozícióval egyaránt mutatós.',
      'A leveles külső több színben készül — mélyzöld, olíva, terrakotta —, a belső henger kivehető, így a locsolás sem probléma.'
    ],
    specs: [['Anyag', 'PLA, kivehető belső henger'], ['Méret', 'kb. 14 × 16 cm'], ['Színek', 'mélyzöld / olíva / terrakotta'], ['Vízálló belső', 'igen'], ['Gyártási idő', '3–7 munkanap']] },
  { id: 'szarvas-bortarto',    nev: 'Szarvas bortartó szobor',       cat: 'dekoraciok',  ar: 149, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0021.webp', 'assets/termekvilag/hero_slider/layero-asset-0025.webp'],
    leiras: 'Kőhatású, fekvő szarvas formájú palacktartó — elegáns ajándék borkedvelőknek, bárpultra és nappaliba.',
    hosszu: [
      'A fekvő szarvas agancsai közé fektetett palack olyan, mintha egy kastély borospincéjéből érkezett volna. A kőhatású, márványmintás felület nemes megjelenést ad, a súlyozott talp pedig stabilan tartja a legnehezebb palackot is.',
      'Névnapra, házavatóra, főnöknek vagy após-ajándéknak telitalálat — és a palack elfogyása után is marad belőle egy szobor.'
    ],
    specs: [['Anyag', 'PLA, kő hatású felület'], ['Méret', 'kb. 28 × 20 cm'], ['Terhelhetőség', 'standard 0,75 l palack'], ['Gravírozás', 'név / dátum kérhető a talpra'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'eletfa-mecses-szett', nev: 'Életfa mécses-szett (1–10)',    cat: 'dekoraciok',  ar: 179, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0014.webp', 'assets/termekvilag/hero_slider/layero-asset-0020.webp'],
    leiras: 'Tíz mécsestartó, amin egy fa nő évről évre — évfordulóra, születésnapokra, vagy adventi visszaszámláláshoz.',
    hosszu: [
      'Az életfa szett tíz mécsestartóból áll: az elsőn még csak egy hajtás, a tizediken terebélyes lombkorona — a fa évről évre nő, ahogy a kapcsolatotok, a gyerek vagy a vállalkozás is. Minden évfordulón eggyel több mécses kerül az asztalra.',
      'LED-es teamécsessel és hagyományos mécsessel is használható. A számok helyére évszámok vagy nevek is kérhetők, így emléktárgyból akár családi rituálé is lehet.'
    ],
    specs: [['Anyag', 'PLA, hőálló betéttel'], ['Tartalom', '10 db mécsestartó'], ['Mécses', 'LED és gyertya is'], ['Személyre szabás', 'számok / évszámok / nevek'], ['Gyártási idő', '5–10 munkanap']] },

  /* ── Céges megoldások ── */
  { id: 'qr-nfc-display',      nev: 'QR + NFC asztali display',      cat: 'ceges',       ar: 179, regi_ar: 219, badge: 'B2B kedvenc', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0022.webp', 'assets/termekvilag/hero_slider/layero-asset-0027.webp'],
    leiras: 'Étlap, Google-értékelés vagy weboldal egy érintésre: asztali display beépített NFC chippel és QR kóddal — a te logóddal.',
    hosszu: [
      'A vendég odaérinti a telefonját — és már nyílik is az étlap, a foglalási oldal vagy a Google-értékelő felület. A displaybe NFC chip kerül, a nyomtatott QR kód pedig a régebbi telefonokon is működik. Nincs matrica, nincs kopás: a kód és a felirat a tárgy részeként, domborítva készül.',
      'Referencia: a Bázis Bisztró asztalain két hét alatt megduplázta a beérkező Google-értékelések számát. Étterembe, kávézóba, szépségszalonba, rendelőbe — mindenhova, ahol az ügyfél vár valamire, és közben a kezében a telefon.',
      'Az ár egy darabra vonatkozik, teljes arculati testreszabással. Több asztalos szettekre mennyiségi kedvezményt adunk.'
    ],
    specs: [['Anyag', 'PLA/PETG, domborított grafika'], ['Méret', 'kb. 12 × 18 cm'], ['NFC', 'programozott chip, cserélhető cél-URL'], ['QR', 'domborított, kopásálló'], ['Testreszabás', 'logó, színek, felirat'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'ceges-ajandekcsomag', nev: 'Céges ajándékcsomag',           cat: 'ceges',       ar: 449, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0027.webp', 'assets/termekvilag/hero_slider/layero-asset-0022.webp'],
    leiras: 'Logózott ajándéktárgyak díszdobozban — partnereknek, munkatársaknak, rendezvényekre.',
    hosszu: [
      'Év végi partnerajándék, onboarding-csomag az új kollégáknak vagy rendezvényes VIP-doboz: a csomagot közösen állítjuk össze a büdzsé és az alkalom alapján. Kulcstartó, telefonállvány, pultdísz, világító logó — mind a ti arculatotokban.',
      'A feltüntetett ár egy közepes, 3 tételes díszdobozos csomag irányára. Pontos ajánlatot a darabszám és az összetétel alapján adunk, 24 órán belül.'
    ],
    specs: [['Tartalom', 'igény szerint, 2–5 tétel'], ['Csomagolás', 'logózott díszdoboz'], ['Minimum', '5 csomag'], ['Ajánlat', '24 órán belül'], ['Gyártási idő', '10–15 munkanap']] },

  /* ── Gyűjtői / rajongói ── */
  { id: 'bagoly-figura',       nev: 'Diplomás bagoly figura',        cat: 'rajongoi',    ar: 139, regi_ar: 179, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0023.webp', 'assets/termekvilag/hero_slider/layero-asset-0010.webp'],
    leiras: 'Ballagási emlék talapzattal, névvel, gratulációval és évszámmal — a tudás szimbóluma, ami a polcon marad.',
    hosszu: [
      'A virágcsokor elhervad, a bagoly marad: a diplomás bagoly talapzatán a saját üzeneted áll — „Gratulálunk Robi! Sok sikert! 2025" —, és még húsz év múlva is ott ül majd a könyvespolcon, a diploma mellett.',
      'A talapzat felirata teljesen szabad szöveg, a kalap bojtjának színe pedig a szak színéhez igazítható. Óvodai és iskolai ballagásra kicsinyített változat is kérhető.'
    ],
    specs: [['Anyag', 'PLA, többszínű nyomtatás'], ['Magasság', 'kb. 18 cm talapzattal'], ['Felirat', 'szabad szöveg, 3 sor'], ['Bojt színe', 'választható'], ['Gyártási idő', '5–10 munkanap']] },
  { id: 'camino-szobor',       nev: 'El Camino emlék-szobor',        cat: 'rajongoi',    ar: 189, badge: 'Egyedi', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0010.webp', 'assets/termekvilag/hero_slider/layero-asset-0023.webp'],
    leiras: 'Személyre szabott zarándok-figura névvel, megtett távval és évszámmal — egy nagy út méltó lezárása.',
    hosszu: [
      'Aki végigment a Caminón, az tudja: az út nem ér véget Santiagóban. A zarándok-szobor a mosolygó vándort örökíti meg — kagylóval a nyakában, bottal a kezében —, a talapzatra pedig a név, a megtett kilométer és az évszám kerül.',
      'Nemcsak Caminóra: maratonra, Szent Jakab-útra, El Caminóra, teljesítménytúrára vagy bármilyen nagy személyes mérföldkőre készítünk emlékművet. A figura pózálható és cserélhető elemekkel kérhető.'
    ],
    specs: [['Anyag', 'PLA, kő hatású felület'], ['Magasság', 'kb. 20 cm'], ['Felirat', 'név + táv + évszám'], ['Egyediesítés', 'póz, kellékek'], ['Gyártási idő', '7–12 munkanap']] },
  { id: 'fan-art-lampa',       nev: 'Fan-art világító logó',         cat: 'rajongoi',    ar: 209, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0012.webp', 'assets/termekvilag/hero_slider/layero-asset-0013.webp'],
    leiras: 'Kedvenc játékod vagy filmed címere világító kivitelben — gyűjtői darab, egyedi gyártásban.',
    hosszu: [
      'A gyűjtői polc koronája: a kedvenc franchise-od címere éldiódás háttérvilágítással, méretre gyártva. A többrétegű, többszínű előlap nappal is részletgazdag, bekapcsolva viszont megelevenedik.',
      'Bármilyen címerrel, logóval vagy emblémával kérhető — a képen látható Assassin’s Creed darab csak egy példa a sok közül. A kontúrt követő forma miatt minden darab egyedi tervezést kap.'
    ],
    specs: [['Anyag', 'PLA, többrétegű előlap'], ['Méret', 'kb. 25 × 25 cm-ig'], ['Világítás', 'LED-szalag, USB'], ['Téma', 'szabadon választható'], ['Gyártási idő', '7–12 munkanap']] },
  { id: 'sorozat-lampa',       nev: 'Sorozat kör-lámpa névvel',      cat: 'rajongoi',    ar: 219, badge: 'Új', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0013.webp', 'assets/termekvilag/hero_slider/layero-asset-0012.webp'],
    leiras: 'Kétvilágú, kétszínű LED-es kör-lámpa a kedvenc sorozatod hangulatával — és a te neveddel a fényben.',
    hosszu: [
      'Fent a normális világ meleg fehér fényben, lent a tükörvilág vészjósló vörösben — a kétzónás LED külön hangulatot ad a jelenet két felének, középen pedig a saját neved világít a címfelirat mellett.',
      'A koncepció bármilyen sorozatra, filmre vagy játékra adaptálható: a lényeg a kettéosztott, kétszínű világítás és a személyre szabott felirat.'
    ],
    specs: [['Anyag', 'PLA biopolimer'], ['Átmérő', 'kb. 22 cm'], ['Világítás', 'kétzónás LED (fehér + színes)'], ['Személyre szabás', 'név + téma'], ['Gyártási idő', '7–12 munkanap']] },
  { id: 'f1-palyaterkep',      nev: 'F1 pálya-falikép',              cat: 'rajongoi',    ar: 259, regi_ar: 319, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0015.webp', 'assets/termekvilag/hero_slider/layero-asset-0012.webp'],
    leiras: 'A teljes szezon összes versenypályája egy keretben, domború nyomtatással — a Forma–1 rajongók falidísze.',
    hosszu: [
      'Mind a 24 pálya íve domborúan emelkedik ki a mélyfekete háttérből, alattuk a helyszín és a pálya neve — a keret pedig a szezon színeiben készül. Messziről grafika, közelről dombormű: a vendégek garantáltan odamennek megnézni.',
      'Bármelyik szezonra legyártjuk, és kérhető kiemeléssel is: a kedvenc pályád vagy a hazai futam színes akcenttel különül el a többitől. MotoGP-s és rally-változat is rendelhető.'
    ],
    specs: [['Anyag', 'PLA, domború pályaívek'], ['Méret', 'kb. 40 × 34 cm'], ['Keret', 'nyomtatott, színe választható'], ['Változatok', 'F1 / MotoGP / rally'], ['Gyártási idő', '7–12 munkanap']] },

  /* ── Egyedi rendelés ── */
  { id: 'egyedi-otlet',        nev: 'Egyedi elképzelés megvalósítása', cat: 'egyedi',    ar: 0, badge: 'Ajánlatkérés', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0010.webp', 'assets/termekvilag/hero_slider/layero-asset-0018.webp'],
    leiras: 'Van egy ötleted, ami még nem létezik? Írd le, küldj referenciát, és mi megtervezzük, legyártjuk.',
    hosszu: [
      'A katalógusunk csak a kezdet — a legjobb darabjaink mind egyedi megkeresésből születtek. Működik így: leírod az ötletet (képpel, vázlattal, referenciával, ahogy kényelmes), mi pedig 24–48 órán belül visszajelzünk, hogy mennyiért és mennyi idő alatt tudjuk megvalósítani.',
      'A részleteket e-mailben egyeztetjük és véglegesítjük, és csak a jóváhagyásod után indul a gyártás. Módosítási kör az árban van — addig igazítjuk, amíg pontosan az nem lesz, amit elképzeltél.',
      'Az ár a méret, a komplexitás és az anyag függvénye: egy egyszerűbb egyedi darab jellemzően 100–300 lej, összetettebb projektek egyedi kalkulációval készülnek.'
    ],
    specs: [['Ajánlat', '24–48 órán belül'], ['Terv', 'e-mailes egyeztetés a jóváhagyásig'], ['Módosítás', 'az árban, a jóváhagyásig'], ['Jellemző ár', '100–300 lej + komplexitás'], ['Gyártási idő', 'terv szerint, jellemzően 7–15 munkanap']] }
];

var SHOP_VARIANSOK = {
  meret: ['Kicsi', 'Közepes', 'Nagy'],
  szin:  ['Natúr', 'Fekete', 'Fehér']
};

/* ── Termékkezelőből generált kulcstartók ── */
SHOP_PRODUCTS.push.apply(SHOP_PRODUCTS, [
  {
    "id": "peugeot-logos-kulcstarto",
    "nev": "Peugeot logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-05.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Peugeot autó márka logós kulcstartó. Tökéletes ajándék Peugeot rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Peugeot autó márka logós kulcstartó. Tökéletes ajándék Peugeot rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "volkswagen-logos-kulcstarto",
    "nev": "Volkswagen logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-05.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Volkswagen autó márka logós kulcstartó. Tökéletes ajándék VW rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Volkswagen autó márka logós kulcstartó. Tökéletes ajándék VW rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "ferrari-logos-kulcstarto",
    "nev": "Ferrari logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-05.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-06.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-08.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Ferrari autó márka logós kulcstartó. Tökéletes ajándék Ferrari rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Ferrari autó márka logós kulcstartó. Tökéletes ajándék Ferrari rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "renault-logos-kulcstarto",
    "nev": "Renault logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/04-renault-logos-kulcstarto/04-renault-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/04-renault-logos-kulcstarto/04-renault-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/04-renault-logos-kulcstarto/04-renault-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Renault autó márka logós kulcstartó. Tökéletes ajándék Renault rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Renault autó márka logós kulcstartó. Tökéletes ajándék Renault rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "skoda-logos-kulcstarto",
    "nev": "Škoda logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-05.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-06.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Škoda autó márka logós kulcstartó. Tökéletes ajándék Škoda rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Škoda autó márka logós kulcstartó. Tökéletes ajándék Škoda rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "bmw-logos-kulcstarto",
    "nev": "BMW logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott BMW autó márka logós kulcstartó. Tökéletes ajándék BMW rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott BMW autó márka logós kulcstartó. Tökéletes ajándék BMW rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "toyota-logos-kulcstarto",
    "nev": "Toyota logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-05.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-06.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Toyota autó márka logós kulcstartó. Tökéletes ajándék Toyota rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Toyota autó márka logós kulcstartó. Tökéletes ajándék Toyota rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "ford-logos-kulcstarto",
    "nev": "Ford logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Ford autó márka logós kulcstartó. Tökéletes ajándék Ford rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Ford autó márka logós kulcstartó. Tökéletes ajándék Ford rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "audi-logos-kulcstarto",
    "nev": "Audi logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Audi autó márka logós kulcstartó. Tökéletes ajándék Audi rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Audi autó márka logós kulcstartó. Tökéletes ajándék Audi rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "f1-logos-kulcstarto",
    "nev": "F1 logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Formula 1 logós kulcstartó. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Formula 1 logós kulcstartó. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "fc-barcelona-kulcstarto",
    "nev": "FC Barcelona kulcstartó",
    "cat": "kulcstartok",
    "ar": 8,
    "kepek": [
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-01.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-02.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-03.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-04.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-05.jpg"
    ],
    "leiras": "3D nyomtatott FC Barcelona focicsapat címeres kulcstartó. Tökéletes ajándék Barça szurkolóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott FC Barcelona focicsapat címeres kulcstartó. Tökéletes ajándék Barça szurkolóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "regi_ar": 10,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "real-madrid-kulcstarto",
    "nev": "Real Madrid kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-01.jpg",
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-02.jpg",
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-03.jpg",
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-04.jpg"
    ],
    "leiras": "3D nyomtatott Real Madrid focicsapat címeres kulcstartó. Tökéletes ajándék Real Madrid szurkolóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Real Madrid focicsapat címeres kulcstartó. Tökéletes ajándék Real Madrid szurkolóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "hello-kitty-kulcstarto",
    "nev": "Hello Kitty kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/13-hello-kitty-kulcstarto/13-hello-kitty-kulcstarto-04.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott Hello Kitty figurás kulcstartó. Tökéletes ajándék Hello Kitty rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott Hello Kitty figurás kulcstartó. Tökéletes ajándék Hello Kitty rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "mickey-mouse-kulcstarto",
    "nev": "Mickey Mouse kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/14-mickey-mouse-kulcstarto/14-mickey-mouse-kulcstarto-05.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott Mickey Mouse figurás kulcstartó. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott Mickey Mouse figurás kulcstartó. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "mario-kerdojel-kocka-kulcstarto",
    "nev": "Mario kérdőjel kocka kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/15-mario-kerdojel-kocka-kulcstarto/15-mario-kerdojel-kocka-kulcstarto-01.jpeg"
    ],
    "leiras": "3D nyomtatott Super Mario kérdőjel kocka kulcstartó. Tökéletes ajándék Nintendo és Mario rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Super Mario kérdőjel kocka kulcstartó. Tökéletes ajándék Nintendo és Mario rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "angel-lilo-stitch-kulcstarto",
    "nev": "Angel (Lilo & Stitch) kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-01.jpg",
      "assets/kulcstartok/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-02.jpg",
      "assets/kulcstartok/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-03.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott Angel figurás kulcstartó a Lilo & Stitch animációs filmből. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott Angel figurás kulcstartó a Lilo & Stitch animációs filmből. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "stitch-kulcstarto",
    "nev": "Stitch kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/17-stitch-kulcstarto/17-stitch-kulcstarto-01.jpg",
      "assets/kulcstartok/17-stitch-kulcstarto/17-stitch-kulcstarto-02.jpg",
      "assets/kulcstartok/17-stitch-kulcstarto/17-stitch-kulcstarto-03.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott Stitch figurás kulcstartó a Lilo & Stitch animációs filmből. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott Stitch figurás kulcstartó a Lilo & Stitch animációs filmből. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "demogorgon-stranger-things-kulcstarto",
    "nev": "Demogorgon (Stranger Things) kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-01.jpg",
      "assets/kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-02.jpg",
      "assets/kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-03.jpg"
    ],
    "leiras": "3D nyomtatott Demogorgon figurás kulcstartó a Stranger Things sorozatból. Tökéletes ajándék Stranger Things rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Demogorgon figurás kulcstartó a Stranger Things sorozatból. Tökéletes ajándék Stranger Things rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "minecraft-crafting-table-kulcstarto",
    "nev": "Minecraft Crafting Table kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-01.jpg",
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-02.jpg",
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-03.jpg",
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-04.jpg"
    ],
    "leiras": "3D nyomtatott Minecraft Crafting Table (barkácsasztal) kulcstartó. Tökéletes ajándék Minecraft rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Minecraft Crafting Table (barkácsasztal) kulcstartó. Tökéletes ajándék Minecraft rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "minecraft-tnt-kulcstarto",
    "nev": "Minecraft TNT kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-01.jpg",
      "assets/kulcstartok/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-02.jpg",
      "assets/kulcstartok/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-03.jpg"
    ],
    "leiras": "3D nyomtatott Minecraft TNT blokk kulcstartó. Tökéletes ajándék Minecraft rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Minecraft TNT blokk kulcstartó. Tökéletes ajándék Minecraft rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "minecraft-skeleton-kulcstarto",
    "nev": "Minecraft Skeleton kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-01.jpg",
      "assets/kulcstartok/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-02.jpg"
    ],
    "leiras": "3D nyomtatott Minecraft Skeleton (csontváz) figurás kulcstartó. Tökéletes ajándék Minecraft rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Minecraft Skeleton (csontváz) figurás kulcstartó. Tökéletes ajándék Minecraft rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "golden-retriever-flexi-kulcstarto",
    "nev": "Golden Retriever flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 3500,
    "kepek": [
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-01.jpeg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-02.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-03.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-04.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-05.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-06.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-07.jpg"
    ],
    "leiras": "3D nyomtatott flexi (mozgatható ízületű) Golden Retriever kutya kulcstartó. A végtagok szabadon mozognak! Tökéletes ajándék kutyabarátoknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott flexi (mozgatható ízületű) Golden Retriever kutya kulcstartó. A végtagok szabadon mozognak! Tökéletes ajándék kutyabarátoknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "mosomedve-flexi-kulcstarto",
    "nev": "Mosómedve flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 3500,
    "kepek": [
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-01.jpg",
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-04.jpg",
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-05.jpg",
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-06.jpg"
    ],
    "leiras": "3D nyomtatott flexi (mozgatható ízületű) mosómedve kulcstartó. A végtagok szabadon mozognak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott flexi (mozgatható ízületű) mosómedve kulcstartó. A végtagok szabadon mozognak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "fekete-cica-flexi-kulcstarto",
    "nev": "Fekete cica flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 3500,
    "kepek": [
      "assets/kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-01.jpeg",
      "assets/kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-02.jpeg",
      "assets/kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-03.jpeg"
    ],
    "leiras": "3D nyomtatott flexi (mozgatható ízületű) fekete cica kulcstartó. A végtagok szabadon mozognak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott flexi (mozgatható ízületű) fekete cica kulcstartó. A végtagok szabadon mozognak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "tacsko-flexi-kulcstarto",
    "nev": "Tacskó flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 3500,
    "kepek": [
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-01.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-02.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-03.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-04.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-05.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-06.jpg"
    ],
    "leiras": "3D nyomtatott flexi (mozgatható ízületű) tacskó kutya kulcstartó. A végtagok szabadon mozognak! Tökéletes ajándék kutyabarátoknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott flexi (mozgatható ízületű) tacskó kutya kulcstartó. A végtagok szabadon mozognak! Tökéletes ajándék kutyabarátoknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "beagle-kulcstarto",
    "nev": "Beagle kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/26-beagle-kulcstarto/26-beagle-kulcstarto-01.jpg"
    ],
    "leiras": "3D nyomtatott Beagle kutya figurás kulcstartó. Tökéletes ajándék kutyabarátoknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Beagle kutya figurás kulcstartó. Tökéletes ajándék kutyabarátoknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "maci-szivvel-barna-kulcstarto",
    "nev": "Maci szívvel kulcstartó (barna)",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-01.jpg",
      "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-02.jpg",
      "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-03.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott barna mackó szívecskével kulcstartó. Tökéletes Valentin-napi vagy születésnapi ajándék! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott barna mackó szívecskével kulcstartó. Tökéletes Valentin-napi vagy születésnapi ajándék! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "maci-szivvel-kek-kulcstarto",
    "nev": "Maci szívvel kulcstartó (kék)",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-01.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-02.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-03.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-04.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-05.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott kék mackó szívecskével kulcstartó. Tökéletes Valentin-napi vagy születésnapi ajándék! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott kék mackó szívecskével kulcstartó. Tökéletes Valentin-napi vagy születésnapi ajándék! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "mehecske-kulcstarto",
    "nev": "Méhecske kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/29-mehecske-kulcstarto/29-mehecske-kulcstarto-01.jpg",
      "assets/kulcstartok/29-mehecske-kulcstarto/29-mehecske-kulcstarto-02.jpg",
      "assets/kulcstartok/29-mehecske-kulcstarto/29-mehecske-kulcstarto-03.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott méhecske figurás kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott méhecske figurás kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "kutya-ruhaban-kulcstarto",
    "nev": "Kutya ruhában kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-01.jpg",
      "assets/kulcstartok/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-02.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott kutya ruhában figurás kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott kutya ruhában figurás kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "polip-piros-kulcstarto",
    "nev": "Polip kulcstartó (piros)",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-01.jpg",
      "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-02.jpg",
      "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-03.jpg"
    ],
    "leiras": "3D nyomtatott piros polip figurás kulcstartó mozgatható csápokkal. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott piros polip figurás kulcstartó mozgatható csápokkal. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "polip-rozsaszin-kulcstarto",
    "nev": "Polip kulcstartó (rózsaszín)",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-01.jpg",
      "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-02.jpg",
      "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-03.jpg"
    ],
    "leiras": "3D nyomtatott rózsaszín polip figurás kulcstartó mozgatható csápokkal. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott rózsaszín polip figurás kulcstartó mozgatható csápokkal. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "emoji-szivszem-kulcstarto",
    "nev": "Emoji szívszem kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-01.jpg",
      "assets/kulcstartok/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-02.jpg"
    ],
    "leiras": "3D nyomtatott szívszem emoji (Heart Eyes) kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott szívszem emoji (Heart Eyes) kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "malac-kulcstarto",
    "nev": "Malac kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-01.jpg",
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-02.jpg",
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-03.jpg",
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-04.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott malac figurás kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott malac figurás kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "glock-pisztoly-kulcstarto",
    "nev": "Glock pisztoly kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-01.jpg",
      "assets/kulcstartok/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-02.jpg"
    ],
    "leiras": "3D nyomtatott Glock pisztoly formájú kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Glock pisztoly formájú kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "mercedes-logos-kulcstarto",
    "nev": "Mercedes logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Mercedes-Benz autó márka logós kulcstartó. Tökéletes ajándék Mercedes rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Mercedes-Benz autó márka logós kulcstartó. Tökéletes ajándék Mercedes rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "deutz-fahr-logos-kulcstarto",
    "nev": "Deutz-Fahr logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott Deutz-Fahr traktor márka logós kulcstartó. Tökéletes ajándék gazdálkodóknak és traktor rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott Deutz-Fahr traktor márka logós kulcstartó. Tökéletes ajándék gazdálkodóknak és traktor rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "monster-energy-kulcstarto",
    "nev": "Monster Energy kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-01.jpg",
      "assets/kulcstartok/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-02.jpg",
      "assets/kulcstartok/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-03.jpg"
    ],
    "leiras": "3D nyomtatott Monster Energy logós kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott Monster Energy logós kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "john-deere-logos-kulcstarto",
    "nev": "John Deere logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kiváló minőségű, 3D nyomtatott John Deere traktor márka logós kulcstartó. Tökéletes ajándék gazdálkodóknak és traktor rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Kiváló minőségű, 3D nyomtatott John Deere traktor márka logós kulcstartó. Tökéletes ajándék gazdálkodóknak és traktor rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "focilabda-kulcstarto",
    "nev": "Focilabda kulcstartó",
    "cat": "kulcstartok",
    "ar": 2500,
    "kepek": [
      "assets/kulcstartok/40-focilabda-kulcstarto/40-focilabda-kulcstarto-01.jpg",
      "assets/kulcstartok/40-focilabda-kulcstarto/40-focilabda-kulcstarto-02.jpg",
      "assets/kulcstartok/40-focilabda-kulcstarto/40-focilabda-kulcstarto-03.jpg"
    ],
    "leiras": "3D nyomtatott focilabda formájú kulcstartó. Tökéletes ajándék foci rajongóknak! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott focilabda formájú kulcstartó. Tökéletes ajándék foci rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "leopard-hernyo-flexi-kulcstarto",
    "nev": "Leopárd hernyó flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 3500,
    "kepek": [
      "assets/kulcstartok/41-leopard-hernyó-flexi-kulcstarto/41-leopard-hernyó-flexi-kulcstarto-01.jpg"
    ],
    "leiras": "3D nyomtatott flexi (mozgatható ízületű) leopárd mintás hernyó kulcstartó. A test szabadon hajlítható! Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott flexi (mozgatható ízületű) leopárd mintás hernyó kulcstartó. A test szabadon hajlítható! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "medve-kulcstarto",
    "nev": "Medve kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/42-medve-kulcstarto/42-medve-kulcstarto-01.jpg",
      "assets/kulcstartok/42-medve-kulcstarto/42-medve-kulcstarto-02.jpg",
      "assets/kulcstartok/42-medve-kulcstarto/42-medve-kulcstarto-03.jpg"
    ],
    "leiras": "Aranyos 3D nyomtatott medve figurás kulcstartó. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "Aranyos 3D nyomtatott medve figurás kulcstartó. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "ballagasi-kulcstarto",
    "nev": "Ballagási kulcstartó",
    "cat": "kulcstartok",
    "ar": 3000,
    "kepek": [
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-01.jpg",
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-02.jpg",
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-03.jpg",
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-04.jpg"
    ],
    "leiras": "3D nyomtatott ballagási emlék kulcstartó, tökéletes ajándék ballagásra! Személyre szabható évszámmal. Tartós PLA anyagból készült. 25 mm átmérőjű, strapabíró fém kulcskarikával szereljük, így rögtön használatra kész.",
    "hosszu": [
      "3D nyomtatott ballagási emlék kulcstartó, tökéletes ajándék ballagásra! Személyre szabható évszámmal. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a kulcstartó kis méretben is karakteresen mutatja meg azt a témát, csapatot, márkát vagy figurát, amely közel áll hozzád. Kulcscsomón, táskán vagy hátizsákon is könnyen észrevehető, így praktikus használati tárgyból személyes kiegészítővé válik.",
      "Részletek, amelyek számítanak. A 25 mm átmérőjű, strapabíró fém kulcskarika biztos fogást ad a kulcsoknak, és a kész darab rögtön használatra kész. A könnyű PLA test nem nehezíti el a kulcscsomót, a részletgazdag, rétegről rétegre felépített forma pedig közelről is látványos.",
      "Öröm adni és használni. Ajándéknak is telitalálat: meglepheted vele egy rajongó családtagodat, barátodat vagy kollégádat, de apró figyelmességként és ajándékkísérőként is emlékezetesebb a szokványos megoldásoknál. Ez a darab olyan hétköznapi tárgy, amely minden használatkor felidézi a választott témát.",
      "Tedd személyesebbé a mindennapokat. Válaszd ezt a kulcstartót, ha egy könnyű, praktikus és személyes darabot keresel, amely nem marad észrevétlen. A gondosan kialakított kontúrok és színes részletek jól érvényesülnek, miközben a tartós karika a mindennapos használathoz készült."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 4 × 5,5 cm"
      ],
      [
        "Szerelék",
        "fém karika + lánc"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "minnie-mouse-shadow-box-lampa",
    "nev": "Minnie Mouse Shadow Box lámpa",
    "cat": "lampak",
    "ar": 15000,
    "kepek": [
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-01.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-02.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-03.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-04.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-05.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-06.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-07.jpg",
      "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-08.jpg"
    ],
    "leiras": "3D nyomtatott Minnie Mouse shadow box (árnyékdoboz) LED lámpa. Gyönyörű fényeffektusokkal, USB táplálással. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Minnie Mouse shadow box (árnyékdoboz) LED lámpa. Gyönyörű fényeffektusokkal, USB táplálással. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "fortnite-led-lampa",
    "nev": "Fortnite LED lámpa",
    "cat": "lampak",
    "ar": 12000,
    "kepek": [
      "assets/kulcstartok/45-fortnite-led-lampa/45-fortnite-led-lampa-01.jpg",
      "assets/kulcstartok/45-fortnite-led-lampa/45-fortnite-led-lampa-02.jpg",
      "assets/kulcstartok/45-fortnite-led-lampa/45-fortnite-led-lampa-03.jpg"
    ],
    "leiras": "3D nyomtatott Fortnite témájú LED lámpa. Tökéletes ajándék gamer rajongóknak! USB táplálással, hangulatos megvilágítás. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Fortnite témájú LED lámpa. Tökéletes ajándék gamer rajongóknak! USB táplálással, hangulatos megvilágítás. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "assassins-creed-led-tabla",
    "nev": "Assassin's Creed LED tábla",
    "cat": "lampak",
    "ar": 12000,
    "kepek": [
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-01.jpg",
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-02.jpg",
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-03.jpg",
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-04.jpg",
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-05.jpg",
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-06.jpg",
      "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-07.jpg"
    ],
    "leiras": "3D nyomtatott Assassin's Creed logós LED világító tábla. USB táplálással, hangulatos megvilágítás. Tökéletes ajándék Assassin's Creed rajongóknak! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Assassin's Creed logós LED világító tábla. USB táplálással, hangulatos megvilágítás. Tökéletes ajándék Assassin's Creed rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "hello-fall-oszi-felirat",
    "nev": "Hello Fall őszi felirat",
    "cat": "szezonalis",
    "ar": 5000,
    "kepek": [
      "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-01.jpg",
      "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-02.jpg",
      "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-03.jpg",
      "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-04.jpg"
    ],
    "leiras": "3D nyomtatott \"Hello Fall\" őszi dekorációs felirat levelekkel díszítve. Hangulatos őszi lakásdekoráció. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott \"Hello Fall\" őszi dekorációs felirat levelekkel díszítve. Hangulatos őszi lakásdekoráció. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.",
      "Részletek, amelyek számítanak. A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.",
      "Öröm adni és használni. Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 20–30 cm"
      ],
      [
        "Felület",
        "matt, részletgazdag"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "oszi-tok-vaza",
    "nev": "Őszi tök váza",
    "cat": "szezonalis",
    "ar": 6000,
    "kepek": [
      "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-01.jpg",
      "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-02.jpg",
      "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-03.jpg",
      "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-04.jpg",
      "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-05.jpg",
      "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-06.jpg"
    ],
    "leiras": "3D nyomtatott őszi tök formájú dekoratív váza. Gyönyörű őszi hangulatot teremt a lakásban. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott őszi tök formájú dekoratív váza. Gyönyörű őszi hangulatot teremt a lakásban. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a darab természetközeli formát és modern 3D nyomtatott textúrát visz az otthonba. Polcon, komódon, étkezőasztalon vagy ablakpárkányon is könnyen elhelyezhető, és önmagában, illetve virággal vagy növénnyel együtt is dekoratív hatást kelt.",
      "Részletek, amelyek számítanak. A rétegezett felület közelről különleges részleteket mutat, távolabbról pedig egységes, rendezett sziluettet ad. Könnyű súlya miatt egyszerűen áthelyezhető, így az évszakhoz vagy az aktuális enteriőrhöz igazítva több helyiségben is használható.",
      "Öröm adni és használni. Ajándéknak is jó választás lakásavatóra, születésnapra vagy egy kedves, maradandó figyelmességként. Azoknak szól, akik a sablonos dekoráció helyett karakteres, kis szériás tárgyat szeretnének.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy könnyen kombinálható dekorációt keresel, amely melegebbé és személyesebbé teszi a környezetét anélkül, hogy túlzsúfolná azt."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 10–15 cm"
      ],
      [
        "Kivitel",
        "vízálló belső réteggel"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "bordazott-korte-dekor",
    "nev": "Bordázott körte/tök dekor",
    "cat": "szezonalis",
    "ar": 4000,
    "kepek": [
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-01.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-02.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-03.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-04.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-05.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-06.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-07.jpg",
      "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-08.jpg"
    ],
    "leiras": "3D nyomtatott bordázott körte/tök formájú dekoráció. Elegáns őszi lakásdekoráció, különböző színekben elérhető. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott bordázott körte/tök formájú dekoráció. Elegáns őszi lakásdekoráció, különböző színekben elérhető. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a karakteres 3D nyomtatott dekoráció kis részletekkel teszi személyesebbé az otthont. Polcon, komódon, asztalon vagy egy tematikus összeállítás részeként is könnyen elhelyezhető.",
      "Részletek, amelyek számítanak. A rétegről rétegre felépített forma közelről izgalmas textúrát, távolabbról egységes sziluettet mutat. A könnyű PLA anyag praktikus, a tárgy pedig egyszerűen áthelyezhető, amikor új hangulatot szeretnél teremteni.",
      "Öröm adni és használni. Ajándéknak is jó választás, mert nem tömegtermék-hatású, hanem egy konkrét érdeklődéshez, alkalomhoz vagy enteriőrhöz kapcsolódik. Születésnapra, ünnepre, lakásavatóra vagy kedves meglepetésként is örömet szerezhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy látványos, mégis könnyen kombinálható darabot keresel, amely több személyiséget visz a helyiségbe."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "egyedi"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "leveles-mintas-mecsestarto",
    "nev": "Leveles mintás mécsestartó",
    "cat": "szezonalis",
    "ar": 5000,
    "kepek": [
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-01.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-02.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-03.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-04.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-05.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-06.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-07.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-08.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-09.jpg",
      "assets/kulcstartok/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-10.jpg"
    ],
    "leiras": "3D nyomtatott leveles mintás mécsestartó. Gyönyörű fényeffektust hoz létre a leveles áttört mintázatnak köszönhetően. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott leveles mintás mécsestartó. Gyönyörű fényeffektust hoz létre a leveles áttört mintázatnak köszönhetően. Tartós PLA anyagból készült.",
      "Miért jó választás? A mécsestartó mintázata a fény hatására válik igazán látványossá: a kivágások és domborulatok finom árnyékokat rajzolnak a környezetére. Nappal dekoratív tárgy, este pedig meghitt hangulatelem az asztalon, polcon vagy komódon.",
      "Részletek, amelyek számítanak. Különösen jól illik nyugodt esti pillanatokhoz, ünnepi terítéshez vagy szezonális dekoráció részeként. LED mécsessel biztonságos, egyszerűen kezelhető fénydekorációként használható.",
      "Öröm adni és használni. Szép ajándék lehet annak, aki szereti az otthonos fényeket és a részletgazdag lakásdekorációt. Kis helyen is erős vizuális hatást ad, ezért könnyű számára megfelelő helyet találni.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha nem csupán egy tárgyat, hanem melegebb, hívogatóbb hangulatot szeretnél teremteni a helyiségben."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 10–15 cm"
      ],
      [
        "Kivitel",
        "vízálló belső réteggel"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "jurassic-park-lithophane-lampa",
    "nev": "Jurassic Park lithophane lámpa",
    "cat": "lampak",
    "ar": 15000,
    "kepek": [
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-01.jpg",
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-02.jpg",
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-03.jpg",
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-04.jpg",
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-05.jpg",
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-06.jpg",
      "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-07.jpg"
    ],
    "leiras": "3D nyomtatott Jurassic Park lithophane (fényáteresztő) LED lámpa. A bekapcsolt LED megvilágítja a Jurassic Park jelenetet. USB táplálás. Tökéletes ajándék dínó rajongóknak! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Jurassic Park lithophane (fényáteresztő) LED lámpa. A bekapcsolt LED megvilágítja a Jurassic Park jelenetet. USB táplálás. Tökéletes ajándék dínó rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "f1-2026-versenynaptar",
    "nev": "F1 2026 versenynaptár",
    "cat": "rajongoi",
    "ar": 8000,
    "kepek": [
      "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-01.jpg",
      "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-02.jpg",
      "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-03.jpg",
      "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-04.jpg"
    ],
    "leiras": "3D nyomtatott Formula 1 2026-os szezon versenynaptár. Az összes 2026-os F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Formula 1 2026-os szezon versenynaptár. Az összes 2026-os F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.",
      "Részletek, amelyek számítanak. A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.",
      "Öröm adni és használni. Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 20–30 cm"
      ],
      [
        "Felület",
        "matt, részletgazdag"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "3d-tulipan-csokor",
    "nev": "3D tulipán csokor",
    "cat": "dekoraciok",
    "ar": 6000,
    "kepek": [
      "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-01.jpg",
      "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-02.jpg",
      "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-03.jpg",
      "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-04.jpg"
    ],
    "leiras": "3D nyomtatott tulipán virágcsokor. Örök szépségű virágcsokor, ami sosem hervad el! Különböző színekben elérhető. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott tulipán virágcsokor. Örök szépségű virágcsokor, ami sosem hervad el! Különböző színekben elérhető. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a darab természetközeli formát és modern 3D nyomtatott textúrát visz az otthonba. Polcon, komódon, étkezőasztalon vagy ablakpárkányon is könnyen elhelyezhető, és önmagában, illetve virággal vagy növénnyel együtt is dekoratív hatást kelt.",
      "Részletek, amelyek számítanak. A rétegezett felület közelről különleges részleteket mutat, távolabbról pedig egységes, rendezett sziluettet ad. Könnyű súlya miatt egyszerűen áthelyezhető, így az évszakhoz vagy az aktuális enteriőrhöz igazítva több helyiségben is használható.",
      "Öröm adni és használni. Ajándéknak is jó választás lakásavatóra, születésnapra vagy egy kedves, maradandó figyelmességként. Azoknak szól, akik a sablonos dekoráció helyett karakteres, kis szériás tárgyat szeretnének.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy könnyen kombinálható dekorációt keresel, amely melegebbé és személyesebbé teszi a környezetét anélkül, hogy túlzsúfolná azt."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 10–15 cm"
      ],
      [
        "Kivitel",
        "vízálló belső réteggel"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "szemuvegtarto",
    "nev": "Szemüvegtartó",
    "cat": "dekoraciok",
    "ar": 4000,
    "kepek": [
      "assets/kulcstartok/54-szemuvegtarto/54-szemuvegtarto-01.jpg",
      "assets/kulcstartok/54-szemuvegtarto/54-szemuvegtarto-02.jpg",
      "assets/kulcstartok/54-szemuvegtarto/54-szemuvegtarto-03.jpg"
    ],
    "leiras": "3D nyomtatott dekoratív szemüvegtartó. Praktikus és mutatós tárolás az asztalon. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott dekoratív szemüvegtartó. Praktikus és mutatós tárolás az asztalon. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a praktikus tárgy segít rendezettebben tartani a mindennap használt eszközöket, miközben dekoratív formájával nem kell elrejteni a fiókban. Íróasztalon, éjjeliszekrényen vagy előszobai komódon is kéznél tartja azt, amire szükséged van.",
      "Részletek, amelyek számítanak. A 3D nyomtatás lehetővé teszi a funkcióhoz igazított, karakteres formát, a könnyű PLA anyag pedig egyszerűen mozgatható és tisztán tartható. Praktikus megoldás azoknak, akik a használhatóság mellett a megjelenésre is figyelnek.",
      "Öröm adni és használni. Ajándéknak is ötletes, mert nem csupán dísz, hanem naponta használható figyelmesség. Otthoni munkasarokba, irodába vagy tanulóasztalra egyaránt jól illik.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha szeretnéd, hogy egy hétköznapi rutin rendezettebb, gyorsabb és egyben látványosabb legyen."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "egyedi"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "motoros-borostarto",
    "nev": "Motoros borostartó",
    "cat": "dekoraciok",
    "ar": 12000,
    "kepek": [
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-01.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-02.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-03.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-04.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-05.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-06.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-07.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-08.jpg",
      "assets/kulcstartok/55-motoros-borostarto/55-motoros-borostarto-09.jpg"
    ],
    "leiras": "3D nyomtatott motoros figurás bortartó/borostartó. A motor formájú tartó elegánsan tartja a borosüveget. Tökéletes ajándék motorosoknak és bor kedvelőknek! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott motoros figurás bortartó/borostartó. A motor formájú tartó elegánsan tartja a borosüveget. Tökéletes ajándék motorosoknak és bor kedvelőknek! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a borostartó egyszerre praktikus palacktartó és látványos asztali dekoráció. A karakteres forma kiemeli a belehelyezett borosüveget, így a palack nem egyszerűen tárolva van, hanem az ajándék vagy a teríték részeként jelenik meg.",
      "Részletek, amelyek számítanak. Jól mutat étkezőben, nappaliban, bárpulton vagy borospolcon, és különlegesebb megoldást kínál a hagyományos ajándéktasaknál. A 3D nyomtatott PLA részletes formavilágot tesz lehetővé, miközben a kialakítás standard borosüveg bemutatására alkalmas.",
      "Öröm adni és használni. Kiváló ajándék borrajongóknak és mindazoknak, akik szeretik a témához illő, beszélgetést indító lakásdekorációkat. A tartó önmagában is figyelemfelkeltő, egy gondosan kiválasztott palackkal együtt pedig teljes, átadható ajándékcsomaggá válik.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha a funkcionalitás mellett az első benyomás is fontos: ez a tartó azonnal fókuszba helyezi a palackot, és személyesebbé teszi az alkalmat."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 20 × 25 cm"
      ],
      [
        "Teherbírás",
        "standard borosüveg"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "bordazott-gomb-lampa",
    "nev": "Bordázott gömb lámpa",
    "cat": "lampak",
    "ar": 8000,
    "kepek": [
      "assets/kulcstartok/56-bordazott-gomb-lampa/56-bordazott-gomb-lampa-01.jpg"
    ],
    "leiras": "3D nyomtatott bordázott gömb alakú LED lámpa. Elegáns, modern design, hangulatos megvilágítás. USB táplálás. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott bordázott gömb alakú LED lámpa. Elegáns, modern design, hangulatos megvilágítás. USB táplálás. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "days-until-christmas-visszaszamlalo",
    "nev": "Days Until Christmas visszaszámláló",
    "cat": "szezonalis",
    "ar": 8000,
    "kepek": [
      "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-01.jpg",
      "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-02.jpg",
      "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-03.jpg",
      "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-04.jpg"
    ],
    "leiras": "3D nyomtatott \"Days Until Christmas\" karácsonyi visszaszámláló tábla cserélhető számokkal. Hangulatos karácsonyi dekoráció az egész adventi időszakra! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott \"Days Until Christmas\" karácsonyi visszaszámláló tábla cserélhető számokkal. Hangulatos karácsonyi dekoráció az egész adventi időszakra! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.",
      "Részletek, amelyek számítanak. A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.",
      "Öröm adni és használni. Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "egyedi"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "karacsonyi-falu-lampa",
    "nev": "Karácsonyi falu lámpa",
    "cat": "szezonalis",
    "ar": 15000,
    "kepek": [
      "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-01.jpg",
      "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-02.jpg",
      "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-03.jpg",
      "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-04.jpg"
    ],
    "leiras": "3D nyomtatott karácsonyi falu LED lámpa. Mesebeli karácsonyi falu megvilágítva, USB táplálással. Hangulatos karácsonyi dekoráció! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott karácsonyi falu LED lámpa. Mesebeli karácsonyi falu megvilágítva, USB táplálással. Hangulatos karácsonyi dekoráció! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "voronoi-szogletes-lampa",
    "nev": "Voronoi szögletes lámpa",
    "cat": "lampak",
    "ar": 10000,
    "kepek": [
      "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-01.jpg",
      "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-02.jpg",
      "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-03.jpg",
      "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-04.jpg"
    ],
    "leiras": "3D nyomtatott Voronoi mintás szögletes LED lámpa. A Voronoi geometrikus minta gyönyörű fényeffektust hoz létre. USB táplálás. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Voronoi mintás szögletes LED lámpa. A Voronoi geometrikus minta gyönyörű fényeffektust hoz létre. USB táplálás. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "csaladi-szobor",
    "nev": "Családi szobor",
    "cat": "dekoraciok",
    "ar": 8000,
    "kepek": [
      "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-01.jpg",
      "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-02.jpg",
      "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-03.jpg",
      "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-04.jpg"
    ],
    "leiras": "3D nyomtatott családi szobor figurák. Személyre szabható családi szobor, a család tagjainak számával megegyező figurákkal. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott családi szobor figurák. Személyre szabható családi szobor, a család tagjainak számával megegyező figurákkal. Tartós PLA anyagból készült.",
      "Miért jó választás? A szobor formája érzelmet és történetet visz a térbe. Polcon, komódon, íróasztalon vagy egy személyes emléksarok részeként is jól érvényesül, és kis mérete ellenére határozott hangulatot teremt.",
      "Részletek, amelyek számítanak. A 3D nyomtatott rétegek finom textúrát adnak a felületnek, a gondosan kialakított sziluett pedig több nézőpontból is érdekes. Könnyen elhelyezhető dekoráció, amely modern és otthonos enteriőrben egyaránt működik.",
      "Öröm adni és használni. Ajándékként ez a darab többet mond egy általános dísztárgynál: kapcsolódhat családhoz, szerelemhez, közös emlékhez vagy a megajándékozott kedvenc témájához. Születésnapra, évfordulóra vagy csak úgy, figyelmességként is maradandó választás.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes, személyes és könnyen szerethető dekorációt keresel, amely nap mint nap jelentést ad a környezetének."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 10–20 cm"
      ],
      [
        "Kivitel",
        "egyszínű vagy többszínű"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "szarvas-shadow-box-lampa",
    "nev": "Szarvas Shadow Box lámpa",
    "cat": "lampak",
    "ar": 15000,
    "kepek": [
      "assets/kulcstartok/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-01.jpg",
      "assets/kulcstartok/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-02.jpg",
      "assets/kulcstartok/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-03.jpg"
    ],
    "leiras": "3D nyomtatott szarvas shadow box (árnyékdoboz) LED lámpa. A szarvas sziluettje gyönyörű árnyékot vet. USB táplálás. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott szarvas shadow box (árnyékdoboz) LED lámpa. A szarvas sziluettje gyönyörű árnyékot vet. USB táplálás. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "baba-elefant-szuletesi-lampa",
    "nev": "Baba elefánt születési lámpa",
    "cat": "baba-gyerek",
    "ar": 12000,
    "kepek": [
      "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-01.jpg",
      "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-02.jpg",
      "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-03.jpg",
      "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-04.jpg",
      "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-05.jpg",
      "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-06.jpg"
    ],
    "leiras": "3D nyomtatott baba elefánt születési emlék LED lámpa. Személyre szabható a baba nevével, születési adataival. Gyönyörű ajándék újszülöttnek! USB táplálás. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott baba elefánt születési emlék LED lámpa. Személyre szabható a baba nevével, születési adataival. Gyönyörű ajándék újszülöttnek! USB táplálás. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "szarvas-borostarto",
    "nev": "Szarvas borostartó",
    "cat": "dekoraciok",
    "ar": 10000,
    "kepek": [
      "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-01.jpg",
      "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-02.jpg",
      "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-03.jpg",
      "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-04.jpg"
    ],
    "leiras": "3D nyomtatott szarvas formájú bortartó/borostartó. A szarvas agancsai elegánsan tartják a borosüveget. Tökéletes ajándék vadász és bor kedvelőknek! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott szarvas formájú bortartó/borostartó. A szarvas agancsai elegánsan tartják a borosüveget. Tökéletes ajándék vadász és bor kedvelőknek! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a borostartó egyszerre praktikus palacktartó és látványos asztali dekoráció. A karakteres forma kiemeli a belehelyezett borosüveget, így a palack nem egyszerűen tárolva van, hanem az ajándék vagy a teríték részeként jelenik meg.",
      "Részletek, amelyek számítanak. Jól mutat étkezőben, nappaliban, bárpulton vagy borospolcon, és különlegesebb megoldást kínál a hagyományos ajándéktasaknál. A 3D nyomtatott PLA részletes formavilágot tesz lehetővé, miközben a kialakítás standard borosüveg bemutatására alkalmas.",
      "Öröm adni és használni. Kiváló ajándék borrajongóknak és mindazoknak, akik szeretik a témához illő, beszélgetést indító lakásdekorációkat. A tartó önmagában is figyelemfelkeltő, egy gondosan kiválasztott palackkal együtt pedig teljes, átadható ajándékcsomaggá válik.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha a funkcionalitás mellett az első benyomás is fontos: ez a tartó azonnal fókuszba helyezi a palackot, és személyesebbé teszi az alkalmat."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 20 × 25 cm"
      ],
      [
        "Teherbírás",
        "standard borosüveg"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "karacsonyi-fenyofa-lampa",
    "nev": "Karácsonyi fenyőfa lámpa",
    "cat": "szezonalis",
    "ar": 15000,
    "kepek": [
      "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-01.jpg",
      "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-02.jpg",
      "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-03.jpg",
      "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-04.jpg"
    ],
    "leiras": "3D nyomtatott karácsonyi fenyőfa és templom LED lámpa. Mesebeli karácsonyi jelenet megvilágítva. USB táplálás. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott karácsonyi fenyőfa és templom LED lámpa. Mesebeli karácsonyi jelenet megvilágítva. USB táplálás. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "lord-of-the-rings-plakat-tabla",
    "nev": "Lord of the Rings plakát tábla",
    "cat": "dekoraciok",
    "ar": 8000,
    "kepek": [
      "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-01.jpg",
      "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-02.jpg",
      "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-03.jpg",
      "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-04.jpg"
    ],
    "leiras": "3D nyomtatott Lord of the Rings (Gyűrűk Ura) plakát tábla. Részletes dombornyomott design. Tökéletes ajándék Tolkien rajongóknak! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Lord of the Rings (Gyűrűk Ura) plakát tábla. Részletes dombornyomott design. Tökéletes ajándék Tolkien rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.",
      "Részletek, amelyek számítanak. A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.",
      "Öröm adni és használni. Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 20–30 cm"
      ],
      [
        "Felület",
        "matt, részletgazdag"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "oszi-leveles-tal",
    "nev": "Őszi leveles tál",
    "cat": "szezonalis",
    "ar": 5000,
    "kepek": [
      "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-01.jpg",
      "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-02.jpg",
      "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-03.jpg",
      "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-04.jpg"
    ],
    "leiras": "3D nyomtatott őszi leveles dombornyomott dekoratív tál. Gyönyörű őszi leveles mintázattal, különböző színekben. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott őszi leveles dombornyomott dekoratív tál. Gyönyörű őszi leveles mintázattal, különböző színekben. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a karakteres 3D nyomtatott dekoráció kis részletekkel teszi személyesebbé az otthont. Polcon, komódon, asztalon vagy egy tematikus összeállítás részeként is könnyen elhelyezhető.",
      "Részletek, amelyek számítanak. A rétegről rétegre felépített forma közelről izgalmas textúrát, távolabbról egységes sziluettet mutat. A könnyű PLA anyag praktikus, a tárgy pedig egyszerűen áthelyezhető, amikor új hangulatot szeretnél teremteni.",
      "Öröm adni és használni. Ajándéknak is jó választás, mert nem tömegtermék-hatású, hanem egy konkrét érdeklődéshez, alkalomhoz vagy enteriőrhöz kapcsolódik. Születésnapra, ünnepre, lakásavatóra vagy kedves meglepetésként is örömet szerezhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy látványos, mégis könnyen kombinálható darabot keresel, amely több személyiséget visz a helyiségbe."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "egyedi"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "leveles-viragtarto",
    "nev": "Leveles virágtartó",
    "cat": "dekoraciok",
    "ar": 5000,
    "kepek": [
      "assets/kulcstartok/67-leveles-viragtarto/67-leveles-viragtarto-01.jpg",
      "assets/kulcstartok/67-leveles-viragtarto/67-leveles-viragtarto-02.jpg",
      "assets/kulcstartok/67-leveles-viragtarto/67-leveles-viragtarto-03.jpg"
    ],
    "leiras": "3D nyomtatott leveles mintás dekoratív virágtartó kaspó. Terrakotta hatású, természetes megjelenés. Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott leveles mintás dekoratív virágtartó kaspó. Terrakotta hatású, természetes megjelenés. Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a darab természetközeli formát és modern 3D nyomtatott textúrát visz az otthonba. Polcon, komódon, étkezőasztalon vagy ablakpárkányon is könnyen elhelyezhető, és önmagában, illetve virággal vagy növénnyel együtt is dekoratív hatást kelt.",
      "Részletek, amelyek számítanak. A rétegezett felület közelről különleges részleteket mutat, távolabbról pedig egységes, rendezett sziluettet ad. Könnyű súlya miatt egyszerűen áthelyezhető, így az évszakhoz vagy az aktuális enteriőrhöz igazítva több helyiségben is használható.",
      "Öröm adni és használni. Ajándéknak is jó választás lakásavatóra, születésnapra vagy egy kedves, maradandó figyelmességként. Azoknak szól, akik a sablonos dekoráció helyett karakteres, kis szériás tárgyat szeretnének.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy könnyen kombinálható dekorációt keresel, amely melegebbé és személyesebbé teszi a környezetét anélkül, hogy túlzsúfolná azt."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 10–15 cm"
      ],
      [
        "Kivitel",
        "vízálló belső réteggel"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "f1-2025-versenynaptar",
    "nev": "F1 2025 versenynaptár",
    "cat": "rajongoi",
    "ar": 8000,
    "kepek": [
      "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-01.jpg",
      "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-02.jpg",
      "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-03.jpg",
      "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-04.jpg",
      "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-05.jpg",
      "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-06.jpg"
    ],
    "leiras": "3D nyomtatott Formula 1 2025-ös szezon versenynaptár. Az összes 2025-ös F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Formula 1 2025-ös szezon versenynaptár. Az összes 2025-ös F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.",
      "Részletek, amelyek számítanak. A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.",
      "Öröm adni és használni. Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 20–30 cm"
      ],
      [
        "Felület",
        "matt, részletgazdag"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "stitch-nevtabla-lampa",
    "nev": "Stitch névtábla lámpa",
    "cat": "baba-gyerek",
    "ar": 10000,
    "kepek": [
      "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-01.jpg",
      "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-02.jpg",
      "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-03.jpg",
      "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-04.jpg",
      "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-05.jpg",
      "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-06.jpg"
    ],
    "leiras": "3D nyomtatott Stitch figurás személyre szabható névtábla LED lámpa. A gyerek neve világít a Stitch figura mellett! USB táplálás. Tökéletes ajándék Disney rajongó gyerekeknek! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott Stitch figurás személyre szabható névtábla LED lámpa. A gyerek neve világít a Stitch figura mellett! USB táplálás. Tökéletes ajándék Disney rajongó gyerekeknek! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.",
      "Részletek, amelyek számítanak. Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.",
      "Öröm adni és használni. Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 15–25 cm"
      ],
      [
        "Világítás",
        "meleg fehér LED, USB"
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "olelkezo-par-szobor",
    "nev": "Ölelkező pár szobor",
    "cat": "dekoraciok",
    "ar": 6000,
    "kepek": [
      "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-01.jpg",
      "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-02.jpg",
      "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-03.jpg",
      "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-04.jpg"
    ],
    "leiras": "3D nyomtatott ölelkező pár szobor. Romantikus dekoráció, tökéletes Valentin-napi vagy évfordulós ajándék! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott ölelkező pár szobor. Romantikus dekoráció, tökéletes Valentin-napi vagy évfordulós ajándék! Tartós PLA anyagból készült.",
      "Miért jó választás? A szobor formája érzelmet és történetet visz a térbe. Polcon, komódon, íróasztalon vagy egy személyes emléksarok részeként is jól érvényesül, és kis mérete ellenére határozott hangulatot teremt.",
      "Részletek, amelyek számítanak. A 3D nyomtatott rétegek finom textúrát adnak a felületnek, a gondosan kialakított sziluett pedig több nézőpontból is érdekes. Könnyen elhelyezhető dekoráció, amely modern és otthonos enteriőrben egyaránt működik.",
      "Öröm adni és használni. Ajándékként ez a darab többet mond egy általános dísztárgynál: kapcsolódhat családhoz, szerelemhez, közös emlékhez vagy a megajándékozott kedvenc témájához. Születésnapra, évfordulóra vagy csak úgy, figyelmességként is maradandó választás.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy beszédes, személyes és könnyen szerethető dekorációt keresel, amely nap mint nap jelentést ad a környezetének."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "kb. 10–20 cm"
      ],
      [
        "Kivitel",
        "egyszínű vagy többszínű"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  },
  {
    "id": "sziv-ekg-dekor",
    "nev": "Szív EKG dekor",
    "cat": "dekoraciok",
    "ar": 4000,
    "kepek": [
      "assets/kulcstartok/71-sziv-ekg-dekor/71-sziv-ekg-dekor-01.jpg",
      "assets/kulcstartok/71-sziv-ekg-dekor/71-sziv-ekg-dekor-02.jpg",
      "assets/kulcstartok/71-sziv-ekg-dekor/71-sziv-ekg-dekor-03.jpg"
    ],
    "leiras": "3D nyomtatott szív EKG (szívverés) vonalú dekoráció. Romantikus ajándék pároknak, orvosoknak, nővéreknek! Tartós PLA anyagból készült.",
    "hosszu": [
      "3D nyomtatott szív EKG (szívverés) vonalú dekoráció. Romantikus ajándék pároknak, orvosoknak, nővéreknek! Tartós PLA anyagból készült.",
      "Miért jó választás? Ez a karakteres 3D nyomtatott dekoráció kis részletekkel teszi személyesebbé az otthont. Polcon, komódon, asztalon vagy egy tematikus összeállítás részeként is könnyen elhelyezhető.",
      "Részletek, amelyek számítanak. A rétegről rétegre felépített forma közelről izgalmas textúrát, távolabbról egységes sziluettet mutat. A könnyű PLA anyag praktikus, a tárgy pedig egyszerűen áthelyezhető, amikor új hangulatot szeretnél teremteni.",
      "Öröm adni és használni. Ajándéknak is jó választás, mert nem tömegtermék-hatású, hanem egy konkrét érdeklődéshez, alkalomhoz vagy enteriőrhöz kapcsolódik. Születésnapra, ünnepre, lakásavatóra vagy kedves meglepetésként is örömet szerezhet.",
      "Tedd személyesebbé a mindennapokat. Válaszd, ha egy látványos, mégis könnyen kombinálható darabot keresel, amely több személyiséget visz a helyiségbe."
    ],
    "opciok": [],
    "specs": [
      [
        "Anyag",
        "PLA biopolimer"
      ],
      [
        "Méret",
        "egyedi"
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true
  }
]);
