// noinspection JSUnusedGlobalSymbols
/*eslint-disable*/

/**
 * Найти максимальное значение в массиве
 * @param array
 * @returns {number}
 */
const getMaxInArray = array => Math.max(array);

/**
 * Найти минимальное значение в массиве
 * @param array
 * @returns {number}
 */
const getMinInArray = array => Math.min(array);

/**
 * Сгенерировать случайное число от 1 до number:
 * @param number
 * @returns {number}
 */
const getRandomNumberInRange = number => Math.floor(Math.random() * number) + 1;

/**
 * Проверить, является ли строка валидным числом:
 * @param string
 * @returns {boolean}
 */
const isValidNumber = (string) => !isNaN(parseFloat(string));

/**
 * Получить текущую дату и время:
 */
const getCurrentDateTime = () => new Date().toString();

/**
 * Проверить, является ли переменная массивом:
 * @param variable
 * @returns {arg is any[]}
 */
const isArray = variable => !!(Array.isArray(variable));

/**
 * Проверить, является ли переменная объектом:
 * @param variable
 * @returns {boolean}
 */
const isObject = variable => (typeof variable === 'object');

/**
 * Преобразовать массив в строку:
 * @param array
 * @returns {*}
 */
const getStringFromArray = array => array.join(',');

/**
 * Проверить, является ли переменная функцией:
 * @param variable
 * @returns {boolean}
 */
const isFunction = variable => (typeof variable === 'function');

/**
 *  Преобразовать объект в массив:
 * @param object
 * @returns {unknown[]}
 */
const objectIntoArray = object => Object.values(object);

/**
 * Посчитать вхождения элемента в массиве:
 * @param element
 * @param array
 * @returns {*}
 */
const countEqualInArray = (element, array) => array.filter(x => x === element).length;

/**
 * Проверить, является ли строка палиндромом:
 * @param string
 * @returns {boolean}
 */
const isPalindrome = (string) => (string === string.split('')
				.reverse()
				.join(''));

/**
 * Получить сумму всех чисел в массиве
 * @param array
 * @returns {*}
 */
const getSumOfArray = (array) => array.reduce((a, b) => a + b, 0);

/**
 * Получить произведение всех чисел в массиве
 * @param array
 * @returns {*}
 */
const getMultOfArray = (array) => array.reduce((a, b) => a * b, 0);

/**
 * Получить текущую метку времени
 * @returns {number}
 */
const getNowTimeStamp = () => Date.now();

/**
 * Проверить, является ли переменная null:
 * @param variable
 * @returns {boolean}
 */
const isNull = (variable) => (variable === null);

/**
 * Проверить, является ли переменная undefined:
 * @param variable
 * @returns {boolean}
 */
const isUndefined = (variable) => (typeof variable === 'undefined');

/**
 * Проверить, пуст ли массив:
 * @param array
 * @returns {boolean}
 */
const isEmptyArray = (array) => (array.length === 0);

/**
 * Форматирование номера в строку с пробелами по 3 разряда
 * @param number
 * @returns {string}
 */

const numberWithSpaces = (number) => number.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/**
 * Сделать первый символ строки заглавным
 * @param string
 * @returns {string}
 */
const capitalizeFirstLetter = (string) => string.charAt(0)
				.toUpperCase() + string.slice(1);

/**
 * Плюрализация (множественность) текста
 *
 * @param {number} count Значение
 * @param {array} translations Список переводов
 * @returns {string} Перевод
 *
 * @example
 * transchoice(12, [
 * '%count% months', // 0
 * '%count% month', // 1, 21,
 * '%count% months', // 2, 3, 4, 22, 23,
 * '%count% months' //
 * ]); // => '12 months'
 *
 * @example
 * transchoice(23, [
 * '%count% комнат', // 0
 * '%count% комната', // 1, 21,
 * '%count% комнаты', // 2, 3, 4, 22, 23,
 * '%count% комнат' //
 * ]); // => '23 комнаты'
 */

const transchoice = (count, translations) => {
	let text;
	let cnt = parseInt(count, 10);
	let rem;

	if (!translations || !translations.length) {
		return String(count);
	}
	rem = cnt % 10;

	if (cnt === 0) {
		// 0
		text = translations[0];
	} else if (rem === 1 && cnt !== 11) {
		// Ending with 1, except 11
		text = translations[1];
	} else if (rem >= 2 && rem <= 4 && cnt !== 12 && cnt !== 13 && cnt !== 14) {
		// Ending with 2, 3 or 4, except 12, 13 and 14
		text = translations[2];
	} else if (translations[3] === undefined || translations[3] === null) {
		text = translations[2];
	} else {
		text = translations[3];
	}

	// Replace in string %count%
	return String(text)
					.replace(/%count%/g, count);
};

export {
	isArray,
	isEmptyArray,
	isFunction,
	isNull,
	isObject,
	isPalindrome,
	isUndefined,
	isValidNumber,
	objectIntoArray,
	countEqualInArray,
	getCurrentDateTime,
	getMaxInArray,
	getMinInArray,
	getNowTimeStamp,
	getSumOfArray,
	getRandomNumberInRange,
	getStringFromArray,
	getMultOfArray,
	numberWithSpaces,
	capitalizeFirstLetter,
	transchoice,
};
