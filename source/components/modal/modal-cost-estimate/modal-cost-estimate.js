class ModalCostEstimate {
	#element;

	#field;

	#button;

	#customFilename = '';

	constructor(element) {
		this.#element = element;
		this.#field = this.#element?.querySelector('.field__input');
		this.#button = this.#element?.querySelector('.modal-cost-estimate__download');
	}

	#modalOpenHandler = () => {
		if (!this.#customFilename) {
			const date = new Date();
			const [month, day, year, hour, minutes, seconds] = [
				`0${date.getMonth() + 1}`.slice(-2),
				`0${date.getDate()}`.slice(-2),
				date.getFullYear(),
				`0${date.getHours()}`.slice(-2),
				`0${date.getMinutes()}`.slice(-2),
				`0${date.getSeconds()}`.slice(-2),
			];
			this.#field.value = `Смета ${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;
			this.#button.download = this.#field.value;
		}
	};

	#fieldInputHandler = ({ target }) => {
		this.#customFilename = target.value;
		this.#button.download = this.#customFilename;
	};

	init = () => {
		if (!this.#element) return;
		this.#element.addEventListener('modalOpen', this.#modalOpenHandler);
		this.#field.addEventListener('input', this.#fieldInputHandler);
	};
}

export const modalCostEstimate = new ModalCostEstimate(document.querySelector('.js-modal-cost-estimate'));
