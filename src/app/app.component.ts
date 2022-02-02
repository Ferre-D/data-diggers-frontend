import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Theme } from './settings/themes/theme';
import * as ThemeActions from './actions/theme.actions';
import { ThemesService } from './settings/themes/themes.service';

interface AppState {
  theme: Theme;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  theme!: Observable<Theme>;
  defaultTheme!: Theme;
  theme$: Subscription = new Subscription();
  constructor(
    private themeService: ThemesService,
    private store: Store<AppState>
  ) {
    this.setTheme();
  }
  setTheme() {
    this.theme$ = this.themeService.getActiveTheme().subscribe((result) => {
      this.store.dispatch(new ThemeActions.EditTheme(result));
    });
  }
  ngOnDestroy() {
    this.theme$.unsubscribe();
  }
  title = 'data-diggers';
  ngOnInit(): void {}
}
