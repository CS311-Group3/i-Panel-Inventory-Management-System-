import { IUser } from 'app/core/user/user.model';

export interface IUserDetails {
  id?: number;
  phoneNumber?: string;
  address?: string;
  user?: IUser;
}

export class UserDetails implements IUserDetails {
  constructor(public id?: number, public phoneNumber?: string, public address?: string, public user?: IUser) {}
}
