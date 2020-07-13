import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";

@Component({
  selector: 'jhi-buy-popup',
  templateUrl: './buy-popup.component.html',
  styleUrls: ['./buy-popup.component.scss']
})
export class BuyPopupComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal,public purchaseData:PurchaseData) { }

  ngOnInit(): void {
  }

}
