import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CustomerDetailsComponent } from './customer-details.component';

export const CUSTOMER_DETAILS_ROUTE: Route = {
  path: 'customer-details',
  component: CustomerDetailsComponent,
  data: {
    authorities: [],
    pageTitle: 'customer-details.title'
  },
  canActivate: [UserRouteAccessService]
};
