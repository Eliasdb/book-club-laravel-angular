import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-order-item',
  template: ` <div class="order-item">
    <div class="img-container">
      <img src="{{ item.photoUrl }}" class="single-book-image" />
    </div>
    <div class="book-data-container">
      <p class="text-bold">{{ item.title }}</p>
      <p>{{ item.author }}</p>
    </div>
  </div>`,
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() item: any | undefined;
}
