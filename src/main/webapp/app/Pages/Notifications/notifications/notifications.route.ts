import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { NotificationsComponent } from './notifications.component';
import {Authority} from "app/shared/constants/authority.constants";

export const NOTIFICATIONS_ROUTE: Route = {
  path: 'notifications',
  component: NotificationsComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: 'notifications.title'
  },
  canActivate: [UserRouteAccessService]
};
