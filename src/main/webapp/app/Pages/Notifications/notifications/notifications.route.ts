import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { NotificationsComponent } from './notifications.component';

export const NOTIFICATIONS_ROUTE: Route = {
  path: 'notifications',
  component: NotificationsComponent,
  data: {
    authorities: [],
    pageTitle: 'notifications.title'
  },
  canActivate: [UserRouteAccessService]
};
