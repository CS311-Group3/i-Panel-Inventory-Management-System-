import {Injectable} from "@angular/core";
import {IInventory, Inventory} from "app/shared/model/inventory.model";
import {PurchaseItems} from "app/shared/model/purchase-items.model";


@Injectable({providedIn : 'root'})
export class PurchaseData {

  reviewItem:IInventory;
  selectedItems:PurchaseItems[] = [];
  // selectedItemsCode:string[] = [] || undefined;

  constructor() {
    this.reviewItem = new Inventory();
  }

   getReviewItem():any{
    if (this.reviewItem != null ){
      return this.reviewItem;
    }
    return new Inventory();
  }

  public addToCart(item:PurchaseItems):void{
    this.selectedItems.push(item)
    // this.selectedItemsCode.push(item.itemCode);
  }

  // public check(item:PurchaseItems):void{
  //   if (this.selectedItems.includes(item)){
  //
  //   }
  // }


  public add(item:IInventory):void{
    this.reviewItem = item;
  }
}
