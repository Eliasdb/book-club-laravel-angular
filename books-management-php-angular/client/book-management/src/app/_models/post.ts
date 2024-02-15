export interface Post {
  id?: number;
  userId: number;
  username: string;
  photoUrl: string;
  content: string;
  creationDate?: Date;
}
