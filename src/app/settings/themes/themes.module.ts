import { NgModule } from '@angular/core';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemesFormComponent } from './themes-form/themes-form.component';
import { ThemesService } from './themes.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from 'src/app/security/security.interceptor';

@NgModule({
  declarations: [ThemesListComponent, ThemesFormComponent],
  imports: [SharedModule],
  exports: [ThemesListComponent, ThemesFormComponent],
  providers: [
    ThemesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
})
export class ThemesModule {}
