import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BehaviorSubject, take } from 'rxjs';
import { Book } from '../../../_models/book';

@Component({
  selector: 'cart-item',
  standalone: true,
  template: `
    @if (item) {
    <div class="content-container">
      <mat-checkbox
        class="example-margin"
        [(ngModel)]="checked"
        (click)="clickChecked(item)"
        (change)="clickChecked2($event)"
      ></mat-checkbox>
      <input
        type="checkbox"
        class="checkbox"
        (click)="onClick()"
        (click)="getCheckboxValues($event, item)"
      />
      <div class="img-container">
        <img
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          class="single-book-image"
        />
      </div>
      <div class="book-data-container">
        <p class="text-bold">{{ item.title }}</p>
        <p>{{ item.author }}</p>
      </div>
    </div>
    }
  `,
  styleUrls: ['./cart-item.component.scss'],
  imports: [MatCheckboxModule, FormsModule, CommonModule],
})
export class CartItemComponent {
  @Input() item: Book | null = null;
  @Output() itemSelected = new EventEmitter<any>();
  @Output() state = new EventEmitter<boolean>();

  selectedItems$ = new BehaviorSubject<Book[]>([]);

  itemX: any = {};

  checked = false;

  clickChecked(item: Book) {
    if (this.item) this.itemSelected.emit(item);
  }

  clickChecked2(event: any) {
    if (this.item) this.state.emit(event.checked);
  }

  name = 'Angular';

  order = ['One', 'Two', 'Three', 'Four'];

  newArray: any = [];

  onClick() {
    console.log('Clikc');
    this.selectedItems$.pipe(take(1)).subscribe((items) => {
      // console.log(items);
    });
  }

  //Checkbox Change detecting function
  getCheckboxValues(ev: any, data: Book) {
    let obj = {
      order: data,
    };

    if (ev.target.checked) {
      // Pushing the object into array
      // this.selectedItems$.next();
      // console.log(this.selectedItems$.getValue());

      this.selectedItems$.pipe(take(1)).subscribe((selectedItems) => {
        this.selectedItems$.next([...selectedItems, data]);
      });
    } else {
      let el = this.newArray.find((itm: any) => itm.order === data);

      if (el) this.newArray.splice(this.newArray.indexOf(el), 1);
    }
    // console.log(this.selectedItems$.getValue());
    //Duplicates the obj if we uncheck it
    //How to remove the value from array if we uncheck it
    // console.log(this.newArray);
  }
}
