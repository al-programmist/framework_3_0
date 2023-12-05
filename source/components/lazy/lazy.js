export class Lazy {
	constructor(image) {
		this.image = image;
		this.imgOptions = {};
		this.imgObserver;

		this.image && this.init();
	}

	init() {
		this.observer();
		this.imgObserver.observe(this.image);
	}

	observer() {
		this.imgObserver = new IntersectionObserver((entries, imgObserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.preloadImage(entry.target);
					imgObserver.unobserve(entry.target);
				}
			});
		}, this.imgOptions);
	}

	preloadImage(img) {
		this.checkPic(img);
	}

	// eslint-disable-next-line class-methods-use-this
	checkPic(img) {
		const src = img.getAttribute('data-src');
		if (src) {
			// eslint-disable-next-line no-param-reassign
			img.src = src;
			img.removeAttribute('data-src');
		}

		const picture = img.closest('picture');
		if (picture) {
			const sources = picture.querySelectorAll('source');
			if (sources.length) {
				sources.forEach((source) => {
					const srcset = source.getAttribute('data-srcset');
					if (srcset) {
						// eslint-disable-next-line no-param-reassign
						source.srcset = srcset;
						source.removeAttribute('data-srcset');
					}
				});
			}
			// picture.classList.remove('lazy');
		}
	}
}
