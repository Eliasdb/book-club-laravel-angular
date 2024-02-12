import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { map } from 'rxjs';
import { Book, FavouriteBook } from '../../_models/book';
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
  private mutation = injectMutation();
  private query = injectQuery();
  private queryClient = injectQueryClient();

  // private isFavouritedSource = new BehaviorSubject<boolean>(false);
  // isFavourited$ = this.isFavouritedSource.asObservable();

  // public getIsFavourited(): Observable<boolean> {
  //   return this.isFavourited$;
  // }

  // public toggleFavourite(): void {
  //   this.isFavouritedSource.next(!this.isFavouritedSource.value);
  // }

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
          .pipe(
            // projects what we are getting back from API
            map((response) => response.data)
          );
      },
    });
  }

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
          .pipe(
            // projects what we are getting back from API
            map((response) => response.data)
          );
      },
    });
  }

  queryBooksById(id: number) {
    return this.query({
      queryKey: ['BOOKS', id],
      queryFn: () => {
        return this.http
          .get<RawApiDataBook>(`http://localhost:8000/api/v1/books/${id}`)
          .pipe(
            // projects what we are getting back from API
            map((response) => {
              return response.data;
            })
          );
      },
    });
  }

  addBook() {
    return this.mutation({
      mutationFn: (book: Book) =>
        this.http.post<Book>(`http://localhost:8000/api/v1/books`, book),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['ADMIN_BOOKS'] }),
    });
  }

  favouriteBook() {
    return this.mutation({
      mutationFn: (book: FavouriteBook) =>
        this.http.post<FavouriteBook>(
          `http://localhost:8000/api/v1/favourites`,
          book
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['USER_DETAILS'] }),
    });
  }

  removeFromFavourites() {
    return this.mutation({
      mutationFn: (id: number) =>
        this.http.delete<FavouriteBook>(
          `http://localhost:8000/api/v1/favourites/${id}`
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['USER_DETAILS'] }),
    });
  }

  // addBook(book: Book) {
  //   return queryOptions({
  //     queryKey: ['BOOKS', book.title],
  //     queryFn: () => {
  //       return this.http.post<Book>(`${environment.apiUrl}/books`, book).pipe(
  //         // projects what we are getting back from API
  //         map((data) => {
  //           console.log(data);

  //           return data;
  //         })
  //       );
  //     },
  //   });
  // }

  // createCreateBookMutation() {
  //   return this.useMutation((book: Book) =>
  //     this.http.post<Book>(`${environment.apiUrl}/books`, book)
  //   );
  // }
}
