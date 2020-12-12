import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReturnsCheckoutComponent } from './returns-checkout.component';
import {Authority} from "app/shared/constants/authority.constants";
import {RETURNS} from "app/Pages/pageTitles";

export const RETURNS_CHECKOUT_ROUTE: Route = {
  path: 'returns-checkout',
  component: ReturnsCheckoutComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: RETURNS
  },
  canActivate: [UserRouteAccessService]
};
