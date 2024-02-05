import { Component } from '@angular/core';
import { AdminBooksCollectionOverviewComponent } from '../admin-books-collection-overview/admin-books-collection-overview.component';

@Component({
  standalone: true,
  imports: [AdminBooksCollectionOverviewComponent],
  selector: 'app-admin-books-collection-container',
  template: ` <section class="collection-container">
    <admin-books-collection-overview />
  </section>`,
  styleUrls: ['./admin-books-collection.container.scss'],
})
export class AdminBooksCollectionContainer {}
