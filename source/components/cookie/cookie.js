/**
 * Получаем сообщение от сервера об использовании cookie, за вывод отвечает параметр answer.
 * Заглушка лежит здесь: './response/cookies.json'
 */

import { ajax } from '../../config/js/ajax';
import { config } from '../../config/js/config';
import { media } from '../../config/js/media';

export class Cookie {
	constructor(selector) {
		this.root = selector;
		this.closeButton = this.root.querySelector('.js-cookie-close');
		this.breakpoints = config.breakpoint;
		this.targetServer = './response/cookies.json';
		this.root && this.init();
	}

	/* eslint-disable */

	getCookies() {
		const { targetServer } = this;
		if (targetServer) {
			ajax({
				url: targetServer,
				success: (xhr, data) => this.openCookiesMessage(data),
				error: (xhr, error) => console.log('Unable to make request'),
			});
		}
	}

	/* eslint-enable */

	openCookiesMessage(data) {
		const currentResponse = JSON.parse(data);
		media(`all and (min-width: ${this.breakpoints.tablet}px)`, () => {
			if (currentResponse.answer) {
				document.body.classList.add('cookie--open');
				window.app.modal.close('modal-cookies');
			}
		});

		media(`all and (max-width: ${this.breakpoints.tablet - 1}px)`, () => {
			if (currentResponse.answer) {
				window.app.modal.open('modal-cookies');
			}
		});

		return this;
	}

	closeCookiesMessage() {
		media(`all and (min-width: ${this.breakpoints.tablet}px)`, () => {
			document.body.classList.remove('cookie--open');
		});

		media(`all and (max-width: ${this.breakpoints.tablet - 1}px)`, () => {
			window.app.modal.close();
		});

		return this;
	}

	init() {
		if (!this.root) return this;
		this.getCookies();
		this.closeCookiesMessage = this.closeCookiesMessage.bind(this);
		this.closeButton.addEventListener('click', this.closeCookiesMessage);
		return this;
	}

	destroy() {
		return this;
	}
}
