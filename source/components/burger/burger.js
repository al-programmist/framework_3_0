// Переключаем на body класс menu--open

export class BurgerMenu {
	constructor() {
		this.root = document.querySelector('.js-burger');
		this.openHandler = null;
		this.closeHandler = null;
		this.coworkToggle = null;
		this.headerNavigation = null;
		this.body = document.body;
		this.openClass = 'menu--open';
		this.root && this.init();
	}

	open(event) {
		event.preventDefault();
		if (!this.root) return this;
		this.body.classList.add(this.openClass);
		this.root.dispatchEvent(new CustomEvent('burgerOpen', {
			bubbles: true,
			cancelable: true,
		}));
		return this;
	}

	coworkOpen(event) {
		event.preventDefault();
		this.headerNavigation = this.root.querySelector('.js-header-navigation');
		this.headerNavigation.classList.add('content--open');
	}

	close() {
		if (!this.root) return this;
		if (this.headerNavigation) {
			this.headerNavigation.classList.remove('content--open');
		}
		this.body.classList.remove(this.openClass);
		return this;
	}

	init() {
		if (!this.root) return this;
		this.coworkToggle = this.root.querySelector('.js-cowork-toggle');
		this.openHandler = this.root.querySelector('.js-burger-button--open');
		this.closeHandler = this.root.querySelector('.js-burger-button--close');
		this.coworkOpen = this.coworkOpen.bind(this);
		this.coworkToggle.addEventListener('click', this.coworkOpen);
		this.openHandler.addEventListener('click', this.open.bind(this));
		this.closeHandler.addEventListener('click', this.close.bind(this));
		return this;
	}

	destroy() {
		if (!this.root) return this;
		return this;
	}
}
