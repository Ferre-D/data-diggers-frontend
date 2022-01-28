import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { Theme } from './theme';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/themes/';

  constructor(private httpClient: HttpClient) {}

  getThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(this.rootUrl);
  }

  getThemeById(id: number): Observable<Theme> {
    return this.httpClient.get<Theme>(this.rootUrl + id);
  }

  postTheme(theme: Theme): Observable<Theme> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Theme>(this.rootUrl, theme, {
      headers: headers,
    });
  }

  putTheme(id: number, theme: Theme): Observable<Theme> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Theme>(this.rootUrl + id, theme, {
      headers: headers,
    });
  }

  deleteTheme(id: number): Observable<Theme> {
    return this.httpClient.delete<Theme>(this.rootUrl + id);
  }
}
