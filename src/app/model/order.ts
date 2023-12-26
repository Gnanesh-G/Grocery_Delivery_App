import { Address } from './address';

export interface Order {
  id: number;
  userId?: number;
  title?: string;
  total?:number;
  username: String;
  addressList?: Address[];
  orderStatus?:number;
  description?:string;
  groceryList: {
    id: number;
    title: String;
    description?: string;
    price: number;
    count: number;
  }[];
}
