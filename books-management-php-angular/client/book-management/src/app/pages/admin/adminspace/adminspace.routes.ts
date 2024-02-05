import { Routes } from '@angular/router';
import { AdminBooksCollectionContainer } from '../admin-books/admin-books-collection-container/admin-books-collection.container';
import { CustomersCollectionContainer } from '../admin-customers/admin-customer-collection-container/admin-customers-collection.container';
import { AdminStatsComponent } from '../admin-stats/admin-stats.component';
import { AdminSpaceContainer } from './adminspace.container';

export const AdminSpaceRoutes: Routes = [
  {
    path: '',
    component: AdminSpaceContainer,

    children: [
      { path: 'admin/stats', component: AdminStatsComponent },
      { path: 'admin/books', component: AdminBooksCollectionContainer },
      {
        path: 'admin/order-overview',
        component: CustomersCollectionContainer,
      },
    ],
  },
];
