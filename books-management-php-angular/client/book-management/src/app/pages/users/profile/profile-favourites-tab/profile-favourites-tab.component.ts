import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavouriteBook } from '../../../../_models/book';
import { BooksService } from '../../../../_services/books-service/books.service';

@Component({
  selector: 'profile-favourites-tab',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="c">
      @if(user.data.favourites.length === 0) {

      <p style="margin-top:2rem;">No favourites added yet...</p>

      } @if(user.data.favourites.length > 0) {

      <div class="favourites-container">
        @for(favourite of user.data.favourites; track $index) {
        <div class="img-container">
          <img
            src="{{ favourite.photoUrl }}"
            alt="favorite book"
            routerLink="/books/{{ favourite.originalId }}"
          />

          <button
            (click)="onRemoveBook(favourite)"
            class="remove-btn"
            mat-mini-fab
            color="light"
            aria-label="Example icon button with a menu icon"
          >
            <mat-icon>close</mat-icon>
          </button>
        </div>
        }
      </div>
      }
    </div>
  `,
  styleUrl: './profile-favourites-tab.component.scss',
})
export class ProfileFavouritesTabComponent {
  @Input() user?: any;

  private bookService = inject(BooksService);
  private toastr = inject(ToastrService);

  removeBook = this.bookService.removeFromFavourites();

  onRemoveBook(favourite: FavouriteBook) {
    console.log(this.user);
    if (favourite.id) {
      this.removeBook.mutate(favourite.id);
    }
    this.toastr.success(
      `${favourite.title} has been removed from favourites...`
    );
  }
}
