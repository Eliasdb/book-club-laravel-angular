import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { BehaviorSubject, map } from 'rxjs';
import { Book } from '../../_models/book';
import { RawApiDataBooks } from '../../_models/rawapi';
import {
  AUTHORS_QUERY_PARAM,
  BookQueryParams,
  GENRE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
  SORT_QUERY_PARAM,
  STATUS_QUERY_PARAM,
} from '../books-service/book-param.type';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private mutation = injectMutation();
  private query = injectQuery();
  private queryClient = injectQueryClient();

  isSheetClosed$ = new BehaviorSubject<boolean>(true);
  selection = new SelectionModel<Book>(true, []);
  selectedBooks$ = new BehaviorSubject<Book[]>([]);
  selectedIds$ = new BehaviorSubject<any[]>([]);
  isChecked$ = new BehaviorSubject<boolean>(false);
  isMainChecked$ = new BehaviorSubject<boolean>(false);

  public queryAdminBooks(parameters?: Partial<BookQueryParams>) {
    return this.query({
      queryKey: [
        'ADMIN_BOOKS',
        parameters?.[AUTHORS_QUERY_PARAM],
        parameters?.[GENRE_QUERY_PARAM],
        parameters?.[SEARCH_QUERY_PARAM],
        parameters?.[STATUS_QUERY_PARAM],
        parameters?.[SORT_QUERY_PARAM],
      ] as const,

      queryFn: () => {
        const { sort } = {
          ...parameters,
          sort: parameters && parameters.status ? parameters.status : 'id,desc',
        };

        let params = new HttpParams();
        params = params.set('sort', sort);

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
          .pipe(map((response) => response));
      },
    });
  }

  public addBook() {
    return this.mutation({
      mutationFn: (book: Book) =>
        this.http.post<Book>(`http://localhost:8000/api/v1/books`, book),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['ADMIN_BOOKS'] }),
    });
  }

  public editBook() {
    return this.mutation({
      mutationFn: (book: Book) =>
        this.http.patch<Book>(
          `http://localhost:8000/api/v1/books/${book.id}`,
          book
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['ADMIN_BOOKS'] }),
    });
  }

  public deleteBook() {
    return this.mutation({
      mutationFn: (id: number) =>
        this.http.delete<Book>(`http://localhost:8000/api/v1/books/${id}`),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['ADMIN_BOOKS'] }),
    });
  }
}
