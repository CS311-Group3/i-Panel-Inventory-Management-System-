import {Component, OnInit} from '@angular/core';
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {IPurchaseItems, PurchaseItems} from "app/shared/model/purchase-items.model";
import {IPurchases, Purchases} from "app/shared/model/purchases.model";
import {IVendor} from "app/shared/model/vendor.model";
import {VendorService} from "app/Pages/Purchase/vendor/vendor.service";
import {VendorUpdateComponent} from "app/Pages/Purchase/vendor/vendor-update.component";
import {PurchasesUpdateComponent} from "app/Pages/Purchase/purchases-details/purchases-update.component";
import {PurchasesService} from "app/Pages/Purchase/purchases-details/purchases.service";
import {PurchaseItemsUpdateComponent} from "app/entities/purchase-items/purchase-items-update.component";
import {PurchaseItemsService} from "app/entities/purchase-items/purchase-items.service";

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
  cartItem?: IPurchaseItems;

  constructor(public purchaseData: PurchaseData,
              protected vendorService: VendorService,
              protected vendorUpdateComponent: VendorUpdateComponent,
              protected purchasesUpdateComponent: PurchasesUpdateComponent,
              protected purchasesService: PurchasesService,
              protected purchaseItemsUpdateComponent: PurchaseItemsUpdateComponent,
              protected purchaseItemsService: PurchaseItemsService) {
    this.cart = this.getItems();
    this.total = this.calculateTotal();
    this.purchase = new Purchases();
  }

  ngOnInit(): void {
  }

  calculateTotal(): number {
    this.total = 0;
    for (const item of this.purchaseData.getCart()) {
      this.total = this.total + item.total;
    }
    return this.total;
  }

  createPurchase(): void {
    for (const item of this.getItems()) {
      this.purchaseItemsUpdateComponent.subscribeToSaveResponse(this.purchaseItemsService.create(item));
    }

    // this.vendorUpdateComponent.subscribeToSaveResponse(this.vendorService.create(this.purchaseData.getVendor()));
    // this.purchase = this.createFromForm();
    //
    // this.purchasesUpdateComponent.subscribeToSaveResponse(this.purchasesService.create(this.purchase));

  }

  getVendorEmail(): any {
    return this.purchase.vendorID?.email;
  }

  getPurchase(): any {
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
      vendorID: this.purchaseData.getVendor(),
      items: this.getItems(),
    };
  }


  // public createItem(item: IPurchaseItems): IPurchaseItems {
  //   return {
  //     ...new PurchaseItems(),
  //     id: item.id,
  //     unitPrice: item.unitPrice,
  //     quantity: item.quantity,
  //     total: item.total,
  //     itemCode: item.itemCode,
  //     purchaseCode: this.purchase,
  //   };
  // }
  //
  //
  // private updateFromForm(): IPurchases {
  //   return {
  //     ...new Purchases(),
  //     total: this.total,
  //     discounts: 0,
  //     dateOfPurchase: undefined,
  //     vendorID: this.purchaseData.getVendor(),
  //     items: this.purchaseData.getCart()
  //   };

  // }


}
