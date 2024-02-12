import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'favourite-button',
  standalone: true,
  imports: [MatButtonModule, ToggleComponent],
  template: `
    <!-- <button mat-raised-button> -->
    <!-- @if {
    <mat-icon>favorite</mat-icon>
    } @else {
    <mat-icon>favorite_border</mat-icon>
    } -->

    <!-- <ng-template #outline> </ng-template>
      Favourite
    </button> -->
    <toggle [on]="false" (toggled)="showMessage($event)"></toggle>
  `,
  styleUrl: './favourite-button.component.scss',
})
export class FavouriteButtonComponent {
  showMessage(value: any) {
    console.log(value);
  }
}
