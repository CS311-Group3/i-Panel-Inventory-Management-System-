import { IInventory } from 'app/shared/model/inventory.model';
import { ISales } from 'app/shared/model/sales.model';

export interface ISalesItems {
  id?: number;
  unitPrice?: number;
  quantity?: number;
  total?: number;
  itemCode?: IInventory;
  salesCode?: ISales;
}

export class SalesItems implements ISalesItems {
  constructor(
    public id?: number,
    public unitPrice?: number,
    public quantity?: number,
    public total?: number,
    public itemCode?: IInventory,
    public salesCode?: ISales
  ) {}
}
