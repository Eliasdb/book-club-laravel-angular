import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-filters',
  template: `
  <section class="filters">
    <input type="text" placeholder="Search" class="search-input">

      <div class="categories">
        <h4 class="category-title">Category</h4>
          <button class="category active">All</button>
          <button class="category">category 1</button>
          <button class="category">category 2</button>
          <button class="category">category 3</button>
          <button class="category">category 4</button>
          <button class="category">category 5</button>
      </div>

      <div class="authors">
        <h4 class="author-title">Author</h4>
          <select name="authors" id="author" class="author-select">
            <option value="author1">author 1</option>
            <option value="author2">author 2</option>
            <option value="author3">author 3</option>
          </select>
      </div>

      <div class="clear-filters-btn-container">
        <button class="clear-filters-btn">Clear filters</button>
      </div>
      
  </section>
  `,
  styleUrls: ['./book-filters.component.scss']
})
export class BookFiltersComponent {

}
