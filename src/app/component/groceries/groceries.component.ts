import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Grocery } from 'src/app/model/grocery';
import { CartService } from 'src/app/service/cart.service';
import { GroceryService } from 'src/app/service/grocery.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.css'],
})
export class GroceriesComponent implements OnInit {
  error: string = '';
  number: any;
  user: AppUser = this.storageService.getLoggedInUser();
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;
  itemCount: number = 1;
  groceries: Grocery[] = [];
  carts: Cart[] = [];
  constructor(
    private groceryService: GroceryService,
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.groceryService.getAllGroceries().subscribe({
      next: (response: any) => {
        this.groceries = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });

    this.cartService.getCart(this.user?.id).subscribe({
      next: (carts: any) => {
        this.storageService.setCart(carts.data);
        let cartDetails: Cart[] = carts.data;
        console.log(carts);
        this.carts = cartDetails;
        this.calculateTotalValue();
      },
      error: () => console.log('error'),
    });
  }

  onAddToCart(groceryId: number | undefined): void {
    console.log(groceryId);
    this.cartService
      .addToCart(this.storageService.getLoggedInUser()?.id, groceryId!)
      .subscribe(
        (Response) => console.log(Response),
        () => console.log('product not added in cart')
      );
  }

  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + (cart.quantity ?? 0) * (cart.price ?? 0),
      0
    );
  }
}

//   onAddToCart(groceries:Grocery): void {
//     console.log(groceries,"item ");

//     this.cartService.postCart(groceries).subscribe({
//       next: () => {
//         this.cartService.getCart(this.item).subscribe({
//           next: (carts: any) => {
//             let cartDetails: Cart[] = carts.data;
//             this.carts = cartDetails;
//           },
//         });
//       },
//     });
//   }

// onAddToCart(id: number): void {
//   let isPresent: Grocery = this.carts.find((item) => item.groceries.id === id)
//     ?.groceries!;
//   console.log(isPresent);

//   if (!this.carts.find((item) => item.groceries.id === id)) {
//     console.log('Added 1');

//     let Cart: Cart = {
//       userId: this.storageService.getLoggedInUser().id,
//       itemId: id,
//       count: 1,
//     };
//     this.groceryService.addToCart(Cart).subscribe({
//       next: (resp: any) => {
//         this.carts = resp.data;
//         console.log(this.carts);
//       },
//     });
//   } else {
//     console.log(
//       this.carts.find((cartItem) => cartItem.item.id === id)?.count
//     );

//     let Cart: Cart = {
//       userId: this.storageService.getLoggedInUser().id,
//       itemId: id,
//       count:
//         this.carts.find((cartItem) => cartItem.item.id === id)?.count! + 1,
//     };
//     this.groceryService.addToCart(Cart).subscribe({
//       next: (resp: any) => {
//         this.carts = resp.data;
//         console.log(this.carts);
//       },
//     });
//   }
// }

// removeFromCart(id: number): void {
//   if ((this.getCartItemCount(id)-1) === 0) {
//     let cartId:number = this.carts.find((cartItem)=>cartItem.item.id===id)?.id!;
//     this.groceryService
//       .removeFromCart(this.storageService.getLoggedInUser().id, cartId)
//       .subscribe({
//         next: (resp: any) => {
//           this.carts = resp.data;
//           console.log(this.carts);
//         },
//       });
//   } else {
//     console.log('Minus');

//     let Cart: Cart = {
//       userId: this.storageService.getLoggedInUser().id,
//       itemId: id,
//       count:
//         this.carts.find((cartItem) => cartItem.item.id === id)?.count! - 1,
//     };
//     this.groceryService.addToCart(Cart).subscribe({
//       next: (resp: any) => {
//         this.carts = resp.data;
//         console.log(this.carts);
//       },
//     });
//   }
// }
