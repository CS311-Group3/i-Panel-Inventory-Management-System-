import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-sales-cart',
  templateUrl: './sales-cart.component.html',
  styleUrls: [
    'sales-cart.component.scss'
  ]
})
export class SalesCartComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'SalesCartComponent message';
  }

  ngOnInit(): void {
  }

}
