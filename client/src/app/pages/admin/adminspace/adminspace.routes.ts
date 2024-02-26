import { Routes } from '@angular/router';
import { AuthGuard } from '../../../_guards/auth.guard';
import { AdminBooksCollectionContainer } from '../admin-books/admin-books-collection-container/admin-books-collection.container';
import { CustomersCollectionContainer } from '../admin-customers/admin-customer-collection-container/admin-customers-collection.container';
import { AdminStatsContainer } from '../admin-stats/admin-stats-container/admin-stats.container';
import { AdminSpaceContainer } from './adminspace.container';

export const AdminSpaceRoutes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: AdminSpaceContainer,

    children: [
      { path: 'admin/stats', component: AdminStatsContainer },
      { path: 'admin/books', component: AdminBooksCollectionContainer },
      {
        path: 'admin/order-overview',
        component: CustomersCollectionContainer,
      },
    ],
  },
];
