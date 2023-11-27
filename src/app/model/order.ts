import { Address } from './address';

export interface Order {
  id: number;
  userId?: number;
  title: string;
  username: string;
  addressList: Address[];
  orderStatus: string;
  price?:number;
  description?:string;
}
