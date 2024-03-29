import { Component, inject } from '@angular/core';
import { filterSuccessResult } from '@ngneat/query';
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { SharedModule } from '../../../../_modules/shared.module';
import { BookParamService } from '../../../../_services/book-param-service/book-param.service';
import {
  AUTHORS_QUERY_PARAM,
  GENRE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
  SORT_QUERY_PARAM,
  STATUS_QUERY_PARAM,
} from '../../../../_services/books-service/book-param.type';
import { BooksService } from '../../../../_services/books-service/books.service';
import { LoadingStateComponent } from '../../../../components/loading-state/loading-state.component';
import { BooksCollectionGridOverviewComponent } from '../books-collection-grid-overview/books-collection-grid-overview.component';
import { BooksCollectionListOverviewComponent } from '../books-collection-list-overview/books-collection-list-overview.component';
import { BooksFiltersComponent } from '../books-filters/books-filters.component';
import { BooksSortBarComponent } from '../books-sort-bar/books-sort-bar.component';

@Component({
  standalone: true,
  imports: [
    SharedModule,
    BooksCollectionGridOverviewComponent,
    BooksCollectionListOverviewComponent,
    BooksFiltersComponent,
    BooksSortBarComponent,
    LoadingStateComponent,
  ],
  selector: 'books-container',
  template: `
    <section class="page">
      <section class="books-wrapper">
        <section class="books-container">
          <book-filters
            [value]="query$ | async"
            [bookStatus]="status$ | async"
            [activeGenre]="genre$ | async"
            (search)="onSearch($event)"
            (filterGenre)="filterGenre($event)"
            (filterStatus)="filterStatus($event)"
            (clearFilters)="clearFilters()"
          />
          <section class="books">
            <books-sort-bar
              [showList]="showList"
              [bookCount]="(totalBooksCount$ | async) || 0"
              [selectedSort]="(sort$ | async) || 'title,asc'"
              (sort)="sortBy($event)"
              (clickEvent)="toggleShowList($event)"
            />

            @if (booksResults$ | async; as result) { @if (result.isSuccess) {

            <section class="collection-container">
              <books-collection-grid-overview
                [books]="(books$ | async) || []"
                *ngIf="!showList"
              />
              <books-collection-list-overview
                *ngIf="showList"
                [books]="(books$ | async) || []"
              />
            </section>

            <!-- <div class="pag-container"><paginator /></div> -->

            } @if (result.isLoading) {
            <books-loading-state></books-loading-state>

            } @if (result.isError) {
            <p>Error</p>
            } }
          </section>
        </section>
      </section>
    </section>
  `,
  styleUrls: ['./books-collection.container.scss'],
})
export class BooksCollectionContainer {
  private booksService = inject(BooksService);
  private bookParamService = inject(BookParamService);

  // protected books = inject(BooksService).getBooks();
  protected author$ = this.bookParamService.author$;
  protected genre$ = this.bookParamService.genre$;
  protected query$ = this.bookParamService.query$;
  protected status$ = this.bookParamService.status$;
  protected sort$ = this.bookParamService.sort$;

  public showList: boolean = false;

  protected booksResults$ = combineLatest([
    this.query$,
    // this.author$,
    this.genre$,
    this.status$,
    this.sort$,
    // whenever these change value, it will start a call
  ]).pipe(
    switchMap(
      ([search, genre, status, sort]) =>
        this.booksService.queryBooks({
          search,
          genre,
          status,
          sort,
        }).result$
    ),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  protected totalBooksCount$ = this.booksResults$.pipe(
    filterSuccessResult(),
    map((res) => res.data.count)
  );

  protected books$ = this.booksResults$.pipe(
    // don't need to subscribe because async pipe does it
    filterSuccessResult(),
    map((res) => res.data?.items)
  );

  toggleShowList(state: boolean): void {
    this.showList = state;
  }

  protected onSearch(query: string) {
    this.bookParamService.navigate({
      [AUTHORS_QUERY_PARAM]: query,
      [SEARCH_QUERY_PARAM]: query,
    });
  }

  protected filterGenre(genre: string) {
    this.bookParamService.navigate({ [GENRE_QUERY_PARAM]: genre });
  }

  protected filterStatus(status: string) {
    this.bookParamService.navigate({ [STATUS_QUERY_PARAM]: status });
  }

  protected sortBy(sort: string) {
    this.bookParamService.navigate({ [SORT_QUERY_PARAM]: sort });
  }

  protected clearFilters() {
    this.bookParamService.clearParams();
  }
}
