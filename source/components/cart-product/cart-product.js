/* eslint-disable */
import { numberWithSpaces } from "../../config/js/helpers";
import { Counter } from "../counter/counter";

const destroyModal = () => {
	const modal = document.getElementById('cart-product-delete');
	modal.remove();
};

const createModal = () => {
	const modal = `
		<div class="modal modal-product-delete" id="cart-product-delete">
			<div class="modal__overlay js-modal-close"></div>
			<div class="modal__body">
				<button class="button-control button-control--close modal__close js-modal-close" type="button">
					<i class="icon icon--mono-close"></i>
				</button>
				<div class="modal__content">
					<h2 class="modal-product-delete__title">Удаление позиции</h2>
					<p class="modal-product-delete__description">Удалить выбранную позицию?<br>Отменить действие будет невозможно.</p>
					<button class="button-primary js-modal-close modal-product-delete__cancel" type="button"><span class="button__caption">Отменить</span></button>
					<button class="button button--red js-modal-close modal-product-delete__confirm" type="button"><span class="button__caption">Удалить</span></button>
				</div>
			</div>
		</div>
	`
	document.body.insertAdjacentHTML('beforeend', modal);
	document.addEventListener('modalClose', destroyModal);
	window.app.modal.open('cart-product-delete');
};

export class CartProduct {
	static list = [];
	static getByEl = (el) => CartProduct.list.find((item) => item.element === el);

	#id;
	#counterPacksElement;
	#counterAreaElement;
	#counterPacks;
	#counterArea;
	#value;
	#areaPerPack;
	#area;
	#price = {};
	#priceElements = {};
	#likeButton;
	#deleteButton;
	#weight;

	constructor(element) {
		this.element = element;
		this.#id = this.element.dataset.id;
		this.#counterPacksElement = this.element.querySelector('.cart-product__counter--packs');
		this.#counterAreaElement = this.element.querySelector('.cart-product__counter--area');
		this.#counterPacks = Counter.getByEl(this.#counterPacksElement);
		this.#counterArea = Counter.getByEl(this.#counterAreaElement);
		this.#value = parseFloat(this.#counterPacks.value);
		this.#areaPerPack = parseFloat(this.element.dataset.areaPerPack);
		this.#area = this.#value * this.#areaPerPack;
		this.#price.old = this.element.dataset?.priceOld;
		this.#price.current = this.element.dataset.priceCurrent;
		this.#weight = this.element.dataset.weight;
		this.#priceElements.old = this.element.querySelector('.cart-product__price-old span');
		this.#priceElements.current = this.element.querySelector('.cart-product__price-final span');
		this.#likeButton = this.element.querySelector('.cart-product__button--like');
		this.#deleteButton = this.element.querySelector('.cart-product__button--delete');
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

	#likeClickHandler = ({ target }) => {
		let favouritesNumber = parseInt(document.body.dataset.favourites, 10);

		target.classList.toggle('cart-product__button--active');

		if (target.classList.contains('cart-product__button--active')) favouritesNumber += 1;
		else favouritesNumber -= 1;

		document.body.dataset.favourites = String(favouritesNumber).trim();
		this.element.dispatchEvent(new CustomEvent('favouritesChange', {
			bubbles: true,
			cancelable: true,
		}));
	}

	#deleteClickHandler = () => {
		createModal();
		const confirm = document.querySelector('.modal-product-delete__confirm');
		confirm.addEventListener('click', this.#removePosition);
	};

	#removePosition = () => {
		this.element.dispatchEvent(new CustomEvent('deletePosition', {
			bubbles: true,
			detail: {
				id: this.#id,
			},
		}));
		this.element.remove();
	};

	#counterChangeHandler = () => {
		const detail = this.details;
		this.element.dispatchEvent(new CustomEvent('changePositionValue', {
			bubbles: true,
			detail
		}))
	}

	get details() {
		return {
			id: this.#id,
			price: {
				old: this.#value * this.#price.old,
				current: this.#value * this.#price.current,
			},
			value: this.#value,
			area: this.#area,
			weight: this.#weight * this.#value,
		}
	}

	init = () => {
		CartProduct.list.push(this);
		this.#counterPacksElement.addEventListener('change', this.#counterPacksChangeHandler);
		this.#counterAreaElement.addEventListener('change', this.#counterAreaChangeHandler);
		this.#likeButton.addEventListener('click', this.#likeClickHandler);
		this.#deleteButton.addEventListener('click', this.#deleteClickHandler);
	};
}

export const cartProductsInit = () => {
	const elements = document.querySelectorAll('.js-cart-product');
	elements.forEach((element) => {
		const cartProduct = new CartProduct(element);
		cartProduct.init();
	});
};
