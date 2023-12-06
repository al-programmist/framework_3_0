/**
 * Медиазапрос на Javascript
 * @param mediaQueryString
 * @param action
 * Usage:
 * media(`all and (min-width: 768px)`, () => {
 * 	... какой-то код
 * });
 */

export const media = (mediaQueryString, action) => {
	const handleMatchMedia = (mediaQuery) => {
		if (mediaQuery.matches) { // Попадает в запроc
			if (action && typeof (action) === 'function') {
				action();
			}
		}
	};

	const mql = window.matchMedia(mediaQueryString);
	handleMatchMedia(mql);
	mql.addListener(handleMatchMedia);
};

