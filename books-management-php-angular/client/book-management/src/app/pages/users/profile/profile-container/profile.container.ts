import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RawApiDataUserFav } from '../../../../_models/rawapi';
import { AccountService } from '../../../../_services/account-service/account.service';
import { ChangePhotoComponent } from '../change-photo/change-photo.component';
import { ProfileSettingsFormComponent } from '../profile-settings-form/profile-settings-form.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    ChangePhotoComponent,
    ProfileSettingsFormComponent,
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
          <profile-change-photo [user]="user" />
          <profile-settings-form [user]="user" />
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./profile.container.scss'],
})
export class ProfileComponent implements OnInit {
  private accountService = inject(AccountService);
  user: RawApiDataUserFav | undefined;

  ngOnInit(): void {
    this.accountService.getUserDetails().subscribe((data) => {
      this.user = data;
    });
  }
}
