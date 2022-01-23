import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/security/user';
import { Activity } from '../../activity';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent implements OnInit {
  @Input() activity: Activity = {
    id: 0,
    userId: 0,
    action: '',
    description: '',
    created_at: '',
  };
  user!: User;
  constructor(private authServie: AuthService) {}

  ngOnInit(): void {
    this.authServie
      .getUserById(this.activity!.userId)
      .subscribe((result) => (this.user = result));
  }
}
