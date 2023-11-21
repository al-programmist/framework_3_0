import SimpleBar from 'simplebar';
import { MobileCatalogTabs } from './mobile-catalog-tabs';

export class MobileCatalog {
	constructor() {
		this.root = document.body.querySelector('.js-mobile-catalog');
		this.openHandler = document.body.querySelector('.js-mobile-catalog--open');
		this.closeHandler = document.body.querySelector('.js-search-mobile-catalog--close');
		this.openClass = 'catalog-mobile--open';
		this.tabs = null;
		this.simpleBarReady = null;
		this.selectorScrollBox = '.js-mobile-catalog-scrollbox';

		this.root && this.closeHandler && this.openHandler && this.init();
	}

	open() {
		if (!this.root) return this;
		this.tabs = new MobileCatalogTabs(this.root);
		document.body.classList.add(this.openClass);
		return this;
	}

	close() {
		this.destroy();
		return this;
	}

	initScroll() {
		if (!this.simpleBarReady) {
			const scrollBoxs = this.root.querySelectorAll(this.selectorScrollBox);

			scrollBoxs.forEach((box) => {
				new SimpleBar(box, {
					autoHide: false,
				});
			});
			this.simpleBarReady = true;
		}
		return this;
	}

	init() {
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.openHandler.addEventListener('click', this.open);
		this.closeHandler.addEventListener('click', this.close);
		this.initScroll();
		return this;
	}

	destroy() {
		if (this.tabs)	this.tabs.destroy();
		this.simpleBarReady = null;
		this.openHandler.removeEventListener('click', this.open);
		document.body.classList.remove(this.openClass);
		return this;
	}
}
