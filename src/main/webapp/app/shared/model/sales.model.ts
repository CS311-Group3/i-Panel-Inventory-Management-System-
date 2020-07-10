import { Moment } from 'moment';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { ISalesItems } from 'app/shared/model/sales-items.model';

export interface ISales {
  id?: number;
  total?: number;
  serviceCharges?: number;
  dateOfSale?: Moment;
  customerID?: ICustomerDetails;
  items?: ISalesItems[];
}

export class Sales implements ISales {
  constructor(
    public id?: number,
    public total?: number,
    public serviceCharges?: number,
    public dateOfSale?: Moment,
    public customerID?: ICustomerDetails,
    public items?: ISalesItems[]
  ) {}
}
