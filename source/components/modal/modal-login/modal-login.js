import { Authorize } from '../../form/authorize';
import { TimerPanel } from '../../form/timer-panel';

export class ModalLogin {
	constructor(form, formData) {
		this.root = document.body.querySelector('.js-authorize');
		this.form = form;
		this.formData = formData;
		this.currentData = null;
		this.modalRoot = null;
		this.backButton = null;
		this.codeInstructionButton = null;
		this.emailButton = null;
		this.emailLogin = null;
		this.smsLogin = null;
		this.timer = null;
		this.classSmsConfirmModal = 'modal--login-step-confirm';
		this.classMessageModal = 'modal--login-step-message';
		this.classRequestModal = 'modal--login-step-request';
		this.timerPanel = null;
		this.authorize = null;
		this.isMessage = null;

		this.root && this.init();
	}

	clearPages() {
		const pages = this.root.querySelectorAll('.js-page');
		pages.forEach((item) => {
			item.classList.remove('js-active');
		});

		return this;
	}

	setModalRootStateRequest(type) {
		const $currentPage = (type === 'email') ? this.root.querySelector('.js--email-login') : this.root.querySelector('.js-page--default');
		this.clearPages();
		this.modalRoot = this.root.closest('.modal--login');
		if (this.modalRoot) {
			this.modalRoot.classList.remove(this.classSmsConfirmModal);
			this.modalRoot.classList.remove(this.classMessageModal);
			this.modalRoot.classList.add(this.classRequestModal);
			$currentPage.classList.add('js-active');
		}
		return this;
	}

	setModalRootStateConfirm(type) {
		const $currentPage = (type === 'sms') ? this.root.querySelector('.js--sms-confirm') : this.root.querySelector('.js--email-confirm');
		const $confirmForm = $currentPage.querySelector('form');

		this.clearPages();
		this.modalRoot = this.root.closest('.modal--login');
		if (this.modalRoot) {
			this.modalRoot.classList.remove(this.classRequestModal);
			this.modalRoot.classList.remove(this.classMessageModal);
			this.modalRoot.classList.add(this.classSmsConfirmModal);
			$currentPage.classList.add('js-active');
			$currentPage.querySelector('.js-code-target').textContent = this.currentData;

			// Здесь подключается подтверждение кода sms и email

			if (this.smsLogin && !this.isMessage) {
				this.authorize = new Authorize($confirmForm, 'sms', this.currentData);
			}

			if (this.emailLogin && !this.isMessage) {
				this.authorize = new Authorize($confirmForm, 'email', this.currentData);
			}

			if (!this.isMessage)	this.timerPanel = new TimerPanel($confirmForm);
		}
		return this;
	}

	setModalRootStateMessage() {
		const $currentPage = this.root.querySelector('.js--message');
		const $messages = this.root.querySelector('.no-code');
		const $smsMessage = $messages.querySelector('.no-code--sms');
		const $emailMessage = $messages.querySelector('.no-code--email');

		this.clearPages();

		if (this.modalRoot) {
			this.modalRoot.classList.remove(this.classRequestModal);
			this.modalRoot.classList.add(this.classMessageModal);
			this.modalRoot.classList.remove(this.classSmsConfirmModal);
			$currentPage.classList.add('js-active');
		}

		if (this.smsLogin) {
			$smsMessage.classList.remove('visually-hidden');
			$emailMessage.classList.add('visually-hidden');
		}

		if (this.emailLogin) {
			$smsMessage.classList.add('visually-hidden');
			$emailMessage.classList.remove('visually-hidden');
		}

		return this;
	}

	getFormDataValue($formData) {
		if ($formData) {
			return $formData.phone || $formData.email;
		}
		return this;
	}

	backButtonClickHandler(event) {
		event.preventDefault();
		this.isMessage = true;

		if (this.smsLogin) {
			this.setModalRootStateConfirm('sms');
		}

		if (this.emailLogin) {
			this.setModalRootStateConfirm('email');
		}

		return this;
	}

	codeInstructionClickHandler(event) {
		event.preventDefault();
		this.setModalRootStateMessage();
		return this;
	}

	emailClickHandler(event) {
		event.preventDefault();
		if (this.authorize) this.authorize.destroy();
		this.destroy();
		this.setModalRootStateRequest('email');
		return this;
	}

	initButtons() {
		this.emailButton = this.modalRoot.querySelector('.js-code-email--toggle');
		this.backButton = this.modalRoot.querySelector('.js-modal-login--back');
		this.codeInstructionButton = this.modalRoot.querySelectorAll('.js-code-instruction--toggle');

		this.emailClickHandler = this.emailClickHandler.bind(this);
		this.backButtonClickHandler = this.backButtonClickHandler.bind(this);
		this.codeInstructionClickHandler = this.codeInstructionClickHandler.bind(this);

		this.backButton.addEventListener('click', this.backButtonClickHandler);
		this.emailButton.addEventListener('click', this.emailClickHandler);

		this.codeInstructionButton.forEach((item) => {
			item.addEventListener('click', this.codeInstructionClickHandler);
		});
	}

	setLoginMode() {
		if (this.form) {
			this.emailLogin = this.form.classList.contains('js-login-form--email');
			this.smsLogin = this.form.classList.contains('js-login-form--sms');

			if (this.smsLogin) {
				this.setModalRootStateConfirm('sms');
			}

			if (this.emailLogin) {
				this.setModalRootStateConfirm('email');
			}
		}

		return this;
	}

	init() {
		if (!this.root) return this;
		this.currentData = this.getFormDataValue(this.formData);
		this.modalRoot = this.root.closest('.modal--login');
		this.initButtons();
		this.setLoginMode();
		return this;
	}

	destroy() {
		if (this.authorize) this.authorize.destroy();
		if (this.timerPanel) this.timerPanel.destroy();
		this.backButton.removeEventListener('click', this.backButtonClickHandler);
		this.emailButton.removeEventListener('click', this.emailClickHandler);
		this.codeInstructionButton.forEach((item) => {
			item.removeEventListener('click', this.codeInstructionClickHandler);
		});

		this.setModalRootStateRequest('sms');
		return this;
	}
}
