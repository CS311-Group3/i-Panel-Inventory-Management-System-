import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {PurchaseItems} from "app/shared/model/purchase-items.model";

@Component({
  selector: 'jhi-sales-popup',
  templateUrl: './sales-popup.component.html',
  styleUrls: ['./sales-popup.component.scss']
})
export class SalesPopupComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
  }



}
