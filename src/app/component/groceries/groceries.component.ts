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
  selectedItem: string = '';
  itemCount: number = 1;
  groceries: Grocery[] = [];
  carts: Cart[] = [];
  count = 0;
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
        this.carts = cartDetails;
      },
      error: () => console.log('error'),
    });
  }

  onAddToCart(groceryId: number | undefined): void {
    console.log(groceryId);
    this.count++;
    this.cartService
      .addToCart(
        this.storageService.getLoggedInUser()?.id,
        groceryId!,
        this.count
      )
      .subscribe(
        (Response) => console.log(Response),
        () => console.log('product not added in cart')
      );
  }
}
