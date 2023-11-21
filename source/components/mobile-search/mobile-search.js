// Переключаем на body класс search--open

export class SearchMobile {
	constructor() {
		this.root = document.querySelector('.search-mobile');
		this.openHandler = document.querySelector('.js-header-search-mobile');
		this.closeHandler = this.root.querySelector('.js-search-mobile--close');
		this.body = document.body;
		this.openClass = 'search--open';
		this.root && this.openHandler && this.init();
	}

	open(event) {
		event.preventDefault();
		if (!this.root) return this;
		this.body.classList.add(this.openClass);
		this.root.dispatchEvent(new CustomEvent('mobileSearchOpen', {
			bubbles: true,
			cancelable: true,
		}));
		return this;
	}

	close() {
		this.body.classList.remove(this.openClass);
		return this;
	}

	init() {
		this.openHandler.addEventListener('click', this.open.bind(this));
		this.closeHandler.addEventListener('click', this.close.bind(this));
		return this;
	}

	destroy() {
		this.openHandler.removeEventListener('click', this.open);
		this.closeHandler.removeEventListener('click', this.close);
		return this;
	}
}
