import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchaseItems } from 'app/shared/model/purchase-items.model';

@Component({
  selector: 'jhi-purchase-items-detail',
  templateUrl: './purchase-items-detail.component.html',
})
export class PurchaseItemsDetailComponent implements OnInit {
  purchaseItems: IPurchaseItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchaseItems }) => (this.purchaseItems = purchaseItems));
  }

  previousState(): void {
    window.history.back();
  }
}
