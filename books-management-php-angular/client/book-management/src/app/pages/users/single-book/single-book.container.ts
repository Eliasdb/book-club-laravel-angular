import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filterSuccessResult } from '@ngneat/query';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { BooksService } from '../../../_services/books-service/books.service';
import { CartService } from '../../../_services/cart-service/cart.service';
import { LoadingStateComponent } from '../../../components/loading-state/loading-state.component';
@Component({
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LoadingStateComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
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

              <p>
                <span class="bold-text">Author:</span>
                {{ (book$ | async)?.author }}
              </p>
              <p>
                <span class="bold-text">Genre:</span>
                {{ (book$ | async)?.genre }}
              </p>
              <p>
                <span class="bold-text">Status:</span>
                {{ (book$ | async)?.status }}
              </p>
              <hr />
              <div class="btn-container">
                <button
                  mat-raised-button
                  color="accent"
                  (click)="addToCart(); clicked = true"
                  [disabled]="clicked"
                >
                  Add to cart
                </button>
                <button mat-raised-button (click)="favourite()">
                  <mat-icon
                    *ngIf="this.cartService.favourited == false; else outline"
                    >favorite_border</mat-icon
                  >
                  <ng-template #outline>
                    <mat-icon>favorite</mat-icon>
                  </ng-template>
                  Favourite
                </button>
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
  private booksService = inject(BooksService);
  protected cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  clicked = this.cartService.clicked;

  favourite() {
    this.cartService.favourited = true;
  }

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

  // protected isLoading$ = this.bookResults$.pipe(map((res) => res.isLoading));

  addToCart() {
    this.book$.pipe(take(1)).subscribe((book) => {
      this.cartService.addToCart(book);
    });
  }
}
