import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NgxColorsModule } from 'ngx-colors';
import { MaterialModule } from '../material.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    NgxColorsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    MaterialModule,
    NgxColorsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    LottieModule,
  ],
})
export class SharedModule {}
