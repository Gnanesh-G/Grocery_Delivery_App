import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { Grocery } from './model/grocery';
import { GroceryService } from './service/grocery.service';
import { Cart } from './model/cart';
import { ToasterService } from './service/toaster.service';
import { CartService } from './service/cart.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };
  title: string = 'Grocery_Delivery_App';
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  isSearchVisible: boolean = false;
  filteredGroceries: Grocery[] = [];
  groceries: Grocery[] = [];
  searchTerm: string = '';
  carts: Cart[] = [];
  count: number = 0;
  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private groceryService: GroceryService,
    private toastr: ToasterService,
    private cartService: CartService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    window.onclick = () => this.filterReset();
    this.groceryService.getAllGroceries().subscribe({
      next: (response: any) => {
        this.groceries = response.data;
      },
    });
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
  }
  filterGroceries(): void {
    this.filteredGroceries = this.groceries.filter((grocery) =>
      grocery.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      // Optionally, you can focus on the input field when it becomes visible
      setTimeout(() => document.querySelector('.search-container input'));
    }
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
    this.toastr.info('Success! Product added to cart');
  }
  filterReset(): void {
    this.isSearchVisible = false;
    this.searchTerm = '';
    this.filteredGroceries = [];
  }
}
