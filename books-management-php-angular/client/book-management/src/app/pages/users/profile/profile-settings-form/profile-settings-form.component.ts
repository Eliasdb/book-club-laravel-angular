import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    RouterLink,
  ],
  selector: 'app-profile-settings-form',
  template: ` <mat-tab-group>
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="example-tab-icon">person</mat-icon>
        Details
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
            <button mat-raised-button type="submit">Save changes</button>
          </div>
        </form>
      </div>
    </mat-tab>
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="example-tab-icon">favorite</mat-icon>
        Favourites
      </ng-template>
      <div *ngIf="user" class="fav-container">
        <div class="fav-item" *ngFor="let favourite of user.data.favourites">
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
  styleUrls: ['./profile-settings-form.component.scss'],
})
export class ProfileSettingsFormComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  @Input() user: any;
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
}
