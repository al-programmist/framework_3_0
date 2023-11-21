import SimpleBar from 'simplebar';

export class Modal {
	constructor() {
		this.currentModal = null;

		this.classOpen = 'modal--open';
		this.classDisabled = 'disabled-scroll';
		this.selectorScrollBox = '.js-modal-scroll';
		this.simpleBarReady = null;

		this.init();
	}

	init() {
		this.clickHandler = this.clickHandler.bind(this);
		document.addEventListener('click', this.clickHandler);
	}

	clickHandler(event) {
		const { target } = event;

		if (target.closest('.js-modal')) {
			event.preventDefault();
			const link = target.closest('.js-modal');
			const modalId = link.getAttribute('data-modal') || link.getAttribute('href');
			if (modalId === 'modal-city') document.body.classList.add('city--open');
			this.open(modalId);
		} else if (target.closest('.js-modal-close')) {
			this.close();
		}
	}

	open(id) {
		this.currentModal
			&& this.currentModal.classList.remove(this.classOpen);

		this.currentModal = document.getElementById(id);
		if (this.currentModal === null) return this;

		this.currentModal.classList.add(this.classOpen);
		document.body.classList.add(this.classDisabled);
		this.currentModal.dispatchEvent(new CustomEvent('modalOpen', {
			bubbles: true,
			cancelable: true,
		}));


		if (!this.simpleBarReady) {
			const scrollBoxs = this.currentModal.querySelectorAll(this.selectorScrollBox);

			scrollBoxs.forEach((box) => {
				new SimpleBar(box, {
					autoHide: false,
				});
			});
			this.simpleBarReady = true;
		}

		return this;
	}

	close() {
		if (this.currentModal === null) return this;

		this.currentModal.classList.remove(this.classOpen);
		document.body.classList.remove(this.classDisabled);
		this.currentModal.dispatchEvent(new CustomEvent('modalClose', {
			bubbles: true,
			cancelable: true,
		}));
		this.currentModal = null;

		return this;
	}

	destroy() {
		this.close();
		document.removeEventListener('click', this.clickHandler);
	}
}
