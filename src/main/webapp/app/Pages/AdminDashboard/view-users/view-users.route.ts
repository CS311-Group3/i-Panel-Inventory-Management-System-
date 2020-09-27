import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ViewUsersComponent } from './view-users.component';
import {Authority} from "app/shared/constants/authority.constants";

export const VIEW_USERS_ROUTE: Route = {
  path: 'view-users',
  component: ViewUsersComponent,
  data: {
    authorities: [Authority.ADMIN],
    pageTitle: 'view-users.title'
  },
  canActivate: [UserRouteAccessService]
};
