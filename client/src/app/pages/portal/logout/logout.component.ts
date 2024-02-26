import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: `<section class="logout-page">
    <h2>Logout completed. Redirecting to login page...</h2>
  </section>`,
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 4000);
  }
}
