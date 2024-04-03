import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
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
  options: AnimationOptions = {
    path: '/assets/cartlottie.json',
  };
  carts: Cart[] = [];
  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 1;
  error: string = '';
  username: String = '';
  userId = this.storageService.getLoggedInUser().id;
  totalValue: number = 0;

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private orderService: OrderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
        console.log(this.carts);
        
        this.calculateTotalValue();
      },
    });
  }

  onDelete(id: number | undefined, groceryId: number | undefined): void {
    this.cartService.deleteCart(id!, groceryId!).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        this.ngOnInit();
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
  }

  checkOut(): Order[] {
    for (let item of this.carts) {
      let newOrder: Order = {
        id: 0,
        username: this.storageService.getLoggedInUser().username || '',
        groceryList: [
          {
            id: item.grocery?.id || 0,
            title: item.grocery?.title || '',
            description: item.grocery?.description || '',
            price: item.grocery?.price || 0,
            count: item.count || 0,
          },
        ],
      };
      this.orders.push(newOrder);

      this.orderService
        .createOrder(this.storageService.getLoggedInUser().id, this.addressId)
        .subscribe({
          next: (response: Order[]) => {
            console.log('response', response);
          },
          complete: () => console.log('orderCreated'),
          error: () => console.log('error'),
        });
    }
    this.storageService.setOrder(this.orders);
    this.router.navigate(['/order'], { replaceUrl: true });
    return this.orders;
  }

  decrementCount(cartId: number, count: number, groceryId: number) {
    console.log('CartId => ' + cartId);
    console.log('count => ' + count);
    console.log('groceryId => ' + groceryId);
    if (count > 1) {
      this.cartService
        .cartCountUpdate(
          this.storageService.getLoggedInUser().id,
          groceryId,
          count - 1
        )
        .subscribe({
          next: (response: any) => {
            this.carts = response.data;
          },
        });
    }
  }

  increamentCount(cartId: number, count: number, groceryId: number) {
    console.log('CartId => ' + cartId);
    console.log('count => ' + count);
    console.log('groceryId => ' + groceryId);
    this.cartService
      .cartCountUpdate(
        this.storageService.getLoggedInUser().id,
        groceryId,
        count + 1
      )
      .subscribe({
        next: (response: any) => {
          this.carts = response.data;
        },
      });
  }

  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.count * cart.price!,
      0
    );
  }
}
