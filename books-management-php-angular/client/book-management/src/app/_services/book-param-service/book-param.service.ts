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
    distinctUntilChanged(),
    startWith(''),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  private navigate(params: BookQueryParams): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
