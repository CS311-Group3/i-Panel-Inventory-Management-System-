import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {PurchaseItems} from "app/shared/model/purchase-items.model";

@Component({
  selector: 'jhi-buy-popup',
  templateUrl: './buy-popup.component.html',
  styleUrls: ['./buy-popup.component.scss']
})
export class BuyPopupComponent implements OnInit {
  selectedItem:PurchaseItems = new PurchaseItems();
  total: number;
  units: number;

  message:string;
  constructor(public activeModal: NgbActiveModal, public purchaseData: PurchaseData) {
    this.total = 0;
    this.units = 0;
    this.message = "";
  }

  ngOnInit(): void {
  }

  calculateTotal(): void {
    this.total = this.units * this.purchaseData.getReviewItem().buyingPrice;
  }

  addToCart():void{
    this.selectedItem.quantity = this.units;
    this.selectedItem.total = this.total;
    this.selectedItem.itemCode = this.purchaseData.reviewItem;
    if (this.checkZeroQuantity()) {
      this.purchaseData.addToCart(this.selectedItem);
      this.activeModal.close();
    }
  }

  checkZeroQuantity():boolean{
    if (this.selectedItem.quantity === 0){
      this.message = "quantity cannot be 0";
      return false;
    }
    return true;
  }

}
