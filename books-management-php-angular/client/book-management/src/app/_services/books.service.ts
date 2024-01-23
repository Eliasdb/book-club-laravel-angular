import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Book } from '../_models/book';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { RawApiDataBooks } from '../_models/rawapi';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseURL = environment.apiUrl;
  books: Book[] = [];

  private http = inject(HttpClient);

    getBooks() {
    if (this.books.length > 0) return of(this.books);
    return this.http.get<RawApiDataBooks>(`${this.baseURL}/books`).pipe(
      // projects what we are getting back from API
      map((data) => {
        this.books = data.data; 
        console.log();
               
        return this.books; 
      })
    );
  }


  constructor() { }
}
