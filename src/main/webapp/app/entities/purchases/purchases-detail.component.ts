import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchases } from 'app/shared/model/purchases.model';

@Component({
  selector: 'jhi-purchases-detail',
  templateUrl: './purchases-detail.component.html',
})
export class PurchasesDetailComponent implements OnInit {
  purchases: IPurchases | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchases }) => (this.purchases = purchases));
  }

  previousState(): void {
    window.history.back();
  }
}
