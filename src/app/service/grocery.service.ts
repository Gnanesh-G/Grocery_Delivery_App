import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';
import { Grocery } from '../model/grocery';

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  constructor(private http: HttpClient) {}

  getAllGroceries(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/grocery/all`
    );
  }

  postGroceries(grocery: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/grocery`,
      grocery
    );
  }

  putGroceries(grocery: FormData): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/grocery`,
      grocery
    );
  }

  deleteGroceries(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/grocery/${id}`
    );
  }

  // getUserCart(id:number): Observable<AppResponse> {
  //   return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/get/${id}`);
  // }

  // removeFromCart(userId:number,id:number): Observable<AppResponse>{
  //   return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/cart/remove/${userId}/${id}`);
  // }
}
