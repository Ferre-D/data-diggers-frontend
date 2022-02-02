import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Theme } from '../theme';
import { ThemesService } from '../themes.service';
import * as ThemeActions from '../../../actions/theme.actions';
interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss'],
})
export class ThemesListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private themesService: ThemesService,
    private store: Store<AppState>
  ) {
    this.theme = store.select('theme');
  }
  deactivate$: Subscription = new Subscription();
  activate$: Subscription = new Subscription();
  themes: Theme[] = [];
  themes$: Subscription = new Subscription();
  deleteTheme$: Subscription = new Subscription();
  theme!: Observable<Theme>;
  activeTheme!: Theme | undefined;

  errorMessage: String = '';
  add() {
    this.router.navigate(['settings/themes/newtheme'], {
      state: { mode: 'add' },
    });
  }
  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['settings/themes/edittheme/' + id], {});
  }
  delete(id: number) {
    this.deleteTheme$ = this.themesService.deleteTheme(id).subscribe(
      (result) => {
        //all went well
        this.getThemes();
      },
      (error) => {
        //error
        this.errorMessage = error.message;
      }
    );
  }
  ngOnInit(): void {
    this.getThemes();
  }
  ngOnDestroy(): void {
    this.themes$.unsubscribe();
    this.deleteTheme$.unsubscribe();
  }
  getThemes() {
    this.themes$ = this.themesService
      .getThemes()
      .subscribe((result) => (this.themes = result));
  }

  setActive(theme: Theme) {
    this.activeTheme = this.themes.find((t) => t.active == true);
    this.deactivate$ = this.themesService
      .deactivate(this.activeTheme)
      .subscribe((result) => {});
    this.activate$ = this.themesService.activate(theme).subscribe((result) => {
      this.getThemes();
    });
    this.store.dispatch(new ThemeActions.EditTheme(theme));
  }
}
