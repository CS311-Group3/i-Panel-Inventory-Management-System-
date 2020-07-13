import {Injectable} from "@angular/core";
import {IInventory, Inventory} from "app/shared/model/inventory.model";


@Injectable({providedIn : 'root'})
export class PurchaseData {

  items?:Inventory[] = [];
  reviewItem:Inventory;
  constructor() {
    this.reviewItem = new Inventory();
  }

   getReviewItem():any{
    if (this.reviewItem != null ){
      return this.reviewItem;
    }
    return new Inventory();
  }

  // public addToCart(item :IInventory){
  //   this.items.push(item);
  // }
  //


  public add(item:IInventory):void{
    this.reviewItem = item;
  }
}
