import {Component, OnInit} from '@angular/core';
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {IPurchaseItems} from "app/shared/model/purchase-items.model";

@Component({
  selector: 'jhi-purchase-checkout',
  templateUrl: './purchase-checkout.component.html',
  styleUrls: [
    'purchase-checkout.component.scss'
  ]
})
export class PurchaseCheckoutComponent implements OnInit {

  cart:IPurchaseItems[];
  total:number;

  constructor(public purchaseData:PurchaseData) {
    this.cart = this.getItems();
    this.total = this.calculateTotal();
  }

  ngOnInit(): void {
  }

  calculateTotal():number{
    this.total = 0;
    for(const item of this.purchaseData.getCart()){
      this.total = this.total + item.total;
    }
    return this.total;
  }

  getItems():IPurchaseItems[]{
    return this.purchaseData.cart;
  }

}
