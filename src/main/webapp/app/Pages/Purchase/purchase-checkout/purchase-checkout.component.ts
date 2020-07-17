import {Component, OnInit} from '@angular/core';
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {IPurchaseItems} from "app/shared/model/purchase-items.model";
import {IPurchases, Purchases} from "app/shared/model/purchases.model";
import {IVendor} from "app/shared/model/vendor.model";
import {VendorService} from "app/Pages/Purchase/vendor/vendor.service";
import {VendorUpdateComponent} from "app/Pages/Purchase/vendor/vendor-update.component";

@Component({
  selector: 'jhi-purchase-checkout',
  templateUrl: './purchase-checkout.component.html',
  styleUrls: [
    'purchase-checkout.component.scss'
  ]
})
export class PurchaseCheckoutComponent implements OnInit {

  cart: IPurchaseItems[];
  total: number;
  purchase: IPurchases;
  vendor:IVendor;
  constructor(public purchaseData: PurchaseData,
              protected vendorService:VendorService,
              protected vendorUpdateComponent:VendorUpdateComponent) {
    this.cart = this.getItems();
    this.total = this.calculateTotal();
    this.purchase = new Purchases();
    this.vendor = purchaseData.getVendor();
  }

  ngOnInit(): void {
    this.createPurchase();
  }

  calculateTotal(): number {
    this.total = 0;
    for (const item of this.purchaseData.getCart()) {
      this.total = this.total + item.total;
    }
    return this.total;
  }

  createPurchase():void{
    this.vendorUpdateComponent.subscribeToSaveResponse(this.vendorService.create(this.vendor));
    this.purchase = this.createFromForm();
  }

  getVendorEmail():any{
    return this.purchase.vendorID?.email;
  }

  getPurchase():any{
    return this.purchase;
  }

  getItems(): IPurchaseItems[] {
    return this.purchaseData.cart;
  }

  private createFromForm(): IPurchases {
    return {
      ...new Purchases(),
      total: this.total,
      discounts: 0,
      dateOfPurchase: undefined,
      vendorID: this.vendor
    };

  }

}
