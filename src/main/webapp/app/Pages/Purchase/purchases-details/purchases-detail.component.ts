import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchases } from 'app/shared/model/purchases.model';
import {IPurchaseItems} from "app/shared/model/purchase-items.model";
import {HttpResponse} from "@angular/common/http";
import {PurchaseItemsService} from "app/entities/purchase-items/purchase-items.service";

@Component({
  selector: 'jhi-purchases-detail',
  templateUrl: './purchases-detail.component.html',
})
export class PurchasesDetailComponent implements OnInit {
  purchases: IPurchases | null = null;
  cartItem?: IPurchaseItems[];

  constructor(protected activatedRoute: ActivatedRoute,protected purchaseItemsService: PurchaseItemsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchases }) => (this.purchases = purchases));
    this.getItemsByCode(this.purchases?.id);
  }

  getItemsByCode(code:any):void{
    this.purchaseItemsService.getByPurchaseCode(code).subscribe((res: HttpResponse<IPurchaseItems[]>) => (this.cartItem = res.body || []));
  }



  previousState(): void {
    window.history.back();
  }
}
