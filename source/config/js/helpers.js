export const isHasSupported = () => {
	try {
		document.querySelector('body:has(main)');
		return true;
	} catch (error) {
		return false;
	}
};

export const numberWithSpaces = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const touchInput = (input) => new Promise((done) => {
	input.dispatchEvent(new Event('focus'));
	done();
})
	.then(() => {
		input.dispatchEvent(new Event('input'));
		input.dispatchEvent(new Event('blur'));
	});
