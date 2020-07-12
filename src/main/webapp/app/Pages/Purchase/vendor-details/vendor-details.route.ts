import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { VendorDetailsComponent } from './vendor-details.component';

export const VENDOR_DETAILS_ROUTE: Route = {
  path: 'vendor-details',
  component: VendorDetailsComponent,
  data: {
    authorities: [],
    pageTitle: 'vendor-details.title'
  },
  canActivate: [UserRouteAccessService]
};
