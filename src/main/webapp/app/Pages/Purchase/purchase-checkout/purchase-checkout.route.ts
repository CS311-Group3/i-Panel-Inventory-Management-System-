import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseCheckoutComponent } from './purchase-checkout.component';
import {Authority} from "app/shared/constants/authority.constants";

export const PURCHASE_CHECKOUT_ROUTE: Route = {
  path: 'purchase-checkout',
  component: PurchaseCheckoutComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'purchase-checkout.title'
  },
  canActivate: [UserRouteAccessService]
};
