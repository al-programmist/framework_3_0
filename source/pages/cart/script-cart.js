import { cartEmpty } from '../../components/cart-empty/cart-empty';
import { cartEmptyInput } from '../../components/cart-empty-input/cart-empty-input';
import { countersInit } from '../../components/counter/counter';
import { cartEmptyProductsInit } from '../../components/cart-empty-product/cart-empty-product';
import { sliderProducts } from '../../components/slider-products/slider-products';
import { cartProductsInit } from '../../components/cart-product/cart-product';
import { cartDetails } from '../../components/cart-details/cart-details';
import { cartLayout } from '../../components/cart-layout/cart-layout';
import { cartPanel } from '../../components/cart-panel/cart-panel';
import { modalCostEstimate } from '../../components/modal/modal-cost-estimate/modal-cost-estimate';

window.addEventListener('DOMContentLoaded', () => {
	cartEmpty.init();
	cartEmptyInput.init();
	countersInit();
	cartEmptyProductsInit();
	sliderProducts.init();
	cartProductsInit();
	cartDetails.init();
	cartLayout.init();
	cartPanel.init();
	modalCostEstimate.init();
});
