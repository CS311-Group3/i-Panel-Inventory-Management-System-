import { Moment } from 'moment';
import { ISales } from 'app/shared/model/sales.model';
import { IReturnItems } from 'app/shared/model/return-items.model';

export interface IReturnsData {
  id?: number;
  dateOfReturn?: Moment;
  salesCode?: ISales;
  items?: IReturnItems[];
}

export class ReturnsData implements IReturnsData {
  constructor(public id?: number, public dateOfReturn?: Moment, public salesCode?: ISales, public items?: IReturnItems[]) {}
}
