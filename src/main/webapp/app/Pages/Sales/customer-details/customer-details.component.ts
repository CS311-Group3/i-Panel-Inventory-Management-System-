import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: [
    'customer-details.component.scss'
  ]
})
export class CustomerDetailsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'CustomerDetailsComponent message';
  }

  ngOnInit(): void {
  }

}
