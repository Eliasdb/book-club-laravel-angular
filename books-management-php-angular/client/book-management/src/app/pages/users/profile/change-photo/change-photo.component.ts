import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatChipsModule],
  selector: 'app-change-photo',
  template: `
    <div class="row">
      <div class="change-photo-container">
        <div class="mx-auto" style="width: 140px;">
          <div
            class="d-flex justify-content-center align-items-center rounded"
            style="height: 140px; background-color: rgb(233, 236, 239);"
          >
            <span style="color: rgb(166, 168, 170); font: bold 8pt Arial;"
              >140x140</span
            >
          </div>
        </div>

        <div class="change-btn-container">
          <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">Elias De Bock</h4>
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
        <div class="text-muted"><small>Joined 22 Jan 2024</small></div>
      </div>
    </div>
  `,
  styleUrls: ['./change-photo.component.scss'],
})
export class ChangePhotoComponent {}
