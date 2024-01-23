import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-books-collection-list-overview',
  template: `
   <section class="books-list-overview">
    <section class="book-card">
        <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book">
        <div class="card-text">
        <p>Available</p>
        </div>
    </section>
    <section class="book-card">
        <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book">
         <p>Available</p>
    </section>
    <section class="book-card">
        <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book">
        <p>Loaned out</p>
    </section>
</section>
`,
  styleUrls: ['./books-collection-list-overview.component.scss']
})
export class BooksCollectionListOverviewComponent {
}
