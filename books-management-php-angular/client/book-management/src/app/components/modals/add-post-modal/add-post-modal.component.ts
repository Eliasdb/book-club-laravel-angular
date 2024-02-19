import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../../_models/post';
import { AccountService } from '../../../_services/account-service/account.service';
import { PostService } from '../../../_services/post-service/post-service.service';

@Component({
  selector: 'add-post-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
  template: `
    @if(userDetails.result$ | async; as result) { @if(result.isSuccess) {
    <section class="top-bar">
      <h2 mat-dialog-title style="margin-top: 7px;">Create post</h2>

      <button [mat-dialog-close]="true" mat-mini-fab class="mini-fab">
        <mat-icon>close</mat-icon>
      </button>
    </section>
    <mat-dialog-content class="mat-typography">
      <section class="profile-details">
        <div class="img-container">
          <img
            src="https://material.angular.io/assets/img/examples/shiba1.jpg"
            alt=""
          />
        </div>
        <p>{{ result.data.name }}</p>
      </section>
      <section class="textarea-container">
        <textarea
          cols="60"
          rows="10"
          placeholder="What's on your mind, USER?"
          [(ngModel)]="post.content"
        ></textarea>
      </section>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="btn-container">
        <button
          class="post-btn"
          [mat-dialog-close]="true"
          cdkFocusInitial
          (click)="onAddPost()"
        >
          Post
        </button>
      </div>
    </mat-dialog-actions>
    } }
  `,
  styleUrl: './add-post-modal.component.scss',
})
export class AddPostDialog {
  private accountService = inject(AccountService);
  private postService = inject(PostService);

  private userId = Number(localStorage.getItem('id'));
  private user: string = JSON.parse(localStorage.getItem('user') || '');

  userDetails = this.accountService.getUserDetails();
  addPosts = this.postService.addPost();

  post: Post = {
    userId: this.userId,
    username: this.user,
    photoUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    content: '',
  };

  onAddPost() {
    this.addPosts.mutate(this.post);
  }
}
