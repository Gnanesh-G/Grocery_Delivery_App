import { Address } from './address';

export interface Order {
  id: number;
  userId?: number;
  title: string;
  total:number;
  username: String;
  addressList?: Address[];
  orderStatus?: string;
  description?:string;
  orderedGroceryList: {
    id?: number;
    title: String;
    description?: string;
    price: number;
    count: number;
  }[];
}
