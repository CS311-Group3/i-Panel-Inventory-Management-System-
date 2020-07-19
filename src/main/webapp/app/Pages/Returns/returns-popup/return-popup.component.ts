import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {PurchaseItems} from "app/shared/model/purchase-items.model";

@Component({
  selector: 'jhi-return-popup',
  templateUrl: './return-popup.component.html',
  styleUrls: ['./return-popup.component.scss']
})
export class ReturnPopupComponent implements OnInit {
  selectedItem: PurchaseItems = new PurchaseItems();
  total: number;
  unitPrice: number;
  units: number;

  message: string;

  constructor(public activeModal: NgbActiveModal, public purchaseData: PurchaseData) {
    this.total = 0;
    this.units = 0;
    this.unitPrice = this.purchaseData.getReviewItem().buyingPrice;
    this.message = "";

  }

  ngOnInit(): void {
    this.unitPrice = this.purchaseData.getReviewItem().buyingPrice;
  }

  calculateTotal(): void {
    this.total = this.units * this.unitPrice;
  }

  addToCart(): void {
    this.selectedItem.quantity = this.units;
    this.selectedItem.total = this.total;
    this.selectedItem.itemCode = this.purchaseData.reviewItem;
    this.selectedItem.unitPrice = this.unitPrice;
    if (this.checkZeroQuantity()) {
      this.purchaseData.addToCart(this.selectedItem);
      this.activeModal.close();
    }
  }

  checkZeroQuantity(): boolean {
    if (this.selectedItem.quantity === 0) {
      this.message = "quantity cannot be 0";
      return false;
    }
    return true;
  }

}
