import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReturnsCheckoutComponent } from './returns-checkout.component';
import {Authority} from "app/shared/constants/authority.constants";

export const RETURNS_CHECKOUT_ROUTE: Route = {
  path: 'returns-checkout',
  component: ReturnsCheckoutComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'returns-checkout.title'
  },
  canActivate: [UserRouteAccessService]
};
