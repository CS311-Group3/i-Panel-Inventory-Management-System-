import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReturnItems, ReturnItems } from 'app/shared/model/return-items.model';
import { ReturnItemsService } from './return-items.service';
import { ReturnItemsComponent } from './return-items.component';
import { ReturnItemsDetailComponent } from './return-items-detail.component';
import { ReturnItemsUpdateComponent } from './return-items-update.component';

@Injectable({ providedIn: 'root' })
export class ReturnItemsResolve implements Resolve<IReturnItems> {
  constructor(private service: ReturnItemsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReturnItems> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((returnItems: HttpResponse<ReturnItems>) => {
          if (returnItems.body) {
            return of(returnItems.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReturnItems());
  }
}

export const returnItemsRoute: Routes = [
  {
    path: '',
    component: ReturnItemsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReturnItemsDetailComponent,
    resolve: {
      returnItems: ReturnItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReturnItemsUpdateComponent,
    resolve: {
      returnItems: ReturnItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReturnItemsUpdateComponent,
    resolve: {
      returnItems: ReturnItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnItems',
    },
    canActivate: [UserRouteAccessService],
  },
];
