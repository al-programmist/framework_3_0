/* eslint-disable */
import { config } from './config';

const { breakpoints } = config;

class MatchMedia {
	#media = {};
	#onChangeHandlers = {};
	#sizes = breakpoints;

	#setMedia = () => {
		Object.entries(this.#sizes).forEach((size) => {
			this.#media[size[0]] = {
				min: window.matchMedia(`(min-width: ${size[1]}px)`),
				max: window.matchMedia(`(max-width: ${size[1] - 1}px)`),
			};
			this.#onChangeHandlers[size[0]] = {
				min: [],
				max: [],
			};
		});
	};

	min = (size) => this.#media[size].min.matches;

	max = (size) => this.#media[size].max.matches;

	addChangeListener = (type, size, func) => this.#onChangeHandlers[size][type].push(func);

	#setListener = (size, type) => this.#onChangeHandlers[size][type].forEach((handler) => {
		if (this.#media[size][type].matches) handler();
	});

	init = () => {
		this.#setMedia();
		Object.keys(this.#sizes).forEach((size) => {
			this.#onChangeHandlers[size] = {
				min: [],
				max: [],
			};
		});
		Object.entries(this.#media).forEach((media) => {
			media[1].min.addEventListener('change', () => this.#setListener(media[0], 'min'));
			media[1].max.addEventListener('change', () => this.#setListener(media[0], 'max'));
		});
	};
}

export const media = new MatchMedia();
