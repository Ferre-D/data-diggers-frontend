import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild(MatSidenav)
  endsidenav!: MatSidenav;
  opened = true;
  openedNav2 = true;
  selected!: Date | null;
  small!: boolean;
  path: string = '';
  disabled!: boolean;
  constructor(
    private observer: BreakpointObserver,
    private location: Location,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
      this.disabled = this.path.includes('settings');
    });
  }
  clearDate() {
    this.selected = null;
  }
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.small = true;
        this.sidenav.mode = 'over';
        this.endsidenav.mode = 'over';
        this.endsidenav.close();
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.endsidenav.mode = 'side';
        this.endsidenav.open();
        this.sidenav.open();
      }
    });
  }
}
