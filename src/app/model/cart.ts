export interface Cart {
  id: number;
  userId: number;
  groceryId: number;
  cartId?: number;
  count: number;
  price?:number;
  grocery?: {
    id: number;
    title: string;
    description: string;
    price: number;
    count: number;
    photo: string | null;
    createdAt: string;
  };
}
