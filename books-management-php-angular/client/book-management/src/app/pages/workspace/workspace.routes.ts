import { Routes } from '@angular/router';
import { BooksCollectionContainerComponent } from '../books/books-collection-container/books-collection-container.component';
import { CustomersCollectionContainerComponent } from '../customers/customers-collection-container/customers-collection-container.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile-container/profile.component';
import { SingleBookComponent } from '../single-book/single-book.component';
import { WorkspaceContainer } from './workspace.container';

export const WorkspaceRoutes: Routes = [
  {
    path: '',
    component: WorkspaceContainer,

    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'books',
        component: BooksCollectionContainerComponent,
      },
      {
        path: 'books/:id',
        component: SingleBookComponent,
      },
      { path: 'customers', component: CustomersCollectionContainerComponent },
    ],
  },
];
