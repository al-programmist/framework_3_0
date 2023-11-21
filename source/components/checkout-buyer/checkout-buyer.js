import { ClassWatcher } from '../../config/js/ClassObserver';
import { capitalizeFirstLetter } from '../../config/js/helpers';

class CheckoutBuyer {
	static list = [];

	#element;
	#buyerFields;
	#buyer;
	#anotherPersonFields;
	#organizationField;
	#organizationInfo;
	#infoEntered = false;
	#anotherPersonEntered = false;
	#anotherPerson;

	constructor(element) {
		this.#element = element;
		this.#buyer = this.#element?.dataset.buyer;
		this.#buyerFields = this.#element?.querySelectorAll('.checkout-field--buyer .field__input');
		this.#anotherPersonFields = this.#element?.querySelectorAll('.checkout-field--another-person .field__input');
		this.#anotherPerson = this.#element?.querySelector('.checkout-layout__another-person');
		this.#organizationField = this.#element?.querySelector('.checkout-field--organization .field__input');
		this.#organizationInfo = this.#element?.querySelector('.checkout-organization');
	}

	#changeActiveBuyerHandler = () => {
		localStorage.setItem('checkoutBuyerSelected', this.#buyer);
		this.#element.dispatchEvent(new CustomEvent('buyerChanged', {
			bubbles: true,
		}));
		this.#buyerChangeValidClassHandler();
		const target = this.#anotherPerson?.querySelector('.checkbox__input');
		this.#anotherPersonCheckHandler({ target });
	};

	#buyerChangeValidClassHandler = () => {
		const validFields = Array.from(this.#buyerFields).filter((field) => field.classList.contains('js-valid'));
		if (validFields.length === this.#buyerFields.length) {
			this.#infoEntered = true;
			this.#element.dispatchEvent(new CustomEvent('buyerEntered', {
				bubbles: true,
			}));
		} else if (this.#infoEntered) {
			this.#infoEntered = false;
			this.#element.dispatchEvent(new CustomEvent('buyerCleared', {
				bubbles: true,
			}));
		}
	};

	#buyerInputHandler = () => {
		const data = new FormData(this.#element);
		const details = {};
		data.forEach((value, key) => {
			if (value) details[key] = value;
		});
		localStorage.setItem(`checkoutBuyer${capitalizeFirstLetter(this.#buyer)}`, JSON.stringify(details));
	};

	#anotherPersonChangeValidClassHandler = () => {
		const validFields = Array.from(this.#anotherPersonFields).filter((field) => field.classList.contains('js-valid'));
		if (validFields.length === this.#anotherPersonFields.length) {
			this.#anotherPersonEntered = true;
			this.#element.dispatchEvent(new CustomEvent('anotherPersonEntered', {
				bubbles: true,
			}));
		} else if (this.#infoEntered) {
			this.#anotherPersonEntered = false;
			this.#element.dispatchEvent(new CustomEvent('anotherPersonCleared', {
				bubbles: true,
			}));
		}
	};

	#anotherPersonInputHandler = () => {
		const data = new FormData(this.#element);
		const details = {};
		data.forEach((value, key) => {
			if (value) details[key] = value;
		});
		localStorage.setItem('checkoutAnotherPersonInfo', JSON.stringify(details));
	};

	#anotherPersonCheckHandler = ({ target }) => {
		if (target.checked) this.#anotherPerson.classList.add('checkout-layout__another-person--active');
		else this.#anotherPerson.classList.remove('checkout-layout__another-person--active');
		this.#anotherPerson.dispatchEvent(new CustomEvent('anotherPersonChange', {
			bubbles: true,
			detail: {
				checked: target.checked,
			},
		}));
		localStorage.setItem('checkoutAnotherPerson', JSON.stringify(target.checked));
		if (!target.checked) localStorage.removeItem('checkoutAnotherPersonInfo');
		this.#anotherPersonChangeValidClassHandler();
	};

	#organizationInputHandler = () => {
		if (this.#organizationField.value) this.#organizationInfo.classList.add('checkout-organization--active');
		else this.#organizationInfo.classList.remove('checkout-organization--active');
	};

	init = () => {
		if (!this.#element) return;

		if (this.#element.classList.contains('js-active')) this.#changeActiveBuyerHandler();

		const elementClassObserver = new ClassWatcher(this.#element, 'js-active', this.#changeActiveBuyerHandler, () => {});
		elementClassObserver.init();

		this.#buyerFields.forEach((field) => {
			field.addEventListener('input', this.#buyerInputHandler);
			const fieldClassObserver = new ClassWatcher(field, 'js-valid', this.#buyerChangeValidClassHandler, this.#buyerChangeValidClassHandler);
			fieldClassObserver.init();
		});

		this.#anotherPersonFields.forEach((field) => {
			field.addEventListener('input', this.#anotherPersonInputHandler);
			const fieldClassObserver = new ClassWatcher(field, 'js-valid', this.#anotherPersonChangeValidClassHandler, this.#anotherPersonChangeValidClassHandler);
			fieldClassObserver.init();
		});

		const anotherPersonInput = this.#anotherPerson?.querySelector('.checkbox__input');
		anotherPersonInput?.addEventListener('change', this.#anotherPersonCheckHandler);

		this.#organizationField?.addEventListener('input', this.#organizationInputHandler);
	};
}

export const checkoutBuyersInit = () => {
	const elements = document.querySelectorAll('.js-checkout-buyer');
	elements.forEach((element) => {
		const checkoutBuyer = new CheckoutBuyer(element);
		checkoutBuyer.init();
	});
};
