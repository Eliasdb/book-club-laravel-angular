import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@ngneat/query';
import { map } from 'rxjs';
import { RawApiDataBook, RawApiDataBooks } from '../../_models/rawapi';
import {
  AUTHORS_QUERY_PARAM,
  BookQueryParams,
  GENRE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
  SORT_QUERY_PARAM,
  STATUS_QUERY_PARAM,
} from './book-param.type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private query = injectQuery();

  public queryBooks(parameters?: Partial<BookQueryParams>) {
    return this.query({
      queryKey: [
        'BOOKS',
        parameters?.[AUTHORS_QUERY_PARAM],
        parameters?.[GENRE_QUERY_PARAM],
        parameters?.[SEARCH_QUERY_PARAM],
        parameters?.[STATUS_QUERY_PARAM],
        parameters?.[SORT_QUERY_PARAM],
      ] as const,

      queryFn: () => {
        const { status } = {
          ...parameters,
          status:
            parameters && parameters.status ? parameters.status : 'available',
        };

        let params = new HttpParams();
        params = params.set('status', status);

        if (parameters?.genre && parameters?.genre !== '') {
          params = params.set('genre', parameters.genre);
        }

        if (parameters?.search && parameters?.search !== '') {
          params = params.set('q', parameters.search);
        }

        if (parameters?.author && parameters?.author !== '') {
          params = params.set('author', parameters.author);
        }

        if (parameters?.sort && parameters?.sort !== '') {
          params = params.set('sort', parameters.sort);
        }

        if (parameters?.genre && parameters?.genre == 'all') {
          params = params.set('genre', '');
        }
        return this.http
          .get<RawApiDataBooks>('http://localhost:8000/api/v1/books', {
            params,
          })
          .pipe(map((response) => response.data));
      },
    });
  }

  public queryBooksById(id: number) {
    return this.query({
      queryKey: ['BOOKS', id],
      queryFn: () => {
        return this.http
          .get<RawApiDataBook>(`http://localhost:8000/api/v1/books/${id}`)
          .pipe(map((response) => response.data));
      },
    });
  }

  public queryBooksByGenre(genre?: string) {
    return this.query({
      queryKey: ['RELATED_BOOKS', genre],
      queryFn: () => {
        return this.http
          .get<RawApiDataBooks>(
            `http://localhost:8000/api/v1/books?genre=${genre}`
          )
          .pipe(map((response) => response.data));
      },
    });
  }
}
