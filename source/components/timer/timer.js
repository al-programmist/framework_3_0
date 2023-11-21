export class Timer {
	constructor(name) {
		this.root = name;
		this.time = this.root.dataset.time;
		this.countDown = null;
		this.hours = this.root.querySelector('.js-timer-hours');
		this.minutes = this.root.querySelector('.js-timer-minutes');
		this.seconds = this.root.querySelector('.js-timer-seconds');
		this.root && this.init();
	}

	getTimeSettings(time) {
		if (time) {
			const $time = time.split(':');
			const settings = {
				hours: $time[0],
				minutes: $time[1],
				seconds: $time[2],
			};

			return settings;
		}

		return this;
	}

	addTime(date, hours, minutes, seconds) {
		if (date) {
			// eslint-disable-next-line max-len
			date.setTime(date.getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000));
			return date;
		}
		return this;
	}

	set() {
		if (this.time) {
			const addedTime = this.getTimeSettings(this.time);
			// eslint-disable-next-line max-len
			this.countDown = this.addTime(new Date(), Number(addedTime.hours), Number(addedTime.minutes), Number(addedTime.seconds));

			this.hours.textContent = addedTime.hours;
			this.minutes.textContent = addedTime.minutes;
			this.seconds.textContent = addedTime.seconds;
		}

		return this;
	}

	/* eslint-disable */
	getTimeRemaining(endTime) {
		const time = Date.parse(endTime) - Date.parse(new Date());
		const seconds = Math.floor((time / 1000) % 60);
		const minutes = Math.floor((time / 1000 / 60) % 60);
		const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

		return {
			'total': time,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}
	/* eslint-enable */

	initClock(endTime) {
		const timeInterval = setInterval(() => {
			const time = this.getTimeRemaining(endTime);

			this.hours.textContent = (time.hours < 10) ? `0${time.hours}` : time.hours;
			this.minutes.textContent = (time.minutes < 10) ? `0${time.minutes}` : time.minutes;
			this.seconds.textContent = (time.seconds < 10) ? `0${time.seconds}` : time.seconds;

			if (time.total <= 0) {
				clearInterval(timeInterval);

				this.root.dispatchEvent(new CustomEvent('timerStop', {
					bubbles: true,
					cancelable: true,
				}));
			}
		}, 1000);
	}

	start() {
		const timeRemaining = this.countDown;
		this.initClock(timeRemaining);
	}

	init() {
		if (!this.root) return this;
		this.set();
		this.start();

		return this;
	}

	destroy() {
		return this;
	}
}
