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

  getUsersOrder(userId: number): Observable<any> {
    return this.http.get<any>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }

  createOrder(userId: number, addressId: number): Observable<Order[]> {
    let orderdata = {
      userId: userId,
      addressId: addressId,
    };
    return this.http.post<Order[]>(`${urlEndpoint.baseUrl}/order`, orderdata);
  }

  setStatus(orderId: number, statusId: number): Observable<AppResponse> {
    const setStatus = {
      orderId: orderId,
      statusId: statusId,
    };
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/order/status`,
      setStatus
    );
  }
}
