import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { Activity } from '../../activity';
import { ActivityService } from '../../activity.service';
import { Theme } from '../../themes/theme';
import { UserService } from '../user.service';

interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  userId: number = 0;
  activity: Activity = {
    id: 0,
    path: '',
    created_at: new Date(),
    description: '',
    usersId: 2,
  };

  isAdmin: boolean = false;
  isSubmitted: boolean = false;

  user$: Subscription = new Subscription();
  postUser$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();
  postActivity$: Subscription = new Subscription();

  $postActivity: Subscription = new Subscription();
  theme!: Observable<Theme>;

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
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private activityService: ActivityService
  ) {
    this.theme = store.select('theme');

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
    let tempId = 0;
    if (this.isAdd) {
      this.postUser$ = this.userService.postUser(this.userForm.value).subscribe(
        (result) => {
          tempId = result.id;
          this.postActivity$ = this.activityService
            .postActivities({
              id: 0,
              created_at: new Date(),
              path: '/settings/users/edituser/' + tempId,
              description:
                'The user ' +
                this.userForm.value.firstName +
                ' ' +
                this.userForm.value.lastName +
                ' has been created',
              usersId: Number.parseInt(localStorage.getItem('id') || '1'),
            })
            .subscribe((result) => {});
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
            this.postActivity$ = this.activityService
              .postActivities({
                id: 0,
                created_at: new Date(),
                path: '/settings/users/edituser/' + this.userId,
                description:
                  'The user ' +
                  this.userForm.value.firstName +
                  ' ' +
                  this.userForm.value.lastName +
                  ' has been edited',
                usersId: Number.parseInt(localStorage.getItem('id') || '1'),
              })
              .subscribe((result) => {
                console.log(result);
              });
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
