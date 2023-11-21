/* eslint-disable */
class CartEmptyInput {
	#element;
	#field;
	#close;

	constructor(element) {
		this.#element = element;
		this.#close = this.#element?.querySelector('.cart-empty-input__close');
		this.#field = this.#element?.querySelector('.cart-empty-input__field');
	}

	#closeClickHandler = () => this.#element.dispatchEvent(new CustomEvent('closeClick'));
	#fieldInputHandler = () => {
		const detail = {
			isEmpty: !this.#field.value,
		};
		this.#element.dispatchEvent(new CustomEvent('fieldInput', { detail }));
	};

	init = () => {
		if (!this.#element) return;
		this.#close.addEventListener('click', this.#closeClickHandler);
		this.#field.addEventListener('input', this.#fieldInputHandler);
	};
}

export const cartEmptyInput = new CartEmptyInput(document.querySelector('.js-cart-empty-input'));
