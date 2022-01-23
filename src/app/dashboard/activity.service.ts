import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private httpClient: HttpClient) {}
  rooturl: string = 'http://localhost:3000/';

  getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.rooturl + 'activities');
  }
}
