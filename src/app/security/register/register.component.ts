import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  template: `
    <ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `,
})
export class RegisterComponent implements OnInit {
  private animationItem!: AnimationItem;
  constructor() {}
  profile: AnimationOptions = {
    path: '/assets/profile.json',
  };
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    animationItem.autoplay = false;
    animationItem.loop = false;
  }
  play() {
    this.animationItem.play();
  }

  ngOnInit(): void {}
}
