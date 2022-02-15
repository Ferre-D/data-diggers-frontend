import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { Theme } from '../themes/theme';
import { ThemesService } from '../themes/themes.service';
import { UserService } from '../users/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

interface AppState {
  theme: Theme;
}
interface Pagination {
  TotalCount: number;
  CurrentPage: number;
  TotalPages: number;
  HasPrevious: boolean;
  HasNext: boolean;
}
interface tableData {
  user: string;
  created_at: string;
  description: string;
  path: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  template: `
    <ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `,
})
export class SettingsComponent implements OnInit, AfterViewInit {
  pageEvent!: PageEvent;
  pagination!: Pagination;
  pageSize = 5;
  currentPage: number = 1;
  totalActivities: number = 0;
  tableData: tableData[] = [];
  countThemes: number = 0;
  countUsers: number = 0;
  theme!: Observable<Theme>;

  displayedColumns: string[] = ['created_at', 'user', 'description', 'action'];
  isLoadingResults: boolean = true;
  resultsLength: number = 0;
  datasource = new MatTableDataSource<tableData>(this.tableData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private activityService: ActivityService,
    private themesService: ThemesService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.theme = store.select('theme');
  }
  activities: Activity[] | null = [];

  users: AnimationOptions = {
    path: '/assets/users.json',
  };
  painting: AnimationOptions = {
    path: '/assets/painting.json',
  };
  animationCreated(animationItem: AnimationItem): void {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.themesService
      .count()
      .subscribe((result) => (this.countThemes = result.count));
    this.userService
      .count()
      .subscribe((result) => (this.countUsers = result.count));
    this.activityService.getActivities(1).subscribe((res) => {
      this.activities = res.body;
      this.pagination = JSON.parse(res.headers.get('x-pagination') || '');
      this.refactorData();
    });
  }
  public onPageChange(event: any) {
    this.pagination.CurrentPage = event.pageIndex + 1;
    console.log(this.pagination.CurrentPage);
    this.activityService
      .getActivities(this.pagination.CurrentPage)
      .subscribe((result) => {
        this.activities = result.body;
        this.refactorData();
      });
    return event;
  }
  refactorData() {
    this.tableData = [];
    console.log(this.activities);

    this.activities?.map((a) => {
      this.userService.getUserById(a.usersId).subscribe((result) => {
        this.tableData.push({
          user: result.firstName + ' ' + result.lastName,
          description: a.description,
          created_at: new Date(a.created_at).toLocaleString(),
          path: a.path,
        });
        if (this.tableData.length == this.activities?.length)
          this.datasource.data = this.tableData;
      });
    });
  }
}
