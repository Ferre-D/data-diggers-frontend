import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { UserResponse } from './userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  rooturl: string = 'http://localhost:3000/';
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.rooturl + 'users/' + id.toString());
  }
  getUser(): User | null {
    if (this.isLoggedIn()) {
      return {
        id: parseInt(localStorage.getItem('id') ?? '0'),
        email: localStorage.getItem('email') ?? '',
        lastname: localStorage.getItem('lastname') ?? '',
        firstname: localStorage.getItem('firstName') ?? '',
        password: '',
        token: this.getToken(),
      };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      'http://localhost:3000/login',
      user
    );
  }

  register(user: User): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      'http://localhost:3000/register',
      user
    );
  }
}
