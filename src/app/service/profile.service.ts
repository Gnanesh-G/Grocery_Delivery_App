import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Address } from '../model/address';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAddress(userId: number): Observable<any> {
    return this.http.get<any>(`${urlEndpoint.baseUrl}/user/${userId}`);
  }

  postAddress(details: Profile, userId: number): Observable<AppResponse> {
    const profile = {
      userId: userId,
      address: details.address,
      city: details.city,
      pinCode: details.pinCode,
    };
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/address`,
      profile
    );
  }

  deleteAddress(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/user/address/${id}`
    );
  }
}
