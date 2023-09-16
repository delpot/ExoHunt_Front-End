import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  UpdateAccountForm,
  UpdatePasswordForm,
} from './update-account-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ROOT_URL = 'http://localhost:8000';
  USER_URL = '/api/users/';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
  };

  constructor(private http: HttpClient) {}

  getUserAccount(userId: string): Observable<any> {
    return this.http.get<any>(
      environment.baseUrl + this.USER_URL + userId,
      this.httpOptions
    );
  }

  updateUserAccount(
    userId: string,
    updateUserDto: UpdateAccountForm
  ): Observable<any> {
    return this.http.put<any>(
      environment.baseUrl + this.USER_URL + userId,
      updateUserDto,
      this.httpOptions
    );
  }

  updateUserPassword(
    userId: string,
    updatePasswordDto: UpdatePasswordForm
  ): Observable<any> {
    return this.http.put<any>(
      environment.baseUrl + this.USER_URL + userId + '/password',
      updatePasswordDto,
      this.httpOptions
    );
  }
}
