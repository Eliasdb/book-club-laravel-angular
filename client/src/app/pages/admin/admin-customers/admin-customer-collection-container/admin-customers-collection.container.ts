import { Component } from '@angular/core';
import { AdminCustomersCollectionOverviewComponent } from '../admin-customer-collection-overview/admin-customers-collection-overview.component';

@Component({
  selector: 'customers-collection-container',
  standalone: true,
  template: `
    <section class="collection-container">
      <admin-customers-collection-overview />
    </section>
  `,
  imports: [AdminCustomersCollectionOverviewComponent],
  styleUrls: ['./admin-customers-collection.container.scss'],
})
export class CustomersCollectionContainer {}
