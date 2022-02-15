import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private httpClient: HttpClient) {}
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/activities';
  // rootUrl: string = 'https://localhost:44316/api/activities/';

  getActivities(page: number = 1): Observable<HttpResponse<Activity[]>> {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Expose-Headers', 'x-pagination');
    return this.httpClient.get<Activity[]>(
      this.rootUrl + '?pagenumber=' + page,
      {
        observe: 'response',
        headers,
      }
    );
  }
  postActivities(activity: Activity): Observable<Activity> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Activity>(this.rootUrl, activity, { headers });
  }
}
