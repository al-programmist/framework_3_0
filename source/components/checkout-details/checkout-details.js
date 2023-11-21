import { capitalizeFirstLetter } from '../../config/js/helpers';

const getOrderInfo = () => {
	const buyer = localStorage.getItem('checkoutBuyerSelected');
	const delivery = localStorage.getItem('checkoutDeliverySelected');
	const buyerDetails = JSON.parse(localStorage.getItem(`checkoutBuyer${capitalizeFirstLetter(buyer)}`));
	const deliveryDetails = JSON.parse(localStorage.getItem(`checkoutDelivery${capitalizeFirstLetter(delivery)}`));
	const payment = localStorage.getItem('checkoutPaymentSelected');
	const anotherPersonDetails = JSON.parse(localStorage.getItem('checkoutAnotherPersonInfo'));
	const comment = JSON.parse(localStorage.getItem('checkoutComment'));
	return {
		buyer,
		delivery,
		buyerDetails,
		anotherPersonDetails,
		deliveryDetails,
		payment,
		comment,
	};
};

class CheckoutDetails {
	#element;
	#button;
	#buttonActiveClass = 'button-primary--black';
	#buttonInactiveClass = 'button-primary--disabled';

	constructor(element) {
		this.#element = element;
		this.#button = this.#element?.querySelector('.checkout-details__submit');
	}

	#buttonStateHandler = ({ type }) => {
		if (type === 'unlockButton') {
			this.#button.classList.add(this.#buttonActiveClass);
			this.#button.classList.remove(this.#buttonInactiveClass);
		} else {
			this.#button.classList.remove(this.#buttonActiveClass);
			this.#button.classList.add(this.#buttonInactiveClass);
		}
	};

	// eslint-disable-next-line class-methods-use-this
	#buttonClickHandler = () => {
		// eslint-disable-next-line no-console
		console.log(getOrderInfo());
	};

	init = () => {
		if (!this.#element) return;
		document.addEventListener('unlockButton', this.#buttonStateHandler);
		document.addEventListener('lockButton', this.#buttonStateHandler);
		this.#button.addEventListener('click', this.#buttonClickHandler);
	};
}

export const checkoutDetails = new CheckoutDetails(document.querySelector('.js-checkout-details'));
