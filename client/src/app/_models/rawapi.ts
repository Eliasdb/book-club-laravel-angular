import { Book, FavouriteBook } from './book';
import { Customer } from './customer';
import { Post } from './post';

export interface RawApiDataCustomer {
  data: Customer[];
  links: string[];
  meta: any;
}

export interface RawApiDataBooks {
  data: {
    items: Book[];
    count: number;
  };
}
export interface RawApiDataBook {
  data: Book;
}

export interface AdminStats {
  data: {
    userCount: number;
    bookCount: number;
    loanedBooksCount: number;
    totalsByGenre: number[];
    userData: [
      {
        user: string;
        posts: number;
        comments: number;
      }
    ];
    totalsByCity: [
      {
        city: string;
        count: number;
      }
    ];
  };
}

export interface RawApiDataUserFav {
  data: {
    addedDate: Date;
    address: string;
    city: string;
    email: string;
    favourites: Book[];
    firstName: string;
    lastName: string;
    id: number;
    name: string;
    phoneNumber: string;
    postalCode: string;
  };
}

export interface RawApiDataUser {
  data: {
    addedDate: string;
    address: string;
    city: string;
    email: string;
    favourites: FavouriteBook[];
    firstName: string;
    lastName: string;
    id: number;
    name: string;
    phoneNumber: string;
    postalCode: string;
  };
}

export interface LogOut {
  message: string;
  status: boolean;
}

export interface RawApiDataBook {
  data: Book;
}

export interface RawApiDataPosts {
  data: {
    items: Post[];
  };
}
