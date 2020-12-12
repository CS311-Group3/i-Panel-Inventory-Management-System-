import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SalesCheckoutComponent } from './sales-checkout.component';
import {Authority} from "app/shared/constants/authority.constants";
import {SALES} from "app/Pages/pageTitles";

export const SALES_CHECKOUT_ROUTE: Route = {
  path: 'sales-checkout',
  component: SalesCheckoutComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: SALES
  },
  canActivate: [UserRouteAccessService]
};
