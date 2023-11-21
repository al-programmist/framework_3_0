import { isHasSupported } from '../../config/js/helpers';

class CheckoutPickup {
	#element;
	#items;
	#modal;
	#tabs;
	#tabContents;
	#itemActiveClass = 'checkout-pickup-item--active';
	#tabActiveClass = 'checkout-pickup__tab--active';
	#tabContentActiveClass = 'checkout-pickup__tab-content--active';

	constructor(element) {
		this.#element = element;
		this.#items = this.#element?.querySelectorAll('.checkout-pickup__item');
		this.#modal = this.#element?.closest('.modal');
		this.#tabs = this.#element?.querySelectorAll('.checkout-pickup__tab');
		this.#tabContents = this.#element?.querySelectorAll('.checkout-pickup__tab-content');
	}

	#buttonClickHandler = ({ currentTarget }) => {
		localStorage.setItem('checkoutDeliverySelected', 'self');
		const parent = currentTarget.parentNode;
		const { address } = parent.dataset;
		localStorage.setItem('checkoutDeliverySelf', JSON.stringify(address));
		this.#modal.dispatchEvent(new CustomEvent('deliverySelected', {
			bubbles: true,
			detail: {
				description: address,
			},
		}));
		window.app.modal.close();
	};

	#tabClickHandler = ({ target }) => {
		const index = Array.from(target.parentNode.children).indexOf(target);
		this.#tabs.forEach((tab) => tab.classList.remove(this.#tabActiveClass));
		this.#tabContents.forEach((tab) => tab.classList.remove(this.#tabContentActiveClass));
		target.classList.add(this.#tabActiveClass);
		Array.from(this.#tabContents)[index].classList.add(this.#tabContentActiveClass);
	};

	#setItemActivity = ({ target }) => {
		this.#items.forEach((item) => item.classList.remove(this.#itemActiveClass));
		target.parentNode.classList.add(this.#itemActiveClass);
	};

	init = () => {
		this.#tabs.forEach((tab) => {
			tab.addEventListener('click', this.#tabClickHandler);
		});
		this.#items.forEach((item) => {
			if (!isHasSupported()) {
				const radio = item.querySelector('.checkout-pickup-item__radio');
				radio.addEventListener('change', this.#setItemActivity);
			}
			const button = item.querySelector('.checkout-pickup-item__button');
			button.addEventListener('click', this.#buttonClickHandler);
		});
	};
}

export const checkoutPickup = new CheckoutPickup(document.querySelector('.js-checkout-pickup'));
