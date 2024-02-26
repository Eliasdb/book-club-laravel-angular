import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartService } from '../../../_services/cart-service/cart.service';
import { CartDialog } from '../../modals/cart-modal/cart-modal.component';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  selector: 'action-bar',
  template: `
    <section class="action-bar-container">
      @if (!hideLauncher) {
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
      } @if (hideLauncher) {
      <section class="action-bar-items">
        <img src="/assets/logo-inverted.png" alt="logo" class="logo" />
      </section>
      }
    </section>
  `,
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {
  private dialog = inject(MatDialog);
  protected cartService = inject(CartService);
  @Input()
  hideLauncher!: boolean;

  openDialog() {
    const dialogRef = this.dialog.open(CartDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
