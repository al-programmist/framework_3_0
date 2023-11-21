// TODO: научить валидатор разблокировать кнопку. При валидации формы проверять все поля, если валидно - разблокируем

// eslint-disable-next-line import/no-extraneous-dependencies
import JustValidate from 'just-validate';
import Inputmask from 'inputmask';
import { ajax } from '../../config/js/ajax';
import { ModalLogin } from '../modal/modal-login/modal-login';

export class Form {
	constructor(name) {
		this.root = name;
		this.fields = null;
		this.fieldsValues = null;
		this.resetButton = null;
		this.submitButton = null;
		this.validator = null;
		this.isModal = null;
		this.isLogin = null;
		this.modalLogin = null;
		this.isValid = null;

		this.root && this.init();
	}

	validatorInit() {
		const rules = this.rulesPrepare();
		if (rules) {
			this.validator = new JustValidate(this.root, {
				lockForm: true,
				errorFieldCssClass: 'js-invalid',
				successFieldCssClass: 'js-valid',
				validateBeforeSubmitting: true,
				focusInvalidField: false,
			});

			rules.forEach((item) => {
				this.validator.addField(item.field, item.rules, {
					errorsContainer: item.errorContainer,
				});
			});

			this.validator
				.onSuccess((event) => {
					this.submitHandler(event);
				})
				.onFail((fields) => {
					if (fields) {
						// eslint-disable-next-line guard-for-in,no-restricted-syntax
						for (const key in fields) {
							const $input = fields[key].elem;
							const parent = $input.closest('.js-field');

							if (parent && !($input.classList.contains('js-valid'))) {
								parent.classList.add('js-invalid');
							} else if ($input.classList.contains('js-valid')) {
								parent.classList.add('js-valid');
							}
						}
					}
				});
			this.setBlurFieldListener();
		}
	}

	rulesPrepare() {
		const $formFields = this.getTargetFields();

		if ($formFields) {
			$formFields.forEach((item) => {
				const rules = this.getTargetRules(item);
				this.setTargetRules(item, rules);
			});

			return $formFields;
		}

		return this;
	}

	/* eslint-disable */
	setTargetRules($item, $rules = []) {
		$item.rules = $rules;
		return this;
	}

	getTargetRules(item) {
		const targetRules = [];
		const $isRequired = item.parent.classList.contains('required');
		const $ruleName = item.name;

		if ($isRequired && $ruleName !== 'confirm') {
			targetRules.push({
				rule: 'required',
				errorMessage: 'Поле не может быть пустым',
			});
		}

		if ($ruleName === 'username') {
			targetRules.push({
				rule: 'minLength',
				value: 3,
				errorMessage: 'Значение не может быть короче 3 символов',
			});
			targetRules.push({
				rule: 'maxLength',
				value: 15,
				errorMessage: 'Значение не может быть длиннее 15 символов',
			});
		}

		if ($ruleName === 'email') {
			targetRules.push({
				rule: 'email',
				errorMessage: 'Введите email в формате name@example.com',
			});

			targetRules.push({
				rule: 'minLength',
				value: 5,
				errorMessage: 'Значение не может быть короче 5 символов',
			});

			targetRules.push({
				rule: 'maxLength',
				value: 30,
				errorMessage: 'Значение не может быть длиннее 30 символов',
			});
		}

		if ($ruleName === 'password') {
			targetRules.push({
				rule: 'password',
				errorMessage: 'Пароль не длиннее 8 символов, из них хотя бы 1 буква и 1 цифра',
			});

			targetRules.push({
				rule: 'minLength',
				value: 8,
				errorMessage: 'Значение не может быть короче 8 символов',
			});

			targetRules.push({
				rule: 'maxLength',
				value: 50,
				errorMessage: 'Значение не может быть длиннее 50 символов',
			});
		}

		if ($ruleName === 'phone') {
			targetRules.push({
				validator: (value) => {
					const currentNumber = value.replace(/\D/g, '');
					return (currentNumber.trim().length === 11);
				},
				errorMessage: 'Телефон должен содержать 10 цифр',
			});
		}

		if ($ruleName === 'confirm') {
			targetRules.push({
				rule: 'required',
				errorMessage: 'Вы не подтвердили введенные вами данные',
			});
		}

		if ($ruleName === 'name' || $ruleName === 'company') {
			targetRules.push({
				rule: 'minLength',
				value: 3,
				errorMessage: 'Значение не может быть короче 3 символов',
			});
		}

		return targetRules;
	}

