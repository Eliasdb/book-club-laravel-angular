import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseURL = environment.apiUrl;
  // User | null is a union type
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private http = inject(HttpClient);

  login(model: any) {
    // pipe: does something with observable before subscribing
    return this.http.post<User>(this.baseURL + '/login', model).pipe(
      map((response: User) => {
        const user = response;
        console.log(user);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user.name));
          localStorage.setItem('token', JSON.stringify(user.token));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseURL + '/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user.name));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }
}
