import { Microfield } from '../microfield/microfield';
import { ajax } from '../../config/js/ajax';

export class Authorize {
	constructor(form, type, data) {
		this.type = type;
		this.form = form;
		this.data = data;
		this.code = [];
		this.timer = null;
		this.serverCode = null;
		this.microfields = null;
		this.authorized = null;
		this.microFieldsObjects = [];
		this.body = document.body;
		this.type && this.form && this.data && this.init();
	}

	getAuthorizationStatus() {
		const $bodyAuthorized = this.body.classList.contains('is-authorized');
		if ($bodyAuthorized) this.authorized = true;
		return $bodyAuthorized && this.authorized;
	}

	/* eslint-disable */
	getServerCode() {
		const targetServer = this.form.getAttribute('action');
		ajax({
			url: targetServer,
			success: (xhr, data) => {
				if (data) {
					let $currentCode = JSON.parse(data);
					$currentCode = $currentCode.code.split('');
					this.serverCode = $currentCode;
				}
			},
			
			error: (xhr, error) => console.log('Unable to make request'),
		});

		return this;
	}
	/* eslint-enable */

	getFormMicrofields() {
		this.microfields = this.form.querySelectorAll('.js-microfield');
		this.microfields.forEach((item) => {
			this.microFieldsObjects.push(new Microfield(item));
		});
	}

	startConstruction(event) {
		const { detail } = event;
		this.code.push(detail.value);
		this.microfields[1].focus();
	}

	endConstruction(event) {
		const { detail } = event;
		const currentIndex = Number(detail.index);
		this.code.push(detail.value);
		this.microfields[currentIndex].blur();

		this.validateCodes();
	}

	progressConstruction(event) {
		const { detail } = event;
		const currentIndex = Number(detail.index) + 1;
		this.microfields[currentIndex].focus();
		this.code.push(detail.value);
	}

	codeConstructionBackspaceClearField(event) {
		const { detail } = event;
		const currentIndex = Number(detail.next);
		this.microfields[currentIndex].focus();
		if (this.code.length > 0) this.code.length -= 1;
	}

	codeConstructionGotoPrev(event) {
		const { detail } = event;
		const currentIndex = Number(detail.next);
		this.microfields[currentIndex].focus();
	}

	codeConstructionGotoNext(event) {
		const { detail } = event;
		const currentIndex = Number(detail.next);
		this.microfields[currentIndex].focus();
	}

	setFieldsInvalid() {
		this.microFieldsObjects.forEach((item) => {
			item.inValidate();
		});
		this.code.length = 0;

		return this;
	}

	setFieldsClear() {
		this.microFieldsObjects.forEach((item) => {
			item.clear();
		});
	}

	validateCodes() {
		const isValid = this.compareCodes(this.code, this.serverCode);
		if (!isValid) {
			this.setFieldsInvalid();

			setTimeout(() => {
				this.setFieldsClear();
				this.microfields[0].focus();
			}, 1500);
			return this;
		}
		this.acceptAuthorization();
		return this;
	}

	setAuthorizationStatus() {
		this.body.classList.add('is-authorized');
		this.authorized = true;
		window.app.modal.close();
		window.app.modal.open('modal-message-success-login');
		this.body.querySelectorAll('.js-header-profile').forEach((button) => {
			button.classList.remove('js-modal');
		});
		this.body.querySelectorAll('.mobile-navigation__profile').forEach((button) => {
			button.classList.remove('js-modal');
		});
		return this;
	}

	acceptAuthorization() {
		this.setAuthorizationStatus();
	}

	compareCodes(codeUser, codeServer) {
		if (codeUser && codeServer) {
			// eslint-disable-next-line max-len
			return (codeUser.length === codeServer.length) && (codeUser.every((element, index) => element === codeServer[index]));
		}

		return this;
	}

	onCodeResend() {
		this.getServerCode();
	}

	setEvents() {
		this.progressConstruction = this.progressConstruction.bind(this);
		document.body.addEventListener('codeConstructionProgress', this.progressConstruction);

		this.endConstruction = this.endConstruction.bind(this);
		document.body.addEventListener('codeConstructionComplete', this.endConstruction);

		this.startConstruction = this.startConstruction.bind(this);
		document.body.addEventListener('codeConstructionStart', this.startConstruction);
		this.onCodeResend = this.onCodeResend.bind(this);
		document.body.addEventListener('codeResend', this.onCodeResend);
		this.codeConstructionBackspaceClearField = this.codeConstructionBackspaceClearField.bind(this);
		document.body.addEventListener('codeConstructionBackspaceClearField', this.codeConstructionBackspaceClearField);

		this.codeConstructionGotoPrev = this.codeConstructionGotoPrev.bind(this);
		document.body.addEventListener('codeConstructionGotoPrev', this.codeConstructionGotoPrev);

		this.codeConstructionGotoNext = this.codeConstructionGotoNext.bind(this);
		document.body.addEventListener('codeConstructionGotoNext', this.codeConstructionGotoNext);
	}

	init() {
		if (!this.type) return this;

		const $authorized = this.getAuthorizationStatus();
		if (!$authorized) {
			this.getFormMicrofields();
			this.setEvents();
			this.getServerCode();

			return this;
		}

		return this;
	}

	clear() {
		if (this.microFieldsObjects) {
			this.microFieldsObjects.forEach((item) => {
				item.destroy();
			});
		}

		return this;
	}

	destroy() {
		this.clear();
		document.body.removeEventListener('codeConstructionProgress', this.progressConstruction);
		document.body.removeEventListener('codeConstructionComplete', this.endConstruction);
		document.body.removeEventListener('codeConstructionStart', this.startConstruction);
		return this;
	}
}
