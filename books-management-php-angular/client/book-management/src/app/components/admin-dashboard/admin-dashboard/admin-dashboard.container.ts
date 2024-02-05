import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  standalone: true,
  imports: [AdminSidebarComponent],
  selector: 'app-admin-dashboard',
  template: ` <app-admin-sidebar /> `,
  styleUrls: ['./admin-dashboard.container.scss'],
})
export class AdminDashboardContainer {}
