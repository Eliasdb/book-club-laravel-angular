import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RawApiDataCustomer } from '../../_models/rawapi';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  baseURL = environment.apiUrl;

  private http = inject(HttpClient);

  getCustomers() {
    return this.http.get<RawApiDataCustomer>(`${this.baseURL}/users`).pipe(
      // projects what we are getting back from API
      map((data) => {
        console.log(data.data);
        return data.data;
      })
    );
  }

  getCustomersWithBooks() {
    return this.http
      .get<RawApiDataCustomer>(`${this.baseURL}/users?includeBooks=true`)
      .pipe(
        // projects what we are getting back from API
        map((data) => {
          console.log(data.data);
          return data.data;
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
