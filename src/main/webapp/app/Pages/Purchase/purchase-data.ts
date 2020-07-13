import {Injectable} from "@angular/core";
import {IInventory, Inventory} from "app/shared/model/inventory.model";


@Injectable({providedIn : 'root'})
export class PurchaseData {

  items?:IInventory[] = [];
  reviewItem?:IInventory;

  constructor() {
  }

   getReviewItem():IInventory{
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
