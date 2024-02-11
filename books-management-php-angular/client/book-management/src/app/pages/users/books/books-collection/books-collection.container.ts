import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatPaginatorModule } from '@angular/material/paginator';
import { filterSuccessResult } from '@ngneat/query';
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';
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
import { PaginatorComponent } from '../../../../components/paginator/paginator.component';
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
    PaginatorComponent,
    MatBottomSheetModule,
  ],
  selector: 'app-books',
  template: `
    <section class="page">
      <section class="books-container">
        <app-filters
          [value]="query$ | async"
          [bookStatus]="status$ | async"
          (search)="onSearch($event)"
          (filterGenre)="filterGenre($event)"
          (filterStatus)="filterStatus($event)"
          (clearFilters)="clearFilters()"
          [activeGenre]="genre$ | async"
        />
        <section class="books">
          <app-sort-bar
            [showList]="showList"
            (clickEvent)="toggleShowList()"
            [bookCount]="(totalBooksCount$ | async) || 0"
            [selectedSort]="(sort$ | async) || 'title,asc'"
            (sort)="sortBy($event)"
          />

          @if (books.result$ | async; as result) { @if (result.isLoading) {

          <books-loading-state></books-loading-state>

          } @if (result.isSuccess) {

          <app-books-collection-grid-overview
            [books]="(books$ | async) || []"
            *ngIf="!showList"
          />
          <app-books-collection-list-overview
            *ngIf="showList"
            [books]="(books$ | async) || []"
          />

          } @if (result.isError) {
          <p>Error</p>
          } }
          <!-- <ng-container *ngIf="(isLoading$ | async) === false; else loading">
          
          </ng-container> -->
          <ng-container>
            <!-- <div *ngIf="todos.result$ as result.data">
              <p *ngFor="let result of result.data">
                Title: {{ result.title }}
              </p>
            </div> -->
          </ng-container>
          <app-paginator />
        </section>
      </section>
    </section>
  `,
  styleUrls: ['./books-collection.container.scss'],
})
export class BooksCollectionContainer {
  private booksService = inject(BooksService);
  private bookParamService = inject(BookParamService);
  // private useQuery = inject(injectQuery);

  public showList: boolean = false;
  protected author$ = this.bookParamService.author$;
  protected genre$ = this.bookParamService.genre$;
  protected query$ = this.bookParamService.query$;
  protected status$ = this.bookParamService.status$;
  protected sort$ = this.bookParamService.sort$;

  books = inject(BooksService).getBooks();

  protected booksResults$ = combineLatest([
    this.query$,
    this.author$,
    this.genre$,
    this.status$,
    this.sort$,
    // whenever these change value, it will start a call
  ]).pipe(
    switchMap(
      ([search, author, genre, status, sort]) =>
        this.booksService.getBooks({
          search,
          author,
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

  toggleShowList(): void {
    this.showList = !this.showList;
  }

  // protected isLoading$ = this.booksResults$.pipe(map((res) => res.isFetching));
  // protected isLoading$ = of(false);

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
