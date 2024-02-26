import { Component, Input } from '@angular/core';
import { Book } from '../../../../_models/book';

@Component({
  standalone: true,
  imports: [],
  selector: 'order-item',
  template: `
    @if(item) {
    <div class="order-item">
      <div class="img-container">
        <img src="{{ item.photoUrl }}" class="single-book-image" />
      </div>
      <div class="book-data-container">
        <p class="text-bold">{{ item.title }}</p>
        <p>{{ item.author }}</p>
      </div>
    </div>
    }
  `,
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() item?: Book;
}
