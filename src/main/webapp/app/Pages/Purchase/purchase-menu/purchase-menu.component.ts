import {Component, OnInit} from '@angular/core';
import {ROUTES} from "app/Constants/Routes";

@Component({
  selector: 'jhi-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: [
    'purchase-menu.component.scss'
  ]
})
export class PurchaseMenuComponent implements OnInit {

  message: string;
  constructor(public Routes:ROUTES) {
    this.message = 'PurchaseMenuComponent message';
  }

  ngOnInit(): void {
  }

}
