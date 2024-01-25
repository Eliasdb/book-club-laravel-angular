import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="content-container">
      <input type="checkbox" class="checkbox" />
      <div class="img-container">
        <img
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          class="single-book-image"
        />
      </div>
      <div class="book-data-container">
        <p class="text-bold">title of book: the bookening</p>
        <p>author</p>
      </div>
    </div>
  `,
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {}
