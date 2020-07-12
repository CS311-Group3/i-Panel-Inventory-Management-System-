import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SalesViewComponent } from './sales-view.component';

export const SALES_VIEW_ROUTE: Route = {
  path: 'sales-view',
  component: SalesViewComponent,
  data: {
    authorities: [],
    pageTitle: 'sales-view.title'
  },
  canActivate: [UserRouteAccessService]
};
