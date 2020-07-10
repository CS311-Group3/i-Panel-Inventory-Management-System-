import { Moment } from 'moment';
import { IVendor } from 'app/shared/model/vendor.model';
import { IPurchaseItems } from 'app/shared/model/purchase-items.model';

export interface IPurchases {
  id?: number;
  total?: number;
  discounts?: number;
  dateOfPurchase?: Moment;
  vendorID?: IVendor;
  items?: IPurchaseItems[];
}

export class Purchases implements IPurchases {
  constructor(
    public id?: number,
    public total?: number,
    public discounts?: number,
    public dateOfPurchase?: Moment,
    public vendorID?: IVendor,
    public items?: IPurchaseItems[]
  ) {}
}
