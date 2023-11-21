export class FieldAvatar {
	constructor($container, options = {}) {
		this.$container = $container;

		if (!this.$container) return;

		this.$container.fieldAvatar = this;

		this.size = options.size || 5242880;
		this.format = options.format || /\.(jpe?g|png|svg)$/i;

		this.avatarPreviewSelector = options.avatarPreviewSelector || '.js-field-avatar__preview';
		this.avatarImageSelector = options.avatarImageSelector || '.js-field-avatar__image';
		this.avatarFileSelector = options.avatarFileSelector || '.js-field-avatar__file';
		this.avatarRemoveSelector = options.avatarRemoveSelector || '.js-field-avatar__remove';

		this.init();
	}

	init() {
		this.$avatarPreviewList = Array.from(this.$container.querySelectorAll(this.avatarPreviewSelector));
		this.$avatarImageList = Array.from(this.$container.querySelectorAll(this.avatarImageSelector));
		this.$avatarFile = this.$container.querySelector(this.avatarFileSelector);
		this.$avatarRemove = this.$container.querySelector(this.avatarRemoveSelector);

		this.changeHandler = this.changeHandler.bind(this);
		this.$avatarFile.addEventListener('change', this.changeHandler);

		this.removeHandler = this.removeHandler.bind(this);
		this.$avatarRemove.addEventListener('click', this.removeHandler);
	}

	changeHandler(event) {
		if (!event.target.files.length) return;
		this.update(event.target.files[0]);
	}

	removeHandler() {
		this.remove();
	}

	update(file) {
		if (this.validate(file)) {
			this.append(file);
		} else {
			this.error();
		}
	}

	append(file) {
		const reader = new FileReader();

		reader.onload = (event) => {
			this.$avatarPreviewList.forEach((elemnt) => {
				elemnt.classList.remove('error');
				elemnt.classList.add('active');
			});
			this.$avatarImageList.forEach((elemnt) => elemnt.setAttribute('src', event.target.result));
		};

		reader.readAsDataURL(file);
	}

	remove() {
		this.$avatarFile.value = '';
		this.$avatarPreviewList.forEach((elemnt) => {
			elemnt.classList.remove('error');
			elemnt.classList.remove('active');
		});
	}

	validate(file) {
		return file.size < this.size && this.format.test(file.name);
	}

	error() {
		this.$avatarFile.value = '';
		this.$avatarPreviewList.forEach((elemnt) => {
			elemnt.classList.add('error');
		});
	}

	destroy() {
		this.$avatarFile.removeEventListener('change', this.changeHandler);
		this.$avatarRemove.removeEventListener('change', this.removeHandler);
	}
}
