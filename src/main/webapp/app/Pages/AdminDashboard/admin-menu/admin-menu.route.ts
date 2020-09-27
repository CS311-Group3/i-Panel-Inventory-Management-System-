import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { AdminMenuComponent } from './admin-menu.component';
import {Authority} from "app/shared/constants/authority.constants";

export const ADMIN_MENU_ROUTE: Route = {
  path: 'admin-menu',
  component: AdminMenuComponent,
  data: {
    authorities: [Authority.ADMIN],
    pageTitle: 'admin-menu.title'
  },
  canActivate: [UserRouteAccessService]
};
