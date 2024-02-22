import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Book } from '../../_models/book';
import { FavouriteD } from '../../_models/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = environment.apiUrl;
  private http = inject(HttpClient);

  public selectedCartItems$ = new BehaviorSubject<Book[]>([]);
  public isChecked$ = new BehaviorSubject<boolean>(false);
  public selectedIds$ = new BehaviorSubject<any[]>([]);
  public currentCartSource = new BehaviorSubject<Book[] | null | undefined>([]);
  public currentFavouritesSource = new BehaviorSubject<
    FavouriteD[] | null | undefined
  >([]);
  public userId$ = new BehaviorSubject<number>(0);

  getItems() {
    const items = localStorage.getItem('cart') || '[]';
    const parsedItems = JSON.parse(items);
    return items ? parsedItems : [];
  }

  getFavouritedBooks(): FavouriteD[] {
    const items = localStorage.getItem('favourites') || '[]';
    const parsedItems = JSON.parse(items);
    return items ? parsedItems : [];
  }

  addToCart(book: Book) {
    const storedItems = this.getItems();
    localStorage.setItem('cart', JSON.stringify([...storedItems, book]));
    this.currentCartSource.next([...storedItems, book]);
  }

  addToFavourites(book: Book) {
    const storedItems = this.getFavouritedBooks();

    if (storedItems.length <= 0) {
      const w = [
        {
          id: book.id,
          favourited: true,
        },
      ];
      localStorage.setItem('favourites', JSON.stringify(w));
    }

    if (storedItems.length >= 0) {
      console.log('stored', storedItems);

      const selectedArray: number[] = [];

      if (book.id) selectedArray.push(book.id);

      console.log('array', selectedArray);

      const filteredItems = storedItems.filter(
        ({ id }: Book) => !selectedArray?.includes(id || 0)
      );

      console.log('filter', filteredItems);

      const w = [
        ...filteredItems,
        {
          id: book.id,
          favourited: true,
        },
      ];

      console.log(w);

      localStorage.setItem('favourites', JSON.stringify(w));
    }

    // if (book.id)
    //   this.currentFavouritesSource.next([
    //     ...storedItems,
    //     { favourited: true, id: book.id },
    //   ]);
  }

  removeFromFavourites(id: number | undefined) {
    const storedFavouritesSettings = this.getFavouritedBooks();

    console.log(storedFavouritesSettings);

    const x = storedFavouritesSettings.find((setting) => setting.id === id);
    console.log('xx');

    if (x) {
      x['favourited'] = false;
      console.log(storedFavouritesSettings);
      console.log(x);
      localStorage.setItem(
        'favourites',
        JSON.stringify(storedFavouritesSettings)
      );
    }
  }

  confirmOrder(bookIds: number[]) {
    bookIds.forEach((element) => {
      this.http
        .patch<any>(
          `${
            this.baseURL
          }/books/${element}?userId=${this.userId$.getValue()}&status=loaned`,
          this.userId$.getValue()
        )
        .subscribe(() => console.log('Order confirmed'));
    });
  }

  setCurrentCart(cart: Book[] | null) {
    this.currentCartSource.next(cart);
  }

  setCurrentUserId(id: number) {
    this.userId$.next(id);
  }
}
