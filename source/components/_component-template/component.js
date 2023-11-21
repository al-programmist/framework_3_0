/* eslint-disable */
export class Component {
	constructor(name) {
		this.root = name;
		this.root && this.init();
	}

	init() {
		console.log(`init ${this.root}`);
		if (!this.root) return this;
		return this;
	}

	destroy() {
		return this;
	}
}
