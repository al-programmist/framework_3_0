/**
 * Иногда нужно пропускать вызовы некоторых функций, напромер, обработчик при скролле или ресайзе.
 * Эту задачу решает throttle.
 * @param callee - функция, которую надо вызывать;
 * @param timeout - интервал в мс, с которым следует пропускать вызовы
 * @returns {(function(...[*]): void)|*}
 *
 * Usage:
 * Функция, которую мы хотим «пропускать»:
 * function doSomething(arg) {
 *   // ...
 * }
 *
 * doSomething(42);
 *
 * Оборачиваем функцию в throttle:
 * const throttledDoSomething = throttle(doSomething, 250)
 *
 * Вызываем эту функцию:
 * throttledDoSomething(42);
 *
 * Пропишем обработчик:
 * function recalculateProgress() {
 *   // ..чего-то делает
 * }
 *
 * const optimizedHandler = throttle(recalculateProgress, 50);
 * window.addEventListener('scroll', optimizedHandler, {passive: true});
 */

export const throttle = (callee, timeout) => {
	// Таймер будет определять,
	// надо ли нам пропускать текущий вызов.
	let timer = null;

	// Как результат возвращаем другую функцию.
	// Это нужно, чтобы мы могли не менять другие части кода,
	return function perform(...args) {
		// Если таймер есть, то функция уже была вызвана,
		// и значит новый вызов следует пропустить.
		if (timer) {
			return;
		}

		// Если таймера нет, значит мы можем вызвать функцию:
		timer = setTimeout(() => {
			// Аргументы передаём неизменными в функцию-аргумент:
			callee(...args);

			// По окончании очищаем таймер:
			clearTimeout(timer);
			timer = null;
		}, timeout);
	};
};
