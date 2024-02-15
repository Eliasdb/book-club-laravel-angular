import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../../_models/post';
import { PostService } from '../../../_services/post-service/post-service.service';

@Component({
  selector: 'app-edit-post-modal',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButtonModule, FormsModule],
  template: ` <section class="top-bar">
      <h2 mat-dialog-title style="margin-top: 7px;">Edit post</h2>

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
        <p>{{ data.username }}</p>
      </section>
      <section class="textarea-container">
        <textarea cols="60" rows="10" [(ngModel)]="post.content">{{
          data.content
        }}</textarea>
      </section>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="btn-container">
        <button
          class="post-btn"
          [mat-dialog-close]="true"
          cdkFocusInitial
          (click)="onEditPost()"
        >
          Edit
        </button>
      </div>
    </mat-dialog-actions>`,
  styleUrl: './edit-post-modal.component.scss',
})
export class EditPostDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { postId: number; username: string; content: string }
  ) {}

  private postService = inject(PostService);
  editPost = this.postService.editPost();

  post: Post = {
    id: this.data.postId,
    content: '',
  };

  onEditPost() {
    this.editPost.mutate(this.post);
  }

  ngOnInit() {
    this.post.content = this.data.content;
  }
}
