export class ModalCity {
	constructor() {
		this.root = document.body.querySelector('.js-modal-city');
		this.cityClassSelected = 'modal-city__item--selected';
		this.cityClass = 'js-city-item';
		this.body = document.body;
		this.interfaceCity = document.body.querySelector('.js-city-caption');
		this.cityItems = null;
		this.modalClose = null;

		this.root && this.interfaceCity && this.init();
	}

	setCity(city) {
		if (city !== null) {
			this.interfaceCity.textContent = city.caption;
			this.body.dataset.city = city.code;
		}

		return this;
	}

	/* eslint-disable */
	getCity(item) {
		const objCity = {};
		objCity.caption = item.querySelector('.radio__caption').textContent;
		objCity.code = String(item.dataset.city)
			.trim();

		return objCity;
	}
	/* eslint-enable */

	toggleCaption(selectors, current) {
		selectors.forEach((item) => {
			item.classList.remove(this.cityClassSelected);
		});

		const checkbox = current.querySelector('input');

		checkbox.checked = true;
		current.classList.add(this.cityClassSelected);
		return this;
	}

	selectCity(event) {
		event.preventDefault();

		const { target } = event;
		const $currentCityItem = target.closest(`.${this.cityClass}`);

		this.toggleCaption(this.cityItems, $currentCityItem);

		const $city = this.getCity($currentCityItem);
		this.setCity($city);

		return this;
	}

	close() {
		this.body.classList.remove('city--open');
		window.app.modal.close(this);
	}

	init() {
		if (!this.root) return this;
		this.cityItems = this.root.querySelectorAll(`.${this.cityClass}`);
		this.modalClose = this.root.querySelector('.js-modal-city-close');
		this.setCity = this.setCity.bind(this);
		this.toggleCaption = this.toggleCaption.bind(this);
		this.selectCity = this.selectCity.bind(this);
		this.close = this.close.bind(this);

		this.modalClose.addEventListener('click', this.close);
		this.cityItems.forEach((item) => {
			item.addEventListener('click', this.selectCity);
		});

		return this;
	}
}
