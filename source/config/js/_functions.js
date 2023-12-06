// import { media } from './functions/media';
// import { throttle } from './functions/throttle';
import { deviceViewportWatcher } from './functions/set-device-viewport-watcher';
import { setScrollResizeWatchers } from './functions/set-scroll-resize-watchers';

// Простой медиазапрос
// media('all and (min-width: 768px) and (max-width: 1024px)', () => {
// 	console.log('in range!');
// });

window.addEventListener('DOMContentLoaded', () => {
	// Детектирование мобильных устройств, передача ширины и высоты вьюпорта в CSS-переменную
	deviceViewportWatcher();
	// Наблюдатель за прогрессом прокруткой и изменением размера, толкает в CSS-переменные
	setScrollResizeWatchers();
});
