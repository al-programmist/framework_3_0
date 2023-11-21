// На входе - селектор каталога
export class HeaderCatalogTabs {
	constructor(name) {
		this.root = document.querySelector(name);
		this.categories = this.root.querySelectorAll('.js-category');
		this.tabs = this.root.querySelectorAll('.js-header-catalog-view');
		this.activeClass = 'js-active';

		this.init();
	}

	getTargetTabId(event) {
		const { target } = event;
		const $currentButton = target.closest('.js-category-button');

		if ($currentButton) {
			return target.closest('.js-category-button').dataset.target;
		}

		return this;
	}

	/* eslint-disable */

	getCurrentTabSelector(event) {
		const { target } = event;
		return target.closest('.js-category');
	}

	/* eslint-enable */

	getTargetPage(id) {
		return this.root.querySelector(`[data-page='${id}']`);
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

	switchTab(id, event) {
		if (id.length)	{
			const $targetTabCaption = this.getCurrentTabSelector(event);

			if ($targetTabCaption) {
				const $targetPage = this.getTargetPage(id);
				this.clearPages();
				$targetTabCaption.classList.add(this.activeClass);
				$targetPage.classList.add(this.activeClass);

				this.root.dispatchEvent(new CustomEvent('desktopTabCatalogChange', {
					bubbles: true,
					cancelable: true,
				}));
			}
		}
	}

	clickAction(event) {
		if (this.root) {
			const id = String(this.getTargetTabId(event)).trim();
			this.switchTab(id, event);
			return this;
		}

		return this;
	}

	init() {
		this.clickAction = this.clickAction.bind(this);
		document.addEventListener('click', this.clickAction);
	}

	destroy() {
		document.removeEventListener('click', this.clickAction);
	}
}
