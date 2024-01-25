import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-register',
  template: ` <section class="register-page">
    <form
      #registerForm="ngForm"
      (ngSubmit)="register()"
      autocomplete="on"
      class="form"
    >
      <div class="img-container">
        <img src="./assets/registerlogo.png" alt="company logo" class="logo" />
      </div>
      <h2 class="register-title">Sign up</h2>
      <hr />
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="name"
          [(ngModel)]="model.name"
          placeholder="Name"
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
      <div class="buttons">
        <button class="register-btn" type="submit">Register</button>
        <button class="cancel-btn" (click)="cancel()" type="button">
          Cancel
        </button>
        <p>
          Already have an account?
          <a routerLink="/login" class="click-here"> Click here </a> to log in.
        </p>
      </div>
    </form>
  </section>`,
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
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
