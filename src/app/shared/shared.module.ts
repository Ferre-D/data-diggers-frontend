import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    FormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    LottieModule,
  ],
})
export class SharedModule {}
