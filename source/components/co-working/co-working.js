import { Swiper } from 'swiper';
import { media } from '../../config/js/media';
import { config } from '../../config/js/config';

export class CoWorking {
	constructor() {
		this.breakpoints = config.breakpoint;
		this.Swiper = null;
		this.root = document.querySelector('.js-coworking');
		this.root && this.init();
	}

	initSwiper() {
		media(`all and (max-width: ${this.breakpoints.tablet - 1}px)`, () => {
			if (!this.Swiper) {
				this.Swiper = new Swiper(this.root.querySelector('.swiper'), {
					slidesPerView: 1.4,
					spaceBetween: 12,
					rewind: false,
					breakpoints: {
						420: {
							slidesPerView: 1.5,
						},
						500: {
							slidesPerView: 2,
						},
						550: {
							slidesPerView: 2.5,
						},
					},
				});
			}
		});

		media(`all and (min-width: ${this.breakpoints.tablet}px)`, () => {
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
