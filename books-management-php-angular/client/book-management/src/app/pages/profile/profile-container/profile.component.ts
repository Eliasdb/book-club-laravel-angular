import { Component } from '@angular/core';
import { ChangePhotoComponent } from '../change-photo/change-photo.component';
import { ProfileSettingsFormComponent } from '../profile-settings-form/profile-settings-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ChangePhotoComponent, ProfileSettingsFormComponent],
  template: `
    <div class="container">
      <div class="row flex-lg-nowrap">
        <div class="col">
          <div class="row">
            <div class="col mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="e-profile">
                    <app-change-photo />
                    <app-profile-settings-form />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {}
