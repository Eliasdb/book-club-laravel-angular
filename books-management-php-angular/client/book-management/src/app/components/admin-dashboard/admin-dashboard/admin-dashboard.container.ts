import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  standalone: true,
  imports: [AdminSidebarComponent],
  selector: 'admin-dashboard',
  template: ` <admin-sidebar /> `,
  styleUrls: ['./admin-dashboard.container.scss'],
})
export class AdminDashboardContainer {}
