import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { filterSuccessResult } from '@ngneat/query';
import { map } from 'rxjs';
import { Post } from '../../../../_models/post';
import { PostService } from '../../../../_services/post-service/post-service.service';
import { HomePostItemComponent } from '../home-post-item/home-post-item.component';

@Component({
  selector: 'home-posts-container',
  standalone: true,
  imports: [HomePostItemComponent, CommonModule],
  template: `
    <section class="posts-container">
      @if(posts.result$ | async; as result) { @if(result.isSuccess) { @for(post
      of result.data.items; track $index) {
      <home-post-item [post]="post" (deleteP)="onRemovePost(post)" />
      } } }
    </section>
  `,
  styleUrl: './home-posts.container.scss',
})
export class HomePostsContainer {
  private postService = inject(PostService);

  posts = this.postService.queryPosts();
  removePost = this.postService.removePost();

  onRemovePost(post: Post) {
    if (post.id) {
      this.removePost.mutate(post.id);
    }
  }

  protected posts$ = this.posts.result$.pipe(
    // don't need to subscribe because async pipe does it
    filterSuccessResult(),
    map((res) => {
      return res.data?.items;
    })
  );
}
