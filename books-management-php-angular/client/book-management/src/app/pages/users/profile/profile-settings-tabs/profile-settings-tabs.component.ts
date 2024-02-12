import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ProfileSettingsDetailTabComponent } from '../profile-settings-detail-tab/profile-settings-detail-tab.component';
import { ProfileSettingsEditTabComponent } from '../profile-settings-edit-tab/profile-settings-edit-tab.component';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterLink,
    ProfileSettingsDetailTabComponent,
    ProfileSettingsEditTabComponent,
  ],
  selector: 'profile-settings-tabs',
  template: ` <mat-tab-group [(selectedIndex)]="selectedIndex">
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">person</mat-icon>
        Details
      </ng-template>
      <profile-settings-detail-tab [user]="user" />
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">edit</mat-icon>
        Edit
      </ng-template>
      <profile-settings-edit-tab (selectIndexEvent)="selectIndex()" />
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">favorite</mat-icon>
        Favourites
      </ng-template>
      <div *ngIf="user" class="fav-container">
        <div class="fav-item" *ngFor="let favourite of user.favourites">
          <div class="img-container">
            <img
              src="{{ favourite.photoUrl }}"
              alt="favorite book"
              routerLink="/books/{{ favourite.id }}"
            />
          </div>
          <div class="fav-info">
            <p><span class="text-bold">Title</span>: {{ favourite.title }}</p>
            <p><span class="text-bold">Genre</span>: {{ favourite.genre }}</p>
            <p><span class="text-bold">Author</span>: {{ favourite.author }}</p>
            <p>
              <span class="text-bold">Year</span>: {{ favourite.publishedDate }}
            </p>
          </div>
        </div>
      </div>
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
