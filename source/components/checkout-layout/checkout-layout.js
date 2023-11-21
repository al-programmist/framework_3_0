import { CheckoutPayment } from '../checkout-payment/checkout-payment';
import { capitalizeFirstLetter } from '../../config/js/helpers';

const filterPaymentByDelivery = (type) => {
	CheckoutPayment.filter(type, localStorage.getItem(`checkout${capitalizeFirstLetter(type)}Selected`));
};

class CheckoutLayout {
	#element;
	#paymentBlock;
	#paymentItems;
	#trackedItems = {
		delivery: false,
		buyer: false,
		payment: false,
	};

	constructor(element) {
		this.#element = element;
		this.#paymentBlock = this.#element?.querySelector('.checkout-layout__block--payment');
		this.#paymentItems = this.#element?.querySelector('.checkout-payment');
	}

	#deliverySelectedInitialHandler = () => {
		this.#paymentBlock.style.setProperty('display', 'grid');
		document.removeEventListener('deliverySelected', this.#deliverySelectedInitialHandler);
	};

	#deliverySelectedHandler = () => {
		this.#trackedItems.delivery = true;
		this.#buttonStateToggle();
	};

	#paymentSelectedHandler = () => {
		this.#trackedItems.payment = true;
		this.#buttonStateToggle();
	};

	#paymentClearedHandler = () => {
		this.#trackedItems.payment = false;
		this.#buttonStateToggle();
	};

	#buyerEnteredHandler = () => {
		this.#trackedItems.buyer = true;
		this.#buttonStateToggle();
	};

	#buyerClearedHandler = () => {
		this.#trackedItems.buyer = false;
		this.#buttonStateToggle();
	};

	#anotherPersonChangeHandler = ({ detail }) => {
		if (detail.checked) this.#trackedItems.anotherPerson = false;
		else delete this.#trackedItems.anotherPerson;
		this.#buttonStateToggle();
	};

	#anotherPersonEnteredHandler = () => {
		this.#trackedItems.anotherPerson = true;
		this.#buttonStateToggle();
	};

	#anotherPersonClearedHandler = () => {
		if ('anotherPerson' in this.#trackedItems) this.#trackedItems.anotherPerson = false;
		this.#buttonStateToggle();
	};

	#buttonStateToggle = () => {
		const isUnlocked = Object.values(this.#trackedItems).indexOf(false) === -1;
		if (isUnlocked) this.#element.dispatchEvent(new CustomEvent('unlockButton', { bubbles: true }));
		else this.#element.dispatchEvent(new CustomEvent('lockButton', { bubbles: true }));
	};

	init = () => {
		document.addEventListener('deliverySelected', this.#deliverySelectedInitialHandler);
		document.addEventListener('deliverySelected', () => this.#deliverySelectedHandler());
		document.addEventListener('paymentSelected', () => this.#paymentSelectedHandler());
		document.addEventListener('paymentCleared', () => this.#paymentClearedHandler());
		document.addEventListener('buyerEntered', () => this.#buyerEnteredHandler());
		document.addEventListener('buyerCleared', () => this.#buyerClearedHandler());
		document.addEventListener('buyerChanged', () => this.#buyerClearedHandler());
		document.addEventListener('deliverySelected', () => filterPaymentByDelivery('delivery'));
		document.addEventListener('buyerChanged', () => filterPaymentByDelivery('buyer'));
		document.addEventListener('anotherPersonChange', this.#anotherPersonChangeHandler);
		document.addEventListener('anotherPersonEntered', this.#anotherPersonEnteredHandler);
		document.addEventListener('anotherPersonCleared', this.#anotherPersonClearedHandler);
		filterPaymentByDelivery('buyer');
	};
}

export const checkoutLayout = new CheckoutLayout(document.querySelector('.js-checkout-layout'));
