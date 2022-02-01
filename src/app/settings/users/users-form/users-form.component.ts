import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  userId: number = 0;

  isAdmin: boolean = false;
  isSubmitted: boolean = false;

  user$: Subscription = new Subscription();
  postUser$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  userForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    userLevel: new FormControl(false),
    activities: new FormControl([]),
  });
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {
    this.isAdd = this.router.url === '/settings/users/newuser';

    this.isEdit = !this.isAdd;
  }

  ngOnInit(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id == null) return;
      this.userId = +id;
      this.userService.getUserById(+id).subscribe((result) => {
        if (result.userLevel == 1) {
          this.isAdmin = true;
        } else if (result.userLevel == 2) {
          this.isAdmin = false;
        }
        this.userForm.patchValue({
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          activities: result.activities,
          userLevel: this.isAdmin,
        });
      });
    }
  }
  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.putUser$.unsubscribe();
    this.postUser$.unsubscribe();
  }
  onSubmit() {
    if (this.userForm.value.userLevel) {
      this.userForm.patchValue({
        userLevel: 1,
      });
    } else {
      this.userForm.patchValue({
        userLevel: 2,
      });
    }
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postUser$ = this.userService.postUser(this.userForm.value).subscribe(
        (result) => {
          this.router.navigateByUrl('/settings/users');
        },
        (error) => {
          this.toastr.error(
            'Please try again later...',
            'Something went wrong.'
          );
          this.isSubmitted = false;
        }
      );
    }
    if (this.isEdit) {
      this.putUser$ = this.userService
        .putUser(this.userId, this.userForm.value)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('/settings/users');
          },
          (error) => {
            this.toastr.error(
              'Please try again later...',
              'Something went wrong.'
            );
            this.isSubmitted = false;
          }
        );
    }
  }
}
