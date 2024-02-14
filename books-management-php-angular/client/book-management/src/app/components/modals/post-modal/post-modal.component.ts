import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'post-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule],
  template: `
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
        <p>Elias De Bock</p>
      </section>
      <section class="textarea-container">
        <textarea
          cols="60"
          rows="10"
          placeholder="What's on your mind, USER?"
        ></textarea>
      </section>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="btn-container">
        <button class="post-btn" cdkFocusInitial>Post</button>
      </div>
    </mat-dialog-actions>
  `,
  styleUrl: './post-modal.component.scss',
})
export class PostDialog {}
