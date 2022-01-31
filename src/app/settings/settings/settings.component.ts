import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/security/auth.service';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { ThemesService } from '../themes/themes.service';

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
  countThemes: number = 0;
  countUsers: number = 0;
  constructor(
    private activityService: ActivityService,
    private themesService: ThemesService,
    private authService: AuthService
  ) {}
  activities: Activity[] = [];

  users: AnimationOptions = {
    path: '/assets/users.json',
  };
  painting: AnimationOptions = {
    path: '/assets/painting.json',
  };
  animationCreated(animationItem: AnimationItem): void {}

  ngOnInit(): void {
    this.themesService
      .count()
      .subscribe((result) => (this.countThemes = result.count));
    this.authService
      .count()
      .subscribe((result) => (this.countUsers = result.count));
    this.activityService.getActivities().subscribe((result) => {
      this.activities = result;
    });
  }
}
