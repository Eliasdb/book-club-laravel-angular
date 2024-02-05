import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../../_models/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="book-card" *ngIf="book">
      <a routerLink="/books/{{ book.id }}">
        <img src="{{ book.photoUrl }}" alt="{{ book.title }}" />
      </a>
      <div class="card-text">
        <h3>{{ book.title }}</h3>
      </div>
    </section>
  `,
  styleUrls: ['./books-card.component.scss'],
})
export class BooksCardComponent {
  @Input() book?: Book;
}
