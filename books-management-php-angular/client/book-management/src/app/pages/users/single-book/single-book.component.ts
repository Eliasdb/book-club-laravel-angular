import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UseQuery, filterSuccess } from '@ngneat/query';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { BooksService } from '../../../_services/books-service/books.service';
import { CartService } from '../../../_services/cart-service/cart.service';
import { LoadingStateComponent } from '../../../components/loading-state/loading-state.component';
@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, LoadingStateComponent],
  selector: 'app-single-book',
  template: `
    <section
      *ngIf="(isLoading$ | async) === false; else loading"
      class="book-container"
    >
      <div class="img">
        <a class="back-link" routerLink="/books"> &larr; Back</a>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut odit
          officiis aut facere. Eveniet corporis sequi fuga debitis. Perspiciatis
          nihil sit quia minus accusantium? Minima ratione, non totam, placeat
          aliquid, delectus voluptatibus adipisci id consequuntur maxime neque
          nam quisquam.
        </p>

        <p>
          <span class="bold-text">Author:</span>
          {{ (book$ | async)?.author }}
        </p>
        <p>
          <span class="bold-text">Genre:</span> {{ (book$ | async)?.genre }}
        </p>
        <p>
          <span class="bold-text">Status:</span>
          {{ (book$ | async)?.status }}
        </p>
        <hr />
        <button
          class="add-btn"
          (click)="addToCart(); clicked = true"
          [disabled]="clicked"
        >
          Add to cart
        </button>
      </div>
    </section>
    <ng-template #loading>
      <books-loading-state></books-loading-state>
    </ng-template>
  `,
  styleUrls: ['./single-book.component.scss'],
})
export class SingleBookComponent {
  private useQuery = inject(UseQuery);
  private booksService = inject(BooksService);
  private cartService = inject(CartService);
  private activatedRoute = inject(ActivatedRoute);
  clicked = this.cartService.clicked;

  public bookId$ = this.activatedRoute.params.pipe(
    distinctUntilChanged(),
    filter((params) => params['id']),
    map((params) => params['id'])
  );

  private bookResults$ = this.bookId$.pipe(
    switchMap(
      (id) => this.useQuery(this.booksService.queryBooksById(id)).result$
    )
  );

  public book$ = this.bookResults$.pipe(
    filterSuccess(),
    map((res) => res.data)
  );

  protected isLoading$ = this.bookResults$.pipe(map((res) => res.isLoading));

  addToCart() {
    this.book$.pipe(take(1)).subscribe((book) => {
      this.cartService.addToCart(book);
    });
  }
}
