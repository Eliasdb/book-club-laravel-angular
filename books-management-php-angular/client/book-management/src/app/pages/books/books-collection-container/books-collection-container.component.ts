import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UseQuery, filterSuccess } from '@ngneat/query';
import { map } from 'rxjs';
import { BooksService } from '../../../_services/books.service';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header/header.component';
import { LoadingStateComponent } from '../../../components/loading-state/loading-state.component';
import { BookFiltersComponent } from '../book-filters/book-filters.component';
import { BooksCollectionGridOverviewComponent } from '../books-collection-grid-overview/books-collection-grid-overview.component';
import { BooksCollectionListOverviewComponent } from '../books-collection-list-overview/books-collection-list-overview.component';
import { SortBarComponent } from '../books-sort-bar/books-sort-bar.component';

@Component({
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    BooksCollectionGridOverviewComponent,
    BooksCollectionListOverviewComponent,
    BookFiltersComponent,
    SortBarComponent,
    LoadingStateComponent,
  ],
  selector: 'app-books',
  template: `
    <section class="page">
      <app-header />
      <section class="books-container">
        <app-filters />
        <section class="books">
          <app-sort-bar [showList]="showList" (clickEvent)="toggleShowList()" />

          <ng-container *ngIf="(isLoading$ | async) === false; else loading">
            <app-books-collection-grid-overview
              [books]="(books$ | async) || []"
              *ngIf="!showList"
            />
            <app-books-collection-list-overview *ngIf="showList" />
          </ng-container>
        </section>
      </section>
      <app-footer />
    </section>

    <ng-template #loading>
      <books-loading-state></books-loading-state>
    </ng-template>
  `,
  styleUrls: ['./books-collection-container.component.scss'],
})
export class BooksCollectionContainerComponent implements OnInit {
  private booksService = inject(BooksService);
  private useQuery = inject(UseQuery);

  showList: boolean = false;

  booksResults$ = this.useQuery(this.booksService.queryBooks()).result$;
  protected isLoading$ = this.booksResults$.pipe(map((res) => res.isFetching));
  books$ = this.booksResults$.pipe(
    filterSuccess(),
    map((res) => res.data)
  );

  toggleShowList(): void {
    this.showList = !this.showList;
  }

  ngOnInit(): void {}
}
