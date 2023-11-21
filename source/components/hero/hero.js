import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export const heroBannerSlider = (container) => {
	new Swiper(container, {
		modules: [
			Pagination,
		],
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		pagination: {
			el: container.parentElement.querySelector('.js-swiper-pagination'),
			clickable: true,
		},
	});
};
