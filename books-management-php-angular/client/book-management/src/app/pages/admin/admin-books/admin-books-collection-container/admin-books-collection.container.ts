import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filterSuccessResult } from '@ngneat/query';
import {
  BehaviorSubject,
  combineLatest,
  map,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { Book } from '../../../../_models/book';
import { BookParamService } from '../../../../_services/book-param-service/book-param.service';
import { SORT_QUERY_PARAM } from '../../../../_services/books-service/book-param.type';
import { BooksService } from '../../../../_services/books-service/books.service';
import { BottomSheetComponent } from '../../../../components/bottom-sheet/bottom-sheet.component';
import {
  AdminBooksCollectionOverview2Component,
  AdminBooksCollectionOverviewComponent,
} from '../admin-books-collection-overview/admin-books-collection-overview.component';
@Component({
  standalone: true,
  imports: [
    AdminBooksCollectionOverviewComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    CommonModule,
    AdminBooksCollectionOverview2Component,
  ],
  selector: 'admin-books-collection-container',
  template: ` <section class="collection-container">
    <!-- <button mat-raised-button ">Open thing</button> -->

    @if (booksResults$ | async; as result) { @if (result.isSuccess) {
    <admin-books-collection-overview
      (sortbyId)="sortById('id,asc')"
      [books]="(books$ | async) || []"
      (state)="setState($event)"
      (itemSelected)="onItemSelected($event)"
      (clickEv)="openBottomSheet()"
    />
    <admin-books-collection-overview2 />
    } }
  </section>`,
  styleUrls: ['./admin-books-collection.container.scss'],
})
export class AdminBooksCollectionContainer {
  private _bottomSheet = inject(MatBottomSheet);

  private booksService = inject(BooksService);
  private bookParamService = inject(BookParamService);

  // protected books = inject(BooksService).getAdminBooks();
  protected author$ = this.bookParamService.author$;
  protected genre$ = this.bookParamService.genre$;
  protected query$ = this.bookParamService.query$;
  protected status$ = this.bookParamService.status$;
  protected sort$ = this.bookParamService.sort$;

  public showList: boolean = false;
  private isSheetClosed$ = this.booksService.isSheetClosed$;

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
        this.booksService.queryAdminBooks({
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
    map((res) => res.data.data.count)
  );

  protected books$ = this.booksResults$.pipe(
    // don't need to subscribe because async pipe does it
    filterSuccessResult(),
    map((res) => res.data?.data.items)
  );

  protected sortById(sort: string) {
    this.bookParamService.navigate({ [SORT_QUERY_PARAM]: sort });
  }

  selectedItems$ = this.booksService.selectedItems$;
  isChecked$ = this.booksService.isChecked$;

  selectedIds$ = new BehaviorSubject<any[]>([]);

  setState(state: boolean) {
    this.isChecked$.pipe(take(1)).subscribe(() => {
      this.isChecked$.next(state);
    });
  }

  removeSelection() {
    this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
      if (selectedItems) {
        const selectedIds = selectedItems.map((item) => item.id);
        this.selectedIds$?.next(selectedIds);
      }
    });

    // this.items$.pipe(take(1)).subscribe((items) => {
    //   const filteredItems = items?.filter(
    //     ({ id }) => !this.selectedIds$?.getValue().includes(id)
    //   );
    //   this.items$.next(filteredItems);
    // });

    // localStorage.setItem('cart', JSON.stringify(this.items$.value));
  }

  onItemSelected(selected: Book) {
    if (this.isChecked$.value === true) {
      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        this.selectedItems$.next([...selectedItems, selected]);
      });
    }

    if (this.isChecked$.value === false) {
      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        const selectedId: number = selected.id || 0;
        const selectedArray: number[] = [];
        selectedArray.push(selectedId);

        const filteredItems = selectedItems.filter(
          ({ id }) => !selectedArray?.includes(id)
        );

        this.selectedItems$.next(filteredItems);
      });
    }
  }

  openBottomSheet(): void {
    if (this.isSheetClosed$.getValue() === true) {
      this._bottomSheet.open(BottomSheetComponent, {
        hasBackdrop: false,
        restoreFocus: false,
        disableClose: true,
      });
      this.isSheetClosed$.next(false);
    }
  }
}
