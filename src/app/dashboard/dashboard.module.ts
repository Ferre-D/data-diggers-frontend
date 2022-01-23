import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgChartsModule } from 'ng2-charts';
import { LegendItemComponent } from './legend-item/legend-item.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityItemComponent } from './settings/activity-item/activity-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DashboardComponent,
    LegendItemComponent,
    SettingsComponent,
    ActivityItemComponent,
  ],
  imports: [
    MatPaginatorModule,
    CommonModule,
    MatGridListModule,
    SharedModule,
    NgChartsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
