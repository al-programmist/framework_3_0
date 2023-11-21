export const debounce = (callback, timeout = 300) => {
	let timer;
	return (...args) => {
		if (!timer) {
			callback.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined;
		}, timeout);
	};
};
