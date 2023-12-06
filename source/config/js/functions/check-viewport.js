import { config } from '../_config';
const { breakpoint } = config;

export const isMobile = () => {
	if (window.innerWidth < breakpoint.tablet) {
		return true;
	}

	return false;
};

export const isTablet = () => {
	if (window.innerWidth >= breakpoint.tablet && window.innerWidth < breakpoint.laptop) {
		return true;
	}

	return false;
};

export const isLaptop = () => {
	if (window.innerWidth >= breakpoint.laptop && window.innerWidth < breakpoint.semi) {
		return true;
	}

	return false;
};

export const isSemi = () => {
	if (window.innerWidth >= breakpoint.semi && window.innerWidth < breakpoint.desktop) {
		return true;
	}

	return false;
};

export const isDesktop = () => {
	if (window.innerWidth >= breakpoint.desktop && window.innerWidth <= breakpoint.large) {
		return true;
	}

	return false;
};

export const isFHD = () => {
	if (window.innerWidth > breakpoint.large) {
		return true;
	}

	return false;
};
