import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-sales-checkout',
  templateUrl: './sales-checkout.component.html',
  styleUrls: [
    'sales-checkout.component.scss'
  ]
})
export class SalesCheckoutComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'SalesCheckoutComponent message';
  }

  ngOnInit(): void {
  }

}
