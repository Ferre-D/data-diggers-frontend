import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../security/auth.service';
import { ThemesService } from '../settings/themes/themes.service';
import { Theme } from '../settings/themes/theme';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as filterActions from '../actions/filter.actions';
import * as filterDayActions from '../actions/filterday.actions';

interface filterDay {
  day: Date;
  isSelected: Boolean;
}
interface AppState {
  theme: Theme;
  filter: number;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit, OnInit {
  filterDay!: filterDay;
  filterAll = true;
  filter30 = false;
  filter90 = false;
  date!: Date;
  themes$: Subscription = new Subscription();
  themes: Theme[] = [];
  theme!: Observable<Theme>;
  @ViewChild('sidenavStart')
  sidenavStart!: MatSidenav;
  @ViewChild('sidenavEnd')
  sidenavEnd!: MatSidenav;

  settingsActive: boolean = false;
  dashboardActive: boolean = false;
  parkingActive: boolean = false;

  opened = true;
  openedNav2 = true;
  selected!: Date | null;
  small!: boolean;
  path: string = '';
  disabledRight: boolean = false;
  disabledLeft: boolean = false;
  hideBars: boolean = false;
  constructor(
    private store: Store<AppState>,
    private observer: BreakpointObserver,
    private location: Location,
    private router: Router,
    public authService: AuthService
  ) {
    this.theme = store.select('theme');
    if (this.location.path() == '') this.router.navigateByUrl('/dashboard');
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
      this.disabledRight =
        this.path.includes('settings') ||
        this.path.includes('login') ||
        this.path.includes('signup') ||
        this.path.includes('parking') ||
        this.path.includes('extra');
      this.disabledLeft =
        this.path.includes('login') || this.path.includes('signup');
      this.hideBars =
        this.path.includes('login') || this.path.includes('signup');
      this.reset();
      this.dashboardActive = this.path.includes('dashboard');
      this.settingsActive = this.path.includes('settings');
      this.parkingActive = this.path.includes('parking');
    });
  }
  onChange(event: any) {
    this.resetFilter();
    this.filterDay = { day: event, isSelected: true };

    this.store.dispatch(new filterDayActions.EditFilterDay(this.filterDay));
  }
  ngOnInit(): void {}
  clearDate() {
    this.resetFilter();
    this.filterAll = true;
    this.store.dispatch(new filterActions.EditFilter(-1));
    this.selected = null;
    this.filterDay = { day: new Date(), isSelected: false };
    this.store.dispatch(new filterDayActions.EditFilterDay(this.filterDay));
  }
  resetFilter() {
    this.filterAll = false;
    this.filter30 = false;
    this.filter90 = false;
  }

  filter(days: number) {
    this.selected = null;

    this.resetFilter();
    switch (days) {
      case -1:
        this.filterAll = true;

        break;
      case 30:
        this.filter30 = true;
        break;
      case 90:
        this.filter90 = true;
        break;
      default:
        break;
    }
    this.store.dispatch(new filterActions.EditFilter(days));
  }
  reset() {
    this.dashboardActive = false;
    this.settingsActive = false;
  }
  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['login']);
  }
  toggle() {
    this.sidenavStart.toggle();
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1270px']).subscribe((res) => {
      if (res.matches) {
        if (this.disabledRight == false) {
          this.sidenavEnd.mode = 'over';
          this.sidenavEnd.close();
        }
      } else {
        if (this.disabledRight == false) {
          this.sidenavEnd.mode = 'side';
          this.sidenavEnd.open();
        }
      }
    });
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        if (this.disabledLeft == false) {
          this.sidenavStart.mode = 'over';
          this.sidenavStart.close();
        }
        this.small = true;
      } else {
        if (this.disabledLeft == false) {
          this.sidenavStart.mode = 'side';
          this.sidenavStart.open();
        }

        this.small = false;
      }
    });
  }
}
