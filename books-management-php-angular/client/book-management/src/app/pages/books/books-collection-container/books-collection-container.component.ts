import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header/header.component';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../../_services/books.service';
import { Book } from '../../../_models/book';
import { Observable } from 'rxjs';
import { BooksCollectionGridOverviewComponent } from '../books-collection-grid-overview/books-collection-grid-overview.component';
import { BooksCollectionListOverviewComponent } from '../books-collection-list-overview/books-collection-list-overview.component';
import { BookFiltersComponent } from '../book-filters/book-filters.component';
import { SortBarComponent } from '../books-sort-bar/books-sort-bar.component';

@Component({
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, BooksCollectionGridOverviewComponent, BooksCollectionListOverviewComponent, BookFiltersComponent, SortBarComponent],
  selector: 'app-books',
  template: `
  <section class="page">
    <app-header />
    <section class="books-container">
      <app-filters/>
      <section class="books">
        <app-sort-bar [showList]="showList" (clickEvent)="toggleShowList()" />
        <app-books-collection-grid-overview [books]="books$ | async" *ngIf="!showList"/>
        <app-books-collection-list-overview *ngIf="showList"/>

      </section>
    </section>
    <app-footer/>
</section>
  `,
  styleUrls: ['./books-collection-container.component.scss']
})
export class BooksCollectionContainerComponent implements OnInit {
  showList: boolean = false;
  books$: Observable<Book[]> | undefined;

  private booksService = inject(BooksService);
  
  toggleShowList(): void {    
    this.showList = !this.showList;
  }

  ngOnInit(): void {
    this.books$ = this.booksService.getBooks();
    
  }
}
