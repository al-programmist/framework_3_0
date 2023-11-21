export class Microfield {
	constructor(name) {
		this.root = name;
		this.input = this.root.querySelector('input');
		this.isStart = this.input.classList.contains('js--start');
		this.isEnd = this.input.classList.contains('js--end');
		this.index = this.input.dataset.index;
		this.value = null;
		this.data = null;
		this.root && this.init();
	}

	getMicrofieldData() {
		if (this.root) {
			this.data = {
				input: this.input,
				isStart: this.isStart,
				isEnd: this.isEnd,
				index: this.index,
				value: this.value,
			};

			return this.data;
		}

		return this;
	}

	/**
	 * Здесь проверяем начало и конец строки. По этим событиям начинается и заканчивается сборка
	 * кода из интерфейса пользователя
	 * @param event
	 */

	microfieldKeyUpHandler(event) {
		event.preventDefault();
		const keyCode = event.code;
		this.value = this.input.value;

		if (keyCode === 'ArrowLeft') {
			this.input.blur();
			this.root.dispatchEvent(new CustomEvent('codeConstructionGotoPrev', {
				bubbles: true,
				cancelable: true,
				detail: {
					index: this.index,
					next: (!this.isStart) ? Number(this.index) - 1 : 0,
					value: this.value,
				},
			}));
		}

		if (keyCode === 'ArrowRight' && this.value.length) {
			this.input.blur();
			this.root.dispatchEvent(new CustomEvent('codeConstructionGotoNext', {
				bubbles: true,
				cancelable: true,
				detail: {
					index: this.index,
					next: (!this.isEnd) ? Number(this.index) + 1 : Number(this.index),
					value: this.value,
				},
			}));
		}

		if (keyCode === 'Backspace' && !this.value.length) {
			this.input.blur();
			this.root.dispatchEvent(new CustomEvent('codeConstructionBackspaceClearField', {
				bubbles: true,
				cancelable: true,
				detail: {
					index: this.index,
					next: (!this.isStart) ? Number(this.index) - 1 : 0,
					value: this.value,
				},
			}));
		}

		if (keyCode !== 'Backspace' && keyCode !== 'ArrowLeft' && keyCode !== 'ArrowRight' && keyCode !== 'ArrowUp' && keyCode !== 'ArrowDown' && keyCode !== 'Tab' && keyCode !== 'Escape') {
			if (this.value.length) {
				this.input.blur();
			}

			this.getMicrofieldData();

			if (this.isStart) {
				this.root.dispatchEvent(new CustomEvent('codeConstructionStart', {
					bubbles: true,
					cancelable: true,
					detail: {
						start: true,
						index: this.index,
						next: Number(this.index) + 1,
						value: this.value,
					},
				}));
			}

			if (this.isEnd) {
				this.root.dispatchEvent(new CustomEvent('codeConstructionComplete', {
					bubbles: true,
					cancelable: true,
					detail: {
						end: true,
						prev: Number(this.index) - 1,
						index: this.index,
						value: this.value,
					},
				}));
			}

			if (!this.isStart && !this.isEnd) {
				this.root.dispatchEvent(new CustomEvent('codeConstructionProgress', {
					bubbles: true,
					cancelable: true,
					detail: {
						prev: Number(this.index) - 1,
						next: Number(this.index) + 1,
						index: this.index,
						value: this.value,
					},
				}));
			}
		}
	}

	setMicrofieldKeyUp() {
		this.microfieldKeyUpHandler = this.microfieldKeyUpHandler.bind(this);
		this.input.addEventListener('keyup', this.microfieldKeyUpHandler);
	}

	clear() {
		this.input.value = '';
		this.input.disabled = false;
		this.input.readOnly = false;
		this.input.classList.remove('js-invalid');
		return this;
	}

	inValidate() {
		this.input.classList.add('js-invalid');
		return this;
	}

	init() {
		if (!this.root) return this;

		this.setMicrofieldKeyUp();
		return this;
	}

	destroy() {
		this.input.value = '';
		this.input.disabled = false;
		this.input.readOnly = false;
		this.input.removeEventListener('keyup', this.setMicrofieldKeyUp);
		return this;
	}
}
