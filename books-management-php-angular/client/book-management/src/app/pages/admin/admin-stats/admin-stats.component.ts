import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-admin-stats',
  template: ` <section class="stats-container">
    <section class="cards-container">
      <article>
        <header>
          <span class="count">25</span>
          <span class="icon"
            ><img src="./assets/add-book.svg" alt="add-books"
          /></span>
        </header>
        <h5 class="title">books ordered</h5>
      </article>
      <article>
        <header>
          <span class="count">30</span>
          <span class="icon"
            ><img src="./assets/add-book.svg" alt="add-books"
          /></span>
        </header>
        <h5 class="title">users signed up</h5>
      </article>
      <article>
        <header>
          <span class="count">3</span>
          <span class="icon"
            ><img src="./assets/add-book.svg" alt="add-books"
          /></span>
        </header>
        <h5 class="title">books returned</h5>
      </article>
    </section>
  </section>`,
  styleUrls: ['./admin-stats.component.scss'],
})
export class AdminStatsComponent {}
