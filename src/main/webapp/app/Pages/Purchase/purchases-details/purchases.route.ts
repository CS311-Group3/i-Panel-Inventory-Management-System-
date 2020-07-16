import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchases, Purchases } from 'app/shared/model/purchases.model';
import { PurchasesService } from './purchases.service';
import { PurchasesComponent } from './purchases.component';
import { PurchasesDetailComponent } from './purchases-detail.component';
import { PurchasesUpdateComponent } from './purchases-update.component';

@Injectable({ providedIn: 'root' })
export class PurchasesResolve implements Resolve<IPurchases> {
  constructor(private service: PurchasesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchases> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchases: HttpResponse<Purchases>) => {
          if (purchases.body) {
            return of(purchases.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Purchases());
  }
}

export const purchasesRoute: Routes = [
  {
    path: '',
    component: PurchasesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchasesDetailComponent,
    resolve: {
      purchases: PurchasesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchasesUpdateComponent,
    resolve: {
      purchases: PurchasesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchasesUpdateComponent,
    resolve: {
      purchases: PurchasesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Purchases',
    },
    canActivate: [UserRouteAccessService],
  },
];
