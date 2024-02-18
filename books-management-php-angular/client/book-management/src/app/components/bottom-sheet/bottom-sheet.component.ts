import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { take } from 'rxjs';
import { BooksService } from '../../_services/books-service/books.service';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  selector: 'bottom-sheet',
  template: `
    <mat-toolbar>
      <div class="selected-books">
        <span>{{ this.selectedItems$.getValue().length }} books selected</span>
        <span>|</span>
        <a mat-raised-button (click)="clearSelection()" class="clear-btn"
          >Clear</a
        >
      </div>

      <span class="example-spacer"></span>

      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with delete icon"
        (click)="deleteSelection()"
      >
        <mat-icon
          class="example-icon"
          aria-hidden="false"
          aria-label="Example delete icon"
          >delete</mat-icon
        >
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  private bookService = inject(BooksService);

  selectedItems$ = this.bookService.selectedItems$;
  selection = this.bookService.selection;
  deleteBook = this.bookService.deleteBook();

  private _bottomSheet = inject(MatBottomSheet);

  clearSelection(): void {
    this.selectedItems$.next([]);
    this.bookService.isSheetClosed$.next(true);
    this.selection.clear();
    this._bottomSheet.dismiss(BottomSheetComponent);
  }

  deleteSelection() {
    this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
      selectedItems.forEach((item) => {
        this.deleteBook.mutate(item.id);
      });
    });
    this.selectedItems$.next([]);
  }
}
