import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseCheckoutComponent } from './purchase-checkout.component';

export const PURCHASE_CHECKOUT_ROUTE: Route = {
  path: 'purchase-checkout',
  component: PurchaseCheckoutComponent,
  data: {
    authorities: [],
    pageTitle: 'purchase-checkout.title'
  },
  canActivate: [UserRouteAccessService]
};
