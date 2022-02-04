import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { Theme } from '../themes/theme';
import { ThemesService } from '../themes/themes.service';
import { UserService } from '../users/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

interface AppState {
  theme: Theme;
}
interface tableData {
  user: string;
  created_at: Date;
  description: string;
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
export class SettingsComponent implements OnInit {
  tableData: tableData[] = [];
  countThemes: number = 0;
  countUsers: number = 0;
  theme!: Observable<Theme>;
  displayedColumns: string[] = ['created_at', 'user', 'description'];

  constructor(
    private activityService: ActivityService,
    private themesService: ThemesService,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.theme = store.select('theme');
  }
  activities: Activity[] = [];

  users: AnimationOptions = {
    path: '/assets/users.json',
  };
  painting: AnimationOptions = {
    path: '/assets/painting.json',
  };
  animationCreated(animationItem: AnimationItem): void {}

  ngOnInit(): void {
    this.themesService
      .count()
      .subscribe((result) => (this.countThemes = result.count));
    this.userService
      .count()
      .subscribe((result) => (this.countUsers = result.count));
    this.activityService.getActivities().subscribe((result) => {
      this.activities = result;
      this.refactorData();
    });
  }
  refactorData() {
    this.activities.map((a) => {
      this.userService.getUserById(a.usersId).subscribe((result) => {
        this.tableData.push({
          user: result.firstName + result.lastName,
          description: a.description,
          created_at: a.created_at,
        });
      });
    });
  }
}
