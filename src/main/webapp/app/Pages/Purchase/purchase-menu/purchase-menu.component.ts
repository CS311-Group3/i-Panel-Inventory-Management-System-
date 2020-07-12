import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: [
    'purchase-menu.component.scss'
  ]
})
export class PurchaseMenuComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'PurchaseMenuComponent message';
  }

  ngOnInit(): void {
  }

}
