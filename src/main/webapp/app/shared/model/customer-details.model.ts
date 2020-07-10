export interface ICustomerDetails {
  id?: number;
  customerName?: string;
  email?: string;
  address?: string;
  phone?: string;
}

export class CustomerDetails implements ICustomerDetails {
  constructor(public id?: number, public customerName?: string, public email?: string, public address?: string, public phone?: string) {}
}
