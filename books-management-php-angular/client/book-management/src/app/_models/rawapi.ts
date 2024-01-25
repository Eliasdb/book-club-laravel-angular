import { Book } from './book';
import { Customer } from './customer';

export interface RawApiDataCustomer {
  data: Customer[];
  links: string[];
  meta: any;
}

export interface RawApiDataBooks {
  data: Book[];
  links: string[];
  meta: any;
}

export interface RawApiDataBook {
  data: Book;
  links: string[];
  meta: any;
}
