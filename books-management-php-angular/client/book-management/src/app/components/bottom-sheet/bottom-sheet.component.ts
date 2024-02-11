import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
        <span>0 books selected</span>
        <span>|</span>
        <a mat-raised-button (click)="closeBottomSheet()" class="clear-btn"
          >Clear</a
        >
      </div>

      <span class="example-spacer"></span>

      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with delete icon"
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
  private _bottomSheet = inject(MatBottomSheet);

  closeBottomSheet(): void {
    this._bottomSheet.dismiss(BottomSheetComponent);
  }
}
