class CheckoutDelivery {
	static list = [];

	#element;
	#description;
	#button;
	#buttonCaption;
	#modal;
	#modalId;

	constructor(element) {
		this.#element = element;
		this.#description = this.#element.querySelector('.checkout-delivery__description');
		this.#button = this.#element.querySelector('.checkout-delivery__button');
		this.#buttonCaption = this.#button.querySelector('.button__caption');
		this.#modalId = `delivery-${this.#element?.dataset.delivery}`;
		this.#modal = document.getElementById(this.#modalId);
	}

	activate = () => {
		const active = CheckoutDelivery.list.find((item) => item.isActive);
		active?.deactivate();
		this.#element.classList.add('checkout-delivery--active');
		this.#button.classList.add('button-primary--black');
		this.#buttonCaption.innerHTML = 'Изменить';
	};

	deactivate = () => {
		this.#element.classList.remove('checkout-delivery--active');
		this.#button.classList.remove('button-primary--black');
		this.#buttonCaption.innerHTML = 'Выбрать';
	};

	#setDescription = (description) => {
		this.#description.innerText = description;
	};

	#deliverySelectedHandler = ({ detail }) => {
		this.activate();
		this.#setDescription(detail.description);
	};

	get isActive() {
		return this.#element.classList.contains('checkout-delivery--active');
	}

	init = () => {
		this.#modal?.addEventListener('deliverySelected', this.#deliverySelectedHandler);
		CheckoutDelivery.list.push(this);
	};
}

export const checkoutDeliveriesInit = () => {
	const elements = document.querySelectorAll('.js-checkout-delivery');
	elements.forEach((element) => {
		const checkoutDelivery = new CheckoutDelivery(element);
		checkoutDelivery.init();
	});
};
