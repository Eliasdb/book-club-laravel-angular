import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccountService } from '../../_services/account.service';

@Component({
  standalone:true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  selector: 'app-home',
  template: `
   <section class="body">
      <app-header />
    <section class="intro-text">
     <h1 *ngIf="currentUser$ | async as user">Hello {{user}}!</h1>
     <p>Welcome to the club! Feel free to have a look around.</p>
      <button class="browse-btn" routerLink="/books" routerLinkActive="active">Browse</button>
    </section>
    <section class="footer-container">
      <app-footer/>
    </section>
  </section>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    private accountService = inject(AccountService);

   protected currentUser$ = this.accountService.currentUser$;

}
