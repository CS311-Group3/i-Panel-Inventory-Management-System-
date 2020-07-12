import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SystemStatsComponent } from './system-stats.component';

export const SYSTEM_STATS_ROUTE: Route = {
  path: 'system-stats',
  component: SystemStatsComponent,
  data: {
    authorities: [],
    pageTitle: 'system-stats.title'
  },
  canActivate: [UserRouteAccessService]
};
