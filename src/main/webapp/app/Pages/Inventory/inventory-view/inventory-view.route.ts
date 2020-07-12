import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { InventoryViewComponent } from './inventory-view.component';

export const INVENTORY_VIEW_ROUTE: Route = {
  path: 'inventory-view',
  component: InventoryViewComponent,
  data: {
    authorities: [],
    pageTitle: 'inventory-view.title'
  },
  canActivate: [UserRouteAccessService]
};
