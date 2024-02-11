import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <section class="nav-container">
      <ul *ngIf="!hideLauncher" class="nav-items">
        <li>
          <a class="nav-link" routerLink="/home" routerLinkActive="active">
            Home
          </a>
        </li>
        <li>
          <a class="nav-link" routerLink="/books" routerLinkActive="active">
            Books
          </a>
        </li>

        <li>
          <a class="nav-link" routerLink="/profile" routerLinkActive="active">
            Profile
          </a>
        </li>
        <li *ngIf="userId === '201'">
          <a
            class="nav-link"
            routerLink="/admin/stats"
            routerLinkActive="active"
          >
            Admin
          </a>
        </li>
      </ul>
      <ul *ngIf="hideLauncher" class="nav-items">
        <li>
          <a
            class="nav-link"
            routerLink="/home"
            routerLinkActive="active-lightgreen"
          >
            Home
          </a>
        </li>
        <li>
          <a
            class="nav-link"
            routerLink="/books"
            routerLinkActive="active-lightgreen"
          >
            Books
          </a>
        </li>

        <li>
          <a
            class="nav-link"
            routerLink="/profile"
            routerLinkActive="active-lightgreen"
          >
            Profile
          </a>
        </li>
        <li *ngIf="userId === '201'">
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
          *ngIf="hideLauncher"
        />
        <img
          src="./assets/logout-btn.svg"
          alt="Logout button"
          class="logout-svg-dark"
          *ngIf="!hideLauncher"
        />
      </div>
    </section>
  `,
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public userId = localStorage.getItem('id');

  @Input()
  hideLauncher!: boolean;
}
