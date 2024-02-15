import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, take } from 'rxjs';
import { Comment, Post } from '../../../../_models/post';
import { CommentService } from '../../../../_services/comment-service/comment.service';
import { EditPostDialog } from '../../../../components/modals/edit-post-modal/edit-post-modal.component';

@Component({
  selector: 'home-post-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, FormsModule],
  template: ` @if(post) {
    <section class="post-item">
      <mat-card>
        <mat-card-content>
          <section class="post-item-header">
            <section class="left-side">
              <div class="img-container-poster">
                <img
                  src="https://material.angular.io/assets/img/examples/shiba1.jpg"
                  alt=""
                />
              </div>
              <div class="post-item-details">
                <p class="bold">{{ post.username }}</p>
                <p class="grey">
                  <small>{{ post.creationDate | date : 'longDate' }}</small>
                </p>
              </div>
            </section>
            <section class="right-side">
              @if(userId === post.userId) {
              <mat-icon class="share" (click)="openDialog()">edit</mat-icon>
              <mat-icon class="share" (click)="deletePost()">delete</mat-icon>
              }
            </section>
          </section>
          <section class="post-item-body">
            <p>
              {{ post.content }}
            </p>
          </section>
          <section class="post-item-action-bar">
            <hr />
            <div class="post-item-action-bar-items">
              <div class="post-item-action-bar-item">
                <mat-icon class="like">thumb_up_off_alt</mat-icon>
                <p>Like</p>
              </div>
              <div class="post-item-action-bar-item">
                <mat-icon class="add">add_comment</mat-icon>
                <p>Comment</p>
              </div>
              <div class="post-item-action-bar-item">
                <mat-icon class="share">share</mat-icon>
                <p>Share</p>
              </div>
            </div>
            <hr />
          </section>
          <section class="comment-section">
            @for (comment of post.comments; track $index) {
            <div class="comment-container">
              <div class="img-container-commenter">
                <img
                  src="{{ comment.photoUrl }}"
                  alt="Profile picture commenter"
                />
              </div>
              <div class="comment-details">
                <p class="commenter-name">{{ comment.poster }}</p>
                <p>{{ comment.content }}</p>
              </div>
            </div>
            }
          </section>
          <section class="add-comment-section">
            <div class="img-container-commenter">
              <img
                src="https://material.angular.io/assets/img/examples/shiba1.jpg"
                alt=""
              />
            </div>
            <div class="input-container">
              <input
                type="text"
                placeholder="Write a comment..."
                [(ngModel)]="comment.content"
              />
              <mat-icon class="post-action-icon" (click)="onAddComment()"
                >keyboard_arrow_right</mat-icon
              >
            </div>
          </section>
        </mat-card-content>
      </mat-card>
    </section>
    }`,
  styleUrl: './home-post-item.component.scss',
})
export class HomePostItemComponent implements OnInit {
  private commentService = inject(CommentService);

  @Input() post?: Post;
  @Output() deleteP = new EventEmitter();

  private dialog = inject(MatDialog);
  protected userId = Number(localStorage.getItem('id'));
  private user: string = JSON.parse(localStorage.getItem('user') || '');

  postId$ = new BehaviorSubject<number | undefined>(0);

  comment: Comment = {
    postId: 0,
    poster: this.user,
    content: '',
    photoUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
  };

  addComment = this.commentService.addComment();

  onAddComment() {
    this.addComment.mutate(this.comment);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditPostDialog, {
      data: {
        postId: this.post?.id,
        content: this.post?.content,
        username: this.post?.username,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deletePost() {
    this.deleteP.emit();
  }

  ngOnInit(): void {
    this.postId$.next(this.post?.id);
    this.postId$.pipe(take(1)).subscribe((res) => {
      console.log('lol', res);
      this.comment.postId = res;
    });
  }
}
