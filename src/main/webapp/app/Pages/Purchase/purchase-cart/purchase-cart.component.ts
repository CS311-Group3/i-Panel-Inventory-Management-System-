import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: [
    'purchase-cart.component.scss'
  ]
})
export class PurchaseCartComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PurchaseCartComponent message';
  }

  ngOnInit(): void {
  }

}
