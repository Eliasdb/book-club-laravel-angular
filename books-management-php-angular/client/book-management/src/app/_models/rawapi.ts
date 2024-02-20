import { Book } from './book';
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
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string | null;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  updated_at?: string;
  created_at?: string;
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
