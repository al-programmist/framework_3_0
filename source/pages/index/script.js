import { Header } from '../../components/header/header';
import { Modal } from '../../components/modal/modal';
import { Lazy } from '../../components/lazy/lazy';
import { SearchDesktop } from '../../components/search-panel/search-panel';
import { SearchMobile } from '../../components/mobile-search/mobile-search';
import { BurgerMenu } from '../../components/burger/burger';
import { HeaderCounterWidget } from '../../components/header-counter-widget/header-counter-widget';
import { HeaderCatalogDesktop } from '../../components/header-catalog/header-catalog';
import { MobileNavigation } from '../../components/mobile-navigation/mobile-navigation';
import { MobileCatalog } from '../../components/mobile-catalog/mobile-catalog';
import { Card } from '../../components/card/card';
import { TabsGeneric } from '../../components/tabs/tabs-generic';
import { Field } from '../../components/field/field';
import { ModalCity } from '../../components/modal/modal-city/modal-city';
import { Form } from '../../components/form/form';
import { media } from '../../config/js/match-media';
import { Cookie } from '../../components/cookie/cookie';
import { ModalCookies } from '../../components/modal/modal-cookies/modal-cookies';

window.app = {};

window.app.media = media;

window.app.modal = new Modal();
window.app.headerCounterWidget = HeaderCounterWidget;
window.app.lazy = Lazy;
window.app.card = Card;
window.app.field = Field;
window.app.form = Form;
window.app.cookie = Cookie;
window.app.tabsGeneric = TabsGeneric;
window.app.searchDesktop = new SearchDesktop();
window.app.searchMobile = new SearchMobile();
window.app.burgerMenu = new BurgerMenu();
window.app.headerCatalogDesktop = new HeaderCatalogDesktop();
window.app.mobileNavigation = new MobileNavigation();
window.app.mobileCatalog = new MobileCatalog();
window.app.modalCity = new ModalCity();
window.app.header = new Header();
window.app.modalCookies = new ModalCookies();

window.addEventListener('DOMContentLoaded', () => {
	document.body.querySelectorAll('.js-cookie')
		.forEach((item) => {
			new Cookie(item);
		});

	document.querySelectorAll('.lazy [data-src]')
		.forEach((item) => {
			new Lazy(item);
		});

	document.querySelectorAll('.card')
		.forEach((item) => {
			new Card(item);
		});

	document.querySelectorAll('.js-header-counter-widget')
		.forEach((item) => {
			new HeaderCounterWidget(item);
		});

	document.querySelectorAll('.js-tabs')
		.forEach((item) => {
			new TabsGeneric(item);
		});

	document.querySelectorAll('.js-field')
		.forEach((item) => {
			new Field(item);
		});

	document.querySelectorAll('.js-form')
		.forEach((item) => {
			new Form(item);
		});

	document.addEventListener('modalOpen', () => {
		window.app.burgerMenu.close();
		window.app.searchMobile.close();
		window.app.headerCatalogDesktop.close();
		window.app.mobileCatalog.close();
	});

	document.addEventListener('modalClose', () => {
		window.app.burgerMenu.close();
		window.app.searchMobile.close();
		window.app.headerCatalogDesktop.close();
		window.app.mobileCatalog.close();
	});

	document.addEventListener('mobileSearchOpen', () => {
		window.app.burgerMenu.close();
		window.app.modal.close();
		window.app.headerCatalogDesktop.close();
		window.app.mobileCatalog.close();
	});

	document.addEventListener('burgerOpen', () => {
		window.app.modal.close();
		window.app.searchMobile.close();
		window.app.headerCatalogDesktop.close();
		window.app.mobileCatalog.close();
	});
});
