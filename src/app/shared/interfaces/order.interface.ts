import {IProducts} from './products.interface';

export interface IOrder {
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: number;
  ordersDetails: Array<IProducts>;
  id?: number;
  userComment?: string;
}
