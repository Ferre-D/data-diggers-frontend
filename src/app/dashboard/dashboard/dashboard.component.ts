import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData, Color } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/settings/themes/theme';
interface AppState {
  theme: Theme;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  theme!: Observable<Theme>;
  public doughnutChartColors: Color[] = [];
  public doughnutChartLabels: string[] = [
    'Cars',
    'Trucks',
    'Bikes',
    'Buses',
    'Motorcycles',
  ];
  public lineGraphOptions = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0,
    },
  };
  public doughnutChartOptions = {
    maintainAspectRatio: false,
    responsive: false,
    cutout: '80%',
    animation: {
      duration: 0,
    },
  };
  lineData = [
    {
      color: '#6A99DE',
      label: 'Cars',
    },
    {
      color: '#FFA27A',
      label: 'Bikes',
    },
  ];
  doughnutData = [
    {
      color: '#6A99DE',
      label: 'Cars',
    },
    {
      color: '#993886',
      label: 'Trucks',
    },
    {
      color: '#FFA27A',
      label: 'Bikes',
    },
    {
      color: '#33ABAB',
      label: 'Buses',
    },
    {
      color: '#7BBA6A',
      label: 'Motorcycles',
    },
  ];
  legend = false;
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [622, 314, 116, 40, 81],
        hoverBackgroundColor: [
          '#6A99DE',
          '#993886',
          '#FFA27A',
          '#33ABAB',
          '#7BBA6A',
        ],
        hoverBorderColor: [
          '#6A99DE',
          '#993886',
          '#FFA27A',
          '#33ABAB',
          '#7BBA6A',
        ],
        backgroundColor: [
          '#6A99DE',
          '#993886',
          '#FFA27A',
          '#33ABAB',
          '#7BBA6A',
        ],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
  public lineChartType: ChartType = 'line';
  public lineChartLabels: string[] = ['Cars', 'Bikes'];
  public lineChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [75, 83, 78, 84, 73, 58, 66],
        borderColor: '#6A99DE',
        pointBorderColor: '#6A99DE',
        pointBackgroundColor: '#fff',
        label: 'Cars',
        pointRadius: 2,
      },
      {
        data: [23, 26, 22, 28, 32, 44, 36],
        borderColor: '#FFA27A',
        pointBorderColor: '#FFA27A',
        pointBackgroundColor: '#fff',
        label: 'Bikes',
        fill: false,
        pointRadius: 2,
      },
    ],
  };

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 2, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 2, rows: 1, color: 'lightpink' },
  ];
  constructor(private store: Store<AppState>) {
    this.theme = store.select('theme');
  }

  ngOnInit(): void {}
}
