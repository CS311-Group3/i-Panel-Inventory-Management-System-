import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReturnItems } from 'app/shared/model/return-items.model';

@Component({
  selector: 'jhi-return-items-detail',
  templateUrl: './return-items-detail.component.html',
})
export class ReturnItemsDetailComponent implements OnInit {
  returnItems: IReturnItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ returnItems }) => (this.returnItems = returnItems));
  }

  previousState(): void {
    window.history.back();
  }
}
