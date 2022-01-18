import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { HttpClientModule } from '@angular/common/http';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [CommonModule, HttpClientModule, LottieModule],
})
export class SharedModule {}
