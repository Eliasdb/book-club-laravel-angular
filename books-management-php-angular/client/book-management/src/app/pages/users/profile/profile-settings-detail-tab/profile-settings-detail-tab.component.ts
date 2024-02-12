import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'profile-settings-detail-tab',
  standalone: true,
  imports: [FormsModule],
  template: ` <div class="form-container">
    <form class="form" novalidate="" #Form="ngForm">
      <div class="form-group">
        <label class="details-label">Username</label>
        <p>{{ user.data.name }}</p>
      </div>

      <div class="form-group">
        <label class="details-label">Email</label>
        <p>{{ user.data.email }}</p>
      </div>

      <div class="form-group">
        <label class="details-label">Name</label>
        <p>{{ user.data.firstName }} {{ user.data.lastName }}</p>
      </div>

      <div class="form-group">
        <label class="details-label">Phone</label>
        <p>{{ user.data.phoneNumber }}</p>
      </div>

      <div class="form-group">
        <label class="details-label">Address</label>
        <p>{{ user.data.address }}</p>
      </div>

      <div class="form-group">
        <label class="details-label">Postal code</label>
        <p>{{ user.data.postalCode }}</p>
      </div>

      <div class="form-group">
        <label class="details-label">City</label>
        <p>{{ user.data.city }}</p>
      </div>
    </form>
  </div>`,
  styleUrl: './profile-settings-detail-tab.component.scss',
})
export class ProfileSettingsDetailTabComponent {
  @Input() user?: any;
}
