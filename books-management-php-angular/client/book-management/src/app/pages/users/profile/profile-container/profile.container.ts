import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../_services/account-service/account.service';
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
          <mat-tab-group>
            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="example-tab-icon">settings</mat-icon>
                Settings
              </ng-template>
              <div class="form-container">
                <form *ngIf="user" class="form" novalidate="" #Form="ngForm">
                  <div class="form-group">
                    <label class="form-label">Username</label>
                    <p>{{ user?.data.name }}</p>
                  </div>

                  <div class="form-group">
                    <label>Email</label>
                    <p>{{ user?.data.email }}</p>
                  </div>

                  <div class="form-group">
                    <label>First Name</label>
                    <p>{{ user?.data.firstName }}</p>
                  </div>

                  <div class="form-group">
                    <label>Last Name</label>
                    <p>{{ user?.data.lastName }}</p>
                  </div>

                  <div class="form-group">
                    <label>Phone Number</label>
                    <p>{{ user?.data.phoneNumber }}</p>
                  </div>

                  <div class="form-group">
                    <label>Address</label>
                    <p>{{ user?.data.address }}</p>
                  </div>

                  <div class="form-group">
                    <label>Postal code</label>
                    <p>{{ user?.data.postalCode }}</p>
                  </div>

                  <div class="form-group">
                    <label>City</label>
                    <p>{{ user?.data.city }}</p>
                  </div>
                </form>
              </div>
            </mat-tab>

            <mat-tab>
              <ng-template mat-tab-label>
                <mat-icon class="example-tab-icon">edit</mat-icon>
                Edit
              </ng-template>
              <div class="form-container">
                <form
                  class="form"
                  novalidate=""
                  #updateUserForm="ngForm"
                  (ngSubmit)="updateUser()"
                >
                  <div class="form-group">
                    <label>Username</label>
                    <!-- <p *ngIf="user">{{ user?.data.id }}</p> -->
                    <input
                      [(ngModel)]="model.name"
                      class="form-control"
                      type="text"
                      name="userName"
                      placeholder="@eliasdb3"
                      value=""
                    />
                  </div>

                  <div class="form-group">
                    <label>Email</label>
                    <input
                      [(ngModel)]="model.email"
                      class="form-control"
                      type="text"
                      name="email"
                      placeholder="elias.db3@gmail.com"
                    />
                  </div>

                  <div class="form-group">
                    <label>First Name</label>
                    <input
                      [(ngModel)]="model.firstName"
                      class="form-control"
                      type="text"
                      name="name"
                      placeholder="Elias"
                      value=""
                    />
                  </div>

                  <div class="form-group">
                    <label>Last Name</label>
                    <input
                      [(ngModel)]="model.lastName"
                      class="form-control"
                      type="text"
                      name="lastName"
                      placeholder="De Bock"
                    />
                  </div>

                  <div class="form-group">
                    <label>Phone Number</label>
                    <input
                      [(ngModel)]="model.phoneNumber"
                      class="form-control"
                      type="text"
                      name="address"
                      placeholder="0479 56 88 26"
                      value=""
                    />
                  </div>

                  <div class="form-group">
                    <label>Address</label>
                    <input
                      [(ngModel)]="model.address"
                      class="form-control"
                      type="text"
                      name="address"
                      placeholder="Lijnendraaierstraat"
                      value=""
                    />
                  </div>

                  <div class="form-group">
                    <label>Postal code</label>
                    <input
                      [(ngModel)]="model.postalCode"
                      class="form-control"
                      type="text"
                      name="postalCode"
                      placeholder="9900"
                      value=""
                    />
                  </div>

                  <div class="form-group">
                    <label>City</label>
                    <input
                      [(ngModel)]="model.city"
                      class="form-control"
                      type="text"
                      name="city"
                      placeholder="Gent"
                      value=""
                    />
                  </div>
                  <div class="form-group"></div>

                  <div class="form-group">
                    <button mat-raised-button type="submit">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./profile.container.scss'],
})
export class ProfileComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  user: any | undefined;
  toggleSettingsB: boolean = true;

  model: any = {};

  updateUser() {
    this.accountService.updateUser(this.model).subscribe({
      next: () => {
        // this.toggleSettings();
      },
      error: (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.accountService.getUserDetails().subscribe((data) => {
      this.user = data;
    });
  }
}
