import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ProfileDetailsTabComponent } from '../profile-details-tab/profile-details-tab.component';
import { ProfileEditTabComponent } from '../profile-edit-tab/profile-edit-tab.component';
import { ProfileFavouritesTabComponent } from '../profile-favourites-tab/profile-favourites-tab.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterLink,
    ProfileDetailsTabComponent,
    ProfileEditTabComponent,
    ProfileFavouritesTabComponent,
  ],
  selector: 'profile-settings-tabs',
  template: ` <mat-tab-group [(selectedIndex)]="selectedIndex">
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">person</mat-icon>
        Details
      </ng-template>
      <profile-details-tab [user]="user" />
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">edit</mat-icon>
        Edit
      </ng-template>
      <profile-edit-tab (selectIndexEvent)="selectIndex()" />
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">favorite</mat-icon>
        Favourites
      </ng-template>
      <profile-favourites-tab [user]="user" />
    </mat-tab>
  </mat-tab-group>`,
  styleUrls: ['./profile-settings-tabs.component.scss'],
})
export class ProfileSettingsTabsComponent {
  @Input() user?: any;
  selectedIndex: number | undefined;

  selectIndex() {
    this.selectedIndex = 0;
  }
}
