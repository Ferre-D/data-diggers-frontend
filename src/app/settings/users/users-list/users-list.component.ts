import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/security/user';
import { Theme } from '../../themes/theme';
import { UserService } from '../user.service';

interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  theme!: Observable<Theme>;
  users$: Subscription = new Subscription();
  deleteUser$: Subscription = new Subscription();
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.theme = store.select('theme');
  }
  add() {
    this.router.navigateByUrl('/settings/users/newuser');
  }
  ngOnInit(): void {
    this.getUsers();
  }
  ngOnDestroy(): void {
    this.users$.unsubscribe();
    this.deleteUser$.unsubscribe();
  }
  getUsers() {
    this.users$ = this.userService
      .getUsers()
      .subscribe((result) => (this.users = result));
  }
  delete(id: number) {
    this.deleteUser$ = this.userService.deleteUser(id).subscribe(
      (result) => {
        this.getUsers();
      },
      (error) => {
        //TOASTR ERROR
      }
    );
  }
  edit(id: number) {
    this.router.navigateByUrl('/settings/users/edituser/' + id);
  }
}
