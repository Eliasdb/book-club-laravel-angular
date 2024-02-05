import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../../_models/book';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="content-container" *ngIf="item">
      <input type="checkbox" class="checkbox" (click)="clickChecked()" />
      <div class="img-container">
        <img
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          class="single-book-image"
        />
      </div>
      <div class="book-data-container">
        <p class="text-bold">{{ item.title }}</p>
        <p>{{ item.author }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./cart-item.component.scss'],
  imports: [CommonModule],
})
export class CartItemComponent {
  @Input() item: Book | null = null;
  @Output() itemSelected = new EventEmitter<Book>();

  clickChecked() {
    if (this.item) this.itemSelected.emit(this.item);
  }
}
