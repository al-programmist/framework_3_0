export class Field {
	constructor(name) {
		this.name = name;
		this.validClass = 'js-valid';
		this.invalidClass = 'js-invalid';
		this.focusClass = 'field--focus';
		this.fillClass = 'field--fill';
		this.field = this.name.querySelector('input');
		this.value = null;
		this.name && this.init();
	}

	isValid(input) {
		return input.classList.contains(this.validClass);
	}

	isInvalid(input) {
		return input.classList.contains(this.invalidClass);
	}

	clearFieldState() {
		this.name.classList.remove(this.invalidClass);
		this.name.classList.remove(this.validClass);
	}

	toggleFieldState() {
		this.clearFieldState();

		if (this.isValid(this.field)) {
			this.name.classList.add(this.validClass);
		}

		if (this.isInvalid(this.field)) {
			this.name.classList.add(this.invalidClass);
		}
	}

	focus(event) {
		event.preventDefault();
		this.name.classList.add(this.focusClass);
		this.clearFieldState();

		return this;
	}

	blur(event) {
		event.preventDefault();
		this.value = this.field.value;
		this.toggleFieldState();
		this.name.classList.remove(this.focusClass);

		if (this.value.length <= 0) {
			this.name.classList.remove(this.fillClass);
			return this;
		}

		this.name.classList.add(this.fillClass);
		return this;
	}

	keyup(event) {
		event.preventDefault();
		this.value = this.field.value;
		this.clearFieldState();

		this.name.classList.add(this.fillClass);
		return this;
	}

	init() {
		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.keyup = this.keyup.bind(this);
		this.field.addEventListener('focus', this.focus);
		this.field.addEventListener('blur', this.blur);
		this.field.addEventListener('keyup', this.keyup);
		return this;
	}

	destroy() {
		return this;
	}
}
