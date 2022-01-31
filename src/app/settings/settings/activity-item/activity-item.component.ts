import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/security/user';
import { Activity } from '../../activity';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {
  @Input() activity!: Activity;
  user!: User;
  dateString!: string;
  constructor(private authServie: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.activity);
    console.log(this.activity.usersId);
    this.dateString = new Date(this.activity.created_at).toLocaleDateString();

    this.authServie
      .getUserById(this.activity?.usersId)
      .subscribe((result) => (this.user = result));
  }
  detail() {
    this.router.navigateByUrl('/settings/themes/edittheme/' + this.activity.id);
  }
}
