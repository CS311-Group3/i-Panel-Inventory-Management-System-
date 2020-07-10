import { IInventory } from 'app/shared/model/inventory.model';
import { IReturnsData } from 'app/shared/model/returns-data.model';

export interface IReturnItems {
  id?: number;
  quantity?: number;
  itemCode?: IInventory;
  returnCode?: IReturnsData;
}

export class ReturnItems implements IReturnItems {
  constructor(public id?: number, public quantity?: number, public itemCode?: IInventory, public returnCode?: IReturnsData) {}
}
