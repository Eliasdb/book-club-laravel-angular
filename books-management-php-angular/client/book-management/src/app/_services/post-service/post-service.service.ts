import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { map } from 'rxjs';
import { Post } from '../../_models/post';
import { RawApiDataPosts } from '../../_models/rawapi';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private mutation = injectMutation();
  private query = injectQuery();
  private queryClient = injectQueryClient();

  queryPosts() {
    return this.query({
      queryKey: ['POSTS'],
      queryFn: () => {
        return this.http
          .get<RawApiDataPosts>(
            `http://localhost:8000/api/v1/posts?sort=id,desc`
          )
          .pipe(
            // projects what we are getting back from API
            map((response) => {
              console.log(response);

              return response.data;
            })
          );
      },
    });
  }

  addPost() {
    return this.mutation({
      mutationFn: (post: Post) =>
        this.http.post<Post>(`http://localhost:8000/api/v1/posts`, post),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['POSTS'] }),
    });
  }

  editPost() {
    return this.mutation({
      mutationFn: (post: Post) =>
        this.http.patch<Post>(
          `http://localhost:8000/api/v1/posts/${post.id}`,
          post
        ),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['POSTS'] }),
    });
  }

  removePost() {
    return this.mutation({
      mutationFn: (id: number) =>
        this.http.delete<Post>(`http://localhost:8000/api/v1/posts/${id}`),
      onSuccess: () =>
        this.queryClient.invalidateQueries({ queryKey: ['POSTS'] }),
    });
  }
}
