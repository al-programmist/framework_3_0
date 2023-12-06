/**
 * iOS не уважает "user-scalable=no", и пока они это делают
 * по соображениям доступности существуют случаи использования, когда мы действительно хотим
 * предотвратить масштабирование пользователей.
 *
 * Используйте только в том случае, если вы знаете, что вам это нужно!!!
 */

import { html } from '../_config';

export const disableIosScaling = () => {
	const isIOS = html.classList.contains('is-os-ios') ||
					html.classList.contains('is-os-mac-os') ||
					html.classList.contains('is-device-ipad') ||
					html.classList.contains('is-device-iphone') ||
					html.classList.contains('is-device-ipod');

	if (isIOS) {
		/**
		 * Предотвратите масштабирование с помощью пинча, если текущий масштаб уже равен 1
		 */
		let lastKnownScale = null;

		let handleTouchEvent = (event) => {
			lastKnownScale = event.scale;
		};

		const handleTouchMove = (event) => {
			if (event.scale !== 1) {
				if (lastKnownScale === 1) {
					event.preventDefault();
				}
			} else if (event.scale === 1) {
				lastKnownScale = 1;
			}

			lastKnownScale = event.scale;
		};

		document.addEventListener('touchstart', handleTouchEvent, false);
		document.addEventListener('touchmove', handleTouchMove, false);

		/**
		 * Отключите двойное нажатие,которое в iOS будет увеличивать масштаб элемента
		 */

		let lastTouchTime = 0;

		const handleTouchTap = (event) => {
			let now = Date.now();

			if (now - lastTouchTime <= 400) {
				event.preventDefault();
			}

			lastTouchTime = now;
		};

		document.addEventListener('touchend', handleTouchTap, false);
	}
};
