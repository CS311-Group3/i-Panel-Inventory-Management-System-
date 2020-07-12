import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ViewUsersComponent } from './view-users.component';

export const VIEW_USERS_ROUTE: Route = {
  path: 'view-users',
  component: ViewUsersComponent,
  data: {
    authorities: [],
    pageTitle: 'view-users.title'
  },
  canActivate: [UserRouteAccessService]
};
