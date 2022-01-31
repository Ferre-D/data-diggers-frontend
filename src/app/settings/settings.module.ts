import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityService } from './activity.service';
import { ActivityItemComponent } from './settings/activity-item/activity-item.component';
import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { ThemesModule } from './themes/themes.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from '../security/security.interceptor';

@NgModule({
  declarations: [SettingsComponent, ActivityItemComponent],
  imports: [ThemesModule, SharedModule],
  exports: [SettingsComponent, ThemesModule],
  providers: [
    ActivityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
})
export class SettingsModule {}
