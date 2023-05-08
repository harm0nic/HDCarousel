class HDCarousel {
	version = 0.1;
	el = null; // element housing the carousel
	items = []; // array of carousel items
	size = 3; // total items to display
	activeClass = false; // if middle item should get an active class
	gap = 22; // margin/gap in px
	width = 0;

	constructor(el, settings = {}) {
		console.log("HDCarousel v" + this.version + " init");

		if (settings !== {}) {
			if (settings.gap) {
				this.gap = parseInt(settings.gap);
			}
			if (settings.size) {
				this.size = parseInt(settings.size);
			}
			if (settings.activeClass) {
				this.activeClass = true;
			}
		}
		this.el = el;

		this.init();
	}

	async init() {
		await this.createMarkup();

		// set nav listeners
		const nav = this.el.parentElement.getElementsByClassName("hdcarousel_nav_item");
		for (let i = 0; i < nav.length; i++) {
			nav[i].addEventListener("click", () => this.move(nav[i]));
		}

		await this.setMinItems();

		this.width = await this.getSize();
		this.el.style.height = await this.getHeight();

		await this.clone("prev");
		await this.build();
	}

	async createMarkup() {
		const nav = `<div class="hdcarousel_nav"><div class="hdcarousel_nav_item" aria-role="button" data-dir="prev">&#xab;</div><div class="hdcarousel_nav_item" aria-role="button" data-dir="next">&#xbb;</div></div>`;

		// create new element
		let wrapper = document.createElement("div");
		wrapper.classList.add("hdcarousel_wrapper");

		// clone carousel and insert into the wrapper
		let carousel = this.el.cloneNode(true);
		wrapper.insertAdjacentElement("afterbegin", carousel);
		wrapper.insertAdjacentHTML("beforeend", nav);

		// add the new wrapper before the old carousel
		this.el.insertAdjacentElement("beforebegin", wrapper);

		// remove the old carousel and reset the variables
		this.el.remove();
		this.el = wrapper.firstChild;
		this.el.classList.add("hdcarousel");
		console.log(this.el);

		this.items = this.el.getElementsByClassName("hdcarousel_item");
	}

	async setMinItems() {
		const minItems = this.size + 2;
		if (this.items.length < minItems) {
			let itemsLength = this.items.length;
			for (let i = 0; i < itemsLength; i++) {
				let c = this.items[i].cloneNode(true);
				this.el.append(c);
			}
		}

		if (this.items.length < minItems) {
			await this.setMinItems();
		}
	}

	async getSize() {
		let w = this.el.clientWidth;
		w = w / this.size - this.gap;
		return w;
	}

	async getHeight() {
		let h = this.items[0].clientHeight;

		// check if another item is higher
		for (let i = 0; i < this.items.length; i++) {
			let item_h = this.items[i].clientHeight;
			if (item_h > h) {
				h = item_h;
			}
		}
		return h + "px";
	}

	async build() {
		let l = this.width * -1;
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].style.width = this.width + "px";
			this.items[i].style.left = l + "px";
			l = l + this.width;
			if (i > 0) {
				let g = this.gap / this.size;
				l = l + this.gap + g;
			}
		}

		if (this.activeClass) {
			this.setActive();
		}
	}

	async clone(pos = "next") {
		let item = null;
		if (pos === "next") {
			item = this.items[0];
		} else {
			item = this.items[this.items.length - 1];
		}

		let c = item.cloneNode(true);

		if (pos === "next") {
			this.el.append(c);
		} else {
			this.el.prepend(c);
		}

		item.remove();
	}

	async move(el) {
		let pos = el.getAttribute("data-dir");
		if (pos === "next") {
			this.next();
		} else {
			this.prev();
		}
	}

	async next() {
		await this.clone("next");
		await this.build();
	}

	async prev() {
		await this.clone("prev");
		await this.build();
	}

	setActive() {
		let m = Math.round(this.size / 2);
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].classList.remove("hdcarousel_item_active");
			if (i === m) {
				this.items[i].classList.add("hdcarousel_item_active");
			}
		}
	}
}

const el = document.getElementById("like_and_subscribe");
new HDCarousel(el, { activeClass: true });
