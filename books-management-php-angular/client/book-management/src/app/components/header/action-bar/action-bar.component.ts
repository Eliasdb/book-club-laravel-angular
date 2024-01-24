import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
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
        <span class="amount">0</span>
      </section>
    </section>
  `,
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {
  private dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Install Angular</h2>
    <mat-dialog-content class="mat-typography">
      <h3>Develop across all platforms</h3>
      <p>
        Learn one way to build applications with Angular and reuse your code and
        abilities to build apps for any deployment target. For web, mobile web,
        native mobile and native desktop.
      </p>

      <p>
        An app's components typically define many views, arranged
        hierarchically. Angular provides the Router service to help you define
        navigation paths among views. The router provides sophisticated
        in-browser navigational capabilities.
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        Install
      </button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {}
