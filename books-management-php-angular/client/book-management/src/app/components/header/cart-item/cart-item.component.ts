import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="content-container">
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
})
export class CartItemComponent {
  @Input() item: any | undefined;
  @Output() clickEvent = new EventEmitter<string>();

  clickChecked() {
    this.clickEvent.emit();
  }
}
