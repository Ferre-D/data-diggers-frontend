import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Theme } from '../theme';
import { ThemesService } from '../themes.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss'],
})
export class ThemesListComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private themesService: ThemesService) {}
  themes: Theme[] = [];
  themes$: Subscription = new Subscription();
  deleteTheme$: Subscription = new Subscription();

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
  ngOnDestroy(): void {}
  getThemes() {
    this.themes$ = this.themesService
      .getThemes()
      .subscribe((result) => (this.themes = result));
  }
}
