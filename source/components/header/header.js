import { throttle } from '../../config/js/throttle';

export class Header {
	constructor() {
		this.headerClassFixed = 'js-header--fixed';
		this.headerHeight = null;
		this.body = document.body;
		this.links = document.body.querySelectorAll('a');
		this.root = this.body.querySelector('.js-header');
		this.buttonUp = null;

		this.root && this.init();
	}

	onScroll() {
		const { body } = document;
		const html = document.documentElement;
		const headerProlog = body.querySelector('.js-header-prolog');
		const upButton = body.querySelector('.js-up-button');
		const headerHeight = headerProlog.offsetHeight;
		const footerHeight = body.querySelector('.footer').offsetHeight;
		const windowInnerHeight = html.clientHeight;
		const scrollOffset = Number(window.pageYOffset);
		const pageHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight,
		);
		const footerYOffset = (pageHeight - footerHeight);
		const bottomScrollOffset = scrollOffset + windowInnerHeight;
		const isFooter = (bottomScrollOffset >= footerYOffset);
		if (scrollOffset > headerHeight) {
			document.body.classList.add('js-header--fixed');
			upButton.classList.remove('up-button--hidden');
			if (isFooter) {
				upButton.classList.add('up-button--bottom');
			} else {
				upButton.classList.remove('up-button--bottom');
			}
		} else {
			document.body.classList.remove('js-header--fixed');
			upButton.classList.add('up-button--hidden');
		}

		return this;
	}

	upScroll(event) {
		const { target } = event;
		event.preventDefault();
		event.stopPropagation();
		const upScrollButton = target.closest('.js-up-button');
		if (upScrollButton) {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		}
		return this;
	}

	init() {
		if (!this.root) return this;
		this.buttonUp = this.body.querySelector('.js-up-button');
		const throttleOnScroll = throttle(this.onScroll, 100);
		this.onScroll = this.onScroll.bind(this);
		this.upScroll = this.upScroll.bind(this);
		this.buttonUp.addEventListener('click', this.upScroll);
		window.addEventListener('scroll', throttleOnScroll, {
			passive: true,
		});
		return this;
	}

	destroy() {
		return this;
	}
}
