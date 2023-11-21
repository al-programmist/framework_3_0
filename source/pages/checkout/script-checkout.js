import { checkoutAddress } from '../../components/checkout-address/checkout-address';
import { checkoutDeliveriesInit } from '../../components/checkout-delivery/checkout-delivery';
import { checkoutBuyersInit } from '../../components/checkout-buyer/checkout-buyer';
import { checkoutLayout } from '../../components/checkout-layout/checkout-layout';
import { checkoutPaymentsInit } from '../../components/checkout-payment/checkout-payment';
import { checkoutComment } from '../../components/checkout-comment/checkout-comment';
import { checkoutDetails } from '../../components/checkout-details/checkout-details';
import { checkoutPickup } from '../../components/checkout-pickup/checkout-pickup';

window.addEventListener('DOMContentLoaded', () => {
	checkoutAddress.init();
	checkoutDeliveriesInit();
	checkoutBuyersInit();
	checkoutPaymentsInit();
	checkoutComment.init();
	checkoutLayout.init();
	checkoutDetails.init();
	checkoutPickup.init();
});
