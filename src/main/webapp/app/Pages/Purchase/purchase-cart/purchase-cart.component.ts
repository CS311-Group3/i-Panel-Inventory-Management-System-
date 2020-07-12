import {Component, OnInit} from '@angular/core';
import {BuyPopupComponent} from "app/Pages/Purchase/buy-popup/buy-popup.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: [
    'purchase-cart.component.scss'
  ]
})
export class PurchaseCartComponent implements OnInit {

  message: string;

  constructor(private modalService:NgbModal) {
    this.message = 'PurchaseCartComponent message';
  }

  ngOnInit(): void {
  }

  addToCart():void {
    const modalRef = this.modalService.open(BuyPopupComponent);

  }

}
