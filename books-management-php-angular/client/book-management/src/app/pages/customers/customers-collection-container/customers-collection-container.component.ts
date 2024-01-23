import { Component } from '@angular/core';
import { CustomersCollectionOverviewComponent } from '../customers-collection-overview/customers-collection-overview.component';
import { HeaderComponent } from 'src/app/components/header/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'customers-collection-container',
  standalone: true,
  template: `
  <section class="header-container">
      <app-header />
    </section>
 <section class="collection-container">
      <customers-collection-overview/>
    </section>
     <section class="footer-container">
      <app-footer/>
    </section>
  `,
  imports: [CustomersCollectionOverviewComponent, HeaderComponent, FooterComponent],
  styleUrls: ['./customers-collection-container.component.scss']
})
export class CustomersCollectionContainerComponent {

}
