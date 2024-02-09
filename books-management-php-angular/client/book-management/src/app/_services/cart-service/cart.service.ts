import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  public clicked: boolean = false;

  toggleClicked() {
    this.clicked = true;
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

  // confirmOrder(id: number) {
  //   return queryOptions({
  //     queryKey: ['BOOKS', id],
  //     queryFn: () => {
  //       return this.http.patch<Book>(`${environment.apiUrl}/books/${id}`).pipe(
  //         // projects what we are getting back from API
  //         map((data) => {
  //           return data.data;
  //         })
  //       );
  //     },
  //   });
  // }

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
