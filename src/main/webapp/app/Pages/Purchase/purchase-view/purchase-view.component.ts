import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: [
    'purchase-view.component.scss'
  ]
})
export class PurchaseViewComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PurchaseViewComponent message';
  }

  ngOnInit(): void {
  }

}
