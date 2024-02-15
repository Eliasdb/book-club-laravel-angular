import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../../../_models/post';

@Component({
  selector: 'home-post-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
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
              <mat-icon class="share">edit</mat-icon>
              <mat-icon class="share" (click)="deletePost()">delete</mat-icon>
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
            <div class="comment-container">
              <div class="img-container-commenter">
                <img
                  src="https://material.angular.io/assets/img/examples/shiba1.jpg"
                  alt=""
                />
              </div>
              <div class="comment-details">
                <p class="commenter-name">Elias De Bock</p>
                <p>This content sucks!!</p>
              </div>
            </div>
          </section>
          <section class="add-comment-section">
            <div class="img-container-commenter">
              <img
                src="https://material.angular.io/assets/img/examples/shiba1.jpg"
                alt=""
              />
            </div>
            <div class="input-container">
              <input type="text" placeholder="Write a comment..." />
              <mat-icon class="post-action-icon">keyboard_arrow_right</mat-icon>
            </div>
          </section>
        </mat-card-content>
      </mat-card>
    </section>
    }`,
  styleUrl: './home-post-item.component.scss',
})
export class HomePostItemComponent {
  @Input() post?: Post;

  @Output() delete = new EventEmitter<string>();

  deletePost() {
    this.delete.emit();
  }
}
