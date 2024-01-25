import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Book } from 'src/app/_models/book';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  selector: 'app-books-collection-grid-overview',
  template: `
    <section class="books-grid-overview">
      <div *ngFor="let book of books" class="col-2">
        <app-book-card [book]="book" />
      </div>
    </section>
  `,
  styleUrls: ['./books-collection-grid-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksCollectionGridOverviewComponent implements OnInit {
  @Input() books?: Book[];

  ngOnInit(): void {}
  ngOnChanges() {}
}
