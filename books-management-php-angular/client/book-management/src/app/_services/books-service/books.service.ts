import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queryOptions } from '@ngneat/query';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RawApiDataBook, RawApiDataBooks } from '../../_models/rawapi';
import { BookQueryParams } from './book-param.type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  queryBooks(parameters?: Partial<BookQueryParams>) {
    return queryOptions({
      queryKey: ['BOOKS'],
      queryFn: () => {
        let params = new HttpParams();

        if (parameters?.author && parameters?.author !== '') {
          params = params.set('author', parameters.author);
        }

        return this.http
          .get<RawApiDataBooks>(`${environment.apiUrl}/books`, { params })
          .pipe(
            // projects what we are getting back from API
            map((data) => data.data)
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
}
