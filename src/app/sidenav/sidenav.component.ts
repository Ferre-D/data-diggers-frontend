import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit, OnInit {
  themes$: Subscription = new Subscription();
  themes: Theme[] = [];
  theme!: Theme;
  @ViewChild('sidenavStart')
  sidenavStart!: MatSidenav;
  @ViewChild('sidenavEnd')
  sidenavEnd!: MatSidenav;
  opened = true;
  openedNav2 = true;
  selected!: Date | null;
  small!: boolean;
  path: string = '';
  disabledRight: boolean = false;
  disabledLeft: boolean = false;
  constructor(
    private themesService: ThemesService,
    private observer: BreakpointObserver,
    private location: Location,
    private router: Router,
    public authService: AuthService
  ) {
    if (this.location.path() == '') this.router.navigateByUrl('/dashboard');
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
      this.disabledRight =
        this.path.includes('settings') ||
        this.path.includes('login') ||
        this.path.includes('signup');
      this.disabledLeft =
        this.path.includes('login') || this.path.includes('signup');
    });
  }
  ngOnInit(): void {
    this.themes$ = this.themesService.getThemes().subscribe((result) => {
      this.themes = result;
      this.themes = this.themes.filter((t) => {
        return (t.active = true);
      });
      this.theme = this.themes[0];
    });
  }
  clearDate() {
    this.selected = null;
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
