import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  template: `
    <ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `,
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}
  working: AnimationOptions = {
    path: '/assets/working.json',
  };
  animationCreated(animationItem: AnimationItem): void {}
  submitted() {}

  ngOnInit(): void {}
}
