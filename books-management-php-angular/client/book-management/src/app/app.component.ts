import { Component, OnInit, inject } from '@angular/core';
import { User } from './_models/user';
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
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }

  setCart() {
    const cartString = localStorage.getItem('cart');
    if (!cartString) return;
    const cart: any = JSON.parse(cartString);
    this.cartService.setCurrentCart(cart);
  }
}
