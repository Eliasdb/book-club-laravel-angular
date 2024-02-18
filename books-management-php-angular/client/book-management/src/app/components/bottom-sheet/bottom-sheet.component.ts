import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { take } from 'rxjs';
import { AdminService } from '../../_services/admin-service/admin.service';

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
        <span>{{ this.selectedBooks$.getValue().length }} books selected</span>
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
  private adminService = inject(AdminService);

  selectedBooks$ = this.adminService.selectedBooks$;
  selection = this.adminService.selection;
  deleteBook = this.adminService.deleteBook();

  private _bottomSheet = inject(MatBottomSheet);

  clearSelection(): void {
    this.selectedBooks$.next([]);
    this.selection.clear();
    this.adminService.isSheetClosed$.next(true);
    this._bottomSheet.dismiss(BottomSheetComponent);
  }

  deleteSelection() {
    this.selectedBooks$.pipe(take(1)).subscribe((selectedBooks) => {
      selectedBooks.forEach((book) => {
        if (book.id) this.deleteBook.mutate(book.id);
      });
      this.selectedBooks$.next([]);
    });
  }
}
