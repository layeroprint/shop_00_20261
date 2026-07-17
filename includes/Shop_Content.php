<?php

namespace LayeroShop;

if (! defined('ABSPATH')) {
	exit;
}

final class Shop_Content {
	public static function asset_url($path) {
		return LAYERO_SHOP_UI_URL . 'assets/demo/' . ltrim($path, '/');
	}

	public static function hero_slides() {
		return array(
			array(
				'eyebrow' => 'Személyre szabott 3D ajándékok',
				'title' => 'Ajándék, ami <em>rólad</em> szól.',
				'text' => 'Névre szóló lámpák, kulcstartók és dekorációk — egyetlen példányban, a te ötletedből nyomtatva.',
				'image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0009.webp')),
				'button_text' => 'Lámpák felfedezése',
				'button_url' => array('url' => '/termekek/?cat=lampak'),
				'secondary_text' => 'Összes termék ›',
				'secondary_url' => array('url' => '/termekek/'),
			),
			array(
				'eyebrow' => 'Tematikus lámpák',
				'title' => 'A fény, ami a <em>nevedet</em> mondja.',
				'text' => 'Egyedi tervezésű lámpák meleg LED-fénnyel — a te szövegeddel, a te dátumoddal, egyetlen példányban.',
				'image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0016.webp')),
				'button_text' => 'Lámpák megnézése',
				'button_url' => array('url' => '/termekek/?cat=lampak'),
				'secondary_text' => 'Összes termék ›',
				'secondary_url' => array('url' => '/termekek/'),
			),
			array(
				'eyebrow' => 'Egyedi rendelés',
				'title' => 'Van egy ötleted? <em>Legyártjuk.</em>',
				'text' => 'Küldd el az ötleted vagy egy referenciaképet — megtervezzük, és egyetlen példányban legyártjuk.',
				'image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0010.webp')),
				'button_text' => 'Ajánlatot kérek',
				'button_url' => array('url' => '/egyedi-rendeles/'),
				'secondary_text' => '',
				'secondary_url' => array('url' => ''),
			),
		);
	}

	public static function trust_items() {
		return array(
			array('icon' => 'truck', 'tint' => 'accent', 'title' => 'Ingyenes szállítás', 'text' => '200 lej feletti rendelésre'),
			array('icon' => 'tag', 'tint' => 'gold', 'title' => 'Már 50 lejtől', 'text' => 'alacsony minimális rendelés'),
			array('icon' => 'bolt', 'tint' => 'coral', 'title' => 'Gyors gyártás', 'text' => '5–10 munkanap alatt'),
			array('icon' => 'leaf', 'tint' => 'eco', 'title' => 'Környezetbarát', 'text' => 'PLA + napelemes gyártás'),
			array('icon' => 'pin', 'tint' => 'ink', 'title' => 'Helyi gyártás', 'text' => 'Szatmárnémetiben készül'),
		);
	}

	public static function whofor_items() {
		return array(
			array('icon' => 'smile', 'label' => 'Gyereknek', 'url' => array('url' => '/termekek/?cat=baba-gyerek')),
			array('icon' => 'star', 'label' => 'Rajongónak', 'url' => array('url' => '/termekek/?cat=rajongoi')),
			array('icon' => 'bulb', 'label' => 'Neki — fénnyel', 'url' => array('url' => '/termekek/?cat=lampak')),
			array('icon' => 'home', 'label' => 'Otthonra', 'url' => array('url' => '/termekek/?cat=dekoraciok')),
			array('icon' => 'gift', 'label' => 'Ünnepre', 'url' => array('url' => '/termekek/?cat=szezonalis')),
			array('icon' => 'briefcase', 'label' => 'Cégeknek', 'url' => array('url' => '/termekek/?cat=ceges')),
		);
	}

	public static function marquee_items() {
		return array(
			array('text' => 'Névre szóló'),
			array('text' => 'Egyetlen példány a világon'),
			array('text' => 'PLA biopolimer'),
			array('text' => 'Napelemes műhely'),
			array('text' => '5–10 nap alatt nálad'),
			array('text' => '2 év jótállás'),
			array('text' => '4.9★ vásárlói élmény'),
		);
	}

	public static function categories() {
		return array(
			array('id' => 'lampak', 'name' => 'Tematikus lámpák', 'description' => 'Névre szóló fény — LED-del, a te szövegeddel, esti rituálékhoz', 'image' => 'images/categories/layero-asset-0227-1100.webp', 'count' => 13),
			array('id' => 'kulcstartok', 'name' => 'Kulcstartók', 'description' => 'Apró, személyes ajándék, ami minden nap kézbe kerül', 'image' => 'images/categories/layero-asset-0226-1100.webp', 'count' => 45),
			array('id' => 'dekoraciok', 'name' => 'Dekorációk', 'description' => 'Vázák, kaspók és lakásdíszek, amiket máshol nem találsz meg', 'image' => 'images/categories/layero-asset-0223-1100.webp', 'count' => 13),
			array('id' => 'szezonalis', 'name' => 'Szezonális & Ünnepi', 'description' => 'Ünnepi darabok, amik évről évre előkerülnek — nem hervadnak el', 'image' => 'kulcstartok/58-karacsonyi-falu-lampa/58-karacsonyi-falu-lampa-01.jpg', 'count' => 8),
			array('id' => 'rajongoi', 'name' => 'Gyűjtői / rajongói', 'description' => 'Film, játék, sport és hobbi — ajándék, ami pontosan róla szól', 'image' => 'images/categories/layero-asset-0225-1100.webp', 'count' => 7),
			array('id' => 'baba-gyerek', 'name' => 'Baba & Gyerek', 'description' => 'Születési adatokkal, névvel — emlék, ami a gyerekszobában marad', 'image' => 'kulcstartok/62-baba-elefant-szuletesi-lampa/62-baba-elefant-szuletesi-lampa-01.jpg', 'count' => 2),
			array('id' => 'ceges', 'name' => 'Céges megoldások', 'description' => 'Logós ajándék és QR + NFC display — árajánlat egyeztetés alapján', 'image' => 'images/categories/layero-asset-0222-1100.webp', 'count' => 2, 'quote' => true),
			array('id' => 'egyedi', 'name' => 'Egyedi rendelés', 'description' => 'Küldd el az ötleted vagy referenciaképed — megtervezzük és legyártjuk', 'image' => 'images/categories/layero-asset-0224-1100.webp', 'count' => 1, 'quote' => true),
		);
	}

	public static function category_by_slug($slug) {
		foreach (self::categories() as $category) {
			if ($category['id'] === $slug) {
				return $category;
			}
		}

		return null;
	}

	public static function popular_product_ids() {
		return array('szam-lampa-nevvel', 'logos-kulcstarto', 'qr-nfc-display', 'tulipan-vaza', 'jurassic-lampa', 'bagoly-figura', 'holdfeny-lampa', 'camino-szobor');
	}

	public static function new_product_ids() {
		return array('hullam-gomblampa', 'tulipan-vaza', 'sorozat-lampa', 'demogorgon-stranger-things-kulcstarto', 'mosomedve-flexi-kulcstarto', 'fekete-cica-flexi-kulcstarto', 'john-deere-logos-kulcstarto', 'leopard-hernyo-flexi-kulcstarto');
	}

	public static function featured_product_ids() {
		return array('karacsonyi-lampa', 'szam-lampa-nevvel', 'jurassic-lampa', 'holdfeny-lampa');
	}

	public static function products() {
		return array(
			array('id' => 'szam-lampa-nevvel', 'name' => 'Névre szóló szám-lámpa', 'category' => 'lampak', 'price' => 189, 'regular_price' => 239, 'badge' => 'Bestseller', 'image' => 'termekvilag/hero_slider/layero-asset-0009.webp', 'description' => 'Kedvenc játékos, mezszám és név egyben — LED háttérfénnyel világító, egyedi gyártású asztali lámpa.'),
			array('id' => 'programozo-lampa', 'name' => 'Programozó kör-lámpa', 'category' => 'lampak', 'price' => 219, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0018.webp', 'description' => 'Egyedi névvel és üzenettel gravírozott, áramkör-mintás világító dekoráció a jövő informatikusának.'),
			array('id' => 'jurassic-lampa', 'name' => 'Dínós henger-lámpa névvel', 'category' => 'lampak', 'price' => 199, 'regular_price' => 249, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0011.webp', 'description' => 'Kőmintás felületű, névre szóló henger-lámpa dinós motívummal — a gyerekszoba kedvence.'),
			array('id' => 'hullam-gomblampa', 'name' => 'Hullám asztali lámpa', 'category' => 'lampak', 'price' => 249, 'regular_price' => 299, 'badge' => 'Új', 'image' => 'termekvilag/hero_slider/layero-asset-0016.webp', 'description' => 'Organikus, csavart bordázatú lámpabúra fa lábakon, meleg fényű LED-del — skandináv hangulat bármelyik szobába.'),
			array('id' => 'karacsonyi-lampa', 'name' => 'Karácsonyi kedvenc-lámpa', 'category' => 'lampak', 'price' => 229, 'regular_price' => 0, 'badge' => 'Szezonális', 'image' => 'termekvilag/hero_slider/layero-asset-0017.webp', 'description' => 'Világító ünnepi jelenet a te kutyusaiddal — fotó alapján készül, hogy a család minden tagja ott legyen a fa alatt.'),
			array('id' => 'holdfeny-lampa', 'name' => 'Holdfény erdei lámpa', 'category' => 'lampak', 'price' => 159, 'regular_price' => 199, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0019.webp', 'description' => 'Szarvasos, hegyvidéki sziluett kör-lámpa rejtett világítással — nappal dísz, este hangulatfény.'),
			array('id' => 'logos-kulcstarto', 'name' => 'Logós kulcstartó', 'category' => 'kulcstartok', 'price' => 39, 'regular_price' => 0, 'badge' => 'Bestseller', 'image' => 'termekvilag/hero_slider/layero-asset-0027.webp', 'description' => 'Egyedi logóval, kétszínű nyomtatással készült, strapabíró kulcstartó — darabonként vagy céges csomagban.'),
			array('id' => 'csapat-kulcstarto', 'name' => 'Csapat-kulcstartó szett', 'category' => 'kulcstartok', 'price' => 149, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0027.webp', 'description' => '6 darabos szett kluboknak, baráti társaságoknak — egységes design, egyedi nevekkel minden darabon.'),
			array('id' => 'demogorgon-stranger-things-kulcstarto', 'name' => 'Demogorgon (Stranger Things) kulcstartó', 'category' => 'kulcstartok', 'price' => 3000, 'regular_price' => 0, 'badge' => 'Új', 'image' => 'kulcstartok/18-demogorgon-stranger-things-kulcstarto/18-demogorgon-stranger-things-kulcstarto-01.jpg', 'description' => '3D nyomtatott Demogorgon figurás kulcstartó a Stranger Things sorozatból — strapabíró fém kulcskarikával.'),
			array('id' => 'mosomedve-flexi-kulcstarto', 'name' => 'Mosómedve flexi kulcstartó', 'category' => 'kulcstartok', 'price' => 3500, 'regular_price' => 0, 'badge' => 'Új', 'image' => 'kulcstartok/23-mosomedve-flexi-kulcstarto/23-mosomedve-flexi-kulcstarto-01.jpg', 'description' => '3D nyomtatott flexi (mozgatható ízületű) mosómedve kulcstartó — a végtagok szabadon mozognak.'),
			array('id' => 'fekete-cica-flexi-kulcstarto', 'name' => 'Fekete cica flexi kulcstartó', 'category' => 'kulcstartok', 'price' => 3500, 'regular_price' => 0, 'badge' => 'Új', 'image' => 'kulcstartok/24-fekete-cica-flexi-kulcstarto/24-fekete-cica-flexi-kulcstarto-01.jpeg', 'description' => '3D nyomtatott flexi (mozgatható ízületű) fekete cica kulcstartó — a végtagok szabadon mozognak.'),
			array('id' => 'john-deere-logos-kulcstarto', 'name' => 'John Deere logós kulcstartó', 'category' => 'kulcstartok', 'price' => 2500, 'regular_price' => 0, 'badge' => 'Új', 'image' => 'kulcstartok/39-john-deere-logos-kulcstarto/39-john-deere-logos-kulcstarto-01.jpg', 'description' => '3D nyomtatott John Deere logós kulcstartó — ajándék gazdálkodóknak és traktor-rajongóknak.'),
			array('id' => 'leopard-hernyo-flexi-kulcstarto', 'name' => 'Leopárd hernyó flexi kulcstartó', 'category' => 'kulcstartok', 'price' => 3500, 'regular_price' => 0, 'badge' => 'Új', 'image' => 'kulcstartok/41-leopard-hernyó-flexi-kulcstarto/41-leopard-hernyó-flexi-kulcstarto-01.jpg', 'description' => '3D nyomtatott flexi leopárd-mintás hernyó kulcstartó — a test szabadon hajlítható.'),
			array('id' => 'tulipan-vaza', 'name' => 'Tulipán üvegcső-váza', 'category' => 'dekoraciok', 'price' => 119, 'regular_price' => 149, 'badge' => 'Új', 'image' => 'termekvilag/hero_slider/layero-asset-0020.webp', 'description' => 'Minimál fa-hatású keret üvegcsővel és nyomtatott tulipánnal — örök virág, ami sosem hervad el.'),
			array('id' => 'leveles-kaspo', 'name' => 'Leveles kaspó', 'category' => 'dekoraciok', 'price' => 99, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0025.webp', 'description' => 'Botanikus formavilágú, rétegzett levelekből épülő kaspó réz-hatású belsővel — élő növénynek vagy szárazvirágnak.'),
			array('id' => 'szarvas-bortarto', 'name' => 'Szarvas bortartó szobor', 'category' => 'dekoraciok', 'price' => 149, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0021.webp', 'description' => 'Kőhatású, fekvő szarvas formájú palacktartó — elegáns ajándék borkedvelőknek, bárpultra és nappaliba.'),
			array('id' => 'eletfa-mecses-szett', 'name' => 'Életfa mécses-szett (1–10)', 'category' => 'dekoraciok', 'price' => 179, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0014.webp', 'description' => 'Tíz mécsestartó, amin egy fa nő évről évre — évfordulóra, születésnapokra, vagy adventi visszaszámláláshoz.'),
			array('id' => 'qr-nfc-display', 'name' => 'QR + NFC asztali display', 'category' => 'ceges', 'price' => 179, 'regular_price' => 219, 'badge' => 'B2B kedvenc', 'image' => 'termekvilag/hero_slider/layero-asset-0022.webp', 'description' => 'Étlap, Google-értékelés vagy weboldal egy érintésre: asztali display beépített NFC chippel és QR kóddal — a te logóddal.'),
			array('id' => 'ceges-ajandekcsomag', 'name' => 'Céges ajándékcsomag', 'category' => 'ceges', 'price' => 449, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0027.webp', 'description' => 'Logózott ajándéktárgyak díszdobozban — partnereknek, munkatársaknak, rendezvényekre.'),
			array('id' => 'bagoly-figura', 'name' => 'Diplomás bagoly figura', 'category' => 'rajongoi', 'price' => 139, 'regular_price' => 179, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0023.webp', 'description' => 'Ballagási emlék talapzattal, névvel, gratulációval és évszámmal — a tudás szimbóluma, ami a polcon marad.'),
			array('id' => 'camino-szobor', 'name' => 'El Camino emlék-szobor', 'category' => 'rajongoi', 'price' => 189, 'regular_price' => 0, 'badge' => 'Egyedi', 'image' => 'termekvilag/hero_slider/layero-asset-0010.webp', 'description' => 'Személyre szabott zarándok-figura névvel, megtett távval és évszámmal — egy nagy út méltó lezárása.'),
			array('id' => 'fan-art-lampa', 'name' => 'Fan-art világító logó', 'category' => 'rajongoi', 'price' => 209, 'regular_price' => 0, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0012.webp', 'description' => 'Kedvenc játékod vagy filmed címere világító kivitelben — gyűjtői darab, egyedi gyártásban.'),
			array('id' => 'sorozat-lampa', 'name' => 'Sorozat kör-lámpa névvel', 'category' => 'rajongoi', 'price' => 219, 'regular_price' => 0, 'badge' => 'Új', 'image' => 'termekvilag/hero_slider/layero-asset-0013.webp', 'description' => 'Kétvilágú, kétszínű LED-es kör-lámpa a kedvenc sorozatod hangulatával — és a te neveddel a fényben.'),
			array('id' => 'f1-palyaterkep', 'name' => 'F1 pálya-falikép', 'category' => 'rajongoi', 'price' => 259, 'regular_price' => 319, 'badge' => '', 'image' => 'termekvilag/hero_slider/layero-asset-0015.webp', 'description' => 'A teljes szezon összes versenypályája egy keretben, domború nyomtatással — a Forma–1 rajongók falidísze.'),
			array('id' => 'egyedi-otlet', 'name' => 'Egyedi elképzelés megvalósítása', 'category' => 'egyedi', 'price' => 0, 'regular_price' => 0, 'badge' => 'Ajánlatkérés', 'image' => 'termekvilag/hero_slider/layero-asset-0010.webp', 'description' => 'Van egy ötleted, ami még nem létezik? Írd le, küldj referenciát, és mi megtervezzük, legyártjuk.'),
		);
	}

	public static function product_by_id($id) {
		foreach (self::products() as $product) {
			if ($product['id'] === $id) {
				return $product;
			}
		}

		return null;
	}

	public static function products_by_ids($ids) {
		$items = array();

		foreach ((array) $ids as $id) {
			$product = self::product_by_id($id);
			if ($product) {
				$items[] = $product;
			}
		}

		return $items;
	}

	public static function demo_products($limit = 8, $category = '', $collection = 'popular') {
		$products = self::products();

		if ($category) {
			$products = array_values(
				array_filter(
					$products,
					function ($product) use ($category) {
						return $product['category'] === $category;
					}
				)
			);
		}

		if ('new' === $collection) {
			$products = self::sort_products_by_ids($products, self::new_product_ids());
		} elseif ('sale' === $collection) {
			$products = array_values(
				array_filter(
					$products,
					function ($product) {
						return ! empty($product['regular_price']) && $product['regular_price'] > $product['price'];
					}
				)
			);
		} elseif ('all' !== $collection) {
			$products = self::sort_products_by_ids($products, self::popular_product_ids());
		}

		return array_slice($products, 0, max(1, absint($limit)));
	}

	public static function spotlight_product($id = '') {
		if ($id) {
			$product = self::product_by_id($id);
			if ($product) {
				return $product;
			}
		}

		$product = self::product_by_id('karacsonyi-lampa');

		return $product ? $product : self::products()[0];
	}

	public static function featured_products() {
		$items = self::products_by_ids(self::featured_product_ids());

		foreach ($items as $index => $item) {
			$items[$index]['feature_badge'] = 0 === $index
				? 'A hónap terméke'
				: ($item['badge'] ? $item['badge'] : 'Kiemelt darab');
		}

		return $items;
	}

	public static function process_steps() {
		return array(
			array('number' => '1', 'title' => 'Kiválasztod és személyre szabod', 'text' => 'Név, felirat, szín, méret — vagy saját ötlet, fotó, referenciakép alapján.'),
			array('number' => '2', 'title' => 'Egyeztetjük a részleteket', 'text' => 'E-mailben pontosítjuk a szöveget, a színt és a méretet — csak a jóváhagyásod után nyomtatunk.'),
			array('number' => '3', 'title' => 'Nyomtatjuk és kézbesítjük', 'text' => 'Napelemes műhelyben, PLA biopolimerből — 5–10 munkanap alatt az ajtódig.'),
		);
	}

	public static function quiz_cta() {
		return array(
			'eyebrow' => 'Nem tudod, mit válassz?',
			'title' => 'Ajándékkereső — 4 kérdés, kész ötlet.',
			'text' => 'Mondd el, kinek és milyen alkalomra keresel, és megmutatjuk, melyik darab illik hozzá a legjobban.',
			'button_text' => 'Kitöltöm',
			'button_url' => array('url' => '/kviz/'),
		);
	}

	public static function why_layero_rows() {
		return array(
			array('feature' => 'Névre, feliratra személyre szabva', 'classic' => 'gyári — mindenkinek ugyanaz'),
			array('feature' => 'Egyetlen példány — nincs belőle még egy', 'classic' => 'tömeggyártott'),
			array('feature' => 'Romániában, Szatmárnémetiben gyártva', 'classic' => 'import — messziről szállítva'),
			array('feature' => 'Fotó vagy referencia alapján is elkészítjük', 'classic' => 'nem megoldható'),
			array('feature' => 'Évek múlva is megvan — nem hervad, nem fogy el', 'classic' => 'elhervad / elfogy'),
		);
	}

	public static function testimonials() {
		return array(
			array('stars' => 5, 'quote' => 'A fiam nevével készült dínós lámpa azóta is minden este világít. A minőség sokkal jobb, mint amire számítottam.', 'name' => 'Kiss Emese', 'meta' => 'Dínós henger-lámpa'),
			array('stars' => 5, 'quote' => 'Céges QR-displayt rendeltünk az étterembe - két hét alatt megduplázódtak a Google-értékeléseink.', 'name' => 'Balogh Tamás', 'meta' => 'QR + NFC display'),
			array('stars' => 5, 'quote' => 'Egyedi ötlettel kerestem meg őket, és pontosan azt kaptam, amit elképzeltem. Minden lépés profi volt.', 'name' => 'Szabó Nóra', 'meta' => 'Egyedi rendelés'),
		);
	}

	public static function gallery_items() {
		return array(
			array('image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0009.webp')), 'alt' => 'Névre szóló szám-lámpa', 'url' => array('url' => '/termekek/?cat=lampak')),
			array('image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0011.webp')), 'alt' => 'Dínós henger-lámpa', 'url' => array('url' => '/termekek/?cat=lampak')),
			array('image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0012.webp')), 'alt' => 'Fan-art világító logó', 'url' => array('url' => '/termekek/?cat=rajongoi')),
			array('image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0020.webp')), 'alt' => 'Tulipán üvegcső-váza', 'url' => array('url' => '/termekek/?cat=dekoraciok')),
			array('image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0022.webp')), 'alt' => 'QR + NFC display', 'url' => array('url' => '/termekek/?cat=ceges')),
			array('image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0027.webp')), 'alt' => 'Logós kulcstartó', 'url' => array('url' => '/termekek/?cat=kulcstartok')),
		);
	}

	public static function custom_cta() {
		return array(
			'title' => 'Nem találod, amit keresel? Legyártjuk neked.',
			'text' => 'Egyedi tervezés és gyártás — leírás vagy referenciakép alapján, ajánlatkéréstől a kész darabig.',
			'button_text' => 'Egyedi rendelést indítok',
			'button_url' => array('url' => '/egyedi-rendeles/'),
			'image' => array('url' => self::asset_url('termekvilag/hero_slider/layero-asset-0018.webp')),
		);
	}

	public static function why_shop_items() {
		return array(
			array('icon' => 'crown', 'title' => 'Exkluzív ajánlatok', 'text' => 'a hivatalos Layero shopban'),
			array('icon' => 'shield', 'title' => '100%', 'text' => 'biztonságos fizetés'),
			array('icon' => 'clock', 'title' => '2 év jótállás', 'text' => 'minden termékre'),
			array('icon' => 'headset', 'title' => 'Emberi ügyfélszolgálat', 'text' => '— válasz 24 órán belül'),
		);
	}

	public static function newsletter() {
		return array(
			'title' => '-10% az első rendelésedre!',
			'text' => 'Csak új feliratkozóknak — a kuponkódot e-mailben küldjük.',
			'placeholder' => 'E-mail címed',
			'button_text' => 'Feliratkozom',
			'note' => 'Havonta egyszer írunk — új termékek és szezonális kedvezmények. Bármikor leiratkozhatsz. Részletek az <a href="/adatvedelem/">adatvédelmi tájékoztatóban</a>. (Demo űrlap.)',
		);
	}

	public static function footnotes() {
		return array(
			array('text' => 'Az ingyenes szállítás a 200 lej feletti kosárértékre vonatkozik, Románia területén. Alatta a szállítási díj 25 lej.'),
			array('text' => 'A minimális rendelési érték 50 lej. Az árak tájékoztató jellegűek; az egyedi gyártású termékek végleges ára a személyre szabás részleteitől függhet.'),
			array('text' => 'A PLA növényi (kukoricakeményítő) alapú, ipari komposztálásban lebomló anyag. A műhelyünk áramát napelemek adják, így a gyártás CO₂-kibocsátása közel nulla.'),
		);
	}

	private static function sort_products_by_ids($products, $ids) {
		usort(
			$products,
			function ($a, $b) use ($ids) {
				$ai = array_search($a['id'], $ids, true);
				$bi = array_search($b['id'], $ids, true);
				$ai = false === $ai ? 999 : $ai;
				$bi = false === $bi ? 999 : $bi;

				return $ai <=> $bi;
			}
		);

		return $products;
	}
}
