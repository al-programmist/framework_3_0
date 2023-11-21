/* eslint-disable */
export class Counter {
	static list = [];
	static getByEl = (el) => Counter.list.find((item) => item.element === el);

	element;
	#field;
	#editable;
	#buttons;
	#min;
	#max;
	#blockedButton;

	#value = 0.0;
	#buttonClass = 'counter__button';
	#buttonDisabledClass = 'counter__button--disabled';

	constructor(element) {
		this.element = element;
		this.#editable = this.element.querySelector('.counter__editable');
		this.#field = this.element.querySelector('.counter__field');
		this.#buttons = {
			dec: this.element.querySelector(`.${this.#buttonClass}[data-type='dec']`),
			inc: this.element.querySelector(`.${this.#buttonClass}[data-type='inc']`),
		};
		this.#min = this.#field.min;
		this.#max = this.#field.max;
	}

	#clickHandler = (event) => {
		const { target } = event;
		if (!target.closest(`.${this.#buttonClass}`)) {
			this.#editable.focus();
		}
		else {
			this.#changeValue(target.dataset.type);
		}
	}

	#changeValue = (type) => {
		const value = parseFloat(this.#editable.textContent);
		if (type === 'dec' && (this.#min && value > this.#min)) {
			this.#editable.textContent = value - 1;
			this.#changeHandler();
		}
		if (type === 'inc' && ((this.#max && value < this.#max) || !this.#max)) {
			this.#editable.textContent = value + 1;
			this.#changeHandler();
		}
	}

	#focusInHandler = () => {
		this.#value = this.#editable.textContent;
	};

	#focusOutHandler = () => {
		this.#changeHandler();
	};

	#changeHandler = (event = true) => {
		const oldValue = parseFloat(this.#value);
		const value = this.#editable.textContent.replace(/,/, '.');

		if (!value.match(/^[-+]?[0-9]*\.?[0-9]+$/)) this.#editable.textContent = this.#value;
		else if (this.#max && parseFloat(value) > parseFloat(this.#max)) this.#editable.textContent = this.#max;
		else if (this.#min && parseFloat(value) < parseFloat(this.#min)) this.#editable.textContent = this.#min;
		else this.#editable.textContent = parseFloat(value);

		if (this.#editable.textContent === this.#max) this.#blockButton('inc');
		else if (this.#editable.textContent === this.#min) this.#blockButton('dec');
		else if (this.#blockedButton) this.#unblockButton(this.#blockedButton);

		if (oldValue !== parseFloat(this.#editable.textContent)) {
			this.#field.value = this.#editable.textContent;
			this.#value = this.#editable.textContent;
			['input', 'change'].forEach((event) => this.#field.dispatchEvent(new Event(event)));
			if (event) this.element.dispatchEvent(new CustomEvent('change', { detail: { value: this.#field.value }}));
		}
	}

	#blockButton = (type) => {
		this.#blockedButton = type;
		this.#buttons[type].classList.add(this.#buttonDisabledClass);
		this.#buttons[type].setAttribute('disabled', true);
	}

	#unblockButton = (type) => {
		this.#blockedButton = null;
		this.#buttons[type].classList.remove(this.#buttonDisabledClass);
		this.#buttons[type].removeAttribute('disabled');
	}

	get value() {
		return this.#field.value;
	}

	setValue = (value, event = true) => {
		this.#editable.textContent = value;
		this.#changeHandler(event);
	}

	init = () => {
		this.element.addEventListener('click', this.#clickHandler);
		this.#editable.addEventListener('focusin', this.#focusInHandler);
		this.#editable.addEventListener('focusout', this.#focusOutHandler);
		if (this.#editable.textContent === this.#max) this.#blockButton('inc');
		if (this.#editable.textContent === this.#min) this.#blockButton('dec');
		Counter.list.push(this);
	}
}

export const countersInit = () => {
	const elements = document.querySelectorAll('.js-counter');

	elements?.forEach((element) => {
		const input = new Counter(element);
		input.init();
	})
}
