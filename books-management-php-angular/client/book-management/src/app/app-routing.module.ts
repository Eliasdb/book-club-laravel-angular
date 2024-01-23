import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomersCollectionContainerComponent } from './pages/customers/customers-collection-container/customers-collection-container.component';
import { BooksCollectionContainerComponent } from './pages/books/books-collection-container/books-collection-container.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile-container/profile.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'profile', component: ProfileComponent },
   { path: 'books', component: BooksCollectionContainerComponent },
   { path: 'customers', component: CustomersCollectionContainerComponent },
   { path: 'single-book', component: SingleBookComponent },


   { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
