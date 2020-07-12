import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ReturnsMenuComponent } from './returns-menu.component';

export const RETURNS_MENU_ROUTE: Route = {
  path: 'returns-menu',
  component: ReturnsMenuComponent,
  data: {
    authorities: [],
    pageTitle: 'returns-menu.title'
  },
  canActivate: [UserRouteAccessService]
};
