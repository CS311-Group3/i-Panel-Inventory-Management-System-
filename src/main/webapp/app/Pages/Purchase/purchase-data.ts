import {Injectable} from "@angular/core";
import {IInventory, Inventory} from "app/shared/model/inventory.model";
import {IPurchaseItems, PurchaseItems} from "app/shared/model/purchase-items.model";
import {IVendor, Vendor} from "app/shared/model/vendor.model";


@Injectable({providedIn: 'root'})
export class PurchaseData {

  reviewItem: IInventory;
  cart: PurchaseItems[] = [];
  vendor?: IVendor;

  constructor() {
    this.reviewItem = new Inventory();
  }

  getVendor():any{
    return this.vendor;
  }

  getReviewItem(): any {
    if (this.reviewItem != null) {
      return this.reviewItem;
    }
    return new Inventory();
  }

  getCart(): any {
    return this.cart;
  }

  public addToCart(item: PurchaseItems): void {
    this.check(item);
    this.cart.push(item);
  }

  public check(item: PurchaseItems): void {
    for (const cart of this.cart) {
      if (cart.itemCode?.itemCode === item.itemCode?.itemCode) {
        this.removeFromCart(cart);
        break;
      }
    }
  }


  public add(item: IInventory): void {
    this.reviewItem = item;
  }

  public removeFromCart(item: IPurchaseItems): void {
    const index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
  }
}
