import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCollectionContainerComponent } from './books-collection-container.component';

describe('BooksCollectionContainerComponent', () => {
  let component: BooksCollectionContainerComponent;
  let fixture: ComponentFixture<BooksCollectionContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksCollectionContainerComponent]
    });
    fixture = TestBed.createComponent(BooksCollectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
