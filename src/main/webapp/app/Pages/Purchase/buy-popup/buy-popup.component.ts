import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";

@Component({
  selector: 'jhi-buy-popup',
  templateUrl: './buy-popup.component.html',
  styleUrls: ['./buy-popup.component.scss']
})
export class BuyPopupComponent implements OnInit {

  total: number;
  units: number;

  constructor(public activeModal: NgbActiveModal, public purchaseData: PurchaseData) {
    this.total = 0;
    this.units = 0;

  }

  ngOnInit(): void {
  }

  calculateTotal(): void {
    this.total = this.units * this.purchaseData.getReviewItem().buyingPrice;
  }

}
