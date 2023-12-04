import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getAllOrders(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }

  createOrder(
    userId: number,
    groceryId: number,
    addressId: number
  ): Observable<Order[]> {
    let orderdata = {
      userId: userId,
      groceryId: groceryId,
      addressId: addressId,
    };
    return this.http.post<Order[]>(`${urlEndpoint.baseUrl}/order`, orderdata);
  }

  setStatus(body: any): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/orders/status`,
      body
    );
  }
}
