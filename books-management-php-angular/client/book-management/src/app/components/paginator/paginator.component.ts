import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  standalone: true,
  imports: [MatPaginatorModule],
  selector: 'paginator',
  template: ` <mat-paginator
    [length]="100"
    [pageSize]="10"
    [pageSizeOptions]="[5, 10, 25, 100]"
    aria-label="Select page"
  >
  </mat-paginator>`,
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {}
