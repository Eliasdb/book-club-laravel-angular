import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DatePickerModule } from 'carbon-components-angular';
import { ActionBarComponent } from '../action-bar/action-bar.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ActionBarComponent,
    NavBarComponent,
    DatePickerModule,
    CommonModule,
  ],
  template: `
    <section [ngClass]="[headerBackgroundColour]" class="header-container">
      <header class="header">
        <app-action-bar [hideLauncher]="hideLauncher" />
        <app-nav-bar
          [ngClass]="headerTextColour"
          [hideLauncher]="hideLauncher"
        />
      </header>
    </section>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input()
  headerBackgroundColour!: string;
  @Input()
  headerTextColour!: string;
  @Input()
  hideLauncher!: boolean;
  @Input()
  logoTheme!: string;
}
