import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../../_models/book';

@Component({
  selector: 'books-list-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: ` <section class="book-card" *ngIf="book">
    <a routerLink="/books/{{ book.id }}">
      <img src="{{ book.photoUrl }}" alt="{{ book.title }}" />
    </a>
    <div class="card-text">
      <h3>Title: {{ book.title }}</h3>
      <h3>Genre: {{ book.description }}</h3>
      <h3>Genre: {{ book.genre }}</h3>
      <h3>Author: {{ book.author }}</h3>
    </div>
  </section>`,
  styleUrl: './books-list-item.component.scss',
})
export class BooksListItemComponent {
  @Input() book?: Book;
}
