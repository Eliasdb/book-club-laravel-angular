import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-sort-bar',
  template: `
    <section class="horizontal-sort">
      <div class="btn-container">
        <button
          type="button"
          class="{{ showList === false ? 'grid-btn active' : 'grid-btn' }}"
          (click)="toggleShow()"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"
            ></path>
          </svg>
        </button>
        <button
          (click)="toggleShow()"
          type="button"
          class="{{ showList === true ? 'list-btn active' : 'list-btn' }}"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            ></path>
          </svg>
        </button>
      </div>
      <p>xx books found</p>
      <hr style="width:15rem;" />
      <form>
        <label for="sort">sort by</label>
        <select name="sort" id="sort" class="sort-input">
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </section>
  `,
  styleUrls: ['./books-sort-bar.component.scss'],
})
export class SortBarComponent {
  @Input() showList: boolean | undefined;
  @Output() clickEvent = new EventEmitter<string>();

  toggleShow() {
    this.clickEvent.emit();
  }
}
