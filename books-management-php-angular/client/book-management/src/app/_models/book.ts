export interface Book {
  id?: number | undefined;
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

export interface FavouriteBook {
  id?: number;
  photoUrl: string;
  originalId?: number;
  userId?: number;
  genre: string;
  description: string;
  title: string;
  author: string;
  status: string;
  publishedDate: string;
  lastLoanedDate?: Date;
}
