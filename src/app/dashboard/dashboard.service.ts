import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { passing_cars } from './passing_cars';
import { passing_cars_2 } from './passing_cars_2';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/passing_cars/';
  constructor(private httpClient: HttpClient) {}
  getDashboardDataByDay(): Observable<passing_cars_2[]> {
    return this.httpClient.get<passing_cars_2[]>(this.rootUrl);
  }
  getDashboardData(): Observable<passing_cars> {
    return this.httpClient.get<passing_cars>(this.rootUrl + 'count');
  }
  getDashboardDays(days: number): Observable<passing_cars> {
    return this.httpClient.get<passing_cars>(
      this.rootUrl + 'countday?days=' + days
    );
  }
  getDashboardDataDate(date: Date): Observable<passing_cars> {
    return this.httpClient.get<passing_cars>(
      this.rootUrl + 'countdate?date=' + formatDate(date, 'YYYY-MM-dd', 'en-US')
    );
  }
}
