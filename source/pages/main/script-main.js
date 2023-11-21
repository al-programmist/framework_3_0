import { heroBannerSlider } from '../../components/hero/hero';
// import { recommendedSlider } from '../../components/recommended/recommended';
import { Inspirations } from '../../components/inspiration/inspirations';
import { CardInspiration } from '../../components/card/card-inspiration';
import { Help } from '../../components/help/help';
import { CoWorking } from '../../components/co-working/co-working';

window.app.heroBannerSlider = heroBannerSlider;
window.app.inspirations = new Inspirations();
window.app.help = new Help();
window.app.coworking = new CoWorking();
window.app.cardInspiration = CardInspiration;

window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.js-hero-slider')
		.forEach((element) => {
			window.app.heroBannerSlider(element);
		});

	document.querySelectorAll('.js-card-inspiration')
		.forEach((item) => {
			new CardInspiration(item);
		});
});
