export interface IVendor {
  id?: number;
  vendorName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export class Vendor implements IVendor {
  constructor(public id?: number, public vendorName?: string, public phone?: string, public email?: string, public address?: string) {}
}
