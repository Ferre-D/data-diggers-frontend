import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/security/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/users/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.rootUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.rootUrl + id);
  }
  getActiveUser(): Observable<User> {
    return this.httpClient.get<User>(this.rootUrl + 'active');
  }

  postUser(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<User>(this.rootUrl, user, {
      headers: headers,
    });
  }
  putUser(id: number, user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<User>(this.rootUrl + id, user, {
      headers: headers,
    });
  }

  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.rootUrl + id);
  }
}
