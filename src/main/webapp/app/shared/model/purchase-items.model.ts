import { IInventory } from 'app/shared/model/inventory.model';
import { IPurchases } from 'app/shared/model/purchases.model';

export interface IPurchaseItems {
  id?: number;
  unitPrice?: number;
  quantity?: number;
  total?: number;
  itemCode?: IInventory;
  purchaseCode?: IPurchases;
}

export class PurchaseItems implements IPurchaseItems {
  constructor(
    public id?: number,
    public unitPrice?: number,
    public quantity?: number,
    public total?: number,
    public itemCode?: IInventory,
    public purchaseCode?: IPurchases
  ) {}
}
