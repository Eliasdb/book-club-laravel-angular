import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@ngneat/query';
import { Todo } from '../../_models/rawapi';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  // private useMutation = inject(UseMutation);
  #query = injectQuery();

  getTodos() {
    return this.#query({
      queryKey: ['todos'] as const,
      queryFn: () => {
        return this.http.get<Todo[]>(
          'https://jsonplaceholder.typicode.com/todos'
        );
      },
    });
  }

  // queryBooks(parameters?: Partial<BookQueryParams>) {
  //   return queryOptions({
  //     queryKey: [
  //       'BOOKS',
  //       parameters?.[AUTHORS_QUERY_PARAM],
  //       parameters?.[GENRE_QUERY_PARAM],
  //       parameters?.[SEARCH_QUERY_PARAM],
  //       parameters?.[STATUS_QUERY_PARAM],
  //       parameters?.[SORT_QUERY_PARAM],
  //     ],
  //     queryFn: () => {
  //       const { status } = {
  //         ...parameters,
  //         status:
  //           parameters && parameters.status ? parameters.status : 'available',
  //       };

  //       let params = new HttpParams();
  //       params = params.set('status', status);

  //       if (parameters?.genre && parameters?.genre !== '') {
  //         params = params.set('genre', parameters.genre);
  //       }

  //       if (parameters?.search && parameters?.search !== '') {
  //         params = params.set('q', parameters.search);
  //       }

  //       if (parameters?.author && parameters?.author !== '') {
  //         params = params.set('author', parameters.author);
  //       }

  //       if (parameters?.sort && parameters?.sort !== '') {
  //         params = params.set('sort', parameters.sort);
  //       }

  //       if (parameters?.genre && parameters?.genre == 'all') {
  //         params = params.set('genre', '');
  //       }

  //       return this.http
  //         .get<RawApiDataBooks>(`${environment.apiUrl}/books`, { params })
  //         .pipe(
  //           // projects what we are getting back from API
  //           map((response) => response.data)
  //         );
  //     },
  //   });
  // }

  // queryBooksById(id: number) {
  //   return queryOptions({
  //     queryKey: ['BOOKS', id],
  //     queryFn: () => {
  //       return this.http
  //         .get<RawApiDataBook>(`${environment.apiUrl}/books/${id}`)
  //         .pipe(
  //           // projects what we are getting back from API
  //           map((data) => {
  //             return data.data;
  //           })
  //         );
  //     },
  //   });
  // }

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

  // createBooksInfiniteQuery(parameters?: Partial<BookQueryParams>) {
  //   let params = new HttpParams();

  //   if (parameters?.status && parameters?.status !== '') {
  //     params = params.set('status', parameters.status);
  //   }

  //   if (parameters?.genre && parameters?.genre !== '') {
  //     params = params.set('genre', parameters.genre);
  //   }

  //   if (parameters?.search && parameters?.search !== '') {
  //     params = params.set('q', parameters.search);
  //   }

  //   if (parameters?.author && parameters?.author !== '') {
  //     params = params.set('author', parameters.author);
  //   }

  //   if (parameters?.sort && parameters?.sort !== '') {
  //     params = params.set('sort', parameters.sort);
  //   }

  //   if (parameters?.genre && parameters?.genre == 'all') {
  //     params = params.set('genre', '');
  //   }
  // }
}
