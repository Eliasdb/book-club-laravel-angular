import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { Book } from '../../../_models/book';
import { CartService } from '../../../_services/cart-service/cart.service';
import { CartItemComponent } from '../../header/cart-item/cart-item.component';

@Component({
  selector: 'cart-dialog',
  template: `<h2 mat-dialog-title>Cart</h2>
    <mat-dialog-content class="mat-typography">
      <div class="cart-container">
        <h3>Here's what you have selected so far:</h3>
        <cart-item
          *ngFor="let item of items$ | async"
          [item]="item"
          (state)="setState($event)"
          (itemSelected)="onItemSelected($event)"
        />
      </div>

      <p>spijtirefefg</p>
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
  selectedItems$ = new BehaviorSubject<any[]>([]);
  selectedIds$ = new BehaviorSubject<any[]>([]);

  state$ = new BehaviorSubject<boolean>(false);

  setState(ev: any) {
    this.state$.pipe(take(1)).subscribe(() => {
      this.state$.next(ev);
    });
  }

  protected cartService = inject(CartService);
  items$ = this.cartService.currentCartSource;
  onClick() {
    // this.items$.next(this.selectedItems$.value);
    this.selectedItems$.pipe(take(1)).subscribe((items) => {
      const selectedItems = items;
      if (items) {
        const selectedIds = selectedItems.map((item) => item.id);
        this.selectedIds$?.next(selectedIds);
      }
    });
    this.items$.pipe(take(1)).subscribe((items) => {
      const cartItems = items;
      const filteredItems = cartItems?.filter(
        ({ id }) => !this.selectedIds$?.getValue().includes(id)
      );
      this.items$.next(filteredItems);
    });
    localStorage.setItem('cart', JSON.stringify(this.items$.value));
  }

  onItemSelected(selected: Book) {
    console.log('onItemSelected', selected);
    console.log('state', this.state$.value);

    if (this.state$.value === true) {
      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        this.selectedItems$.next([...selectedItems, selected]);
      });
    }
    if (this.state$.value === false) {
      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        const selectedIds = selectedItems.map((item) => item.id);
        const filteredItems = selectedItems.filter(
          ({ id }) => !selectedIds.includes(id)
        );

        this.selectedItems$.next(filteredItems);

        // filter(({id})=> this.items$.getValue().includes(selected.id);

        console.log(filteredItems);

        console.log('NOT CHECKED', selectedItems);
      });
    }
  }
}
