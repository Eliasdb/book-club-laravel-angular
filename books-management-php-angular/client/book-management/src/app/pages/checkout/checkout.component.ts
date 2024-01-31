import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../_services/cart-service/cart.service';
import { OrderItemComponent } from './order-item/order-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, OrderItemComponent],
  selector: 'app-checkout',
  template: `
    <div class="page">
      <div *ngIf="items$" class="checkout-container">
        <h3 class="order-confirm-title">Order confirmation</h3>
        <div class="order-items">
          <app-order-item *ngFor="let item of items$ | async" [item]="item" />
          <div class="confirm-order-btn-container">
            <button class="confirm-btn" (click)="confirmOrder([12, 13])">
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
export class CheckoutComponent {
  protected cartService = inject(CartService);
  items$ = this.cartService.currentCartSource;
  private router = inject(Router);
  clicked = this.cartService.clicked;

  confirmOrder(bookIds: number[]) {
    this.clicked = false;
    this.cartService.confirmOrder(bookIds);
    localStorage.removeItem('cart');
    this.cartService.setCurrentCart(null);
    this.router.navigateByUrl('/confirmation');
  }
}
