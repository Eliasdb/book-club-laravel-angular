import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UseMutation, queryOptions } from '@ngneat/query';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Book } from '../../_models/book';
import { RawApiDataBook, RawApiDataBooks } from '../../_models/rawapi';
import {
  AUTHORS_QUERY_PARAM,
  BookQueryParams,
  SEARCH_QUERY_PARAM,
} from './book-param.type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private useMutation = inject(UseMutation);

  queryBooks(parameters?: Partial<BookQueryParams>) {
    return queryOptions({
      queryKey: [
        'BOOKS',
        parameters?.[AUTHORS_QUERY_PARAM],
        parameters?.[SEARCH_QUERY_PARAM],
      ],
      queryFn: () => {
        let params = new HttpParams();

        if (parameters?.author && parameters?.author !== '') {
          params = params.set('author', parameters.author);
        }

        if (parameters?.query && parameters?.query !== '') {
          params = params.set('q', parameters.query);
        }

        return this.http
          .get<RawApiDataBooks>(`${environment.apiUrl}/books`, { params })
          .pipe(
            // projects what we are getting back from API
            map((data) => data)
          );
      },
    });
  }

  queryBooksById(id: number) {
    return queryOptions({
      queryKey: ['BOOKS', id],
      queryFn: () => {
        return this.http
          .get<RawApiDataBook>(`${environment.apiUrl}/books/${id}`)
          .pipe(
            // projects what we are getting back from API
            map((data) => {
              return data.data;
            })
          );
      },
    });
  }

  addBook(book: Book) {
    return queryOptions({
      queryKey: ['BOOKS', book.title],
      queryFn: () => {
        return this.http.post<Book>(`${environment.apiUrl}/books`, book).pipe(
          // projects what we are getting back from API
          map((data) => {
            console.log(data);

            return data;
          })
        );
      },
    });
  }

  createCreateBookMutation() {
    return this.useMutation((book: Book) =>
      this.http.post<Book>(`${environment.apiUrl}/books`, book)
    );
  }
}
