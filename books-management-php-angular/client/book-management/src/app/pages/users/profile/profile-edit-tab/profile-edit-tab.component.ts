import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../_services/account-service/account.service';

@Component({
  selector: 'profile-edit-tab',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  template: ` <div class="form-container">
    <form
      class="form update-form"
      novalidate=""
      #updateUserForm="ngForm"
      (ngSubmit)="onUpdateUser()"
    >
      <div class="edit-form-group">
        <label>Username</label>
        <input
          [(ngModel)]="user.name"
          class="form-control"
          type="text"
          name="userName"
          placeholder="@eliasdb3"
        />
      </div>

      <div class="edit-form-group">
        <label>Email</label>
        <input
          [(ngModel)]="user.email"
          class="form-control"
          type="text"
          name="email"
          placeholder="elias.db3@gmail.com"
        />
      </div>

      <div class="edit-form-group">
        <label>First Name</label>
        <input
          [(ngModel)]="user.firstName"
          class="form-control"
          type="text"
          name="name"
          placeholder="Elias"
          value=""
        />
      </div>

      <div class="edit-form-group">
        <label>Last Name</label>
        <input
          [(ngModel)]="user.lastName"
          class="form-control"
          type="text"
          name="lastName"
          placeholder="De Bock"
        />
      </div>

      <div class="edit-form-group">
        <label>Phone Number</label>
        <input
          [(ngModel)]="user.phoneNumber"
          class="form-control"
          type="text"
          name="address"
          placeholder="0479 56 88 26"
          value=""
        />
      </div>

      <div class="edit-form-group">
        <label>Address</label>
        <input
          [(ngModel)]="user.address"
          class="form-control"
          type="text"
          name="address"
          placeholder="Lijnendraaierstraat"
          value=""
        />
      </div>

      <div class="edit-form-group">
        <label>Postal code</label>
        <input
          [(ngModel)]="user.postalCode"
          class="form-control"
          type="text"
          name="postalCode"
          placeholder="9900"
          value=""
        />
      </div>

      <div class="edit-form-group">
        <label>City</label>
        <input
          [(ngModel)]="user.city"
          class="form-control"
          type="text"
          name="city"
          placeholder="Gent"
          value=""
        />
      </div>
      <div class="edit-form-group"></div>
      <div class="edit-form-group-btn">
        <button mat-raised-button type="submit">Save changes</button>
      </div>
    </form>
  </div>`,
  styleUrl: './profile-edit-tab.component.scss',
})
export class ProfileEditTabComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  updateUser = this.accountService.updateUser();
  selectedIndex: number = 0;
  user: any = {
    name: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    city: '',
  };
  @Output() selectIndexEvent = new EventEmitter<number>();

  setIndexBackToZero() {
    this.selectIndexEvent.emit(0);
  }

  onUpdateUser(): void {
    this.updateUser.mutate(this.user);
    this.setIndexBackToZero();
    if (this.user.name) localStorage.setItem('user', this.user.name);
    this.user = {};
    this.toastr.success('Profile successfully updated!');
  }
}
