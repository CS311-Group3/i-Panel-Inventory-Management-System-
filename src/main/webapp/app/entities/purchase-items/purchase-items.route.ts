import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchaseItems, PurchaseItems } from 'app/shared/model/purchase-items.model';
import { PurchaseItemsService } from './purchase-items.service';
import { PurchaseItemsComponent } from './purchase-items.component';
import { PurchaseItemsDetailComponent } from './purchase-items-detail.component';
import { PurchaseItemsUpdateComponent } from './purchase-items-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseItemsResolve implements Resolve<IPurchaseItems> {
  constructor(private service: PurchaseItemsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseItems> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchaseItems: HttpResponse<PurchaseItems>) => {
          if (purchaseItems.body) {
            return of(purchaseItems.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchaseItems());
  }
}

export const purchaseItemsRoute: Routes = [
  {
    path: '',
    component: PurchaseItemsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseItemsDetailComponent,
    resolve: {
      purchaseItems: PurchaseItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseItemsUpdateComponent,
    resolve: {
      purchaseItems: PurchaseItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseItems',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseItemsUpdateComponent,
    resolve: {
      purchaseItems: PurchaseItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PurchaseItems',
    },
    canActivate: [UserRouteAccessService],
  },
];
