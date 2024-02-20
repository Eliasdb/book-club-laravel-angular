import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../_models/user';
import { AccountService } from '../../../_services/account-service/account.service';
import { PortalSnackbar } from '../../../components/snackbars/portal-snackbar/portal-snackbar.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'login',
  template: ` <section class="login-page">
    <form
      #registerForm="ngForm"
      (ngSubmit)="login()"
      autocomplete="off"
      class="form"
    >
      <div class="img-container">
        <img src="./assets/login-logo.png" alt="company logo" class="logo" />
      </div>
      <h2 class="login-title">Login</h2>
      <hr />
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="name"
          [(ngModel)]="user.name"
          placeholder="Username"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          name="password"
          [(ngModel)]="user.password"
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
  private snackBar = inject(MatSnackBar);

  protected currentUser$ = this.accountService.currentUser$;
  user: User = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    city: '',
  };

  login() {
    this.accountService.login(this.user).subscribe({
      next: () => {
        this.snackBar.openFromComponent(PortalSnackbar, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          data: { user: this.user.name, action: 'logged in' },
        });
        this.router.navigateByUrl('/home');
      },
      error: (error) => {},
    });
  }
}
