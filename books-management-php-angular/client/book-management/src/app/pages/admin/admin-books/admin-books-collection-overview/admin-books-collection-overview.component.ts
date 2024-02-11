import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Book } from '../../../../_models/book';
import { RawApiDataBooks } from '../../../../_models/rawapi';
import { AddBookDialog } from '../../../../components/add-book-modal/add-book-modal.component';

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
        <table mat-table [dataSource]="data" class="mat-elevation-z8" matSort>
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
        [length]="resultsLength"
        [pageSize]="10"
        aria-label="Select page of GitHub search results"
      ></mat-paginator>
    </div>
  `,
})
export class AdminBooksCollectionOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'number',
    'title',
    'genre',
    'author',
    'status',
    'year',
  ];

  data: Book[] = [];

  dataSource: MatTableDataSource<Book> | null = null;

  realDatabase: BookDatabase | null | undefined;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selection = new SelectionModel<Book>(true, []);

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  private dialog = inject(MatDialog);
  members$: Observable<Book[]> | undefined;

  constructor(private _httpClient: HttpClient) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddBookDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
    this.realDatabase = new BookDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.realDatabase!.getBooks(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.data.count;
          return data.data.items;
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.dataSource = new MatTableDataSource<Book>(data);
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    console.log(this.dataSource);

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

export class BookDatabase {
  constructor(private _httpClient: HttpClient) {}

  getBooks(
    sort: string,
    order: SortDirection,
    page: number
  ): Observable<RawApiDataBooks> {
    const href = 'http://localhost:8000/api/v1/books';
    const requestUrl = `${href}?sort=id,desc`;

    return this._httpClient
      .get<RawApiDataBooks>(requestUrl)
      .pipe(map((response) => response));
  }
}
