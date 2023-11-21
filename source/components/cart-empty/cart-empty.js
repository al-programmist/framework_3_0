/* eslint-disable */
class CartEmpty {
	#element;
	#button;
	#input;
	#fieldOpenClass = 'cart-empty--field';
	#tableOpenClass = 'cart-empty--table';

	constructor(element) {
		this.#element = element;
		this.#button = this.#element?.querySelector('.cart-empty__button');
		this.#input = this.#element?.querySelector('.cart-empty__input');
	}

	#buttonCLickHandler = () => {
		this.#element.classList.add(this.#fieldOpenClass);
		const field = this.#input.querySelector('.cart-empty-input__field');
		if (field.value) this.#element.classList.add(this.#tableOpenClass);
	}

	#inputCloseClickHandler = () => this.#element.classList.remove(this.#fieldOpenClass, this.#tableOpenClass);

	#inputFieldInputHandler = ({ detail }) => {
		if (detail.isEmpty) this.#element.classList.remove(this.#tableOpenClass);
		else this.#element.classList.add(this.#tableOpenClass);
	} 

	init = () => {
		if (!this.#element) return;
		this.#button.addEventListener('click', this.#buttonCLickHandler);
		this.#input.addEventListener('closeClick', this.#inputCloseClickHandler);
		this.#input.addEventListener('fieldInput', this.#inputFieldInputHandler);
	}
}

export const cartEmpty = new CartEmpty(document.querySelector('.js-cart-empty'));
