import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UserService } from './user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from 'src/app/security/security.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersListComponent, UsersFormComponent],
  imports: [SharedModule],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
})
export class UsersModule {}
