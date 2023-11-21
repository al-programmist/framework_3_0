import { media } from '../../config/js/media';
import { config } from '../../config/js/config';

export class CardInspiration {
	constructor(name) {
		this.root = name;
		this.index = this.root.dataset.card;
		this.inspirations = this.root.closest('.js-inspirations');
		this.openButton = null;
		this.closeButton = this.root.querySelector('.js-close');
		this.breakpoints = config.breakpoint;
		this.isOpened = null;
		this.currentDeltas = null;
		this.root && this.init();
	}

	setCurrentOpenHandler() {
		if (this.root) {
			this.openButton = this.inspirations.querySelector(`[data-index="${this.index}"]`);
			this.openHandler = this.openHandler.bind(this);
			this.openButton.addEventListener('click', this.openHandler);
		}
	}

	setCurrentCloseHandler() {
		if (this.root) {
			this.close = this.close.bind(this);
			this.closeButton.addEventListener('click', this.close);
		}
	}

	getCurrentDeltas() {
		media(`all and (min-width: ${this.breakpoints.desktop}px)`, () => {
			const currentDeltas = {
				dx: -257,
				dy: 24,
			};
			this.currentDeltas = currentDeltas;
			return this;
		});

		media(`all and (max-width: ${this.breakpoints.desktop - 1}px)`, () => {
			const currentDeltas = {
				dx: -140,
				dy: 24,
			};
			this.currentDeltas = currentDeltas;
			return this;
		});

		media(`all and (max-width: ${this.breakpoints.tablet - 1}px)`, () => {
			const currentDeltas = {
				dx: -95,
				dy: 15,
			};
			this.currentDeltas = currentDeltas;
			return this;
		});
	}

	openHandler(event) {
		const { target } = event;
		const thisButton = target.closest('.js-inspiration-button');
		if (target.closest('.js-inspiration-button--open')) {
			thisButton.classList.add('js-inspiration-button--close');
			thisButton.classList.remove('js-inspiration-button--open');
			this.open(event);
		} else if (target.closest('.js-inspiration-button--close')) {
			thisButton.classList.add('js-inspiration-button--open');
			thisButton.classList.remove('js-inspiration-button--close');
			this.close();
		}
	}

	open(event) {
		this.getCurrentDeltas();
		const deltaX = this.currentDeltas.dx;
		const deltaY = this.currentDeltas.dy;
		const offsetX = event.pageX + deltaX;
		const offsetY = event.pageY + deltaY;
		this.root.style = `--move-x: ${offsetX}px; --move-y: ${offsetY}px`;
		this.root.classList.add('card-inspiration--open');
		this.isOpened = true;
	}

	onPageClose(event) {
		const { target } = event;
		const targetButton = target.closest('.js-inspiration-button');
		const isOnCard = target.closest('.js-card-inspiration');
		if (!isOnCard && this.isOpened && !targetButton) {
			this.close();
		}
	}

	close() {
		this.openButton.classList.add('js-inspiration-button--open');
		this.openButton.classList.remove('js-inspiration-button--close');
		this.root.classList.remove('card-inspiration--open');
		this.isOpened = false;
	}

	init() {
		if (!this.root) return this;
		this.setCurrentOpenHandler();
		this.setCurrentCloseHandler();
		this.onPageClose = this.onPageClose.bind(this);
		document.body.addEventListener('click', this.onPageClose);
		return this;
	}

	destroy() {
		return this;
	}
}
