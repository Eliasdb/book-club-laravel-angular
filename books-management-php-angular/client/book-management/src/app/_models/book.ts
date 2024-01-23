export interface Book {
  id: number;
  customerId: number;
  name: string;
  author: string;
  status: string;
  addedDate: Date;
  publishedDate: Date;
  lastLoanedDate: Date;
}