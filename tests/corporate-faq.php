<?php
// Isolated rendering check: no WordPress database or external requests.
namespace Elementor {
	class Widget_Base {
		public function get_settings_for_display() {
			return array('items' => array(
				array('question' => 'Egyedi <kérdés>', 'answer' => 'Egyeztetjük a részleteket.'),
				array('question' => 'Mikor készül el?', 'answer' => '5–10 munkanap'),
			));
		}
	}
}

namespace {
	define('ABSPATH', __DIR__);
	function esc_html($value) { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
	require __DIR__ . '/../includes/Shop_Content.php';
	require __DIR__ . '/../includes/Widgets/Base_Widget.php';
	require __DIR__ . '/../includes/Widgets/Corporate_FAQ.php';
	$widget = new \LayeroShop\Widgets\Corporate_FAQ();
	ob_start();
	(new \ReflectionMethod($widget, 'render'))->invoke($widget);
	$html = ob_get_clean();
	if (substr_count($html, '<details') !== 2
		|| ! str_contains($html, 'Egyedi &lt;kérdés&gt;')
		|| ! str_contains($html, 'Egyeztetjük a részleteket.')
		|| ! str_contains($html, 'A pontos gyártási ütemezést')
		|| str_contains($html, '5–10 munkanap')) {
		throw new \RuntimeException('Corporate FAQ render regression.');
	}
	echo "Corporate FAQ renders answers and replaces legacy lead time: OK\n";
}
