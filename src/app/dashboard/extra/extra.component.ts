import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/settings/themes/theme';
interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss'],
})
export class ExtraComponent implements OnInit {
  theme!: Observable<Theme>;

  constructor(store: Store<AppState>) {
    this.theme = store.select('theme');
  }

  ngOnInit(): void {}
}
