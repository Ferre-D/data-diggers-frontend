import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { parking_spots } from './parkingSpots';
import { available_parking_spots_live } from './parking_spots_live';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  rootUrl: string = 'https://p40backend.azurewebsites.net/api/parking/';
  live: string = 'https://p40backend.azurewebsites.net/api/parkings';
  spots: string = 'https://p40backend.azurewebsites.net/api/Parkingspots';

  constructor(private httpClient: HttpClient) {}

  getLiveData(): Observable<available_parking_spots_live[]> {
    return timer(1, 100000).pipe(
      switchMap(() =>
        this.httpClient.get<available_parking_spots_live[]>(this.live)
      )
    );
  }
  getParkingSpots(): Observable<parking_spots[]> {
    return this.httpClient.get<parking_spots[]>(this.spots);
  }
}
