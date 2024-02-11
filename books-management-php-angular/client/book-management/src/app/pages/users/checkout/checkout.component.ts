import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../../_models/book';
import { CartService } from '../../../_services/cart-service/cart.service';
import { OrderItemComponent } from './order-item/order-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, OrderItemComponent],
  selector: 'checkout',
  template: `
    <div class="page">
      <div *ngIf="items$" class="checkout-container">
        <h3 class="order-confirm-title">Order confirmation</h3>
        <div class="order-items">
          <order-item *ngFor="let item of items$ | async" [item]="item" />
          <div class="confirm-order-btn-container">
            <button class="confirm-btn" (click)="confirmOrder(getBookIds())">
              Confirm order
            </button>
          </div>
        </div>
      </div>
      <div *ngIf="!items$">
        <p>No items to check out... Please fill your basket.</p>
        <button>Browse books</button>
      </div>
    </div>
  `,
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  protected cartService = inject(CartService);
  private router = inject(Router);

  items$ = this.cartService.currentCartSource;

  getBookIds() {
    const books = this.cartService.getItems();
    const ids = books.map((book: Book) => book.id);
    return ids;
  }

  confirmOrder(bookIds: number[]) {
    this.cartService.confirmOrder(bookIds);
    localStorage.removeItem('cart');
    this.cartService.setCurrentCart(null);
    this.router.navigateByUrl('/confirmation');
  }

  ngOnInit(): void {
    this.getBookIds();
  }
}
