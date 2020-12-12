import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PurchaseMenuComponent } from './purchase-menu.component';
import {Authority} from "app/shared/constants/authority.constants";
import {PURCHASE_STOCKS} from "app/Pages/pageTitles";

export const PURCHASE_MENU_ROUTE: Route = {
  path: 'purchase-menu',
  component: PurchaseMenuComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: PURCHASE_STOCKS
  },
  canActivate: [UserRouteAccessService]
};
