import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
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
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatChipsModule,
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
export class ProfileComponent {
  private accountService = inject(AccountService);
  // user: RawApiDataUserFav | undefined;
  protected user = this.accountService.getUserDetails();
}
