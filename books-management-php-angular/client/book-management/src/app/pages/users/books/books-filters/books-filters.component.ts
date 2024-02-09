import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Genre, mappedGenres } from '../../../../_data/data';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  selector: 'app-filters',
  template: `
    <section class="filters">
      <div class="search-input-container">
        <h4 class="input-title">Title/Author</h4>

        <div class="input-container">
          <input
            type="text"
            placeholder="Search"
            class="search-input"
            [formControl]="searchControl"
          />
          <div class="icon-container">
            <img
              src="./assets/search-icon.svg"
              alt="search-icon"
              class="search-icon"
            />
          </div>
        </div>
      </div>

      <div class="categories">
        <h4 class="category-title">Genre</h4>
        <button
          *ngFor="let genre of genres"
          class="category active"
          [ngClass]="{ active: activeGenre === genre }"
          (click)="selectGenre(genre)"
        >
          {{ genre }}
        </button>
      </div>

      <div class="status-filter-container">
        <h4 class="status-title">Status</h4>

        <mat-slide-toggle [(ngModel)]="isChecked" (change)="selectStatus()">{{
          isChecked ? 'Available' : 'Unavailable'
        }}</mat-slide-toggle>
      </div>

      <div class="clear-filters-btn-container">
        <button mat-raised-button color="accent" (click)="clearFilters.emit()">
          Clear filters
        </button>
      </div>
    </section>
  `,
  styleUrls: ['./books-filters.component.scss'],
})
export class BooksFiltersComponent implements OnInit {
  genres: Genre[] = mappedGenres;
  @Input() bookStatus: string | null = null;

  protected isChecked = true;

  @Input() set value(v: string | null) {
    if (v !== this.searchControl.value) {
      this.searchControl.setValue(v);
    }
  }

  @Input() activeGenre: Genre | string | null = null;
  @Input() authors?: any[];

  @Output() search = new EventEmitter<string>();
  @Output() filterGenre = new EventEmitter<string>();
  @Output() filterStatus = new EventEmitter<string>();
  @Output() clearFilters = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  protected searchControl = this.fb.control('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookStatus']) {
      if (this.bookStatus && this.bookStatus === 'loaned') {
        this.isChecked = false;
      }
    }
  }

  selectGenre(genre: Genre) {
    // if (genre == 'all') {
    //   this.filterGenre.emit('');
    // }
    this.filterGenre.emit(genre);
  }

  selectStatus() {
    if (this.isChecked) {
      this.filterStatus.emit('available');
    }
    if (!this.isChecked) {
      this.filterStatus.emit('loaned');
    }
  }

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
