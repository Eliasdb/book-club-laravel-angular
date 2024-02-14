import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Book } from '../../_models/book';

@Component({
  selector: 'breadcrumbs',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  template: ` <section class="breadcrumbs-container">
    <a routerLink="../../home"><mat-icon>home</mat-icon></a>
    <mat-icon>keyboard_arrow_right</mat-icon>
    <p><a routerLink="../../books">Books</a></p>
    <mat-icon>keyboard_arrow_right</mat-icon>
    <p class="title">{{ book?.title }}</p>
  </section>`,
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  @Input() book?: Book | null;
}
