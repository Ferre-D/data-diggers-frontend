import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { UserResponse } from './userResponse';
import { count } from '../settings/count';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/users/';
  getUserById(id: number): Observable<User> {
    let headers = new HttpHeaders();
    let bearer = 'bearer ' + this.getToken();
    headers = headers.set('Authorization', bearer);
    return this.httpClient.get<User>(this.rootUrl + id.toString(), { headers });
  }
  getUser(): User | null {
    if (this.isLoggedIn()) {
      return {
        id: parseInt(localStorage.getItem('id') ?? '0'),
        email: localStorage.getItem('email') ?? '',
        lastName: localStorage.getItem('lastName') ?? '',
        firstName: localStorage.getItem('firstName') ?? '',
        password: '',
        activities: [],
        userLevel: parseInt(localStorage.getItem('userLevel') ?? '0'),
        token: this.getToken(),
      };
    } else {
      return null;
    }
  }
  isAdmin(): boolean {
    return localStorage.getItem('userLevel') == '1';
  }
  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(user: User): Observable<User> {
    return this.httpClient.post<User>(this.rootUrl + 'authenticate', user);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.rootUrl, user);
  }
  count(): Observable<count> {
    let headers = new HttpHeaders();
    let bearer = 'bearer ' + this.getToken();
    headers = headers.set('Authorization', bearer);
    return this.httpClient.get<count>(this.rootUrl + 'count');
  }
}
