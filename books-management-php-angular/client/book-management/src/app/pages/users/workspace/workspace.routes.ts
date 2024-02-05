import { Routes } from '@angular/router';
import { BooksCollectionContainer } from '../books/books-collection/books-collection.container';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile-container/profile.container';
import { SingleBookComponent } from '../single-book/single-book.component';
import { WorkspaceContainer } from './workspace.container';

export const WorkspaceRoutes: Routes = [
  {
    path: '',
    component: WorkspaceContainer,

    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'books',
        component: BooksCollectionContainer,
      },
      {
        path: 'books/:id',
        component: SingleBookComponent,
      },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'confirmation', component: ConfirmationComponent },
    ],
  },
];
