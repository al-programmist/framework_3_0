/* eslint-disable */
import { ClassWatcher } from "../../config/js/ClassObserver";

class CartLayout {
	#element;
	#tel;
	#submit;

	constructor(element) {
		this.#element = element;
		this.#tel = this.#element?.querySelectorAll('.js-cart-tel');
		this.#submit = this.#element?.querySelectorAll('.js-cart-submit');
	}

	#activateButton = () => {
		this.#submit.forEach((button) => {
			button.classList.remove('button-primary--disabled');
			button.classList.add('button-primary--black');
			button.removeAttribute('disabled');
		})
	}

	#deactivateButton = () => {
		this.#submit.forEach((button) => {
			button.classList.add('button-primary--disabled');
			button.classList.remove('button-primary--black');
			button.setAttribute('disabled', true);
		})
	}

	#fieldInputHandler = ({ target }) => {
		const targetParentTel = target.closest('.js-cart-tel');
		this.#tel.forEach((tel) => {
			if (targetParentTel === tel) return;
			const field = tel.querySelector('.field__input');
			field.value = target.value;

			if (field.value) tel.classList.add('field--fill');
			else tel.classList.remove('field--fill');

			setTimeout(() => {
				if (targetParentTel.classList.contains('js-valid')) tel.classList.add('js-valid');
				else if (tel.classList.contains('js-valid')) tel.classList.remove('js-valid');
			}, 100)
		})
	}

	init = () => {
		if (!this.#element) return;
		this.#tel.forEach((tel) => {
			const telClassObserver = new ClassWatcher(tel, 'js-valid', this.#activateButton, this.#deactivateButton);
			telClassObserver.init();
			const field = tel.querySelector('.field__input');
			field.addEventListener('input', this.#fieldInputHandler);
		})
	}
}

export const cartLayout = new CartLayout(document.querySelector('.cart-layout'));
