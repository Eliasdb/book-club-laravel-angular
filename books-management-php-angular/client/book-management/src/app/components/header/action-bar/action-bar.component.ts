import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-action-bar',
  template: `
  <section class="action-bar-container">
    <section class="action-bar-items">
      <img src="/assets/logo.png" alt="logo" class="logo" />
      <img src="/assets/bag.png" alt="icon" class="launcher-icon" />
      <span class="amount">0</span>
    </section>
  </section>
  `,
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {

}
