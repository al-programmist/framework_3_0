/* eslint-disable */
/**
 * Следит за изменением класса на заданном селекторе, при изменении класса запускает коллбеки появления
 * и удаления класса
 *
 * Usage:
 * const telClassObserver = new ClassWatcher(tel, 'js-valid', this.#activateButton, this.#deactivateButton);
 */

export class ClassWatcher {
	#targetNode;
	#classToWatch;
	#classAddedCallback;
	#classRemovedCallback;
	#observer;
	#lastClassState;

	constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
		this.#targetNode = targetNode;
		this.#classToWatch = classToWatch;
		this.#classAddedCallback = classAddedCallback;
		this.#classRemovedCallback = classRemovedCallback;
		this.#observer = null;
		this.#lastClassState = targetNode.classList.contains(this.#classToWatch);
	}

	init = () => {
		this.observer = new MutationObserver(this.mutationCallback);
		this.observe();
	};

	observe = () => this.observer.observe(this.#targetNode, { attributes: true });

	disconnect = () => this.observer.disconnect();

	mutationCallback = (mutationsList) => {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
				const currentClassState = mutation.target.classList.contains(this.#classToWatch);
				if (this.lastClassState !== currentClassState) {
					this.lastClassState = currentClassState;
					if (currentClassState) this.#classAddedCallback();
					else this.#classRemovedCallback();
				}
			}
		});
	};
}
