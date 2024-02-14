import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../../_services/account-service/account.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatBottomSheetModule],
  selector: 'home',
  template: ` <section class="body">
    <section class="intro-text">
      <h1 *ngIf="currentUser$ | async as user">Hello {{ user }}!</h1>
      <p class="welcome">
        Welcome to the club! Feel free to have a look around.
      </p>
      <button mat-raised-button routerLink="/books">Browse</button>
    </section>
    <section class="footer-container"></section>
  </section>`,
  styleUrls: ['./home.container.scss'],
})
export class HomeContainer {
  private accountService = inject(AccountService);

  protected currentUser$ = this.accountService.currentUser$;
}
