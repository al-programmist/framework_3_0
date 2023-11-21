import { ClassWatcher } from '../../config/js/ClassObserver';
import { touchInput } from '../../config/js/helpers';

const fieldsNotValidatedInputHandler = ({ target }) => {
	if (target.value && !target.classList.contains('js-valid')) target.classList.add('js-valid');
	else if (!target.value && target.classList.contains('js-valid')) target.classList.remove('js-valid');
};

class CheckoutAddress {
	#element;
	#form;
	#fields;
	#fieldsValidated;
	#fieldsNotValidated;
	#fieldsHide = [];
	#submit;
	#validatedFields = 0;
	#modal;
	#switch;

	constructor(element) {
		const Form = window.app.form;
		this.#element = element;
		this.#modal = this.#element?.closest('.modal');
		this.#form = new Form(this.#element);
		this.#submit = this.#element?.querySelector('.checkout-address__submit');
		this.#switch = this.#element?.querySelector('.checkout-address__switch');
	}

	#setValues = () => {
		const values = JSON.parse(localStorage.getItem('checkoutDeliveryShipping')) || {};
		this.#fields.forEach((field) => {
			const input = field.querySelector('input');
			if (values[input.name]) {
				input.value = values[input.name];
				if (input) touchInput(input);
				if (input.type === 'checkbox' && values[input.name] === 'on') input.checked = true;
			}
		});
	};

	#setValidatedFields = () => {
		this.#fields = this.#element?.querySelectorAll('.checkout-address__field');
		this.#fieldsValidated = [];
		this.#fieldsNotValidated = [];
		this.#fields.forEach((field) => {
			const input = field.querySelector('input');
			if (input.classList.contains('js-validate')) this.#fieldsValidated.push(input);
			else this.#fieldsNotValidated.push(input);
		});
		this.#validatedFields = this.#fieldsValidated.length;
	};

	#setHouseType = (resetForm = false) => {
		if (resetForm) this.#form.destroy();
		const input = this.#switch.querySelector('input');
		if (input.checked) {
			this.#fieldsHide.forEach((field) => field.remove());
		} else {
			this.#fieldsHide.forEach((field) => this.#submit.before(field));
		}
		if (resetForm) this.#form.init();
		new Promise((done) => {
			this.#setValidatedFields();
			done();
		})
			.then(() => {
				this.#fieldsValidated.forEach((field) => touchInput(field));
			});
	};

	#switchChangeHandler = () => {
		this.#setHouseType(true);
	};

	#modalOpenHandler = () => {
		this.#form.init();
		this.#setValues();
	};

	#submitClickHandler = () => {
		localStorage.setItem('checkoutDeliverySelected', 'shipping');
		const address = JSON.parse(localStorage.getItem('checkoutDeliveryShipping'));
		let description = `г. ${address.city}, ${address.street}, д. ${address.house}`;
		if (address.building) description = `${description}, стр. ${address.building}`;
		if (address.apartment) description = `${description}, кв. ${address.apartment}`;
		this.#modal.dispatchEvent(new CustomEvent('deliverySelected', {
			bubbles: true,
			detail: {
				description,
			},
		}));
		window.app.modal.close();
		this.#form.destroy();
	};

	#inputHandler = () => {
		const data = new FormData(this.#element);
		const details = {};
		data.forEach((value, key) => {
			if (value) details[key] = value;
		});
		localStorage.setItem('checkoutDeliveryShipping', JSON.stringify(details));
	};

	#changeValidClass = () => {
		const validFields = this.#fieldsValidated.filter((field) => field.classList.contains('js-valid'));
		if (validFields.length === this.#validatedFields) {
			this.#submit.classList.remove('button-primary--disabled');
			this.#submit.classList.add('button-primary--black');
		} else {
			this.#submit.classList.add('button-primary--disabled');
			this.#submit.classList.remove('button-primary--black');
		}
	};

	init = () => {
		if (!this.#element) return;

		this.#setValidatedFields();

		this.#form.destroy();
		this.#setValues();

		Array.from(this.#fields).forEach((field) => {
			if (field.classList.contains('checkout-address__field--hide')) this.#fieldsHide.push(field);
		});

		this.#setHouseType();

		this.#fieldsValidated.forEach((field) => {
			const fieldClassObserver = new ClassWatcher(field, 'js-valid', this.#changeValidClass, this.#changeValidClass);
			fieldClassObserver.init();
		});

		this.#fieldsNotValidated.forEach((field) => field.addEventListener('input', fieldsNotValidatedInputHandler));

		this.#fields.forEach((field) => field.addEventListener('input', this.#inputHandler));

		this.#submit.addEventListener('click', this.#submitClickHandler);

		this.#modal?.addEventListener('modalOpen', this.#modalOpenHandler);

		this.#changeValidClass();

		const switchInput = this.#switch.querySelector('input');
		switchInput.addEventListener('change', this.#switchChangeHandler);
	};
}

export const checkoutAddress = new CheckoutAddress(document.querySelector('.js-checkout-address'));
