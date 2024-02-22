import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-stats-card',
  standalone: true,
  imports: [],
  template: `<article>
    <header>
      <span class="count">{{ count }}</span>
      <span class="icon"
        ><img src="./assets/add-book.svg" alt="add-books"
      /></span>
    </header>
    <h5 class="title">{{ subText }}</h5>
  </article>`,
  styleUrl: './admin-stats-card.component.scss',
})
export class AdminStatsCardComponent {
  @Input() count?: number;
  @Input() subText?: string;
}
