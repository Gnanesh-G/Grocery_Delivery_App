import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { Cart } from '../model/cart';
import { Order } from '../model/order';
import { Address } from '../model/address';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }
  public setRoute(route: string | null): void {
    if (route !== null) localStorage.setItem('route', route);
  }

  public getRoute(): string | null {
    return localStorage.getItem('route');
  }

  public removeRoute(): void {
    localStorage.removeItem('route');
  }

  setAuthData(authData: string) {
    localStorage.setItem('authData', authData);
    console.log('setted');
  }

  public getAuthData(): string | null {
    return localStorage.getItem('authData');
  }

  public removeAuthData(): void {
    localStorage.removeItem('authData');
  }

  public setCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  public getCart(): Cart[] {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }
  public removeCart(): void {
    localStorage.removeItem('cart');
  }

  setOrder(order: Order[]): void {
    localStorage.setItem('orders', JSON.stringify(order));
  }

  public setAddress(address: Profile): void {
    localStorage.setItem('address', JSON.stringify(address));
  }
  public getAddress(): Order {
    return JSON.parse(localStorage.getItem('address') || '{}');
  }
  public removeAddress(): void {
    localStorage.removeItem('address');
  }
}
