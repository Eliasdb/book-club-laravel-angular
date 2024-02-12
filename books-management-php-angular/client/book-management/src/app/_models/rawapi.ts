import { Book } from './book';
import { Customer } from './customer';

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

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
