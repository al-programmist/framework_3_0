import { Swiper } from 'swiper';
import { media } from '../../config/js/media';
import { config } from '../../config/js/config';

export class Help {
	constructor() {
		this.breakpoints = config.breakpoint;
		this.Swiper = null;
		this.root = document.querySelector('.js-help');
		this.root && this.init();
	}

	initSwiper() {
		media(`all and (max-width: ${this.breakpoints.desktop - 1}px)`, () => {
			if (!this.Swiper) {
				this.Swiper = new Swiper(this.root.querySelector('.swiper'), {
					slidesPerView: 1.3,
					spaceBetween: 12,
					observer: true,
					autoHeight: true,

					breakpoints: {
						380: {
							slidesPerView: 1.4,
						},
						420: {
							slidesPerView: 1.6,
						},
						450: {
							slidesPerView: 1.7,
						},
						470: {
							slidesPerView: 1.8,
						},
						500: {
							slidesPerView: 1.9,
						},
						550: {
							slidesPerView: 2,
						},
						600: {
							slidesPerView: 2.3,
						},
						650: {
							slidesPerView: 2.6,
						},
						700: {
							slidesPerView: 2.8,
						},
						768: {
							spaceBetween: 24,
							slidesPerView: 2.5,
						},
						800: {
							spaceBetween: 24,
							slidesPerView: 2.8,
						},
						860: {
							spaceBetween: 24,
							slidesPerView: 3,
						},
						900: {
							spaceBetween: 24,
							slidesPerView: 3.1,
						},
						991: {
							spaceBetween: 24,
							slidesPerView: 3.5,
						},
						1100: {
							spaceBetween: 24,
							slidesPerView: 3.7,
						},
					},
				});
			}
		});

		media(`all and (min-width: ${this.breakpoints.desktop}px)`, () => {
			if (this.Swiper) {
				this.Swiper.destroy();
				this.Swiper = null;
			}
		});
	}

	init() {
		if (!this.root) return this;
		this.initSwiper = this.initSwiper.bind(this);
		this.initSwiper();
		return this;
	}

	destroy() {
		return this;
	}
}
