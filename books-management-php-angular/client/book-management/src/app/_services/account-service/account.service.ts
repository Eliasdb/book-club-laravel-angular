import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { FavouriteBook } from '../../_models/book';
import { LogOut, RawApiDataUserFav } from '../../_models/rawapi';
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
  private query = injectQuery();
  private mutation = injectMutation();
  private queryClient = injectQueryClient();

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

  updateUser() {
    return this.mutation({
      mutationFn: (user: User) =>
        this.http.patch<User>(
          `http://localhost:8000/api/v1/users/${this.userId}`,
          user
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['USER_DETAILS'] }),
    });
  }

  getUserDetails() {
    return this.query({
      queryKey: ['USER_DETAILS'],
      queryFn: () => {
        return this.http
          .get<RawApiDataUserFav>(
            `http://localhost:8000/api/v1/users/${this.userId}?includeFavourites=true`
          )
          .pipe(
            // projects what we are getting back from API
            map((response) => {
              console.log(response.data);
              return response.data;
            })
          );
      },
    });
  }

  public favouriteBook() {
    return this.mutation({
      mutationFn: (book: FavouriteBook) =>
        this.http.post<FavouriteBook>(
          `http://localhost:8000/api/v1/favourites`,
          book
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['USER_DETAILS'] }),
    });
  }

  public removeFromFavourites() {
    return this.mutation({
      mutationFn: (id: number) =>
        this.http.delete<FavouriteBook>(
          `http://localhost:8000/api/v1/favourites/${id}`
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['USER_DETAILS'] }),
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.currentUserSource.next(null);

    return this.http.get<LogOut>('http://localhost:8000/api/v1/logout').pipe(
      // projects what we are getting back from API
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  setCurrentToken(token: string) {
    this.currentTokenSource.next(token);
  }
}
