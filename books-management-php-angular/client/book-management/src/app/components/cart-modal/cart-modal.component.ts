import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { Book } from '../../_models/book';
import { CartService } from '../../_services/cart-service/cart.service';
import { CartItemComponent } from '../header/cart-item/cart-item.component';

@Component({
  selector: 'cart-dialog',
  template: `<h2 mat-dialog-title>Cart</h2>
    <mat-dialog-content class="mat-typography">
      <h3>Here's what you have selected so far:</h3>
      <div class="cart-container">
        <cart-item
          *ngFor="let item of items$ | async"
          [item]="item"
          (itemSelected)="onItemSelected($event)"
        />
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="btn-container">
        <button class="remove-item-btn" (click)="onClick()">Remove</button>
        <button
          class="checkout-btn"
          routerLink="/checkout"
          [mat-dialog-close]="true"
          cdkFocusInitial
        >
          Checkout
        </button>
      </div>
    </mat-dialog-actions> `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CartItemComponent,
    RouterLink,
    CommonModule,
  ],
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartDialog {
  selectedItems$ = new BehaviorSubject<Book[]>([]);

  protected cartService = inject(CartService);
  items$ = this.cartService.currentCartSource;
  onClick() {
    console.log('Clikc');
    this.selectedItems$.pipe(take(1)).subscribe((items) => {
      console.log(items);
    });
  }

  onItemSelected(selected: Book) {
    console.log('onItemSelected', selected);
    this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
      this.selectedItems$.next([...selectedItems, selected]);
    });
  }
}
