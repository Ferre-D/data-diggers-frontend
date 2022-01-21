import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgChartsModule } from 'ng2-charts';
import { LegendItemComponent } from './legend-item/legend-item.component';

@NgModule({
  declarations: [DashboardComponent, LegendItemComponent],
  imports: [CommonModule, MatGridListModule, NgChartsModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
