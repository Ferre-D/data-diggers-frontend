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
interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit, OnInit {
  themes$: Subscription = new Subscription();
  themes: Theme[] = [];
  theme!: Observable<Theme>;
  @ViewChild('sidenavStart')
  sidenavStart!: MatSidenav;
  @ViewChild('sidenavEnd')
  sidenavEnd!: MatSidenav;

  settingsActive: boolean = false;
  dashboardActive: boolean = false;

  opened = true;
  openedNav2 = true;
  selected!: Date | null;
  small!: boolean;
  path: string = '';
  disabledRight: boolean = false;
  disabledLeft: boolean = false;
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
        this.path.includes('signup');
      this.disabledLeft =
        this.path.includes('login') || this.path.includes('signup');
      this.reset();
      this.dashboardActive = this.path.includes('dashboard');
      this.settingsActive = this.path.includes('settings');
    });

    console.log(this.dashboardActive);
  }
  ngOnInit(): void {}
  clearDate() {
    this.selected = null;
  }
  reset() {
    this.dashboardActive = false;
    this.settingsActive = false;
  }
  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['login']);
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        if (this.disabledLeft == false) {
          this.sidenavStart.mode = 'over';
          this.sidenavStart.close();
        }
        if (this.disabledRight == false) {
          this.sidenavEnd.mode = 'over';
          this.sidenavEnd.close();
        }
        this.small = true;
      } else {
        if (this.disabledLeft == false) {
          this.sidenavStart.mode = 'side';
          this.sidenavStart.open();
        }
        if (this.disabledRight == false) {
          this.sidenavEnd.mode = 'side';
          this.sidenavEnd.open();
        }
        this.small = false;
      }
    });
  }
}
