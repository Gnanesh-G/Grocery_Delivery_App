import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { Grocery } from '../model/grocery';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  itemCount: number = 1;

  cartCountUpdate(increamentCount: Cart): Observable<any> {
    return this.http.post<any>(`${urlEndpoint.baseUrl}/cart`, increamentCount);
  }

  getCart(userId: number): Observable<any> {
    return this.http.get<any>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  updateCartItem(cart: Cart): Observable<any> {
    return this.http.put<any>(`${urlEndpoint.baseUrl}/cart/${cart.id}`, cart);
  }

  addToCart(
    userId: number,
    productId: number,
    count: number
  ): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      groceryId: productId,
      count: count,
    };
    console.log(requestData);

    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  deleteCart(id: number, groceryId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/cart/${id}/${groceryId}`
    );
  }
}
