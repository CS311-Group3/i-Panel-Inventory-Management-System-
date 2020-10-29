import {Component, OnInit} from '@angular/core';
import {ROUTES} from "app/Constants/Routes";
import {Images} from "app/Constants/Images";

@Component({
  selector: 'jhi-purchase-menu',
  templateUrl: './purchase-menu.component.html',
  styleUrls: [
    'purchase-menu.component.scss'
  ]
})
export class PurchaseMenuComponent implements OnInit {

  message: string;
  constructor(public Routes:ROUTES,public IMAGES:Images) {
    this.message = 'PurchaseMenuComponent message';
  }

  ngOnInit(): void {
  }

}
