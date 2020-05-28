import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { LoginPageComponent } from './login-page.component';

export const LOGIN_PAGE_ROUTE: Route = {
  path: 'login-page',
  component: LoginPageComponent,
  data: {
    authorities: [],
    pageTitle: 'login-page.title'
  },
  canActivate: [UserRouteAccessService]
};
