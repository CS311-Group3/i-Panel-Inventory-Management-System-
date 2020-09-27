import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseCartComponent } from './purchase-cart.component';
import {Authority} from "app/shared/constants/authority.constants";

export const PURCHASE_CART_ROUTE: Route = {
  path: 'purchase-cart',
  component: PurchaseCartComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'purchase-cart.title'
  },
  canActivate: [UserRouteAccessService]
};
