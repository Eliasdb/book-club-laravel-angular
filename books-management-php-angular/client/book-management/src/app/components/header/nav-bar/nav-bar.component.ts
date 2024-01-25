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
          <a class="nav-link" routerLink="/" routerLinkActive="active">
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
        <li><a class="nav-link" routerLink="/customers"> Customers </a></li>
        <li><a class="nav-link" routerLink="/checkout"> Checkout </a></li>
      </ul>
    </section>
  `,
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {}
