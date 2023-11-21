/* eslint-disable */
import {numberWithSpaces} from "../../config/js/helpers";
import {Counter} from "../counter/counter";

class CartEmptyProduct {
	#element;
	#counterPacks;
	#counterPacksElement;
	#counterArea;
	#counterAreaElement;
	#value;
	#areaPerPack;
	#area;
	#price = {};
	#priceElements = {};
	#id;

	constructor(element) {
		this.#element = element;
		this.#id = this.#element.dataset.id;
		this.#counterPacksElement = this.#element.querySelector('.cart-empty-product__counter--packs');
		this.#counterAreaElement = this.#element.querySelector('.cart-empty-product__counter--area');
		this.#counterPacks = Counter.getByEl(this.#counterPacksElement);
		this.#counterArea = Counter.getByEl(this.#counterAreaElement);
		this.#value = parseFloat(this.#counterPacks.value);
		this.#areaPerPack = parseFloat(this.#element.dataset.areaPerPack);
		this.#area = this.#value * this.#areaPerPack;
		this.#price.old = this.#element.dataset?.priceOld;
		this.#price.current = this.#element.dataset.priceCurrent;
		this.#priceElements.old = this.#element.querySelector('.cart-empty-product__price-old span');
		this.#priceElements.current = this.#element.querySelector('.cart-empty-product__price-final span');
	}

	#counterPacksChangeHandler = (event) => {
		this.#value = parseFloat(event.detail.value);
		this.#area = this.#value * this.#areaPerPack;
		this.#counterArea.setValue(this.#area, false);
		this.#calculatePrice();
		this.#counterChangeHandler();
	}

	#counterAreaChangeHandler = (event) => {
		this.#area = parseFloat(event.detail.value);
		this.#value = Math.ceil(this.#area / this.#areaPerPack);
		this.#counterPacks.setValue(this.#value, false);
		this.#calculatePrice();
		this.#counterChangeHandler();
	}

	#calculatePrice = () => {
		const priceOld = this.#price.old ? this.#value * this.#price.old : null;
		const priceCurrent = this.#value * this.#price.current;
		if (priceOld) this.#priceElements.old.innerText = numberWithSpaces(priceOld);
		this.#priceElements.current.innerText = numberWithSpaces(priceCurrent);
	}

	#counterChangeHandler = () => {
		console.log(`Товар с id ${this.#id}, ${this.#value} упаковок, ${this.#area} квадратных метров. Цена ${this.#value * this.#price.current}`);
	}

	init = () => {
		this.#counterPacksElement.addEventListener('change', this.#counterPacksChangeHandler);
		this.#counterAreaElement.addEventListener('change', this.#counterAreaChangeHandler);
	};
}

export const cartEmptyProductsInit = () => {
	const elements = document.querySelectorAll('.js-cart-empty-product');
	elements.forEach((element) => {
		const cartEmptyProduct = new CartEmptyProduct(element);
		cartEmptyProduct.init();
	})
};
