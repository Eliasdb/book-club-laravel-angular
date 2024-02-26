import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../../_services/account-service/account.service';
import { HomePostPromptComponent } from '../home-post-prompt/home-post-prompt.component';
import { HomePostsContainer } from '../home-posts-container/home-posts.container';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatBottomSheetModule,
    HomePostPromptComponent,
    HomePostsContainer,
  ],
  selector: 'home',
  template: ` <section class="body">
    <home-post-prompt />
    <home-posts-container />
  </section>`,
  styleUrls: ['./home.container.scss'],
})
export class HomeContainer {
  private accountService = inject(AccountService);

  protected currentUser$ = this.accountService.currentUser$;
}
