import { Component, Input } from '@angular/core';
import { Book } from '../../../../_models/book';

@Component({
  selector: 'books-list-item',
  standalone: true,
  imports: [],
  template: ``,
  styleUrl: './books-list-item.component.scss',
})
export class BooksListItemComponent {
  @Input() book?: Book;
}
