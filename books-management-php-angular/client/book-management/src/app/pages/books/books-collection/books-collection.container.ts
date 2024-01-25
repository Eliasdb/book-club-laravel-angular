import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UseQuery, filterSuccess } from '@ngneat/query';
import { map, of, switchMap } from 'rxjs';
import { BookParamService } from '../../../_services/book-param-service/book-param.service';
import { BooksService } from '../../../_services/books-service/books.service';
import { LoadingStateComponent } from '../../../components/loading-state/loading-state.component';
import { BooksCollectionGridOverviewComponent } from '../books-collection-grid-overview/books-collection-grid-overview.component';
import { BooksCollectionListOverviewComponent } from '../books-collection-list-overview/books-collection-list-overview.component';
import { BooksFiltersComponent } from '../books-filters/books-filters.component';
import { SortBarComponent } from '../books-sort-bar/books-sort-bar.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    BooksCollectionGridOverviewComponent,
    BooksCollectionListOverviewComponent,
    BooksFiltersComponent,
    SortBarComponent,
    LoadingStateComponent,
  ],
  selector: 'app-books',
  template: `
    <section class="page">
      <section class="books-container">
        <app-filters />
        <section class="books">
          <app-sort-bar [showList]="showList" (clickEvent)="toggleShowList()" />

          <ng-container *ngIf="(isLoading$ | async) === false; else loading">
            <app-books-collection-grid-overview
              [books]="(books$ | async) || []"
              *ngIf="!showList"
            />
            <app-books-collection-list-overview
              *ngIf="showList"
              [books]="(books$ | async) || []"
            />
          </ng-container>
        </section>
      </section>
    </section>

    <ng-template #loading>
      <books-loading-state></books-loading-state>
    </ng-template>
  `,
  styleUrls: ['./books-collection.container.scss'],
})
export class BooksCollectionContainerComponent implements OnInit {
  private booksService = inject(BooksService);
  private bookParamService = inject(BookParamService);
  private useQuery = inject(UseQuery);

  showList: boolean = false;

  private author$ = this.bookParamService.author$;

  private booksResults$ = this.author$.pipe(
    switchMap(
      (author) =>
        this.useQuery(this.booksService.queryBooks({ author })).result$
    )
  );

  // protected isLoading$ = this.booksResults$.pipe(map((res) => res.isFetching));
  protected isLoading$ = of(false);

  books$ = this.booksResults$.pipe(
    filterSuccess(),
    map((res) => res.data)
  );

  toggleShowList(): void {
    this.showList = !this.showList;
  }

  ngOnInit(): void {
    this.author$.subscribe((res) => {
      console.log('author', res);
    });
  }
}
