# 0.10.6 — elmosott háttér a széles képernyős hero mögött

2026-09-29. A három életképes banner Full HD fölött két réteget használ: a középre igazított éles fotó legfeljebb 1920 CSS-pixel széles, mögötte ugyanaz a kép nagyítva, elmosva és sötétítve tölti ki a rendelkezésre álló szélességet. A főfotó két széle fokozatos maszkkal olvad a háttérbe; az átmenet szélessége a Full HD fölötti többlettel nő, legfeljebb 180 pixelig. A lapozónyilak az éles jelenet mellett maradnak.

- A nagy képernyős szabály 1921 CSS-pixeltől él. A hero meglévő, legfeljebb 880 pixeles asztali magassága megmarad.
- A háttér saját, `aria-hidden` picture elemet kap. A desktop source kizárólag nagy szélességnél választható; kisebb képernyőn helyi, egyetlen pixeles data URI a fallback, a réteg rejtett. Mobilon nincs külön asztali háttérfotó-letöltés emiatt.
- A háttér ugyanazt a desktop URL-t használja, mint az éles fotó. Egyéni Elementor-képnél is automatikusan az adott kép kerül mögé; az URL-t a PHP escape-eli.
- Az eredeti lámpa-összehasonlító, a rajongói dia, az ötös sorrend és a külön mobilkompozíciók megmaradnak. Nincs új JavaScript vagy folyamatos blur-animáció.
- A statikus forrás: `index.html`, `shop.css`; a plugin saját rendererében `Hero_Slider.php`. A generált tükör a sync-static eszközzel készül. Cache-kulcs: `20260929-hero-ambient`.

Ellenőrzés: PHP-szintaxis, a 14 meglévő izolált WordPress-hero teszt. Statikus HTTP-próba 1920×1080, 2560×1440, 3840×2160 és 390×844 méretben; mindhárom életkép illesztése vizuálisan ellenőrizve. A jelölő nélküli Elementor-próbaoldal 3440×1440 méretben is 1920 pixeles éles jelenetet adott. Mobilon a külön portrékép és a rejtett háttér data URI-ja töltődött, vízszintes túlcsordulás és konzolhiba nélkül. Képek a helyi, nem publikált `output/hero-ambient/` alatt.

Telepítés: az aktív cPanel `layero_plugins` checkoutban **Update from Remote**. A korábban inaktivált WPCode 2084/2086 hero-felülírásokat nem kell visszakapcsolni.
