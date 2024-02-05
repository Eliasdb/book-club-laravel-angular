import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../../_models/book';
import { BooksCardComponent } from '../books-card/books-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, BooksCardComponent],
  selector: 'app-books-collection-list-overview',
  template: `
    <section class="books-list-overview">
      <div *ngFor="let book of books" class="col-2">
        <app-book-card [book]="book" />
      </div>
    </section>
  `,
  styleUrls: ['./books-collection-list-overview.component.scss'],
})
export class BooksCollectionListOverviewComponent {
  @Input() books?: Book[];
}
