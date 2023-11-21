/* eslint-disable */
class CartPanel {
	#element;
	#submitDetails;

	constructor(element) {
		this.#element = element;
		this.#submitDetails = document.querySelector('.cart-details__submit');
	}

	#scrollHandler = () => {
		if (this.#element.getBoundingClientRect().bottom > this.#submitDetails.getBoundingClientRect().bottom) {
			this.#element.classList.add('cart-panel--hidden');
		} else {
			this.#element.classList.remove('cart-panel--hidden');
		}
	}

	init = () => {
		if (!this.#element || !this.#submitDetails) return;
		window.addEventListener('scroll', this.#scrollHandler);
	};
}

export const cartPanel = new CartPanel(document.querySelector('.js-cart-panel'));
