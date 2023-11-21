export class SearchDesktop {
	constructor() {
		this.panel = document.querySelector('.js-search-panel--desktop');
		this.classOpen = 'search-desktop--open';

		this.init();
	}

	clickAction(event) {
		const { target } = event;
		if (target.closest('.js-search-panel--desktop')) {
			event.preventDefault();
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		const $body = document.body;

		if (this.panel === null) return this;

		if (!$body.classList.contains(this.classOpen)) {
			$body.classList.add(this.classOpen);
			this.panel.dispatchEvent(new CustomEvent('desktopSearchOpen', {
				bubbles: true,
				cancelable: true,
			}));
			return this;
		}

		return this;
	}

	close() {
		const $body = document.body;

		if (this.panel === null) return this;

		if ($body.classList.contains(this.classOpen)) {
			$body.classList.remove(this.classOpen);

			this.panel.dispatchEvent(new CustomEvent('desktopSearchClose', {
				bubbles: true,
				cancelable: true,
			}));
		}

		return this;
	}

	init() {
		this.clickAction = this.clickAction.bind(this);
		document.addEventListener('click', this.clickAction);
	}

	destroy() {
		this.close();
		document.removeEventListener('click', this.clickAction);
	}
}
