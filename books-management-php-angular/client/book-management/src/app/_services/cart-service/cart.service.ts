import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Book } from '../../_models/book';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public currentCartSource = new BehaviorSubject<Book[] | null>([]);
  private baseURL = environment.apiUrl;
  private http = inject(HttpClient);
  private userId = localStorage.getItem('id');
  public clicked$ = of(true);
  public favourited: boolean = false;

  toggleClicked() {
    this.clicked$ = of(false);
  }

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
        .subscribe((data) => {
          console.log('hi this is patch request', data);
        });
    });
  }

  setCurrentCart(cart: Book[] | null) {
    this.currentCartSource.next(cart);
  }
}
