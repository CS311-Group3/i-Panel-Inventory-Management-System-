import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PurchaseCartComponent} from "app/Pages/Purchase/purchase-cart";
import {PurchaseService} from "app/Pages/Purchase/purchase.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'jhi-buy-popup',
  templateUrl: './buy-popup.component.html',
  styleUrls: ['./buy-popup.component.scss']
})
export class BuyPopupComponent implements OnInit {

  total: number;

  form = this.fb.group({
    quantity: []
  });

  constructor(public activeModal: NgbActiveModal, public purchaseService: PurchaseService, private fb: FormBuilder) {
    this.total = 0;
  }

  getTotal(): any {
    return this.purchaseService.getBuyingPrice();
  }

  ngOnInit(): void {
  }

  getQ(q: number): void {
    this.form.patchValue({
      quantity:q
    }
  )
  }

  get():number{
    return this.form.get(['quantity'])!.value;
  }
}
