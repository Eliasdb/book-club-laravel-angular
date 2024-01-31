import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../_services/cart-service/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  selector: 'app-action-bar',
  template: `
    <section class="action-bar-container">
      <section class="action-bar-items">
        <img src="/assets/logo.png" alt="logo" class="logo" />
        <img
          src="/assets/bag.png"
          alt="icon"
          class="launcher-icon"
          (click)="openDialog()"
        />
        <span class="amount">{{ this.cartService.getItems().length }}</span>
      </section>
    </section>
  `,
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {
  private dialog = inject(MatDialog);
  protected cartService = inject(CartService);

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Cart</h2>
    <mat-dialog-content class="mat-typography">
      <h3>Here's what you have selected so far:</h3>
      <div class="cart-container">
        <app-cart-item *ngFor="let item of items$ | async" [item]="item" />
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="btn-container">
        <button class="remove-item-btn">Remove</button>
        <button
          class="checkout-btn"
          routerLink="/checkout"
          [mat-dialog-close]="true"
          cdkFocusInitial
        >
          Checkout
        </button>
      </div>
    </mat-dialog-actions> `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CartItemComponent,
    RouterLink,
    CommonModule,
  ],
  styleUrls: ['./action-bar.component.scss'],
})
export class DialogContentExampleDialog {
  protected cartService = inject(CartService);
  items$ = this.cartService.currentCartSource;
}
