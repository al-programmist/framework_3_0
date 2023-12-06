/**
 * Обработка вьюпорта на мобильных устройствах, внесение ширины и высоты
 * в CSS-переменные. Умеет работать с виртуальной клавиатурой, идеально для бургеров,
 * должна идти в паре со стандартным медиазапросом.
 */

import { config, body, win } from '../_config';
import { media } from './media';

const { breakpoint } = config;

const setParameters = (width, height) => {
	let currentVieportWidth = Math.ceil(width);
	let currentVieportHeight = Math.ceil(height);

	body.style.setProperty('--viewport-height', `${currentVieportHeight}px`);
	body.style.setProperty('--viewport-width', `${currentVieportWidth}px`);
};

const viewportHandler = (event) => {
	let currentVieportWidth = Math.ceil(event.target.width);

	if (currentVieportWidth <= breakpoint.devices) {
		setParameters(event.target.width, event.target.height);
	}
};

const setDevicesVieportWatcher = () => {
	setParameters(win.innerWidth, win.innerHeight);
	visualViewport.addEventListener('resize', viewportHandler);
};

const removeDevicesVieportWatcher = () => {
	body.style.removeProperty('--viewport-width');
	body.style.removeProperty('--viewport-height');
	visualViewport.removeEventListener('resize', viewportHandler);
};

export const deviceViewportWatcher = () => {
	media(`all and (max-width: ${breakpoint.devices}px)`, () => {
		setDevicesVieportWatcher();
	});

	media(`all and (min-width: ${breakpoint.devices + 1}px)`, () => {
		removeDevicesVieportWatcher();
	});
};
