import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-admin-sidebar',
  template: `
    <div class="content">
      <div class="nav-links">
        <ul>
          <li
            routerLink="/admin/stats"
            class="{{ isSidebarOpen ? 'nav-link active' : 'nav-link' }}"
          >
            <span class="icon"
              ><img src="./assets/stats.svg" alt="stats-icon" class="icon-img"
            /></span>
            Statistics
          </li>

          <li
            routerLink="/admin/books"
            class="{{ isSidebarOpen ? 'nav-link active' : 'nav-link' }}"
          >
            <span class="icon"
              ><img src="./assets/stats.svg" alt="stats-icon" class="icon-img"
            /></span>
            Book Overview
          </li>

          <li
            routerLink="/admin/order-overview"
            class="{{ isSidebarOpen ? 'nav-link active' : 'nav-link' }}"
          >
            <span class="icon"
              ><img src="./assets/stats.svg" alt="stats-icon" class="icon-img"
            /></span>
            Order overview
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  @Input() isSidebarOpen: boolean | undefined;
}
