import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UseQuery, filterSuccess } from '@ngneat/query';
import {
  Observable,
  catchError,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { Book } from '../../../_models/book';
import { RawApiDataBooks } from '../../../_models/rawapi';
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
    MatPaginatorModule,
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
              [books]="data || []"
              *ngIf="!showList"
            />
            <app-books-collection-list-overview
              *ngIf="showList"
              [books]="data || []"
            />
          </ng-container>

          <div class="paginator">
            <mat-paginator
              [length]="resultsLength"
              [pageSize]="15"
              aria-label="Select page of GitHub search results"
            ></mat-paginator>
          </div>
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

  realDatabase: BookDatabase | null | undefined;

  data: Book[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.realDatabase = new BookDatabase(this._httpClient);

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.realDatabase!.getBooks(this.paginator.pageIndex).pipe(
            catchError(() => of(null))
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          this.resultsLength = data.meta.total;
          return data.data;
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

export class BookDatabase {
  constructor(private _httpClient: HttpClient) {}

  getBooks(page: number): Observable<RawApiDataBooks> {
    const href = 'http://localhost:8000/api/v1/books';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get<RawApiDataBooks>(requestUrl);
  }
}
