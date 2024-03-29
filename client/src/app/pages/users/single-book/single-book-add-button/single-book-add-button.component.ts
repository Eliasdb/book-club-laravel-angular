import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../../../_models/book';

@Component({
  selector: 'add-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button color="accent" (click)="addToCartEmit($event)">
      Add to cart
    </button>
  `,
  styleUrl: './single-book-add-button.component.scss',
})
export class AddButtonComponent {
  @Input() book?: Book | null;
  @Output() add = new EventEmitter<Event>();

  addToCartEmit($event: any) {
    this.add.emit($event);
  }
}
