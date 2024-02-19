import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Book } from '../../_models/book';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = environment.apiUrl;
  private http = inject(HttpClient);
  private userId = localStorage.getItem('id');

  public selectedCartItems$ = new BehaviorSubject<Book[]>([]);
  public isChecked$ = new BehaviorSubject<boolean>(false);
  public selectedIds$ = new BehaviorSubject<any[]>([]);
  public currentCartSource = new BehaviorSubject<Book[] | null | undefined>([]);

  getItems() {
    const items = localStorage.getItem('cart') || '[]';
    const parsedItems = JSON.parse(items);
    return items ? parsedItems : [];
  }

  addToCart(book: Book) {
    const storedItems = this.getItems();
    localStorage.setItem('cart', JSON.stringify([...storedItems, book]));
    this.currentCartSource.next([...storedItems, book]);
  }

  confirmOrder(bookIds: number[]) {
    bookIds.forEach((element) => {
      this.http
        .patch<any>(
          `${this.baseURL}/books/${element}?userId=${this.userId}&status=loaned`,
          this.userId
        )
        .subscribe(() => console.log('Order confirmed'));
    });
  }

  setCurrentCart(cart: Book[] | null) {
    this.currentCartSource.next(cart);
  }
}