	/* eslint-enable */

	formRevalidate(event) {
		const { target } = event;
		const valueField = target.closest('.field__input').value;
		if (this.validator && valueField.length) {
			this.validator.revalidate()
				.then((isValid) => {
					if (isValid) {
						this.isValid = true;
						this.submitButton.removeAttribute('disabled');
					} else {
						this.isValid = false;
						this.submitButton.setAttribute('disabled', true);
					}
				});
		}
	}

	setBlurFieldListener() {
		if (this.fields) {
			this.formRevalidate = this.formRevalidate.bind(this);
			this.fields.forEach(($field) => {
				$field.addEventListener('blur', this.formRevalidate);
			});
		}
	}

	getTargetFields() {
		this.fields = this.root.querySelectorAll('.js-validate');
		const targetFields = [];
		if (this.fields) {
			this.fields.forEach((item) => {
				const $parent = item.closest('.js-field') || item.closest('.js-checkbox') || item.closest('.js-radio');
				if (item.classList.contains('js-mask')) {
					const dataMask = String(item.dataset.mask)
						.trim();
					if (dataMask) {
						const maskObject = new Inputmask(dataMask);
						maskObject.mask(item);
					}
				}
				targetFields.push({
					name: item.getAttribute('name'),
					field: item,
					parent: $parent,
					errorContainer: $parent.querySelector('.js-error-message'),
					rules: [],
				});
			});
		}

		return targetFields;
	}

	openSuccessMessage(data) {
		if (data) {
			window.app.modal.open('modal-message');
		}

		return this;
	}

	/* eslint-disable */
	submitHandler(event) {
		if (this.isValid) {
			const form = event.target;
			const targetServer = form.getAttribute('action');
			const formData = this.serializeFormToObject(this.root);
			const fields = form.querySelectorAll('.js-field');

			fields.forEach((field) => {
				field.classList.remove('js-invalid');
				field.classList.add('js-valid');
			});

			if (this.isLogin) {
				// Вот тут запускаем форму авторизации, передаем в нее данные: телефон или email
				this.modalLogin = new ModalLogin(this.root, formData);
			} else if (targetServer) {
				ajax({
					url: targetServer,
					success: (xhr, data) => this.openSuccessMessage(data),
					error: (xhr, error) => console.log('Unable to make request'),
				});
			}
		}

		return this;
	}

	/* eslint-enable */

	resetHandler(event) {
		event.preventDefault();
		this.root.reset();
		this.validator.refresh();

		if (this.isLogin && this.modalLogin) {
			this.modalLogin.destroy();
		}

		if (this.fields) {
			this.fields.forEach((item) => {
				const $parent = item.closest('.js-field') || item.closest('.js-checkbox') || item.closest('.js-radio');
				$parent.classList.remove('js-invalid');
				$parent.classList.remove('js-valid');
				$parent.classList.remove('field--fill');
				$parent.classList.remove('field--focus');
			});
		}

		return this;
	}

	startButtons() {
		this.resetButton = this.root.querySelector('.js-form-reset');
		this.submitButton = this.root.querySelector('.js-form-submit');
		this.setFormModalListener();

		if (this.resetButton) {
			this.resetHandler = this.resetHandler.bind(this);
			this.resetButton.addEventListener('click', this.resetHandler);
		}
	}

	setFormModalListener() {
		this.isModal = (this.root.closest('.modal'));
		this.resetHandler = this.resetHandler.bind(this);
		document.addEventListener('modalClose', this.resetHandler);
		return this;
	}

	serializeFormToObject(form) {
		if (form) {
			const objForm = {};
			const formData = new FormData(form);
			// eslint-disable-next-line no-restricted-syntax
			for (const key of formData.keys()) {
				objForm[key] = formData.get(key);
			}
			return objForm;
		}

		return this;
	}

	init() {
		if (!this.root) return this;
		this.isLogin = this.root.classList.contains('js-login-form');
		this.validatorInit();
		this.startButtons();
		return this;
	}

	destroy() {
		this.isLogin = null;
		this.isModal = null;
		if (this.resetButton) {
			this.resetButton.removeEventListener('click', this.resetHandler);
		}

		if (this.validator) {
			this.validator.destroy();
		}

		document.removeEventListener('modalClose', this.resetHandler);
		return this;
	}
}
