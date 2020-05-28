import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SalesCustomerDetailsComponent } from './sales-customer-details.component';

export const SALES_CUSTOMER-DETAILS_ROUTE: Route = {
  path: 'sales-customer-details',
  component: SalesCustomerDetailsComponent,
  data: {
    authorities: [],
    pageTitle: 'sales-customer-details.title'
  },
  canActivate: [UserRouteAccessService]
};
