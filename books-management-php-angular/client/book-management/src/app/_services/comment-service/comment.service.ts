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

  // queryCommentsByPostId(id: number | undefined) {
  //   return this.query({
  //     queryKey: ['COMMENTS', id],
  //     queryFn: () => {
  //       return this.http
  //         .get<any>(
  //           `http://localhost:8000/api/v1/posts/${id}?includeComments=true`
  //         )
  //         .pipe(
  //           // projects what we are getting back from API
  //           map((response) => {
  //             console.log(response);
  //             return response.data;
  //           })
  //         );
  //     },
  //   });
  // }
}
