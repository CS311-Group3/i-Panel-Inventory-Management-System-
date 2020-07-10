import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalesItems } from 'app/shared/model/sales-items.model';

@Component({
  selector: 'jhi-sales-items-detail',
  templateUrl: './sales-items-detail.component.html',
})
export class SalesItemsDetailComponent implements OnInit {
  salesItems: ISalesItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ salesItems }) => (this.salesItems = salesItems));
  }

  previousState(): void {
    window.history.back();
  }
}
