// import { isArray } from './functions/helpers';
import { deviceViewportWatcher } from './functions/set-device-viewport-watcher';
import { setScrollResizeWatchers } from './functions/set-scroll-resize-watchers';

window.addEventListener('DOMContentLoaded', () => {
	// Детектирование мобильных устройств, передача ширины и высоты вьюпорта в CSS-переменную
	deviceViewportWatcher();
	// Наблюдатель за прогрессом прокруткой и изменением размера, толкает в CSS-переменные
	setScrollResizeWatchers();
});

// TODO: Создать мок-объект сервера: https://doka.guide/js/debounce/
