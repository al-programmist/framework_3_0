import { media } from '../../../config/js/media';
import { config } from '../../../config/js/config';

export class ModalCookies {
	constructor() {
		this.root = document.body.querySelector('.js-modal-cookies');
		this.breakpoints = config.breakpoint;
		this.confirmButton = null;
		this.root && this.init();
	}

	init() {
		if (!this.root) return this;
		this.confirmButton = this.root.querySelector('.js-modal-cookies-close');
		this.confirmButton.addEventListener('click', this.close);

		media(`all and (min-width: ${this.breakpoints.tablet}px)`, () => {
			window.app.modal.close('modal-cookies');
		});
		return this;
	}

	close() {
		window.app.modal.close();
		return this;
	}

	destroy() {
		this.confirmButton.removeEventListener('click', this.close);
		return this;
	}
}
