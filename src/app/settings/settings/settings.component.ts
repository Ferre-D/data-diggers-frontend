import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  template: `
    <ng-lottie
      [options]="options"
      (animationCreated)="animationCreated($event)"
    ></ng-lottie>
  `,
})
export class SettingsComponent implements OnInit {
  constructor(private activityService: ActivityService) {}
  activities: Activity[] = [];

  users: AnimationOptions = {
    path: '/assets/users.json',
  };
  painting: AnimationOptions = {
    path: '/assets/painting.json',
  };
  animationCreated(animationItem: AnimationItem): void {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((result) => {
      this.activities = result;
    });
  }
}
