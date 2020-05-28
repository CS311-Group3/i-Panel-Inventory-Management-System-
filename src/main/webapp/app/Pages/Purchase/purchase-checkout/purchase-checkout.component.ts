import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-purchase-checkout',
  templateUrl: './purchase-checkout.component.html',
  styleUrls: [
    'purchase-checkout.component.scss'
  ]
})
export class PurchaseCheckoutComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PurchaseCheckoutComponent message';
  }

  ngOnInit(): void {
  }

}
