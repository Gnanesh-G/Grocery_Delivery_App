import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}
  
  getCart(userId:number): Observable<any> {
    return this.http.get<any>(
      `${urlEndpoint.baseUrl}/cart/${userId}`
    );
  }

  postCart(cart: Cart): Observable<any> {
    return this.http.post<any>(
      `${urlEndpoint.baseUrl}/cart`,
      cart
    );
  }
  deleteCart(cartId: number,groceryId:number): Observable<any> {
    return this.http.delete<any>(
      `${urlEndpoint.baseUrl}/cart/${cartId}/${groceryId}}`
    );
  }
}
