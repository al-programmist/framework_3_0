export class HeaderCounterWidget {
	constructor(widget) {
		this.widget = widget;
		this.type = null;
		this.containsSelector = this.widget.querySelector('.js-contains');
		this.mobileBusket = document.body.querySelector('.js-mobile-busket--open');
		this.mobileContainsSelector = this.mobileBusket.querySelector('.js-contains');

		this.widget && this.mobileBusket && this.init();
	}

	getCurrentWidgetType() {
		if (!this.widget) return this;
		if (this.widget.classList.contains('js-header-favourites')) this.type = 'favourites';
		else this.type = 'busket';
		return this.type;
	}

	setWidgetValue() {
		let currentValue = 0;
		const $body = document.body;

		if (this.type === 'busket') {
			currentValue = String($body.dataset.busket).trim();
		}

		if (this.type === 'favourites') {
			currentValue = String($body.dataset.favourites).trim();
		}

		if (Number(currentValue) > 0) {
			this.containsSelector.classList.add('bit-button__contains--visible');
			this.mobileContainsSelector.classList.add('bit-button__contains--visible');
			this.containsSelector.textContent = currentValue;
			this.mobileContainsSelector.textContent = currentValue;
		} else {
			this.containsSelector.classList.remove('bit-button__contains--visible');
			this.mobileContainsSelector.classList.remove('bit-button__contains--visible');
			this.containsSelector.textContent = '';
			this.mobileContainsSelector.textContent = '';
		}
	}

	setEvents() {
		this.getCurrentWidgetType();

		if (this.type === 'busket') {
			document.addEventListener('busketChange', this.setWidgetValue.bind(this));
		}

		if (this.type === 'favourites') {
			document.addEventListener('favouritesChange', this.setWidgetValue.bind(this));
		}

		return this;
	}

	init() {
		this.setEvents();
	}

	destroy() {
		document.removeEventListener('busketChange', this.setWidgetValue);
		document.removeEventListener('favouritesChange', this.setWidgetValue);
	}
}
