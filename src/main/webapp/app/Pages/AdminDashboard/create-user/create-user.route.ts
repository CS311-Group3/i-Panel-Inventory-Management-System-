import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CreateUserComponent } from './create-user.component';

export const CREATE_USER_ROUTE: Route = {
  path: 'create-user',
  component: CreateUserComponent,
  data: {
    authorities: [],
    pageTitle: 'create-user.title'
  },
  canActivate: [UserRouteAccessService]
};
