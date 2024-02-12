import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../../_services/books-service/books.service';
import { CartItemComponent } from '../header/cart-item/cart-item.component';

@Component({
  selector: 'cart-dialog',
  template: `<h2 mat-dialog-title>
      Add book
      <hr style="margin-top: 0.5rem;" />
    </h2>

    <mat-dialog-content class="mat-typography">
      <!-- <h3>Please fill in the following data:</h3> -->

      <form
        #addBookForm="ngForm"
        (ngSubmit)="onAddBook()"
        autocomplete="off"
        class="form"
      >
        <div class="inputs">
          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              [(ngModel)]="book.title"
              placeholder="Harry Potter"
            />
          </div>
          <div class="form-group">
            <label for="genre">Genre</label>
            <input
              type="text"
              class="form-control"
              name="genre"
              [(ngModel)]="book.genre"
              placeholder="e.g. fantasy, action, adventure..."
            />
          </div>

          <div class="form-group">
            <label for="author">Author</label>
            <input
              type="text"
              class="form-control"
              name="author"
              [(ngModel)]="book.author"
              placeholder="J.R.R. Tolkien"
            />
          </div>
          <div class="form-group">
            <label for="publishedDate">Published Date</label>
            <input
              type="text"
              class="form-control"
              name="publishedDate"
              [(ngModel)]="book.publishedDate"
              placeholder="2024"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="photoUrl">Photo Url</label>
          <input
            type="text"
            class="form-control"
            name="photoUrl"
            [(ngModel)]="book.photoUrl"
            placeholder="https://yoururl.com"
          />
          <label for="description">Description</label>
          <textarea
            rows="5"
            type="text"
            class="form-control"
            name="description"
            [(ngModel)]="book.description"
            placeholder="description"
          >
          </textarea>
          <div class="btn-container">
            <button
              type="submit"
              class="remove-item-btn"
              [mat-dialog-close]="false"
              cdkFocusInitial
            >
              <span> Add book </span>
            </button>
          </div>
        </div>

        <input
          type="hidden"
          class="form-control hidden"
          name="status"
          [(ngModel)]="book.status"
          value="Available"
        />
      </form>
    </mat-dialog-content> `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CartItemComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  styleUrls: ['./add-book-modal.component.scss'],
})
export class AddBookDialog {
  private bookService = inject(BooksService);
  private toastr = inject(ToastrService);

  addBook = this.bookService.addBook();

  book: any = {
    photoUrl: '',
    genre: '',
    title: '',
    author: '',
    status: 'Available',
    publishedDate: '',
    description: '',
  };

  onAddBook() {
    this.addBook.mutate(this.book);
    this.toastr.success(`'${this.book.title}' has been added!`);
  }
}
