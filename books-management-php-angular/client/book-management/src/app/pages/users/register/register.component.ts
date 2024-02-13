import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'register',
  template: `
    <section class="register-page">
      <form
        #registerForm="ngForm"
        (ngSubmit)="register()"
        autocomplete="on"
        class="form"
      >
        <div class="img-container">
          <img
            src="./assets/registerlogo.png"
            alt="company logo"
            class="logo"
          />
        </div>
        <h2 class="register-title">Sign up</h2>
        <hr class="horizontal-line" />
        <div class="register-inputs">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="name"
              [(ngModel)]="model.name"
              placeholder="Username"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              [(ngModel)]="model.email"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="firstName"
              [(ngModel)]="model.firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="lastName"
              [(ngModel)]="model.lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              [(ngModel)]="model.phoneNumber"
              placeholder="Phone number"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="address"
              [(ngModel)]="model.address"
              placeholder="Address"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="postalCode"
              [(ngModel)]="model.postalCode"
              placeholder="Postal code"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              name="city"
              [(ngModel)]="model.city"
              placeholder="City"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              [(ngModel)]="model.password"
              placeholder="Password"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              name="confirm-password"
              [(ngModel)]="model.password_confirmation"
              placeholder="Confirm password"
              required
            />
          </div>
        </div>

        <div class="buttons">
          <button class="register-btn" type="submit">Register</button>
          <button class="cancel-btn" (click)="cancel()" type="button">
            Cancel
          </button>
          <p class="text">
            Already have an account?
            <a routerLink="/login" class="click-here"> Click here </a> to log
            in.
          </p>
        </div>
      </form>
      <div class="stepper-container">
        <form [formGroup]="formGroup">
          <mat-vertical-stepper
            #linearVerticalStepper="matVerticalStepper"
            formArrayName="formArray"
            [linear]="true"
          >
            <mat-step formGroupName="0" [stepControl]="formArray?.get([0])">
              <ng-template matStepLabel>Personal details</ng-template>
              <div class="form-container">
                <div class="form-row">
                  <label>First name</label>
                  <div>
                    <mat-form-field>
                      <input
                        matInput
                        formControlName="firstNameFormCtrl"
                        required
                      />
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <label>Last name</label>
                  <div>
                    <mat-form-field>
                      <input
                        matInput
                        formControlName="lastNameFormCtrl"
                        required
                      />
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <label>Email</label>
                  <div>
                    <mat-form-field>
                      <input
                        matInput
                        formControlName="emailFormCtrl"
                        required
                      />
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <label>Username</label>
                  <div>
                    <mat-form-field>
                      <input
                        matInput
                        formControlName="userNameFormCtrl"
                        required
                      />
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <label>Phone</label>
                  <div>
                    <mat-form-field>
                      <input
                        matInput
                        formControlName="phoneNumberFormCtrl"
                        required
                      />
                    </mat-form-field>
                  </div>
                </div>

                <div class="form-row">
                  <label>Password</label>
                  <div>
                    <mat-form-field>
                      <input
                        matInput
                        formControlName="passwordFormCtrl"
                        required
                      />
                    </mat-form-field>
                  </div>
                </div>
              </div>

              <div>
                <button mat-button matStepperNext>Next</button>
              </div>
            </mat-step>

            <mat-step formGroupName="1" [stepControl]="formArray?.get([1])">
              <ng-template matStepLabel>Address</ng-template>

              <mat-form-field>
                <mat-label>Address</mat-label>
                <input matInput formControlName="addressFormCtrl" />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Address</mat-label>
                <input matInput formControlName="addressFormCtrl" />
              </mat-form-field>

              <div>
                <button mat-button matStepperPrevious>Back</button>
                <button mat-button matStepperNext>Next</button>
              </div>
            </mat-step>

            <mat-step>
              <ng-template matStepLabel>Confirm</ng-template>
              Everything seems correct.
              <div>
                <button mat-button>Done</button>
                <button
                  type="button"
                  mat-button
                  (click)="linearVerticalStepper.reset()"
                >
                  Reset
                </button>
              </div>
            </mat-step>
          </mat-vertical-stepper>
        </form>
      </div>
    </section>
  `,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  model: any = {};

  formGroup!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | any {
    return this.formGroup.get('formArray');
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstNameFormCtrl: ['', Validators.required],
          lastNameFormCtrl: ['', Validators.required],
          userNameFormCtrl: ['', Validators.required],
          emailFormCtrl: ['', Validators.required],
          passwordFormCtrl: ['', Validators.required],
          phoneNumberFormCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          addressFormCtrl: ['', Validators.required],
        }),
      ]),
    });
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
        this.toastr.success('Registered successfully!');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
