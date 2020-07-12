import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseMenuComponent } from './purchase-menu.component';

export const PURCHASE_MENU_ROUTE: Route = {
  path: 'purchase-menu',
  component: PurchaseMenuComponent,
  data: {
    authorities: [],
    pageTitle: 'purchase-menu.title'
  },
  canActivate: [UserRouteAccessService]
};
