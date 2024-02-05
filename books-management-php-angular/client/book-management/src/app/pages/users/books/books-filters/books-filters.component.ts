import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-filters',
  template: `
    <section class="filters">
      <input
        type="text"
        placeholder="Search"
        class="search-input"
        [formControl]="searchControl"
      />
      <img
        src="./assets/search-icon.svg"
        alt="search-icon"
        class="search-icon"
      />
      <div class="categories">
        <h4 class="category-title">Genre</h4>
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
  styleUrls: ['./books-filters.component.scss'],
})
export class BooksFiltersComponent implements OnInit {
  @Input() set value(v: string | null) {
    if (v !== this.searchControl.value) {
      this.searchControl.setValue(v);
    }
  }

  @Output() search = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  protected searchControl = this.fb.control('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((s): s is string => s !== null),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.search.emit(value);
      });
  }
}
