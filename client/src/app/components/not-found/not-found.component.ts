import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: ` <section class="not-found-page">
    <div class="inner">
      <h2>This page does not exist...</h2>
      <button mat-raised-button routerLink="/home">Return to home page</button>
    </div>
  </section>`,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
