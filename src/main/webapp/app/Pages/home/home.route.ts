import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import {Authority} from "app/shared/constants/authority.constants";
import {HOME} from '../pageTitles'
export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    authorities: [Authority.USER],
    pageTitle: HOME
  }
};
