/**
 * Поддержка псевдокласса :has
 * @returns {boolean}
 */
export const isHasSupported = () => {
	try {
		document.querySelector('body:has(main)');

		return true;
	} catch (error) {
		return false;
	}
};
