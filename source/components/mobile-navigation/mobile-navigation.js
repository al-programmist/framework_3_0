export class MobileNavigation {
	constructor() {
		this.root = document.querySelector('.js-mobile-navigation');
		this.items = this.root.querySelectorAll('.js-mobile-navigation-item');
		this.body = document.body;
		this.root && this.init();
	}

	clearState() {
		this.items.forEach((item) => {
			item.classList.remove('js-active');
		});
		return this;
	}

	switchHandler(event) {
		event.preventDefault();

		const { target } = event;
		const $currentButton = target.closest('.js-mobile-navigation-item');

		if ($currentButton) {
			this.clearState();
			$currentButton.classList.add('js-active');
			window.app.modal.close();
			window.app.burgerMenu.close();
			window.app.searchMobile.close();

			if (!$currentButton.classList.contains('js-mobile-catalog--open')
				&& this.body.classList.contains('catalog-mobile--open')) {
				window.app.mobileCatalog.close();
				window.app.burgerMenu.close();
			}

			if ($currentButton.classList.contains('js-mobile-catalog--open')) {
				window.app.mobileCatalog.open();
				$currentButton.classList.remove('js-mobile-catalog--open');
				$currentButton.classList.add('js-mobile-catalog--close');
			} else if ($currentButton.classList.contains('js-mobile-catalog--close')) {
				$currentButton.classList.add('js-mobile-catalog--open');
				$currentButton.classList.remove('js-mobile-catalog--close');
				window.app.mobileCatalog.close();
			}
		}

		return this;
	}

	init() {
		if (!this.root) return this;
		this.switchHandler = this.switchHandler.bind(this);
		this.items.forEach((item) => {
			item.addEventListener('click', this.switchHandler);
		});

		return this;
	}

	destroy() {
		return this;
	}
}
