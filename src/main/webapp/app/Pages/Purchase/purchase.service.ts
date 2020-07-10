import {Injectable} from "@angular/core";
import {IInventory} from "app/shared/model/inventory.model";

@Injectable({providedIn:'root'})
export class PurchaseService{

  selectedItem?:IInventory;
  total:number;

  constructor() {
    this.total=0;
  }

  getBuyingPrice():any{
    if (this.selectedItem != null){
      return this.selectedItem.buyingPrice;
    }
  }

  getName():any{
    if (this.selectedItem != null){
      return this.selectedItem.itemName;
    }
  }

}
