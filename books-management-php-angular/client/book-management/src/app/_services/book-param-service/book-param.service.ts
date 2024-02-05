import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
} from 'rxjs';
import {
  AUTHORS_QUERY_PARAM,
  BookQueryParams,
  SEARCH_QUERY_PARAM,
} from '../books-service/book-param.type';

@Injectable({
  providedIn: 'root',
})
export class BookParamService {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private queryParams$ = this.activatedRoute.queryParams;

  public author$ = this.queryParams$.pipe(
    filter((params) => params[AUTHORS_QUERY_PARAM]),
    map((params): string => params[AUTHORS_QUERY_PARAM]),

    startWith(''),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public query$ = this.queryParams$.pipe(
    filter((params) => params[SEARCH_QUERY_PARAM] !== undefined),
    map((params): string => params[SEARCH_QUERY_PARAM]),
    startWith(''),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  public navigate(params: BookQueryParams): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
