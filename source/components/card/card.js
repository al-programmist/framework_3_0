// Значения элементов в корзине и избранном хранится в дата-атрибутах body:
// data-favourites и data-busket
// Регистрируем события busketChange, cardsCompare и faviuritesChange,
// заносим значение в дата-атрибутах body,
// затем отслеживаем эти события в виджете шапки и меняем индикаторы

export class Card {
	constructor(card) {
		this.card = card;
		this.busketButton = null;
		this.favouritesButton = null;
		this.compareButton = null;

		this.card && this.init();
	}

	initButtons() {
		if (this.card === null) return this;
		this.busketButton = this.card.querySelector('.js-button-to-busket');
		this.favouritesButton = this.card.querySelector('.js-button-favourites');
		this.compareButton = this.card.querySelector('.js-button-compare');

		this.busketButton.addEventListener('click', this.toggleBusket);
		this.favouritesButton.addEventListener('click', this.toggleFavourites);
		this.compareButton.addEventListener('click', this.toggleCompare);
		return this;
	}

	toggleBusket(event) {
		let busketNumber = parseInt(document.body.dataset.busket, 10);
		const $currentCard = this.closest('.card');

		event.preventDefault();
		event.stopPropagation();

		if (!$currentCard) return this;
		this.classList.toggle('button-to-busket--selected');
		$currentCard.classList.toggle('card--in-the-busket');

		if ($currentCard.classList.contains('card--in-the-busket')) busketNumber += 1;
		else busketNumber -= 1;

		document.body.dataset.busket = String(busketNumber).trim();
		$currentCard.dispatchEvent(new CustomEvent('busketChange', {
			bubbles: true,
			cancelable: true,
		}));

		return this;
	}

	toggleFavourites(event) {
		let favouritesNumber = parseInt(document.body.dataset.favourites, 10);
		const $currentCard = this.closest('.card');

		event.preventDefault();
		event.stopPropagation();

		if (!$currentCard) return this;
		this.classList.toggle('js-active');
		this.classList.toggle('no-border-color');
		$currentCard.classList.toggle('card--in-favourites');

		if ($currentCard.classList.contains('card--in-favourites')) favouritesNumber += 1;
		else favouritesNumber -= 1;

		document.body.dataset.favourites = String(favouritesNumber).trim();
		$currentCard.dispatchEvent(new CustomEvent('favouritesChange', {
			bubbles: true,
			cancelable: true,
		}));

		return this;
	}

	toggleCompare(event) {
		const $currentCard = this.closest('.card');

		event.preventDefault();
		event.stopPropagation();

		if (!$currentCard) return this;
		this.classList.toggle('js-active');
		this.classList.toggle('no-border-color');
		$currentCard.classList.toggle('card--in-compare');

		$currentCard.dispatchEvent(new CustomEvent('cardsCompare', {
			bubbles: true,
			cancelable: true,
		}));

		return this;
	}

	init() {
		this.initButtons();
		// this.clickHandler = this.clickHandler.bind(this);
		// document.addEventListener('click', this.clickHandler);
	}

	destroy() {
		this.busketButton.removeEventListener('click', this.toggleBusket);
		this.favouritesButton.removeEventListener('click', this.toggleFavourites);
		this.compareButton.removeEventListener('click', this.toggleCompare);
	}
}
