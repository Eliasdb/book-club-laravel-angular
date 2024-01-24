import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingModule } from 'carbon-components-angular';
@Component({
  selector: 'books-loading-state',
  standalone: true,
  imports: [LoadingModule],
  template: `
    <div class="books-loader">
      <cds-loading [isActive]="true" size="normal" [overlay]="false" />
    </div>
  `,
  styleUrls: ['./loading-state.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoadingStateComponent {}
