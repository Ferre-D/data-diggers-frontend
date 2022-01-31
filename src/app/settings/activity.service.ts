import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private httpClient: HttpClient) {}
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/activities/';

  getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.rootUrl);
  }
  postActivities(activity: Activity): Observable<Activity> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Activity>(this.rootUrl, activity, { headers });
  }
}
