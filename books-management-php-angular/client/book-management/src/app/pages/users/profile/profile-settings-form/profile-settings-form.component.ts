import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-profile-settings-form',
  template: `
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="{{ toggleSettingsB ? 'nav-link active' : 'nav-link' }}"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          (click)="toggleSettings()"
        >
          Settings
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="{{ toggleSettingsB ? 'nav-link' : 'nav-link active' }}"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          (click)="toggleSettings()"
        >
          Edit
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="{{
          toggleSettingsB ? 'tab-pane fade show active' : 'tab-pane fade'
        }}"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <form *ngIf="user" class="form" novalidate="" #Form="ngForm">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Username</label>
                    <p>{{ user?.data.name }}</p>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Email</label>
                    <p>{{ user?.data.email }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>First Name</label>
                    <p>{{ user?.data.firstName }}</p>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Last Name</label>
                    <p>{{ user?.data.lastName }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Phone Number</label>
                    <p>{{ user?.data.phoneNumber }}</p>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Address</label>
                    <p>{{ user?.data.address }}</p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label>Postal code</label>
                    <p>{{ user?.data.postalCode }}</p>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>City</label>
                    <p>{{ user?.data.city }}</p>
                  </div>
                </div>
              </div>
              <!-- <div class="row">
                <div class="col mb-3">
                  <div class="form-group">
                    <label>About</label>
                    <textarea class="form-control" rows="5" placeholder="My Bio"></textarea>
                  </div>
                </div>
              </div> -->
            </div>
          </div>

          <!-- <div class="row">
            <div class="col d-flex justify-content-end">
              <button class="browse-btn" type="submit">Save Changes</button>
            </div>
          </div> -->
        </form>
      </div>
      <div
        class="{{
          toggleSettingsB ? 'tab-pane fade' : 'tab-pane fade show active'
        }}"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <form
          class="form"
          novalidate=""
          #updateUserForm="ngForm"
          (ngSubmit)="updateUser()"
        >
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
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
                </div>
                <div class="col">
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
                </div>
              </div>
              <div class="row">
                <div class="col">
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
                </div>
                <div class="col">
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
                </div>
              </div>
              <div class="row">
                <div class="col">
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
                </div>
                <div class="col">
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
                </div>
              </div>
              <div class="row">
                <div class="col">
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
                </div>
                <div class="col">
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
                </div>
              </div>
              <!-- <div class="row">
                <div class="col mb-3">
                  <div class="form-group">
                    <label>About</label>
                    <textarea class="form-control" rows="5" placeholder="My Bio"></textarea>
                  </div>
                </div>
              </div> -->
            </div>
          </div>

          <div class="row">
            <div class="col d-flex justify-content-end">
              <button class="browse-btn" type="submit">Save Changes</button>
            </div>
          </div>
        </form>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          lalafeef
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./profile-settings-form.component.scss'],
})
export class ProfileSettingsFormComponent implements OnInit {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  user: any | undefined;
  toggleSettingsB: boolean = true;

  model: any = {};

  updateUser() {
    this.accountService.updateUser(this.model).subscribe({
      next: () => {
        this.toggleSettings();
      },
      error: (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    });
  }

  toggleSettings() {
    this.toggleSettingsB = !this.toggleSettingsB;
  }

  ngOnInit(): void {
    this.accountService.getUserDetails().subscribe((data) => {
      this.user = data;
    });
  }
}
