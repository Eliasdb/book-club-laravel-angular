import { Component } from '@angular/core';
import { HomePostItemComponent } from '../home-post-item/home-post-item.component';

@Component({
  selector: 'home-posts-container',
  standalone: true,
  imports: [HomePostItemComponent],
  template: `
    <section class="posts-container">
      <home-post-item />
      <home-post-item />
      <home-post-item />
      <home-post-item />
    </section>
  `,
  styleUrl: './home-posts.container.scss',
})
export class HomePostsContainer {}
