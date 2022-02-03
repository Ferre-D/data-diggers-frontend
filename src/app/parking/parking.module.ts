import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingComponent } from './parking/parking.component';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ParkingComponent],
  imports: [SharedModule, NgChartsModule],
  exports: [ParkingComponent],
})
export class ParkingModule {}
