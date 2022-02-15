import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { LegendItemComponent } from './legend-item/legend-item.component';
import { SharedModule } from '../shared/shared.module';
import { ExtraComponent } from './extra/extra.component';

@NgModule({
  declarations: [DashboardComponent, LegendItemComponent, ExtraComponent],
  imports: [SharedModule, NgChartsModule],
  exports: [DashboardComponent],
  providers: [],
})
export class DashboardModule {}
