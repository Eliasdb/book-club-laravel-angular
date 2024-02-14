import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { PostDialog } from '../../../../components/modals/post-modal/post-modal.component';

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
              <p>What's on your mind, USER?</p>
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

  openDialog() {
    const dialogRef = this.dialog.open(PostDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
