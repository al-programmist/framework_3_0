import { sliderProducts } from '../../components/slider-products/slider-products';
import { orderPlaced } from '../../components/order-placed/order-placed';

window.addEventListener('DOMContentLoaded', () => {
	sliderProducts.init();
	orderPlaced.init();
});
