import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAddress(userId:number): Observable<any> {
    return this.http.get<any>(
      `${urlEndpoint.baseUrl}/user/${userId}`
    );
  }
  
  getUserDetails(userId:number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/user/${userId}`);
  }

}
