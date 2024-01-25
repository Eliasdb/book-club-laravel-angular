import { Component } from '@angular/core';
import { CustomersCollectionOverviewComponent } from '../customers-collection-overview/customers-collection-overview.component';

@Component({
  selector: 'customers-collection-container',
  standalone: true,
  template: `
    <section class="header-container"></section>
    <section class="collection-container">
      <customers-collection-overview />
    </section>
    <section class="footer-container"></section>
  `,
  imports: [CustomersCollectionOverviewComponent],
  styleUrls: ['./customers-collection-container.component.scss'],
})
export class CustomersCollectionContainerComponent {}
