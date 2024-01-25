import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer } from '../../_models/customer';
import { RawApiDataCustomer } from '../../_models/rawapi';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  baseURL = environment.apiUrl;
  customers: Customer[] = [];

  private http = inject(HttpClient);

  getCustomers() {
    if (this.customers.length > 0) return of(this.customers);
    return this.http.get<RawApiDataCustomer>(`${this.baseURL}/customers`).pipe(
      // projects what we are getting back from API
      map((data) => {
        this.customers = data.data;
        return this.customers;
      })
    );
  }

  // getMember(username: string) {
  //   const member = this.members.find((x) => x.userName === username);
  //   if (member) return of(member);
  //   return this.http.get<Member>(`${this.baseURL}users/${username}`);
  // }

  // updateMember(member: Member) {
  //   return this.http.put(`${this.baseURL}users`, member).pipe(
  //     map(() => {
  //       const index = this.members.indexOf(member);
  //       this.members[index] = { ...this.members[index], ...member };
  //     })
  //   );
  // }
}
