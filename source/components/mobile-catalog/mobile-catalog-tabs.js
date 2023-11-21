export class MobileCatalogTabs {
	constructor(selector) {
		this.root = selector;
		this.categories = this.root.querySelectorAll('.js-mobile-category');
		this.tabs = this.root.querySelectorAll('.js-mobile-tab');
		this.backHandler = this.root.querySelector('.js-search-mobile-catalog--back');
		this.activeClass = 'js-active';
		this.tabsOpenClass = 'mobile-catalog--category-selected';

		this.root && this.categories && this.tabs && this.init();
	}

	clearPages() {
		this.categories.forEach((item) => {
			item.classList.remove(this.activeClass);
		});

		this.tabs.forEach((item) => {
			item.classList.remove(this.activeClass);
		});

		return this;
	}

	openTab(event) {
		const { target } = event;
		const $currentTabButton = target.closest('.js-mobile-category-button');
		const targetTabID = $currentTabButton.dataset.target;
		const targetPage = this.root.querySelector(`[data-page='${targetTabID}']`);
		event.preventDefault();
		event.stopPropagation();

		this.root.classList.add(this.tabsOpenClass);
		this.clearPages();
		targetPage.classList.add(this.activeClass);

		return this;
	}

	back(event) {
		event.preventDefault();
		event.stopPropagation();
		this.clearPages();
		this.root.classList.remove(this.tabsOpenClass);
	}

	init() {
		if (!this.root && !this.categories && !this.tabs) return this;
		this.openTab = this.openTab.bind(this);
		this.back = this.back.bind(this);
		this.categories.forEach((item) => {
			item.addEventListener('click', this.openTab);
		});

		this.backHandler.addEventListener('click', this.back);

		return this;
	}

	destroy() {
		this.categories.forEach((item) => {
			item.removeEventListener('click', this.openTab);
		});

		this.simpleBarReady = null;
		this.backHandler.removeEventListener('click', this.back);
		return this;
	}
}
