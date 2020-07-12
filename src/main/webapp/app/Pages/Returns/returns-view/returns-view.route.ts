import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReturnsViewComponent } from './returns-view.component';

export const RETURNS_VIEW_ROUTE: Route = {
  path: 'returns-view',
  component: ReturnsViewComponent,
  data: {
    authorities: [],
    pageTitle: 'returns-view.title'
  },
  canActivate: [UserRouteAccessService]
};
