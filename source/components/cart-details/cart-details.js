/* eslint-disable */
import { CartProduct } from "../cart-product/cart-product";
import { numberWithSpaces } from "../../config/js/helpers";

class CartDetails {
	#element;
	#totalPrice = 0;
	#totalPriceElements;
	#oldPrice = 0;
	#oldPriceElements;
	#discountElement;
	#discountValueElement;
	#value = 0;
	#valueElements;
	#weight = 0;
	#weightElement;
	#positions;
	#productsList = [];

	constructor(element) {
		this.#element = element;
		this.#positions = document.querySelectorAll('.cart-product');
		this.#totalPriceElements = document.querySelectorAll('.js-total-price');
		this.#oldPriceElements = document.querySelectorAll('.js-old-price');
		this.#discountElement = this.#element?.querySelector('.js-discount');
		this.#discountValueElement = this.#element?.querySelector('.js-discount-value');
		this.#valueElements = document.querySelectorAll('.js-value');
		this.#weightElement = this.#element?.querySelector('.js-weight');
	}

	#setProductsList = () => {
		this.#positions.forEach((position) => {
			const { details } = CartProduct.getByEl(position);
			this.#productsList.push(details);
		});
	};

	#setTotalPrice = () => {
		this.#productsList.forEach((product) => {
			this.#totalPrice += parseFloat(product.price.current);
		});
		this.#totalPriceElements.forEach((element) => {
			element.innerHTML = `${numberWithSpaces(this.#totalPrice)} ₽`;
		})
	};

	#setDiscount = () => {
		this.#productsList.forEach((product) => {
			this.#oldPrice += parseFloat(product.price.old) || 0;
		});
		this.#oldPriceElements.forEach((element) => element.innerHTML = `${numberWithSpaces(this.#oldPrice)} ₽`);
		this.#discountElement.innerHTML = `${Math.round(100 - (this.#totalPrice / this.#oldPrice * 100))} %`;
		this.#discountValueElement.innerHTML = `${numberWithSpaces(this.#oldPrice - this.#totalPrice)} ₽`;
	};

	#setValue = () => {
		this.#productsList.forEach((product) => this.#value += parseFloat(product.value));
		this.#valueElements.forEach((element) => {
			element.innerHTML = this.#value;
		})
	};

	#setWeight = () => {
		this.#productsList.forEach((product) => this.#weight += parseFloat(product.weight));
		this.#weightElement.innerHTML = `${this.#weight} кг`;
	};

	#updateDetails = () => {
		this.#totalPrice = 0;
		this.#oldPrice = 0;
		this.#value = 0;
		this.#weight = 0;
		this.#setTotalPrice();
		this.#setDiscount();
		this.#setValue();
		this.#setWeight();
	}

	#updateProduct = ({ detail }) => {
		const index = this.#productsList.indexOf(this.#productsList.find((product) => product.id === detail.id));
		this.#productsList.splice(index, 1, detail);
		this.#updateDetails();
	}

	#deleteProduct = ({ detail }) => {
		const index = this.#productsList.indexOf(this.#productsList.find((product) => product.id === detail.id));
		this.#productsList.splice(index, 1);
		this.#updateDetails();
	}

	init = () => {
		if (!this.#element) return;
		this.#setProductsList();
		this.#updateDetails();
		document.addEventListener('changePositionValue', this.#updateProduct);
		document.addEventListener('deletePosition', this.#deleteProduct);
	};
}

export const cartDetails = new CartDetails(document.querySelector('.js-cart-details'));
