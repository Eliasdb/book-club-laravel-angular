import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../../../_models/book';
import { FavouriteD } from '../../../../_models/user';
import { CartService } from '../../../../_services/cart-service/cart.service';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'favourite-button',
  standalone: true,
  imports: [MatButtonModule, ToggleComponent, MatIconModule, CommonModule],
  template: `
    @if(this.bool === true) {
    <p>true</p>
    <button mat-raised-button (click)="removeFavouriteEmit($event)">
      <mat-icon>favorite</mat-icon>
      Favourite
    </button>
    } @if(this.bool === false) {
    <p>false</p>
    <button mat-raised-button (click)="favouriteEmit($event)">
      <mat-icon>favorite_outline</mat-icon>
      Favourite
    </button>

    } @if(this.bool === null || this.bool === undefined) {
    <p>null</p>
    <button mat-raised-button (click)="favouriteEmit($event)">
      <mat-icon>favorite_outline</mat-icon>
      Favourite
    </button>

    }

    <!-- @if(bool2 === true) {
    
    } @if (bool2 === false) {
   
    } -->

    <!-- <button mat-raised-button (click)="removeFavouriteEmit($event)">
      <mat-icon>favorite</mat-icon>
      Favourite
    </button>
    <button mat-raised-button (click)="favouriteEmit($event)">
      <mat-icon>favorite_outline</mat-icon>
      Favourite
    </button> -->
  `,
  styleUrl: './single-book-favourite-button.component.scss',
})
export class FavouriteButtonComponent implements OnInit {
  @Output() favourite = new EventEmitter<Event>();
  @Output() removeFavourite = new EventEmitter<Event>();
  @Input() book?: Book | null;

  private cartService = inject(CartService);

  protected bool: boolean | null | undefined = null;

  protected currentButtonSettings$ = new BehaviorSubject<
    FavouriteD | undefined
  >({
    favourited: false,
    id: 0,
  });

  ngOnInit(): void {
    this.setButtonSettings();
  }

  setButtonSettings() {
    const allButtonSettings = this.cartService.getFavouritedBooks();

    if (allButtonSettings.length === 0) {
      this.currentButtonSettings$.next({
        favourited: false,
        id: this.book?.id,
      });
    }

    if (allButtonSettings.length > 0) {
      const currentButtonSettings = allButtonSettings.find(
        (favourite) => favourite.id === this.book?.id
      );

      this.currentButtonSettings$.next(currentButtonSettings);
      this.bool = currentButtonSettings?.favourited;
    }
  }
  favouriteEmit($event: Event) {
    this.favourite.emit($event);
    this.bool = true;
  }

  removeFavouriteEmit($event: Event) {
    this.removeFavourite.emit($event);
    this.bool = false;
  }
}
