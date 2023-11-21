export class TabsGeneric {
	constructor(selector) {
		this.root = selector;
		this.captions = this.root.querySelectorAll('.js-tabs-caption');
		this.tabs = this.root.querySelectorAll('.js-tabs-page');
		this.activeClass = 'js-active';

		this.root && this.tabs && this.captions && this.init();
	}

	clearPages() {
		this.captions.forEach((item) => {
			item.classList.remove(this.activeClass);
		});

		this.tabs.forEach((item) => {
			item.classList.remove(this.activeClass);
		});

		return this;
	}

	openTab(event) {
		const { target } = event;
		const $currentTabButton = target.closest('.js-tabs-caption');
		const targetTabID = $currentTabButton.dataset.target;
		const targetPage = this.root.querySelector(`[data-page='${targetTabID}']`);

		event.preventDefault();
		this.clearPages();
		targetPage.classList.add(this.activeClass);
		$currentTabButton.classList.add(this.activeClass);

		return this;
	}

	init() {
		if (!this.root && !this.tabs && !this.captions) return this;
		this.openTab = this.openTab.bind(this);
		this.captions.forEach((item) => {
			item.addEventListener('click', this.openTab);
		});

		return this;
	}

	destroy() {
		this.captions.forEach((item) => {
			item.removeEventListener('click', this.openTab);
		});
		return this;
	}
}
