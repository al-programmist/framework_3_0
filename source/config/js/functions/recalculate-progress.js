import {body} from '../_config';

/**
 * Функция recalculateProgress будет пересчитывать,
 * какую часть страницы пользователь уже успел прочесть.
 */
export const recalculateProgress = () => {
	const viewportHeight = window.innerHeight;
	const pageHeight = document.body.offsetHeight;
	const currentPositionY = Math.ceil(window.scrollY);
	const availableHeight = pageHeight - viewportHeight;

	let progress = (currentPositionY / availableHeight) * 100;

	if (progress > 100) {
		progress = 100;
	}

	body.style.setProperty('--viewport-current-position-y', `${currentPositionY}px`);
	body.style.setProperty('--viewport-progress-y', `${progress}%`);
};