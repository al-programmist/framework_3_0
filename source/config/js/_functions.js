// Определение ширины экрана
import { isMobile, isTablet, isLaptop, isSemi, isDesktop, isFHD } from './functions/check-viewport';

if (isMobile()) {
	console.log('mobile');
}

if (isTablet()) {
	console.log('tablet');
}

if (isLaptop()) {
	console.log('laptop');
}

if (isSemi()) {
	console.log('semi');
}

if (isDesktop()) {
	console.log('desktop');
}

if (isFHD()) {
	console.log('fhd');
}
