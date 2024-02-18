import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Book } from '../../../../_models/book';
import { BooksService } from '../../../../_services/books-service/books.service';
import { AddBookDialog } from '../../../../components/modals/add-book-modal/add-book-modal.component';

/**
 * @title Table with selection
 */
@Component({
  selector: 'admin-books-collection-overview',
  styleUrls: ['admin-books-collection-overview.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  template: `
    <section class="collection-title">
      <h3>Books</h3>
      <div>
        <button mat-raised-button (click)="openDialog()" color="accent">
          Add book
        </button>
      </div>
    </section>
    <div class="example-container mat-elevation-z8">
      <!-- <div *ngIf="isLoadingResults" class="example-loading-shade"> -->

      <!-- <mat-spinner></mat-spinner> -->
      <!-- @if (isRateLimitReached) {
        <div class="example-rate-limit-reached">
          GitHub's API rate limit has been reached. It will be reset in one minute.
        </div>
      } -->
      <!-- </div> -->

      <div class="example-table-container">
        <table
          mat-table
          [dataSource]="books || []"
          class="mat-elevation-z8"
          matSort
        >
          <ng-container matColumnDef="select">
            <th mat-header-cell *matHeaderCellDef>
              <mat-checkbox
                (change)="$event ? toggleAllRows() : null"
                [checked]="selection.hasValue() && isAllSelected()"
                [indeterminate]="selection.hasValue() && !isAllSelected()"
                [aria-label]="checkboxLabel()"
              >
              </mat-checkbox>
            </th>
            <td mat-cell *matCellDef="let row">
              <mat-checkbox
                (click)="$event.stopPropagation()"
                (change)="$event ? selection.toggle(row) : null"
                [checked]="selection.isSelected(row)"
                [aria-label]="checkboxLabel(row)"
                (click)="clickChecked(row)"
                (click)="clickE()"
                (change)="clickChecked2($event)"
              >
              </mat-checkbox>
            </td>
          </ng-container>
          <ng-container matColumnDef="number">
            <th mat-header-cell *matHeaderCellDef>#</th>

            <td mat-cell *matCellDef="let row">{{ row.id }}</td>
          </ng-container>

          <!-- State Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let row">{{ row.title }}</td>
          </ng-container>

          <ng-container matColumnDef="genre">
            <th mat-header-cell *matHeaderCellDef>Genre</th>
            <td mat-cell *matCellDef="let row">{{ row.genre }}</td>
          </ng-container>
          <!-- Title Column -->
          <ng-container matColumnDef="author">
            <th mat-header-cell *matHeaderCellDef>Author</th>
            <td mat-cell *matCellDef="let row">{{ row.author }}</td>
          </ng-container>

          <ng-container matColumnDef="year">
            <th mat-header-cell *matHeaderCellDef>Year</th>
            <td mat-cell *matCellDef="let row">{{ row.publishedDate }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row">{{ row.status }}</td>
          </ng-container>

          <!-- Created Column -->

          <tr
            mat-header-row
            *matHeaderRowDef="displayedColumns; sticky: true"
          ></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>

      <mat-paginator
        [length]="400"
        [pageSize]="10"
        aria-label="Select page of GitHub search results"
      ></mat-paginator>
    </div>
  `,
})
export class AdminBooksCollectionOverviewComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.dataSource);
  }
  @Input() books?: Book[];
  data: Book[] = [];
  private bookService = inject(BooksService);

  displayedColumns: string[] = [
    'select',
    'number',
    'title',
    'genre',
    'author',
    'status',
    'year',
  ];

  dataSource: MatTableDataSource<Book> | null = null;

  selection = this.bookService.selection;

  private dialog = inject(MatDialog);

  @Output() clickEv = new EventEmitter();

  @Output() itemSelected = new EventEmitter<any>();
  @Output() state = new EventEmitter<boolean>();

  clickChecked(row: Book) {
    this.itemSelected.emit(row);
  }

  clickE() {
    this.clickEv.emit();
  }

  clickChecked2(event: any) {
    this.state.emit(event.checked);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBookDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(numSelected);

    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    if (this.dataSource) this.selection.select(...this.dataSource?.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }
}
