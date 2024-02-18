import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { Book } from '../../../_models/book';
import { CartService } from '../../../_services/cart-service/cart.service';
import { CartItemComponent } from '../../cart-item/cart-item.component';

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
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="btn-container">
        <button class="remove-item-btn" (click)="removeSelection()">
          Remove
        </button>
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
  protected cartService = inject(CartService);
  items$ = this.cartService.currentCartSource;
  selectedItems$ = this.cartService.selectedCartItems$;
  selectedIds$ = this.cartService.selectedIds$;
  isChecked$ = this.cartService.isChecked$;

  setState(state: boolean) {
    this.isChecked$.pipe(take(1)).subscribe(() => {
      this.isChecked$.next(state);
    });
  }

  removeSelection() {
    this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
      if (selectedItems) {
        const selectedIds = selectedItems.map((item) => item.id);
        this.selectedIds$?.next(selectedIds);
      }
    });

    this.items$.pipe(take(1)).subscribe((items) => {
      const filteredItems = items?.filter(
        ({ id }) => !this.selectedIds$?.getValue().includes(id)
      );
      this.items$.next(filteredItems);
    });

    localStorage.setItem('cart', JSON.stringify(this.items$.value));
  }

  onItemSelected(selected: Book) {
    if (this.isChecked$.value === true) {
      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        this.selectedItems$.next([...selectedItems, selected]);
      });
    }

    if (this.isChecked$.value === false) {
      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        const selectedId: number = selected.id || 0;
        const selectedArray: number[] = [];
        selectedArray.push(selectedId);

        if (selectedItems) {
          const filteredItems = selectedItems.filter(
            ({ id }) => !selectedArray?.includes(id || 0)
          );
          this.selectedItems$.next(filteredItems);
        }
      });
    }
  }

  ngOnInit(): void {
    this.items$.next(this.cartService.getItems());
  }
}
