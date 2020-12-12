import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {PurchaseItems} from "app/shared/model/purchase-items.model";
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'jhi-buy-popup',
  templateUrl: './buy-popup.component.html',
  styleUrls: ['./buy-popup.component.scss']
})
export class BuyPopupComponent implements OnInit {
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
    if (this.checkConditions()) {
      this.purchaseData.addToCart(this.selectedItem);
      this.activeModal.close();
    }
  }

  checkConditions(): boolean {
    if (this.selectedItem.quantity === 0) {
      this.message = "Quantity cannot be 0";
      return false;
    }
    if (this.selectedItem.quantity !== undefined && this.selectedItem.quantity < 0) {
      this.message = "Quantity cannot be negative";
      return false;
    }

    if (this.selectedItem.unitPrice !== undefined && this.selectedItem.unitPrice < 0) {
      this.message = "Price cannot be negative";
      return false;
    }

    return true;
  }

}
