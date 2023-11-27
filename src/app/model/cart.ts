export interface Cart {
  id: number;
  title: string;
  cartId?:number;
  groceryList: {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    count?: number;
  }[];
}
