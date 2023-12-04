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
  itemCount: number = 1;
  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<any> {
    return this.http.get<any>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }
  // addToCart(body:any): Observable<AppResponse> {
  //   return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`,body);
  // }

  addItemToCart(item: any, userId: number): Observable<any> {
    return this.http.post<any>(`${urlEndpoint.baseUrl}/cart`, item);
  }
  deleteCartItem(cartId: number): Observable<any> {
    return this.http.delete<any>(`${urlEndpoint.baseUrl}/cart/${cartId}`);
  }

  updateCartItem(cart: Cart): Observable<any> {
    return this.http.put<any>(`${urlEndpoint.baseUrl}/cart/${cart.id}`, cart);
  }

  addToCart(userId: number, productId: number): Observable<Cart[]> {
    let count: number = 1;
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

  updateProducts(newProducts: Grocery): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/grocery`,
      newProducts
    );
  }

  // deleteCart(cartId: number): Observable<any> {
  //   return this.http.delete<any>(
  //     `${urlEndpoint.baseUrl}/cart/${cartId}}`
  //   );
  // }
}
