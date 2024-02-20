import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'favourite-button',
  standalone: true,
  imports: [MatButtonModule, ToggleComponent, MatIconModule],
  template: `
    <button mat-raised-button (click)="favouriteEmit($event)">
      <mat-icon>favorite</mat-icon>
      Favourite
    </button>
  `,
  styleUrl: './favourite-button.component.scss',
})
export class FavouriteButtonComponent {
  @Output() favourite = new EventEmitter<Event>();

  favouriteEmit($event: any) {
    this.favourite.emit($event);
  }
}
