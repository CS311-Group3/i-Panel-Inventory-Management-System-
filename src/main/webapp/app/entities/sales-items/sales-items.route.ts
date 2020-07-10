import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISalesItems, SalesItems } from 'app/shared/model/sales-items.model';
import { SalesItemsService } from './sales-items.service';
import { SalesItemsComponent } from './sales-items.component';
import { SalesItemsDetailComponent } from './sales-items-detail.component';
import { SalesItemsUpdateComponent } from './sales-items-update.component';

@Injectable({ providedIn: 'root' })
export class SalesItemsResolve implements Resolve<ISalesItems> {
  constructor(private service: SalesItemsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISalesItems> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((salesItems: HttpResponse<SalesItems>) => {
          if (salesItems.body) {
            return of(salesItems.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SalesItems());
  }
}

export const salesItemsRoute: Routes = [
  {
    path: '',
    component: SalesItemsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SalesItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SalesItemsDetailComponent,
    resolve: {
      salesItems: SalesItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SalesItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SalesItemsUpdateComponent,
    resolve: {
      salesItems: SalesItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SalesItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SalesItemsUpdateComponent,
    resolve: {
      salesItems: SalesItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SalesItems',
    },
    canActivate: [UserRouteAccessService],
  },
];
