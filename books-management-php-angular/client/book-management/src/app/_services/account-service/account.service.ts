import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseURL = environment.apiUrl;
  private userId = localStorage.getItem('id');
  userDetails: any = {
    id: 0,
    email: '',
    name: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    city: '',
  };

  // User | null is a union type
  private currentUserSource = new BehaviorSubject<User | null>(null);
  private currentTokenSource = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  currentToken$ = this.currentTokenSource.asObservable();

  private http = inject(HttpClient);

  login(model: any) {
    // pipe: does something with observable before subscribing
    return this.http.post<User>(this.baseURL + '/login', model).pipe(
      map((response: User) => {
        const user = response;
        console.log(user);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user.userName));
          localStorage.setItem('id', JSON.stringify(user.id));
          localStorage.setItem('token', JSON.stringify(user.accessToken));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseURL + '/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user.userName));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  updateUser(user: User) {
    return this.http.patch<User>(this.baseURL + `/users/${this.userId}`, user);
  }

  getUserDetails() {
    return this.http.get<any>(`${this.baseURL}/users/${this.userId}`).pipe(
      map((details) => {
        this.userDetails = details;
        return details;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  setCurrentToken(token: string) {
    this.currentTokenSource.next(token);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.currentUserSource.next(null);
  }
}
