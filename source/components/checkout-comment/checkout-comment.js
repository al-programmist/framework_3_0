import { touchInput } from '../../config/js/helpers';

class CheckoutComment {
	#element;
	#input;

	constructor(element) {
		this.#element = element;
		this.#input = this.#element?.querySelector('.field__input');
	}

	#inputHandler = () => {
		if (this.#input.value) localStorage.setItem('checkoutComment', JSON.stringify(this.#input.value));
		else localStorage.removeItem('checkoutComment');
	};

	#setValue = () => {
		const value = localStorage.getItem('checkoutComment');
		if (value) {
			this.#input.value = JSON.parse(value);
			touchInput(this.#input);
		}
	};

	init = () => {
		if (!this.#element) return;
		this.#setValue();
		this.#input.addEventListener('input', this.#inputHandler);
	};
}

export const checkoutComment = new CheckoutComment(document.querySelector('.js-checkout-comment'));
