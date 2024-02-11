import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RawApiDataUserFav } from '../../../../_models/rawapi';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatChipsModule, CommonModule],
  selector: 'profile-change-photo',
  template: `
    <div class="row">
      <div class="change-photo-container">
        <div class="mx-auto" style="width: 140px;">
          <div
            class="circle-placeholder"
            style="height: 140px; background-color: rgb(233, 236, 239);"
          >
            <img
              src="https://material.angular.io/assets/img/examples/shiba1.jpg"
              alt="profile picture"
              class="profile-pic"
            />
          </div>
        </div>

        <div class="change-btn-container">
          <h4 *ngIf="user" class="pt-sm-2 pb-1 mb-0 text-nowrap">
            {{ user.data.firstName }} {{ user.data.lastName }}
          </h4>
          <button mat-raised-button>
            <i class="fa fa-fw fa-camera"></i>
            <span style="margin-left: 5px;">Change Photo</span>
          </button>
        </div>
      </div>
      <div class="joined">
        <mat-chip>
          <img
            matChipAvatar
            src="https://material.angular.io/assets/img/examples/shiba1.jpg"
            alt="Photo of a Shiba Inu"
          />
          member
        </mat-chip>
        <div class="text-muted">
          <small *ngIf="user">
            Joined {{ user.data.addedDate | date : 'longDate' }}</small
          >
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./change-photo.component.scss'],
})
export class ChangePhotoComponent {
  @Input() user?: RawApiDataUserFav;
}
