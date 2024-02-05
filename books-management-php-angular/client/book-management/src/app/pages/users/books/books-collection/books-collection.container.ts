import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UseQuery, filterSuccess } from '@ngneat/query';
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { BookParamService } from '../../../../_services/book-param-service/book-param.service';
import { SEARCH_QUERY_PARAM } from '../../../../_services/books-service/book-param.type';
import { BooksService } from '../../../../_services/books-service/books.service';
import { LoadingStateComponent } from '../../../../components/loading-state/loading-state.component';
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
        <app-filters [value]="query$ | async" (search)="onSearch($event)" />
        <section class="books">
          <app-sort-bar
            [showList]="showList"
            (clickEvent)="toggleShowList()"
            [bookCount]="totalBooksCount$ | async"
          />

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
export class BooksCollectionContainer implements OnInit {
  private booksService = inject(BooksService);
  private bookParamService = inject(BookParamService);
  private useQuery = inject(UseQuery);

  showList: boolean = false;

  private author$ = this.bookParamService.author$;
  protected query$ = this.bookParamService.query$;

  private booksResults$ = combineLatest([this.author$, this.query$]).pipe(
    switchMap(
      ([author, query]) =>
        this.useQuery(this.booksService.queryBooks({ author, query })).result$
    ),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  protected isLoading$ = this.booksResults$.pipe(map((res) => res.isFetching));
  // protected isLoading$ = of(false);

  protected books$ = this.booksResults$.pipe(
    filterSuccess(),
    map((res) => res.data.data)
  );

  protected totalBooksCount$ = this.booksResults$.pipe(
    filterSuccess(),
    map((res) => res.data.meta.total)
  );

  toggleShowList(): void {
    this.showList = !this.showList;
  }

  ngOnInit(): void {}

  protected onSearch(query: string) {
    console.log('onSearch', query);
    this.bookParamService.navigate({ [SEARCH_QUERY_PARAM]: query });
  }

  resultsLength = 0;
}
