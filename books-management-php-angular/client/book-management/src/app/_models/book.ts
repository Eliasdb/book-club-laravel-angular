export interface Book {
  id?: number;
  photoUrl: string;
  userId?: number;
  genre: string;
  description: string;
  title: string;
  author: string;
  status: string;
  publishedDate: string;
  lastLoanedDate?: Date;
}
