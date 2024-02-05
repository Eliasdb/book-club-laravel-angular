import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardContainer } from '../../../components/admin-dashboard/admin-dashboard/admin-dashboard.container';
import { AdminSidebarComponent } from '../../../components/admin-dashboard/admin-sidebar/admin-sidebar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header/header.component';

@Component({
  selector: 'adminspace',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    AdminDashboardContainer,
    MatSidenavModule,
    AdminSidebarComponent,
    MatSelectModule,
  ],
  template: `
    <app-header
      [headerBackgroundColour]="headerBackgroundColour"
      [headerTextColour]="headerTextColour"
      [hideLauncher]="hideLauncher"
      [logoTheme]="logoTheme"
    />
    <nav>
      <div class="nav-center">
        <button
          mat-raised-button
          (click)="drawer.toggle()"
          type="button"
          class="toggle-btn"
        >
          Admin
          <img src="./assets/toggle.svg" alt="toggle-btn" />
        </button>
      </div>
    </nav>
    <mat-drawer-container class="example-container">
      <mat-drawer #drawer [mode]="mode.value"><app-admin-sidebar /></mat-drawer>
      <mat-select #mode value="side" />
      <mat-drawer-content>
        <div class="content"><router-outlet /></div>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['./adminspace.container.scss'],
})
export class AdminSpaceContainer {
  headerBackgroundColour: string = 'dark';
  headerTextColour: string = ' text-light';
  hideLauncher: boolean = true;
  logoTheme: string = 'dark';
  public isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
