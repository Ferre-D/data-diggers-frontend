import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

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
        path: '',
      },
    ],
    userLevel: 2,
    token: '',
  };
  confirmPassword: String = '';
  submitted: boolean = false;
  private animationItem!: AnimationItem;
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}
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
  submit() {
    if (this.confirmPassword != this.user.password)
      return this.toastr.error("The passwords don't match!");
    this.submitted = true;
    return this.authService.register(this.user).subscribe(
      (result) => {
        this.submitted = false;
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('email', result.email.toString());
        localStorage.setItem('userLevel', result.userLevel.toString());
        localStorage.setItem('firstName', result.firstName.toString());
        localStorage.setItem('lastName', result.lastName.toString());
        localStorage.setItem('token', result.token.toString());

        this.animationItem.play();
      },
      (error) => {
        this.toastr.error('Something went wrong...', 'Error');
      }
    );
  }
  public onAnimationEnd() {
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard']);
    });
  }
  ngOnInit(): void {}
}
