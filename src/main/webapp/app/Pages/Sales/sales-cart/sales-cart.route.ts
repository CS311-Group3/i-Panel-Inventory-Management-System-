import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SalesCartComponent } from './sales-cart.component';
import {Authority} from "app/shared/constants/authority.constants";

export const SALES_CART_ROUTE: Route = {
  path: 'sales-cart',
  component: SalesCartComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'sales-cart.title'
  },
  canActivate: [UserRouteAccessService]
};
