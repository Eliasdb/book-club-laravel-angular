import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Book } from '../../../_models/book';
import { AdminService } from '../../../_services/admin-service/admin.service';
import { BookSnackbar } from '../../snackbars/book-snackbar/book-snackbar.component';

@Component({
  selector: 'cart-dialog',
  template: `<h2 mat-dialog-title>
      Edit book
      <hr style="margin-top: 0.5rem;" />
    </h2>

    <mat-dialog-content class="mat-typography">
      <form
        #addBookForm="ngForm"
        (ngSubmit)="onEditBook()"
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
              <span> Edit book </span>
            </button>
          </div>
        </div>

        <input
          type="hidden"
          class="form-control hidden"
          name="status"
          [(ngModel)]="book.status"
          value="available"
        />
      </form>
    </mat-dialog-content> `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  styleUrls: ['./edit-book-modal.component.scss'],
})
export class EditBookDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      title: string;
      genre: string;
      author: string;
      date: string;
      photoUrl: string;
      description: string;
    }
  ) {}

  private adminService = inject(AdminService);
  private snackBar = inject(MatSnackBar);

  editBook = this.adminService.editBook();

  book: Book = {
    id: this.data.id,
    status: 'available',
  };

  onEditBook() {
    this.editBook.mutate(this.book);
    this.snackBar.openFromComponent(BookSnackbar, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: { book: this.book.title, action: 'edited' },
    });
  }

  ngOnInit(): void {
    this.book.title = this.data.title;
    this.book.genre = this.data.genre;
    this.book.author = this.data.author;
    this.book.publishedDate = this.data.date;
    this.book.photoUrl = this.data.photoUrl;
    this.book.description = this.data.description;
    console.log(this.book);
  }
}
