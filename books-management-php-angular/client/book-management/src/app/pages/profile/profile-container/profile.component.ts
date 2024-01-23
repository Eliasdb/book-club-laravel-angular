import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ChangePhotoComponent } from '../change-photo/change-photo.component';
import { ProfileSettingsFormComponent } from '../profile-settings-form/profile-settings-form.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ChangePhotoComponent, ProfileSettingsFormComponent],
  template: `
  <app-header />
  <div class="container">
    <div class="row flex-lg-nowrap">
    <div class="col">
      <div class="row">
        <div class="col mb-3">
          <div class="card">
            <div class="card-body">
              <div class="e-profile">
              <app-change-photo/>
              <app-profile-settings-form/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>    
  <app-footer/>
`,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

}
