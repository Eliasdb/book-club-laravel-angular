import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filterSuccessResult } from '@ngneat/query';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { FavouriteBook } from '../../../../_models/book';
import { AccountService } from '../../../../_services/account-service/account.service';
import { BooksService } from '../../../../_services/books-service/books.service';
import { CartService } from '../../../../_services/cart-service/cart.service';
import { BreadcrumbsComponent } from '../../../../components/breadcrumbs/breadcrumbs.component';
import { LoadingStateComponent } from '../../../../components/loading-state/loading-state.component';
import { BookSnackbar } from '../../../../components/snackbars/book-snackbar/book-snackbar.component';
import { AddButtonComponent } from '../single-book-add-button/single-book-add-button.component';
import { FavouriteButtonComponent } from '../single-book-favourite-button/single-book-favourite-button.component';

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
    MatRippleModule,
    BreadcrumbsComponent,
  ],
  selector: 'single-book',
  template: `
    <section class="book-container">
      @if (bookResults$ | async; as result) { @if (result.isLoading) {

      <books-loading-state></books-loading-state>

      } @if (result.isSuccess) {
      <div class="b-crumbs">
        <breadcrumbs [book]="(book$ | async) || null" />
      </div>
      <mat-card>
        <mat-card-content>
          <section class="card-container">
            <div class="img">
              <div class="img-container">
                <img
                  src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
                  alt="book"
                  class="single-book-image"
                />
              </div>
            </div>
            @if (book$ | async; as book) {
            <div class="book-info-container">
              <h3>{{ book.title }}</h3>
              <p>
                {{ book.description }}
              </p>

              <div class="book-info">
                <div>
                  <p>
                    <span class="bold-text">Author:</span>
                    {{ book.author }}
                  </p>
                  <p>
                    <span class="bold-text">Genre:</span>
                    {{ book.genre }}
                  </p>
                </div>
                <div>
                  <p>
                    <span class="bold-text">Year:</span>
                    {{ book.publishedDate | date : 'y' }}
                  </p>
                  <p>
                    <span class="bold-text">Status:</span>
                    {{ book.status }}
                  </p>
                </div>
              </div>

              <hr />

              <div class="btn-container">
                <add-button
                  [book]="(book$ | async) || null"
                  (add)="addToCart()"
                />
                <favourite-button (favourite)="onFavouriteBook()" />
              </div>
            </div>
            }
          </section>
        </mat-card-content>
      </mat-card>
      } @if (result.isError) {
      <p>Error</p>
      } } @if (relatedBookResults$ | async; as result) { @if (result.isLoading)
      {
      <p>Loading...</p>
      } @if (result.isSuccess) {
      <div class="related-title">
        <hr class="hr" />
        <h2>Related books</h2>
      </div>
      <div class="underlay"></div>

      <div class="cards-container">
        @for(result of result.data.items; track $index){
        <a routerLink="../../books/{{ result.id }}">
          <section class="full-card">
            <div
              class="example-ripple-container mat-elevation-z4"
              matRipple
              [matRippleCentered]="centered"
              [matRippleDisabled]="disabled"
              [matRippleUnbounded]="unbounded"
            >
              <div class="related-img-container">
                <img class="related-book-image" src="{{ result.photoUrl }}" />
              </div>
            </div>
          </section>
        </a>
        }
      </div>
      } }
    </section>
  `,
  styleUrls: ['./single-book.container.scss'],
})
export class SingleBookContainer implements OnInit {
  private booksService = inject(BooksService);
  private accountService = inject(AccountService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);
  private activatedRoute = inject(ActivatedRoute);

  protected centered = false;
  protected disabled = false;
  protected unbounded = false;

  private userId = localStorage.getItem('id');

  private favouriteBook = this.accountService.favouriteBook();

  protected bookId$ = this.activatedRoute.params.pipe(
    distinctUntilChanged(),
    filter((params) => params['id']),
    map((params) => params['id'])
  );

  protected bookResults$ = this.bookId$.pipe(
    switchMap((id) => this.booksService.queryBooksById(id).result$)
  );

  protected book$ = this.bookResults$.pipe(
    filterSuccessResult(),
    map((res) => res.data)
  );

  protected bookGenre$ = this.book$.pipe(
    map((res) => {
      return res.genre;
    })
  );

  protected relatedBookResults$ = this.bookGenre$.pipe(
    switchMap((genre) => this.booksService.queryBooksByGenre(genre).result$)
  );

  protected addToCart() {
    this.book$.pipe(take(1)).subscribe((book) => {
      this.cartService.addToCart(book);
      this.snackBar.openFromComponent(BookSnackbar, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        data: { book: book.title, action: 'added to cart' },
      });
    });
  }

  protected onFavouriteBook() {
    this.book$.pipe(take(1)).subscribe((book) => {
      const favouritedBook: FavouriteBook = {
        ...book,
        originalId: book.id,
        userId: Number(this.userId),
      };

      this.favouriteBook.mutate(favouritedBook);
      this.snackBar.openFromComponent(BookSnackbar, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        data: { book: favouritedBook.title, action: 'added to favourites' },
      });
    });
  }

  protected loadRelated() {
    this.book$.pipe(take(1)).subscribe((book) => {
      this.booksService.queryBooksByGenre(book.genre);
    });
  }

  ngOnInit(): void {
    this.loadRelated();
  }
}
