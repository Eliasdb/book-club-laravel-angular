import { Routes } from '@angular/router';
import { AuthGuard } from '../../../_guards/auth.guard';
import { BooksCollectionContainer } from '../books/books-collection-container/books-collection.container';
import { CheckoutContainer } from '../checkout/checkout-container/checkout.container';
import { ConfirmationContainer } from '../confirmation/confirmation-container/confirmation.container';
import { HomeContainer } from '../home/home-container/home.container';
import { ProfileContainer } from '../profile/profile-container/profile.container';
import { SingleBookContainer } from '../single-book/single-book.container';
import { WorkspaceContainer } from './workspace.container';

export const WorkspaceRoutes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: WorkspaceContainer,

    children: [
      { path: 'home', component: HomeContainer },
      { path: 'profile', component: ProfileContainer },
      {
        path: 'books',
        component: BooksCollectionContainer,
      },
      {
        path: 'books/:id',
        component: SingleBookContainer,
      },

      { path: 'checkout', component: CheckoutContainer },
      { path: 'confirmation', component: ConfirmationContainer },
    ],
  },
];
