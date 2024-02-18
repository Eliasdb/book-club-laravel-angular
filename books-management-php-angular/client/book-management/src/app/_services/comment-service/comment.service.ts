import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { Comment } from '../../_models/post';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  private mutation = injectMutation();
  private query = injectQuery();
  private queryClient = injectQueryClient();

  addComment() {
    return this.mutation({
      mutationFn: (comment: Comment) =>
        this.http.post<Comment>(
          `http://localhost:8000/api/v1/comments`,
          comment
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['POSTS'] }),
    });
  }
}
