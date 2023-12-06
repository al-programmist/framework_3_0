/**
 * Функция выполняется не больше одного раза за указанный промежуток времени.
 * Применение: отправка запросов на сервер при вводе в форме поиска,
 * скрипты, которые должны выполняться ТОЛЬКО после событий (прокрутка, ресайз и др.)
 * или модуль, который ждет окончания некоего повторяющегося действия.
 *
 * @param callee - функция, которую надо «откладывать»;
 * @param timeoutMs - интервал времени, спустя которое функцию следует вызывать.
 * @returns {(function(...[*]): void)|*}
 *
 * Usage:
 * // Функция, которую мы хотим «откладывать»:
 * function doSomething(arg) {
 *   // ...
 * }
 *
 * doSomething(42)
 *
 * // А вот — та же функция, но обёрнутая в debounce:
 * const debouncedDoSomething = debounce(doSomething, 250)
 *
 * // debouncedDoSomething — это именно функция,
 * // потому что из debounce мы возвращаем функцию.
 *
 * // debouncedDoSomething принимает те же аргументы,
 * // что и doSomething, потому что perform внутри debounce
 * // прокидывает все аргументы без изменения в doSomething,
 * // так что и вызов debouncedDoSomething будет таким же,
 * // как и вызов doSomething:
 *
 * debouncedDoSomething(42)
 */

export const debounce = (callee, timeoutMs) => {
	return function perform(...args) {
		let previousCall = this.lastCall;
		this.lastCall = Date.now();

		if (previousCall && this.lastCall - previousCall <= timeoutMs) {
			clearTimeout(this.lastCallTimer);
		}

		this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
	};
};
