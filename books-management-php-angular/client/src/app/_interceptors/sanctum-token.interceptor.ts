import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account-service/account.service';

@Injectable()
export class LaravelSanctumTokenInterceptor implements HttpInterceptor {
  private accountService = inject(AccountService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accountService.currentToken$.pipe(take(1)).subscribe({
      next: (token) => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      },
    });
    return next.handle(request);
  }
}
