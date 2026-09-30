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
    specs: [['Anyag', 'PLA biopolimer, matt felület'], ['Méret', 'kb. 18 × 20 cm (Közepes)'], ['Világítás', 'meleg fehér LED, USB'], ['Kapcsoló', 'érintős, a talpban'], ['Személyre szabás', 'szám, név, sportág, póz']] },
  { id: 'programozo-lampa',    nev: 'Programozó kör-lámpa',          cat: 'lampak',      ar: 219, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0018.webp', 'assets/termekvilag/hero_slider/layero-asset-0009.webp'],
    leiras: 'Egyedi névvel és üzenettel gravírozott, áramkör-mintás világító dekoráció a jövő informatikusának.',
    hosszu: [
      'Ballagásra, diplomára vagy első munkanapra: a programozó kör-lámpa egy teljes kis világot rajzol fénybe — monitorok előtt ülő alak, szerverek, áramkör-minták, és középen a saját kódsorod: Név = "…", Üzenet = "…".',
      'A szöveg tetszőlegesen átírható, így ugyanez a design működik mérnöknek, gamernek vagy bárkinek, akinek a képernyő a második otthona. A kétrétegű előlap nappal is szép kontrasztot ad, este pedig a meleg háttérfény emeli ki a részleteket.'
    ],
    specs: [['Anyag', 'PLA biopolimer'], ['Átmérő', 'kb. 20 cm'], ['Világítás', 'meleg fehér LED, USB'], ['Személyre szabás', 'név + egyedi üzenet']] },
  { id: 'jurassic-lampa',      nev: 'Dínós henger-lámpa névvel',     cat: 'lampak',      ar: 199, regi_ar: 249, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0011.webp', 'assets/termekvilag/hero_slider/layero-asset-0017.webp'],
    leiras: 'Kőmintás felületű, névre szóló henger-lámpa dinós motívummal — a gyerekszoba kedvence.',
    hosszu: [
      'A henger-lámpa különlegessége a litofán technika: a fal vastagságának változása rajzolja ki a képet, így kikapcsolva egyszerű kőmintás hengert látsz, bekapcsolva viszont előtűnik a teljes dinós jelenet és a név.',
      'Éjszakai fénynek is tökéletes: a meleg, szűrt fény nem vakít, a gyerekszobában pont annyi világosságot ad, amennyi az elalváshoz kell. A név betűtípusa a témához illeszkedik, és bármilyen névvel kérhető.'
    ],
    specs: [['Anyag', 'PLA, litofán technika'], ['Méret', 'kb. 11 × 19 cm'], ['Világítás', 'meleg fehér LED, USB'], ['Személyre szabás', 'név, motívum']] },
  { id: 'hullam-gomblampa',    nev: 'Hullám asztali lámpa',          cat: 'lampak',      ar: 249, regi_ar: 299, badge: 'Új', szemelyre_szabott: false, visszakuldheto: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0016.webp', 'assets/termekvilag/hero_slider/layero-asset-0019.webp'],
    leiras: 'Organikus, csavart bordázatú lámpabúra fa lábakon, meleg fényű LED-del — skandináv hangulat bármelyik szobába.',
    hosszu: [
      'A hullám lámpa nem személyre szabott darab, hanem designtárgy: a csavart bordázat úgy szórja szét a fényt, hogy a búra teljes felülete egyenletesen izzik, árnyékjáték nélkül. Nappali dohányzóasztalra, hálószoba éjjeliszekrényére vagy dolgozósarokba egyaránt illik.',
      'A tömörfa hatású lábak és a matt búra kellemesen semleges párost alkotnak, így bármilyen belső térhez passzol — a skandináv minimáltól az indusztriálig.'
    ],
    specs: [['Anyag', 'PLA búra, fa hatású láb'], ['Méret', 'kb. 22 × 30 cm'], ['Világítás', 'E14 foglalat, LED izzóval'], ['Kapcsoló', 'vezetéken']] },
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
    specs: [['Anyag', 'PLA biopolimer'], ['Méret', '3 méretben (16 / 20 / 26 cm)'], ['Világítás', 'rejtett LED-sor, USB'], ['Személyre szabás', 'motívum cserélhető']] },

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
    specs: [['Anyag', 'PETG'], ['Tartalom', '6 db, egyedi nevekkel'], ['Bővíthető', 'igen, darabonként'], ['Személyre szabás', 'forma, szín, nevek']] },

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
    specs: [['Anyag', 'PLA, kő hatású felület'], ['Méret', 'kb. 28 × 20 cm'], ['Terhelhetőség', 'standard 0,75 l palack'], ['Gravírozás', 'név / dátum kérhető a talpra']] },
  { id: 'eletfa-mecses-szett', nev: 'Életfa mécses-szett (1–10)',    cat: 'dekoraciok',  ar: 179, szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0014.webp', 'assets/termekvilag/hero_slider/layero-asset-0020.webp'],
    leiras: 'Tíz mécsestartó, amin egy fa nő évről évre — évfordulóra, születésnapokra, vagy adventi visszaszámláláshoz.',
    hosszu: [
      'Az életfa szett tíz mécsestartóból áll: az elsőn még csak egy hajtás, a tizediken terebélyes lombkorona — a fa évről évre nő, ahogy a kapcsolatotok, a gyerek vagy a vállalkozás is. Minden évfordulón eggyel több mécses kerül az asztalra.',
      'LED-es teamécsessel és hagyományos mécsessel is használható. A számok helyére évszámok vagy nevek is kérhetők, így emléktárgyból akár családi rituálé is lehet.'
    ],
    specs: [['Anyag', 'PLA, hőálló betéttel'], ['Tartalom', '10 db mécsestartó'], ['Mécses', 'LED és gyertya is'], ['Személyre szabás', 'számok / évszámok / nevek']] },

  /* ── Céges megoldások ── */
  { id: 'qr-nfc-display',      nev: 'QR + NFC asztali display',      cat: 'ceges',       ar: 179, regi_ar: 219, badge: 'B2B kedvenc', szemelyre_szabott: true,
    kepek: ['assets/termekvilag/hero_slider/layero-asset-0022.webp', 'assets/termekvilag/hero_slider/layero-asset-0027.webp'],
    leiras: 'Étlap, Google-értékelés vagy weboldal egy érintésre: asztali display beépített NFC chippel és QR kóddal — a te logóddal.',
    hosszu: [
      'A vendég odaérinti a telefonját — és már nyílik is az étlap, a foglalási oldal vagy a Google-értékelő felület. A displaybe NFC chip kerül, a nyomtatott QR kód pedig a régebbi telefonokon is működik. Nincs matrica, nincs kopás: a kód és a felirat a tárgy részeként, domborítva készül.',
      'Referencia: a Bázis Bisztró asztalain két hét alatt megduplázta a beérkező Google-értékelések számát. Étterembe, kávézóba, szépségszalonba, rendelőbe — mindenhova, ahol az ügyfél vár valamire, és közben a kezében a telefon.',
      'Az ár egy darabra vonatkozik, teljes arculati testreszabással. Több asztalos szettekre mennyiségi kedvezményt adunk.'
    ],
    specs: [['Anyag', 'PLA/PETG, domborított grafika'], ['Méret', 'kb. 12 × 18 cm'], ['NFC', 'programozott chip, cserélhető cél-URL'], ['QR', 'domborított, kopásálló'], ['Testreszabás', 'logó, színek, felirat']] },
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
    specs: [['Anyag', 'PLA, többszínű nyomtatás'], ['Magasság', 'kb. 18 cm talapzattal'], ['Felirat', 'szabad szöveg, 3 sor'], ['Bojt színe', 'választható']] },
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
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-05.jpg"
    ],
    "leiras": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kontrasztos oroszlánmotívum és a Peugeot felirat jól kivehető a sötét alapon. Autókulcs mellé vagy egy Peugeot-rajongónak szánt apró ajándékként is találó választás.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Peugeot logós kulcstartó | Layero",
      "meta_leiras": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "peugeot-logos-kulcstarto",
      "kozossegi_cim": "Peugeot logós kulcstartó",
      "kozossegi_leiras": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Peugeot logós kulcstartó",
      "description": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-001",
      "image": [
        "/images/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-03.jpg",
        "/images/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-04.jpg",
        "/images/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-05.jpg"
      ],
      "url": "https://layero.ro/termek/peugeot-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/peugeot-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-001",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Peugeot logós kulcstartó",
        "slug": "peugeot-logos-kulcstarto",
        "short_description": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kontrasztos oroszlánmotívum és a Peugeot felirat jól kivehető a sötét alapon. Autókulcs mellé vagy egy Peugeot-rajongónak szánt apró ajándékként is találó választás.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Peugeot logós kulcstartó | Layero",
        "meta_description": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Peugeot logós kulcstartó",
        "social_description": "Fekete, pajzs alakú kulcstartó fehér Peugeot-oroszlánnal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/01-peugeot-logos-kulcstarto/01-peugeot-logos-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "volkswagen-logos-kulcstarto",
    "nev": "Volkswagen logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-05.jpg"
    ],
    "leiras": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A körbe foglalt VW jel egyszerű, jól felismerhető mintát ad ennek a kulcstartónak. A fekete alap és a fehér vonalak az autókulcs mellett is visszafogottan mutatnak.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Volkswagen logós kulcstartó | Layero",
      "meta_leiras": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "volkswagen-logos-kulcstarto",
      "kozossegi_cim": "Volkswagen logós kulcstartó",
      "kozossegi_leiras": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Volkswagen logós kulcstartó",
      "description": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-002",
      "image": [
        "/images/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-03.jpg",
        "/images/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-04.jpg",
        "/images/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-05.jpg"
      ],
      "url": "https://layero.ro/termek/volkswagen-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/volkswagen-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-002",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Volkswagen logós kulcstartó",
        "slug": "volkswagen-logos-kulcstarto",
        "short_description": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A körbe foglalt VW jel egyszerű, jól felismerhető mintát ad ennek a kulcstartónak. A fekete alap és a fehér vonalak az autókulcs mellett is visszafogottan mutatnak.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Volkswagen logós kulcstartó | Layero",
        "meta_description": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Volkswagen logós kulcstartó",
        "social_description": "Kerek Volkswagen kulcstartó fekete-fehér VW emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/02-volkswagen-logos-kulcstarto/02-volkswagen-logos-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "ferrari-logos-kulcstarto",
    "nev": "Ferrari logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-05.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-06.jpg",
      "assets/kulcstartok/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-08.jpg"
    ],
    "leiras": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sárga alapon megjelenő fekete ló és a Ferrari felirat a sportautók világát idézi. Téglalap alakú függő, amely színes részletet visz a kulcscsomóra vagy a táskára.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Ferrari logós kulcstartó | Layero",
      "meta_leiras": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "ferrari-logos-kulcstarto",
      "kozossegi_cim": "Ferrari logós kulcstartó",
      "kozossegi_leiras": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Ferrari logós kulcstartó",
      "description": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-003",
      "image": [
        "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-03.jpg",
        "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-04.jpg",
        "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-05.jpg",
        "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-06.jpg",
        "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-08.jpg"
      ],
      "url": "https://layero.ro/termek/ferrari-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/ferrari-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-003",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Ferrari logós kulcstartó",
        "slug": "ferrari-logos-kulcstarto",
        "short_description": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sárga alapon megjelenő fekete ló és a Ferrari felirat a sportautók világát idézi. Téglalap alakú függő, amely színes részletet visz a kulcscsomóra vagy a táskára.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Ferrari logós kulcstartó | Layero",
        "meta_description": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Ferrari logós kulcstartó",
        "social_description": "Sárga-fekete Ferrari kulcstartó ágaskodó lovas motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/03-ferrari-logos-kulcstarto/03-ferrari-logos-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "roblox-robux-logos-kulcstarto",
    "nev": "Roblox (Robux) logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sárga keret és a középen látható, elfordított négyzetes jel a Robux motívumát idézi. A tömör, hatszögletű forma gamer táskán és kulcscsomón egyaránt jól érvényesül.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Roblox (Robux) logós kulcstartó | Layero",
      "meta_leiras": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "roblox-robux-logos-kulcstarto",
      "kozossegi_cim": "Roblox (Robux) logós kulcstartó",
      "kozossegi_leiras": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Roblox (Robux) logós kulcstartó",
      "description": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-004",
      "image": [
        "/images/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-01.jpg",
        "/images/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-02.jpg",
        "/images/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/roblox-robux-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/roblox-robux-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-004",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Roblox (Robux) logós kulcstartó",
        "slug": "roblox-robux-logos-kulcstarto",
        "short_description": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sárga keret és a középen látható, elfordított négyzetes jel a Robux motívumát idézi. A tömör, hatszögletű forma gamer táskán és kulcscsomón egyaránt jól érvényesül.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Roblox (Robux) logós kulcstartó | Layero",
        "meta_description": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Roblox (Robux) logós kulcstartó",
        "social_description": "Fekete-arany hatású, hatszögletű Roblox/Robux mintás kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/04-roblox-logos-kulcstarto/04-roblox-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "skoda-logos-kulcstarto",
    "nev": "Škoda logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-05.jpg",
      "assets/kulcstartok/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-06.jpg"
    ],
    "leiras": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A fekete keretben megjelenő zöld jel adja ennek az autós kulcstartónak a karakterét. Jó apróság egy Škoda tulajdonosának, akár a mindennap használt autókulcs mellé.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Škoda logós kulcstartó | Layero",
      "meta_leiras": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "skoda-logos-kulcstarto",
      "kozossegi_cim": "Škoda logós kulcstartó",
      "kozossegi_leiras": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-04.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Škoda logós kulcstartó",
      "description": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-005",
      "image": [
        "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-04.jpg",
        "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-01.jpg",
        "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-02.jpg",
        "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-03.jpg",
        "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-05.jpg",
        "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-06.jpg"
      ],
      "url": "https://layero.ro/termek/skoda-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/skoda-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-005",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Škoda logós kulcstartó",
        "slug": "skoda-logos-kulcstarto",
        "short_description": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A fekete keretben megjelenő zöld jel adja ennek az autós kulcstartónak a karakterét. Jó apróság egy Škoda tulajdonosának, akár a mindennap használt autókulcs mellé.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Škoda logós kulcstartó | Layero",
        "meta_description": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Škoda logós kulcstartó",
        "social_description": "Kerek Škoda kulcstartó zöld, szárnyas nyíl motívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/05-skoda-logos-kulcstarto/05-skoda-logos-kulcstarto-04.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "bmw-logos-kulcstarto",
    "nev": "BMW logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-02.jpg"
    ],
    "leiras": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A négy részre osztott kék-fehér minta és a BMW felirat azonnal felismerhetővé teszi a függőt. Visszafogott autós kiegészítő saját kulcscsomóra vagy ajándékba.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "BMW logós kulcstartó | Layero",
      "meta_leiras": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "bmw-logos-kulcstarto",
      "kozossegi_cim": "BMW logós kulcstartó",
      "kozossegi_leiras": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "BMW logós kulcstartó",
      "description": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-006",
      "image": [
        "/images/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-03.jpg",
        "/images/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-01.jpg",
        "/images/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/bmw-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/bmw-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-006",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "BMW logós kulcstartó",
        "slug": "bmw-logos-kulcstarto",
        "short_description": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A négy részre osztott kék-fehér minta és a BMW felirat azonnal felismerhetővé teszi a függőt. Visszafogott autós kiegészítő saját kulcscsomóra vagy ajándékba.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "BMW logós kulcstartó | Layero",
        "meta_description": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "BMW logós kulcstartó",
        "social_description": "Kerek BMW kulcstartó kék-fehér középrésszel és fekete szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/06-bmw-logos-kulcstarto/06-bmw-logos-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "toyota-logos-kulcstarto",
    "nev": "Toyota logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-03.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-04.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-05.jpg",
      "assets/kulcstartok/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-06.jpg"
    ],
    "leiras": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A fehér Toyota jel élénken kirajzolódik a piros alapon. Az ovális függő egyszerű módja annak, hogy a kulcscsomón is visszaköszönjön a kedvenc autómárka.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Toyota logós kulcstartó | Layero",
      "meta_leiras": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "toyota-logos-kulcstarto",
      "kozossegi_cim": "Toyota logós kulcstartó",
      "kozossegi_leiras": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Toyota logós kulcstartó",
      "description": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-007",
      "image": [
        "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-01.jpg",
        "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-02.jpg",
        "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-03.jpg",
        "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-04.jpg",
        "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-05.jpg",
        "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-06.jpg"
      ],
      "url": "https://layero.ro/termek/toyota-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/toyota-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-007",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Toyota logós kulcstartó",
        "slug": "toyota-logos-kulcstarto",
        "short_description": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A fehér Toyota jel élénken kirajzolódik a piros alapon. Az ovális függő egyszerű módja annak, hogy a kulcscsomón is visszaköszönjön a kedvenc autómárka.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Toyota logós kulcstartó | Layero",
        "meta_description": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Toyota logós kulcstartó",
        "social_description": "Piros, ovális Toyota kulcstartó fehér emblémával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/07-toyota-logos-kulcstarto/07-toyota-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "ford-logos-kulcstarto",
    "nev": "Ford logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A klasszikus kék-fehér színpár és az ovális forma teszi ismerőssé ezt a Ford-mintás darabot. Autókulcshoz illő apró kiegészítő, amely ajándékként is könnyen személyessé válik.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Ford logós kulcstartó | Layero",
      "meta_leiras": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "ford-logos-kulcstarto",
      "kozossegi_cim": "Ford logós kulcstartó",
      "kozossegi_leiras": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Ford logós kulcstartó",
      "description": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-008",
      "image": [
        "/images/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-01.jpg",
        "/images/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-02.jpg",
        "/images/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/ford-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/ford-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-008",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Ford logós kulcstartó",
        "slug": "ford-logos-kulcstarto",
        "short_description": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A klasszikus kék-fehér színpár és az ovális forma teszi ismerőssé ezt a Ford-mintás darabot. Autókulcshoz illő apró kiegészítő, amely ajándékként is könnyen személyessé válik.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Ford logós kulcstartó | Layero",
        "meta_description": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Ford logós kulcstartó",
        "social_description": "Kék, ovális Ford kulcstartó fehér felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/08-ford-logos-kulcstarto/08-ford-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "audi-logos-kulcstarto",
    "nev": "Audi logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sötét alapon a négy összekapcsolódó karika és a piros Audi felirat kap hangsúlyt. Letisztult motívum az autókulcs mellé, Audi-rajongóknak.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Audi logós kulcstartó | Layero",
      "meta_leiras": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "audi-logos-kulcstarto",
      "kozossegi_cim": "Audi logós kulcstartó",
      "kozossegi_leiras": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Audi logós kulcstartó",
      "description": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-009",
      "image": [
        "/images/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-01.jpg",
        "/images/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-02.jpg",
        "/images/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/audi-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/audi-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-009",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Audi logós kulcstartó",
        "slug": "audi-logos-kulcstarto",
        "short_description": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sötét alapon a négy összekapcsolódó karika és a piros Audi felirat kap hangsúlyt. Letisztult motívum az autókulcs mellé, Audi-rajongóknak.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Audi logós kulcstartó | Layero",
        "meta_description": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Audi logós kulcstartó",
        "social_description": "Audi kulcstartó négy fehér karikával és piros felirattal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/09-audi-logos-kulcstarto/09-audi-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "f1-logos-kulcstarto",
    "nev": "F1 logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A lendületes F1 motívumot a piros és fekete felületek kontrasztja emeli ki. Kis méretű emlék a versenyhétvégék hangulatából, kulcsra vagy táskára akasztva.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "F1 logós kulcstartó | Layero",
      "meta_leiras": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "f1-logos-kulcstarto",
      "kozossegi_cim": "F1 logós kulcstartó",
      "kozossegi_leiras": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "F1 logós kulcstartó",
      "description": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-010",
      "image": [
        "/images/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-01.jpg",
        "/images/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-02.jpg",
        "/images/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/f1-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/f1-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-010",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "F1 logós kulcstartó",
        "slug": "f1-logos-kulcstarto",
        "short_description": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A lendületes F1 motívumot a piros és fekete felületek kontrasztja emeli ki. Kis méretű emlék a versenyhétvégék hangulatából, kulcsra vagy táskára akasztva.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "F1 logós kulcstartó | Layero",
        "meta_description": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "F1 logós kulcstartó",
        "social_description": "Piros-fekete F1 logós kulcstartó az autósport kedvelőinek. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/10-f1-logos-kulcstarto/10-f1-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "fc-barcelona-kulcstarto",
    "nev": "FC Barcelona kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-01.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-02.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-03.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-04.jpg",
      "assets/kulcstartok/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-05.jpg"
    ],
    "leiras": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A pajzs alakú függőn a klub címerének mezői és a labdamotívum is megjelenik. Szurkolói apróság, amely a hétköznapokban is helyet kaphat a kulcscsomón.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "FC Barcelona kulcstartó | Layero",
      "meta_leiras": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "fc-barcelona-kulcstarto",
      "kozossegi_cim": "FC Barcelona kulcstartó",
      "kozossegi_leiras": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "FC Barcelona kulcstartó",
      "description": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-011",
      "image": [
        "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-01.jpg",
        "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-02.jpg",
        "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-03.jpg",
        "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-04.jpg",
        "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-05.jpg"
      ],
      "url": "https://layero.ro/termek/fc-barcelona-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/fc-barcelona-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-011",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "FC Barcelona kulcstartó",
        "slug": "fc-barcelona-kulcstarto",
        "short_description": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A pajzs alakú függőn a klub címerének mezői és a labdamotívum is megjelenik. Szurkolói apróság, amely a hétköznapokban is helyet kaphat a kulcscsomón.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "FC Barcelona kulcstartó | Layero",
        "meta_description": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "FC Barcelona kulcstartó",
        "social_description": "FC Barcelona címeres kulcstartó kék, bordó és sárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/11-fc-barcelona-kulcstarto/11-fc-barcelona-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "real-madrid-kulcstarto",
    "nev": "Real Madrid kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-03.jpg",
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-01.jpg",
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-02.jpg",
      "assets/kulcstartok/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-04.jpg"
    ],
    "leiras": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A koronás címer és a kék átlós sáv adja a függő jellegzetes megjelenését. Real Madrid-szurkolónak szánt kisebb ajándékhoz vagy saját kulcscsomóra is illik.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Real Madrid kulcstartó | Layero",
      "meta_leiras": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "real-madrid-kulcstarto",
      "kozossegi_cim": "Real Madrid kulcstartó",
      "kozossegi_leiras": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Real Madrid kulcstartó",
      "description": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-012",
      "image": [
        "/images/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-03.jpg",
        "/images/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-01.jpg",
        "/images/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-02.jpg",
        "/images/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-04.jpg"
      ],
      "url": "https://layero.ro/termek/real-madrid-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/real-madrid-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-012",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Real Madrid kulcstartó",
        "slug": "real-madrid-kulcstarto",
        "short_description": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A koronás címer és a kék átlós sáv adja a függő jellegzetes megjelenését. Real Madrid-szurkolónak szánt kisebb ajándékhoz vagy saját kulcscsomóra is illik.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Real Madrid kulcstartó | Layero",
        "meta_description": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Real Madrid kulcstartó",
        "social_description": "Real Madrid címeres kulcstartó koronával, fehér és aranysárga részletekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/12-real-madrid-kulcstarto/12-real-madrid-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "hello-kitty-kulcstarto",
    "nev": "Hello Kitty kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/13-hello-kitty-kulcstarto/13-hello-kitty-kulcstarto-04.jpg"
    ],
    "leiras": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A karakter kontúrját követő függőn a masni, a bajuszvonalak és az apró orr is jól látszik. Kedves, színes részlet egy táskán vagy a mindennapi kulcsok mellett.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Hello Kitty kulcstartó | Layero",
      "meta_leiras": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "hello-kitty-kulcstarto",
      "kozossegi_cim": "Hello Kitty kulcstartó",
      "kozossegi_leiras": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/13-hello-kitty-kulcstarto/13-hello-kitty-kulcstarto-04.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Hello Kitty kulcstartó",
      "description": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-013",
      "image": [
        "/images/13-hello-kitty-kulcstarto/13-hello-kitty-kulcstarto-04.jpg"
      ],
      "url": "https://layero.ro/termek/hello-kitty-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/hello-kitty-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-013",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Hello Kitty kulcstartó",
        "slug": "hello-kitty-kulcstarto",
        "short_description": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A karakter kontúrját követő függőn a masni, a bajuszvonalak és az apró orr is jól látszik. Kedves, színes részlet egy táskán vagy a mindennapi kulcsok mellett.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Hello Kitty kulcstartó | Layero",
        "meta_description": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Hello Kitty kulcstartó",
        "social_description": "Hello Kitty arcos kulcstartó piros masnival és fehér arcrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/13-hello-kitty-kulcstarto/13-hello-kitty-kulcstarto-04.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "mickey-mouse-kulcstarto",
    "nev": "Mickey Mouse kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/14-mickey-mouse-kulcstarto/14-mickey-mouse-kulcstarto-05.jpg"
    ],
    "leiras": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kerek fülek és a mosolygó arc teszik felismerhetővé ezt a karakteres függőt. A piros körvonal kiemeli az alakot, így egyszerű táskán is mutatós apróság.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Mickey Mouse kulcstartó | Layero",
      "meta_leiras": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "mickey-mouse-kulcstarto",
      "kozossegi_cim": "Mickey Mouse kulcstartó",
      "kozossegi_leiras": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/14-mickey-mouse-kulcstarto/14-mickey-mouse-kulcstarto-05.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Mickey Mouse kulcstartó",
      "description": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-014",
      "image": [
        "/images/14-mickey-mouse-kulcstarto/14-mickey-mouse-kulcstarto-05.jpg"
      ],
      "url": "https://layero.ro/termek/mickey-mouse-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/mickey-mouse-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-014",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Mickey Mouse kulcstartó",
        "slug": "mickey-mouse-kulcstarto",
        "short_description": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kerek fülek és a mosolygó arc teszik felismerhetővé ezt a karakteres függőt. A piros körvonal kiemeli az alakot, így egyszerű táskán is mutatós apróság.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Mickey Mouse kulcstartó | Layero",
        "meta_description": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Mickey Mouse kulcstartó",
        "social_description": "Mickey Mouse arcos kulcstartó fekete fülekkel és piros szegéllyel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/14-mickey-mouse-kulcstarto/14-mickey-mouse-kulcstarto-05.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "mario-kerdojel-kocka-kulcstarto",
    "nev": "Mario kérdőjel kocka kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/15-mario-kerdojel-kocka-kulcstarto/15-mario-kerdojel-kocka-kulcstarto-01.jpeg"
    ],
    "leiras": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kérdőjeles blokkot idéző kis kocka a Mario-játékok ismerős részletét hozza a kulcscsomóra. A sárga testet az oldalakon látható kérdőjelek teszik játékossá.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Mario kérdőjel kocka kulcstartó | Layero",
      "meta_leiras": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "mario-kerdojel-kocka-kulcstarto",
      "kozossegi_cim": "Mario kérdőjel kocka kulcstartó",
      "kozossegi_leiras": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/15-mario-kerdojel-kocka-kulcstarto/15-mario-kerdojel-kocka-kulcstarto-01.jpeg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Mario kérdőjel kocka kulcstartó",
      "description": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-015",
      "image": [
        "/images/15-mario-kerdojel-kocka-kulcstarto/15-mario-kerdojel-kocka-kulcstarto-01.jpeg"
      ],
      "url": "https://layero.ro/termek/mario-kerdojel-kocka-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/mario-kerdojel-kocka-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-015",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Mario kérdőjel kocka kulcstartó",
        "slug": "mario-kerdojel-kocka-kulcstarto",
        "short_description": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kérdőjeles blokkot idéző kis kocka a Mario-játékok ismerős részletét hozza a kulcscsomóra. A sárga testet az oldalakon látható kérdőjelek teszik játékossá.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Mario kérdőjel kocka kulcstartó | Layero",
        "meta_description": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Mario kérdőjel kocka kulcstartó",
        "social_description": "Sárga Mario kérdőjelkocka kulcstartó térbeli formával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/15-mario-kerdojel-kocka-kulcstarto/15-mario-kerdojel-kocka-kulcstarto-01.jpeg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "angel-lilo-stitch-kulcstarto",
    "nev": "Angel (Lilo & Stitch) kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-01.jpg",
      "assets/kulcstartok/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-02.jpg",
      "assets/kulcstartok/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-03.jpg"
    ],
    "leiras": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "Angel rózsaszín alakja és széles fülei adják ennek a Lilo & Stitch témájú függőnek a báját. Stitch mellé páros ajándéknak, önmagában pedig táskadísznek is kedves választás.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Angel (Lilo & Stitch) kulcstartó | Layero",
      "meta_leiras": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "angel-lilo-stitch-kulcstarto",
      "kozossegi_cim": "Angel (Lilo & Stitch) kulcstartó",
      "kozossegi_leiras": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Angel (Lilo & Stitch) kulcstartó",
      "description": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-016",
      "image": [
        "/images/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-01.jpg",
        "/images/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-02.jpg",
        "/images/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/angel-lilo-stitch-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/angel-lilo-stitch-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-016",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Angel (Lilo & Stitch) kulcstartó",
        "slug": "angel-lilo-stitch-kulcstarto",
        "short_description": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>Angel rózsaszín alakja és széles fülei adják ennek a Lilo &amp; Stitch témájú függőnek a báját. Stitch mellé páros ajándéknak, önmagában pedig táskadísznek is kedves választás.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Angel (Lilo & Stitch) kulcstartó | Layero",
        "meta_description": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Angel (Lilo & Stitch) kulcstartó",
        "social_description": "Rózsaszín Angel kulcstartó nagy fülekkel, ülő figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/16-angel-lilo-stitch-kulcstarto/16-angel-lilo-stitch-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "stitch-kulcstarto",
    "nev": "Stitch kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/17-stitch-kulcstarto/17-stitch-kulcstarto-01.jpg",
      "assets/kulcstartok/17-stitch-kulcstarto/17-stitch-kulcstarto-02.jpg",
      "assets/kulcstartok/17-stitch-kulcstarto/17-stitch-kulcstarto-03.jpg"
    ],
    "leiras": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A nagy fülek, a kék árnyalatok és az integető póz egy apró függőn jelenítik meg Stitch alakját. A karakter rajongóinak szánt, mindennap hordható kis ajándék.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Stitch kulcstartó | Layero",
      "meta_leiras": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "stitch-kulcstarto",
      "kozossegi_cim": "Stitch kulcstartó",
      "kozossegi_leiras": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/17-stitch-kulcstarto/17-stitch-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Stitch kulcstartó",
      "description": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-017",
      "image": [
        "/images/17-stitch-kulcstarto/17-stitch-kulcstarto-01.jpg",
        "/images/17-stitch-kulcstarto/17-stitch-kulcstarto-02.jpg",
        "/images/17-stitch-kulcstarto/17-stitch-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/stitch-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/stitch-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-017",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Stitch kulcstartó",
        "slug": "stitch-kulcstarto",
        "short_description": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A nagy fülek, a kék árnyalatok és az integető póz egy apró függőn jelenítik meg Stitch alakját. A karakter rajongóinak szánt, mindennap hordható kis ajándék.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Stitch kulcstartó | Layero",
        "meta_description": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Stitch kulcstartó",
        "social_description": "Kék Stitch kulcstartó integető figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/17-stitch-kulcstarto/17-stitch-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "demogorgon-stranger-things-kulcstarto",
    "nev": "Demogorgon (Stranger Things) kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-01.jpg",
      "assets/kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-02.jpg",
      "assets/kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-03.jpg"
    ],
    "leiras": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A széttárt, sziromszerű fej és a vékony figura a Stranger Things világát idézi. Szokatlan, részletes függő azoknak, akik a kedves figurák helyett egy sötétebb hangulatú motívumot választanának.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Demogorgon (Stranger Things) kulcstartó | Layero",
      "meta_leiras": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "demogorgon-stranger-things-kulcstarto",
      "kozossegi_cim": "Demogorgon (Stranger Things) kulcstartó",
      "kozossegi_leiras": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Demogorgon (Stranger Things) kulcstartó",
      "description": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-018",
      "image": [
        "/images/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-01.jpg",
        "/images/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-02.jpg",
        "/images/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/demogorgon-stranger-things-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/demogorgon-stranger-things-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-018",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Demogorgon (Stranger Things) kulcstartó",
        "slug": "demogorgon-stranger-things-kulcstarto",
        "short_description": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A széttárt, sziromszerű fej és a vékony figura a Stranger Things világát idézi. Szokatlan, részletes függő azoknak, akik a kedves figurák helyett egy sötétebb hangulatú motívumot választanának.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Demogorgon (Stranger Things) kulcstartó | Layero",
        "meta_description": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Demogorgon (Stranger Things) kulcstartó",
        "social_description": "Demogorgon figurás kulcstartó szürke testtel és piros szájrésszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "minecraft-crafting-table-clicker-kulcstarto",
    "nev": "Minecraft Crafting Table clicker kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-01.jpg",
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-02.jpg",
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-03.jpg",
      "assets/kulcstartok/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-04.jpg"
    ],
    "leiras": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A Minecraft barkácsasztalát idéző, barna-fekete kulcstartó lenyomható része minden megnyomásra kattan. A rácsos, pixeles minta mellett a kattogó clicker funkció teszi különlegessé ezt a gamer kiegészítőt. Kulcsokra vagy hátizsákra akasztva is magaddal viheted.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Minecraft Crafting Table clicker kulcstartó | Layero",
      "meta_leiras": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "minecraft-crafting-table-clicker-kulcstarto",
      "kozossegi_cim": "Minecraft Crafting Table clicker kulcstartó",
      "kozossegi_leiras": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minecraft Crafting Table clicker kulcstartó",
      "description": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-019",
      "image": [
        "/images/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-01.jpg",
        "/images/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-02.jpg",
        "/images/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-03.jpg",
        "/images/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-04.jpg"
      ],
      "url": "https://layero.ro/termek/minecraft-crafting-table-clicker-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/minecraft-crafting-table-clicker-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-019",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Minecraft Crafting Table clicker kulcstartó",
        "slug": "minecraft-crafting-table-clicker-kulcstarto",
        "short_description": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A Minecraft barkácsasztalát idéző, barna-fekete kulcstartó lenyomható része minden megnyomásra kattan. A rácsos, pixeles minta mellett a kattogó clicker funkció teszi különlegessé ezt a gamer kiegészítőt. Kulcsokra vagy hátizsákra akasztva is magaddal viheted.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Minecraft Crafting Table clicker kulcstartó | Layero",
        "meta_description": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Minecraft Crafting Table clicker kulcstartó",
        "social_description": "Minecraft Crafting Table clicker kulcstartó lenyomható, kattogó résszel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/19-minecraft-crafting-table-kulcstarto/19-minecraft-crafting-table-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "minecraft-tnt-kulcstarto",
    "nev": "Minecraft TNT kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-01.jpg",
      "assets/kulcstartok/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-02.jpg",
      "assets/kulcstartok/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-03.jpg"
    ],
    "leiras": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A térbeli blokk oldalán a fehér sáv és a TNT felirat is megjelenik. A Minecraft pixeles világát kedvelőknek készült dekoratív függő, élénk piros részletekkel.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Minecraft TNT kulcstartó | Layero",
      "meta_leiras": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "minecraft-tnt-kulcstarto",
      "kozossegi_cim": "Minecraft TNT kulcstartó",
      "kozossegi_leiras": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minecraft TNT kulcstartó",
      "description": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-020",
      "image": [
        "/images/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-01.jpg",
        "/images/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-02.jpg",
        "/images/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/minecraft-tnt-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/minecraft-tnt-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-020",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Minecraft TNT kulcstartó",
        "slug": "minecraft-tnt-kulcstarto",
        "short_description": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A térbeli blokk oldalán a fehér sáv és a TNT felirat is megjelenik. A Minecraft pixeles világát kedvelőknek készült dekoratív függő, élénk piros részletekkel.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Minecraft TNT kulcstartó | Layero",
        "meta_description": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Minecraft TNT kulcstartó",
        "social_description": "Minecraft TNT kocka kulcstartó piros-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/20-minecraft-tnt-kulcstarto/20-minecraft-tnt-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "minecraft-skeleton-kulcstarto",
    "nev": "Minecraft Skeleton kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-01.jpg",
      "assets/kulcstartok/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-02.jpg"
    ],
    "leiras": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kockafej és a keskeny, tagolt test a játék csontvázkarakterét idézi. Visszafogott színű gamer kiegészítő, amely formájával hívja fel magára a figyelmet.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Minecraft Skeleton kulcstartó | Layero",
      "meta_leiras": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "minecraft-skeleton-kulcstarto",
      "kozossegi_cim": "Minecraft Skeleton kulcstartó",
      "kozossegi_leiras": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minecraft Skeleton kulcstartó",
      "description": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-021",
      "image": [
        "/images/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-01.jpg",
        "/images/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/minecraft-skeleton-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/minecraft-skeleton-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-021",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Minecraft Skeleton kulcstartó",
        "slug": "minecraft-skeleton-kulcstarto",
        "short_description": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kockafej és a keskeny, tagolt test a játék csontvázkarakterét idézi. Visszafogott színű gamer kiegészítő, amely formájával hívja fel magára a figyelmet.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Minecraft Skeleton kulcstartó | Layero",
        "meta_description": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Minecraft Skeleton kulcstartó",
        "social_description": "Minecraft Skeleton kulcstartó fehér, szögletes figurával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/21-minecraft-skeleton-kulcstarto/21-minecraft-skeleton-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "golden-retriever-flexi-kulcstarto",
    "nev": "Golden Retriever flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-05.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-01.jpeg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-02.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-03.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-04.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-06.jpg",
      "assets/kulcstartok/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-07.jpg"
    ],
    "leiras": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A fekvő kiskutya lógó fülei és kedves pofija egy retriever jellegzetességeit idézik. A kapcsolódó testszegmensek mozgást engednek a figurának, így különlegesebb részlet kerül a kulcscsomóra.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Bestseller",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Golden Retriever flexi kulcstartó | Layero",
      "meta_leiras": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "golden-retriever-flexi-kulcstarto",
      "kozossegi_cim": "Golden Retriever flexi kulcstartó",
      "kozossegi_leiras": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-05.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Golden Retriever flexi kulcstartó",
      "description": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-022",
      "image": [
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-05.jpg",
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-01.jpeg",
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-02.jpg",
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-03.jpg",
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-04.jpg",
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-06.jpg",
        "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-07.jpg"
      ],
      "url": "https://layero.ro/termek/golden-retriever-flexi-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/golden-retriever-flexi-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-022",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Golden Retriever flexi kulcstartó",
        "slug": "golden-retriever-flexi-kulcstarto",
        "short_description": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A fekvő kiskutya lógó fülei és kedves pofija egy retriever jellegzetességeit idézik. A kapcsolódó testszegmensek mozgást engednek a figurának, így különlegesebb részlet kerül a kulcscsomóra.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Golden Retriever flexi kulcstartó | Layero",
        "meta_description": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Golden Retriever flexi kulcstartó",
        "social_description": "Aranybarna Golden Retriever flexi kulcstartó tagolt, mozgatható testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/22-golden-retriever-flexi-kulcstarto/22-golden-retriever-flexi-kulcstarto-05.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "mosomedve-flexi-kulcstarto",
    "nev": "Mosómedve flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-01.jpg",
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-04.jpg",
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-05.jpg",
      "assets/kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-06.jpg"
    ],
    "leiras": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sötét szemmaszk és a csíkos farok teszi felismerhetővé a kis mosómedvét. Mozgatható, szegmentált figurája állatkedvelőnek szánt apró ajándékként is jól működik.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Mosómedve flexi kulcstartó | Layero",
      "meta_leiras": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "mosomedve-flexi-kulcstarto",
      "kozossegi_cim": "Mosómedve flexi kulcstartó",
      "kozossegi_leiras": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Mosómedve flexi kulcstartó",
      "description": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-023",
      "image": [
        "/images/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-01.jpg",
        "/images/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-04.jpg",
        "/images/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-05.jpg",
        "/images/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-06.jpg"
      ],
      "url": "https://layero.ro/termek/mosomedve-flexi-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/mosomedve-flexi-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-023",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Mosómedve flexi kulcstartó",
        "slug": "mosomedve-flexi-kulcstarto",
        "short_description": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sötét szemmaszk és a csíkos farok teszi felismerhetővé a kis mosómedvét. Mozgatható, szegmentált figurája állatkedvelőnek szánt apró ajándékként is jól működik.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Mosómedve flexi kulcstartó | Layero",
        "meta_description": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Mosómedve flexi kulcstartó",
        "social_description": "Szürke-fekete mosómedve flexi kulcstartó tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "fekete-cica-flexi-kulcstarto",
    "nev": "Fekete cica flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-03.jpeg",
      "assets/kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-01.jpeg",
      "assets/kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-02.jpeg"
    ],
    "leiras": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sötét testet a világos mancsok és a rózsaszín fülbelsők teszik részletgazdaggá. A cica tagolt, mozgatható teste játékos formát ad a kulcsokra akasztható figurának.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Fekete cica flexi kulcstartó | Layero",
      "meta_leiras": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "fekete-cica-flexi-kulcstarto",
      "kozossegi_cim": "Fekete cica flexi kulcstartó",
      "kozossegi_leiras": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-03.jpeg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fekete cica flexi kulcstartó",
      "description": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-024",
      "image": [
        "/images/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-03.jpeg",
        "/images/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-01.jpeg",
        "/images/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-02.jpeg"
      ],
      "url": "https://layero.ro/termek/fekete-cica-flexi-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/fekete-cica-flexi-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-024",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Fekete cica flexi kulcstartó",
        "slug": "fekete-cica-flexi-kulcstarto",
        "short_description": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sötét testet a világos mancsok és a rózsaszín fülbelsők teszik részletgazdaggá. A cica tagolt, mozgatható teste játékos formát ad a kulcsokra akasztható figurának.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Fekete cica flexi kulcstartó | Layero",
        "meta_description": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Fekete cica flexi kulcstartó",
        "social_description": "Fekete cica flexi kulcstartó világos mancsokkal és rózsaszín fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-03.jpeg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "tacsko-flexi-kulcstarto",
    "nev": "Tacskó flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-01.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-02.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-03.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-04.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-05.jpg",
      "assets/kulcstartok/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-06.jpg"
    ],
    "leiras": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A hosszú törzs, a lelógó fülek és a nagy szemek egy jellegzetes kis tacskót formáznak. Mozgatható teste miatt többféle pózban is megmutatja a karakterét.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Tacskó flexi kulcstartó | Layero",
      "meta_leiras": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "tacsko-flexi-kulcstarto",
      "kozossegi_cim": "Tacskó flexi kulcstartó",
      "kozossegi_leiras": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Tacskó flexi kulcstartó",
      "description": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-025",
      "image": [
        "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-01.jpg",
        "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-02.jpg",
        "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-03.jpg",
        "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-04.jpg",
        "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-05.jpg",
        "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-06.jpg"
      ],
      "url": "https://layero.ro/termek/tacsko-flexi-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/tacsko-flexi-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-025",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Tacskó flexi kulcstartó",
        "slug": "tacsko-flexi-kulcstarto",
        "short_description": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A hosszú törzs, a lelógó fülek és a nagy szemek egy jellegzetes kis tacskót formáznak. Mozgatható teste miatt többféle pózban is megmutatja a karakterét.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Tacskó flexi kulcstartó | Layero",
        "meta_description": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Tacskó flexi kulcstartó",
        "social_description": "Barna tacskó flexi kulcstartó hosszúkás, tagolt testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/25-tacsko-flexi-kulcstarto/25-tacsko-flexi-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "beagle-kulcstarto",
    "nev": "Beagle kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/26-beagle-kulcstarto/26-beagle-kulcstarto-01.jpg"
    ],
    "leiras": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A világos pofi, a sötétebb hát és a hosszú fülek a beagle jellegzetes színeit és formáit idézik. Kutyabarátoknak szánt kedves apróság, amely a táskára is felakasztható.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Beagle kulcstartó | Layero",
      "meta_leiras": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "beagle-kulcstarto",
      "kozossegi_cim": "Beagle kulcstartó",
      "kozossegi_leiras": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/26-beagle-kulcstarto/26-beagle-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Beagle kulcstartó",
      "description": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-026",
      "image": [
        "/images/26-beagle-kulcstarto/26-beagle-kulcstarto-01.jpg"
      ],
      "url": "https://layero.ro/termek/beagle-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/beagle-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-026",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Beagle kulcstartó",
        "slug": "beagle-kulcstarto",
        "short_description": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A világos pofi, a sötétebb hát és a hosszú fülek a beagle jellegzetes színeit és formáit idézik. Kutyabarátoknak szánt kedves apróság, amely a táskára is felakasztható.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Beagle kulcstartó | Layero",
        "meta_description": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Beagle kulcstartó",
        "social_description": "Beagle figurás kulcstartó barna-fehér arccal és lógó fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/26-beagle-kulcstarto/26-beagle-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "mehecske-kulcstarto",
    "nev": "Méhecske kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/29-mehecske-kulcstarto/29-mehecske-kulcstarto-03.jpg",
      "assets/kulcstartok/29-mehecske-kulcstarto/29-mehecske-kulcstarto-01.jpg",
      "assets/kulcstartok/29-mehecske-kulcstarto/29-mehecske-kulcstarto-02.jpg"
    ],
    "leiras": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sárga és sötét sávok, a kerek szemek és a szárnyak vidám méhecskét formáznak. A tagolt testű figura színes kiegészítője lehet egy egyszerű kulcscsomónak.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Méhecske kulcstartó | Layero",
      "meta_leiras": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "mehecske-kulcstarto",
      "kozossegi_cim": "Méhecske kulcstartó",
      "kozossegi_leiras": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/29-mehecske-kulcstarto/29-mehecske-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Méhecske kulcstartó",
      "description": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-029",
      "image": [
        "/images/29-mehecske-kulcstarto/29-mehecske-kulcstarto-03.jpg",
        "/images/29-mehecske-kulcstarto/29-mehecske-kulcstarto-01.jpg",
        "/images/29-mehecske-kulcstarto/29-mehecske-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/mehecske-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/mehecske-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-029",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Méhecske kulcstartó",
        "slug": "mehecske-kulcstarto",
        "short_description": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sárga és sötét sávok, a kerek szemek és a szárnyak vidám méhecskét formáznak. A tagolt testű figura színes kiegészítője lehet egy egyszerű kulcscsomónak.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Méhecske kulcstartó | Layero",
        "meta_description": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Méhecske kulcstartó",
        "social_description": "Csíkos méhecske kulcstartó nagy szemekkel és apró szárnyakkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/29-mehecske-kulcstarto/29-mehecske-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "kutya-ruhaban-kulcstarto",
    "nev": "Kutya ruhában kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-01.jpg",
      "assets/kulcstartok/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-02.jpg"
    ],
    "leiras": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A nagy szemű, világos kutyus rózsaszín öltözéke adja a figura különlegességét. Kedves választás annak, aki az állatos, meseszerű kiegészítőket szereti.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Kutya ruhában kulcstartó | Layero",
      "meta_leiras": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "kutya-ruhaban-kulcstarto",
      "kozossegi_cim": "Kutya ruhában kulcstartó",
      "kozossegi_leiras": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Kutya ruhában kulcstartó",
      "description": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-030",
      "image": [
        "/images/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-01.jpg",
        "/images/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/kutya-ruhaban-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/kutya-ruhaban-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-030",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Kutya ruhában kulcstartó",
        "slug": "kutya-ruhaban-kulcstarto",
        "short_description": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A nagy szemű, világos kutyus rózsaszín öltözéke adja a figura különlegességét. Kedves választás annak, aki az állatos, meseszerű kiegészítőket szereti.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Kutya ruhában kulcstartó | Layero",
        "meta_description": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Kutya ruhában kulcstartó",
        "social_description": "Világos kiskutya kulcstartó rózsaszín ruhában. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/30-kutya-ruhaban-kulcstarto/30-kutya-ruhaban-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "emoji-szivszem-kulcstarto",
    "nev": "Emoji szívszem kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-01.jpg",
      "assets/kulcstartok/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-02.jpg"
    ],
    "leiras": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A mosolygó arc és a két piros szív egyszerű, vidám üzenetet hordoz. Apró figyelmesség szerelmes ajándék mellé, vagy színes kiegészítő a saját kulcscsomóra.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Emoji szívszem kulcstartó | Layero",
      "meta_leiras": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "emoji-szivszem-kulcstarto",
      "kozossegi_cim": "Emoji szívszem kulcstartó",
      "kozossegi_leiras": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Emoji szívszem kulcstartó",
      "description": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-033",
      "image": [
        "/images/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-01.jpg",
        "/images/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/emoji-szivszem-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/emoji-szivszem-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-033",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Emoji szívszem kulcstartó",
        "slug": "emoji-szivszem-kulcstarto",
        "short_description": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A mosolygó arc és a két piros szív egyszerű, vidám üzenetet hordoz. Apró figyelmesség szerelmes ajándék mellé, vagy színes kiegészítő a saját kulcscsomóra.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Emoji szívszem kulcstartó | Layero",
        "meta_description": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Emoji szívszem kulcstartó",
        "social_description": "Sárga emoji kulcstartó piros szívszemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/33-emoji-szivszem-kulcstarto/33-emoji-szivszem-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "evfordulo",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "malac-kulcstarto",
    "nev": "Malac kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-01.jpg",
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-02.jpg",
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-03.jpg",
      "assets/kulcstartok/34-malac-kulcstarto/34-malac-kulcstarto-04.jpg"
    ],
    "leiras": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A feltűnő rózsaszín szín és a jellegzetes malacorr adja a kis figura játékos megjelenését. Állatos kiegészítőket kedvelőknek vagy egy humoros ajándék mellé is illik.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Malac kulcstartó | Layero",
      "meta_leiras": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "malac-kulcstarto",
      "kozossegi_cim": "Malac kulcstartó",
      "kozossegi_leiras": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/34-malac-kulcstarto/34-malac-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Malac kulcstartó",
      "description": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-034",
      "image": [
        "/images/34-malac-kulcstarto/34-malac-kulcstarto-01.jpg",
        "/images/34-malac-kulcstarto/34-malac-kulcstarto-02.jpg",
        "/images/34-malac-kulcstarto/34-malac-kulcstarto-03.jpg",
        "/images/34-malac-kulcstarto/34-malac-kulcstarto-04.jpg"
      ],
      "url": "https://layero.ro/termek/malac-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/malac-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-034",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Malac kulcstartó",
        "slug": "malac-kulcstarto",
        "short_description": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A feltűnő rózsaszín szín és a jellegzetes malacorr adja a kis figura játékos megjelenését. Állatos kiegészítőket kedvelőknek vagy egy humoros ajándék mellé is illik.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Malac kulcstartó | Layero",
        "meta_description": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Malac kulcstartó",
        "social_description": "Rózsaszín malacfigurás kulcstartó kerek orral és apró fülekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/34-malac-kulcstarto/34-malac-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "glock-pisztoly-kulcstarto",
    "nev": "Glock pisztoly kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-01.jpg",
      "assets/kulcstartok/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-02.jpg"
    ],
    "leiras": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A pisztoly körvonalát követő apró függő dekoratív kiegészítő a kulcscsomóra. 3D nyomtatott dísztárgy, működő fegyverfunkció nélkül.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Glock pisztoly kulcstartó | Layero",
      "meta_leiras": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "glock-pisztoly-kulcstarto",
      "kozossegi_cim": "Glock pisztoly kulcstartó",
      "kozossegi_leiras": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Glock pisztoly kulcstartó",
      "description": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-035",
      "image": [
        "/images/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-01.jpg",
        "/images/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/glock-pisztoly-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/glock-pisztoly-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-035",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Glock pisztoly kulcstartó",
        "slug": "glock-pisztoly-kulcstarto",
        "short_description": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A pisztoly körvonalát követő apró függő dekoratív kiegészítő a kulcscsomóra. 3D nyomtatott dísztárgy, működő fegyverfunkció nélkül.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Glock pisztoly kulcstartó | Layero",
        "meta_description": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Glock pisztoly kulcstartó",
        "social_description": "Fekete, Glock formáját idéző miniatűr kulcstartó. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/35-glock-pisztoly-kulcstarto/35-glock-pisztoly-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "mercedes-logos-kulcstarto",
    "nev": "Mercedes logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A körbe foglalt háromágú csillag tisztán kirajzolódik a sötét felületen. Egyszerű autós motívum saját kulcsokhoz vagy egy Mercedes-rajongónak szánt ajándékhoz.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Mercedes logós kulcstartó | Layero",
      "meta_leiras": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "mercedes-logos-kulcstarto",
      "kozossegi_cim": "Mercedes logós kulcstartó",
      "kozossegi_leiras": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Mercedes logós kulcstartó",
      "description": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-036",
      "image": [
        "/images/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-01.jpg",
        "/images/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-02.jpg",
        "/images/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/mercedes-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/mercedes-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-036",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Mercedes logós kulcstartó",
        "slug": "mercedes-logos-kulcstarto",
        "short_description": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A körbe foglalt háromágú csillag tisztán kirajzolódik a sötét felületen. Egyszerű autós motívum saját kulcsokhoz vagy egy Mercedes-rajongónak szánt ajándékhoz.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Mercedes logós kulcstartó | Layero",
        "meta_description": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Mercedes logós kulcstartó",
        "social_description": "Kerek Mercedes kulcstartó fehér csillaggal, fekete alapon. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/36-mercedes-logos-kulcstarto/36-mercedes-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "deutz-fahr-logos-kulcstarto",
    "nev": "Deutz-Fahr logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A világos felirat és a piros geometrikus embléma kontrasztja határozza meg a függő megjelenését. Traktorok és mezőgazdasági gépek kedvelőinek szánt apró kiegészítő.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Deutz-Fahr logós kulcstartó | Layero",
      "meta_leiras": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "deutz-fahr-logos-kulcstarto",
      "kozossegi_cim": "Deutz-Fahr logós kulcstartó",
      "kozossegi_leiras": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Deutz-Fahr logós kulcstartó",
      "description": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-037",
      "image": [
        "/images/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-01.jpg",
        "/images/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-02.jpg",
        "/images/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/deutz-fahr-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/deutz-fahr-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-037",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Deutz-Fahr logós kulcstartó",
        "slug": "deutz-fahr-logos-kulcstarto",
        "short_description": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A világos felirat és a piros geometrikus embléma kontrasztja határozza meg a függő megjelenését. Traktorok és mezőgazdasági gépek kedvelőinek szánt apró kiegészítő.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Deutz-Fahr logós kulcstartó | Layero",
        "meta_description": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Deutz-Fahr logós kulcstartó",
        "social_description": "Fekete Deutz-Fahr témájú kulcstartó DEUTZ felirattal és piros jellel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/37-deutz-fahr-logos-kulcstarto/37-deutz-fahr-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "monster-energy-kulcstarto",
    "nev": "Monster Energy kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-01.jpg",
      "assets/kulcstartok/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-02.jpg",
      "assets/kulcstartok/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-03.jpg"
    ],
    "leiras": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A neonhatású zöld jel és a világos körvonal erősen elválik a fekete alaptól. Feltűnő motívum azoknak, akik sportosabb, élénk színű kiegészítőt keresnek.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Monster Energy kulcstartó | Layero",
      "meta_leiras": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "monster-energy-kulcstarto",
      "kozossegi_cim": "Monster Energy kulcstartó",
      "kozossegi_leiras": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Monster Energy kulcstartó",
      "description": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-038",
      "image": [
        "/images/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-01.jpg",
        "/images/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-02.jpg",
        "/images/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/monster-energy-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/monster-energy-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-038",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Monster Energy kulcstartó",
        "slug": "monster-energy-kulcstarto",
        "short_description": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A neonhatású zöld jel és a világos körvonal erősen elválik a fekete alaptól. Feltűnő motívum azoknak, akik sportosabb, élénk színű kiegészítőt keresnek.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Monster Energy kulcstartó | Layero",
        "meta_description": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Monster Energy kulcstartó",
        "social_description": "Fekete Monster Energy mintás kulcstartó élénkzöld karmolásmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/38-monster-energy-kulcstarto/38-monster-energy-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "john-deere-logos-kulcstarto",
    "nev": "John Deere logós kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg",
      "assets/kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-02.jpg",
      "assets/kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-03.jpg"
    ],
    "leiras": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A sárga szarvas és keret a zöld alapon a jól ismert mezőgazdasági témát idézi. Lekerekített, négyzetes függő traktorrajongóknak vagy a gépkulcs mellé.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "John Deere logós kulcstartó | Layero",
      "meta_leiras": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "john-deere-logos-kulcstarto",
      "kozossegi_cim": "John Deere logós kulcstartó",
      "kozossegi_leiras": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "John Deere logós kulcstartó",
      "description": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-039",
      "image": [
        "/images/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg",
        "/images/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-02.jpg",
        "/images/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/john-deere-logos-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/john-deere-logos-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-039",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "John Deere logós kulcstartó",
        "slug": "john-deere-logos-kulcstarto",
        "short_description": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A sárga szarvas és keret a zöld alapon a jól ismert mezőgazdasági témát idézi. Lekerekített, négyzetes függő traktorrajongóknak vagy a gépkulcs mellé.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "John Deere logós kulcstartó | Layero",
        "meta_description": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "John Deere logós kulcstartó",
        "social_description": "Zöld-sárga John Deere kulcstartó szarvasmotívummal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "focilabda-kulcstarto",
    "nev": "Focilabda kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/40-focilabda-kulcstarto/40-focilabda-kulcstarto-01.jpg",
      "assets/kulcstartok/40-focilabda-kulcstarto/40-focilabda-kulcstarto-02.jpg",
      "assets/kulcstartok/40-focilabda-kulcstarto/40-focilabda-kulcstarto-03.jpg"
    ],
    "leiras": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A gömb alakú függőn a focilabda jellegzetes fekete és fehér mezői jelennek meg. Kis ajándék játékosoknak, edzőknek és szurkolóknak, csapatválasztástól függetlenül.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Focilabda kulcstartó | Layero",
      "meta_leiras": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "focilabda-kulcstarto",
      "kozossegi_cim": "Focilabda kulcstartó",
      "kozossegi_leiras": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/40-focilabda-kulcstarto/40-focilabda-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Focilabda kulcstartó",
      "description": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-040",
      "image": [
        "/images/40-focilabda-kulcstarto/40-focilabda-kulcstarto-01.jpg",
        "/images/40-focilabda-kulcstarto/40-focilabda-kulcstarto-02.jpg",
        "/images/40-focilabda-kulcstarto/40-focilabda-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/focilabda-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/focilabda-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-040",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Focilabda kulcstartó",
        "slug": "focilabda-kulcstarto",
        "short_description": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A gömb alakú függőn a focilabda jellegzetes fekete és fehér mezői jelennek meg. Kis ajándék játékosoknak, edzőknek és szurkolóknak, csapatválasztástól függetlenül.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Focilabda kulcstartó | Layero",
        "meta_description": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Focilabda kulcstartó",
        "social_description": "Térbeli focilabda kulcstartó fekete-fehér mintával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/40-focilabda-kulcstarto/40-focilabda-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "rajongoi"
      ],
      "enabled": true
    }
  },
  {
    "id": "leopard-hernyo-flexi-kulcstarto",
    "nev": "Leopárd hernyó flexi kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/41-leopard-hernyó-flexi-kulcstarto/41-leopard-hernyó-flexi-kulcstarto-01.jpg"
    ],
    "leiras": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kapcsolódó szegmenseket sötét foltminta díszíti, így a mozgatható figura egyszerre idéz hernyót és leopárdmintás állatkát. Szokatlan forma a különleges állatos függők kedvelőinek.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badge": "Új",
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Leopárd hernyó flexi kulcstartó | Layero",
      "meta_leiras": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "leopard-hernyo-flexi-kulcstarto",
      "kozossegi_cim": "Leopárd hernyó flexi kulcstartó",
      "kozossegi_leiras": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/41-leopard-hernyó-flexi-kulcstarto/41-leopard-hernyó-flexi-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Leopárd hernyó flexi kulcstartó",
      "description": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-041",
      "image": [
        "/images/41-leopard-hernyó-flexi-kulcstarto/41-leopard-hernyó-flexi-kulcstarto-01.jpg"
      ],
      "url": "https://layero.ro/termek/leopard-hernyo-flexi-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/leopard-hernyo-flexi-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-041",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Leopárd hernyó flexi kulcstartó",
        "slug": "leopard-hernyo-flexi-kulcstarto",
        "short_description": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kapcsolódó szegmenseket sötét foltminta díszíti, így a mozgatható figura egyszerre idéz hernyót és leopárdmintás állatkát. Szokatlan forma a különleges állatos függők kedvelőinek.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Leopárd hernyó flexi kulcstartó | Layero",
        "meta_description": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Leopárd hernyó flexi kulcstartó",
        "social_description": "Sárga, leopárdfoltos hernyó flexi kulcstartó hosszúkás testtel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/41-leopard-hernyó-flexi-kulcstarto/41-leopard-hernyó-flexi-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "medve-kulcstarto",
    "nev": "Medve kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/42-medve-kulcstarto/42-medve-kulcstarto-03.jpg",
      "assets/kulcstartok/42-medve-kulcstarto/42-medve-kulcstarto-01.jpg",
      "assets/kulcstartok/42-medve-kulcstarto/42-medve-kulcstarto-02.jpg"
    ],
    "leiras": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A gömbölyű fej és a világosabb pofi barátságos karaktert ad a kis medvének. Egyszerű, kedves állatfigura, amely a kulcsok mellett a táskán is helyet kaphat.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Medve kulcstartó | Layero",
      "meta_leiras": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "medve-kulcstarto",
      "kozossegi_cim": "Medve kulcstartó",
      "kozossegi_leiras": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/42-medve-kulcstarto/42-medve-kulcstarto-03.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Medve kulcstartó",
      "description": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-KEY-042",
      "image": [
        "/images/42-medve-kulcstarto/42-medve-kulcstarto-03.jpg",
        "/images/42-medve-kulcstarto/42-medve-kulcstarto-01.jpg",
        "/images/42-medve-kulcstarto/42-medve-kulcstarto-02.jpg"
      ],
      "url": "https://layero.ro/termek/medve-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/medve-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KEY-042",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Medve kulcstartó",
        "slug": "medve-kulcstarto",
        "short_description": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A gömbölyű fej és a világosabb pofi barátságos karaktert ad a kis medvének. Egyszerű, kedves állatfigura, amely a kulcsok mellett a táskán is helyet kaphat.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Medve kulcstartó | Layero",
        "meta_description": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Medve kulcstartó",
        "social_description": "Barna medvefigurás kulcstartó kerek fülekkel és nagy szemekkel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/42-medve-kulcstarto/42-medve-kulcstarto-03.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
  },
  {
    "id": "ballagasi-kulcstarto",
    "nev": "Ballagási kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-01.jpg",
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-02.jpg",
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-03.jpg",
      "assets/kulcstartok/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-04.jpg"
    ],
    "leiras": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A ballagási kalap és a lila névtábla együtt idézi fel az iskolai évek lezárását. A képen látható név és évszám minta; a kívánt felirat egyeztetésével személyes emlék készülhet a ballagónak.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Ballagási kulcstartó | Layero",
      "meta_leiras": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "ballagasi-kulcstarto",
      "kozossegi_cim": "Ballagási kulcstartó",
      "kozossegi_leiras": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "kozossegi_kep": "/images/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Ballagási kulcstartó",
      "description": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-MISC-043",
      "image": [
        "/images/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-01.jpg",
        "/images/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-02.jpg",
        "/images/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-03.jpg",
        "/images/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-04.jpg"
      ],
      "url": "https://layero.ro/termek/ballagasi-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/ballagasi-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-MISC-043",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Ballagási kulcstartó",
        "slug": "ballagasi-kulcstarto",
        "short_description": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A ballagási kalap és a lila névtábla együtt idézi fel az iskolai évek lezárását. A képen látható név és évszám minta; a kívánt felirat egyeztetésével személyes emlék készülhet a ballagónak.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "Ballagási kulcstartó | Layero",
        "meta_description": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_title": "Ballagási kulcstartó",
        "social_description": "Ballagási kulcstartó kalapmotívummal és feliratos táblácskával. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "social_image": "/images/43-ballagasi-kulcstarto/43-ballagasi-kulcstarto-01.jpg"
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat"
      ],
      "alkalom": [
        "ballagas"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Minnie Mouse Shadow Box lámpa",
      "meta_leiras": "3D nyomtatott Minnie Mouse shadow box (árnyékdoboz) LED lámpa. Gyönyörű fényeffektusokkal, USB táplálással. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
      "slug": "minnie-mouse-shadow-box-lampa",
      "kozossegi_cim": "Minnie Mouse Shadow Box lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Minnie Mouse Shadow Box lámpa",
      "description": "3D nyomtatott Minnie Mouse shadow box (árnyékdoboz) LED lámpa. Gyönyörű fényeffektusokkal, USB táplálással. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-044",
      "image": [
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-01.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-02.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-03.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-04.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-05.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-06.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-07.jpg",
        "assets/kulcstartok/44-minnie-mouse-shadow-box-lampa/44-minnie-mouse-shadow-box-lampa-08.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 15000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-044",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Minnie Mouse Shadow Box lámpa",
        "slug": "minnie-mouse-shadow-box-lampa",
        "short_description": "3D nyomtatott Minnie Mouse shadow box (árnyékdoboz) LED lámpa. Gyönyörű fényeffektusokkal, USB táplálással. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Minnie Mouse shadow box (árnyékdoboz) LED lámpa. Gyönyörű fényeffektusokkal, USB táplálással. Tökéletes ajándék Disney rajongóknak! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Fortnite LED lámpa",
      "meta_leiras": "3D nyomtatott Fortnite témájú LED lámpa. Tökéletes ajándék gamer rajongóknak! USB táplálással, hangulatos megvilágítás. Tartós PLA anyagból készült.",
      "slug": "fortnite-led-lampa",
      "kozossegi_cim": "Fortnite LED lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/45-fortnite-led-lampa/45-fortnite-led-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Fortnite LED lámpa",
      "description": "3D nyomtatott Fortnite témájú LED lámpa. Tökéletes ajándék gamer rajongóknak! USB táplálással, hangulatos megvilágítás. Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-045",
      "image": [
        "assets/kulcstartok/45-fortnite-led-lampa/45-fortnite-led-lampa-01.jpg",
        "assets/kulcstartok/45-fortnite-led-lampa/45-fortnite-led-lampa-02.jpg",
        "assets/kulcstartok/45-fortnite-led-lampa/45-fortnite-led-lampa-03.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 12000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-045",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Fortnite LED lámpa",
        "slug": "fortnite-led-lampa",
        "short_description": "3D nyomtatott Fortnite témájú LED lámpa. Tökéletes ajándék gamer rajongóknak! USB táplálással, hangulatos megvilágítás. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Fortnite témájú LED lámpa. Tökéletes ajándék gamer rajongóknak! USB táplálással, hangulatos megvilágítás. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Assassin's Creed LED tábla",
      "meta_leiras": "3D nyomtatott Assassin's Creed logós LED világító tábla. USB táplálással, hangulatos megvilágítás. Tökéletes ajándék Assassin's Creed rajongóknak! Tartós PLA anyagból készült.",
      "slug": "assassins-creed-led-tabla",
      "kozossegi_cim": "Assassin's Creed LED tábla",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Assassin's Creed LED tábla",
      "description": "3D nyomtatott Assassin's Creed logós LED világító tábla. USB táplálással, hangulatos megvilágítás. Tökéletes ajándék Assassin's Creed rajongóknak! Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-046",
      "image": [
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-01.jpg",
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-02.jpg",
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-03.jpg",
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-04.jpg",
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-05.jpg",
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-06.jpg",
        "assets/kulcstartok/46-assassins-creed-led-tabla/46-assassins-creed-led-tabla-07.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 12000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-046",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Assassin's Creed LED tábla",
        "slug": "assassins-creed-led-tabla",
        "short_description": "3D nyomtatott Assassin's Creed logós LED világító tábla. USB táplálással, hangulatos megvilágítás. Tökéletes ajándék Assassin's Creed rajongóknak! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Assassin&#39;s Creed logós LED világító tábla. USB táplálással, hangulatos megvilágítás. Tökéletes ajándék Assassin&#39;s Creed rajongóknak! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Hello Fall őszi felirat",
      "meta_leiras": "3D nyomtatott \"Hello Fall\" őszi dekorációs felirat levelekkel díszítve. Hangulatos őszi lakásdekoráció. Tartós PLA anyagból készült.",
      "slug": "hello-fall-oszi-felirat",
      "kozossegi_cim": "Hello Fall őszi felirat",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Hello Fall őszi felirat",
      "description": "3D nyomtatott \"Hello Fall\" őszi dekorációs felirat levelekkel díszítve. Hangulatos őszi lakásdekoráció. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-047",
      "image": [
        "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-01.jpg",
        "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-02.jpg",
        "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-03.jpg",
        "assets/kulcstartok/47-hello-fall-oszi-felirat/47-hello-fall-oszi-felirat-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 5000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-047",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Hello Fall őszi felirat",
        "slug": "hello-fall-oszi-felirat",
        "short_description": "3D nyomtatott \"Hello Fall\" őszi dekorációs felirat levelekkel díszítve. Hangulatos őszi lakásdekoráció. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott &quot;Hello Fall&quot; őszi dekorációs felirat levelekkel díszítve. Hangulatos őszi lakásdekoráció. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "csak-ugy"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Őszi tök váza",
      "meta_leiras": "3D nyomtatott őszi tök formájú dekoratív váza. Gyönyörű őszi hangulatot teremt a lakásban. Tartós PLA anyagból készült.",
      "slug": "oszi-tok-vaza",
      "kozossegi_cim": "Őszi tök váza",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/48-oszi-tok-vaza/48-oszi-tok-vaza-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Őszi tök váza",
      "description": "3D nyomtatott őszi tök formájú dekoratív váza. Gyönyörű őszi hangulatot teremt a lakásban. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-048",
      "image": [
        "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-01.jpg",
        "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-02.jpg",
        "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-03.jpg",
        "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-04.jpg",
        "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-05.jpg",
        "assets/kulcstartok/48-oszi-tok-vaza/48-oszi-tok-vaza-06.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 6000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-048",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Őszi tök váza",
        "slug": "oszi-tok-vaza",
        "short_description": "3D nyomtatott őszi tök formájú dekoratív váza. Gyönyörű őszi hangulatot teremt a lakásban. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott őszi tök formájú dekoratív váza. Gyönyörű őszi hangulatot teremt a lakásban. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a darab természetközeli formát és modern 3D nyomtatott textúrát visz az otthonba. Polcon, komódon, étkezőasztalon vagy ablakpárkányon is könnyen elhelyezhető, és önmagában, illetve virággal vagy növénnyel együtt is dekoratív hatást kelt.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rétegezett felület közelről különleges részleteket mutat, távolabbról pedig egységes, rendezett sziluettet ad. Könnyű súlya miatt egyszerűen áthelyezhető, így az évszakhoz vagy az aktuális enteriőrhöz igazítva több helyiségben is használható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is jó választás lakásavatóra, születésnapra vagy egy kedves, maradandó figyelmességként. Azoknak szól, akik a sablonos dekoráció helyett karakteres, kis szériás tárgyat szeretnének.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy könnyen kombinálható dekorációt keresel, amely melegebbé és személyesebbé teszi a környezetét anélkül, hogy túlzsúfolná azt.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "csak-ugy"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Bordázott körte/tök dekor",
      "meta_leiras": "3D nyomtatott bordázott körte/tök formájú dekoráció. Elegáns őszi lakásdekoráció, különböző színekben elérhető. Tartós PLA anyagból készült.",
      "slug": "bordazott-korte-dekor",
      "kozossegi_cim": "Bordázott körte/tök dekor",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/49-bordazott-korte-dekor/49-bordazott-korte-dekor-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Bordázott körte/tök dekor",
      "description": "3D nyomtatott bordázott körte/tök formájú dekoráció. Elegáns őszi lakásdekoráció, különböző színekben elérhető. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-049",
      "image": [
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-01.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-02.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-03.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-04.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-05.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-06.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-07.jpg",
        "assets/kulcstartok/49-bordazott-korte-dekor/49-bordazott-korte-dekor-08.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 4000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-049",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Bordázott körte/tök dekor",
        "slug": "bordazott-korte-dekor",
        "short_description": "3D nyomtatott bordázott körte/tök formájú dekoráció. Elegáns őszi lakásdekoráció, különböző színekben elérhető. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott bordázott körte/tök formájú dekoráció. Elegáns őszi lakásdekoráció, különböző színekben elérhető. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a karakteres 3D nyomtatott dekoráció kis részletekkel teszi személyesebbé az otthont. Polcon, komódon, asztalon vagy egy tematikus összeállítás részeként is könnyen elhelyezhető.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rétegről rétegre felépített forma közelről izgalmas textúrát, távolabbról egységes sziluettet mutat. A könnyű PLA anyag praktikus, a tárgy pedig egyszerűen áthelyezhető, amikor új hangulatot szeretnél teremteni.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is jó választás, mert nem tömegtermék-hatású, hanem egy konkrét érdeklődéshez, alkalomhoz vagy enteriőrhöz kapcsolódik. Születésnapra, ünnepre, lakásavatóra vagy kedves meglepetésként is örömet szerezhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy látványos, mégis könnyen kombinálható darabot keresel, amely több személyiséget visz a helyiségbe.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "csak-ugy"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Leveles mintás mécsestartó",
      "meta_leiras": "3D nyomtatott leveles mintás mécsestartó. Gyönyörű fényeffektust hoz létre a leveles áttört mintázatnak köszönhetően. Tartós PLA anyagból készült.",
      "slug": "leveles-mintas-mecsestarto",
      "kozossegi_cim": "Leveles mintás mécsestartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/50-leveles-mintas-mecsestarto/50-leveles-mintas-mecsestarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Leveles mintás mécsestartó",
      "description": "3D nyomtatott leveles mintás mécsestartó. Gyönyörű fényeffektust hoz létre a leveles áttört mintázatnak köszönhetően. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-050",
      "image": [
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
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 5000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-050",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Leveles mintás mécsestartó",
        "slug": "leveles-mintas-mecsestarto",
        "short_description": "3D nyomtatott leveles mintás mécsestartó. Gyönyörű fényeffektust hoz létre a leveles áttört mintázatnak köszönhetően. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott leveles mintás mécsestartó. Gyönyörű fényeffektust hoz létre a leveles áttört mintázatnak köszönhetően. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> A mécsestartó mintázata a fény hatására válik igazán látványossá: a kivágások és domborulatok finom árnyékokat rajzolnak a környezetére. Nappal dekoratív tárgy, este pedig meghitt hangulatelem az asztalon, polcon vagy komódon.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Különösen jól illik nyugodt esti pillanatokhoz, ünnepi terítéshez vagy szezonális dekoráció részeként. LED mécsessel biztonságos, egyszerűen kezelhető fénydekorációként használható.</p>\n<p><strong>Öröm adni és használni.</strong> Szép ajándék lehet annak, aki szereti az otthonos fényeket és a részletgazdag lakásdekorációt. Kis helyen is erős vizuális hatást ad, ezért könnyű számára megfelelő helyet találni.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha nem csupán egy tárgyat, hanem melegebb, hívogatóbb hangulatot szeretnél teremteni a helyiségben.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Jurassic Park lithophane lámpa",
      "meta_leiras": "3D nyomtatott Jurassic Park lithophane (fényáteresztő) LED lámpa. A bekapcsolt LED megvilágítja a Jurassic Park jelenetet. USB táplálás. Tökéletes ajándék dínó rajongóknak! Tartós PLA anyagból készült.",
      "slug": "jurassic-park-lithophane-lampa",
      "kozossegi_cim": "Jurassic Park lithophane lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Jurassic Park lithophane lámpa",
      "description": "3D nyomtatott Jurassic Park lithophane (fényáteresztő) LED lámpa. A bekapcsolt LED megvilágítja a Jurassic Park jelenetet. USB táplálás. Tökéletes ajándék dínó rajongóknak! Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-051",
      "image": [
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-01.jpg",
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-02.jpg",
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-03.jpg",
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-04.jpg",
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-05.jpg",
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-06.jpg",
        "assets/kulcstartok/51-jurassic-park-lithophane-lampa/51-jurassic-park-lithophane-lampa-07.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 15000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-051",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Jurassic Park lithophane lámpa",
        "slug": "jurassic-park-lithophane-lampa",
        "short_description": "3D nyomtatott Jurassic Park lithophane (fényáteresztő) LED lámpa. A bekapcsolt LED megvilágítja a Jurassic Park jelenetet. USB táplálás. Tökéletes ajándék dínó rajongóknak! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Jurassic Park lithophane (fényáteresztő) LED lámpa. A bekapcsolt LED megvilágítja a Jurassic Park jelenetet. USB táplálás. Tökéletes ajándék dínó rajongóknak! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "F1 2026 versenynaptár",
      "meta_leiras": "3D nyomtatott Formula 1 2026-os szezon versenynaptár. Az összes 2026-os F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "slug": "f1-2026-versenynaptar",
      "kozossegi_cim": "F1 2026 versenynaptár",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "F1 2026 versenynaptár",
      "description": "3D nyomtatott Formula 1 2026-os szezon versenynaptár. Az összes 2026-os F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "sku": "LAY-F1-052",
      "image": [
        "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-01.jpg",
        "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-02.jpg",
        "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-03.jpg",
        "assets/kulcstartok/52-f1-2026-versenynaptar/52-f1-2026-versenynaptar-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 8000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-F1-052",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "F1 2026 versenynaptár",
        "slug": "f1-2026-versenynaptar",
        "short_description": "3D nyomtatott Formula 1 2026-os szezon versenynaptár. Az összes 2026-os F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Formula 1 2026-os szezon versenynaptár. Az összes 2026-os F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "3D tulipán csokor",
      "meta_leiras": "3D nyomtatott tulipán virágcsokor. Örök szépségű virágcsokor, ami sosem hervad el! Különböző színekben elérhető. Tartós PLA anyagból készült.",
      "slug": "3d-tulipan-csokor",
      "kozossegi_cim": "3D tulipán csokor",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/53-3d-tulipan-csokor/53-3d-tulipan-csokor-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "3D tulipán csokor",
      "description": "3D nyomtatott tulipán virágcsokor. Örök szépségű virágcsokor, ami sosem hervad el! Különböző színekben elérhető. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-053",
      "image": [
        "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-01.jpg",
        "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-02.jpg",
        "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-03.jpg",
        "assets/kulcstartok/53-3d-tulipan-csokor/53-3d-tulipan-csokor-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 6000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-053",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "3D tulipán csokor",
        "slug": "3d-tulipan-csokor",
        "short_description": "3D nyomtatott tulipán virágcsokor. Örök szépségű virágcsokor, ami sosem hervad el! Különböző színekben elérhető. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott tulipán virágcsokor. Örök szépségű virágcsokor, ami sosem hervad el! Különböző színekben elérhető. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a darab természetközeli formát és modern 3D nyomtatott textúrát visz az otthonba. Polcon, komódon, étkezőasztalon vagy ablakpárkányon is könnyen elhelyezhető, és önmagában, illetve virággal vagy növénnyel együtt is dekoratív hatást kelt.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rétegezett felület közelről különleges részleteket mutat, távolabbról pedig egységes, rendezett sziluettet ad. Könnyű súlya miatt egyszerűen áthelyezhető, így az évszakhoz vagy az aktuális enteriőrhöz igazítva több helyiségben is használható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is jó választás lakásavatóra, születésnapra vagy egy kedves, maradandó figyelmességként. Azoknak szól, akik a sablonos dekoráció helyett karakteres, kis szériás tárgyat szeretnének.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy könnyen kombinálható dekorációt keresel, amely melegebbé és személyesebbé teszi a környezetét anélkül, hogy túlzsúfolná azt.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "ballagas",
        "karacsony",
        "evfordulo",
        "csak-ugy",
        "anyak-napja"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Szemüvegtartó",
      "meta_leiras": "3D nyomtatott dekoratív szemüvegtartó. Praktikus és mutatós tárolás az asztalon. Tartós PLA anyagból készült.",
      "slug": "szemuvegtarto",
      "kozossegi_cim": "Szemüvegtartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/54-szemuvegtarto/54-szemuvegtarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Szemüvegtartó",
      "description": "3D nyomtatott dekoratív szemüvegtartó. Praktikus és mutatós tárolás az asztalon. Tartós PLA anyagból készült.",
      "sku": "LAY-PRAK-054",
      "image": [
        "assets/kulcstartok/54-szemuvegtarto/54-szemuvegtarto-01.jpg",
        "assets/kulcstartok/54-szemuvegtarto/54-szemuvegtarto-02.jpg",
        "assets/kulcstartok/54-szemuvegtarto/54-szemuvegtarto-03.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 4000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-PRAK-054",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Szemüvegtartó",
        "slug": "szemuvegtarto",
        "short_description": "3D nyomtatott dekoratív szemüvegtartó. Praktikus és mutatós tárolás az asztalon. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott dekoratív szemüvegtartó. Praktikus és mutatós tárolás az asztalon. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a praktikus tárgy segít rendezettebben tartani a mindennap használt eszközöket, miközben dekoratív formájával nem kell elrejteni a fiókban. Íróasztalon, éjjeliszekrényen vagy előszobai komódon is kéznél tartja azt, amire szükséged van.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A 3D nyomtatás lehetővé teszi a funkcióhoz igazított, karakteres formát, a könnyű PLA anyag pedig egyszerűen mozgatható és tisztán tartható. Praktikus megoldás azoknak, akik a használhatóság mellett a megjelenésre is figyelnek.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is ötletes, mert nem csupán dísz, hanem naponta használható figyelmesség. Otthoni munkasarokba, irodába vagy tanulóasztalra egyaránt jól illik.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha szeretnéd, hogy egy hétköznapi rutin rendezettebb, gyorsabb és egyben látványosabb legyen.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Motoros borostartó",
      "meta_leiras": "3D nyomtatott motoros figurás bortartó/borostartó. A motor formájú tartó elegánsan tartja a borosüveget. Tökéletes ajándék motorosoknak és bor kedvelőknek! Tartós PLA anyagból készült.",
      "slug": "motoros-borostarto",
      "kozossegi_cim": "Motoros borostartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/55-motoros-borostarto/55-motoros-borostarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Motoros borostartó",
      "description": "3D nyomtatott motoros figurás bortartó/borostartó. A motor formájú tartó elegánsan tartja a borosüveget. Tökéletes ajándék motorosoknak és bor kedvelőknek! Tartós PLA anyagból készült.",
      "sku": "LAY-BOROS-055",
      "image": [
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
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 12000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-BOROS-055",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Motoros borostartó",
        "slug": "motoros-borostarto",
        "short_description": "3D nyomtatott motoros figurás bortartó/borostartó. A motor formájú tartó elegánsan tartja a borosüveget. Tökéletes ajándék motorosoknak és bor kedvelőknek! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott motoros figurás bortartó/borostartó. A motor formájú tartó elegánsan tartja a borosüveget. Tökéletes ajándék motorosoknak és bor kedvelőknek! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a borostartó egyszerre praktikus palacktartó és látványos asztali dekoráció. A karakteres forma kiemeli a belehelyezett borosüveget, így a palack nem egyszerűen tárolva van, hanem az ajándék vagy a teríték részeként jelenik meg.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Jól mutat étkezőben, nappaliban, bárpulton vagy borospolcon, és különlegesebb megoldást kínál a hagyományos ajándéktasaknál. A 3D nyomtatott PLA részletes formavilágot tesz lehetővé, miközben a kialakítás standard borosüveg bemutatására alkalmas.</p>\n<p><strong>Öröm adni és használni.</strong> Kiváló ajándék borrajongóknak és mindazoknak, akik szeretik a témához illő, beszélgetést indító lakásdekorációkat. A tartó önmagában is figyelemfelkeltő, egy gondosan kiválasztott palackkal együtt pedig teljes, átadható ajándékcsomaggá válik.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha a funkcionalitás mellett az első benyomás is fontos: ez a tartó azonnal fókuszba helyezi a palackot, és személyesebbé teszi az alkalmat.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Bordázott gömb lámpa",
      "meta_leiras": "3D nyomtatott bordázott gömb alakú LED lámpa. Elegáns, modern design, hangulatos megvilágítás. USB táplálás. Tartós PLA anyagból készült.",
      "slug": "bordazott-gomb-lampa",
      "kozossegi_cim": "Bordázott gömb lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/56-bordazott-gomb-lampa/56-bordazott-gomb-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Bordázott gömb lámpa",
      "description": "3D nyomtatott bordázott gömb alakú LED lámpa. Elegáns, modern design, hangulatos megvilágítás. USB táplálás. Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-056",
      "image": [
        "assets/kulcstartok/56-bordazott-gomb-lampa/56-bordazott-gomb-lampa-01.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 8000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-056",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Bordázott gömb lámpa",
        "slug": "bordazott-gomb-lampa",
        "short_description": "3D nyomtatott bordázott gömb alakú LED lámpa. Elegáns, modern design, hangulatos megvilágítás. USB táplálás. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott bordázott gömb alakú LED lámpa. Elegáns, modern design, hangulatos megvilágítás. USB táplálás. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Days Until Christmas visszaszámláló",
      "meta_leiras": "3D nyomtatott \"Days Until Christmas\" karácsonyi visszaszámláló tábla cserélhető számokkal. Hangulatos karácsonyi dekoráció az egész adventi időszakra! Tartós PLA anyagból készült.",
      "slug": "days-until-christmas-visszaszamlalo",
      "kozossegi_cim": "Days Until Christmas visszaszámláló",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Days Until Christmas visszaszámláló",
      "description": "3D nyomtatott \"Days Until Christmas\" karácsonyi visszaszámláló tábla cserélhető számokkal. Hangulatos karácsonyi dekoráció az egész adventi időszakra! Tartós PLA anyagból készült.",
      "sku": "LAY-KARI-057",
      "image": [
        "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-01.jpg",
        "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-02.jpg",
        "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-03.jpg",
        "assets/kulcstartok/57-days-until-christmas-visszaszamlalo/57-days-until-christmas-visszaszamlalo-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 8000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-KARI-057",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Days Until Christmas visszaszámláló",
        "slug": "days-until-christmas-visszaszamlalo",
        "short_description": "3D nyomtatott \"Days Until Christmas\" karácsonyi visszaszámláló tábla cserélhető számokkal. Hangulatos karácsonyi dekoráció az egész adventi időszakra! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott &quot;Days Until Christmas&quot; karácsonyi visszaszámláló tábla cserélhető számokkal. Hangulatos karácsonyi dekoráció az egész adventi időszakra! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "karacsony"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Karácsonyi falu lámpa",
      "meta_leiras": "3D nyomtatott karácsonyi falu LED lámpa. Mesebeli karácsonyi falu megvilágítva, USB táplálással. Hangulatos karácsonyi dekoráció! Tartós PLA anyagból készült.",
      "slug": "karacsonyi-falu-lampa",
      "kozossegi_cim": "Karácsonyi falu lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Karácsonyi falu lámpa",
      "description": "3D nyomtatott karácsonyi falu LED lámpa. Mesebeli karácsonyi falu megvilágítva, USB táplálással. Hangulatos karácsonyi dekoráció! Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-058",
      "image": [
        "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-01.jpg",
        "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-02.jpg",
        "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-03.jpg",
        "assets/kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 15000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-058",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Karácsonyi falu lámpa",
        "slug": "karacsonyi-falu-lampa",
        "short_description": "3D nyomtatott karácsonyi falu LED lámpa. Mesebeli karácsonyi falu megvilágítva, USB táplálással. Hangulatos karácsonyi dekoráció! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott karácsonyi falu LED lámpa. Mesebeli karácsonyi falu megvilágítva, USB táplálással. Hangulatos karácsonyi dekoráció! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "karacsony"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Voronoi szögletes lámpa",
      "meta_leiras": "3D nyomtatott Voronoi mintás szögletes LED lámpa. A Voronoi geometrikus minta gyönyörű fényeffektust hoz létre. USB táplálás. Tartós PLA anyagból készült.",
      "slug": "voronoi-szogletes-lampa",
      "kozossegi_cim": "Voronoi szögletes lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Voronoi szögletes lámpa",
      "description": "3D nyomtatott Voronoi mintás szögletes LED lámpa. A Voronoi geometrikus minta gyönyörű fényeffektust hoz létre. USB táplálás. Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-059",
      "image": [
        "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-01.jpg",
        "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-02.jpg",
        "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-03.jpg",
        "assets/kulcstartok/59-voronoi-szogletes-lampa/59-voronoi-szogletes-lampa-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-059",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Voronoi szögletes lámpa",
        "slug": "voronoi-szogletes-lampa",
        "short_description": "3D nyomtatott Voronoi mintás szögletes LED lámpa. A Voronoi geometrikus minta gyönyörű fényeffektust hoz létre. USB táplálás. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Voronoi mintás szögletes LED lámpa. A Voronoi geometrikus minta gyönyörű fényeffektust hoz létre. USB táplálás. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Családi szobor",
      "meta_leiras": "3D nyomtatott családi szobor figurák. Személyre szabható családi szobor, a család tagjainak számával megegyező figurákkal. Tartós PLA anyagból készült.",
      "slug": "csaladi-szobor",
      "kozossegi_cim": "Családi szobor",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/60-csaladi-szobor/60-csaladi-szobor-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Családi szobor",
      "description": "3D nyomtatott családi szobor figurák. Személyre szabható családi szobor, a család tagjainak számával megegyező figurákkal. Tartós PLA anyagból készült.",
      "sku": "LAY-SZOB-060",
      "image": [
        "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-01.jpg",
        "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-02.jpg",
        "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-03.jpg",
        "assets/kulcstartok/60-csaladi-szobor/60-csaladi-szobor-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 8000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-SZOB-060",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Családi szobor",
        "slug": "csaladi-szobor",
        "short_description": "3D nyomtatott családi szobor figurák. Személyre szabható családi szobor, a család tagjainak számával megegyező figurákkal. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott családi szobor figurák. Személyre szabható családi szobor, a család tagjainak számával megegyező figurákkal. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> A szobor formája érzelmet és történetet visz a térbe. Polcon, komódon, íróasztalon vagy egy személyes emléksarok részeként is jól érvényesül, és kis mérete ellenére határozott hangulatot teremt.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A 3D nyomtatott rétegek finom textúrát adnak a felületnek, a gondosan kialakított sziluett pedig több nézőpontból is érdekes. Könnyen elhelyezhető dekoráció, amely modern és otthonos enteriőrben egyaránt működik.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként ez a darab többet mond egy általános dísztárgynál: kapcsolódhat családhoz, szerelemhez, közös emlékhez vagy a megajándékozott kedvenc témájához. Születésnapra, évfordulóra vagy csak úgy, figyelmességként is maradandó választás.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes, személyes és könnyen szerethető dekorációt keresel, amely nap mint nap jelentést ad a környezetének.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "evfordulo",
        "csak-ugy",
        "babaszuletes",
        "anyak-napja"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Szarvas Shadow Box lámpa",
      "meta_leiras": "3D nyomtatott szarvas shadow box (árnyékdoboz) LED lámpa. A szarvas sziluettje gyönyörű árnyékot vet. USB táplálás. Tartós PLA anyagból készült.",
      "slug": "szarvas-shadow-box-lampa",
      "kozossegi_cim": "Szarvas Shadow Box lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Szarvas Shadow Box lámpa",
      "description": "3D nyomtatott szarvas shadow box (árnyékdoboz) LED lámpa. A szarvas sziluettje gyönyörű árnyékot vet. USB táplálás. Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-061",
      "image": [
        "assets/kulcstartok/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-01.jpg",
        "assets/kulcstartok/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-02.jpg",
        "assets/kulcstartok/61-szarvas-shadow-box-lampa/61-szarvas-shadow-box-lampa-03.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 15000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-061",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Szarvas Shadow Box lámpa",
        "slug": "szarvas-shadow-box-lampa",
        "short_description": "3D nyomtatott szarvas shadow box (árnyékdoboz) LED lámpa. A szarvas sziluettje gyönyörű árnyékot vet. USB táplálás. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott szarvas shadow box (árnyékdoboz) LED lámpa. A szarvas sziluettje gyönyörű árnyékot vet. USB táplálás. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Baba elefánt születési lámpa",
      "meta_leiras": "3D nyomtatott baba elefánt születési emlék LED lámpa. Személyre szabható a baba nevével, születési adataival. Gyönyörű ajándék újszülöttnek! USB táplálás. Tartós PLA anyagból készült.",
      "slug": "baba-elefant-szuletesi-lampa",
      "kozossegi_cim": "Baba elefánt születési lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Baba elefánt születési lámpa",
      "description": "3D nyomtatott baba elefánt születési emlék LED lámpa. Személyre szabható a baba nevével, születési adataival. Gyönyörű ajándék újszülöttnek! USB táplálás. Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-062",
      "image": [
        "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-01.jpg",
        "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-02.jpg",
        "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-03.jpg",
        "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-04.jpg",
        "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-05.jpg",
        "assets/kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-06.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 12000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-062",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Baba elefánt születési lámpa",
        "slug": "baba-elefant-szuletesi-lampa",
        "short_description": "3D nyomtatott baba elefánt születési emlék LED lámpa. Személyre szabható a baba nevével, születési adataival. Gyönyörű ajándék újszülöttnek! USB táplálás. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott baba elefánt születési emlék LED lámpa. Személyre szabható a baba nevével, születési adataival. Gyönyörű ajándék újszülöttnek! USB táplálás. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat"
      ],
      "alkalom": [
        "babaszuletes"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Szarvas borostartó",
      "meta_leiras": "3D nyomtatott szarvas formájú bortartó/borostartó. A szarvas agancsai elegánsan tartják a borosüveget. Tökéletes ajándék vadász és bor kedvelőknek! Tartós PLA anyagból készült.",
      "slug": "szarvas-borostarto",
      "kozossegi_cim": "Szarvas borostartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/63-szarvas-borostarto/63-szarvas-borostarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Szarvas borostartó",
      "description": "3D nyomtatott szarvas formájú bortartó/borostartó. A szarvas agancsai elegánsan tartják a borosüveget. Tökéletes ajándék vadász és bor kedvelőknek! Tartós PLA anyagból készült.",
      "sku": "LAY-BOROS-063",
      "image": [
        "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-01.jpg",
        "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-02.jpg",
        "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-03.jpg",
        "assets/kulcstartok/63-szarvas-borostarto/63-szarvas-borostarto-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-BOROS-063",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Szarvas borostartó",
        "slug": "szarvas-borostarto",
        "short_description": "3D nyomtatott szarvas formájú bortartó/borostartó. A szarvas agancsai elegánsan tartják a borosüveget. Tökéletes ajándék vadász és bor kedvelőknek! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott szarvas formájú bortartó/borostartó. A szarvas agancsai elegánsan tartják a borosüveget. Tökéletes ajándék vadász és bor kedvelőknek! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a borostartó egyszerre praktikus palacktartó és látványos asztali dekoráció. A karakteres forma kiemeli a belehelyezett borosüveget, így a palack nem egyszerűen tárolva van, hanem az ajándék vagy a teríték részeként jelenik meg.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Jól mutat étkezőben, nappaliban, bárpulton vagy borospolcon, és különlegesebb megoldást kínál a hagyományos ajándéktasaknál. A 3D nyomtatott PLA részletes formavilágot tesz lehetővé, miközben a kialakítás standard borosüveg bemutatására alkalmas.</p>\n<p><strong>Öröm adni és használni.</strong> Kiváló ajándék borrajongóknak és mindazoknak, akik szeretik a témához illő, beszélgetést indító lakásdekorációkat. A tartó önmagában is figyelemfelkeltő, egy gondosan kiválasztott palackkal együtt pedig teljes, átadható ajándékcsomaggá válik.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha a funkcionalitás mellett az első benyomás is fontos: ez a tartó azonnal fókuszba helyezi a palackot, és személyesebbé teszi az alkalmat.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Karácsonyi fenyőfa lámpa",
      "meta_leiras": "3D nyomtatott karácsonyi fenyőfa és templom LED lámpa. Mesebeli karácsonyi jelenet megvilágítva. USB táplálás. Tartós PLA anyagból készült.",
      "slug": "karacsonyi-fenyofa-lampa",
      "kozossegi_cim": "Karácsonyi fenyőfa lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Karácsonyi fenyőfa lámpa",
      "description": "3D nyomtatott karácsonyi fenyőfa és templom LED lámpa. Mesebeli karácsonyi jelenet megvilágítva. USB táplálás. Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-064",
      "image": [
        "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-01.jpg",
        "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-02.jpg",
        "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-03.jpg",
        "assets/kulcstartok/64-karacsonyi-fenyofa-lampa/64-karacsonyi-fenyofa-lampa-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 15000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-064",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Karácsonyi fenyőfa lámpa",
        "slug": "karacsonyi-fenyofa-lampa",
        "short_description": "3D nyomtatott karácsonyi fenyőfa és templom LED lámpa. Mesebeli karácsonyi jelenet megvilágítva. USB táplálás. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott karácsonyi fenyőfa és templom LED lámpa. Mesebeli karácsonyi jelenet megvilágítva. USB táplálás. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "karacsony"
      ],
      "stilus": [
        "feny",
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Lord of the Rings plakát tábla",
      "meta_leiras": "3D nyomtatott Lord of the Rings (Gyűrűk Ura) plakát tábla. Részletes dombornyomott design. Tökéletes ajándék Tolkien rajongóknak! Tartós PLA anyagból készült.",
      "slug": "lord-of-the-rings-plakat-tabla",
      "kozossegi_cim": "Lord of the Rings plakát tábla",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Lord of the Rings plakát tábla",
      "description": "3D nyomtatott Lord of the Rings (Gyűrűk Ura) plakát tábla. Részletes dombornyomott design. Tökéletes ajándék Tolkien rajongóknak! Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-065",
      "image": [
        "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-01.jpg",
        "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-02.jpg",
        "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-03.jpg",
        "assets/kulcstartok/65-lord-of-the-rings-plakat-tabla/65-lord-of-the-rings-plakat-tabla-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 8000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-065",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Lord of the Rings plakát tábla",
        "slug": "lord-of-the-rings-plakat-tabla",
        "short_description": "3D nyomtatott Lord of the Rings (Gyűrűk Ura) plakát tábla. Részletes dombornyomott design. Tökéletes ajándék Tolkien rajongóknak! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Lord of the Rings (Gyűrűk Ura) plakát tábla. Részletes dombornyomott design. Tökéletes ajándék Tolkien rajongóknak! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Őszi leveles tál",
      "meta_leiras": "3D nyomtatott őszi leveles dombornyomott dekoratív tál. Gyönyörű őszi leveles mintázattal, különböző színekben. Tartós PLA anyagból készült.",
      "slug": "oszi-leveles-tal",
      "kozossegi_cim": "Őszi leveles tál",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/66-oszi-leveles-tal/66-oszi-leveles-tal-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Őszi leveles tál",
      "description": "3D nyomtatott őszi leveles dombornyomott dekoratív tál. Gyönyörű őszi leveles mintázattal, különböző színekben. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-066",
      "image": [
        "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-01.jpg",
        "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-02.jpg",
        "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-03.jpg",
        "assets/kulcstartok/66-oszi-leveles-tal/66-oszi-leveles-tal-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 5000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-066",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Őszi leveles tál",
        "slug": "oszi-leveles-tal",
        "short_description": "3D nyomtatott őszi leveles dombornyomott dekoratív tál. Gyönyörű őszi leveles mintázattal, különböző színekben. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott őszi leveles dombornyomott dekoratív tál. Gyönyörű őszi leveles mintázattal, különböző színekben. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a karakteres 3D nyomtatott dekoráció kis részletekkel teszi személyesebbé az otthont. Polcon, komódon, asztalon vagy egy tematikus összeállítás részeként is könnyen elhelyezhető.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rétegről rétegre felépített forma közelről izgalmas textúrát, távolabbról egységes sziluettet mutat. A könnyű PLA anyag praktikus, a tárgy pedig egyszerűen áthelyezhető, amikor új hangulatot szeretnél teremteni.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is jó választás, mert nem tömegtermék-hatású, hanem egy konkrét érdeklődéshez, alkalomhoz vagy enteriőrhöz kapcsolódik. Születésnapra, ünnepre, lakásavatóra vagy kedves meglepetésként is örömet szerezhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy látványos, mégis könnyen kombinálható darabot keresel, amely több személyiséget visz a helyiségbe.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "enabled": false,
      "kinek": [],
      "alkalom": [],
      "stilus": []
    },
    "ajanlhato": false
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Leveles virágtartó",
      "meta_leiras": "3D nyomtatott leveles mintás dekoratív virágtartó kaspó. Terrakotta hatású, természetes megjelenés. Tartós PLA anyagból készült.",
      "slug": "leveles-viragtarto",
      "kozossegi_cim": "Leveles virágtartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/67-leveles-viragtarto/67-leveles-viragtarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Leveles virágtartó",
      "description": "3D nyomtatott leveles mintás dekoratív virágtartó kaspó. Terrakotta hatású, természetes megjelenés. Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-067",
      "image": [
        "assets/kulcstartok/67-leveles-viragtarto/67-leveles-viragtarto-01.jpg",
        "assets/kulcstartok/67-leveles-viragtarto/67-leveles-viragtarto-02.jpg",
        "assets/kulcstartok/67-leveles-viragtarto/67-leveles-viragtarto-03.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 5000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-067",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Leveles virágtartó",
        "slug": "leveles-viragtarto",
        "short_description": "3D nyomtatott leveles mintás dekoratív virágtartó kaspó. Terrakotta hatású, természetes megjelenés. Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott leveles mintás dekoratív virágtartó kaspó. Terrakotta hatású, természetes megjelenés. Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a darab természetközeli formát és modern 3D nyomtatott textúrát visz az otthonba. Polcon, komódon, étkezőasztalon vagy ablakpárkányon is könnyen elhelyezhető, és önmagában, illetve virággal vagy növénnyel együtt is dekoratív hatást kelt.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rétegezett felület közelről különleges részleteket mutat, távolabbról pedig egységes, rendezett sziluettet ad. Könnyű súlya miatt egyszerűen áthelyezhető, így az évszakhoz vagy az aktuális enteriőrhöz igazítva több helyiségben is használható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is jó választás lakásavatóra, születésnapra vagy egy kedves, maradandó figyelmességként. Azoknak szól, akik a sablonos dekoráció helyett karakteres, kis szériás tárgyat szeretnének.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy könnyen kombinálható dekorációt keresel, amely melegebbé és személyesebbé teszi a környezetét anélkül, hogy túlzsúfolná azt.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy",
        "anyak-napja"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "F1 2025 versenynaptár",
      "meta_leiras": "3D nyomtatott Formula 1 2025-ös szezon versenynaptár. Az összes 2025-ös F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "slug": "f1-2025-versenynaptar",
      "kozossegi_cim": "F1 2025 versenynaptár",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "F1 2025 versenynaptár",
      "description": "3D nyomtatott Formula 1 2025-ös szezon versenynaptár. Az összes 2025-ös F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
      "sku": "LAY-F1-068",
      "image": [
        "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-01.jpg",
        "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-02.jpg",
        "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-03.jpg",
        "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-04.jpg",
        "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-05.jpg",
        "assets/kulcstartok/68-f1-2025-versenynaptar/68-f1-2025-versenynaptar-06.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 8000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-F1-068",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "F1 2025 versenynaptár",
        "slug": "f1-2025-versenynaptar",
        "short_description": "3D nyomtatott Formula 1 2025-ös szezon versenynaptár. Az összes 2025-ös F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Formula 1 2025-ös szezon versenynaptár. Az összes 2025-ös F1 verseny dátuma és helyszíne egy dekoratív táblán. Tökéletes ajándék F1 rajongóknak! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a tábla egyetlen pillantással átadja a témáját, ezért hatásos dekoráció falon, polcon, íróasztalon vagy egy tematikus gyűjtemény részeként. A 3D nyomtatott, domború részletek több mélységet adnak a grafikának, mint egy hagyományos sík nyomat.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rendezett kontúrok és jól felismerhető elemek közelről is érdekesek, miközben távolabbról egységes vizuális hangsúlyt teremtenek. Könnyű darab, ezért egyszerűen áthelyezhető és az aktuális dekorációhoz igazítható.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként célzott és személyes választás mindenkinek, aki kötődik a megjelenített témához. Dolgozószobában, gyerekszobában, rajongói sarokban vagy szezonális összeállításban is azonnal beszédtémává válhat.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy tartós, karakteres és a megszokott posztereknél térbelibb dekorációval szeretnéd kifejezni az érdeklődésedet.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Stitch névtábla lámpa",
      "meta_leiras": "3D nyomtatott Stitch figurás személyre szabható névtábla LED lámpa. A gyerek neve világít a Stitch figura mellett! USB táplálás. Tökéletes ajándék Disney rajongó gyerekeknek! Tartós PLA anyagból készült.",
      "slug": "stitch-nevtabla-lampa",
      "kozossegi_cim": "Stitch névtábla lámpa",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Stitch névtábla lámpa",
      "description": "3D nyomtatott Stitch figurás személyre szabható névtábla LED lámpa. A gyerek neve világít a Stitch figura mellett! USB táplálás. Tökéletes ajándék Disney rajongó gyerekeknek! Tartós PLA anyagból készült.",
      "sku": "LAY-LAMP-069",
      "image": [
        "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-01.jpg",
        "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-02.jpg",
        "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-03.jpg",
        "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-04.jpg",
        "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-05.jpg",
        "assets/kulcstartok/69-stitch-nevtabla-lampa/69-stitch-nevtabla-lampa-06.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-LAMP-069",
        "fizikailag": 5,
        "foglalt": 0,
        "elerheto": 5,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Stitch névtábla lámpa",
        "slug": "stitch-nevtabla-lampa",
        "short_description": "3D nyomtatott Stitch figurás személyre szabható névtábla LED lámpa. A gyerek neve világít a Stitch figura mellett! USB táplálás. Tökéletes ajándék Disney rajongó gyerekeknek! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott Stitch figurás személyre szabható névtábla LED lámpa. A gyerek neve világít a Stitch figura mellett! USB táplálás. Tökéletes ajándék Disney rajongó gyerekeknek! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a lámpa nappal dekoratív tárgy, bekapcsolva pedig hangulatos fényforrás, amely azonnal karaktert ad a szobának. A 3D nyomtatott felületek és a megvilágítás együtt emelik ki a motívum részleteit, ezért polcon, éjjeliszekrényen vagy íróasztalon is látványos fókuszpont.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> Kellemes választás pihenéshez, esti olvasáshoz vagy visszafogott háttérfénynek. Az USB-s használat egyszerűen beilleszthető a mindennapokba, a könnyű, mégis stabil PLA burkolat pedig modern, rendezett megjelenést ad.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként különösen személyes hatású, mert nem csupán dísztárgyat, hanem használható élményt ad. Jó választás születésnapra, ünnepre, gyerekszobába, gamer sarokba vagy minden olyan helyre, ahol a tulajdonos kedvenc témája fényben is megjelenhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes dekorációt keresel, amely lekapcsolva is mutatós, felkapcsolva pedig teljesen új hangulatot teremt. A részletek fénnyel válnak igazán élővé, ezért a termék minden napszakban más oldalát mutatja.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "feny",
        "dekor",
        "rajongoi"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Ölelkező pár szobor",
      "meta_leiras": "3D nyomtatott ölelkező pár szobor. Romantikus dekoráció, tökéletes Valentin-napi vagy évfordulós ajándék! Tartós PLA anyagból készült.",
      "slug": "olelkezo-par-szobor",
      "kozossegi_cim": "Ölelkező pár szobor",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/70-olelkezo-par-szobor/70-olelkezo-par-szobor-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Ölelkező pár szobor",
      "description": "3D nyomtatott ölelkező pár szobor. Romantikus dekoráció, tökéletes Valentin-napi vagy évfordulós ajándék! Tartós PLA anyagból készült.",
      "sku": "LAY-SZOB-070",
      "image": [
        "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-01.jpg",
        "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-02.jpg",
        "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-03.jpg",
        "assets/kulcstartok/70-olelkezo-par-szobor/70-olelkezo-par-szobor-04.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 6000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-SZOB-070",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Ölelkező pár szobor",
        "slug": "olelkezo-par-szobor",
        "short_description": "3D nyomtatott ölelkező pár szobor. Romantikus dekoráció, tökéletes Valentin-napi vagy évfordulós ajándék! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott ölelkező pár szobor. Romantikus dekoráció, tökéletes Valentin-napi vagy évfordulós ajándék! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> A szobor formája érzelmet és történetet visz a térbe. Polcon, komódon, íróasztalon vagy egy személyes emléksarok részeként is jól érvényesül, és kis mérete ellenére határozott hangulatot teremt.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A 3D nyomtatott rétegek finom textúrát adnak a felületnek, a gondosan kialakított sziluett pedig több nézőpontból is érdekes. Könnyen elhelyezhető dekoráció, amely modern és otthonos enteriőrben egyaránt működik.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándékként ez a darab többet mond egy általános dísztárgynál: kapcsolódhat családhoz, szerelemhez, közös emlékhez vagy a megajándékozott kedvenc témájához. Születésnapra, évfordulóra vagy csak úgy, figyelmességként is maradandó választás.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy beszédes, személyes és könnyen szerethető dekorációt keresel, amely nap mint nap jelentést ad a környezetének.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "evfordulo",
        "csak-ugy"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
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
    "visszakuldheto": true,
    "seo": {
      "cim": "Szív EKG dekor",
      "meta_leiras": "3D nyomtatott szív EKG (szívverés) vonalú dekoráció. Romantikus ajándék pároknak, orvosoknak, nővéreknek! Tartós PLA anyagból készült.",
      "slug": "sziv-ekg-dekor",
      "kozossegi_cim": "Szív EKG dekor",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/71-sziv-ekg-dekor/71-sziv-ekg-dekor-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Szív EKG dekor",
      "description": "3D nyomtatott szív EKG (szívverés) vonalú dekoráció. Romantikus ajándék pároknak, orvosoknak, nővéreknek! Tartós PLA anyagból készült.",
      "sku": "LAY-DECO-071",
      "image": [
        "assets/kulcstartok/71-sziv-ekg-dekor/71-sziv-ekg-dekor-01.jpg",
        "assets/kulcstartok/71-sziv-ekg-dekor/71-sziv-ekg-dekor-02.jpg",
        "assets/kulcstartok/71-sziv-ekg-dekor/71-sziv-ekg-dekor-03.jpg"
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 4000,
        "availability": "https://schema.org/InStock"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-DECO-071",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Szív EKG dekor",
        "slug": "sziv-ekg-dekor",
        "short_description": "3D nyomtatott szív EKG (szívverés) vonalú dekoráció. Romantikus ajándék pároknak, orvosoknak, nővéreknek! Tartós PLA anyagból készült.",
        "description": "<p>3D nyomtatott szív EKG (szívverés) vonalú dekoráció. Romantikus ajándék pároknak, orvosoknak, nővéreknek! Tartós PLA anyagból készült.</p>\n<p><strong>Miért jó választás?</strong> Ez a karakteres 3D nyomtatott dekoráció kis részletekkel teszi személyesebbé az otthont. Polcon, komódon, asztalon vagy egy tematikus összeállítás részeként is könnyen elhelyezhető.</p>\n<p><strong>Részletek, amelyek számítanak.</strong> A rétegről rétegre felépített forma közelről izgalmas textúrát, távolabbról egységes sziluettet mutat. A könnyű PLA anyag praktikus, a tárgy pedig egyszerűen áthelyezhető, amikor új hangulatot szeretnél teremteni.</p>\n<p><strong>Öröm adni és használni.</strong> Ajándéknak is jó választás, mert nem tömegtermék-hatású, hanem egy konkrét érdeklődéshez, alkalomhoz vagy enteriőrhöz kapcsolódik. Születésnapra, ünnepre, lakásavatóra vagy kedves meglepetésként is örömet szerezhet.</p>\n<p><strong>Tedd személyesebbé a mindennapokat.</strong> Válaszd, ha egy látványos, mégis könnyen kombinálható darabot keresel, amely több személyiséget visz a helyiségbe.</p>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ],
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "evfordulo",
        "csak-ugy"
      ],
      "stilus": [
        "dekor"
      ],
      "enabled": true
    }
  },
  {
    "id": "maci-szivvel-kulcstarto",
    "nev": "Maci szívvel kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-01.jpg",
      "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-02.jpg",
      "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-03.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-01.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-02.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-03.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-04.jpg",
      "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-05.jpg"
    ],
    "leiras": "Választható színű macis kulcstartó piros szívvel és kötött mintát idéző felülettel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kis medve két mancsával tartja a piros szívet. A 3D nyomtatott felület szövetszerű mintázata különleges részletet ad a figurának; szeretetteljes apró ajándék párnak vagy barátnak.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [
      {
        "id": "szin",
        "nev": "Szín",
        "ertekek": [
          "Barna",
          "Kék"
        ],
        "variacio": true
      }
    ],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badges": [
      {
        "id": "inStock"
      }
    ],
    "variaciok": [
      {
        "id": "19",
        "sku": "LAY-KEY-027-V",
        "regi_id": "maci-szivvel-barna-kulcstarto",
        "attributumok": {
          "szin": "Barna"
        },
        "ar": 10,
        "kepek": [
          "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-01.jpg",
          "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-02.jpg",
          "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-03.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-01.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-02.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-03.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-04.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-05.jpg"
        ],
        "rendelheto": true,
        "max_mennyiseg": 10
      },
      {
        "id": "20",
        "sku": "LAY-KEY-028-V",
        "regi_id": "maci-szivvel-kek-kulcstarto",
        "attributumok": {
          "szin": "Kék"
        },
        "ar": 10,
        "kepek": [
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-01.jpg",
          "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-02.jpg",
          "assets/kulcstartok/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-03.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-02.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-03.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-04.jpg",
          "assets/kulcstartok/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-05.jpg"
        ],
        "rendelheto": true,
        "max_mennyiseg": 10
      }
    ],
    "ar_max": 10,
    "ajandek": {
      "version": 1,
      "kinek": [
        "par",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "evfordulo",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    },
    "ajanlhato": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Maci szívvel kulcstartó",
      "meta_leiras": "Választható színű macis kulcstartó piros szívvel és kötött mintát idéző felülettel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "maci-szivvel-kulcstarto",
      "kozossegi_cim": "Maci szívvel kulcstartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Maci szívvel kulcstartó",
      "description": "Választható színű macis kulcstartó piros szívvel és kötött mintát idéző felülettel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-VAR-MACI-SZIV",
      "image": [
        "/images/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-01.jpg",
        "/images/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-02.jpg",
        "/images/27-maci-szivvel-barna-kulcstarto/27-maci-szivvel-barna-kulcstarto-03.jpg",
        "/images/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-01.jpg",
        "/images/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-02.jpg",
        "/images/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-03.jpg",
        "/images/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-04.jpg",
        "/images/28-maci-szivvel-kek-kulcstarto/28-maci-szivvel-kek-kulcstarto-05.jpg"
      ],
      "url": "https://layero.ro/termek/maci-szivvel-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/maci-szivvel-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-VAR-MACI-SZIV",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      },
      {
        "variacio_id": 19,
        "sku": "LAY-KEY-027-V",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      },
      {
        "variacio_id": 20,
        "sku": "LAY-KEY-028-V",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Maci szívvel kulcstartó",
        "slug": "maci-szivvel-kulcstarto",
        "short_description": "Választható színű macis kulcstartó piros szívvel és kötött mintát idéző felülettel. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kis medve két mancsával tartja a piros szívet. A 3D nyomtatott felület szövetszerű mintázata különleges részletet ad a figurának; szeretetteljes apró ajándék párnak vagy barátnak.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ]
  },
  {
    "id": "polip-kulcstarto",
    "nev": "Polip kulcstartó",
    "cat": "kulcstartok",
    "ar": 10,
    "kepek": [
      "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-01.jpg",
      "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-02.jpg",
      "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-03.jpg",
      "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-02.jpg",
      "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-01.jpg",
      "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-03.jpg"
    ],
    "leiras": "választható színű polip kulcstartó tagolt, mozgatható karokkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
    "hosszu": [
      "A kerek fej körül szétterülő karok látványos sziluettet adnak a választható színű polipnak. A csuklós részeknek köszönhetően a figura alakja mozgatható, így minden kézbevételnél más pózt vehet fel.",
      "3D nyomtatott PLA figura, fém kulcskarikával. A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek. Az ár 1 darab kulcstartóra vonatkozik."
    ],
    "opciok": [
      {
        "id": "szin",
        "nev": "Szín",
        "ertekek": [
          "Piros",
          "Rózsaszín"
        ],
        "variacio": true
      }
    ],
    "specs": [
      [
        "Méret (tájékoztató)",
        "Kb. 4–5 cm (a nyomtatott rész hossza, fémkarika nélkül)."
      ]
    ],
    "keszleten": true,
    "badges": [
      {
        "id": "inStock"
      }
    ],
    "variaciok": [
      {
        "id": "21",
        "sku": "LAY-KEY-031-V",
        "regi_id": "polip-piros-kulcstarto",
        "attributumok": {
          "szin": "Piros"
        },
        "ar": 10,
        "kepek": [
          "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-01.jpg",
          "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-02.jpg",
          "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-03.jpg",
          "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-02.jpg",
          "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-01.jpg",
          "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-03.jpg"
        ],
        "rendelheto": true,
        "max_mennyiseg": 10
      },
      {
        "id": "22",
        "sku": "LAY-KEY-032-V",
        "regi_id": "polip-rozsaszin-kulcstarto",
        "attributumok": {
          "szin": "Rózsaszín"
        },
        "ar": 10,
        "kepek": [
          "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-02.jpg",
          "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-02.jpg",
          "assets/kulcstartok/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-03.jpg",
          "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-01.jpg",
          "assets/kulcstartok/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-03.jpg"
        ],
        "rendelheto": true,
        "max_mennyiseg": 10
      }
    ],
    "ar_max": 10,
    "ajandek": {
      "version": 1,
      "kinek": [
        "gyerek",
        "par",
        "szulo",
        "barat",
        "magam"
      ],
      "alkalom": [
        "szuletesnap",
        "karacsony",
        "csak-ugy"
      ],
      "stilus": [
        "praktikus"
      ],
      "enabled": true
    },
    "ajanlhato": true,
    "szemelyre_szabott": false,
    "visszakuldheto": true,
    "seo": {
      "cim": "Polip kulcstartó",
      "meta_leiras": "választható színű polip kulcstartó tagolt, mozgatható karokkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "slug": "polip-kulcstarto",
      "kozossegi_cim": "Polip kulcstartó",
      "kozossegi_leiras": "",
      "kozossegi_kep": "/images/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-01.jpg"
    },
    "azonositok": [],
    "csatornak": {
      "webshop": true,
      "seo": true,
      "google": false,
      "meta": false
    },
    "structured_data": {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Polip kulcstartó",
      "description": "választható színű polip kulcstartó tagolt, mozgatható karokkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
      "sku": "LAY-VAR-POLIP",
      "image": [
        "/images/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-01.jpg",
        "/images/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-02.jpg",
        "/images/31-polip-piros-kulcstarto/31-polip-piros-kulcstarto-03.jpg",
        "/images/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-02.jpg",
        "/images/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-01.jpg",
        "/images/32-polip-rozsaszin-kulcstarto/32-polip-rozsaszin-kulcstarto-03.jpg"
      ],
      "url": "https://layero.ro/termek/polip-kulcstarto",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RON",
        "price": 10,
        "availability": "https://schema.org/InStock",
        "url": "https://layero.ro/termek/polip-kulcstarto"
      }
    },
    "keszlet_adatok": [
      {
        "variacio_id": null,
        "sku": "LAY-VAR-POLIP",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      },
      {
        "variacio_id": 21,
        "sku": "LAY-KEY-031-V",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      },
      {
        "variacio_id": 22,
        "sku": "LAY-KEY-032-V",
        "fizikailag": 10,
        "foglalt": 0,
        "elerheto": 10,
        "minimum": 0,
        "varhato_beerkezes": null,
        "polc": "",
        "forras": "local"
      }
    ],
    "gyartas": {
      "mode": "stocked",
      "ready_now": true,
      "lead_days": 0,
      "message": "Saját készleten — azonnal csomagolható."
    },
    "kapcsolatok": {
      "kapcsolodo": [],
      "kiegeszitok": [],
      "upsell": []
    },
    "csomagok": [],
    "nyelvek": {
      "hu": {
        "name": "Polip kulcstartó",
        "slug": "polip-kulcstarto",
        "short_description": "választható színű polip kulcstartó tagolt, mozgatható karokkal. A nyomtatott rész hossza kb. 4–5 cm, fémkarika nélkül.",
        "description": "<p>A kerek fej körül szétterülő karok látványos sziluettet adnak a választható színű polipnak. A csuklós részeknek köszönhetően a figura alakja mozgatható, így minden kézbevételnél más pózt vehet fel.</p>\n<ul>\n<li>3D nyomtatott PLA figura, fém kulcskarikával.</li>\n<li>A nyomtatott rész hossza kb. 4–5 cm; a fémkarika és a lánc nem része ennek a méretnek.</li>\n<li>Az ár 1 darab kulcstartóra vonatkozik.</li>\n</ul>",
        "seo_title": "",
        "meta_description": "",
        "social_title": "",
        "social_description": "",
        "social_image": ""
      }
    },
    "elerheto_nyelvek": [
      "hu"
    ]
  }
]);
