import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RawApiDataCustomer } from '../../_models/rawapi';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  public baseURL = environment.apiUrl;
  private http = inject(HttpClient);

  getCustomers() {
    return this.http
      .get<RawApiDataCustomer>(`${this.baseURL}/users`)
      .pipe(map((data) => data.data));
  }

  getCustomersWithBooks() {
    return this.http
      .get<RawApiDataCustomer>(`${this.baseURL}/users?includeBooks=true`)
      .pipe(map((data) => data.data));
  }
}
