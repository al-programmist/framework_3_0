/* eslint-disable */

export const media = (mediaQueryString, action) => {
	const handleMatchMedia = (mediaQuery) => {
		if (mediaQuery.matches) { // Попадает в запроc
			if (action && typeof (action) === 'function') {
				action();
			}
		}
	};

	const mql = window.matchMedia(mediaQueryString); // стандартный медиазапрос для смены режима просмотра
	handleMatchMedia(mql);
	mql.addListener(handleMatchMedia);
};
