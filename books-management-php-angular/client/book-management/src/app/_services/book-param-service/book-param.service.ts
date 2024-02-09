import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';
import { Genre } from '../../_data/data';
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
export class BookParamService {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private queryParams$ = this.activatedRoute.queryParams;

  public query$ = this.queryParams$.pipe(
    tap((res) => {
      console.log('authors', res);
    }),
    filter((params) => params[SEARCH_QUERY_PARAM] !== undefined),
    map((params): string => params[SEARCH_QUERY_PARAM]),
    startWith(''),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public author$ = this.queryParams$.pipe(
    tap((res) => {
      console.log('authors', res);
    }),
    filter((params) => params[AUTHORS_QUERY_PARAM] !== undefined),
    map((params): string => params[AUTHORS_QUERY_PARAM]),
    startWith(''),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public genre$ = this.queryParams$.pipe(
    tap((res) => {
      console.log('genre', res);
    }),
    filter((params) => params[GENRE_QUERY_PARAM] !== undefined),
    map((params): Genre => params[GENRE_QUERY_PARAM]),
    startWith(''),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public status$ = this.queryParams$.pipe(
    tap((res) => {
      console.log('status', res);
    }),
    filter((params) => params[STATUS_QUERY_PARAM] !== undefined),
    map((params): string => params[STATUS_QUERY_PARAM]),
    startWith(''),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public sort$ = this.queryParams$.pipe(
    tap((res) => {
      console.log('sort', res);
    }),
    filter((params) => params[SORT_QUERY_PARAM] !== undefined),
    map((params): string => params[SORT_QUERY_PARAM]),
    startWith(''),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public navigate(params: BookQueryParams): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  public clearParams() {
    this.router.navigate([], {
      queryParams: {
        [AUTHORS_QUERY_PARAM]: '',
        [SEARCH_QUERY_PARAM]: '',
        [STATUS_QUERY_PARAM]: '',
        [SORT_QUERY_PARAM]: '',
        [GENRE_QUERY_PARAM]: '',
      },
      queryParamsHandling: 'merge',
    });
  }
}
