import { isHasSupported } from '../../config/js/helpers';

export class CheckoutPayment {
	static list = [];
	static filter = (type, value) => CheckoutPayment.list.forEach((instance) => {
		const values = instance.element.dataset[type].split(' ');
		const show = values.find((val) => val === value);
		if (show) instance.show(type);
		else instance.hide(type);
	});

	element;
	#type;
	#input;
	#hiddenFor = [];

	constructor(element) {
		this.element = element;
		this.#type = this.element.dataset.type;
		this.#input = this.element?.querySelector('.checkout-payment__input');
	}

	hide = (type) => {
		this.#hiddenFor.push(type);
		this.element.classList.add('checkout-payment--hidden');
		if (this.#input.checked) {
			this.#input.checked = false;
			this.#input.dispatchEvent(new Event('change'));
			this.element.dispatchEvent(new CustomEvent('paymentCleared', {
				bubbles: true,
			}));
		}
	};

	show = (type) => {
		const index = this.#hiddenFor.indexOf(type);
		if (index > -1) this.#hiddenFor.splice(index, 1);
		if (this.#hiddenFor.length === 0) this.element.classList.remove('checkout-payment--hidden');
	};

	#changeHandler = () => {
		localStorage.removeItem('checkoutPaymentSelected');
		if (!isHasSupported()) {
			CheckoutPayment.list.forEach((instance) => instance.element.classList.remove('checkout-payment--active'));
		}

		if (this.#input.checked) {
			localStorage.setItem('checkoutPaymentSelected', this.#type);
			if (!isHasSupported()) this.element.classList.add('checkout-payment--active');
			this.element.dispatchEvent(new CustomEvent('paymentSelected', {
				bubbles: true,
			}));
		} else {
			this.element.dispatchEvent(new CustomEvent('paymentCleared', {
				bubbles: true,
			}));
		}
	};

	init = () => {
		if (!this.element) return;
		this.element.addEventListener('change', this.#changeHandler);
		CheckoutPayment.list.push(this);
	};
}

export const checkoutPaymentsInit = () => {
	const elements = document.querySelectorAll('.js-checkout-payment');
	elements.forEach((element) => {
		const checkoutPayment = new CheckoutPayment(element);
		checkoutPayment.init();
	});
};
