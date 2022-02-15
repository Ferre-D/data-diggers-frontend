import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartData, Color, ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { Theme } from 'src/app/settings/themes/theme';
import { DashboardService } from '../dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { passing_cars_2 } from '../passing_cars_2';
interface filterDay {
  day: Date;
  isSelected: Boolean;
}
interface AppState {
  theme: Theme;
  filter: number;
  filterDay: filterDay;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface days {
  sunday: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective;
  carsByDayCount: days = {
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  };
  bikesByDayCount: days = {
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  };
  cars_passed: number = 0;
  trucks_passed: number = 0;
  bikes_passed: number = 0;
  motors_passed: number = 0;
  bus_passed: number = 0;
  dashboardData: number[] = [];
  filterDays!: Observable<Number>;
  filterDaySelected: number = 0;
  filterDay!: Observable<filterDay>;
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
  ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' },
  ];
  filterDate(r: Date) {
    this.dashboardService.getDashboardDataDate(r).subscribe((result) => {
      this.cars_passed = result.cars_passed;
      this.trucks_passed = result.trucks_passed;
      this.bus_passed = result.busses_passed;
      this.bikes_passed = result.bikers_passed;
      this.motors_passed = result.motorcycles_passed;
      this.dashboardData = [
        this.cars_passed,
        this.trucks_passed,
        this.bikes_passed,
        this.motors_passed,
        this.bus_passed,
      ];
      this.setDoughnutData(this.dashboardData);
    });
  }
  filter(days: Number) {
    this.dashboardService
      .getDashboardDataByDay()
      .subscribe((r) => this.getValuesByDay(r));
    if (days == -1) {
      this.dashboardService.getDashboardData().subscribe((result) => {
        this.cars_passed = result.cars_passed;
        this.trucks_passed = result.trucks_passed;
        this.bus_passed = result.busses_passed;
        this.bikes_passed = result.bikers_passed;
        this.motors_passed = result.motorcycles_passed;
        this.dashboardData = [
          this.cars_passed,
          this.trucks_passed,
          this.bikes_passed,
          this.motors_passed,
          this.bus_passed,
        ];
        this.setDoughnutData(this.dashboardData);
      });
    } else if (days == 90) {
      this.dashboardService.getDashboardDays(90).subscribe((result) => {
        this.cars_passed = result.cars_passed;
        this.trucks_passed = result.trucks_passed;
        this.bus_passed = result.busses_passed;
        this.bikes_passed = result.bikers_passed;
        this.motors_passed = result.motorcycles_passed;
        this.dashboardData = [
          this.cars_passed,
          this.trucks_passed,
          this.bikes_passed,
          this.motors_passed,
          this.bus_passed,
        ];
        this.setDoughnutData(this.dashboardData);
      });
    } else if (days == 30) {
      this.dashboardService.getDashboardDays(30).subscribe((result) => {
        this.cars_passed = result.cars_passed;
        this.trucks_passed = result.trucks_passed;
        this.bus_passed = result.busses_passed;
        this.bikes_passed = result.bikers_passed;
        this.motors_passed = result.motorcycles_passed;
        this.dashboardData = [
          this.cars_passed,
          this.trucks_passed,
          this.bikes_passed,
          this.motors_passed,
          this.bus_passed,
        ];
        this.setDoughnutData(this.dashboardData);
      });
    }
  }
  getValuesByDay(data: passing_cars_2[]) {
    if (this.filterDaySelected > 0) {
      let date = new Date();

      date.setDate(date.getDate() - this.filterDaySelected);
      data = data.filter((d) => new Date(d.timestamp) > date);
    }
    let DayCount = 0;

    data.map((d) => {
      switch (new Date(d.timestamp || '').getDay()) {
        case 0:
          this.carsByDayCount.sunday += d.amount_cars;
          this.bikesByDayCount.sunday += d.amount_bikers;
          DayCount++;

          break;
        case 1:
          this.carsByDayCount.monday += d.amount_cars;
          this.bikesByDayCount.monday += d.amount_bikers;

          break;
        case 2:
          this.carsByDayCount.tuesday += d.amount_cars;
          this.bikesByDayCount.tuesday += d.amount_bikers;

          break;
        case 3:
          this.carsByDayCount.wednesday += d.amount_cars;
          this.bikesByDayCount.wednesday += d.amount_bikers;

          break;
        case 4:
          this.carsByDayCount.thursday += d.amount_cars;
          this.bikesByDayCount.thursday += d.amount_bikers;

          break;
        case 5:
          this.carsByDayCount.friday += d.amount_cars;
          this.bikesByDayCount.friday += d.amount_bikers;

          break;
        case 6:
          this.carsByDayCount.saturday += d.amount_cars;
          this.bikesByDayCount.saturday += d.amount_bikers;

          break;
        default:
          break;
      }
    });

    this.carsByDayCount.monday /= DayCount;
    this.carsByDayCount.tuesday /= DayCount;
    this.carsByDayCount.wednesday /= DayCount;
    this.carsByDayCount.thursday /= DayCount;
    this.carsByDayCount.friday /= DayCount;
    this.carsByDayCount.saturday /= DayCount;
    this.carsByDayCount.sunday /= DayCount;

    this.bikesByDayCount.monday /= DayCount;
    this.bikesByDayCount.tuesday /= DayCount;
    this.bikesByDayCount.wednesday /= DayCount;
    this.bikesByDayCount.thursday /= DayCount;
    this.bikesByDayCount.friday /= DayCount;
    this.bikesByDayCount.saturday /= DayCount;
    this.bikesByDayCount.sunday /= DayCount;
    this.setBikesVsCarsData();
  }
  setBikesVsCarsData() {
    this.lineChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [
            this.carsByDayCount.monday,
            this.carsByDayCount.tuesday,
            this.carsByDayCount.wednesday,
            this.carsByDayCount.thursday,
            this.carsByDayCount.friday,
            this.carsByDayCount.saturday,
            this.carsByDayCount.sunday,
          ],
          borderColor: '#6A99DE',
          pointBorderColor: '#6A99DE',
          pointBackgroundColor: '#fff',
          label: 'Cars',
          pointRadius: 2,
        },
        {
          data: [
            this.bikesByDayCount.monday,
            this.bikesByDayCount.tuesday,
            this.bikesByDayCount.wednesday,
            this.bikesByDayCount.thursday,
            this.bikesByDayCount.friday,
            this.bikesByDayCount.saturday,
            this.bikesByDayCount.sunday,
          ],
          borderColor: '#FFA27A',
          pointBorderColor: '#FFA27A',
          pointBackgroundColor: '#fff',
          label: 'Bikes',
          fill: false,
          pointRadius: 2,
        },
      ],
    };
  }
  setDoughnutData(data: number[]) {
    this.barChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: data,
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
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: data,
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
  }
  format_number(n: number) {
    for (var i = 0; i < this.ranges.length; i++) {
      if (n >= this.ranges[i].divider) {
        return (
          (n / this.ranges[i].divider).toFixed(2).toString() +
          this.ranges[i].suffix
        );
      }
    }
    return n.toString();
  }
  public doughnutChartOptions = {
    maintainAspectRatio: false,
    responsive: false,
    cutout: '80%',
    animation: {
      duration: 0,
    },
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
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
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';
  public lineChartType: ChartType = 'line';
  public lineChartLabels: string[] = ['Cars', 'Bikes'];
  public lineChartData!: ChartData<'line'>;
  public barChartData!: ChartData<'bar'>;

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 2, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 2, rows: 1, color: 'lightpink' },
  ];
  constructor(
    private store: Store<AppState>,
    private dashboardService: DashboardService
  ) {
    this.theme = store.select('theme');
    this.filterDays = store.select('filter');
    this.filterDay = store.select('filterDay');
  }

  ngOnInit(): void {
    this.filterDay.subscribe((r) => {
      if (r.isSelected) {
        this.filterDate(r.day);
      }
    });

    this.filterDays.subscribe((r) => {
      this.filterDaySelected = Number.parseInt(r.toString());
      this.filter(r);
    });
    this.dashboardService.getDashboardDataByDay().subscribe((r) => {
      this.getValuesByDay(r);
    });
    this.dashboardService.getDashboardData().subscribe((result) => {
      this.cars_passed = result.cars_passed;
      this.trucks_passed = result.trucks_passed;
      this.bus_passed = result.busses_passed;
      this.bikes_passed = result.bikers_passed;
      this.motors_passed = result.motorcycles_passed;
      this.dashboardData = [
        this.cars_passed,
        this.trucks_passed,
        this.bikes_passed,
        this.motors_passed,
        this.bus_passed,
      ];
      this.setDoughnutData(this.dashboardData);
    });
  }
}
