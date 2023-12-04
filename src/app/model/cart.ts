export interface Cart {
  id: number;
  title: string;
  userId:number;
  //grocery:any;
  groceryId:number
  cartId:number;
 count:number;
  price:number ;
  quantity:number ;
  Total:number;
  image?:File;

  grocery: {
    id:number;
    title?: string;
    description?:string;
    price?: string;
    count?:number;
    photo?: null,
    
},

}
