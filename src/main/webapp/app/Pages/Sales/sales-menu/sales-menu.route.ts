import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SalesMenuComponent } from './sales-menu.component';
import {Authority} from "app/shared/constants/authority.constants";
import {SALES} from "app/Pages/pageTitles";

export const SALES_MENU_ROUTE: Route = {
  path: 'sales-menu',
  component: SalesMenuComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: SALES
  },
  canActivate: [UserRouteAccessService]
};
