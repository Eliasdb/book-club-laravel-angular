import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { Book } from '../../../../_models/book';

@Component({
  selector: 'add-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button
      mat-raised-button
      color="accent"
      (click)="addToCartEmit($event)"
      [disabled]="isDisabled"
    >
      Add to cart
    </button>
  `,
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  @Input() book?: Book | null;
  @Input() isDisabled?: boolean;
  @Output() add = new EventEmitter<Event>();
  clicked$ = of(false);

  addToCartEmit($event: any) {
    this.add.emit($event);
  }
}
