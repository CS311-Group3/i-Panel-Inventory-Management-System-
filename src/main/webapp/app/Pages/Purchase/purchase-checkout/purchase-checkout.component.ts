import {Component, OnInit} from '@angular/core';
import {PurchaseData} from "app/Pages/Purchase/purchase-data";
import {IPurchaseItems, PurchaseItems} from "app/shared/model/purchase-items.model";
import {IPurchases, Purchases} from "app/shared/model/purchases.model";
import {PurchasesUpdateComponent} from "app/Pages/Purchase/purchases-details/purchases-update.component";
import {PurchasesService} from "app/Pages/Purchase/purchases-details/purchases.service";
import {PurchaseItemsUpdateComponent} from "app/entities/purchase-items/purchase-items-update.component";
import {PurchaseItemsService} from "app/entities/purchase-items/purchase-items.service";
import {ROUTES} from "app/Constants/Routes";

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
  constructor(public purchaseData: PurchaseData,
              protected purchasesUpdateComponent: PurchasesUpdateComponent,
              protected purchasesService: PurchasesService,
              protected purchaseItemsUpdateComponent: PurchaseItemsUpdateComponent,
              protected purchaseItemsService: PurchaseItemsService,
              public Routes:ROUTES) {
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

    this.purchase = this.createFromForm();
    this.purchasesUpdateComponent.subscribeToSaveResponse(this.purchasesService.create(this.purchase));

    for (const item of this.getItems()) {
      item.purchaseCode = this.purchase;
      this.purchaseItemsUpdateComponent.subscribeToSaveResponse(this.purchaseItemsService.create(item));
    }

    this.purchaseData.destroy();
    this.destroy();
  }




  destroy(): void {
    delete this.purchase;
    delete this.cart;
    delete this.total;
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
