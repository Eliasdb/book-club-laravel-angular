import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-home',
  template: ` <section class="body">
    <section class="intro-text">
      <h1 *ngIf="currentUser$ | async as user">Hello {{ user }}!</h1>
      <p class="welcome">
        Welcome to the club! Feel free to have a look around.
      </p>
      <button class="browse-btn" routerLink="/books" routerLinkActive="active">
        Browse
      </button>
    </section>
    <section class="footer-container"></section>
  </section>`,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private accountService = inject(AccountService);

  protected currentUser$ = this.accountService.currentUser$;
}
