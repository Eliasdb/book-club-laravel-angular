import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  selector: 'confirmation',
  template: ` <div class="page">
    <div class="confirm-text">
      <h2>Thanks for your order!</h2>
      <p>Your books will arrive soon...</p>
    </div>
  </div>`,
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 5000);
  }
}
