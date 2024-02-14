import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AccountService } from '../../../../_services/account-service/account.service';
import { ProfileChangePhotoComponent } from '../profile-change-photo/profile-change-photo.component';
import { ProfileSettingsTabsComponent } from '../profile-settings-tabs/profile-settings-tabs.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    ProfileChangePhotoComponent,
    ProfileSettingsTabsComponent,
    MatCardModule,
    CommonModule,
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-content>
          @if (user.result$ | async; as user) { @if(user.isSuccess) {
          <profile-change-photo [user]="user" />
          <profile-settings-tabs [user]="user" />
          } }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./profile.container.scss'],
})
export class ProfileContainer {
  private accountService = inject(AccountService);
  protected user = this.accountService.getUserDetails();
}
