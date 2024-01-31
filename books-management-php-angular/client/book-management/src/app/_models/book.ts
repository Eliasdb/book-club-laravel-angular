export interface Book {
  id: number;
  photoUrl: string;
  customerId: number;
  genre: string;
  title: string;
  author: string;
  status: string;
  addedDate: Date;
  publishedDate: Date;
  lastLoanedDate: Date;
}
