import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-login',
  template: ` <section class="login-page">
    <form
      #registerForm="ngForm"
      (ngSubmit)="login()"
      autocomplete="off"
      class="form"
    >
      <div class="img-container">
        <img src="./assets/registerlogo.png" alt="company logo" class="logo" />
      </div>
      <h2 class="login-title">Login</h2>
      <hr />
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="name"
          [(ngModel)]="model.name"
          placeholder="Name"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          name="password"
          [(ngModel)]="model.password"
          placeholder="Password"
        />
      </div>
      <div class="buttons">
        <button class="login-btn" type="submit">Login</button>
        <p>
          Don't have an account?
          <a routerLink="/register" class="click-here"> Click here </a> to sign
          up.
        </p>
      </div>
    </form>
  </section>`,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  protected currentUser$ = this.accountService.currentUser$;
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.toastr.success(`Logged in successfully!`);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        // console.log(error.error.errors.name[0]);

        if (error.error.errors.name[0]) {
          this.toastr.error(error.error.errors.name[0]);
        }

        if (error.error.errors.password[0]) {
          this.toastr.error(error.error.errors.password[0]);
        }
      },
    });
  }
}
