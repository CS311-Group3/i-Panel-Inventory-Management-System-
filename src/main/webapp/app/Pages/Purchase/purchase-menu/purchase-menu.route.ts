import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseMenuComponent } from './purchase-menu.component';
import {Authority} from "app/shared/constants/authority.constants";

export const PURCHASE_MENU_ROUTE: Route = {
  path: 'purchase-menu',
  component: PurchaseMenuComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'purchase-menu.title'
  },
  canActivate: [UserRouteAccessService]
};
