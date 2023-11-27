import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  groceryId:number=0;
  constructor(
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    console.log(userId);  
    
    this.cartService.getCart(userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
        console.log(carts); 
      },
    });
  }
  
  onDelete(cartId: number,groceryId:number): void {
    this.cartService.deleteCart(cartId,groceryId).subscribe({
      next: () => {
        this.carts = this.carts.filter((cart) => cart.id !== cartId);
      },
      error: (err) => {
        console.error('Error deleting cart:', err);
      }
    });
  }
  
// onDelete(cartId: number,groceryId:number | undefined) {
//  // console.log(id);
//   if (id !== undefined) {
//     this.cartService.deleteCart(id).subscribe({
//       next: (response: any) => {
//         this.categories = response.data;
//       },
//       error: (err) => {
//         let message: string = err?.error?.error?.message;
//         this.error =
//           message != null && message.includes(",")
//             ? message.split(",")[0]
//             : message;
//       },
//     });
//   }
// }

}