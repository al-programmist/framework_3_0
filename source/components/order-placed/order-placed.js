class OrderPlaced {
	#element;
	#modal;

	constructor(element) {
		this.#element = element;
		this.#modal = document.querySelector('.modal-order-placed');
	}

	openModal = () => window.app.modal.open(this.#modal.id);

	init = () => {
		if (!this.#element || !this.#modal) return;
		setTimeout(this.openModal, 5000);
	};
}

export const orderPlaced = new OrderPlaced(document.querySelector('.js-order-placed'));
