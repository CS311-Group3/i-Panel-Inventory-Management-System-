import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseViewComponent } from './purchase-view.component';

export const PURCHASE_VIEW_ROUTE: Route = {
  path: 'purchase-view',
  component: PurchaseViewComponent,
  data: {
    authorities: [],
    pageTitle: 'purchase-view.title'
  },
  canActivate: [UserRouteAccessService]
};
