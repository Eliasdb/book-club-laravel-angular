import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../../_services/account-service/account.service';
import { PortalSnackbar } from '../../snackbars/portal-snackbar/portal-snackbar.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <section class="nav-container">
      <ul *ngIf="!hideLauncher" class="nav-items">
        <li>
          <a class="nav-link" routerLink="/home" routerLinkActive="active">
            Home
          </a>
        </li>
        <li>
          <a class="nav-link" routerLink="/books" routerLinkActive="active">
            Books
          </a>
        </li>

        <li>
          <a class="nav-link" routerLink="/profile" routerLinkActive="active">
            Profile
          </a>
        </li>
        <li>
          <a
            class="nav-link"
            routerLink="/admin/stats"
            routerLinkActive="active"
          >
            Admin
          </a>
        </li>
      </ul>
      <ul *ngIf="hideLauncher" class="nav-items">
        <li>
          <a
            class="nav-link"
            routerLink="/home"
            routerLinkActive="active-lightgreen"
          >
            Home
          </a>
        </li>
        <li>
          <a
            class="nav-link"
            routerLink="/books"
            routerLinkActive="active-lightgreen"
          >
            Books
          </a>
        </li>

        <li>
          <a
            class="nav-link"
            routerLink="/profile"
            routerLinkActive="active-lightgreen"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            class="nav-link"
            routerLink="/admin/stats"
            routerLinkActive="active"
          >
            Admin
          </a>
        </li>
      </ul>
      <div class="logout-btn">
        <a routerLink="/logout" (click)="logout()"> Logout</a>
        <img
          src="./assets/logout-btn.svg"
          alt="Logout button"
          class="logout-svg"
          *ngIf="hideLauncher"
        />
        <img
          src="./assets/logout-btn.svg"
          alt="Logout button"
          class="logout-svg-dark"
          *ngIf="!hideLauncher"
        />
      </div>
    </section>
  `,
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input()
  hideLauncher!: boolean;

  private accountService = inject(AccountService);
  private snackBar = inject(MatSnackBar);
  userString = localStorage.getItem('user');

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        if (this.userString) {
          const user: string = JSON.parse(this.userString);
          this.snackBar.openFromComponent(PortalSnackbar, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            data: { user: user, action: 'logged out' },
          });
        }
      },
      error: (error) => {},
    });
  }
}
