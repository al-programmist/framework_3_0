/* eslint-disable */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export class TabsGeneric {
	constructor(selector) {
		this.root = selector;
		this.captions = this.root.querySelectorAll('.js-tabs-caption');
		this.tabs = this.root.querySelectorAll('.js-tabs-page');
		this.activeClass = 'js-active';
		this.isSlider = this.root.classList.contains('is-slider');
		this.widgets = null;

		this.root && this.tabs && this.captions && this.init();
	}

	clearPages() {
		if (this.captions) {
			this.captions.forEach((item) => {
				item.classList.remove(this.activeClass);
			});
		}
		
		if (this.tabs) {
			this.tabs.forEach((item) => {
				item.classList.remove(this.activeClass);
			});
		}
		
		if (this.widgets) {
			this.widgets.forEach((item) => {
				item.classList.add('visually-hidden');
			});
		}

		return this;
	}

	openTab(event) {
		const { target } = event;
		const $currentTabButton = target.closest('.js-tabs-caption');
		const targetTabID = $currentTabButton.dataset.target;
		const targetPage = this.root.querySelector(`[data-page='${targetTabID}']`);
		const targetWidget = this.root.querySelector(`[data-slider='${targetTabID}']`);

		event.preventDefault();
		this.clearPages();
		if (targetWidget)	targetWidget.classList.remove('visually-hidden');
		if (targetPage) targetPage.classList.add(this.activeClass);
		if ($currentTabButton) $currentTabButton.classList.add(this.activeClass);

		return this;
	}

	initSliders() {
		const sliders = this.root.querySelectorAll('.swiper');
		const slideNext = (event) => {
			const index = Number(event.target.closest('.js-tabs-widget').dataset.slider);
			window.app.recommendedSliders[index].slideNext();
			return true;
		}
		const slideBack = (event) => {
			const index = Number(event.target.closest('.js-tabs-widget').dataset.slider);
			window.app.recommendedSliders[index].slidePrev();
			return true;
		}
		
		if (sliders) {
			const recommendSlider = [];
			sliders.forEach((slider) => {
				recommendSlider.push(new Swiper(slider, {
					modules: [
						Navigation,
					],
					slidesPerView: 1.6,
					spaceBetween: 0,
					initialSlide: 0,
					rewind: false,
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
				}));
			});
			window.app.recommendedSliders = recommendSlider;

			this.widgets = this.root.querySelectorAll('.js-tabs-widget');
			this.widgets.forEach((widget, index) => {
				const backButton = widget.querySelector('.js-slider--prev');
				const nextButton = widget.querySelector('.js-slider--next');



				backButton.addEventListener('click', slideBack)
				nextButton.addEventListener('click', slideNext)
			});
			
		}

		return this;
	}
	
	

	init() {
		if (!this.root && !this.tabs && !this.captions) return this;
		this.openTab = this.openTab.bind(this);
		if (this.isSlider) {
			this.initSliders();
		}
		this.captions.forEach((item) => {
			item.addEventListener('click', this.openTab);
		});

		return this;
	}

	destroy() {
		this.captions.forEach((item) => {
			item.removeEventListener('click', this.openTab);
		});
		return this;
	}
}
