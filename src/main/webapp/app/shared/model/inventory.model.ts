import { Category } from 'app/shared/model/enumerations/category.model';

export interface IInventory {
  id?: number;
  itemCode?: string;
  itemName?: string;
  category?: Category;
  description?: string;
  quantity?: number;
  reorderLevel?: number;
  sellingPrice?: number;
  buyingPrice?: number;
}

export class Inventory implements IInventory {
  constructor(
    public id?: number,
    public itemCode?: string,
    public itemName?: string,
    public category?: Category,
    public description?: string,
    public quantity?: number,
    public reorderLevel?: number,
    public sellingPrice?: number,
    public buyingPrice?: number
  ) {}
}
