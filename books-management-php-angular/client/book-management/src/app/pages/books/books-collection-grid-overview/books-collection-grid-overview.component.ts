import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Book } from 'src/app/_models/book';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-books-collection-grid-overview',
  template: `
    <section class="books-grid-overview">
      <section class="book-card">
        <img
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          alt="book"
        />
        <div class="card-text">
          <p>Available</p>
        </div>
      </section>
      <section class="book-card">
        <img
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          alt="book"
        />
        <p>Available</p>
      </section>
      <section class="book-card">
        <img
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          alt="book"
        />
        <p>Loaned out</p>
      </section>
    </section>
  `,
  styleUrls: ['./books-collection-grid-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksCollectionGridOverviewComponent implements OnInit {
  @Input() books?: Book[];

  ngOnInit(): void {}
  ngOnChanges() {
    console.log(this.books);
  }
}
