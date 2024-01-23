import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit, ChangeDetectorRef, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import { CustomersService } from 'src/app/_services/customers.service';
import { Customer } from '../../../_models/customer';
import { RawApiDataCustomer } from '../../../_models/rawapi';

/**
 * @title Table with selection
 */
@Component({
  selector: 'customers-collection-overview',
  styleUrls: ['customers-collection-overview.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe],
  template: `
    <section class="collection-title">
        <h3>Customers</h3>
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

    <table mat-table [dataSource]="data" class="mat-elevation-z8" matSort matSortActive="number" matSortDisableClear matSortDirection="desc">

        <ng-container matColumnDef="number" sticky>
        <th mat-header-cell *matHeaderCellDef mat-sort-header disableClear>
          #
        </th>
        <td mat-cell *matCellDef="let row">{{row.id }}</td>
      </ng-container>

          <!-- State Column -->
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let row">{{row.type}}</td>
      </ng-container>

      <!-- Title Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let row">{{row.name}}</td>
      </ng-container>

          <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let row">{{row.email}}</td>
      </ng-container>

       <ng-container matColumnDef="postalCode">
        <th mat-header-cell *matHeaderCellDef>Postal code</th>
        <td mat-cell *matCellDef="let row">{{row.postalCode}}</td>
      </ng-container>

        <ng-container matColumnDef="city">
        <th mat-header-cell *matHeaderCellDef>City</th>
        <td mat-cell *matCellDef="let row">{{row.city}}</td>
      </ng-container>

      <!-- Created Column -->
    
      <tr mat-header-row *matHeaderRowDef="displayedColumns;"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>

  <mat-paginator [length]="resultsLength" [pageSize]="15" aria-label="Select page of GitHub search results"></mat-paginator>
</div>
`,
})
export class CustomersCollectionOverviewComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'type', 'name', "email", "postalCode", "city"];

  realDatabase: CustomerDatabase | null | undefined;

  data: Customer[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  private memberService = inject(CustomersService);
  members$: Observable<Customer[]> | undefined;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
   
    
    this.realDatabase = new CustomerDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.realDatabase!.getCustomers(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.meta.total;
          return data.data;
        }),
      )
      .subscribe(data => (this.data = data));
  }
}

export class CustomerDatabase {
  constructor(private _httpClient: HttpClient) {}

  getCustomers(sort: string, order: SortDirection, page: number): Observable<RawApiDataCustomer> {
    const href = 'http://localhost:8000/api/v1/customers';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get<RawApiDataCustomer>(requestUrl);
  }
}