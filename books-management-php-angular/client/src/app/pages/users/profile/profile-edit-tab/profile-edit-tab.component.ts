import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RawApiDataUser } from '../../../../_models/rawapi';
import { AccountService } from '../../../../_services/account-service/account.service';
import { PortalSnackbar } from '../../../../components/snackbars/portal-snackbar/portal-snackbar.component';

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
          [(ngModel)]="user.data.name"
          class="form-control"
          type="text"
          name="userName"
          placeholder="@eliasdb3"
          value="{{ this.user.data.name }}"
        />
      </div>

      <div class="edit-form-group">
        <label>Email</label>
        <input
          [(ngModel)]="user.data.email"
          class="form-control"
          type="text"
          name="email"
          placeholder="elias.db3@gmail.com"
        />
      </div>

      <div class="edit-form-group">
        <label>First Name</label>
        <input
          [(ngModel)]="user.data.firstName"
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
          [(ngModel)]="user.data.lastName"
          class="form-control"
          type="text"
          name="lastName"
          placeholder="De Bock"
        />
      </div>

      <div class="edit-form-group">
        <label>Phone Number</label>
        <input
          [(ngModel)]="user.data.phoneNumber"
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
          [(ngModel)]="user.data.address"
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
          [(ngModel)]="user.data.postalCode"
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
          [(ngModel)]="user.data.city"
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
  private snackBar = inject(MatSnackBar);

  updateUser = this.accountService.updateUser();

  @Input() user: RawApiDataUser = {
    data: {
      addedDate: '',
      address: '',
      city: '',
      email: '',
      favourites: [],
      firstName: '',
      lastName: '',
      id: 0,
      name: '',
      phoneNumber: '',
      postalCode: '',
    },
  };
  selectedIndex: number = 0;
  @Output() selectIndexEvent = new EventEmitter<number>();

  setIndexBackToZero() {
    this.selectIndexEvent.emit(0);
  }

  onUpdateUser(): void {
    if (this.user && this.user.data && this.user.data.name) {
      this.updateUser.mutate(this.user);
      localStorage.setItem('user', JSON.stringify(this.user.data.name));
      this.accountService.setCurrentUser(this.user.data.name);
    }

    this.setIndexBackToZero();

    this.snackBar.openFromComponent(PortalSnackbar, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { user: 'Profile', action: 'updated' },
    });
  }
}
