import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { ToastrModule } from 'ngx-toastr';
import { SettingsModule } from './settings/settings.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { StoreModule } from '@ngrx/store';
import { themeReducer } from './reducers/theme.reducer';
import { ParkingModule } from './parking/parking.module';
import { filterReducer } from './reducers/filter.reducer';
import { filterDayReducer } from './reducers/filterDay.reduces';

@NgModule({
  declarations: [AppComponent, SidenavComponent],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    SharedModule,
    ParkingModule,
    DashboardModule,
    SettingsModule,
    SecurityModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    StoreModule.forRoot({
      theme: themeReducer,
      filter: filterReducer,
      filterDay: filterDayReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
