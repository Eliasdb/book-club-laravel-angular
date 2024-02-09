import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangePhotoComponent } from '../change-photo/change-photo.component';
import { ProfileSettingsFormComponent } from '../profile-settings-form/profile-settings-form.component';

@Component({
  selector: 'app-profile',
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
          <app-change-photo />
          <app-profile-settings-form />
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./profile.container.scss'],
})
export class ProfileComponent {}
