import { Component } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ActionBarComponent, NavBarComponent],
  template: `
  <section class="header-container">
    <header class="header">
      <app-action-bar/>
      <app-nav-bar/>
    </header>
  </section>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
