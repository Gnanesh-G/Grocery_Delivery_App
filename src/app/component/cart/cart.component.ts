import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 1;

  userId: any;
  error: string = '';
  username: String = '';

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    console.log(userId, 'userid detail');

    this.cartService.getCart(userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
        console.log(carts, 'cart details');
      },
    });
  }
  addCartItemToCart(item: any, userId: number): void {
    //let userId = this.storageService.getLoggedInUser().id;
    //let  userId = loggedInUser.id;
    this.userId = this.storageService.getLoggedInUser().id;

    this.cartService.addItemToCart(item, userId).subscribe({
      next: () => {
        this.cartService.getCart(userId).subscribe({
          next: (carts: any) => {
            let cartDetails: Cart[] = carts.data;
            this.carts = cartDetails;
          },
        });
      },
    });
  }

  onDelete(id: number, groceryId: number): void {
    console.log(id, groceryId);

    this.cartService.deleteCart(id, groceryId).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        this.ngOnInit();
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
  }

  checkOut() {
    this.router.navigate(['/order'], { replaceUrl: true });
    // console.log('cart', this.carts);

    // for (let item of this.carts) {
    //   this.orders.push({
    //     id: 0,
    //     total: item.Total,
    //     username: this.storageService.getLoggedInUser().username,
    //     orderedGroceryList: {
    //       id: item.id,
    //       title: item.title,
    //       description:item.description,
    //       price: item.price,
    //       count: item.count,
    //     },
    //   });

    //   console.log('order', this.orders);

    //   this.orderService
    //     .createOrder(this.storageService.getLoggedInUser().id, item.id, this.addressId)
    //     .subscribe({
    //       next: (response: Order[]) => {
    //         console.log('response', response);
    //         this.orders = response;
    //       },
    //       complete: () => console.log('orderCreated'),
    //       error: () => console.log('error'),
    //     });
    // }

    // this.storageService.setOrder(this.orders);
    // // Move the navigation code here after the loop finishes
    // this.router.navigate(['/order'], { replaceUrl: true });

    // // Return statement should be placed before the navigation code as code written after return statement won't execute
    // return this.orders;
  }
}
