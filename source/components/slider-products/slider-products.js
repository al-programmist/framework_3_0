/* eslint-disable */
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { config } from "../../config/js/config";

class SliderProducts {
	#element;
	#arrowPrev;
	#arrowNext;
	#slider;
	#sliderElement;

	constructor(element) {
		this.#element = element;
		this.#sliderElement = this.#element?.querySelector('.slider-products__slider');
		this.#arrowPrev = this.#element?.querySelector('.slider-products__arrow--prev');
		this.#arrowNext = this.#element?.querySelector('.slider-products__arrow--next');
	}

	#sliderSettings = {
		modules: [Navigation],
		slidesPerView: 'auto',
		spaceBetween: 24,
		breakpoint: {
			[config.breakpoint.laptop]: {
				slidesPerView: 4,
			},
		},
		navigation: {},
	};

	init = () => {
		if (!this.#element) return;
		this.#sliderSettings.navigation.prevEl = this.#arrowPrev;
		this.#sliderSettings.navigation.nextEl = this.#arrowNext;
		this.#slider = new Swiper(this.#sliderElement, this.#sliderSettings);
		this.#slider.init();
	}
}

export const sliderProducts = new SliderProducts(document.querySelector('.js-slider-products'));
