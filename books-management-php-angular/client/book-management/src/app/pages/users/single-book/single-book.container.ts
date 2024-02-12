import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filterSuccessResult } from '@ngneat/query';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { FavouriteBook } from '../../../_models/book';
import { BooksService } from '../../../_services/books-service/books.service';
import { CartService } from '../../../_services/cart-service/cart.service';
import { LoadingStateComponent } from '../../../components/loading-state/loading-state.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { FavouriteButtonComponent } from './favourite-button/favourite-button.component';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LoadingStateComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    AddButtonComponent,
    FavouriteButtonComponent,
  ],
  selector: 'single-book',
  template: `
    @if (bookResults$ | async; as result) { @if (result.isLoading) {

    <books-loading-state></books-loading-state>

    } @if (result.isSuccess) {

    <section class="book-container">
      <mat-card>
        <mat-card-content>
          <section class="card-container">
            <div class="img">
              <a class="back-link" routerLink="/books"> &larr; Overview</a>
              <div class="img-container">
                <img
                  src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
                  alt="book"
                  class="single-book-image"
                />
              </div>
            </div>

            <div class="book-info-container">
              <h3>{{ (book$ | async)?.title }}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                ut odit officiis aut facere. Eveniet corporis sequi fuga
                debitis. Perspiciatis nihil sit quia minus accusantium? Minima
                ratione, non totam, placeat aliquid, delectus voluptatibus
                adipisci id consequuntur maxime neque nam quisquam.
              </p>

              <div class="book-info">
                <div>
                  <p>
                    <span class="bold-text">Author:</span>
                    {{ (book$ | async)?.author }}
                  </p>
                  <p>
                    <span class="bold-text">Genre:</span>
                    {{ (book$ | async)?.genre }}
                  </p>
                </div>
                <div>
                  <p>
                    <span class="bold-text">Year:</span>
                    {{ (book$ | async)?.publishedDate | date : 'y' }}
                  </p>
                  <p>
                    <span class="bold-text">Status:</span>
                    {{ (book$ | async)?.status }}
                  </p>
                </div>
              </div>

              <hr />

              <div class="btn-container">
                <add-button
                  [isDisabled]="isDisabled"
                  [book]="(book$ | async) || null"
                  (add)="addToCart()"
                />
                <favourite-button (favourite)="onFavouriteBook()" />
              </div>
            </div>
          </section>
        </mat-card-content>
      </mat-card>
    </section>

    } @if (result.isError) {
    <p>Error</p>
    } }
  `,
  styleUrls: ['./single-book.container.scss'],
})
export class SingleBookContainer {
  // private useQuery = inject(UseQuery);
  protected booksService = inject(BooksService);
  private toastr = inject(ToastrService);

  protected cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  isDisabled?: boolean;
  private userId = localStorage.getItem('id');

  public bookId$ = this.activatedRoute.params.pipe(
    distinctUntilChanged(),
    filter((params) => params['id']),
    map((params) => params['id'])
  );

  protected bookResults$ = this.bookId$.pipe(
    switchMap((id) => this.booksService.queryBooksById(id).result$)
  );

  public book$ = this.bookResults$.pipe(
    filterSuccessResult(),
    map((res) => res.data)
  );

  addToCart() {
    this.book$.pipe(take(1)).subscribe((book) => {
      console.log('added');

      this.cartService.addToCart(book);
      this.toastr.success(`${book.title} added to cart!`);
    });
  }

  favouriteBook = this.booksService.favouriteBook();

  onFavouriteBook() {
    this.book$.pipe(take(1)).subscribe((book) => {
      const favouritedBook: FavouriteBook = {
        ...book,
        originalId: book.id,
        userId: Number(this.userId),
      };
      console.log(favouritedBook);

      this.favouriteBook.mutate(favouritedBook);
      this.toastr.success(`${favouritedBook.title} added to favourites!`);
    });
  }

  // protected isLoading$ = this.bookResults$.pipe(map((res) => res.isLoading));
}
