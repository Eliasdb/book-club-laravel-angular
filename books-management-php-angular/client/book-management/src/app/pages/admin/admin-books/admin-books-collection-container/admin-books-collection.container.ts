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
import { combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { BookParamService } from '../../../../_services/book-param-service/book-param.service';
import { BooksService } from '../../../../_services/books-service/books.service';
import { BottomSheetComponent } from '../../../../components/bottom-sheet/bottom-sheet.component';
import { AdminBooksCollectionOverviewComponent } from '../admin-books-collection-overview/admin-books-collection-overview.component';
@Component({
  standalone: true,
  imports: [
    AdminBooksCollectionOverviewComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    CommonModule,
  ],
  selector: 'admin-books-collection-container',
  template: ` <section class="collection-container">
    <button mat-raised-button (click)="openBottomSheet()">Open thing</button>

    @if (booksResults$ | async; as result) { @if (result.isSuccess) {
    <admin-books-collection-overview [books]="(books$ | async) || []" />
    } }
  </section>`,
  styleUrls: ['./admin-books-collection.container.scss'],
})
export class AdminBooksCollectionContainer {
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      hasBackdrop: false,
      restoreFocus: false,
    });
  }

  private booksService = inject(BooksService);
  private bookParamService = inject(BookParamService);

  // protected books = inject(BooksService).getAdminBooks();
  protected author$ = this.bookParamService.author$;
  protected genre$ = this.bookParamService.genre$;
  protected query$ = this.bookParamService.query$;
  protected status$ = this.bookParamService.status$;
  protected sort$ = this.bookParamService.sort$;

  public showList: boolean = false;

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
    map((res) => res.data.count)
  );

  protected books$ = this.booksResults$.pipe(
    // don't need to subscribe because async pipe does it
    filterSuccessResult(),
    map((res) => res.data?.items)
  );
}
