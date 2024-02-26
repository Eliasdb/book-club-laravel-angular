import { Component, OnInit, inject } from '@angular/core';
import { Book } from './_models/book';
import { AccountService } from './_services/account-service/account.service';
import { CartService } from './_services/cart-service/cart.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="router-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Library management';
  showHeaderFooter: boolean = true;
  private accountService = inject(AccountService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.setCurrentUser();
    this.setCart();
    this.setToken();
    this.setUserId();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: string = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  setUserId() {
    const userId = localStorage.getItem('id');
    if (!userId) return;
    const finalUserId: number = Number(JSON.parse(userId));
    this.cartService.setCurrentUserId(finalUserId);
    console.log(this.cartService.userId$.getValue());
    // localStorage.removeItem('id');
  }

  setToken() {
    const tokenString = localStorage.getItem('token');
    if (!tokenString) return;
    const token: string = JSON.parse(tokenString);
    this.accountService.setCurrentToken(token);
    // localStorage.removeItem('token');
  }

  setCart() {
    const cartString = localStorage.getItem('cart');
    if (!cartString) return;
    const cart: Book[] = JSON.parse(cartString);
    this.cartService.setCurrentCart(cart);
  }
}
