import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { User } from '../user';

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
  isSubmitted: boolean = false;
  user: User = {
    id: 0,
    email: '',
    lastName: '',
    firstName: '',
    password: '',
    activities: [
      {
        id: 0,
        usersId: 0,
        description: '',
        created_at: new Date(),
        action: '',
      },
    ],
    userLevel: 0,
    token: '',
  };
  errorMessage: string = '';
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  working: AnimationOptions = {
    path: '/assets/working.json',
  };
  animationCreated(animationItem: AnimationItem): void {}
  submitted() {
    this.isSubmitted = true;
    this.authService.authenticate(this.user).subscribe(
      (result) => {
        this.errorMessage = '';
        this.isSubmitted = false;
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('email', result.email.toString());
        localStorage.setItem('userLevel', result.userLevel.toString());
        localStorage.setItem('firstName', result.firstName.toString());
        localStorage.setItem('lastName', result.lastName.toString());
        localStorage.setItem('token', result.token.toString());
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.isSubmitted = false;
        this.errorMessage = 'Email/wachtwoord is niet correct!';
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }
  ngOnInit(): void {}
}
