import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'home-post-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: ` <section class="post-item">
    <mat-card>
      <mat-card-content>
        <section class="post-item-header">
          <div class="img-container-poster">
            <img
              src="https://material.angular.io/assets/img/examples/shiba1.jpg"
              alt=""
            />
          </div>
          <div class="post-item-details">
            <p class="bold">Elias De Bock</p>
            <p class="grey"><small>2 February at 19:57</small></p>
          </div>
        </section>
        <section class="post-item-body">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit rerum harum sapiente voluptates iure aspernatur
            eveniet placeat, architecto ipsa blanditiis vel totam itaque odit
            quos dolores velit consequuntur cum repudiandae! Quibusdam sapiente
            eligendi dolorem architecto accusamus fugit, deserunt, voluptatibus
            deleniti doloremque similique soluta, asperiores et quas vero. Enim,
            deserunt qui!
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
  </section>`,
  styleUrl: './home-post-item.component.scss',
})
export class HomePostItemComponent {}
