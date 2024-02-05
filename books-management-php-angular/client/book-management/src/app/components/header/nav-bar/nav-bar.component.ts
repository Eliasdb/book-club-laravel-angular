import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <section class="nav-container">
      <ul class="nav-items">
        <li>
          <a class="nav-link" routerLink="/home" routerLinkActive="active">
            Home
          </a>
        </li>
        <li>
          <a class="nav-link" routerLink="/profile" routerLinkActive="active">
            Profile
          </a>
        </li>
        <li>
          <a class="nav-link" routerLink="/books" routerLinkActive="active">
            Books
          </a>
        </li>
        <li *ngIf="userId === '2'">
          <a
            class="nav-link"
            routerLink="/admin/stats"
            routerLinkActive="active"
          >
            Admin
          </a>
        </li>
      </ul>
      <div class="logout-btn">
        Logout
        <img
          src="./assets/logout-btn.svg"
          alt="Logout button"
          class="logout-svg"
        />
      </div>
    </section>
  `,
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public userId = localStorage.getItem('id');
}
