import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostDialog } from '../../../../components/modals/create-post-modal/create-post-modal.component';

@Component({
  selector: 'home-post-prompt',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <section class="prompt-container">
      <mat-card>
        <mat-card-content>
          <section class="prompt-container">
            <div class="img-container">
              <img
                src="https://material.angular.io/assets/img/examples/shiba1.jpg"
                alt="Profile picture"
              />
            </div>
            <section class="text" (click)="openDialog()">
              <p>What's on your mind, {{ this.user }}?</p>
            </section>
          </section>
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styleUrl: './home-post-prompt.component.scss',
})
export class HomePostPromptComponent {
  private dialog = inject(MatDialog);

  protected user: string = JSON.parse(localStorage.getItem('user') || '');

  openDialog() {
    const dialogRef = this.dialog.open(CreatePostDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
