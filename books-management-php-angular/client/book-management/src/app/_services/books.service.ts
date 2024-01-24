import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { queryOptions } from '@ngneat/query';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RawApiDataBooks } from '../_models/rawapi';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  queryBooks() {
    return queryOptions({
      queryFn: () => {
        return this.http
          .get<RawApiDataBooks>(`${environment.apiUrl}/books`)
          .pipe(
            // projects what we are getting back from API
            map((data) => data.data)
          );
      },
    });
  }
}
