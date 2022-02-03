import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './security/auth.guard';
import { AdminGuard } from './security/admin.guard';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { ThemesListComponent } from './settings/themes/themes-list/themes-list.component';
import { ThemesFormComponent } from './settings/themes/themes-form/themes-form.component';
import { UsersFormComponent } from './settings/users/users-form/users-form.component';
import { UsersListComponent } from './settings/users/users-list/users-list.component';
import { ParkingComponent } from './parking/parking/parking.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'parking',
    component: ParkingComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
  {
    path: 'settings/themes',
    component: ThemesListComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
  {
    path: 'settings/themes/newtheme',
    component: ThemesFormComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
  {
    path: 'settings/themes/edittheme/:id',
    component: ThemesFormComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
  {
    path: 'settings/users',
    component: UsersListComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
  {
    path: 'settings/users/newuser',
    component: UsersFormComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
  {
    path: 'settings/users/edituser/:id',
    component: UsersFormComponent,
    canActivate: [AuthGuard, AdminGuard],
    canActivateChild: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
