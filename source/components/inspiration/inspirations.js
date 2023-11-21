import { Swiper } from 'swiper';
import { media } from '../../config/js/media';
import { config } from '../../config/js/config';

export class Inspirations {
	constructor() {
		this.root = document.querySelector('.js-inspirations');
		this.buttons = this.root.querySelectorAll('.js-inspiration-button');
		this.breakpoints = config.breakpoint;
		this.cards = null;
		this.Swiper = null;
		this.root && this.buttons && this.init();
	}

	clickHandler() {
		this.closeCards();
	}

	closeCards() {
		this.cards = this.root.querySelectorAll('.js-card-inspiration');
		this.cards.forEach((item) => {
			item.classList.remove('card-inspiration--open');
		});
		this.buttons.forEach((item) => {
			item.classList.add('js-inspiration-button--open');
			item.classList.remove('js-inspiration-button--close');
		});
	}

	initSwiper() {
		media(`all and (max-width: ${this.breakpoints.tablet - 1}px)`, () => {
			if (!this.Swiper) {
				this.Swiper = new Swiper(this.root.querySelector('.swiper'), {
					slidesPerView: 1.1,
					rewind: false,
					spaceBetween: 12,
					breakpoints: {
						420: {
							slidesPerView: 1.5,
						},

						600: {
							slidesPerView: 2,
						},

						650: {
							slidesPerView: 2.5,
						},
					},
					on: {
						slideChange: () => {
							this.closeCards();
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
		this.clickHandler = this.clickHandler.bind(this);
		this.buttons.forEach((item) => {
			item.addEventListener('click', this.clickHandler);
		});

		this.initSwiper = this.initSwiper.bind(this);
		this.initSwiper();

		return this;
	}

	destroy() {
		return this;
	}
}
