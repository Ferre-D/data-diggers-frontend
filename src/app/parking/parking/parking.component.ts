import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/settings/themes/theme';
import { ChartType, ChartData, Color, ChartConfiguration } from 'chart.js';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ParkingService } from '../parking.service';
interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
  template: `
    <ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `,
})
export class ParkingComponent implements OnInit {
  totalCarsParked: number = 0;
  theme!: Observable<Theme>;
  availableSpots: number = 0;
  constructor(
    private store: Store<AppState>,
    private parkingService: ParkingService
  ) {
    this.theme = store.select('theme');
  }
  live: AnimationOptions = {
    path: '/assets/live.json',
  };
  calendar: AnimationOptions = {
    path: '/assets/calendar.json',
  };
  public barChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 14,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  barData = [
    {
      color: '#6A99DE',
    },
  ];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ],
    datasets: [
      {
        data: [3, 2, 4, 6, 8, 11, 12, 10, 8, 5],
        label: 'AVG. Cars Parked',
        backgroundColor: '#0263FF',
        hoverBackgroundColor: '#3F88FF',
      },
    ],
  };
  animationCreated(animationItem: AnimationItem): void {}

  ngOnInit(): void {
    this.parkingService.getLiveData().subscribe((result) => {
      this.availableSpots = 12 - result[result.length - 1].free_spots;
    });
    this.parkingService.getParkingSpots().subscribe((result) => {
      this.totalCarsParked = result.length;
    });
  }
}
