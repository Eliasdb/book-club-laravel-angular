import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Customer } from '../../../../_models/customer';
import { CustomersService } from '../../../../_services/customers-service/customers.service';

/**
 * @title Table with selection
 */
@Component({
  selector: 'admin-customers-collection-overview',
  styleUrls: ['admin-customers-collection-overview.component.scss'],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  template: `
    <section class="collection-title">
      <h3>Customers</h3>
    </section>
    <table
      mat-table
      [dataSource]="dataSource"
      multiTemplateDataRows
      class="mat-elevation-z8"
    >
      <ng-container matColumnDef="number">
        <th mat-header-cell *matHeaderCellDef>#</th>
        <td mat-cell *matCellDef="let element">{{ element.id }}</td>
      </ng-container>

      <!-- State Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Username</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef>First Name</th>
        <td mat-cell *matCellDef="let element">{{ element.firstName }}</td>
      </ng-container>
      <!-- Title Column -->
      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef>Last Name</th>
        <td mat-cell *matCellDef="let element">{{ element.lastName }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let element">{{ element.email }}</td>
      </ng-container>

      <ng-container matColumnDef="phoneNumber">
        <th mat-header-cell *matHeaderCellDef>Phone number</th>
        <td mat-cell *matCellDef="let element">{{ element.phoneNumber }}</td>
      </ng-container>

      <ng-container matColumnDef="address">
        <th mat-header-cell *matHeaderCellDef>Address</th>
        <td mat-cell *matCellDef="let element">{{ element.address }}</td>
      </ng-container>

      <ng-container matColumnDef="postalCode">
        <th mat-header-cell *matHeaderCellDef>Postal code</th>
        <td mat-cell *matCellDef="let element">{{ element.postalCode }}</td>
      </ng-container>

      <ng-container matColumnDef="city">
        <th mat-header-cell *matHeaderCellDef>City</th>
        <td mat-cell *matCellDef="let element">{{ element.city }}</td>
      </ng-container>

      <ng-container matColumnDef="expand">
        <th mat-header-cell *matHeaderCellDef aria-label="row actions">
          &nbsp;
        </th>
        <td mat-cell *matCellDef="let element">
          <button
            mat-icon-button
            aria-label="expand row"
            (click)="
              expandedElement = expandedElement === element ? null : element;
              $event.stopPropagation()
            "
          >
            <mat-icon *ngIf="expandedElement === element; else down"
              >keyboard_arrow_up</mat-icon
            >

            <ng-template #down>
              <mat-icon>keyboard_arrow_down</mat-icon>
            </ng-template>
          </button>
        </td>
      </ng-container>

      <!-- Expanded Content Column - The detail row is made up of this one column that spans across all columns -->
      <ng-container matColumnDef="expandedDetail">
        <td
          mat-cell
          *matCellDef="let element"
          [attr.colspan]="columnsToDisplayWithExpand.length"
        >
          <div [ngClass]="{ expanded: element == expandedElement }">
            <div
              class=""
              [@detailExpand]="
                element == expandedElement ? 'expanded' : 'collapsed'
              "
            >
              <div class="book-item-container" *ngIf="element.books.length > 0">
                <h3>Books:</h3>
                <div *ngFor="let book of element.books" class="book-item">
                  <p class="book-title">
                    {{ book.title }}
                  </p>
                </div>
              </div>
              <div *ngIf="element.books.length === 0">No books ordered...</div>
            </div>
          </div>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columnsToDisplayWithExpand"></tr>
      <tr
        mat-row
        *matRowDef="let element; columns: columnsToDisplayWithExpand"
        class="example-element-row"
        [class.example-expanded-row]="expandedElement === element"
        (click)="expandedElement = expandedElement === element ? null : element"
      ></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: ['expandedDetail']"
        class="example-detail-row"
      ></tr>
    </table>
  `,
})
export class AdminCustomersCollectionOverviewComponent {
  private customersService = inject(CustomersService);

  dataSource = this.customersService.getCustomersWithBooks();
  columnsToDisplay = [
    'number',
    'name',
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'address',
    'postalCode',
    'city',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Customer | null | undefined;
}
