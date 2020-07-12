import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReturnsCheckoutComponent } from './returns-checkout.component';

export const RETURNS_CHECKOUT_ROUTE: Route = {
  path: 'returns-checkout',
  component: ReturnsCheckoutComponent,
  data: {
    authorities: [],
    pageTitle: 'returns-checkout.title'
  },
  canActivate: [UserRouteAccessService]
};
