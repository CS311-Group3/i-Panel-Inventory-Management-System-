import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-sales-customer-details',
  templateUrl: './sales-customer-details.component.html',
  styleUrls: [
    'sales-customer-details.component.scss'
  ]
})
export class SalesCustomerDetailsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'SalesCustomerDetailsComponent message';
  }

  ngOnInit(): void {
  }

}
