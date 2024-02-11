import { Component, inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
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
  ],
  selector: 'admin-books-collection-container',
  template: ` <section class="collection-container">
    <button mat-raised-button (click)="openBottomSheet()">Open thing</button>

    <admin-books-collection-overview />
  </section>`,
  styleUrls: ['./admin-books-collection.container.scss'],
})
export class AdminBooksCollectionContainer {
  constructor() {}
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      hasBackdrop: false,
      restoreFocus: false,
    });
  }
}
