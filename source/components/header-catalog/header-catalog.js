import SimpleBar from 'simplebar';
import { HeaderCatalogTabs } from './header-catalog-tabs';

export class HeaderCatalogDesktop {
	constructor() {
		this.body = document.body;
		this.classOpenEvent = 'js-desktop-catalog-opener';
		this.classCloseEvent = 'js-desktop-catalog--close';
		this.classCatalog = 'js-header-catalog--desktop';
		this.catalogHandler = document.querySelector(`.${this.classOpenEvent}`);
		this.catalog = document.querySelector(`.${this.classCatalog}`);
		this.classOpen = 'header-catalog--open';
		this.classChange = 'button-catalog--open';
		this.selectorScrollBox = '.js-header-catalog-scrollbox';
		this.tabs = null;
		this.simpleBarReady = null;

		this.init();
	}

	clickAction(event) {
		const { target } = event;
		const $target = target.closest(`.${this.classOpenEvent}`);
		const $targetClose = target.closest('.js-desktop-catalog--close') || !target.closest(`.${this.classCatalog}`);

		if ($target) {
			this.open();
		} else if ($targetClose) {
			this.close();
		}
	}

	open() {
		const $body = this.body;
		if (this.catalog === null || this.catalogHandler === null) return this;

		if (this.catalogHandler) {
			this.catalogHandler.classList.remove(this.classOpenEvent);
			this.catalogHandler.classList.add(this.classCloseEvent);
			this.catalogHandler.classList.add(this.classChange);

			if (!$body.classList.contains(this.classOpen)) {
				$body.classList.add(this.classOpen);

				this.catalog.dispatchEvent(new CustomEvent('desktopCatalogOpen', {
					bubbles: true,
					cancelable: true,
				}));

				// Вот тут запускаем табы каталога

				if (!this.tabs) {
					this.tabs = new HeaderCatalogTabs('.js-header-catalog--desktop');
				}

				return this;
			}
		}

		return this;
	}

	close() {
		const $body = this.body;
		if (this.catalog === null || this.catalogHandler === null) return this;

		if (this.catalogHandler) {
			this.catalogHandler.classList.add(this.classOpenEvent);
			this.catalogHandler.classList.remove(this.classCloseEvent);
			this.catalogHandler.classList.remove(this.classChange);

			$body.classList.remove(this.classOpen);

			this.catalog.dispatchEvent(new CustomEvent('desktopCatalogClose', {
				bubbles: true,
				cancelable: true,
			}));

			return this;
		}
		return this;
	}

	initScroll() {
		if (!this.simpleBarReady) {
			const scrollBoxs = this.catalog.querySelectorAll(this.selectorScrollBox);

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
		this.clickAction = this.clickAction.bind(this);
		document.addEventListener('click', this.clickAction);
		this.initScroll();
	}

	destroy() {
		this.tabs.destroy();
		this.simpleBarReady = null;
		this.close();
		document.removeEventListener('click', this.clickAction);
	}
}
