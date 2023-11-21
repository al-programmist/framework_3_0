import { Timer } from '../timer/timer';

export class TimerPanel {
	constructor(form) {
		this.form = form;
		this.root = form.querySelector('.js-timer-panel');
		this.controls = this.root.querySelectorAll('.js-timer');
		this.restartControl = this.root.querySelector('.js-timer--restart');
		this.successIndicator = this.root.querySelector('.js-timer--success');
		this.pendingIndicator = this.root.querySelector('.js-timer--pending');
		this.timerCaption = this.root.querySelector('.js-timer-caption');
		this.timer = null;

		this.time = this.timerCaption;
		this.form && this.init();
	}

	restartHandler(event) {
		this.restartControl.classList.remove('js-active');
		this.successIndicator.classList.add('js-active');

		setTimeout(() => {
			this.successIndicator.classList.remove('js-active');
			this.pendingIndicator.classList.add('js-active');
		}, 1500);

		event.preventDefault();
		if (!this.timer) {
			this.timer = new Timer(this.timerCaption);
			return this;
		}
		this.timer.set();
		this.timer.start();
		this.root.dispatchEvent(new CustomEvent('codeResend', {
			bubbles: true,
			cancelable: true,
		}));
		return this;
	}

	onStopTimer() {
		this.restartControl.classList.add('js-active');
		this.successIndicator.classList.remove('js-active');
		this.pendingIndicator.classList.remove('js-active');
	}

	init() {
		if (!this.root) return this;
		if (!this.timer) {
			this.timer = new Timer(this.timerCaption);
			this.restartControl.classList.remove('js-active');
			this.successIndicator.classList.remove('js-active');
			this.pendingIndicator.classList.add('js-active');
		}

		this.restartHandler = this.restartHandler.bind(this);
		this.onStopTimer = this.onStopTimer.bind(this);
		this.restartControl.addEventListener('click', this.restartHandler);
		document.body.addEventListener('timerStop', this.onStopTimer);

		return this;
	}

	destroy() {
		if (this.timer) this.timer.destroy();
		this.restartControl.removeEventListener('click', this.restartHandler);
		document.body.removeEventListener('timerStop', this.onStopTimer);
		return this;
	}
}
