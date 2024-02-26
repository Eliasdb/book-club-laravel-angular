import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header/header.component';

@Component({
  selector: 'workspace',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, RouterOutlet],
  template: `
    <app-header [headerBackgroundColour]="headerBackgroundColour" />
    <router-outlet />
    <app-footer />
  `,
  styleUrls: ['./workspace.container.scss'],
})
export class WorkspaceContainer {
  headerBackgroundColour: string = ' white';
}
