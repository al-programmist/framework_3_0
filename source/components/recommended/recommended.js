import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export const recommendedSlider = (container) => {
	new Swiper(container, {
		modules: [
			Navigation,
		],
		slidesPerView: 1.6,
		spaceBetween: 0,
		rewind: true,
		breakpoints: {
			330: {
				slidesPerView: 1.7,
			},

			350: {
				slidesPerView: 1.8,
			},

			390: {
				slidesPerView: 2,
			},

			450: {
				slidesPerView: 2.3,
			},

			480: {
				slidesPerView: 2.5,
			},

			500: {
				slidesPerView: 2.7,
			},

			540: {
				slidesPerView: 2.9,
			},

			560: {
				slidesPerView: 3,
			},

			600: {
				slidesPerView: 3.2,
			},

			630: {
				slidesPerView: 3.4,
			},

			650: {
				slidesPerView: 3.6,
			},

			680: {
				slidesPerView: 3.7,
			},

			700: {
				slidesPerView: 3.9,
			},

			724: {
				slidesPerView: 4,
			},

			768: {
				slidesPerView: 2.7,
			},

			820: {
				slidesPerView: 2.8,
			},

			850: {
				slidesPerView: 2.9,
			},

			860: {
				slidesPerView: 3,
			},

			924: {
				slidesPerView: 3.2,
			},

			944: {
				slidesPerView: 3.3,
			},

			950: {
				slidesPerView: 3.4,
			},

			992: {
				slidesPerView: 3.5,
			},

			1100: {
				slidesPerView: 3.8,
			},

			1200: {
				slidesPerView: 4,
			},
		},
		navigation: {
			nextEl: '.js-slider--next',
			prevEl: '.js-slider--prev',
		},
	});
};
