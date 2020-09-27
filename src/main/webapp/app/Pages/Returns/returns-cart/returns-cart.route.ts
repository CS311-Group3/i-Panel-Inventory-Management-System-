import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReturnsCartComponent } from './returns-cart.component';
import {Authority} from "app/shared/constants/authority.constants";

export const RETURNS_CART_ROUTE: Route = {
  path: 'returns-cart',
  component: ReturnsCartComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'returns-cart.title'
  },
  canActivate: [UserRouteAccessService]
};
